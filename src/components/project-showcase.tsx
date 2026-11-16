"use client";
import Link from "next/link";
import Image from "next/image";
import { portfolio } from "@/content/portfolio";
const projects = portfolio.filter((p) =>
  [
    "/work/exploring-munnar.webp",
    "/work/gym-hack.webp",
    "/work/taerg-laundry-social.webp",
    "/work/hita-home-d-cor-social.webp",
  ].includes(p.image),
);
import ActionArrow from "./action-arrow";
export default function ProjectShowcase() {
  return (
    <section
      className="project-showcase section portfolio-minimal"
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
            A little of what we do.
            <br />
          </h2>
        </div>
        <p>
          Websites, online stores and creative work.
          <br />
          <strong>Different businesses. The same care in every detail.</strong>
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
                  alt={`${project.title} ${project.category} showcase`}
                  fill
                  sizes="(max-width:767px) 100vw, 50vw"
                />
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
            </div>
          </article>
        ))}
      </div>
      <div className="portfolio-more">
        <p>More projects. More possibilities.</p>
        <Link href="/work" className="button">
          View more projects <ActionArrow />
        </Link>
      </div>
    </section>
  );
}
