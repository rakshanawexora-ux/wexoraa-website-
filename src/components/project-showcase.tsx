"use client";
import Link from "next/link";
import Image from "next/image";
import { portfolio } from "@/content/portfolio";
const projects = portfolio.filter((p) =>
  ["Exploring Munnar", "Gym Hack"].includes(p.title),
);
import ActionArrow from "./action-arrow";
export default function ProjectShowcase() {
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
            SELECTED PROJECTS
          </p>
          <h2 id="projects-title">
            Real businesses.
            <br />
            Work we’ve delivered.
          </h2>
        </div>
        <p>
          A travel booking platform and a fitness nutrition online store.
          <br />
          <strong>Designed around what each business needs.</strong>
        </p>
      </div>
      <div className="portfolio-grid">
        {projects.map((project, i) => (
          <article
            key={project.image}
            className={`portfolio-card portfolio-card-${i + 1}`}
          >
            <Link
              href={`/work#${project.image.split("/").pop()?.replace(".webp", "")}`}
              className="portfolio-image-link"
              aria-label={`View ${project.title}`}
            >
              <div className="project-image">
                <Image
                  src={project.image}
                  alt={`${project.title} website showcase`}
                  fill
                  sizes="(max-width:767px) 100vw, 60vw"
                />
                <span className="portfolio-label" aria-hidden="true">
                  0{i + 1} / WEBSITE PROJECT
                </span>
                <span className="portfolio-arrow">
                  <ActionArrow />
                </span>
              </div>
            </Link>
            <div className="portfolio-caption">
              <div>
                <p>{project.category}</p>
                <h3>
                  <Link
                    href={`/work#${project.image.split("/").pop()?.replace(".webp", "")}`}
                  >
                    {project.title}
                  </Link>
                </h3>
              </div>
              <div className="portfolio-tags">
                {project.tags.slice(0, 3).map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          </article>
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
      <div className="portfolio-more">
        <p>See more of what we explore and create.</p>
        <Link href="/work" className="button">
          View more projects <ActionArrow />
        </Link>
      </div>
    </section>
  );
}
