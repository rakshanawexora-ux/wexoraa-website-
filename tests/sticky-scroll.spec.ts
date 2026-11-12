import { test, expect } from "@playwright/test";
import { projects } from "../src/content/catalog";
test("desktop project scene stays pinned while native scrolling changes the chapter", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  const track = page.locator(".project-story-track");
  const stage = page.locator(".project-story-stage");
  await expect(track).toHaveAttribute("data-sticky", "true");
  const top = await track.evaluate(
    (el) => el.getBoundingClientRect().top + scrollY,
  );
  await page.evaluate((y) => {
    document.documentElement.style.scrollBehavior = "auto";
    scrollTo(0, y + 20);
  }, top);
  await expect
    .poll(async () => Math.round((await stage.boundingBox())!.y))
    .toBe(112);
  const transform = await page
    .locator(".sticky-image-plane")
    .evaluate((el) => getComputedStyle(el).transform);
  await page.evaluate((y) => scrollTo(0, y + 800), top);
  await expect
    .poll(async () => Math.round((await stage.boundingBox())!.y))
    .toBe(112);
  await expect(page.locator(".showcase-project-copy h3")).toHaveText(
    projects[1].title,
  );
  await expect
    .poll(() =>
      page
        .locator(".sticky-image-plane")
        .evaluate((el) => getComputedStyle(el).transform),
    )
    .not.toBe(transform);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(stage).toHaveCSS("position", "static");
  await expect(track).toHaveAttribute("data-sticky", "false");
  await page.setViewportSize({ width: 390, height: 900 });
  await expect(stage).toHaveCSS("position", "static");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
for (const size of [
  { width: 1366, height: 635, top: 112 },
  { width: 800, height: 600, top: 96 },
]) {
  test(`sticky is available in a compact ${size.width}x${size.height} browser`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: size.width, height: size.height });
    await page.goto("/");
    const track = page.locator(".project-story-track"),
      stage = page.locator(".project-story-stage");
    await expect(track).toHaveAttribute("data-sticky", "true");
    const top = await track.evaluate(
      (el) => el.getBoundingClientRect().top + scrollY,
    );
    await page.evaluate((y) => {
      document.documentElement.style.scrollBehavior = "auto";
      scrollTo(0, y + 10);
    }, top);
    await expect
      .poll(async () => Math.round((await stage.boundingBox())!.y))
      .toBe(size.top);
    const action = await stage
      .getByRole("link", { name: "View the concept" })
      .boundingBox();
    expect(action!.y).toBeGreaterThan(size.top);
    expect(action!.y + action!.height).toBeLessThan(size.height);
    await page.evaluate((y) => scrollTo(0, y + innerHeight * 0.9), top);
    await expect
      .poll(async () => Math.round((await stage.boundingBox())!.y))
      .toBe(size.top);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}
test("phone project image uses a native sticky stack", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".showcase-image-link")).toHaveCSS(
    "position",
    "sticky",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".showcase-image-link")).toHaveCSS(
    "position",
    "static",
  );
});
