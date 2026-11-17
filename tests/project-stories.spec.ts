import { test, expect } from "./fixtures";
import AxeBuilder from "@axe-core/playwright";
import { portfolio } from "../src/content/portfolio";
const projects = portfolio.filter((p) =>
  [
    "/work/exploring-munnar.webp",
    "/work/gym-hack.webp",
    "/work/taerg-laundry-social.webp",
    "/work/hita-home-d-cor-social.webp",
  ].includes(p.image),
);
test("project links work and the removed testimonial section stays absent", async ({
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
    ).toHaveAttribute(
      "href",
      `/work#${project.image.split("/").pop()?.replace(".webp", "")}`,
    );
  }
  await expect(page.locator(".client-stories")).toHaveCount(0);
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
