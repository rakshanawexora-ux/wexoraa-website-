"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { quickQuestions, quickScore } from "@/content/quick-check";
import EnquiryForm from "./enquiry-form";
import AnimatedScore from "./animated-score";
export default function QuickGrowthCheck({
  configured = false,
}: {
  configured?: boolean;
}) {
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [values, setValues] = useState<number[]>([]);
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<
    "contact" | "questions" | "loading" | "result"
  >("contact");
  const heading = useRef<HTMLHeadingElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const score = quickScore(values);
  const summary = `Quick business snapshot (self-reported, not audited): ${score === null ? "Not enough known answers for a score" : `${score}/100`}.\n${quickQuestions.map((q, i) => `${q.area}: ${q.options[values[i]] || "Not answered"}`).join("\n")}`;
  function next() {
    if (values[step] === undefined) return;
    if (step < 3) {
      setStep(step + 1);
      requestAnimationFrame(() => heading.current?.focus());
    } else {
      setPhase("loading");
      timer.current = setTimeout(() => {
        setPhase("result");
        requestAnimationFrame(() => heading.current?.focus());
      }, 700);
    }
  }
  return (
    <div className="quick-check embedded-survey">
      {phase === "contact" ? (
        <form
          className="snapshot-contact-step"
          onSubmit={(e) => {
            e.preventDefault();
            setPhase("questions");
            requestAnimationFrame(() => heading.current?.focus());
          }}
        >
          <div className="quick-check-top">
            <span>LET’S START WITH YOU</span>
            <span>01 / 05</span>
          </div>
          <h3 id="home-survey-question" ref={heading} tabIndex={-1}>
            Who are we helping grow?
          </h3>
          <p>
            Your details stay in this session. We only send them if you choose
            to share your snapshot at the end.
          </p>
          <label>
            Your name
            <input
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
              value={contact.name}
              onChange={(e) => setContact({ ...contact, name: e.target.value })}
            />
          </label>
          <label>
            Work email
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              value={contact.email}
              onChange={(e) =>
                setContact({ ...contact, email: e.target.value })
              }
            />
          </label>
          <label>
            Phone number
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              minLength={7}
              maxLength={30}
              value={contact.phone}
              onChange={(e) =>
                setContact({ ...contact, phone: e.target.value })
              }
            />
          </label>
          <button className="button" type="submit">
            Let’s check my business <ArrowUpRight size={16} />
          </button>
          <button
            className="text-link"
            type="button"
            onClick={() => {
              setPhase("questions");
              requestAnimationFrame(() => heading.current?.focus());
            }}
          >
            Skip for now
          </button>
        </form>
      ) : phase === "questions" ? (
        <>
          <div className="quick-check-top">
            <span>YOUR BUSINESS, AT A GLANCE</span>
            <span>0{step + 2} / 05</span>
          </div>
          <div className="quick-progress" aria-hidden="true">
            {quickQuestions.map((q, i) => (
              <i key={q.area} className={i <= step ? "complete" : ""} />
            ))}
          </div>
          <h3 id="home-survey-question" tabIndex={-1} ref={heading}>
            {quickQuestions[step].title}
          </h3>
          <fieldset>
            <legend className="sr-only">{quickQuestions[step].title}</legend>
            {quickQuestions[step].options.map((option, i) => (
              <label
                key={option}
                className={values[step] === i ? "chosen" : ""}
              >
                <input
                  type="radio"
                  name={`quick-${step}`}
                  checked={values[step] === i}
                  onChange={() =>
                    setValues((old) => {
                      const next = [...old];
                      next[step] = i;
                      return next;
                    })
                  }
                />
                <span>{option}</span>
                <Check size={17} aria-hidden="true" />
              </label>
            ))}
          </fieldset>
          <div className="quick-actions">
            <button
              type="button"
              className="button button-outline"

              onClick={() => {
                if (step === 0) setPhase("contact");
                else setStep(step - 1);
                requestAnimationFrame(() => heading.current?.focus());
              }}
            >
              <ArrowLeft size={16} />
              Back
            </button>
            <button
              type="button"
              className="button"
              disabled={values[step] === undefined}
              onClick={next}
            >
              {step === 3 ? "See my snapshot" : "Continue"}
              <ArrowUpRight size={16} />
            </button>
          </div>
          <p className="quick-footnote">
            4 business questions. Your snapshot is up next.
          </p>
        </>
      ) : phase === "loading" ? (
        <div className="snapshot-loading" role="status">
          <div className="loading-orbit" aria-hidden="true">
            <i />
            <i />
            <i />
            <b>W</b>
          </div>
          <h3>Preparing your snapshot</h3>
          <p>Bringing your answers together.</p>
        </div>
      ) : (
        <>
          <div className="quick-result-heading">
            <div>
              <span className="eyebrow">YOUR STARTING POINT</span>
              <h3 ref={heading} tabIndex={-1}>
                {score === null
                  ? "Let’s get a clearer picture."
                  : score >= 75
                    ? "A strong place to grow from."
                    : score >= 40
                      ? "Good foundations. Room to grow."
                      : "Your next chapter starts here."}
              </h3>
            </div>
            <AnimatedScore score={score} />
          </div>
          <p className="quick-footnote">
            A quick view of your digital setup, based on your answers. Unknown
            answers are excluded; at least 2 known answers are needed. This is
            not a sales forecast or an audit.
          </p>
          <ul className="snapshot-next">
            {quickQuestions
              .filter((_, i) => values[i] < 2 || values[i] === 3)
              .slice(0, 2)
              .map((q) => (
                <li key={q.area}>
                  <span>{q.area}</span>
                  {q.advice}
                </li>
              ))}
          </ul>
          <details className="snapshot-method">
            <summary>See my answers & scoring</summary>
            <p>
              Each known answer earns 0, 1 or 2 points. Your percentage uses
              only known answers.
            </p>
            <ul>
              {quickQuestions.map((q, i) => (
                <li key={q.area}>
                  {q.area}: {q.options[values[i]]}
                </li>
              ))}
            </ul>
          </details>
          <button
            type="button"
            className="text-link"
            onClick={() => {
              setPhase("questions");
              setStep(0);
              requestAnimationFrame(() => heading.current?.focus());
            }}
          >
            Edit my answers
          </button>
          <div className="snapshot-contact">
            <h4>Want help with your next step?</h4>
            <p>
              Share your snapshot when you’re ready. Your score is already yours
              to keep.
            </p>
            <EnquiryForm
              configured={configured}
              compact
              interest="Quick business growth snapshot"
              summaryText={summary}
              initialContact={contact}
            />
          </div>
        </>
      )}
    </div>
  );
}
