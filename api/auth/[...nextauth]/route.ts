import NextAuth from "next-auth";
import { authConfig } from "@/auth.config"; // ✅ Vérifie que ce chemin est correct

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };
