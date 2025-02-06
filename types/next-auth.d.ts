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
    expires: string;
  }




  interface JWT {
    role: "admin" | "eleve" | "professeur"; // ✅ Ajout du rôle dans le token JWT
  }
}
