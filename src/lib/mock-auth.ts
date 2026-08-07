import { cookies } from "next/headers";
import { Role } from "@prisma/client";

export interface MockUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

/**
 * Retrieves the current simulated session on the server-side based on the `mock-role` cookie.
 * This helper provides a simple, clean interface for simulating different users during development
 * and testing phases before Phase 3 (Authentication and Users) is implemented.
 */
export async function getMockSession(): Promise<MockUser | null> {
  try {
    const cookieStore = await cookies();
    const roleCookie = cookieStore.get("mock-role")?.value;

    if (!roleCookie || roleCookie === "GUEST") {
      return null;
    }

    const roleUpper = roleCookie.toUpperCase() as Role;
    if (roleUpper !== Role.ADMIN && roleUpper !== Role.ORGANIZER && roleUpper !== Role.ATTENDEE) {
      return null;
    }

    return {
      id: `mock-user-id-${roleUpper.toLowerCase()}`,
      email: `${roleUpper.toLowerCase()}@example.com`,
      name: `Mock ${roleUpper.charAt(0) + roleUpper.slice(1).toLowerCase()}`,
      role: roleUpper,
    };
  } catch {
    // Graceful fallback for static site generation or build execution environments where cookies() are omitted
    return null;
  }
}
