"use client";
import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";
import { useExperienceMotion } from "@/hooks/use-experience-motion";
export default function AnimatedScore({ score }: { score: number | null }) {
  const reduced = useExperienceMotion();
  const value = useMotionValue(0);
  const rounded = useTransform(value, (n) => Math.round(n));
  useEffect(() => {
    const animation = animate(value, score ?? 0, {
      duration: reduced ? 0 : 1.35,
      ease: [0.16, 1, 0.3, 1],
    });
    return () => animation.stop();
  }, [value, score, reduced]);
  return (
    <div
      className="snapshot-score animated-score"
      role="img"
      aria-label={
        score === null
          ? "More context needed"
          : `Digital readiness ${score} out of 100`
      }
    >
      <svg viewBox="0 0 140 140" aria-hidden="true">
        <circle cx="70" cy="70" r="60" className="score-track" />
        <motion.circle
          cx="70"
          cy="70"
          r="60"
          className="score-fill"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: (score ?? 0) / 100 }}
          transition={{ duration: reduced ? 0 : 1.35, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      {score === null ? (
        <strong>—</strong>
      ) : (
        <motion.strong aria-hidden="true">{rounded}</motion.strong>
      )}
      <span>{score === null ? "MORE CONTEXT" : "OUT OF 100"}</span>
    </div>
  );
}
