"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useExperienceMotion } from "@/hooks/use-experience-motion";
export default function SiteExperience() {
  const path = usePathname();
  const reduced = useExperienceMotion();
  useEffect(() => {
    if (reduced) return;
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".catalog-card,.engineering-card,.deliverable-card,.work-card,.process-page-list article",
      ),
    );
    cards.forEach((c) => c.classList.add("experience-card"));
    let frame = 0;
    let active: HTMLElement | null = null;
    const pointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const card = (e.target as Element)?.closest<HTMLElement>(
        ".experience-card",
      );
      if (active && active !== card) {
        active.style.setProperty("--tilt-x", "0deg");
        active.style.setProperty("--tilt-y", "0deg");
      }
      active = card;
      if (!card) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mouse-x", `${x * 100}%`);
        card.style.setProperty("--mouse-y", `${y * 100}%`);
        card.style.setProperty("--tilt-x", `${(y - 0.5) * -5}deg`);
        card.style.setProperty("--tilt-y", `${(x - 0.5) * 5}deg`);
      });
    };
    const leave = () => {
      if (active) {
        active.style.setProperty("--tilt-x", "0deg");
        active.style.setProperty("--tilt-y", "0deg");
      }
    };
    document.addEventListener("pointermove", pointer);
    document.addEventListener("pointerleave", leave);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries)
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.animate([{ translate: "0 28px" }, { translate: "0 0" }], {
              duration: 700,
              easing: "cubic-bezier(.22,1,.36,1)",
            });
            observer.unobserve(el);
          }
      },
      { threshold: 0.09 },
    );
    document
      .querySelectorAll(
        "main > section, main .catalog-card, main .process-page-list article",
      )
      .forEach((el) => observer.observe(el));
    let scrollFrame = 0;
    const scroll = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - innerHeight;
        document.documentElement.style.setProperty(
          "--site-progress",
          `${total > 0 ? scrollY / total : 0}`,
        );
        document
          .querySelectorAll<HTMLElement>("[data-parallax]")
          .forEach((el) => {
            const r = el.getBoundingClientRect();
            el.style.setProperty(
              "--parallax-y",
              `${Math.max(-55, Math.min(55, (innerHeight / 2 - r.top - r.height / 2) * 0.1))}px`,
            );
          });
      });
    };
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => {
      cancelAnimationFrame(frame);
      cancelAnimationFrame(scrollFrame);
      observer.disconnect();
      document.removeEventListener("pointermove", pointer);
      document.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", scroll);
      cards.forEach((c) => {
        c.classList.remove("experience-card");
        c.style.removeProperty("--tilt-x");
        c.style.removeProperty("--tilt-y");
      });
    };
  }, [path, reduced]);
  return <div className="site-progress scroll-progress" aria-hidden="true" />;
}
