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
import { Header, Footer } from "./home";
import { questions, opportunities, type Answers } from "@/content/assessment";
const storageKey = "wexoraa-assessment-v2";
export default function Assessment() {
  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [complete, setComplete] = useState(false);
  const [notice, setNotice] = useState("");
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const raw = sessionStorage.getItem(storageKey);
        if (raw) {
          const data = JSON.parse(raw);
          if (data && typeof data === "object" && !Array.isArray(data)) {
            const valid: Answers = {};
            for (const q of questions) {
              if (Array.isArray(data[q.id]))
                valid[q.id] = data[q.id]
                  .filter(
                    (v: unknown) =>
                      typeof v === "string" && q.options.includes(v),
                  )
                  .slice(0, q.multi ? (q.max ?? q.options.length) : 1);
            }
            setAnswers(valid);
          }
        }
      } catch {}
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(answers));
    } catch {}
  }, [answers, ready]);
  const visible = questions.filter(
    (q) =>
      !(
        q.id === "connected" &&
        answers.operations?.includes("Spreadsheets and manual processes")
      ),
  );
  const safeIndex = Math.min(index, visible.length - 1);
  const question = visible[safeIndex];
  const selected = answers[question.id] || [];
  const results = opportunities(
    answers.operations?.includes("Spreadsheets and manual processes")
      ? { ...answers, connected: [] }
      : answers,
  );
  function move(next: number) {
    setIndex(next);
    setNotice("");
    requestAnimationFrame(() => title.current?.focus());
  }
  function select(value: string) {
    setNotice("");
    if (!question.multi) {
      setAnswers({ ...answers, [question.id]: [value] });
      return;
    }
    const current = answers[question.id] || [];
    if (current.includes(value)) {
      setAnswers({
        ...answers,
        [question.id]: current.filter((x) => x !== value),
      });
      return;
    }
    const exclusive = (option: string) =>
      /not sure|not actively|none \/ /i.test(option);
    if (exclusive(value)) {
      setAnswers({ ...answers, [question.id]: [value] });
      return;
    }
    const choices = current.filter((option) => !exclusive(option));
    if (question.max && choices.length >= question.max) {
      setNotice(
        `Choose up to ${question.max} areas. Remove one to change your selection.`,
      );
      return;
    }
    setAnswers({ ...answers, [question.id]: [...choices, value] });
  }
  function reset() {
    setAnswers({});
    setComplete(false);
    move(0);
    try {
      sessionStorage.removeItem(storageKey);
    } catch {}
  }
  return (
    <>
      <Header />
      <main id="main" className="assessment-page">
        <div className="assessment-heading">
          <p className="eyebrow">
            <span /> FIND YOUR BUSINESS PROBLEM
          </p>
          <h1>
            Clarity starts
            <br />
            with a question.
          </h1>
          <p>
            A practical reflection on your business. No score, no sales tricks —
            just a useful starting point.
          </p>
        </div>
        <div className="assessment-shell">
          {!complete ? (
            <>
              <div className="assessment-progress">
                <span>
                  QUESTION {safeIndex + 1} OF {visible.length}
                </span>
                <span>
                  {Math.round(((safeIndex + 1) / visible.length) * 100)}%
                </span>
              </div>
              <div className="progress-track">
                <span
                  style={{
                    width: `${((safeIndex + 1) / visible.length) * 100}%`,
                  }}
                />
              </div>
              <h2 ref={title} tabIndex={-1} id="assessment-question">
                {question.title}
              </h2>
              <p className="assessment-hint">
                {question.hint ||
                  "Choose the closest fit, or skip if it does not apply."}
              </p>
              <div
                className="assessment-options"
                role="group"
                aria-labelledby="assessment-question"
              >
                {question.options.map((option) => (
                  <label
                    key={`${question.id}-${option}`}
                    className={
                      selected.includes(option)
                        ? "assessment-option selected"
                        : "assessment-option"
                    }
                  >
                    <input
                      type={question.multi ? "checkbox" : "radio"}
                      name={question.id}
                      value={option}
                      checked={selected.includes(option)}
                      onChange={() => select(option)}
                    />
                    <span>{option}</span>
                    {selected.includes(option) && (
                      <span className="option-check">
                        {question.id === "priorities" ? (
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
                  disabled={safeIndex === 0}
                  onClick={() => move(safeIndex - 1)}
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  className="text-button"
                  onClick={() => {
                    setAnswers({ ...answers, [question.id]: [] });
                    if (safeIndex === visible.length - 1) setComplete(true);
                    else move(safeIndex + 1);
                  }}
                >
                  Skip
                </button>
                <button
                  className="button"
                  disabled={!selected.length}
                  onClick={() => {
                    if (safeIndex === visible.length - 1) {
                      setComplete(true);
                      requestAnimationFrame(() => title.current?.focus());
                    } else move(safeIndex + 1);
                  }}
                >
                  {safeIndex === visible.length - 1
                    ? "See my opportunities"
                    : "Next question"}
                  <ArrowRight size={17} />
                </button>
              </div>
              <p className="assessment-privacy">
                Unfinished answers stay in this browser tab’s session. No
                contact details are requested or stored.{" "}
                {visible.length < 15
                  ? "The systems-connection question is omitted because you selected manual processes."
                  : ""}
              </p>
            </>
          ) : (
            <div className="assessment-results">
              <span className="result-chip">
                <Check size={14} /> YOUR PRELIMINARY SUMMARY
              </span>
              <h2 ref={title} tabIndex={-1}>
                A few possibilities.
                <br />A clearer next step.
              </h2>
              <p>
                These suggestions follow directly from your answers. This is not
                a scientifically validated diagnosis, and no information has
                been submitted to Wexoraa.
              </p>
              {results.length ? (
                results.map((r, i) => (
                  <div key={r.title} className="opportunity">
                    <span>0{i + 1}</span>
                    <div>
                      <h3>{r.title}</h3>
                      <p>{r.reason}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="opportunity">
                  <p>
                    Your answers don’t point to one clear opportunity yet. A
                    conversation about your goals may be more useful than a
                    general recommendation.
                  </p>
                </div>
              )}
              <div className="assessment-controls">
                <button
                  className="text-button"
                  onClick={() => {
                    setComplete(false);
                    move(0);
                  }}
                >
                  <ArrowLeft size={16} /> Revise answers
                </button>
                <Link
                  className="button"
                  href={`/contact?interest=${results[0]?.interest || "business-review"}`}
                >
                  Discuss the next step <ArrowUpRight size={17} />
                </Link>
              </div>
              <button className="text-button" onClick={reset}>
                <RotateCcw size={15} /> Clear answers and start again
              </button>
            </div>
          )}
        </div>
        <p className="assessment-disclaimer">
          A conversation starter, not a diagnostic assessment. You can skip
          questions and revise your answers.
        </p>
      </main>
      <Footer />
    </>
  );
}
