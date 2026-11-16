"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/catalog";
const filters = [
  "All projects",
  "Website",
  "Web app",
  "Mobile app",
  "Branding",
];
const concepts = [
  {
    title: "A better first impression, from shelf to screen.",
    category: "Branding",
    image: "/brand-art.webp",
    slug: projects[0].slug,
    description:
      "A product brand concept that brings packaging, identity and an online store together.",
    tags: ["Brand identity", "Packaging", "Ecommerce"],
    detail:
      "One visual language across the things customers see, hold and buy.",
    tone: "cream",
  },
  {
    title: "An online store that makes choosing feel simple.",
    category: "Website",
    image: "/brand-art.webp",
    slug: projects[0].slug,
    description:
      "A website concept built around clear product information and an easier shopping journey.",
    tags: ["UI/UX design", "Responsive website", "Storefront"],
    detail:
      "From discovering a product to understanding the details and finding the next step.",
    tone: "green",
  },
  {
    title: "Your team’s daily work, connected.",
    category: "Web app",
    image: "/hero-art.webp",
    slug: projects[1].slug,
    description:
      "A business platform concept for keeping customer enquiries, tasks and team updates in one place.",
    tags: ["Product design", "CRM", "Connected systems"],
    detail:
      "Less copying between tools. A clearer view of who needs to do what next.",
    tone: "dark",
  },
  {
    title: "Useful everyday tools, wherever work happens.",
    category: "Mobile app",
    image: "/hero-art.webp",
    slug: projects[1].slug,
    description:
      "An illustrative mobile direction for checking updates and managing customer follow-ups on the move.",
    tags: ["Mobile UI", "Prototyping", "Customer journeys"],
    detail:
      "Simple screens and clear actions, designed around the jobs people need to finish.",
    tone: "green",
  },
];
export default function WorkShowcase() {
  const [filter, setFilter] = useState("All projects");
  return (
    <>
      <div className="work-filters" role="group" aria-label="Filter projects">
        {filters.map((item) => (
          <button
            key={item}
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <section className="work-stories" aria-label="Project concepts">
        {concepts
          .filter(
            (item) => filter === "All projects" || item.category === filter,
          )
          .map((item, i) => (
            <article className="work-story" key={item.title}>
              <Link
                className={`work-story-media ${item.tone}`}
                href={`/work/${item.slug}`}
                aria-label={`Explore concept: ${item.title}`}
              >
                <Image
                  src={item.image}
                  alt={`${item.category} concept placeholder artwork`}
                  fill
                  sizes="(max-width:767px) 100vw,50vw"
                  priority={i === 0}
                />
                <span className="work-placeholder">
                  CONCEPT / PLACEHOLDER IMAGE
                </span>
                <span className="work-view" aria-hidden="true">
                  View concept ↗
                </span>
              </Link>
              <div className="work-story-copy">
                <p className="eyebrow">{item.category} / STUDIO EXPLORATION</p>
                <h2>
                  <Link href={`/work/${item.slug}`}>{item.title}</Link>
                </h2>
                <p>{item.description}</p>
                <ul>
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <div className="work-story-note">
                  <span>THE IDEA</span>
                  <h3>{item.detail}</h3>
                  <p>
                    Illustrative design direction. Original project imagery and
                    client details will be added here later.
                  </p>
                </div>
                <div className="work-story-meta">
                  <div>
                    <span>FOCUS</span>
                    <p>{item.category}</p>
                  </div>
                  <div>
                    <span>STATUS</span>
                    <p>Studio concept</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
      </section>
    </>
  );
}
