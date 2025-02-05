"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-800 text-white p-4">
      <h1 className="text-lg font-semibold">MusiLearn</h1>
      <nav>
        <Link href="/profile" className="mr-4">
          Mon Profil
        </Link>
        <form action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}>
          <button className="bg-red-500 px-3 py-1 rounded">Déconnexion</button>
        </form>
      </nav>
    </header>
  );
}
