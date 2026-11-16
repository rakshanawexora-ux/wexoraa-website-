"use client";
// Original Wexoraa implementation. No React Bits Pro source or registry is used.
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Play, Pause, ArrowDown } from "lucide-react";
import { useExperienceMotion } from "@/hooks/use-experience-motion";
export default function ScrollMaskReveal() {
  const root = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const reduced = useExperienceMotion();
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.0001,
  });
  const revealScale = useTransform(progress, [0, 0.88], [0.22, 1]);
  const inverseScale = useTransform(revealScale, (value) => 1 / value);
  useMotionValueEvent(progress, "change", (value) => {
    if (!root.current) return;
    root.current.dataset.progress = value.toFixed(3);
  });
  useEffect(() => {
    if (reduced) video.current?.pause();
    const el = root.current;
    if (!el) return;
    el.dataset.progress = reduced ? "1.000" : progress.get().toFixed(3);
    const observer = new IntersectionObserver(([entry]) => {
      el.dataset.visible = String(entry.isIntersecting);
      if (!entry.isIntersecting) video.current?.pause();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced, progress]);
  async function toggle() {
    try {
      if (video.current?.paused) await video.current.play();
      else video.current?.pause();
      setError(false);
    } catch {
      setError(true);
    }
  }
  return (
    <section
      ref={root}
      className="motion-showcase mask-reveal"
      aria-label="Wexoraa studio mask reveal"
      data-static={reduced}
    >
      <div className="mask-reveal-stage">
        <motion.div
          className="mask-reveal-media"
          style={{ scale: reduced ? 1 : revealScale }}
        >
          <motion.div
            className="mask-reveal-viewport"
            style={{ scale: reduced ? 1 : inverseScale }}
          >
            <video
              ref={video}
              className="brand-film"
              src="/motion/wexoraa-studio.mp4"
              poster="/hero-art.webp"
              muted
              loop
              playsInline
              preload="none"
              aria-label="Wexoraa studio motion film"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onError={() => setError(true)}
            />
            <div className="mask-reveal-shade" />
          </motion.div>
        </motion.div>
        <div className="mask-reveal-meta">
          <span>WEXORAA / CONNECTED THINKING</span>
          <button
            type="button"
            className="film-toggle"
            aria-label={playing ? "Pause studio film" : "Play studio film"}
            onClick={toggle}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
            <span>{playing ? "Pause film" : "Play film"}</span>
          </button>
        </div>
        <div className="mask-reveal-copy">
          <span>ONE TEAM. A CONNECTED BUSINESS.</span>
          <h2>
            Good design.
            <br />
            Better business.
          </h2>
          <p>
            Bring your brand, website and everyday systems together. We help you
            turn the pieces into something that works.
          </p>
        </div>
        <span className="mask-scroll-hint">
          SCROLL TO EXPLORE <ArrowDown size={15} />
        </span>
        {error && (
          <p className="mask-media-error" role="status">
            The film could not play. You can still explore the studio artwork.
          </p>
        )}
      </div>
    </section>
  );
}
