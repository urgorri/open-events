import { test, expect } from "@playwright/test";

test("has title and loads successfully", async ({ page }) => {
  await page.goto("/");
  // Check the title matches
  await expect(page).toHaveTitle(/Create Next App/i);
  // Take screenshot for visual verification
  await page.screenshot({ path: "verification-screenshot.png" });
});
