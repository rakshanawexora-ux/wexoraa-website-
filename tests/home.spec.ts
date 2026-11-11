import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
async function scan(page: import("@playwright/test").Page) {
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(
    result.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  ).toEqual([]);
}
test("solution tabs, process accordion and contact route", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Good design.",
  );
  await page.getByRole("tab", { name: "02 Operate." }).click();
  await expect(page.getByRole("tabpanel")).toContainText(
    "CRM & lead management",
  );
  await page.getByRole("tab", { name: "02 Operate." }).press("ArrowRight");
  await expect(page.getByRole("tab", { name: "03 Grow." })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText(
    "Performance marketing",
  );
  await page.getByRole("button", { name: "02 Diagnose" }).click();
  await expect(
    page.getByRole("heading", { name: "Find the problem behind the brief." }),
  ).toBeVisible();
  await scan(page);
  await page.getByRole("link", { name: "Let’s build something" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Good things start",
  );
  expect(errors).toEqual([]);
});
for (const [label, title] of [
  ["Our digital presence", "Make your first impression work harder."],
  ["We get enquiries", "Turn scattered enquiries into a connected pipeline."],
  ["Too much of our day", "Give your team more time for meaningful work."],
  [
    "Our marketing needs",
    "Connect what you create to what you want to achieve.",
  ],
])
  test(`problem finder: ${label}`, async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: new RegExp(label) }).click();
    await expect(
      page.getByRole("button", { name: "Find my starting point" }),
    ).toBeDisabled();
    await page
      .getByRole("button", {
        name: "Growing an existing business",
        exact: true,
      })
      .click();
    await page.getByRole("button", { name: "Find my starting point" }).click();
    await expect(page.getByRole("heading", { name: title })).toBeVisible();
    await expect(page.locator("#finder-result")).toBeFocused();
    await expect(
      page.getByRole("link", { name: "Let’s talk about this" }),
    ).toHaveAttribute("href", /challenge=/);
    await page.getByRole("button", { name: "Start again" }).click();
    await expect(
      page.getByRole("heading", {
        name: "What sounds most like your business?",
      }),
    ).toBeVisible();
  });
for (const width of [360, 390, 768, 1024, 1440])
  test(`responsive + axe at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const images = page.locator("img");
    await expect(images).toHaveCount(3);
    for (const image of await images.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (img) =>
              img instanceof HTMLImageElement &&
              img.complete &&
              img.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
    if (width < 641) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await expect(page.getByRole("navigation")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(
        page.getByRole("button", { name: "Open navigation" }),
      ).toBeFocused();
    }
    await scan(page);
    await page.mouse.move(0, 0);
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({
      path: `/workspace/artifacts/redesign-${width}.png`,
      fullPage: true,
    });
    if (width === 1440 || width === 390)
      await page.screenshot({
        path: `/workspace/artifacts/redesign-${width}-hero.png`,
      });
  });
test("motion effects and fine pointer cursor", async ({ page }) => {
  await page.goto("/");
  await page.mouse.move(600, 600);
  await expect(page.locator(".cursor-accent")).toHaveCSS("opacity", "1");
  await page.locator(".hero-media").hover();
  await expect(page.locator(".cursor-accent")).toHaveAttribute(
    "data-label",
    "Explore",
  );
  await page.evaluate(() => scrollTo(0, 600));
  await expect
    .poll(() =>
      page
        .locator(".hero-image-wrap")
        .evaluate((el) => getComputedStyle(el).transform),
    )
    .not.toBe("none");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".cursor-accent")).toHaveCSS("display", "none");
  await expect(page.locator(".marquee > div")).toHaveCSS(
    "animation-name",
    "none",
  );
  await expect(page.locator(".hero-image-wrap")).toHaveCSS("transform", "none");
});
test("mobile and touch do not get a cursor overlay", async ({ browser }) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000");
  await expect(page.locator(".cursor-accent")).toHaveCSS("opacity", "0");
  await context.close();
});
