// middleware.ts (na raiz do projeto)
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("token");

  if (!isAuthenticated && request.nextUrl.pathname.startsWith("/")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
