import type { NextAuthConfig } from "next-auth";
import { Role } from "@prisma/client";

export const authConfig: NextAuthConfig = {
  providers: [], // Add providers in auth.ts to avoid Edge Runtime issues
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: Role }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as { role?: Role }).role = token.role as Role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};
