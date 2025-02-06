import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
  secret: process.env.NEXTAUTH_SECRET || "c7fbd122f3c9bd96ef2522708a36b77382c76396505c6cb039af67ecacfd9a67",
  trustHost: true, // ✅ Permet de fonctionner sans API
  useSecureCookies: false, // ✅ Désactive la nécessité d'une API
  pages: {
    signIn: "/login",
  },
  providers: [
    // Ajoutez ici vos providers
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // ✅ Ajoute `id` au token
        token.role = user.role as "admin" | "eleve" | "professeur";
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string; // ✅ Ajoute `id` dans la session
      session.user.role = (token.role ?? "eleve") as "admin" | "eleve" | "professeur";
      return session;
    },
    async redirect({ url, baseUrl }) {
      return url.startsWith(baseUrl) ? url : baseUrl + "/dashboard";
    },
  },
};
