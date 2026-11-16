"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useExperienceMotion } from "@/hooks/use-experience-motion";
// Pointer-only enhancements. Native scrolling does not measure or rewrite cards.
export default function SiteExperience() {
  const path = usePathname();
  const reduced = useExperienceMotion();
  useEffect(() => {
    if (reduced || !matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".catalog-card,.engineering-card,.deliverable-card,.work-card,.process-page-list article,.client-story-card,.portfolio-card,.portfolio-note",
      ),
    );
    cards.forEach((card) => card.classList.add("experience-card"));
    let frame = 0,
      x = 0,
      y = 0,
      target: Element | null = null;
    let active: HTMLElement | null = null,
      action: HTMLElement | null = null;
    function resetCard(card: HTMLElement | null) {
      card?.style.removeProperty("--tilt-x");
      card?.style.removeProperty("--tilt-y");
    }
    function resetAction(el: HTMLElement | null) {
      el?.style.removeProperty("--action-x");
      el?.style.removeProperty("--action-y");
    }
    const update = () => {
      frame = 0;
      const nextAction =
        target?.closest<HTMLElement>(".button,.film-toggle,.service-enquire") ??
        null;
      const nextCard = target?.closest<HTMLElement>(".experience-card") ?? null;
      // Read both bounds before changing any inline styles.
      const actionBounds = nextAction?.getBoundingClientRect();
      const cardBounds = nextCard?.getBoundingClientRect();
      if (action !== nextAction) resetAction(action);
      if (active !== nextCard) resetCard(active);
      action = nextAction;
      active = nextCard;
      if (action && actionBounds) {
        action.style.setProperty(
          "--action-x",
          `${Math.max(-3, Math.min(3, (x - actionBounds.left - actionBounds.width / 2) * 0.035))}px`,
        );
        action.style.setProperty(
          "--action-y",
          `${Math.max(-2, Math.min(2, (y - actionBounds.top - actionBounds.height / 2) * 0.06))}px`,
        );
        action.style.setProperty(
          "--action-glow",
          `${((x - actionBounds.left) / actionBounds.width) * 100}%`,
        );
      }
      if (active && cardBounds) {
        const px = (x - cardBounds.left) / cardBounds.width,
          py = (y - cardBounds.top) / cardBounds.height;
        active.style.setProperty("--mouse-x", `${px * 100}%`);
        active.style.setProperty("--mouse-y", `${py * 100}%`);
        active.style.setProperty("--tilt-x", `${(py - 0.5) * -5}deg`);
        active.style.setProperty("--tilt-y", `${(px - 0.5) * 5}deg`);
      }
    };
    const pointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      target = event.target instanceof Element ? event.target : null;
      if (!frame) frame = requestAnimationFrame(update);
    };
    const leave = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      resetCard(active);
      resetAction(action);
      active = null;
      action = null;
    };
    document.addEventListener("pointermove", pointer, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      leave();
      document.removeEventListener("pointermove", pointer);
      document.removeEventListener("pointerleave", leave);
      cards.forEach((card) => card.classList.remove("experience-card"));
    };
  }, [path, reduced]);
  return null;
}
