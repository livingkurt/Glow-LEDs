import { test, expect } from "@playwright/test";

test("order flow", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  // await page.goto("http://localhost:3000/");
  await page.pause();
  // await expect(page).toHaveTitle(/Glow LEDs/);
  // Click on Shop Nav Button
  await page.getByTestId("shop_button").click();

  // Expect a title "to contain" a substring.
});
