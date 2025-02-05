"use server";

import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";

export async function registerUser(
  name: string,
  email: string,
  password: string,
  role: string = "user"
): Promise<string> {
  if (!name || !email || !password || !role) {
    return "Tous les champs sont obligatoires.";
  }

  if (password.length < 6) {
    return "Le mot de passe doit comporter au moins 6 caractères.";
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return "Cet email est déjà utilisé.";
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role, // Prend en compte le rôle choisi
    },
  });

  return "Utilisateur créé avec succès !";
}
