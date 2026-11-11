"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import type { Answers } from "@/content/assessment";
export default function EnquiryForm({
  answers,
  interest = "",
  configured = false,
  compact = false,
}: {
  answers?: Answers;
  interest?: string;
  configured?: boolean;
  compact?: boolean;
}) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const requestId = useRef("");
  const submittedAt = useRef("");
  const feedback = useRef<HTMLDivElement>(null);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "loading") return;
    const form = new FormData(e.currentTarget);
    if (!requestId.current) requestId.current = crypto.randomUUID();
    if (!submittedAt.current) submittedAt.current = new Date().toISOString();
    setState("loading");
    setError("");
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(form.get("name")),
          company: String(form.get("company")),
          email: String(form.get("email")),
          phone: String(form.get("phone")),
          website: String(form.get("website") || ""),
          interest: String(form.get("interest")),
          message: String(form.get("message")),
          preferred: String(form.get("preferred")),
          consent: form.get("consent") === "on",
          companyUrl: String(form.get("companyUrl") || ""),
          requestId: requestId.current,
          submittedAt: submittedAt.current,
          ...(answers ? { answers } : {}),
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.accepted)
        throw new Error(
          result.error || "We could not confirm acceptance. Please retry.",
        );
      setState("success");
      requestAnimationFrame(() => feedback.current?.focus());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Please try again.");
      setState("error");
      requestAnimationFrame(() => feedback.current?.focus());
    }
  }
  if (state === "success")
    return (
      <div className="send-success" ref={feedback} tabIndex={-1} role="status">
        <Check />
        <h3>Thanks. Your enquiry is on its way.</h3>
        <p>
          The email provider accepted your enquiry for delivery. This does not
          guarantee inbox delivery. Wexoraa can use your details to follow up
          about your requirement.
        </p>
        <Link className="text-link" href="/business-assessment/thank-you">
          What happens next <ArrowUpRight size={18} />
        </Link>
      </div>
    );
  return (
    <form
      onSubmit={submit}
      className={compact ? "enquiry-form compact-enquiry" : "enquiry-form"}
      aria-label={answers ? "Discuss my assessment" : "Project enquiry"}
    >
      {!configured && (
        <div className="form-availability">
          Online email sending is awaiting configuration. You can prepare your
          enquiry below, but it cannot be delivered until sending is enabled.
          Contact details are not saved in browser storage.
        </div>
      )}
      <div className="form-grid">
        <label>
          Your name
          <input
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
          />
        </label>
        {!compact && (
          <label>
            Company name
            <input
              name="company"
              autoComplete="organization"
              required
              minLength={2}
              maxLength={150}
            />
          </label>
        )}
        {compact && <input type="hidden" name="company" value="" />}
        <label>
          Work email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
        <label>
          Phone number
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            minLength={7}
            maxLength={30}
          />
        </label>
        {!compact && (
          <label>
            Website <small>(optional)</small>
            <input
              name="website"
              type="url"
              autoComplete="url"
              placeholder="https://"
              maxLength={300}
            />
          </label>
        )}
        {compact && <input type="hidden" name="website" value="" />}
        {!compact && (
          <label>
            Preferred contact
            <select name="preferred" defaultValue="Email">
              <option>Email</option>
              <option>Phone</option>
              <option>WhatsApp</option>
            </select>
          </label>
        )}
        {compact && <input type="hidden" name="preferred" value="Email" />}
      </div>
      {!compact && (
        <label>
          What would you like help with?
          <input
            name="interest"
            required
            defaultValue={interest}
            maxLength={120}
            placeholder="A website, CRM, automation, marketing…"
          />
        </label>
      )}
      {compact && (
        <input type="hidden" name="interest" value={interest} readOnly />
      )}
      <label>
        Tell us a little about your goals
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={3000}
          rows={4}
          placeholder="What would you like to change? What does a useful result look like?"
        />
      </label>
      <label className="honeypot" aria-hidden="true">
        Leave this field empty
        <input name="companyUrl" tabIndex={-1} autoComplete="off" />
      </label>
      <label className="consent-label">
        <input name="consent" type="checkbox" required />
        <span>
          I agree to the{" "}
          <Link href="/privacy" target="_blank">
            privacy notice
          </Link>{" "}
          and allow Wexoraa to contact me about this enquiry. No marketing
          subscription.
        </span>
      </label>
      {answers && (
        <p className="form-note">
          Your 12 answers and calculated summary will be included. No contact
          information is saved in your browser.
        </p>
      )}
      <div
        ref={feedback}
        tabIndex={-1}
        role="status"
        className={state === "error" ? "form-error" : "form-note"}
      >
        {error ||
          "Your details are used to understand and respond to your requirement."}
      </div>
      <button className="button" disabled={state === "loading"} type="submit">
        {state === "loading"
          ? "Sending enquiry…"
          : state === "error"
            ? "Try sending again"
            : answers
              ? "Send my assessment & enquiry"
              : "Send project enquiry"}
        <ArrowUpRight size={17} />
      </button>
    </form>
  );
}
