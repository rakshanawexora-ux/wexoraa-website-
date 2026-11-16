import { test, expect } from "@playwright/test";
import { quickScore } from "../src/content/quick-check";
test("quick score excludes unknowns and needs two known answers", () => {
  expect(quickScore([2, 2, 2, 2])).toBe(100);
  expect(quickScore([0, 0, 0, 0])).toBe(0);
  expect(quickScore([2, 0, 3, 3])).toBe(50);
  expect(quickScore([2, 3, 3, 3])).toBeNull();
  expect(quickScore([2, 2])).toBeNull();
});
test("four questions, animated preparation, visible result and contact-only follow-up", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".survey-start").click();
  const check = page.locator(".quick-check");
  await check.getByLabel("Your name", { exact: true }).fill("Test Owner");
  await check
    .getByLabel("Work email", { exact: true })
    .fill("owner@example.com");
  await check.getByLabel("Phone number", { exact: true }).fill("9876543210");
  await check.getByRole("button", { name: "Let’s check my business" }).click();
  for (let i = 0; i < 4; i++) {
    await check.getByRole("radio").nth(2).check();
    await check
      .getByRole("button", {
        name: i === 3 ? "See my snapshot" : "Continue",
        exact: true,
      })
      .click();
  }
  await expect(check.getByText("Preparing your snapshot")).toBeVisible();
  await expect(
    check.getByRole("img", { name: "Digital readiness 100 out of 100" }),
  ).toBeVisible();
  await expect(check.locator(".animated-score strong")).toHaveText("100");
  await check.getByText("Edit contact details", { exact: true }).click();
  await expect(check.getByLabel("Your name", { exact: true })).toHaveValue(
    "Test Owner",
  );
  await expect(check.locator("textarea")).toHaveCount(0);
  await expect(check.locator('input[name="message"]')).toHaveValue(/Website:/);
  await check.getByRole("button", { name: "Edit my answers" }).click();
  await expect(check.getByRole("radio").nth(2)).toBeChecked();
});
test("services respond to mouse hover and still support keyboard selection", async ({
  page,
}) => {
  await page.goto("/");
  const tabs = page.getByRole("tab");
  await tabs.nth(1).hover();
  await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
  await tabs.nth(1).click();
  await tabs.nth(0).hover();
  await expect(tabs.nth(0)).toHaveAttribute("aria-selected", "true");
  await tabs.nth(1).focus();
  await page.keyboard.press("ArrowRight");
  await expect(tabs.nth(2)).toHaveAttribute("aria-selected", "true");
});
