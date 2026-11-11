"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Check,
  RotateCcw,
} from "lucide-react";
import {
  questions,
  scoreAssessment,
  validAnswers,
  type Answers,
} from "@/content/assessment";
import EnquiryForm from "./enquiry-form";
const storageKey = "wexoraa-survey-12-v1";
export default function Survey({
  configured = false,
  embedded = false,
}: {
  configured?: boolean;
  embedded?: boolean;
}) {
  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [complete, setComplete] = useState(false);
  const [notice, setNotice] = useState("");
  const [enquire, setEnquire] = useState(false);
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const stored = sessionStorage.getItem(storageKey);
        if (stored) setAnswers(validAnswers(JSON.parse(stored)));
      } catch {}
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    if (ready)
      try {
        sessionStorage.setItem(storageKey, JSON.stringify(answers));
      } catch {}
  }, [answers, ready]);
  const q = questions[index];
  const selected = answers[q.id] || [];
  const result = scoreAssessment(answers);
  function focus() {
    requestAnimationFrame(() => {
      const heading = title.current;
      heading?.focus({ preventScroll: true });
      if (heading) {
        const rect = heading.getBoundingClientRect();
        if (rect.top < 110 || rect.bottom > window.innerHeight - 80)
          heading.scrollIntoView({
            block: "start",
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
              .matches
              ? "auto"
              : "smooth",
          });
      }
    });
  }
  function move(next: number) {
    setIndex(next);
    setNotice("");
    focus();
  }
  function select(value: string) {
    setNotice("");
    if (!q.multi) {
      setAnswers({ ...answers, [q.id]: [value] });
      return;
    }
    const current = answers[q.id] || [];
    if (current.includes(value)) {
      setAnswers({ ...answers, [q.id]: current.filter((x) => x !== value) });
      return;
    }
    if (value === "Not sure yet") {
      setAnswers({ ...answers, [q.id]: [value] });
      return;
    }
    const choices = current.filter((a) => a !== "Not sure yet");
    if (choices.length >= 3) {
      setNotice("Choose up to three. Remove one to change the order.");
      return;
    }
    setAnswers({ ...answers, [q.id]: [...choices, value] });
  }
  function reset() {
    setAnswers({});
    setComplete(false);
    setEnquire(false);
    move(0);
    try {
      sessionStorage.removeItem(storageKey);
    } catch {}
  }
  return (
    <div className={`survey-container ${embedded ? "embedded-survey" : ""}`}>
      <div className="assessment-shell">
        {!complete ? (
          <>
            <div className="assessment-progress">
              <span>QUESTION {index + 1} OF 12</span>
              <span>
                {index < 2
                  ? "YOUR BUSINESS"
                  : index < 10
                    ? "YOUR DIGITAL FOUNDATIONS"
                    : "YOUR NEXT STEP"}
              </span>
            </div>
            <div
              className="progress-track"
              role="progressbar"
              aria-label="Assessment progress"
              aria-valuenow={index + 1}
              aria-valuemin={0}
              aria-valuemax={12}
            >
              <span style={{ width: `${((index + 1) / 12) * 100}%` }} />
            </div>
            <h3
              ref={title}
              tabIndex={-1}
              id={embedded ? "home-survey-question" : "assessment-question"}
            >
              {q.title}
            </h3>
            <p className="assessment-hint">{q.hint}</p>
            <div
              className="assessment-options"
              role="group"
              aria-labelledby={
                embedded ? "home-survey-question" : "assessment-question"
              }
            >
              {q.options.map((option) => (
                <label
                  key={`${q.id}-${option}`}
                  className={
                    selected.includes(option)
                      ? "assessment-option selected"
                      : "assessment-option"
                  }
                >
                  <input
                    disabled={!ready}
                    type={q.multi ? "checkbox" : "radio"}
                    name={q.id}
                    value={option}
                    checked={selected.includes(option)}
                    onChange={() => select(option)}
                  />
                  <span>{option}</span>
                  {selected.includes(option) && (
                    <span className="option-check" aria-hidden="true">
                      {q.multi ? (
                        selected.indexOf(option) + 1
                      ) : (
                        <Check size={16} />
                      )}
                    </span>
                  )}
                </label>
              ))}
            </div>
            <p className="field-notice" role="status">
              {notice}
            </p>
            <div className="assessment-controls">
              <button
                className="text-button"
                disabled={index === 0}
                onClick={() => move(index - 1)}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                className="button"
                disabled={!selected.length}
                onClick={() => {
                  if (index === 11) {
                    setComplete(true);
                    focus();
                  } else move(index + 1);
                }}
              >
                {index === 11
                  ? "See my digital-strength score"
                  : "Next question"}
                <ArrowRight size={17} />
              </button>
            </div>
            <div className="survey-reassurance">
              <Check size={14} />
              <span>
                No email needed to see your result. Answers stay in this tab’s
                session.
              </span>
            </div>
          </>
        ) : (
          <div className="assessment-results">
            <span className="result-chip">
              <Check size={14} /> YOUR DIGITAL-STRENGTH SNAPSHOT
            </span>
            <h3 ref={title} tabIndex={-1}>
              Your score. Your opportunities.
              <br />
              Your next move.
            </h3>
            <div className="score-overview">
              <div
                className="score-ring"
                role="img"
                aria-label={
                  result.score === null
                    ? "Insufficient known responses to calculate a score"
                    : `Digital-strength score ${result.score} out of 100`
                }
                style={{
                  background: `conic-gradient(var(--primary) ${(result.score ?? 0) * 3.6}deg, var(--outline-variant) 0deg)`,
                }}
              >
                <div>
                  <strong>{result.score ?? "—"}</strong>
                  <span>
                    {result.score === null ? "MORE CONTEXT" : "OUT OF 100"}
                  </span>
                </div>
              </div>
              <div>
                <h4>{result.band}</h4>
                <p>
                  {result.score === null
                    ? "Choose known answers to at least four of the eight capability questions for a meaningful score."
                    : `Based on ${result.eligible} of 8 known capability answers. Your business size, industry and timing do not affect this score.`}
                </p>
              </div>
            </div>
            <div className="category-scores">
              {result.categories.map((c) => (
                <div key={c.title}>
                  <span>{c.title}</span>
                  <strong>
                    {c.score === null ? "Not enough context" : `${c.score}/100`}
                  </strong>
                  <div className="category-track">
                    <i style={{ width: `${c.score ?? 0}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <details className="score-method">
              <summary>How is my score calculated?</summary>
              <p>
                Each known capability answer receives 0–3 points: 0 = not
                established, 1 = mostly manual or inconsistent, 2 = partly
                established, 3 = consistently established. All eight questions
                have equal weight. Score = earned points ÷ maximum points for
                known answers × 100, rounded. “Not sure / not applicable” is
                excluded, not scored as zero. At least four known capability
                answers are required. Bands: below 40 foundations to build;
                40–69 progress with gaps; 70–100 strong foundations.
              </p>
              <p>
                This transparent self-reported rubric is a conversation starter.
                It is not a scientific diagnostic, external benchmark, audit or
                prediction of revenue.
              </p>
            </details>
            <div className="next-opportunities">
              <h4>Your clearest opportunities</h4>
              {result.opportunities.length ? (
                result.opportunities.slice(0, 3).map((c) => (
                  <div className="opportunity" key={c.title}>
                    <div>
                      <h4>{c.title}</h4>
                      <p>{c.reason}</p>
                      <small>Based on: {c.evidence.join(" · ")}</small>
                    </div>
                  </div>
                ))
              ) : (
                <p>
                  {result.score === null
                    ? "A conversation can help clarify the areas you are unsure about."
                    : "Your answers describe strong foundations. Review performance and priorities regularly to decide what deserves attention next."}
                </p>
              )}
            </div>
            <div className="assessment-controls">
              <button
                className="text-button"
                onClick={() => {
                  setComplete(false);
                  setEnquire(false);
                  move(0);
                }}
              >
                <ArrowLeft size={16} /> Revise answers
              </button>
              <button
                className="button"
                onClick={() => setEnquire(!enquire)}
                aria-expanded={enquire}
                aria-controls="survey-enquiry"
              >
                {enquire ? "Hide enquiry form" : "Discuss my results"}
                <ArrowUpRight size={17} />
              </button>
            </div>
            {enquire && (
              <div id="survey-enquiry" className="survey-enquiry">
                <h4>Turn the snapshot into a conversation.</h4>
                <p>
                  Tell us where to reach you. Your answers and server-calculated
                  score will be included.
                </p>
                <EnquiryForm
                  configured={configured}
                  answers={answers}
                  interest={
                    result.opportunities[0]?.title || "Digital-strength review"
                  }
                />
              </div>
            )}
            <button className="text-button" onClick={reset}>
              <RotateCcw size={15} /> Clear answers and start again
            </button>
            <p className="form-note">
              Nothing has been sent to Wexoraa unless you submit the enquiry and
              the email provider accepts it.
            </p>
            <Link className="text-link" href="/services">
              Explore relevant services <ArrowUpRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
