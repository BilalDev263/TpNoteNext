"use client";

import { useState } from "react";
import { registerUser } from "@/server/actions/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const result = await registerUser(
      formData.get("name") as string,
      formData.get("email") as string,
      formData.get("password") as string,
      formData.get("role") as string // Ajout du rôle
    );

    setMessage(result);

    if (result.includes("succès")) {
      setTimeout(() => {
        router.push("/login"); // Redirection automatique vers la page de connexion
      }, 2000);
    }
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-700">Créer un compte</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nom</label>
            <input type="text" name="name" placeholder="Nom" className="border p-2 w-full" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" placeholder="Email" className="border p-2 w-full" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input type="password" name="password" placeholder="Mot de passe" className="border p-2 w-full" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rôle</label>
            <select name="role" className="border p-2 w-full">
              <option value="eleve">Élève</option>
              <option value="professeur">Professeur</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600">
            S'inscrire
          </button>
        </form>
        {message && <p className={`text-center text-sm ${message.includes("succès") ? "text-green-500" : "text-red-500"}`}>
          {message}
        </p>}
      </div>
    </main>
  );
}
