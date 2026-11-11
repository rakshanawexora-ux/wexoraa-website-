import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("homepage actions stay readable on light and dark surfaces when hovered", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Pause client logos" }),
  ).toHaveCount(0);
  await expect(
    page.locator(
      ".engineering-card a, .process-left a, .partnership-bottom a, #solution-panel > a, .film-description a",
    ),
  ).toHaveCount(0);
  for (const selector of [
    ".header-project",
    ".cinematic-enquiry",
    ".film-toggle",
    ".survey-start",
    ".footer-invite-link",
  ]) {
    const action = page.locator(selector);
    await action.hover();
    await expect(action).toHaveCSS("background-color", "rgb(34, 38, 41)");
    await expect(action).toHaveCSS("color", "rgb(255, 255, 255)");
    const scan = await new AxeBuilder({ page })
      .include(selector)
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      scan.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => n.target),
      })),
    ).toEqual([]);
  }
});
