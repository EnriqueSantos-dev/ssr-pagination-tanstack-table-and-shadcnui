import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isGroupPage = request.nextUrl.pathname === "/groups";

  if (isGroupPage) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/groups", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
