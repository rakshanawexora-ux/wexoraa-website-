import { test, expect } from "./fixtures";
import {
  allCheckQuestions,
  solutionReport,
  toggleAnswer,
  challengeQuestions,
} from "../src/content/solution-check";
import {
  fillBusinessDetails,
  completeChallenges,
  completeDigital,
  leadEndpoint,
} from "./business-details";
const strong = () =>
  Object.fromEntries(
    allCheckQuestions.map((q) => [
      q.id,
      [
        q.id === "tracking"
          ? q.options[2]
          : ["handling", "manual", "website", "growth"].includes(q.id)
            ? q.options.at(-1)!
            : q.id === "online"
              ? q.options[5]
              : q.options[0],
      ],
    ]),
  );
test("readiness has transparent boundaries and excludes contact, industry, business age and app ownership", () => {
  const a = strong();
  expect(solutionReport(a).score).toBe(100);
  const b = {
    ...a,
    businessType: ["Healthcare"],
    businessAge: ["Just getting started"],
    app: ["No"],
  };
  expect(solutionReport(b).score).toBe(100);
  const weak = {
    ...a,
    tracking: [challengeQuestions[2].options[4]],
    handling: challengeQuestions[1].options.slice(0, 3),
    manual: challengeQuestions[3].options.slice(0, 3),
    website: ["We don’t have a website yet"],
    online: ["We don’t promote our business online"],
    growth: [
      "We’re not reaching the right audience",
      "We’re not generating enough business enquiries",
      "Our brand is not getting enough visibility",
    ],
  };
  expect(solutionReport(weak).score).toBe(0);
  expect(solutionReport({ ...a, app: [] }).score).toBeNull();
  const q = challengeQuestions[3];
  expect(toggleAnswer([q.options[0]], q.exclusive!, q)).toEqual([q.exclusive]);
  expect(toggleAnswer([q.exclusive!], q.options[0], q)).toEqual([q.options[0]]);
});
test("detailed report is saved to the lead endpoint before the result appears", async ({
  page,
}) => {
  let calls = 0;
  await page.route(leadEndpoint, async (r) => {
    calls++;
    const data = JSON.parse(
      new URLSearchParams(r.request().postData()!).get("payload")!,
    );
    expect(data.source).toBe("Detailed assessment");
    expect(data.role).toBe("Owner");
    expect(data.businessType).toBe("Retail / Shopping");
    expect(data.score).toBe(100);
    expect(data.consent).toBe(true);
    await r.fulfill({
      headers: { "Access-Control-Allow-Origin": "*" },
      json: { accepted: true, requestId: data.requestId },
    });
  });
  await page.goto("/business-assessment");
  await fillBusinessDetails(page);
  await completeChallenges(page);
  await completeDigital(page);
  expect(calls).toBe(0);
  await expect(page.locator(".solution-report")).toHaveCount(0);
  await page.locator(".consent-label input").check();
  await page
    .getByRole("button", { name: "Get my business report", exact: true })
    .click();
  await expect(
    page.getByRole("img", { name: "Digital readiness 100 out of 100" }),
  ).toBeVisible();
  expect(calls).toBe(1);
  await expect(page.locator(".solution-saved")).toContainText("saved");
  await page.getByText("How your score is calculated", { exact: true }).click();
  await expect(page.getByText(/points earned ÷ 18/)).toBeVisible();
});
test("contact and answers are not persisted or sent on reload", async ({
  page,
}) => {
  await page.goto("/business-assessment");
  await page.getByLabel("Full name", { exact: true }).fill("Private Owner");
  const storage = await page.evaluate(() =>
    JSON.stringify({
      local: { ...localStorage },
      session: { ...sessionStorage },
    }),
  );
  expect(storage).not.toContain("Private Owner");
  await page.reload();
  await expect(page.getByLabel("Full name", { exact: true })).toHaveValue("");
});
