"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import {
  ArrowUpRight,
  Layers3,
  Workflow,
  ChartNoAxesCombined,
} from "lucide-react";
import { useExperienceMotion } from "@/hooks/use-experience-motion";
const areas = [
  { title: "Build", text: "From ambition to experience.", icon: Layers3 },
  { title: "Operate", text: "Connect the way work happens.", icon: Workflow },
  {
    title: "Grow",
    text: "Give your next move direction.",
    icon: ChartNoAxesCombined,
  },
];
export default function StudioScene() {
  const [index, setIndex] = useState(0);
  const reduced = useExperienceMotion();
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 110, damping: 22 }),
    sy = useSpring(y, { stiffness: 110, damping: 22 });
  const rx = useTransform(sy, [-1, 1], [9, -9]),
    ry = useTransform(sx, [-1, 1], [-12, 12]);
  return (
    <div className="inner-visual" data-parallax>
      <div className="scene-top">
        <span>
          <i /> THE CONNECTED STUDIO
        </span>
        <span>LIVE / 0{index + 1}</span>
      </div>
      <motion.div
        className="studio-scene"
        style={{ rotateX: reduced ? 0 : rx, rotateY: reduced ? 0 : ry }}
        onPointerMove={(e) => {
          if (reduced || e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          x.set(((e.clientX - r.left) / r.width) * 2 - 1);
          y.set(((e.clientY - r.top) / r.height) * 2 - 1);
        }}
        onPointerLeave={() => {
          x.set(0);
          y.set(0);
        }}
      >
        <div className="scene-orbit orbit-a" />
        <div className="scene-orbit orbit-b" />
        <div className="scene-orbit orbit-c" />
        <div className="scene-dot dot-one" />
        <div className="scene-dot dot-two" />
        <div className="scene-logo">
          <svg viewBox="0 0 296 60" aria-hidden="true">
            <image href="/brand/wexoraa-logo.svg" width="296" height="60" />
          </svg>
          <span>CONNECTED BY DESIGN</span>
        </div>
        <span className="scene-cross cross-a">+</span>
        <span className="scene-cross cross-b">+</span>
        {areas.map(({ title, icon: Icon }, i) => (
          <button
            key={title}
            className={`scene-node scene-node-${i}`}
            aria-pressed={index === i}
            onClick={() => setIndex(i)}
          >
            <Icon size={17} />
            {title}
          </button>
        ))}
      </motion.div>
      <div className="scene-bottom" aria-live="polite">
        <div>
          <span>
            0{index + 1} / {areas[index].title.toUpperCase()}
          </span>
          <p>{areas[index].text}</p>
        </div>
        <Link
          href={`/solutions/${areas[index].title.toLowerCase()}`}
          aria-label={`Explore ${areas[index].title} solutions`}
        >
          <ArrowUpRight size={22} />
        </Link>
      </div>
    </div>
  );
}
