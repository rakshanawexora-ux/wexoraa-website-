"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { clientStories } from "@/content/testimonials";
export default function ClientStories() {
  const [index, setIndex] = useState(0);
  return (
    <section
      className="client-stories section"
      aria-labelledby="client-stories-title"
    >
      <div className="client-stories-intro">
        <p className="eyebrow">
          <span /> CLIENT STORIES
        </p>
        <h2 id="client-stories-title">
          The people
          <br />
          behind the projects.
        </h2>
        <p>A space for feedback from the businesses we work with.</p>
        <div className="client-stories-controls">
          <button
            type="button"
            className="button button-outline"
            aria-label="Previous client story"
            onClick={() =>
              setIndex(
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
            onClick={() => setIndex((index + 1) % clientStories.length)}
          >
            <ArrowRight size={18} />
          </button>
          <span aria-live="polite">
            0{index + 1} / 0{clientStories.length}
          </span>
        </div>
      </div>
      <div className="client-stories-cards">
        {[0, 1].map((offset) => {
          const story = clientStories[(index + offset) % clientStories.length];
          return (
            <article
              key={story.company}
              className={`client-story-card ${story.quote ? "has-feedback" : "feedback-pending"}`}
            >
              <span className="client-story-status">
                {story.quote ? "CLIENT FEEDBACK" : "FEEDBACK COMING SOON"}
              </span>
              <div
                className={`client-story-mark ${story.dark ? "story-mark-dark" : ""}`}
              >
                <span
                  className={story.spriteIndex === 3 ? "story-mark-tall" : ""}
                >
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
              {story.quote ? (
                <blockquote>{story.quote}</blockquote>
              ) : (
                <p className="client-story-placeholder">
                  Feedback from this client
                  <br />
                  will be added here.
                </p>
              )}
              <div className="client-story-person">
                <h3>{story.company}</h3>
                {story.quote && story.author && (
                  <p>
                    {story.author}
                    {story.role ? ` · ${story.role}` : ""}
                  </p>
                )}
                <span>
                  {story.quote ? "Client testimonial" : "Testimonial pending"}
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
