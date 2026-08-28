import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { storyImage } from "../storyContent";

/**
 * 07 · The invitation — the close. A finished cup, held full-frame, the image
 * settling as it arrives and then holding still. The line answers the hero
 * ("Everything finds its place"), so the film resolves rather than fading into
 * the footer.
 */
export function InvitationScene() {
  return (
    <section className="story-scene invitation-scene" data-story-scene="invitation">
      <div className="invitation-media" aria-hidden="true">
        <Image src={storyImage("cortado-top")} fill sizes="100vw" alt="" />
      </div>
      <div className="invitation-inner">
        <h2>
          Everything has its place.
          <br />
          Come find yours.
        </h2>
        <div className="invitation-actions">
          <Link href="/visit" className="button ivory">
            Plan your visit <MapPin size={16} />
          </Link>
          <Link href="/menu" className="text-link light">
            See the menu <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
