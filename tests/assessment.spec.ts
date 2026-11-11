import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import {
  questions,
  scoreAssessment,
  type Answers,
} from "../src/content/assessment";
function answersAt(level: number): Answers {
  return Object.fromEntries(
    questions.map((q) => [q.id, [q.points ? q.options[level] : q.options[0]]]),
  );
}
test("transparent score boundaries, context invariance and unknown exclusions", () => {
  expect(questions).toHaveLength(12);
  expect(scoreAssessment(answersAt(0)).score).toBe(100);
  expect(scoreAssessment(answersAt(3)).score).toBe(0);
  const a = answersAt(1);
  expect(scoreAssessment(a).score).toBe(67);
  a.industry = [questions[0].options[3]];
  a.stage = [questions[1].options[2]];
  expect(scoreAssessment(a).score).toBe(67);
  for (const q of questions.filter((q) => q.points).slice(0, 4))
    a[q.id] = [q.options[4]];
  expect(scoreAssessment(a).eligible).toBe(4);
  expect(scoreAssessment(a).score).toBe(67);
  a.automation = [questions.find((q) => q.id === "automation")!.options[4]];
  expect(scoreAssessment(a).score).toBeNull();
  delete a.timing;
  expect(scoreAssessment(a).complete).toBe(false);
});
test("12-step survey on homepage, resume, score, revision and enquiry stays optional", async ({
  page,
}) => {
  await page.goto("/");
  const survey = page.locator(".embedded-survey");
  await survey.getByRole("radio").first().check();
  await page.reload();
  await expect(survey.getByRole("radio").first()).toBeChecked();
  for (let i = 0; i < 12; i++) {
    if (i === 10) {
      await survey.getByRole("checkbox").first().check();
    } else await survey.getByRole("radio").first().check();
    await survey
      .getByRole("button", {
        name: i === 11 ? "See my digital-strength score" : "Next question",
      })
      .click();
  }
  await expect(
    survey.getByRole("img", { name: "Digital-strength score 100 out of 100" }),
  ).toBeVisible();
  await expect(
    survey.getByText("Strong foundations", { exact: true }),
  ).toBeVisible();
  await expect(page.getByLabel("Your name", { exact: true })).toHaveCount(0);
  await survey.getByText("How is my score calculated?").click();
  await expect(
    survey.getByText("Each known capability answer", { exact: false }),
  ).toBeVisible();
  await survey.getByRole("button", { name: "Discuss my results" }).click();
  await expect(
    survey.getByRole("form", { name: "Discuss my assessment" }),
  ).toBeVisible();
  await expect(
    survey.getByText("Online email sending is awaiting configuration.", {
      exact: false,
    }),
  ).toBeVisible();
  await survey.getByRole("button", { name: "Revise answers" }).click();
  await expect(survey.getByRole("radio").first()).toBeChecked();
});
test("unknowns do not produce a misleading score; mobile survey is accessible", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 950 });
  await page.goto("/business-assessment");
  for (let i = 0; i < 12; i++) {
    if (i === 10)
      await page
        .getByRole("checkbox", { name: "Not sure yet", exact: true })
        .check();
    else if (i >= 2 && i <= 9)
      await page
        .getByRole("radio", { name: "Not sure / not applicable", exact: true })
        .check();
    else await page.getByRole("radio").first().check();
    await page
      .getByRole("button", {
        name: i === 11 ? "See my digital-strength score" : "Next question",
      })
      .click();
  }
  await expect(
    page.getByRole("img", {
      name: "Insufficient known responses to calculate a score",
    }),
  ).toBeVisible();
  await expect(
    page.getByText("More context needed", { exact: true }),
  ).toBeVisible();
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(
    scan.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
  await page
    .getByRole("button", { name: "Clear answers and start again" })
    .click();
  await expect(
    page.getByRole("heading", { name: "What kind of business do you run?" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
