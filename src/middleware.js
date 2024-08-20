// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const authToken = req.cookies.get("authToken")?.value;

  const privateRoutes = [
    "/my-account",
    "/my-account-change-password",
    "/my-account-quotes-history",
    "/my-account-saved-products",
  ];
  if (privateRoutes.includes(pathname) && !authToken) {
      return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    {
      source: "/((?!_next|favicon.ico|assets|public|api).*)",
      missing: [{ type: "header", key: "next-action" }],
    },
  ],
};
