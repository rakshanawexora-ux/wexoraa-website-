import { test, expect } from "./fixtures";
import {
  fillBusinessDetails,
  completeChallenges,
  completeDigital,
  leadEndpoint,
} from "./business-details";
test("home check preserves answers, sends one lead and shows no score on an unconfirmed save", async ({
  page,
}) => {
  const ids: string[] = [];
  await page.route(leadEndpoint, async (r) => {
    const p = JSON.parse(
      new URLSearchParams(r.request().postData()!).get("payload")!,
    );
    ids.push(p.requestId);
    expect(p.source).toBe("Home growth checker");
    await r.fulfill({
      headers: { "Access-Control-Allow-Origin": "*" },
      json:
        ids.length === 1
          ? { accepted: false, error: "Test save failure" }
          : { accepted: true, requestId: p.requestId },
    });
  });
  await page.goto("/");
  await page.locator(".survey-start").click();
  await fillBusinessDetails(page);
  await page.keyboard.press("Escape");
  await page.locator(".survey-start").click();
  await expect(
    page.getByRole("heading", {
      name: "What gets in the way of a good workday?",
    }),
  ).toBeVisible();
  await completeChallenges(page);
  await completeDigital(page);
  await page.locator(".consent-label input").check();
  await page
    .getByRole("button", { name: "Get my business report", exact: true })
    .click();
  await expect(page.getByRole("status")).toContainText("Test save failure");
  await expect(page.locator(".solution-report")).toHaveCount(0);
  await expect(page.locator(".solution-review")).toContainText("Sample Studio");
  await page
    .getByRole("button", { name: "Retry and get my report", exact: true })
    .click();
  await expect(page.locator(".solution-report")).toBeVisible();
  expect(ids).toHaveLength(2);
  expect(ids[0]).toBe(ids[1]);
});
