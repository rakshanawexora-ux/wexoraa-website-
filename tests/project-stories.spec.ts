import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "../src/content/catalog";
test("project browsing updates the concept link and client stories remain clearly pending", async ({
  page,
}) => {
  await page.goto("/");
  const work = page.locator(".project-showcase");
  for (const project of projects) {
    await expect(
      work.getByRole("heading", { name: project.title, exact: true }),
    ).toBeVisible();
    await expect(
      work.getByRole("link", { name: `View ${project.title}`, exact: true }),
    ).toHaveAttribute("href", `/work/${project.slug}`);
  }
  const stories = page.locator(".client-stories");
  await expect(
    stories.getByRole("heading", { name: "Intercity Riders", exact: true }),
  ).toBeVisible();
  await expect(stories.locator("blockquote")).toHaveCount(0);
  await expect(
    stories.getByText("CLIENT STORY / COMING SOON", { exact: true }),
  ).toHaveCount(1);
  await stories.getByRole("button", { name: "Next client story" }).click();
  await stories.getByRole("button", { name: "Next client story" }).click();
  await expect(
    stories.getByRole("heading", { name: "TaerG Laundry", exact: true }),
  ).toBeVisible();
  await page.setViewportSize({ width: 390, height: 950 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(async () => {
    await new Promise(requestAnimationFrame);
    await Promise.all(
      document
        .getAnimations()
        .filter((a) => a.effect?.getTiming().iterations !== Infinity)
        .map((a) => a.finished.catch(() => {})),
    );
  });
  const scan = await new AxeBuilder({ page })
    .include(".project-showcase")
    .include(".client-stories")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(
    scan.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
