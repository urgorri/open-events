import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

export const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = req.auth?.user && "role" in req.auth.user ? (req.auth.user as { role?: string }).role : undefined;

  // Protect /dashboard routes
  if (nextUrl.pathname.startsWith("/dashboard")) {
    if (!isLoggedIn) {
      return NextResponse.redirect(new URL("/?mock_selector=open&unauthorized=true", req.url));
    }
  }

  // Protect /dashboard/admin routes
  if (nextUrl.pathname.startsWith("/dashboard/admin")) {
    if (role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard?unauthorized=true", req.url));
    }
  }

  // Allow next-auth to handle the rest, or just proceed
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
