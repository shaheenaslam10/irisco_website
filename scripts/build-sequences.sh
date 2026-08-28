#!/usr/bin/env bash
#
# IRISCO — scroll-sequence pipeline
# ---------------------------------------------------------------------------
# Turns each generated clip in public/assets/irisco/videos_v1 into a numbered
# WebP image sequence plus a manifest, so a ScrollTrigger can drive it frame by
# frame: scroll down pours the coffee, scroll up un-pours it.
#
# Why frames instead of a <video>?
#   • No autoplay policy, no codec surprises, no iframe restrictions.
#   • Seeking is instant and frame-exact, in every browser, at any speed.
#   • It scrubs backwards perfectly — which is half the magic.
#
# Usage:  FFMPEG=/path/to/ffmpeg ./scripts/build-sequences.sh
# ---------------------------------------------------------------------------
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="$ROOT/public/assets/irisco/videos_v1"
OUT="$ROOT/public/assets/irisco/seq"

FF="${FFMPEG:-ffmpeg}"
command -v "$FF" >/dev/null 2>&1 || { echo "ffmpeg not found. Set FFMPEG=/path/to/ffmpeg"; exit 1; }

WIDTH="${SEQ_WIDTH:-1152}"
FPS="${SEQ_FPS:-9}"
MAX="${SEQ_MAX:-44}"
Q="${SEQ_Q:-76}"

mkdir -p "$OUT"

CLIPS=(
  "pour|Hailuo_Video_Cinematic slow-motion coffee p"
  "product|Hailuo_Video_Commercial studio product moti"
  "macro|Hailuo_Video_High-speed slow motion product"
  "bakery|Hailuo_Video_Macro slow-motion shot of a ba"
)

manifest="$OUT/manifest.json"
printf '{\n' > "$manifest"

first=1
for entry in "${CLIPS[@]}"; do
  slug="${entry%%|*}"
  prefix="${entry#*|}"
  src="$(ls "$SRC"/"${prefix}"*.mp4 2>/dev/null | head -n1 || true)"
  [ -z "$src" ] && { echo "!! missing $slug"; continue; }

  dir="$OUT/$slug"
  rm -rf "$dir"
  mkdir -p "$dir"

  echo "==> $slug"
  $FF -hide_banner -loglevel error -y -i "$src" -an \
      -vf "scale=$WIDTH:-2,fps=$FPS" -frames:v "$MAX" \
      -c:v libwebp -quality "$Q" -compression_level 6 \
      "$dir/%04d.webp"

  count=$(ls "$dir" | wc -l | tr -d ' ')
  # First frame doubles as the poster / LCP image.
  cp "$dir/0001.webp" "$OUT/$slug-poster.webp"
  $FF -hide_banner -loglevel error -y -i "$dir/0001.webp" -q:v 4 "$OUT/$slug-poster.jpg"

  [ $first -eq 0 ] && printf ',\n' >> "$manifest"
  printf '  "%s": { "frames": %s, "width": %s, "path": "/assets/irisco/seq/%s", "pattern": "%s/%%04d.webp", "poster": "/assets/irisco/seq/%s-poster.webp" }' \
    "$slug" "$count" "$WIDTH" "$slug" "$slug" "$slug" >> "$manifest"
  first=0
  echo "    $count frames"
done

printf '\n}\n' >> "$manifest"
echo
echo "Manifest → $manifest"
cat "$manifest"
echo
du -sh "$OUT"
