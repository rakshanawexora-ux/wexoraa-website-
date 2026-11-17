"use client";
import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { useLeadSubmission } from "@/hooks/use-lead-submission";
import { leadEndpoint } from "@/lib/lead-master";
import type { Answers } from "@/content/assessment";
export default function EnquiryForm({
  answers,
  interest = "",

  compact = false,
  summaryText,
  initialContact,
  businessName = "",
}: {
  answers?: Answers;
  interest?: string;
  configured?: boolean;
  compact?: boolean;
  summaryText?: string;
  businessName?: string;
  initialContact?: { name: string; email: string; phone: string };
}) {
  const { state, error, submit: save } = useLeadSubmission();
  const configured = Boolean(leadEndpoint());
  const pathname = usePathname();
  const feedback = useRef<HTMLDivElement>(null);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const saved = await save({
      name: String(form.get("name") || ""),
      company: String(form.get("company") || ""),
      role: "",
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      preferred: String(form.get("preferred") || "Phone"),
      source: compact ? "Enquiry popup" : "Contact page",
      interest: String(form.get("interest") || "Project enquiry"),
      problem: String(form.get("message") || ""),
      score: null,
      answers: { Website: String(form.get("website") || ""), Page: pathname },
      consent: form.get("consent") === "on",
      companyUrl: String(form.get("companyUrl") || ""),
    });
    requestAnimationFrame(() => feedback.current?.focus());
    return saved;
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
          Your details have been recorded in our private lead sheet. We can
          contact you about the next step using your preferred method.
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
          but sending will be available once the lead sheet is connected.
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
          Your shared answers and summary will be included. No contact
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
