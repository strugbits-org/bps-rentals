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
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  const headers = new Headers(req.headers);
  headers.set("x-current-path", req.nextUrl.pathname);
  return NextResponse.next({ headers });
}
export const config = {
  matcher: ["/((?!_next|favicon.ico|assets|public|api).*)"],
};
