"use client";
import ScrollExpand from "./ScrollExpand";
export default function MotionShowcase() {
  return (
    <section
      className="motion-showcase scroll-film-section"
      aria-label="Wexoraa studio in motion"
    >
      <ScrollExpand
        src="/motion/wexoraa-studio.mp4"
        poster="/hero-art.webp"
        mediaType="video"
        alt="Wexoraa studio motion film"
        title="Different skills. One shared direction."
        scrollHint="SCROLL TO SEE THE BIGGER PICTURE ↓"
        startWidth={62}
        startHeight={62}
        startRadius={28}
        endRadius={0}
        mediaZoom={1.15}
        scrollDistance={0.85}
        holdDistance={0.15}
        overlayScrim={0.9}
        useWindowScroll
      >
        <h2>
          Design that connects.
          <br />
          Technology that works.
        </h2>
        <p>
          From a first impression to your everyday systems, we bring the pieces
          of your business together.
        </p>
      </ScrollExpand>
    </section>
  );
}
