"use client";
/* eslint-disable @next/next/no-img-element -- Preserve React Bits image/video source support; this media is below the hero. */
// Adapted from the React Bits ScrollExpand source supplied by the user.
// Keeps native scrolling; adds live reduced-motion, header offset and video controls.
import { useEffect, useRef, useState } from "react";
import "./ScrollExpand.css";
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const smoothstep = (a, b, x) => {
  const t = clamp((x - a) / (b - a || 1e-6), 0, 1);
  return t * t * (3 - 2 * t);
};
/**
 * @param {{ src?: string, mediaType?: 'image'|'video', poster?: string,
 * alt?: string, title?: string, scrollHint?: string, startWidth?: number,
 * startHeight?: number, startRadius?: number, endRadius?: number,
 * mediaZoom?: number, scrollDistance?: number, holdDistance?: number,
 * smoothing?: number, overlayScrim?: number, useWindowScroll?: boolean,
 * enabled?: boolean, children?: import('react').ReactNode,
 * className?: string, style?: import('react').CSSProperties }} props
 */
export default function ScrollExpand({
  src = "",
  mediaType = "image",
  poster = "",
  alt = "",
  title = "",
  scrollHint = "",
  startWidth = 42,
  startHeight = 58,
  startRadius = 24,
  endRadius = 0,
  mediaZoom = 1.35,
  scrollDistance = 1.2,
  holdDistance = 0.35,
  smoothing = 0.1,
  overlayScrim = 0.45,
  useWindowScroll = false,
  enabled = true,
  children = null,
  className = "",
  style = {},
  ...rest
}) {
  const rootRef = useRef(null),
    trackRef = useRef(null),
    stageRef = useRef(null),
    frameRef = useRef(null),
    mediaRef = useRef(null),
    titleRef = useRef(null),
    overlayRef = useRef(null),
    scrimRef = useRef(null),
    hintRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const root = rootRef.current,
      track = trackRef.current,
      stage = stageRef.current;
    if (!root || !track || !stage) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0,
      current = 0,
      target = 0,
      stageH = 0,
      offset = 0,
      lastTime = 0;
    const apply = (p) => {
      const e = smoothstep(0, 1, p),
        w = clamp(startWidth, 1, 100) + (100 - clamp(startWidth, 1, 100)) * e,
        h = clamp(startHeight, 1, 100) + (100 - clamp(startHeight, 1, 100)) * e;
      frameRef.current.style.clipPath = `inset(${(100 - h) / 2}% ${(100 - w) / 2}% ${(100 - h) / 2}% ${(100 - w) / 2}% round ${startRadius + (endRadius - startRadius) * e}px)`;
      mediaRef.current.style.transform = `scale(${mediaZoom + (1 - mediaZoom) * e})`;
      scrimRef.current.style.opacity = String(overlayScrim * e);
      if (titleRef.current) {
        const out = smoothstep(0.4, 0.88, p);
        titleRef.current.style.opacity = String(1 - out);
        titleRef.current.style.transform = `translate3d(0,${-28 * out}px,0) scale(${1 + 0.06 * out})`;
      }
      if (hintRef.current) {
        const gone = smoothstep(0, 0.12, p);
        hintRef.current.style.opacity = String(1 - gone);
        hintRef.current.style.transform = `translate3d(0,${8 * gone}px,0)`;
      }
      if (overlayRef.current) {
        const incoming = smoothstep(0.68, 1, p);
        overlayRef.current.style.opacity = String(incoming);
        overlayRef.current.style.transform = `translate3d(0,${18 * (1 - incoming)}px,0)`;
        overlayRef.current.inert = incoming < 0.98;
      }
      root.dataset.progress = p.toFixed(3);
    };
    const read = () => {
      if (!enabled || mq.matches) return 1;
      const span = stageH * Math.max(0.01, scrollDistance);
      const top = track.getBoundingClientRect().top - offset;
      root.dataset.active = String(
        useWindowScroll && top <= 0 && top + track.offsetHeight > stageH,
      );
      return clamp((useWindowScroll ? -top : root.scrollTop) / span, 0, 1);
    };
    const tick = (time) => {
      const dt = lastTime ? Math.min(0.05, (time - lastTime) / 1000) : 1 / 60;
      lastTime = time;
      current +=
        (target - current) *
        (smoothing <= 0 ? 1 : 1 - Math.exp(-dt / smoothing));
      if (Math.abs(target - current) < 0.0004) current = target;
      apply(current);
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => {
      target = read();
      if (smoothing <= 0 || mq.matches) {
        current = target;
        apply(current);
      } else if (!raf) {
        lastTime = 0;
        raf = requestAnimationFrame(tick);
      }
    };
    const measure = () => {
      offset = useWindowScroll
        ? document.querySelector(".header")?.getBoundingClientRect().height || 0
        : 0;
      stageH = useWindowScroll
        ? window.innerHeight - offset
        : root.clientHeight;
      if (stageH <= 0) return;
      const staticMode = !enabled || mq.matches;
      root.dataset.static = String(staticMode);
      if (staticMode) root.dataset.active = "false";
      stage.style.height = `${stageH}px`;
      stage.style.top = `${offset}px`;
      track.style.height = `${stageH * (staticMode ? 1 : 1 + Math.max(0, scrollDistance) + Math.max(0, holdDistance))}px`;
      stage.style.setProperty(
        "--se-title-size",
        `${clamp(root.clientWidth * 0.075, 32, 92)}px`,
      );
      if (mq.matches && mediaRef.current instanceof HTMLVideoElement)
        mediaRef.current.pause();
      target = read();
      current = target;
      apply(current);
    };
    measure();
    const scroller = useWindowScroll ? window : root;
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    mq.addEventListener("change", measure);
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && mediaRef.current instanceof HTMLVideoElement)
        mediaRef.current.pause();
    });
    io.observe(root);
    return () => {
      cancelAnimationFrame(raf);
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      mq.removeEventListener("change", measure);
      ro.disconnect();
      io.disconnect();
    };
  }, [
    startWidth,
    startHeight,
    startRadius,
    endRadius,
    mediaZoom,
    scrollDistance,
    holdDistance,
    smoothing,
    overlayScrim,
    useWindowScroll,
    enabled,
    src,
    mediaType,
  ]);
  async function toggleVideo() {
    try {
      if (mediaRef.current.paused) await mediaRef.current.play();
      else mediaRef.current.pause();
      setError(false);
    } catch {
      setError(true);
    }
  }
  return (
    <div
      ref={rootRef}
      className={`scroll-expand ${useWindowScroll ? "" : "scroll-expand--scroller"} ${className}`.trim()}
      style={{
        "--se-scroll-units": enabled
          ? 1 + Math.max(0, scrollDistance) + Math.max(0, holdDistance)
          : 1,
        ...style,
      }}
      {...rest}
    >
      <div ref={trackRef} className="scroll-expand__track">
        <div ref={stageRef} className="scroll-expand__stage">
          <div ref={frameRef} className="scroll-expand__frame">
            {mediaType === "video" ? (
              <video
                ref={mediaRef}
                className="scroll-expand__media brand-film"
                src={src}
                poster={poster}
                muted
                loop
                playsInline
                preload="none"
                aria-label={alt || "Studio motion film"}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onError={() => setError(true)}
              />
            ) : (
              <img
                ref={mediaRef}
                className="scroll-expand__media"
                src={src}
                alt={alt}
                draggable={false}
              />
            )}
            <div ref={scrimRef} className="scroll-expand__scrim" />
            {children ? (
              <div ref={overlayRef} className="scroll-expand__overlay">
                {children}
              </div>
            ) : null}
          </div>
          {title ? (
            <div ref={titleRef} className="scroll-expand__title">
              {title}
            </div>
          ) : null}
          {scrollHint ? (
            <div ref={hintRef} className="scroll-expand__hint">
              {scrollHint}
            </div>
          ) : null}
          {mediaType === "video" ? (
            <button
              type="button"
              className="film-toggle"
              onClick={toggleVideo}
              aria-label={playing ? "Pause studio film" : "Play studio film"}
            >
              {playing ? "Pause film" : "Play film"}
              <span aria-hidden="true">{playing ? "Ⅱ" : "↗"}</span>
            </button>
          ) : null}
          {error ? (
            <p className="scroll-expand__error" role="status">
              The film could not play. The studio poster is still available.
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
