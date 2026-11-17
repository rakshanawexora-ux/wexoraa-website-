import { test, expect } from "./fixtures";
import {
  leadEndpoint,
  leadMasterUrl,
  saveLead,
  type LeadPayload,
} from "../src/lib/lead-master";
const lead: LeadPayload = {
  name: "Test Owner",
  company: "Test Co",
  role: "Owner",
  phone: "+919876543210",
  email: "owner@example.com",
  preferred: "Phone",
  source: "Contact page",
  interest: "Website",
  problem: "We need a new website.",
  score: null,
  consent: true,
  companyUrl: "",
};
test("lead endpoint rejects arbitrary destinations and allows the supplied public Web App", () => {
  const original = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL;
  try {
    delete process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL;
    expect(leadEndpoint()).toBe(leadMasterUrl);
    process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL =
      "https://example.com/collect";
    expect(leadEndpoint()).toBeUndefined();
    process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL = "";
    expect(leadEndpoint()).toBeUndefined();
  } finally {
    if (original === undefined)
      delete process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL;
    else process.env.NEXT_PUBLIC_GOOGLE_SHEETS_WEBHOOK_URL = original;
  }
});
test("a readable matching acknowledgement is required; opaque, failure and mismatched replies cannot show success", async () => {
  const original = globalThis.fetch;
  try {
    for (const reply of [
      { accepted: false, error: "Save failed" },
      { accepted: true, requestId: "wrong" },
    ]) {
      globalThis.fetch = async () => new Response(JSON.stringify(reply));
      await expect(saveLead(lead, "test-request")).rejects.toThrow();
    }
    globalThis.fetch = async () =>
      ({
        ok: true,
        json: async () => {
          throw Error("opaque");
        },
      }) as unknown as Response;
    await expect(saveLead(lead, "test-request")).rejects.toThrow(/confirm/);
  } finally {
    globalThis.fetch = original;
  }
});
test("lead submission uses a simple POST, contains source and preserves explicit zero scores", async () => {
  const original = globalThis.fetch;
  try {
    globalThis.fetch = async (_url, init) => {
      expect(init?.method).toBe("POST");
      expect(init?.credentials).toBe("omit");
      expect(init?.headers).toBeUndefined();
      const p = JSON.parse(
        new URLSearchParams(init?.body as URLSearchParams).get("payload")!,
      );
      expect(p.score).toBe(0);
      expect(p.source).toBe("Contact page");
      expect(p.requestId).toBe("retry-stable-id");
      return new Response(
        JSON.stringify({ accepted: true, requestId: p.requestId }),
      );
    };
    await expect(
      saveLead({ ...lead, score: 0 }, "retry-stable-id"),
    ).resolves.toMatchObject({ accepted: true });
  } finally {
    globalThis.fetch = original;
  }
});
