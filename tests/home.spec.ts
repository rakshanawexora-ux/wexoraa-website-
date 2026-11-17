import { stubGoogleForm } from "./google-form-fixture";
import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }) => stubGoogleForm(page));
import AxeBuilder from "@axe-core/playwright";
import { services, projects } from "../src/content/catalog";
for (const width of [360, 390, 768, 1024, 1440])
  test(`responsive homepage and accessibility ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Design. Tech.",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.locator(".client-marquee-window").focus();
    for (const img of await page.locator("img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate(
            (el) =>
              el instanceof HTMLImageElement &&
              el.complete &&
              el.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
    if (width < 641) {
      await page.getByRole("button", { name: "Open navigation" }).click();
      await expect(
        page.getByRole("navigation", { name: "Main navigation" }),
      ).toBeVisible();
      await page.keyboard.press("Escape");
    }
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
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      scan.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    ).toEqual([]);
    expect(errors).toEqual([]);
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({
      path: `/workspace/artifacts/complete-site-${width}.png`,
      fullPage: true,
      style: ".cursor-accent{visibility:hidden}",
    });
  });
test("cursor position changes hero depth; scroll and reduced motion stay supported", async ({
  page,
}) => {
  await page.goto("/");
  const visual = page.locator(".hero-image-wrap");
  await page.locator(".hero-media").scrollIntoViewIfNeeded();
  const before = await visual.evaluate((el) => getComputedStyle(el).transform);
  const bounds = await page.locator(".hero-media").boundingBox();
  await page.mouse.move(
    bounds!.x + bounds!.width * 0.85,
    bounds!.y + bounds!.height * 0.25,
  );
  await expect
    .poll(() => visual.evaluate((el) => getComputedStyle(el).transform))
    .not.toBe(before);
  await expect(page.locator(".cursor-accent")).toHaveAttribute(
    "data-label",
    "Explore",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(visual).toHaveCSS("transform", "none");
  await expect(page.locator(".cursor-accent")).toHaveCSS("display", "none");
  await expect(page.locator(".scroll-progress")).toHaveCount(0);
});
test("every published content route renders, unknown routes 404 and navigation uses real pages", async ({
  page,
  request,
}) => {
  const routes = [
    "/services",
    "/work",
    "/about",
    "/process",
    "/contact",
    "/privacy",
    "/business-assessment",
    "/business-assessment/thank-you",
    ...services.map((s) => `/services/${s.slug}`),
    ...projects.map((p) => `/work/${p.slug}`),
  ];
  for (const path of routes) {
    const r = await request.get(path);
    expect(r.status(), path).toBe(200);
    expect(await r.text(), path).toContain("<h1");
  }
  expect((await request.get("/services/no-such-service")).status()).toBe(404);
  expect((await request.get("/solutions/no-such-solution")).status()).toBe(404);
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "What we do", exact: true })
    .click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Better design. Easier work. More ways to grow.",
  );
  await page
    .getByRole("link", { name: /Websites & online stores/ })
    .first()
    .click();
  await expect(page).toHaveURL(/\/services\/websites-ecommerce$/);
});
test("contact enquiry embeds the supplied Google Form without posting to the old API", async ({
  page,
}) => {
  let calls = 0;
  await page.route("**/api/enquiry", (r) => {
    calls++;
    return r.abort();
  });
  await page.goto("/contact?interest=Website");
  await expect(
    page.getByTitle("Wexoraa project enquiry Google Form"),
  ).toHaveAttribute(
    "src",
    /1FAIpQLSfe_XQpPiY3_zFr585f2q-fEqx3ALdbdPQzJVBTN5WfAcbODw\/viewform\?embedded=true/,
  );
  await expect(
    page.getByRole("link", { name: /Open form in a new tab/ }),
  ).toHaveAttribute("target", "_blank");
  await page.getByText("Include your enquiry context", { exact: true }).click();
  await expect(page.getByLabel("Enquiry summary to copy")).toHaveValue(
    /Interested in: Website/,
  );
  await expect(
    page.getByText("Online enquiries are not available yet.", { exact: false }),
  ).toHaveCount(0);
  expect(calls).toBe(0);
});
for (const route of [
  "/contact",
  "/services/websites-ecommerce",
  "/work/considered-brand-experience",
  "/about",
  "/process",
  "/privacy",
])
  test(`mobile content accessibility ${route}`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 950 });
    await page.goto(route);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
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
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      scan.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({
          target: n.target,
          summary: n.failureSummary,
        })),
      })),
    ).toEqual([]);
  });

test("studio film autoplays in view, pauses offscreen and respects reduced motion", async ({
  page,
}) => {
  await page.goto("/");
  const video = page.locator(".brand-film");
  await expect(page.locator(".film-toggle")).toHaveCount(0);
  await page.locator(".mask-reveal-stage").scrollIntoViewIfNeeded();
  await expect
    .poll(() => video.evaluate((el) => (el as HTMLVideoElement).currentTime))
    .toBeGreaterThan(0.2);
  await expect(video).toHaveJSProperty("muted", true);
  await expect(video).toHaveJSProperty("loop", true);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(video).toHaveJSProperty("paused", true);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(video).toHaveJSProperty("paused", false);
  await page.locator(".hero-cinematic").scrollIntoViewIfNeeded();
  await expect(video).toHaveJSProperty("paused", true);
  await page.locator(".mask-reveal-stage").scrollIntoViewIfNeeded();
  await expect(video).toHaveJSProperty("paused", false);
});
test("inner page graphic changes selection and service card reacts to pointer movement", async ({
  page,
}) => {
  await page.goto("/services");
  await page
    .locator(".studio-scene")
    .getByRole("button", { name: "Systems", exact: true })
    .click();
  await expect(page.locator(".scene-bottom")).toContainText(
    "Keep your customers, team and tasks connected.",
  );
  await expect(
    page.getByRole("link", { name: "Explore Systems services" }),
  ).toHaveAttribute("href", "/services#operate");
  const card = page.locator(".catalog-card").first();
  await card.scrollIntoViewIfNeeded();
  const box = await card.boundingBox();
  await page.mouse.move(
    box!.x + box!.width * 0.85,
    box!.y + box!.height * 0.25,
  );
  await expect
    .poll(() => card.evaluate((el) => el.style.getPropertyValue("--tilt-y")))
    .not.toBe("");
  await expect
    .poll(() => card.evaluate((el) => getComputedStyle(el).transform))
    .not.toBe("none");
  await expect(
    page.getByRole("navigation", { name: "Footer explore" }),
  ).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect
    .poll(() =>
      card.evaluate(
        (el) =>
          new DOMMatrixReadOnly(getComputedStyle(el).transform).isIdentity,
      ),
    )
    .toBe(true);
});

test("service explorer filters, searches and recovers from no results", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 950 });
  await page.goto("/services");
  await expect(page.locator(".service-results .catalog-card")).toHaveCount(
    services.length,
  );
  await page
    .getByRole("button", { name: "Business systems", exact: true })
    .last()
    .click();
  await expect(page.locator(".service-results .catalog-card")).toHaveCount(4);
  await page.getByRole("searchbox", { name: "Search services" }).fill("CRM");
  await expect(page.locator(".service-results .catalog-card")).toHaveCount(1);
  await page
    .getByRole("searchbox", { name: "Search services" })
    .fill("unmatched-example");
  await expect(
    page.getByRole("heading", { name: "No exact match yet." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator(".service-results .catalog-card")).toHaveCount(
    services.length,
  );
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
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(
    scan.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
});

test("simple service enquiry popup is accessible and restores focus", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto("/services");
  await expect(
    page.getByRole("button", { name: "Pause motion", exact: true }),
  ).toHaveCount(0);
  await expect(page.locator(".service-card-actions")).toHaveCount(0);
  const cta = page.locator(".header-project");
  await cta.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByTitle("Wexoraa project enquiry Google Form"),
  ).toBeVisible();
  await expect(
    dialog.getByRole("button", { name: "Close enquiry" }),
  ).toBeFocused();
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
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(
    scan.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  ).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(cta).toBeFocused();
  await cta.click();
  await expect(
    dialog.getByRole("link", { name: /Open form in a new tab/ }),
  ).toBeVisible();
  await expect(
    dialog.getByRole("heading", {
      name: "Thanks. Your enquiry is on its way.",
    }),
  ).toHaveCount(0);
  await page.keyboard.press("Escape");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
