import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((request) => {
  const isLoggedIn = Boolean(request.auth?.user);
  const pathname = request.nextUrl.pathname;

  if (pathname === "/" && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/", "/login"],
};
