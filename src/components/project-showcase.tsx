"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { projects } from "@/content/catalog";
import ActionArrow from "./action-arrow";
import { useExperienceMotion } from "@/hooks/use-experience-motion";
export default function ProjectShowcase() {
  const reduced = useExperienceMotion();
  return (
    <section
      className="project-showcase section"
      id="work"
      aria-labelledby="projects-title"
    >
      <div className="showcase-heading-row">
        <div>
          <p className="eyebrow">
            <span />
            SELECTED EXPLORATIONS
          </p>
          <h2 id="projects-title">
            Big ideas.
            <br />
            Made tangible.
          </h2>
        </div>
        <p>
          A closer look at brand, websites and better business systems.
          <br />
          <strong>Studio concepts — not commissioned client work.</strong>
        </p>
      </div>
      <div className="portfolio-grid">
        {projects.map((project, i) => (
          <motion.article
            key={project.slug}
            className={`portfolio-card portfolio-card-${i + 1}`}
            initial={false}
            whileInView={
              reduced
                ? {}
                : {
                    y: [35, 0],
                    opacity: [0.3, 1],
                    filter: ["blur(6px)", "blur(0px)"],
                  }
            }
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7 }}
          >
            <Link
              href={`/work/${project.slug}`}
              className="portfolio-image-link"
              aria-label={`View ${project.title}`}
            >
              <div className="project-image">
                <Image
                  src={project.image}
                  alt={project.alt}
                  fill
                  sizes="(max-width:767px) 100vw, 60vw"
                />
                <span className="portfolio-label" aria-hidden="true">
                  0{i + 1} / STUDIO CONCEPT
                </span>
                <span className="portfolio-arrow">
                  <ActionArrow />
                </span>
              </div>
            </Link>
            <div className="portfolio-caption">
              <div>
                <p>{project.type}</p>
                <h3>
                  <Link href={`/work/${project.slug}`}>{project.title}</Link>
                </h3>
              </div>
              <div className="portfolio-tags">
                {project.services.slice(0, 3).map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
        <Link href="/services/ui-ux-design" className="portfolio-note">
          <span>THOUGHTFUL BY DESIGN</span>
          <h3>
            Good looks.
            <br />
            Even better to use.
          </h3>
          <div className="portfolio-wire" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <p>
            Explore UI/UX design <ActionArrow />
          </p>
        </Link>
        <Link href="/services" className="portfolio-note portfolio-note-dark">
          <span>BUILT AROUND YOUR BUSINESS</span>
          <h3>
            One team.
            <br />A more connected business.
          </h3>
          <div className="portfolio-dots" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </div>
          <p>
            Explore our services <ActionArrow />
          </p>
        </Link>
      </div>
    </section>
  );
}
