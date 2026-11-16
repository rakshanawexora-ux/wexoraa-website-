"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "motion/react";
import ActionArrow from "./action-arrow";
import { EnquiryCTA } from "./enquiry-popup";
import { useExperienceMotion } from "@/hooks/use-experience-motion";

export default function CinematicHero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useExperienceMotion();
  const [visible, setVisible] = useState(true);
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 24 });
  const sy = useSpring(y, { stiffness: 60, damping: 24 });
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <section
      ref={ref}
      id="top"
      className="hero-cinematic hero-horizon"
      data-orbit-active={visible && !reduced}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - r.left) / r.width - 0.5) * 24);
        y.set(((e.clientY - r.top) / r.height - 0.5) * 12);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <div className="horizon-copy">
        <p className="horizon-eyebrow">
          <span /> ONE TEAM. YOUR WHOLE DIGITAL BUSINESS.
        </p>
        <h1>
          Your brand. Your website.
          <br />
          <em>Your next step.</em> One team.
        </h1>
        <p className="horizon-intro">
          We design your brand, build your website and software, and help the
          right customers find you. One team that connects it all—so you can
          focus on running your business.
        </p>
        <div className="horizon-actions">
          <EnquiryCTA
            className="button"
            interest="Let’s build something together"
          >
            Let’s build something <ActionArrow />
          </EnquiryCTA>
          <Link href="/services" className="button button-outline">
            Explore what we do <ActionArrow />
          </Link>
        </div>
        <p className="horizon-promise">
          Design & branding <span>·</span> Websites & software <span>·</span>{" "}
          Digital marketing
        </p>
      </div>
      <div className="horizon-landscape" aria-hidden="true">
        <motion.div
          className="horizon-scenery"
          style={{ x: reduced ? 0 : sx, y: reduced ? 0 : sy }}
        >
          <svg viewBox="0 0 1440 440" preserveAspectRatio="none">
            <defs>
              <linearGradient id="hill-back" x2="0" y2="1">
                <stop stopColor="#e5edd9" />
                <stop offset="1" stopColor="#f5f7f1" />
              </linearGradient>
              <linearGradient id="hill-front" x2="0" y2="1">
                <stop stopColor="#b9d499" />
                <stop offset="1" stopColor="#eef4e6" />
              </linearGradient>
            </defs>
            <path
              className="horizon-hill"
              d="M0 140 Q200 120 450 270 Q760 400 1050 150 Q1250 10 1440 35V440H0Z"
              fill="url(#hill-back)"
            />
            <path
              className="horizon-hill"
              d="M0 230 Q200 250 410 340 Q850 470 1140 200 Q1320 90 1440 150V440H0Z"
              fill="url(#hill-front)"
            />
            <path
              d="M0 380 Q420 340 700 400 Q1100 320 1440 360V440H0Z"
              fill="#f8faf5"
            />
          </svg>
        </motion.div>
        <div className="horizon-emblem">
          <div className="horizon-mark">
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
              <i
                key={n}
                style={{
                  height: `${14 + (4 - Math.abs(4 - n)) * 9}px`,
                  animationDelay: `${n * 0.12}s`,
                }}
              />
            ))}
          </div>
          <span>CONNECTED BY WEXORAA</span>
        </div>
        <div className="horizon-disciplines">
          <span>Make an impression.</span>
          <span>Make work simpler.</span>
          <span>Make your next move.</span>
        </div>
      </div>
    </section>
  );
}
