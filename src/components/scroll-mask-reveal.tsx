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
  const clip = useTransform(
    progress,
    [0, 0.88],
    ["circle(18% at 50% 52%)", "circle(150% at 50% 52%)"],
  );
  const zoom = useTransform(progress, [0, 1], [1.2, 1]);
  const titleOpacity = useTransform(progress, [0, 0.32], [1, 0]);
  const titleY = useTransform(progress, [0, 0.4], [0, -55]);
  const copyOpacity = useTransform(progress, [0.4, 0.8], [0, 1]);
  const copyY = useTransform(progress, [0.4, 0.8], [35, 0]);
  const shade = useTransform(progress, [0, 1], [0.28, 0.85]);
  useMotionValueEvent(progress, "change", (value) => {
    if (!root.current) return;
    root.current.dataset.progress = value.toFixed(3);
    root.current.dataset.active = String(
      !reduced && value > 0 && value < 0.999,
    );
  });
  useEffect(() => {
    if (reduced) video.current?.pause();
    const el = root.current;
    if (!el) return;
    el.dataset.progress = reduced ? "1.000" : progress.get().toFixed(3);
    if (reduced) el.dataset.active = "false";
    const observer = new IntersectionObserver(([entry]) => {
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
          style={{ clipPath: reduced ? "none" : clip }}
        >
          <motion.video
            ref={video}
            className="brand-film"
            src="/motion/wexoraa-studio.mp4"
            poster="/hero-art.webp"
            muted
            loop
            playsInline
            preload="none"
            aria-label="Wexoraa studio motion film"
            style={{ scale: reduced ? 1 : zoom }}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => setError(true)}
          />
          <motion.div
            className="mask-reveal-shade"
            style={{ opacity: reduced ? 0.85 : shade }}
          />
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
        <motion.div
          className="mask-reveal-opening"
          aria-hidden="true"
          style={{
            opacity: reduced ? 0 : titleOpacity,
            y: reduced ? 0 : titleY,
          }}
        >
          <span>THE BIGGER PICTURE</span>
          <p>
            Great things happen
            <br />
            when ideas <em>connect.</em>
          </p>
          <span className="mask-scroll-hint">
            SCROLL TO REVEAL <ArrowDown size={15} />
          </span>
        </motion.div>
        <motion.div
          className="mask-reveal-copy"
          style={{ opacity: reduced ? 1 : copyOpacity, y: reduced ? 0 : copyY }}
        >
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
        </motion.div>
        {error && (
          <p className="mask-media-error" role="status">
            The film could not play. You can still explore the studio artwork.
          </p>
        )}
      </div>
    </section>
  );
}
