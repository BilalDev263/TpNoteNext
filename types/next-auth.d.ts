import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "eleve" | "professeur"; // ✅ Ajout du rôle
  }

  interface Session {
    user: User; // ✅ Correction de `Session`
  }

  interface JWT {
    id: string; // ✅ Ajout de l'ID pour éviter l'erreur `undefined`
    role: "admin" | "eleve" | "professeur";
  }
}
