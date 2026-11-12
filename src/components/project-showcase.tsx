"use client";
import { useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/content/catalog";
import ActionArrow from "./action-arrow";
import { useExperienceMotion } from "@/hooks/use-experience-motion";
const stickyQuery = "(min-width: 1001px) and (min-height: 680px)";
function subscribeSticky(update: () => void) {
  const media = window.matchMedia(stickyQuery);
  media.addEventListener("change", update);
  return () => media.removeEventListener("change", update);
}
export default function ProjectShowcase() {
  const [active, setActive] = useState(0);
  const reduced = useExperienceMotion();
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const desktop = useSyncExternalStore(
    subscribeSticky,
    () => window.matchMedia(stickyQuery).matches,
    () => false,
  );
  const sticky = desktop && !reduced;
  const { scrollYProgress } = useScroll({
    target: track,
    offset: ["start start", "end end"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-36, 36]);
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.08, 1.16, 1.08],
  );
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (sticky)
      setActive(
        Math.min(
          projects.length - 1,
          Math.max(0, Math.floor(value * projects.length)),
        ),
      );
  });
  function goTo(next: number) {
    if (!sticky || !track.current || !stage.current) {
      setActive(next);
      return;
    }
    const top =
      track.current.getBoundingClientRect().top + window.scrollY - 112;
    const distance = Math.max(
      0,
      track.current.offsetHeight - stage.current.offsetHeight,
    );
    window.scrollTo({
      top: top + (distance * next) / Math.max(1, projects.length - 1),
      behavior: "smooth",
    });
  }
  const project = projects[active];
  const brief = project.problem.replace("Illustrative brief: ", "");
  return (
    <section
      className="project-showcase section"
      id="work"
      aria-labelledby="projects-title"
    >
      <div className="showcase-heading-row">
        <div>
          <p className="eyebrow">
            <span /> IDEAS, MADE VISIBLE
          </p>
          <h2 id="projects-title">
            A closer look
            <br />
            at what’s possible.
          </h2>
        </div>
        <p>
          Studio concepts exploring brand, websites and better business systems.
          <br />
          <strong>Concept work — not commissioned client projects.</strong>
        </p>
      </div>
      <div className="project-story-track" ref={track} data-sticky={sticky}>
        <div className="project-story-stage" ref={stage}>
          <div
            className="project-showcase-layout"
            aria-roledescription="carousel"
            aria-label="Studio concepts"
          >
            <Link
              href={`/work/${project.slug}`}
              className="showcase-image-link"
              aria-label={`View ${project.title}`}
            >
              <div className="project-image showcase-image">
                <motion.div
                  className="sticky-image-plane"
                  style={{
                    y: sticky ? imageY : 0,
                    scale: sticky ? imageScale : 1.05,
                  }}
                >
                  {projects.map((item, i) => (
                    <Image
                      key={item.slug}
                      src={item.image}
                      alt={i === active ? item.alt : ""}
                      aria-hidden={i !== active}
                      fill
                      loading="eager"
                      sizes="(max-width:900px) 100vw, 65vw"
                      className={
                        i === active
                          ? "chapter-image is-current"
                          : "chapter-image"
                      }
                    />
                  ))}
                </motion.div>
                <span className="showcase-image-tag">{project.type}</span>
                <span className="showcase-image-arrow">
                  <ActionArrow />
                </span>
              </div>
            </Link>
            <motion.div
              key={project.slug}
              className="showcase-project-copy"
              initial={false}
              animate={reduced ? {} : { x: [16, 0] }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="showcase-project-index">
                0{active + 1} / STUDIO CONCEPT
              </span>
              <h3>{project.title}</h3>
              <p>{brief.charAt(0).toUpperCase() + brief.slice(1)}</p>
              <span className="showcase-work-label">WHAT WE EXPLORED</span>
              <ul>
                {project.services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
              <Link href={`/work/${project.slug}`} className="button">
                View the concept <ActionArrow />
              </Link>
            </motion.div>
          </div>
          <div className="showcase-project-bottom">
            <p role="status">
              0{active + 1} <span>/ 0{projects.length}</span>{" "}
              <b>{project.type}</b>
            </p>
            <div>
              <button
                type="button"
                className="button button-outline"
                aria-label="Previous project"
                onClick={() =>
                  goTo((active - 1 + projects.length) % projects.length)
                }
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                className="button button-outline"
                aria-label="Next project"
                onClick={() => goTo((active + 1) % projects.length)}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
          <div className="project-scroll-cue" aria-hidden="true">
            <span>SCROLL TO EXPLORE THE NEXT CONCEPT</span>
            <div>
              <motion.i style={{ scaleX: scrollYProgress }} />
            </div>
            <span>01 — 02</span>
          </div>
        </div>
      </div>
    </section>
  );
}
