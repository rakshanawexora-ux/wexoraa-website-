"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { questions, scoreAssessment, type Answers } from "@/content/assessment";
import {
  googleEnquiryFormUrl,
  googleEnquiryEmbedUrl,
} from "@/content/enquiry-provider";

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
  initialContact?: { name: string; email: string; phone: string };
  businessName?: string;
}) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const assessment = answers ? scoreAssessment(answers) : null;
  const summary = [
    `Enquiry source: ${pathname}`,
    interest && `Interested in: ${interest}`,
    businessName && `Business: ${businessName}`,
    initialContact?.name && `Name: ${initialContact.name}`,
    initialContact?.email && `Email: ${initialContact.email}`,
    initialContact?.phone && `Phone: ${initialContact.phone}`,
    summaryText,
    assessment &&
      `Assessment score: ${assessment.score === null ? "More context needed" : `${assessment.score}/100`} — ${assessment.band}`,
    answers &&
      questions
        .map((q) => `${q.title}: ${(answers[q.id] || []).join(", ")}`)
        .join("\n"),
  ]
    .filter(Boolean)
    .join("\n\n");
  async function copySummary() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setCopyFailed(false);
    } catch {
      setCopyFailed(true);
    }
  }
  return (
    <div
      className={`google-enquiry ${compact ? "google-enquiry-compact" : ""}`}
    >
      <div className="google-enquiry-intro">
        <p>
          Send your enquiry using the form below. Submit inside the Google Form
          to record your response.
        </p>
        <a
          href={googleEnquiryFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="google-form-open"
        >
          Open form in a new tab <ArrowUpRight size={16} />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
      <details
        className="google-enquiry-summary"
        open={Boolean(summaryText || answers)}
      >
        <summary>
          {summaryText || answers
            ? "Include your business check"
            : "Include your enquiry context"}
        </summary>
        <p>
          Copy this summary and paste it into <strong>Project Details</strong>{" "}
          in the form. Details and scores are not transferred automatically.
        </p>
        <textarea
          aria-label="Enquiry summary to copy"
          value={summary}
          readOnly
          rows={5}
        />
        <button
          type="button"
          className="button button-outline"
          onClick={copySummary}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}{" "}
          {copied ? "Summary copied" : "Copy summary"}
        </button>
        <span role="status">
          {copyFailed
            ? "Select the summary above and copy it manually."
            : copied
              ? "Paste the summary into Project Details before submitting."
              : ""}
        </span>
      </details>
      <iframe
        src={googleEnquiryEmbedUrl}
        title="Wexoraa project enquiry Google Form"
        className="google-enquiry-frame"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
      <p className="google-enquiry-note">
        Google processes this form. If it does not appear, use the new-tab link
        above. Your response is recorded only when you press Submit in the
        Google Form.
      </p>
    </div>
  );
}
