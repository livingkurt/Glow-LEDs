import { test, expect } from "@playwright/test";

test("order flow", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Click on Shop Nav Button
  await page.click("[data-testid=shop_button]");
  await page.click("[data-testid=close_email_modal]");

  // Wait for the page to load
  await page.waitForURL("http://localhost:3000/pages/menu/gloving");

  await page.click("h2:has-text('Decals')");

  await page.waitForURL("http://localhost:3000/collections/all/products/category/decals");

  await page.waitForSelector("[data-testid=double_chevron_decals]");

  await page.click("[data-testid=double_chevron_decals]");
  await page.waitForURL("http://localhost:3000/collections/all/products/double_chevron_decals");

  // await page.waitForSelector("button:has-text('Add To Cart')");

  // // await page.click("[data-testid=add_to_cart_button]");
  // await page.click("button:has-text('Add To Cart')");

  //   const heading = await page.$("h1");
  // const headingText = await heading?.innerText();
  // expect(headingText).toContain("All Gloving");
  const glowLedsTitle = await page.waitForSelector("[data-testid=glow_leds_title]");
  expect(glowLedsTitle).not.toBeNull();
});

// await page.click("div:has-text('Refresh Pack V2 (6 Pairs Supreme Gloves V2 + 120 Batteries)')");

// await page.waitForURL("http://localhost:3000/collections/all/products/refresh_pack_v2_6_pairs_supreme_gloves_v2_120_batteries");

// Expect a title "to contain" a substring.
// const heading = await page.$("h1");
// const headingText = await heading?.innerText();
// expect(headingText).toContain("All Gloving");
