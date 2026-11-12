"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/content/catalog";
import ActionArrow from "./action-arrow";
import { useExperienceMotion } from "@/hooks/use-experience-motion";
export default function ProjectShowcase() {
  const [active, setActive] = useState(0);
  const reduced = useExperienceMotion();
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
            <Image
              key={project.image}
              src={project.image}
              alt={project.alt}
              fill
              sizes="(max-width:900px) 100vw, 65vw"
            />
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
          0{active + 1} <span>/ 0{projects.length}</span> <b>{project.type}</b>
        </p>
        <div>
          <button
            type="button"
            className="button button-outline"
            aria-label="Previous project"
            onClick={() =>
              setActive((active - 1 + projects.length) % projects.length)
            }
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            className="button button-outline"
            aria-label="Next project"
            onClick={() => setActive((active + 1) % projects.length)}
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
