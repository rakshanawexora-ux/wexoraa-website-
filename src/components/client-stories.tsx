"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { clientStories } from "@/content/testimonials";
export default function ClientStories() {
  const [index, setIndex] = useState(0);
  const story = clientStories[index];
  function select(next: number, focus = false) {
    setIndex(next);
    if (focus) document.getElementById(`client-tab-${next}`)?.focus();
  }
  return (
    <section
      className="client-stories section client-stories-editorial"
      aria-labelledby="client-stories-title"
    >
      <div className="stories-heading">
        <div>
          <p className="eyebrow">
            <span /> THE PEOPLE BEHIND THE WORK
          </p>
          <h2 id="client-stories-title">
            Different businesses.
            <br />
            <span>A shared next step.</span>
          </h2>
        </div>
        <div className="stories-heading-side">
          <p>
            Meet a few of the businesses we work with. Their experiences deserve
            their own space.
          </p>
          <div className="client-stories-controls">
            <button
              type="button"
              className="button button-outline"
              aria-label="Previous client story"
              onClick={() =>
                select(
                  (index - 1 + clientStories.length) % clientStories.length,
                )
              }
            >
              <ArrowLeft size={18} />
            </button>
            <button
              type="button"
              className="button button-outline"
              aria-label="Next client story"
              onClick={() => select((index + 1) % clientStories.length)}
            >
              <ArrowRight size={18} />
            </button>
            <span aria-live="polite">
              0{index + 1} / 0{clientStories.length}
            </span>
          </div>
        </div>
      </div>
      <div
        className="client-feature"
        role="tabpanel"
        id="client-feature-panel"
        aria-labelledby={`client-tab-${index}`}
        tabIndex={0}
      >
        <div className="client-feature-identity">
          <span className="client-feature-kicker">
            WEXORAA / CLIENT COMMUNITY
          </span>
          <div
            className={`client-story-mark ${story.dark ? "story-mark-dark" : ""}`}
          >
            <span className={story.spriteIndex === 3 ? "story-mark-tall" : ""}>
              <Image
                src="/clients/client-logos.png"
                alt={story.company}
                width={2172}
                height={724}
                sizes="700px"
                style={{ left: `${story.spriteIndex * -100}%` }}
              />
            </span>
          </div>
          <span className="client-feature-number" aria-hidden="true">
            0{index + 1}
          </span>
        </div>
        <div className="client-feature-content">
          <span className="client-feature-status">
            {story.quote ? "IN THEIR WORDS" : "CLIENT STORY / COMING SOON"}
          </span>
          {story.quote ? (
            <blockquote>{story.quote}</blockquote>
          ) : (
            <>
              <h3>{story.company}</h3>
              <p className="client-feature-pending">
                Their experience, in their own words.
                <br />
                We’ll share their feedback here when it’s available.
              </p>
            </>
          )}
          {story.quote && (
            <div className="client-feature-author">
              <h3>{story.company}</h3>
              {story.author && (
                <p>
                  {story.author}
                  {story.role ? ` · ${story.role}` : ""}
                </p>
              )}
            </div>
          )}
          <div className="client-feature-rule" aria-hidden="true">
            <span />
            <i />
          </div>
        </div>
      </div>
      <div
        className="client-selector"
        role="tablist"
        aria-label="Client stories"
      >
        {clientStories.map((client, i) => (
          <button
            type="button"
            role="tab"
            id={`client-tab-${i}`}
            aria-selected={index === i}
            aria-controls="client-feature-panel"
            tabIndex={index === i ? 0 : -1}
            key={client.company}
            onClick={() => select(i)}
            onKeyDown={(e) => {
              if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) {
                e.preventDefault();
                select(
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? clientStories.length - 1
                      : (i +
                          (e.key === "ArrowRight"
                            ? 1
                            : clientStories.length - 1)) %
                        clientStories.length,
                  true,
                );
              }
            }}
          >
            <span>0{i + 1}</span>
            <strong>{client.company}</strong>
            <span className="client-selector-dot" aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}
