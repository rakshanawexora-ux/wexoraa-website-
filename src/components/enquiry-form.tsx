"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { usePathname } from "next/navigation";
import { scoreAssessment } from "@/content/assessment";
import { sheetsEndpoint } from "@/lib/google-sheets";
import type { Answers } from "@/content/assessment";
export default function EnquiryForm({
  answers,
  interest = "",
  score,
  compact = false,
  summaryText,
  initialContact,
  businessName = "",
}: {
  answers?: Answers;
  interest?: string;
  configured?: boolean;
  score?: number | null;
  compact?: boolean;
  summaryText?: string;
  businessName?: string;
  initialContact?: { name: string; email: string; phone: string };
}) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const pathname = usePathname();
  const configured = Boolean(sheetsEndpoint());
  const payloadFingerprint = useRef("");
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
      const endpoint = sheetsEndpoint();
      if (!endpoint)
        throw new Error(
          "Enquiry storage is not connected yet. Please try again after setup is complete.",
        );
      const payload = {
        name: String(form.get("name") || ""),
        company: String(form.get("company") || ""),
        email: String(form.get("email") || ""),
        phone: String(form.get("phone") || ""),
        website: String(form.get("website") || ""),
        interest: String(form.get("interest") || ""),
        message: String(form.get("message") || ""),
        preferred: String(form.get("preferred") || "Email"),
        consent: form.get("consent") === "on",
        companyUrl: String(form.get("companyUrl") || ""),
        source: answers
          ? "Detailed assessment"
          : summaryText
            ? "Home growth checker"
            : compact
              ? "Enquiry popup"
              : "Contact page",
        page: pathname,
        score: answers ? scoreAssessment(answers).score : (score ?? null),
        ...(answers ? { answers } : {}),
      };
      const fingerprint = JSON.stringify(payload);
      if (payloadFingerprint.current !== fingerprint) {
        requestId.current = crypto.randomUUID();
        submittedAt.current = new Date().toISOString();
        payloadFingerprint.current = fingerprint;
      }
      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "omit",
        redirect: "follow",
        body: new URLSearchParams({
          payload: JSON.stringify({
            ...payload,
            requestId: requestId.current,
            submittedAt: submittedAt.current,
          }),
        }),
        signal: AbortSignal.timeout(30000),
      });
      const result = await response.json();
      if (!response.ok || !result.accepted)
        throw new Error(
          result.error ||
            "We could not confirm that your enquiry was saved. Please retry.",
        );
      setState("success");
      requestAnimationFrame(() => feedback.current?.focus());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Please try again.");
      setState("error");
      requestAnimationFrame(() => feedback.current?.focus());
    }
  }
  const contactFields = (
    <div className="form-grid">
      <label>
        Your name
        <input
          defaultValue={initialContact?.name}
          name="name"
          placeholder="Your full name"
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
      {compact && <input type="hidden" name="company" value={businessName} />}
      <label>
        Work email
        <input
          defaultValue={initialContact?.email}
          name="email"
          placeholder="you@company.com"
          type="email"
          autoComplete="email"
          required
          maxLength={254}
        />
      </label>
      <label>
        Phone number
        <input
          defaultValue={initialContact?.phone}
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
          <span>
            Website <small>(optional)</small>
          </span>
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
  );
  if (state === "success")
    return (
      <div className="send-success" ref={feedback} tabIndex={-1} role="status">
        <Check />
        <h3>Thanks. Your enquiry has been saved.</h3>
        <p>
          Your details have been recorded. We can use them to get back to you
          about your project.
        </p>
        <Link
          className="button text-link"
          href="/business-assessment/thank-you"
        >
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
          Online enquiries are not available yet. You can fill in your details,
          but sending will be available once the response sheet is connected.
        </div>
      )}
      {initialContact?.name &&
      initialContact?.email &&
      initialContact?.phone ? (
        <details className="snapshot-contact-review">
          <summary>
            {initialContact.name} · {initialContact.email}
            <span>Edit contact details</span>
          </summary>
          {contactFields}
        </details>
      ) : (
        contactFields
      )}
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
      {summaryText ? (
        <input type="hidden" name="message" value={summaryText} />
      ) : (
        <>
          <label>
            Tell us about your project
            <textarea
              name="message"
              required
              minLength={10}
              maxLength={3000}
              rows={4}
              placeholder="What would you like to change? What does a useful result look like?"
            />
          </label>
        </>
      )}
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
              : "Send enquiry"}
        <ArrowUpRight size={17} />
      </button>
    </form>
  );
}
