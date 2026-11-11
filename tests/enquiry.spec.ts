import { test, expect } from "@playwright/test";
import { POST } from "../src/app/api/enquiry/route";
import { questions } from "../src/content/assessment";
import { enquirySchema } from "../src/lib/enquiry";
const payload = () => ({
  name: "Test <script>alert(1)</script>",
  company: "Test Company",
  email: "person@example.com",
  phone: "+919876543210",
  website: "",
  interest: "Website",
  message: "Please help us improve our website and enquiry journey.",
  preferred: "Email",
  consent: true,
  companyUrl: "",
  requestId: crypto.randomUUID(),
  submittedAt: "2026-11-11T10:00:00.000Z",
});
function req(data: unknown, ip = crypto.randomUUID()) {
  return new Request("https://wexoraa.test/api/enquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      origin: "https://wexoraa.test",
      "x-vercel-forwarded-for": ip,
    },
    body: JSON.stringify(data),
  });
}
test("handler rejects invalid consent, oversized body and off-site requests", async () => {
  process.env.VERCEL = "1";
  const p = payload();
  expect((await POST(req({ ...p, companyUrl: "spam.example" }))).status).toBe(
    400,
  );
  expect((await POST(req({ ...p, consent: false }))).status).toBe(400);
  expect((await POST(req({ ...p, message: "x".repeat(17000) }))).status).toBe(
    413,
  );
  expect(
    (
      await POST(
        new Request("https://wexoraa.test/api/enquiry", {
          method: "POST",
          headers: {
            origin: "https://elsewhere.test",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(p),
        }),
      )
    ).status,
  ).toBe(403);
  expect(
    enquirySchema.safeParse({ ...p, answers: { presence: ["invented"] } })
      .success,
  ).toBe(false);
});
test("missing configuration fails without pretending to send", async () => {
  process.env.VERCEL = "1";
  const prev = process.env.RESEND_API_KEY;
  delete process.env.RESEND_API_KEY;
  try {
    expect((await POST(req(payload()))).status).toBe(503);
  } finally {
    if (prev) process.env.RESEND_API_KEY = prev;
  }
});
test("provider failure retries, escaped complete emails, server scoring and duplicate acceptance", async () => {
  process.env.VERCEL = "1";
  const before = {
    key: process.env.RESEND_API_KEY,
    to: process.env.WEXORAA_LEAD_EMAIL,
    from: process.env.WEXORAA_FROM_EMAIL,
  };
  process.env.RESEND_API_KEY = "test-only-not-a-real-key";
  process.env.WEXORAA_LEAD_EMAIL = "leads@example.com";
  process.env.WEXORAA_FROM_EMAIL = "site@example.com";
  const original = globalThis.fetch;
  const calls: { body: string; key: string }[] = [];
  let fail = true;
  globalThis.fetch = (async (_url, init) => {
    calls.push({
      body: String(init?.body),
      key: (init?.headers as Record<string, string>)["Idempotency-Key"],
    });
    return fail
      ? Response.json({ error: "test outage" }, { status: 500 })
      : Response.json({ id: "test-provider-id" });
  }) as typeof fetch;
  try {
    const answers = Object.fromEntries(
      questions.map((q) => [q.id, [q.options[0]]]),
    );
    const data = { ...payload(), answers };
    expect((await POST(req(data))).status).toBe(502);
    fail = false;
    expect((await POST(req(data))).status).toBe(200);
    expect((await POST(req(data))).status).toBe(200);
    expect(calls).toHaveLength(2);
    expect(calls[0]).toEqual(calls[1]);
    const email = JSON.parse(calls[1].body);
    expect(email.html).toContain("&lt;script&gt;");
    expect(email.html).not.toContain("<script>");
    expect(email.text).toContain("100/100");
    for (const q of questions) expect(email.text).toContain(q.title);
  } finally {
    globalThis.fetch = original;
    for (const [k, v] of Object.entries({
      RESEND_API_KEY: before.key,
      WEXORAA_LEAD_EMAIL: before.to,
      WEXORAA_FROM_EMAIL: before.from,
    })) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  }
});
test("rate limit is bounded and rejects excess attempts", async () => {
  process.env.VERCEL = "1";
  const ip = crypto.randomUUID();
  for (let i = 0; i < 8; i++)
    await POST(req({ ...payload(), consent: false }, ip));
  expect((await POST(req(payload(), ip))).status).toBe(429);
});
