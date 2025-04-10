import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";

const authPages = ["/sign-up", "/sign-in"];
const publicRoutes = ["/"];

const protectedRoutes = [
  "/dashboard",
  "/guidance",
  "/research",
  "/ethics",
  "/governance",
  "/settings",
];

export default {
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
    LinkedIn({
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: "/sign-up",
  },
  callbacks: {
    authorized: ({ request: { nextUrl }, auth }) => {
      const isLoggedIn = Boolean(auth?.user);
      const isAuthPage = authPages.includes(nextUrl.pathname);
      const isPublicPage = publicRoutes.includes(nextUrl.pathname);
      const isProtectedRoute = protectedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
      );

      if (isAuthPage) {
        if (isLoggedIn) {
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
        return true;
      }

      if (isProtectedRoute && !isLoggedIn) {
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
