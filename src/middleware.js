// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const authToken = req.cookies.get("authToken")?.value;

  const privateRoutes = [
    "/my-account",
    "/my-account-change-password",
    "my-account-quotes-history",
    "my-account-saved-products",
  ];
  if (privateRoutes.includes(pathname)) {
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!_next|favicon.ico|assets|public|api).*)"],
};
