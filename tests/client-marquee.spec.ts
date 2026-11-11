import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("client marks stay readable with controllable motion and a static reduced-motion layout", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/");
  const section = page.getByRole("region", {
    name: "Businesses we’ve worked with.",
  });
  await section.scrollIntoViewIfNeeded();
  await expect(
    section.getByRole("list", { name: "Wexoraa clients" }).getByRole("img"),
  ).toHaveCount(4);
  for (const name of [
    "Intercity Riders",
    "Oneway Drop Taxi",
    "TaerG Laundry",
    "Vlasy Unisex Salon",
  ])
    await expect(section.getByRole("img", { name, exact: true })).toHaveCount(
      1,
    );
  await section.getByRole("button", { name: "Pause client logos" }).click();
  await expect(section.locator(".client-marquee-track")).toHaveCSS(
    "animation-play-state",
    "paused",
  );
  await section.getByRole("button", { name: "Resume client logos" }).click();
  await page.mouse.move(2, 2);
  await expect(section.locator(".client-marquee-track")).toHaveCSS(
    "animation-play-state",
    "running",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(section.locator(".client-marquee-track")).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(section.getByRole("button")).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const scan = await new AxeBuilder({ page })
    .include(".client-marquee")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(scan.violations.map((v) => v.id)).toEqual([]);
});
