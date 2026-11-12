import { test, expect } from "@playwright/test";
test("hero rotates at six seconds, loops and allows manual slides without playback buttons", async ({
  page,
}) => {
  await page.clock.install();
  await page.goto("/");
  const hero = page.locator(".hero-cinematic");
  await expect(hero).toHaveAttribute("data-hero-slide", "1");
  await page.clock.fastForward(5000);
  await expect(hero).toHaveAttribute("data-hero-slide", "1");
  await page.clock.fastForward(1100);
  await expect(hero).toHaveAttribute("data-hero-slide", "2");
  await expect(hero.getByRole("heading", { level: 1 })).toContainText(
    "Your brand.",
  );
  await page.clock.fastForward(6000);
  await expect(hero).toHaveAttribute("data-hero-slide", "3");
  await page.clock.fastForward(6000);
  await expect(hero).toHaveAttribute("data-hero-slide", "1");
  await hero
    .getByRole("button", { name: "Show slide 2: Branding and website design" })
    .click();
  await page.clock.fastForward(12000);
  await expect(hero).toHaveAttribute("data-hero-slide", "2");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await hero
    .getByRole("button", {
      name: "Show slide 3: Business software and automation",
    })
    .click();
  await page.clock.fastForward(12000);
  await expect(hero).toHaveAttribute("data-hero-slide", "3");
  await expect(hero.getByRole("button", { name: /pause|play/i })).toHaveCount(
    0,
  );
});
