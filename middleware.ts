import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // ✅ Ne pas intercepter NextAuth
  if (req.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const token = (await getToken({ req, secret: process.env.NEXTAUTH_SECRET })) as any;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// ✅ Appliquer la middleware uniquement aux pages du dashboard
export const config = {
  matcher: ["/dashboard/:path*"],
};
