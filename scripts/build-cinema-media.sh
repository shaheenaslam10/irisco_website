#!/usr/bin/env bash
#
# IRISCO — cinema media pipeline
# ---------------------------------------------------------------------------
# Takes the raw generated clips in public/assets/irisco/videos_v1 and emits the
# web-ready derivatives consumed by the main-page "cinema" experience:
#
#   <name>-loop.mp4    h264, faststart, seamless ping-pong loop (ambient beds)
#   <name>-loop.webm   vp9  (preferred by Chrome/Firefox)
#   <name>-mob.mp4     h264, half-width (small screens)
#   <name>-scrub.mp4   h264 ALL-INTRA, 12fps — frame-accurate scroll scrubbing
#   <name>-scrub.webm  vp9  ALL-INTRA, 12fps
#   <name>-poster.jpg  hero poster frame
#   <name>-poster.webp
#
# Why all-intra for the scrub track? Inter-frame h264 can only seek to
# keyframes; a GOP of 1 means every frame is independently decodable, so
# dragging `video.currentTime` from a ScrollTrigger scrub resolves instantly
# instead of stuttering to the nearest I-frame. 12fps (down from 24) halves the
# payload and reads *better* when the timeline is driven by a scroll wheel.
#
# Usage:  FFMPEG=/path/to/ffmpeg ./scripts/build-cinema-media.sh
# ---------------------------------------------------------------------------
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$ROOT/public/assets/irisco/videos_v1"
OUT="$ROOT/public/assets/irisco/cinema"

FF="${FFMPEG:-ffmpeg}"
command -v "$FF" >/dev/null 2>&1 || { echo "ffmpeg not found. Set FFMPEG=/path/to/ffmpeg"; exit 1; }

mkdir -p "$OUT"

# slug|filename prefix (source files are matched by prefix)
CLIPS=(
  "pour|Hailuo_Video_Cinematic slow-motion coffee p"
  "product|Hailuo_Video_Commercial studio product moti"
  "macro|Hailuo_Video_High-speed slow motion product"
  "bakery|Hailuo_Video_Macro slow-motion shot of a ba"
  "feature|video"
)

for entry in "${CLIPS[@]}"; do
  slug="${entry%%|*}"
  prefix="${entry#*|}"
  src="$(ls "$SRC"/"${prefix}"*.mp4 2>/dev/null | head -n1 || true)"
  if [ -z "$src" ]; then echo "!! missing source for '$slug' ($prefix)"; continue; fi

  echo "==> $slug  ($(basename "$src"))"

  # ---- ambient seamless loop (forward + reversed, so the cut never shows) ---
  $FF -hide_banner -loglevel error -y -i "$src" -an \
      -filter_complex "[0:v]split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1[out]" \
      -map "[out]" -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p \
      -profile:v high -level 4.0 -movflags +faststart \
      "$OUT/$slug-loop.mp4"

  $FF -hide_banner -loglevel error -y -i "$src" -an \
      -filter_complex "[0:v]split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1[out]" \
      -map "[out]" -c:v libvpx-vp9 -crf 36 -b:v 0 -row-mt 1 -pix_fmt yuv420p \
      "$OUT/$slug-loop.webm"

  # ---- small-screen ambient -------------------------------------------------
  $FF -hide_banner -loglevel error -y -i "$OUT/$slug-loop.mp4" -an \
      -vf "scale=768:-2" -c:v libx264 -preset slow -crf 30 -pix_fmt yuv420p \
      -movflags +faststart "$OUT/$slug-mob.mp4"

  # ---- all-intra scrub track -------------------------------------------------
  $FF -hide_banner -loglevel error -y -i "$src" -an \
      -vf "scale=1280:-2,fps=12" \
      -c:v libx264 -preset medium -crf 27 -pix_fmt yuv420p \
      -g 1 -keyint_min 1 -sc_threshold 0 -x264-params "keyint=1:min-keyint=1:no-scenecut=1" \
      -movflags +faststart "$OUT/$slug-scrub.mp4"

  $FF -hide_banner -loglevel error -y -i "$OUT/$slug-scrub.mp4" -an \
      -c:v libvpx-vp9 -crf 34 -b:v 0 -row-mt 1 -g 1 -keyint_min 1 \
      -pix_fmt yuv420p "$OUT/$slug-scrub.webm"

  # ---- poster ---------------------------------------------------------------
  $FF -hide_banner -loglevel error -y -ss 00:00:01.2 -i "$src" -frames:v 1 \
      -vf "scale=1536:-2" -q:v 3 "$OUT/$slug-poster.jpg"
  $FF -hide_banner -loglevel error -y -i "$OUT/$slug-poster.jpg" \
      -c:v libwebp -quality 80 "$OUT/$slug-poster.webp"
done

echo
echo "Done. Output in public/assets/irisco/cinema:"
ls -lh "$OUT" | awk '{printf "  %-28s %s\n", $9, $5}'
