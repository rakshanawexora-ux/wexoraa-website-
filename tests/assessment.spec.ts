import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("15 questions, resume answers, prioritization, recommendations and revision", async ({
  page,
}) => {
  await page.goto("/business-assessment");
  await page.getByLabel("Retail & e-commerce", { exact: true }).check();
  await page.reload();
  await expect(
    page.getByLabel("Retail & e-commerce", { exact: true }),
  ).toBeChecked();
  await page.getByRole("button", { name: "Next question" }).click();
  for (let i = 1; i < 15; i++) {
    const inputs = page.locator(".assessment-options input");
    await inputs.first().check();
    if (i === 13) {
      await inputs.nth(1).check();
      await inputs.nth(2).check();
      await inputs.nth(3).click();
      await expect(page.getByRole("status")).toContainText("Choose up to 3");
      await expect(inputs.nth(3)).not.toBeChecked();
    }
    await page
      .getByRole("button", {
        name: i === 14 ? "See my opportunities" : "Next question",
      })
      .click();
  }
  await expect(
    page.getByRole("heading", {
      name: "A few possibilities. A clearer next step.",
    }),
  ).toBeVisible();
  await expect(
    page.getByText("no information has been submitted", { exact: false }),
  ).toBeVisible();
  await expect(page.locator(".opportunity").first()).toContainText(
    "Digital Presence",
  );
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(scan.violations).toEqual([]);
  await page.getByRole("button", { name: "Revise answers" }).click();
  await expect(
    page.getByLabel("Retail & e-commerce", { exact: true }),
  ).toBeChecked();
});
test("manual-process branch updates progress and skip does not submit data", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 900 });
  await page.goto("/business-assessment");
  for (let i = 0; i < 9; i++)
    await page.getByRole("button", { name: "Skip", exact: true }).click();
  await page
    .getByLabel("Spreadsheets and manual processes", { exact: true })
    .check();
  await expect(page.getByText("QUESTION 10 OF 14")).toBeVisible();
  await page.getByRole("button", { name: "Next question" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Which repetitive tasks consume the most employee time?",
    }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(scan.violations).toEqual([]);
  for (let i = 10; i < 14; i++)
    await page.getByRole("button", { name: "Skip", exact: true }).click();
  await page
    .getByRole("button", { name: "Clear answers and start again" })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "What industry does your business operate in?",
    }),
  ).toBeVisible();
  await expect
    .poll(() =>
      page.evaluate(() => sessionStorage.getItem("wexoraa-assessment-v2")),
    )
    .toMatch(/^(null|\{\})$/);
});
test("uncertain answers are exclusive and omitted branch answers do not affect insights", async ({
  page,
}) => {
  await page.goto("/business-assessment");
  await page.evaluate(() =>
    sessionStorage.setItem(
      "wexoraa-assessment-v2",
      JSON.stringify({
        connected: ["Partially"],
        operations: ["Spreadsheets and manual processes"],
      }),
    ),
  );
  await page.reload();
  for (let i = 0; i < 3; i++)
    await page.getByRole("button", { name: "Skip", exact: true }).click();
  await page
    .getByLabel("Improve our digital presence", { exact: true })
    .check();
  await page.getByLabel("Not sure yet", { exact: true }).check();
  await expect(
    page.getByLabel("Improve our digital presence", { exact: true }),
  ).not.toBeChecked();
  await page.getByRole("button", { name: "Next question" }).click();
  for (let i = 4; i < 14; i++) {
    await page
      .getByRole("button", {
        name: i === 9 ? "Next question" : "Skip",
        exact: true,
      })
      .click();
  }
  await expect(
    page.getByRole("heading", {
      name: "A few possibilities. A clearer next step.",
    }),
  ).toBeVisible();
  await expect(page.locator(".opportunity")).not.toContainText("CRM / ERP");
});
