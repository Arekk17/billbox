import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const jwt = req.cookies.get("jwt")?.value;
  const pathname = req.nextUrl.pathname;

  const publicPaths = ["/auth/login", "/auth/register"];
  if (publicPaths.includes(pathname) && jwt) {
    console.log("redirecting to dashboard");
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  const protectedPaths = ["/dashboard", "/billing", "/reports"];

  if (protectedPaths.some((path) => pathname.startsWith(path)) && !jwt) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/billing/:path*",
    "/reports/:path*",
    "/auth/login",
    "/auth/register",
  ],
};
