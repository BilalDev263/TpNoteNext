import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { authConfig } from './auth.config';
import { getToken } from 'next-auth/jwt';


// Configuration des rôles et des routes
const roleRoutes: { [key: string]: string[] } = {
  '/dashboard/admin': ['Admin'],
  '/dashboard/teacher': ['Teacher'],
  '/dashboard/student': ['Student'],
};

type Token = {
  role?: "admin" | "eleve" | "professeur"; // Rôles autorisés
  email?: string;
  name?: string;
};


export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET }) as Token;

  console.log("Token récupéré :", token); // Débogage
  console.log("Role de l'utilisateur :", token?.role);

  if (!token) {
    console.log("Utilisateur non authentifié, redirection vers login");
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const userRole = token?.role;

  if (!userRole) {
    console.log("Utilisateur sans rôle, redirection vers login");
    return NextResponse.redirect(new URL('/login', req.url));
  }

  const pathname = req.nextUrl.pathname;
  for (const route in roleRoutes) {
    if (pathname.startsWith(route)) {
      if (!roleRoutes[route].includes(userRole)) {
        console.log(`Rôle non autorisé pour ${pathname}, redirection vers /403`);
        return NextResponse.redirect(new URL('/403', req.url));
      }
    }
  }

  console.log("Utilisateur autorisé, accès à la page accordé");
  return NextResponse.next();
}


export const config = {
  matcher: ['/dashboard/:path*'],
};
