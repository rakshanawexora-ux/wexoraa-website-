"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import ActionArrow from "./action-arrow";
import { EnquiryCTA } from "./enquiry-popup";
import { useExperienceMotion } from "@/hooks/use-experience-motion";

export default function CinematicHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useExperienceMotion();
  const [visible, setVisible] = useState(true);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const px = useSpring(x, { stiffness: 65, damping: 24 });
  const py = useSpring(y, { stiffness: 65, damping: 24 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const depthY = useTransform(() => py.get() * 12 + scrollYProgress.get() * 75);
  const depthX = useTransform(px, [-1, 1], [-18, 18]);
  const fieldX = useTransform(px, [-1, 1], [-28, 28]);
  const fieldY = useTransform(py, [-1, 1], [-22, 22]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -35]);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      id="top"
      className="hero hero-media hero-cinematic"
      data-cursor="Explore"
      data-orbit-active={visible && !reduced}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse") return;
        const bounds = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - bounds.left) / bounds.width) * 2 - 1);
        y.set(((e.clientY - bounds.top) / bounds.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.div
        className="hero-image-wrap cinematic-backdrop"
        aria-hidden="true"
        style={{
          x: reduced ? 0 : depthX,
          y: reduced ? 0 : depthY,
          scale: 1.12,
        }}
      >
        <Image
          src="/hero-art.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-image"
        />
      </motion.div>
      <div className="cinematic-shade" aria-hidden="true" />
      <div className="cinematic-grid" aria-hidden="true" />
      <div className="cinematic-meta">
        <span>W.01 / INDEPENDENT DIGITAL STUDIO</span>
        <span>COIMBATORE, INDIA · CONNECTED EVERYWHERE</span>
      </div>
      <motion.div
        className="cinematic-copy"
        style={{ y: reduced ? 0 : titleY }}
      >
        <h1>
          <span>Good design.</span>
          <span>Smart tech.</span>
          <span className="cinematic-last">
            Real <em>impact.</em>
          </span>
        </h1>
        <p>
          We help you build a better website, simplify daily work and reach more
          customers. One team, here to help.
        </p>
        <EnquiryCTA
          className="button cinematic-enquiry"
          interest="Let’s build something together"
        >
          Let’s build something <ActionArrow />
        </EnquiryCTA>
      </motion.div>
      <motion.div
        className="orbital-field"
        aria-hidden="true"
        style={{ x: reduced ? 0 : fieldX, y: reduced ? 0 : fieldY }}
      >
        <div className="orbital-axis axis-horizontal" />
        <div className="orbital-axis axis-vertical" />
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className={`orbital-ring orbital-ring-${n}`}>
            <span className="orbital-satellite" />
            <span className="orbital-satellite satellite-secondary" />
          </div>
        ))}
        <div className="orbital-core">
          <span />
          <i />
          <b>W</b>
        </div>
        <span className="orbital-caption">
          DIFFERENT DISCIPLINES.
          <br />
          ONE SHARED DIRECTION.
        </span>
        <span className="orbital-coordinate">W / 11.0168° N</span>
      </motion.div>
      <div className="cinematic-paths">
        <Link href="#challenge" className="cinematic-card">
          <span>
            01 / FIND THE GAP <ArrowUpRight size={17} />
          </span>
          <h2>Your next move.</h2>
          <p>12 questions. Your business growth score.</p>
        </Link>
        <Link href="/services" className="cinematic-card">
          <span>
            02 / CONNECT THE DOTS <ArrowUpRight size={17} />
          </span>
          <h2>Built around you.</h2>
          <p>Brand. Technology. Business growth.</p>
        </Link>
      </div>
      <div className="cinematic-bottom">
        <Link href="#challenge">
          SCROLL TO FIND YOUR STARTING POINT <ArrowDown size={15} />
        </Link>
        <span>DESIGN / SOFTWARE / MARKETING</span>
      </div>
    </section>
  );
}
