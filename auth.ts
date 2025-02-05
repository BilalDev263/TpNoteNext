import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { z } from "zod";
import { prisma } from "@/app/lib/prisma"; // Assure-toi que ce chemin est correct
import type { User } from "@/app/lib/definitions"; // Assure-toi que le type User est bien défini
import { authConfig } from "./auth.config";

async function getUser(email: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    return null;
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("Les informations d'identification sont manquantes.");

        // Validation avec zod
        const parsedCredentials = z
          .object({
            email: z.string().email({ message: "Email invalide." }),
            password: z.string().min(6, { message: "Le mot de passe doit comporter au moins 6 caractères." }),
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          throw new Error(parsedCredentials.error.errors.map((e) => e.message).join(", "));
        }

        const { email, password } = parsedCredentials.data;

        // Récupération de l'utilisateur
        const user = await getUser(email);
        if (!user) throw new Error("Utilisateur introuvable.");

        // Vérification du mot de passe
        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) throw new Error("Mot de passe incorrect.");

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Ajoute cette variable dans ton fichier .env
});
