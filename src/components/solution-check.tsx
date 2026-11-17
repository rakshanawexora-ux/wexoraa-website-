"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, LoaderCircle } from "lucide-react";
import {
  businessQuestions,
  challengeQuestions,
  digitalQuestions,
  allCheckQuestions,
  toggleAnswer,
  validQuestion,
  solutionReport,
  type CheckAnswers,
  type CheckQuestion,
} from "@/content/solution-check";
import { useLeadSubmission } from "@/hooks/use-lead-submission";
import AnimatedScore from "./animated-score";
const steps = [
  "Your details",
  "Your business",
  "Daily challenges",
  "Digital presence",
  "Your report",
];
export default function SolutionCheck({
  source = "Home growth checker",
}: {
  source?: string;
}) {
  const [step, setStep] = useState(0);
  const [contact, setContact] = useState({
    name: "",
    company: "",
    role: "",
    email: "",
    phone: "",
    preferred: "Phone",
  });
  const [answers, setAnswers] = useState<CheckAnswers>({});
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const [validation, setValidation] = useState("");
  const heading = useRef<HTMLHeadingElement>(null);
  const feedback = useRef<HTMLParagraphElement>(null);
  const { state, error, submit } = useLeadSubmission();
  const mounted = useRef(false);
  const report = solutionReport(answers);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const target = state === "error" ? feedback.current : heading.current;
    target?.focus({ preventScroll: true });
    target?.scrollIntoView({ block: "nearest", behavior: "instant" });
  }, [step, state]);
  const fields = [
    { key: "name", label: "Full name", auto: "name", type: "text", max: 100 },
    {
      key: "company",
      label: "Organisation name",
      auto: "organization",
      type: "text",
      max: 150,
    },
    {
      key: "role",
      label: "Designation / role",
      auto: "organization-title",
      type: "text",
      max: 120,
    },
    {
      key: "email",
      label: "Work email",
      auto: "email",
      type: "email",
      max: 254,
    },
    {
      key: "phone",
      label: "Phone number (with country code)",
      auto: "tel",
      type: "tel",
      max: 30,
    },
  ] as const;
  const groups = [
    [],
    businessQuestions,
    challengeQuestions,
    digitalQuestions,
    [],
  ];
  function choose(q: CheckQuestion, value: string) {
    setAnswers((prev) => ({
      ...prev,
      [q.id]: toggleAnswer(prev[q.id] || [], value, q),
    }));
    setValidation("");
  }
  function problem() {
    return [...(answers.difficulties || []), notes.trim()]
      .filter(Boolean)
      .join(". ");
  }
  async function next(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return;
    if (step === 0 && !/^\+[0-9][0-9() .-]{5,28}$/.test(contact.phone.trim())) {
      setValidation(
        "Please include your country code, for example +91 98765 43210.",
      );
      return;
    }
    const missing = groups[step].find((q) => !validQuestion(q, answers[q.id]));
    if (missing) {
      setValidation(`Please answer: ${missing.title}`);
      requestAnimationFrame(() => feedback.current?.focus());
      return;
    }
    if (step < 4) {
      setValidation("");
      setStep((s) => s + 1);
      return;
    }
    if (
      !allCheckQuestions.every((q) => validQuestion(q, answers[q.id])) ||
      report.score === null
    ) {
      setValidation(
        "Please complete the business questions before submitting.",
      );
      return;
    }
    if (!consent) {
      setValidation("Please agree to contact permission before submitting.");
      return;
    }
    const form = new FormData(e.currentTarget);
    await submit({
      ...contact,
      source,
      interest: "Business readiness check",
      businessType: answers.businessType[0],
      businessAge: answers.businessAge[0],
      problem: problem(),
      score: report.score,
      recommendations: report.recommendations,
      answers: {
        ...Object.fromEntries(
          allCheckQuestions.map((q) => [q.title, answers[q.id]]),
        ),
        "Anything else": notes.trim(),
      },
      consent,
      companyUrl: String(form.get("companyUrl") || ""),
    });
  }
  if (state === "success")
    return (
      <div className="solution-check solution-report">
        <p className="solution-saved">
          <Check size={18} /> Your enquiry and report have been saved.
        </p>
        <div className="solution-report-heading">
          <AnimatedScore score={report.score} />
          <div>
            <p className="eyebrow">YOUR BUSINESS READINESS SNAPSHOT</p>
            <h3 ref={heading} tabIndex={-1}>
              {report.band}
            </h3>
            <p>
              This is a self-reported view of your digital setup, not an audit
              or a prediction of sales.
            </p>
          </div>
        </div>
        <h4>Where we can help</h4>
        <ul className="solution-recommendations">
          {report.recommendations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h4>A useful place to start</h4>
        <ol className="solution-ideas">
          {report.ideas.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        <div className="solution-next">
          <strong>Want help putting this into practice?</strong>
          <p>
            Wexoraa has your enquiry and preferred contact method. We can
            discuss your challenge and a practical next step—you do not need to
            submit again.
          </p>
        </div>
        <details className="solution-method">
          <summary>How your score is calculated</summary>
          <p>
            Six areas earn up to 3 points each: enquiry tracking, daily work,
            manual tasks, website, online reach and marketing. Score = points
            earned ÷ 18 × 100, rounded.
          </p>
          <ul>
            {report.dimensions.map((d) => (
              <li key={d.name}>
                {d.name}: {d.points}/3
              </li>
            ))}
          </ul>
          <p>
            Tracking: business software 3; Sheets 2; calls or separate tools 1;
            no fixed process 0. Website: represents business well 3; better
            product presentation needed 2; basic or redesign needed 1; no
            website 0. Online reach: multiple channels or happy with reach 3;
            search, ads or agency 2; mainly social 1; no promotion 0. Daily
            work, manual tasks and marketing start at 3, with one point removed
            per selected difficulty, up to 3. The “smoothly / no major tasks /
            good results” options earn 3. These are simple planning rules, not
            validated benchmarks.
          </p>
          <p>
            Your industry, business age, contact details, reach channels and
            having a mobile app do not affect the score.
          </p>
        </details>
        <Link className="button button-outline" href="/services">
          Explore what we do <ArrowRight size={17} />
        </Link>
      </div>
    );
  return (
    <div className="solution-check" aria-busy={state === "loading"}>
      <div className="solution-progress">
        <span>STEP {step + 1} OF 5</span>
        <span>{steps[step]}</span>
        <div
          role="progressbar"
          aria-label="Business check progress"
          aria-valuemin={0}
          aria-valuemax={5}
          aria-valuenow={step + 1}
        >
          {steps.map((s, i) => (
            <i key={s} data-complete={i <= step} />
          ))}
        </div>
      </div>
      <h3 id="home-survey-question" ref={heading} tabIndex={-1}>
        {
          [
            "First, who are we talking to?",
            "Let’s get to know your business.",
            "What gets in the way of a good workday?",
            "How does your business show up online?",
            "Anything else we should understand?",
          ][step]
        }
      </h3>
      <p className="solution-step-intro">
        {
          [
            "Tell us how to reach you about your report. Nothing is sent until you submit the final step.",
            "A little context helps us suggest a useful starting point.",
            "Choose what matches your business today. There are no right or wrong answers.",
            "Help us understand what works and what could be better.",
            "Review your details, add anything we missed and choose whether to share your enquiry.",
          ][step]
        }
      </p>
      <form onSubmit={next}>
        <fieldset disabled={state === "loading"} className="solution-fields">
          <legend className="sr-only">{steps[step]}</legend>
          {step === 0 && (
            <div className="form-grid">
              {fields.map((f) => (
                <label key={f.key}>
                  {f.label}
                  <input
                    name={f.key}
                    value={contact[f.key]}
                    onChange={(e) =>
                      setContact({ ...contact, [f.key]: e.target.value })
                    }
                    type={f.type}
                    autoComplete={f.auto}
                    required
                    minLength={
                      f.key === "phone" ? 7 : f.key === "email" ? undefined : 2
                    }
                    maxLength={f.max}
                    placeholder={
                      f.key === "phone" ? "+91 98765 43210" : undefined
                    }
                  />
                </label>
              ))}
              <label>
                Preferred contact method
                <select
                  name="preferred"
                  value={contact.preferred}
                  onChange={(e) =>
                    setContact({ ...contact, preferred: e.target.value })
                  }
                >
                  <option>Phone</option>
                  <option>WhatsApp</option>
                  <option>Email</option>
                </select>
              </label>
            </div>
          )}
          {groups[step].map((q) => (
            <fieldset className="solution-question" key={q.id}>
              <legend>{q.title}</legend>
              <p>{q.multi ? "Choose all that apply." : "Choose one."}</p>
              <div className="solution-options">
                {q.options.map((option) => (
                  <label
                    key={option}
                    data-selected={(answers[q.id] || []).includes(option)}
                  >
                    <input
                      name={q.id}
                      type={q.multi ? "checkbox" : "radio"}
                      checked={(answers[q.id] || []).includes(option)}
                      onChange={() => choose(q, option)}
                      required={!q.multi}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          ))}
          {step === 4 && (
            <>
              <label className="solution-note-label">
                Tell us what’s happening, what’s difficult or what you have in
                mind. <small>(optional)</small>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  maxLength={3000}
                  rows={4}
                />
              </label>
              <div className="solution-review">
                <strong>Your enquiry</strong>
                <p>
                  {contact.name} · {contact.role}
                  <br />
                  {contact.company}
                  <br />
                  {contact.email} · {contact.phone}
                  <br />
                  Preferred contact: {contact.preferred}
                </p>
                <p>
                  <strong>Main challenge:</strong>{" "}
                  {(answers.difficulties || []).join(", ")}
                </p>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => setStep(0)}
                >
                  Edit your details
                </button>
              </div>
              <label className="consent-label">
                <input
                  name="consent"
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                />
                <span>
                  I agree to the{" "}
                  <Link
                    href="/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    privacy notice
                  </Link>{" "}
                  and allow Wexoraa to store my details, answers and report in
                  its private lead sheet and contact me about this enquiry. No
                  marketing subscription.
                </span>
              </label>
              <label className="honeypot" aria-hidden="true">
                Leave this empty
                <input name="companyUrl" tabIndex={-1} autoComplete="off" />
              </label>
            </>
          )}
        </fieldset>
        <p
          role="status"
          ref={feedback}
          tabIndex={-1}
          className={validation || error ? "form-error" : "form-note"}
        >
          {validation ||
            error ||
            (state === "loading"
              ? "Saving your enquiry and preparing your report…"
              : step === 4
                ? "Your report appears after your enquiry is saved. Nothing is sent before you submit."
                : "")}
        </p>
        <div className="solution-actions">
          {step > 0 && (
            <button
              type="button"
              className="button button-outline"
              disabled={state === "loading"}
              onClick={() => {
                setValidation("");
                setStep((s) => s - 1);
              }}
            >
              <ArrowLeft size={16} /> Back
            </button>
          )}
          <button
            type="submit"
            className="button"
            disabled={state === "loading"}
          >
            {state === "loading" ? (
              <>
                <LoaderCircle className="lead-spinner" size={18} /> Saving your
                report…
              </>
            ) : step === 4 ? (
              state === "error" ? (
                "Retry and get my report"
              ) : (
                "Get my business report"
              )
            ) : (
              <>
                Continue <ArrowRight size={17} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
