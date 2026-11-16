"use client";
import { useState } from "react";
import Image from "next/image";
import { portfolio } from "@/content/portfolio";
const filters = [
  "All projects",
  "Website",
  "Ecommerce",
  "Video production",
  "Social media",
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
      <section className="work-stories" aria-label="Selected projects">
        {portfolio
          .filter(
            (item) => filter === "All projects" || item.category === filter,
          )
          .map((item, i) => (
            <article className="work-story" key={item.image}>
              <div className="work-story-media supplied-work-media">
                <Image
                  src={item.image}
                  alt={`${item.title} — ${item.tags[0]} portfolio showcase`}
                  fill
                  sizes="(max-width:767px) 100vw,50vw"
                  priority={i === 0}
                />
                {item.url && (
                  <a
                    className="work-view"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit website ↗
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </div>
              <div className="work-story-copy">
                <p className="eyebrow">
                  {item.category} / {item.status}
                </p>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <ul>
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <div className="work-story-note">
                  <span>PROJECT OVERVIEW</span>
                  <h3>{item.detail}</h3>
                </div>
                <div className="work-story-meta">
                  <div>
                    <span>FOCUS</span>
                    <p>{item.category}</p>
                  </div>
                  <div>
                    <span>STATUS</span>
                    <p>{item.status}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
      </section>
    </>
  );
}
