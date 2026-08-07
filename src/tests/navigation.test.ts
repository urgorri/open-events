import { expect, test, vi, beforeEach } from "vitest";
import { getMockSession } from "@/lib/mock-auth";

// Mock next/headers cookies
const mockGet = vi.fn();
vi.mock("next/headers", () => {
  return {
    cookies: async () => {
      return {
        get: mockGet,
      };
    },
  };
});

beforeEach(() => {
  vi.clearAllMocks();
});

test("getMockSession returns null if no cookie is set", async () => {
  mockGet.mockReturnValue(undefined);
  const session = await getMockSession();
  expect(session).toBeNull();
});

test("getMockSession returns null if GUEST cookie is set", async () => {
  mockGet.mockReturnValue({ value: "GUEST" });
  const session = await getMockSession();
  expect(session).toBeNull();
});

test("getMockSession returns ADMIN user details when role is set to ADMIN", async () => {
  mockGet.mockReturnValue({ value: "ADMIN" });
  const session = await getMockSession();
  expect(session).not.toBeNull();
  expect(session?.role).toBe("ADMIN");
  expect(session?.email).toBe("admin@example.com");
  expect(session?.name).toBe("Mock Admin");
});

test("getMockSession returns ORGANIZER user details when role is set to ORGANIZER", async () => {
  mockGet.mockReturnValue({ value: "ORGANIZER" });
  const session = await getMockSession();
  expect(session).not.toBeNull();
  expect(session?.role).toBe("ORGANIZER");
  expect(session?.email).toBe("organizer@example.com");
  expect(session?.name).toBe("Mock Organizer");
});

test("getMockSession returns null for invalid roles", async () => {
  mockGet.mockReturnValue({ value: "INVALID_ROLE" });
  const session = await getMockSession();
  expect(session).toBeNull();
});
