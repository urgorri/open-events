import { expect, test } from "vitest";
import { siteConfig } from "@/config/site";

test("siteConfig brand configuration is valid", () => {
  expect(siteConfig.name).toBe("Open Events Starter");
  expect(siteConfig.shortName).toBe("OpenEvents");
  expect(siteConfig.logo).toBeDefined();
  expect(siteConfig.logo.dark).toBe("/assets/logo-dark.svg");
  expect(siteConfig.socialLinks).toBeDefined();
});
