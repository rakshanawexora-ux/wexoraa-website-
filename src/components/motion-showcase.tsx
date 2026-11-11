"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Pause, Play, ArrowUpRight } from "lucide-react";
import { useExperienceMotion } from "@/hooks/use-experience-motion";
export default function MotionShowcase() {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const reduced = useExperienceMotion();
  useEffect(() => {
    if (reduced) {
      video.current?.pause();
    }
  }, [reduced]);
  async function toggle() {
    const el = video.current;
    if (!el) return;
    if (el.paused) {
      try {
        await el.play();
        setError(false);
      } catch {
        setError(true);
      }
    } else el.pause();
  }
  return (
    <section
      className="motion-showcase section"
      aria-labelledby="showcase-heading"
    >
      <div className="showcase-heading">
        <div>
          <p className="eyebrow">
            <span /> MOTION WITH A PURPOSE
          </p>
          <h2 id="showcase-heading">
            Not static thinking.
            <br />
            <span>Forward motion.</span>
          </h2>
        </div>
        <p>
          Strategy, design and engineering.
          <br />A moving picture of how it comes together.
        </p>
      </div>
      <div className="showcase-film">
        <video
          ref={video}
          className="brand-film"
          muted
          loop
          playsInline
          preload="none"
          poster="/motion/studio-poster.webp"
          aria-label="Wexoraa motion graphic: Build, Operate and Grow connect around one brand"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setError(true)}
        >
          <source src="/motion/wexoraa-studio.mp4" type="video/mp4" />
        </video>
        <div className="film-top">
          <span>WEXORAA / STUDIO IN MOTION</span>
          <span>00:08 · SILENT BRAND FILM</span>
        </div>
        <button
          className="film-toggle"
          onClick={toggle}
          aria-label={playing ? "Pause studio film" : "Play studio film"}
        >
          {playing ? <Pause size={23} /> : <Play size={23} />}
          <span>{playing ? "Pause film" : "Play the film"}</span>
        </button>
      </div>
      {error && (
        <p className="film-feedback" role="status">
          The film could not be played. You can still explore the same Build,
          Operate and Grow approach below.
        </p>
      )}
      <div className="film-description">
        <p>
          An original motion graphic, not client footage. Three disciplines, one
          connected direction.
        </p>
        <Link className="text-link" href="/solutions">
          Explore the approach <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}
