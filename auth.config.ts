import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET || "vz",
  pages: {
    signIn: "/login",
  },
  providers: [
    // Ajoutez ici vos providers
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role as "admin" | "eleve" | "professeur"; // ✅ Ajout du rôle
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = (token.role ?? "eleve") as "admin" | "eleve" | "professeur"; // ✅ Ajout du rôle dans la session
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl + "/dashboard";
    },
  },
};
