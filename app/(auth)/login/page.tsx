"use client";

import Link from "next/link";
import LoginForm from "@/app/ui/login-form";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-4 p-4 md:-mt-32">
        <LoginForm />
        <p className="text-center text-sm text-gray-600">
          Pas encore de compte ?{" "}
          <Link href="/register" className="text-blue-500 underline">
            S'inscrire
          </Link>
        </p>
      </div>
    </main>
  );
}
