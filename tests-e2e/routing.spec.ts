import { test, expect } from "@playwright/test";

test("has brand name, header, and footer", async ({ page }) => {
  await page.goto("/");

  // Check the title matches
  await expect(page).toHaveTitle(/Open Events/i);

  // Check the header displays the brand name
  await expect(page.locator("header")).toContainText("Open Events Starter");

  // Check the footer displays the brand name and legal links
  await expect(page.locator("footer")).toContainText("Open Events Starter");
  await expect(page.locator("footer")).toContainText("Terms of Service");
});

test("can toggle simulated roles and navigate to dashboard", async ({ page }) => {
  await page.goto("/");

  // Find the simulation box
  await expect(page.locator("#simulator")).toBeVisible();

  // Initially guest state
  await expect(page.locator("header")).toContainText("Sign In");

  // Click on "Organizer" simulator button
  await page.click("button:has-text('Organizer')");

  // Page should reload, check header shows Organizer controls
  await expect(page.locator("header")).toContainText("Create Event");
  await expect(page.locator("header")).toContainText("Dashboard");
  await expect(page.locator("header")).toContainText("Mock Organizer");

  // Click on Dashboard link
  await page.click("header >> text=Dashboard");

  // Confirm URL is now /dashboard
  await expect(page).toHaveURL(/.*dashboard/);

  // Confirm the sidebar renders and displays organizer-specific menus
  await expect(page.locator("aside")).toContainText("Organizer Overview");
  await expect(page.locator("aside")).toContainText("My Events");
  await expect(page.locator("aside")).toContainText("QR Check-in Scanner");

  // Take screenshot for visual verification
  await page.screenshot({ path: "verification-screenshot.png" });
});
