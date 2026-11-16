import { test, expect } from "@playwright/test";
test("horizon hero pauses offscreen and respects reduced motion without blocking discovery", async ({
  page,
}) => {
  await page.goto("/");
  const hero = page.locator(".hero-cinematic");
  await expect(hero).toHaveAttribute("data-orbit-active", "true");
  await expect(hero.locator(".horizon-mark i")).toHaveCount(7);
  await expect(
    hero.getByRole("link", { name: "Explore what we do" }),
  ).toHaveAttribute("href", "/services");
  await page.locator("#challenge").scrollIntoViewIfNeeded();
  await expect(hero).toHaveAttribute("data-orbit-active", "false");
  await expect(hero.locator(".horizon-mark i").first()).toHaveCSS(
    "animation-play-state",
    "paused",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(() => scrollTo(0, 0));
  await expect(hero).toHaveAttribute("data-orbit-active", "false");
  await expect(hero.locator(".horizon-mark i").first()).toHaveCSS(
    "animation-name",
    "none",
  );
  await hero.getByRole("link", { name: "Let’s build something" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
});
