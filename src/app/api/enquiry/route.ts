import { createHash } from "node:crypto";
import { z } from "zod";
import { enquirySchema, escapeHtml, emailConfigured } from "@/lib/enquiry";
import { questions, scoreAssessment } from "@/content/assessment";
export const runtime = "nodejs";
const MAX_BYTES = 16000;
const attempts = new Map<string, { count: number; until: number }>();
const submissions = new Map<
  string,
  { state: "pending" | "accepted"; until: number }
>();
function reply(
  error: string,
  status: number,
  headers: Record<string, string> = {},
) {
  return Response.json(
    { error },
    { status, headers: { "Cache-Control": "no-store", ...headers } },
  );
}
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return reply("Please send this form from the website.", 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return reply("Use a JSON request.", 415);
  if (Number(request.headers.get("content-length") || 0) > MAX_BYTES)
    return reply("Your enquiry is too large. Please shorten the message.", 413);
  const now = Date.now();
  for (const [k, v] of attempts) if (v.until < now) attempts.delete(k);
  for (const [k, v] of submissions) if (v.until < now) submissions.delete(k);
  const identity = process.env.VERCEL
    ? request.headers.get("x-vercel-forwarded-for") ||
      request.headers.get("x-forwarded-for") ||
      "shared"
    : "shared";
  const ip = createHash("sha256").update(identity).digest("hex");
  const rate = attempts.get(ip);
  if (rate && rate.count >= 8)
    return reply("Please wait a few minutes before trying again.", 429, {
      "Retry-After": "600",
    });
  if (attempts.size >= 1000 && !rate)
    return reply("The service is busy. Please try again shortly.", 503);
  attempts.set(ip, {
    count: (rate?.count || 0) + 1,
    until: rate?.until || now + 600000,
  });
  let raw: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply("The enquiry is empty.", 400);
    let length = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BYTES) {
        await reader.cancel();
        return reply(
          "Your enquiry is too large. Please shorten the message.",
          413,
        );
      }
      chunks.push(value);
    }
    raw = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return reply("Please check the form and try again.", 400);
  }
  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success)
    return reply(
      "Please check your details, message and privacy consent.",
      400,
    );
  const data = parsed.data;
  if (data.companyUrl)
    return reply("This submission could not be accepted.", 400);
  if (
    !emailConfigured() ||
    !z.email().safeParse(process.env.WEXORAA_LEAD_EMAIL).success ||
    !z.email().safeParse(process.env.WEXORAA_FROM_EMAIL).success
  )
    return reply(
      "Online sending is not configured yet. Your details have not been sent. Please use the available contact options or try again later.",
      503,
    );
  const key = createHash("sha256").update(JSON.stringify(data)).digest("hex");
  const previous = submissions.get(key);
  if (previous?.state === "accepted")
    return Response.json(
      { accepted: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  if (previous?.state === "pending")
    return reply(
      "This enquiry is already being processed. Please retry in a moment.",
      409,
    );
  if (submissions.size >= 500)
    return reply("The service is busy. Please try again shortly.", 503);
  submissions.set(key, { state: "pending", until: now + 120000 });
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Company", data.company],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Website", data.website || "Not supplied"],
    ["Interest", data.interest],
    ["Preferred contact", data.preferred],
    ["Message", data.message],
    ["Consent", "Explicit privacy consent provided; no marketing subscription"],
    ["Consent timestamp (client)", data.submittedAt],
  ];
  if (data.answers) {
    for (const q of questions)
      rows.push([q.title, data.answers[q.id].join(", ")]);
    const result = scoreAssessment(data.answers);
    rows.push(
      [
        "Self-reported digital strength",
        result.score === null
          ? "Insufficient known responses"
          : `${result.score}/100 (${result.eligible}/8 scored questions known)`,
      ],
      [
        "Method",
        "Equal-weight 0–3 rubric; preliminary self-assessment, not scientifically validated",
      ],
      [
        "Opportunities",
        result.opportunities.map((o) => o.title).join(", ") ||
          "Review goals in consultation",
      ],
    );
  }
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": key,
      },
      body: JSON.stringify({
        from: process.env.WEXORAA_FROM_EMAIL,
        to: [process.env.WEXORAA_LEAD_EMAIL],
        reply_to: data.email,
        subject: data.answers
          ? "Wexoraa business assessment enquiry"
          : "Wexoraa project enquiry",
        html: `<h1>New website enquiry</h1><table>${rows.map(([k, v]) => `<tr><th align="left">${escapeHtml(k)}</th><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`).join("")}</table>`,
        text: rows.map(([k, v]) => `${k}: ${v}`).join("\n\n"),
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) {
      submissions.delete(key);
      return reply(
        "The email service did not accept your enquiry. Your entries are still here; please try again.",
        502,
      );
    }
    const accepted = await response.json();
    if (!accepted.id) {
      submissions.delete(key);
      return reply(
        "The email service could not confirm acceptance. Please retry.",
        502,
      );
    }
    submissions.set(key, { state: "accepted", until: now + 86400000 });
    return Response.json(
      { accepted: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    submissions.delete(key);
    return reply(
      "We could not confirm email acceptance. Your entries are still here; please retry.",
      502,
    );
  }
}
