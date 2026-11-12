import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("business motion graphic changes the explanation and respects reduced motion", async ({
  page,
}) => {
  await page.goto("/");
  const graphic = page.locator(".business-motion");
  await graphic.scrollIntoViewIfNeeded();
  await expect(graphic).toHaveAttribute("data-flow-active", "true");
  await graphic.getByRole("button", { name: "Systems", exact: true }).click();
  await expect(
    graphic.getByRole("heading", { name: "One shared system" }),
  ).toBeVisible();
  await expect(graphic.locator(".flow-summary")).toContainText(
    "who needs a reply",
  );
  await graphic.getByRole("button", { name: "Marketing", exact: true }).click();
  await expect(
    graphic.getByRole("heading", { name: "The right audience" }),
  ).toBeVisible();
  await page.setViewportSize({ width: 390, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(graphic).toHaveAttribute("data-flow-active", "false");
  await expect(graphic.locator(".flow-packet").first()).toHaveCSS(
    "display",
    "none",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const scan = await new AxeBuilder({ page })
    .include(".business-motion")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(scan.violations.map((v) => v.id)).toEqual([]);
});
