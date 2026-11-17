import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { runInNewContext } from "node:vm";
function handler() {
  const rows: unknown[][] = [Array(17).fill("header")];
  let fail = false;
  const tab = {
    getLastRow: () => rows.length,
    getRange: (row: number, col: number) => ({
      getValue: () => rows[row - 1][col - 1],
      createTextFinder: (value: string) => {
        const finder = {
          matchEntireCell: () => finder,
          findNext: () => {
            const index = rows.findIndex((r, i) => i > 0 && r[14] === value);
            return index < 0 ? null : { getRow: () => index + 1 };
          },
        };
        return finder;
      },
    }),
    appendRow: (row: unknown[]) => {
      if (fail) throw Error("storage unavailable");
      rows.push(row);
    },
  };
  const cache = new Map<string, string>();
  const context = {
    ContentService: {
      MimeType: { JSON: "json" },
      createTextOutput: (text: string) => ({
        setMimeType: () => JSON.parse(text),
      }),
    },
    PropertiesService: {
      getScriptProperties: () => ({ getProperty: () => "private-sheet" }),
    },
    SpreadsheetApp: {
      openById: () => ({ getSheetByName: () => tab }),
      flush: () => {},
    },
    LockService: {
      getScriptLock: () => ({
        tryLock: () => true,
        hasLock: () => true,
        releaseLock: () => {},
      }),
    },
    CacheService: {
      getScriptCache: () => ({
        get: (key: string) => cache.get(key),
        put: (key: string, val: string) => cache.set(key, val),
      }),
    },
    Utilities: {
      DigestAlgorithm: { SHA_256: "sha256" },
      computeDigest: (_: unknown, text: string) =>
        Array.from(createHash("sha256").update(text).digest()),
    },
  };
  runInNewContext(
    readFileSync("integrations/Wexoraa-Website-Enquiries.gs", "utf8"),
    context,
  );
  const post = (payload: unknown) =>
    (
      context as unknown as {
        doPost: (e: unknown) => { accepted: boolean; error?: string };
      }
    ).doPost({ parameter: { payload: JSON.stringify(payload) } });
  return {
    rows,
    post,
    fail: () => {
      fail = true;
    },
  };
}
const payload = {
  name: "Test Owner",
  company: "Example",
  email: "owner@example.com",
  phone: "+919876543210",
  website: "",
  interest: "Website",
  message: "Please help with our new website.",
  preferred: "Email",
  source: "Contact page",
  page: "/contact",
  score: null,
  consent: true,
  companyUrl: "",
  requestId: "a8ae192a-1234-4567-8890-123456789012",
  submittedAt: "2026-11-17T00:00:00.000Z",
};
test("sheet save acknowledges only stored rows, escapes formulas and deduplicates retries", () => {
  const h = handler();
  const request = {
    ...payload,
    message: '=IMPORTXML("https://example.com","//title")',
  };
  expect(h.post(request).accepted).toBe(true);
  expect(h.rows).toHaveLength(2);
  expect(String(h.rows[1][7])).toMatch(/^'=/);
  expect(h.post(request).accepted).toBe(true);
  expect(h.rows).toHaveLength(2);
  expect(
    h.post({
      ...request,
      message: "A changed enquiry with the same request id.",
    }).accepted,
  ).toBe(false);
  const failed = handler();
  failed.fail();
  expect(failed.post(payload).accepted).toBe(false);
});
test("sheet handler rejects invalid consent, spam, oversize and malformed data", () => {
  const h = handler();
  for (const data of [
    { ...payload, consent: false },
    { ...payload, companyUrl: "https://spam.example" },
    { ...payload, email: "bad" },
    { ...payload, message: "x".repeat(17000) },
    { ...payload, score: 101 },
  ])
    expect(h.post(data).accepted).toBe(false);
  expect(h.rows).toHaveLength(1);
});
