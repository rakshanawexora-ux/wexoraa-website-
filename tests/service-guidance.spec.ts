import { test, expect } from "@playwright/test";
import { solutions } from "../src/content/site";
import { services } from "../src/content/catalog";
test("home explains each service group with a working illustration and relevant links", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/");
  expect(
    await page.evaluate(() => {
      const hero = document.querySelector(".hero-cinematic")!;
      const film = document.querySelector(".motion-showcase")!;
      const survey = document.querySelector("#challenge")!;
      return (
        Boolean(
          hero.compareDocumentPosition(film) & Node.DOCUMENT_POSITION_FOLLOWING,
        ) &&
        Boolean(
          film.compareDocumentPosition(survey) &
          Node.DOCUMENT_POSITION_FOLLOWING,
        )
      );
    }),
  ).toBe(true);
  for (const area of solutions) {
    await page
      .getByRole("tab", {
        name: new RegExp(area.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
      })
      .click();
    const panel = page.getByRole("tabpanel");
    await expect(panel.getByRole("img", { name: area.imageAlt })).toBeVisible();
    if (area.id !== "operate")
      await expect
        .poll(() =>
          panel
            .locator("img")
            .evaluate(
              (el) =>
                el instanceof HTMLImageElement &&
                el.complete &&
                el.naturalWidth > 0,
            ),
        )
        .toBe(true);
    else
      await expect(
        panel.getByText("One clear view.", { exact: true }),
      ).toBeVisible();
    for (const service of services.filter(
      (service) => service.group === area.id,
    ))
      await expect(
        panel.getByRole("link", { name: service.title, exact: true }),
      ).toHaveAttribute("href", `/services/${service.slug}`);
  }
  await page.locator(".survey-start").click();
  await expect(page.locator("#home-survey-question")).toBeFocused();
});
