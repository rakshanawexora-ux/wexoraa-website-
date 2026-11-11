import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("connected interactions, navigation and accessible content", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Your next chapter.",
  );
  await page.getByRole("tab", { name: "/02 Operate." }).click();
  await expect(page.getByRole("tabpanel")).toContainText(
    "CRM & lead management",
  );
  await page.getByRole("tab", { name: "/02 Operate." }).press("ArrowRight");
  await expect(page.getByRole("tab", { name: "/03 Grow." })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText(
    "Performance marketing",
  );
  await page.getByRole("button", { name: "Separate vendors" }).click();
  await expect(
    page.getByText("Different briefs. Separate systems."),
  ).toBeVisible();
  await page.getByRole("button", { name: "02 Diagnose" }).click();
  await expect(
    page.getByRole("heading", { name: "Find the problem behind the brief." }),
  ).toBeVisible();
  const scan = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(scan.violations).toEqual([]);
  await page
    .getByRole("link", { name: "Discuss your project" })
    .first()
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Good things start",
  );
  await expect(
    page.getByText("This preview does not collect", { exact: false }),
  ).toBeVisible();
});
for (const width of [360, 390, 768, 1024, 1440])
  test(`responsive layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    if (width < 641) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await expect(page.getByRole("navigation")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("button", { name: "Open navigation" }),
      ).toBeFocused();
    }
    const scan = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(scan.violations).toEqual([]);
    await page.screenshot({
      path: `/workspace/artifacts/home-${width}.png`,
      fullPage: true,
    });
  });
