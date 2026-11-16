"use client";
// Original curved SVG text path with measured seamless repetition.
import { useEffect, useId, useRef } from "react";
import { useExperienceMotion } from "@/hooks/use-experience-motion";
const phrase = "DESIGN  ·  TECHNOLOGY  ·  GROWTH  ·  ";
const copies = 8;
export default function BendingMarquee() {
  const id = `wexoraa-curve-${useId().replace(/:/g, "")}`;
  const root = useRef<HTMLDivElement>(null),
    text = useRef<SVGTextElement>(null),
    pathText = useRef<SVGTextPathElement>(null);
  const phase = useRef(0);
  const reduced = useExperienceMotion();
  useEffect(() => {
    const el = root.current,
      line = text.current,
      path = pathText.current;
    if (!el || !line || !path || reduced) return;
    let frame = 0,
      last = 0,
      visible = false,
      hover = false,
      focus = false,
      unit = 1000,
      disposed = false;
    const measure = () => {
      const length = line.getComputedTextLength() / copies;
      if (length > 0) unit = length;
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
    };
    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
      last = now;
      phase.current = (phase.current + dt * 58) % unit;
      path.setAttribute("startOffset", String(-phase.current));
      el.dataset.offset = phase.current.toFixed(1);
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      const paused = !visible || hover || focus;
      el.dataset.paused = String(paused);
      if (paused) stop();
      else if (!frame) frame = requestAnimationFrame(tick);
    };
    const enter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        hover = true;
        sync();
      }
    };
    const leave = () => {
      hover = false;
      sync();
    };
    const focusIn = () => {
      focus = true;
      sync();
    };
    const focusOut = () => {
      focus = false;
      sync();
    };
    measure();
    document.fonts.ready.then(() => {
      if (!disposed) measure();
    });
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(el);
    const resize = new ResizeObserver(measure);
    resize.observe(el);
    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    el.addEventListener("focusin", focusIn);
    el.addEventListener("focusout", focusOut);
    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      resize.disconnect();
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      el.removeEventListener("focusin", focusIn);
      el.removeEventListener("focusout", focusOut);
    };
  }, [reduced]);
  return (
    <section
      className="bending-brand-strip"
      aria-label="Design, technology and growth"
    >
      <div
        ref={root}
        className="bending-marquee"
        tabIndex={0}
        role="img"
        aria-label="Design. Technology. Growth. Pause the moving text by hovering or focusing here."
        data-motion={reduced ? "static" : "running"}
      >
        <svg viewBox="0 0 1600 280" aria-hidden="true" focusable="false">
          <defs>
            <path id={id} d="M -900 240 Q 800 0 2500 240" />
          </defs>
          <use href={`#${id}`} className="bending-ribbon" />
          <text ref={text} dominantBaseline="central" xmlSpace="preserve">
            <textPath ref={pathText} href={`#${id}`} startOffset="0">
              {phrase.repeat(copies)}
            </textPath>
          </text>
        </svg>
      </div>
    </section>
  );
}
