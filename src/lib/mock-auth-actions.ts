"use server";

import { cookies } from "next/headers";

/**
 * Server action to update or clear the active simulated user role.
 * This sets the `mock-role` cookie so that layouts, sidebars, and actions adapt.
 */
export async function setMockRole(role: string): Promise<void> {
  const cookieStore = await cookies();
  if (!role || role === "GUEST") {
    cookieStore.delete("mock-role");
  } else {
    cookieStore.set("mock-role", role, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      httpOnly: true,
      sameSite: "lax",
    });
  }
}
