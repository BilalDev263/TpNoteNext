"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginForm from "@/app/ui/login-form";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user.role === "admin") {
        router.push("/dashboard/admin");
      } else if (session?.user.role === "professeur") {
        router.push("/dashboard/teacher");
      } else {
        router.push("/dashboard/student");
      }
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Chargement...</p>;
  }

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
