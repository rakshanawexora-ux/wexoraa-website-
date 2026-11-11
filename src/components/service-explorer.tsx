"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ArrowUpRight } from "lucide-react";
import { EnquiryCTA } from "@/components/enquiry-popup";
import { solutions } from "@/content/site";
import { services } from "@/content/catalog";
import { useExperienceMotion } from "@/hooks/use-experience-motion";
export default function ServiceExplorer() {
  const [group, setGroup] = useState("all");
  const [query, setQuery] = useState("");
  const reduced = useExperienceMotion();
  const results = services.filter(
    (s) =>
      (group === "all" || s.group === group) &&
      `${s.title} ${s.intro} ${s.problem}`
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <section className="section service-explorer">
      <div className="service-explorer-top">
        <div>
          <p className="eyebrow">
            <span /> FIND A SERVICE
          </p>
          <h2>
            What are you
            <br />
            looking to change?
          </h2>
        </div>
        <label className="service-search">
          <Search size={18} />
          <span className="sr-only">Search services</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try website, CRM, automation…"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear service search"
            >
              <X size={16} />
            </button>
          )}
        </label>
      </div>
      <div className="service-filter-row">
        <div
          className="service-filter-buttons"
          role="group"
          aria-label="Filter services"
        >
          {["all", "build", "operate", "grow"].map((g) => (
            <button
              key={g}
              aria-pressed={group === g}
              onClick={() => setGroup(g)}
            >
              {g === "all"
                ? "All services"
                : solutions.find((area) => area.id === g)?.shortTitle}
              {group === g && <span aria-hidden="true">↗</span>}
            </button>
          ))}
        </div>
        <p role="status">
          {results.length} {results.length === 1 ? "service" : "services"} to
          explore
        </p>
      </div>
      <motion.div layout={!reduced} className="service-results">
        <AnimatePresence initial={false} mode="popLayout">
          {results.map((s) => (
            <motion.div
              key={s.slug}
              layout={!reduced}
              initial={reduced ? false : { y: 16 }}
              animate={{ y: 0 }}
              exit={reduced ? {} : { scale: 0.98 }}
              transition={{
                duration: reduced ? 0 : 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                className="catalog-card experience-card"
                href={`/services/${s.slug}`}
              >
                <span>
                  {solutions.find((area) => area.id === s.group)?.shortTitle}
                  <ArrowUpRight size={17} />
                </span>
                <h3>{s.title}</h3>
                <p>{s.intro}</p>
                <strong>Explore the approach ↗</strong>
              </Link>
              <div className="service-card-actions">
                <EnquiryCTA
                  interest={s.title}
                  label={`Enquire about ${s.title}`}
                  className="service-enquire"
                >
                  Enquire now <ArrowUpRight size={16} />
                </EnquiryCTA>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {!results.length && (
        <div className="service-no-results">
          <h3>No exact match yet.</h3>
          <p>
            Try a shorter search, explore all capabilities or tell us what you
            need.
          </p>
          <button
            className="button button-outline"
            onClick={() => {
              setQuery("");
              setGroup("all");
            }}
          >
            Reset filters
          </button>
          <Link className="button text-link" href="/contact">
            Describe your challenge <ArrowUpRight size={17} />
          </Link>
        </div>
      )}
    </section>
  );
}
