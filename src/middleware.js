// middleware.js
import { NextResponse } from "next/server";

const PRIVATE_ROUTES = [
  "/my-account",
  "/my-account-change-password",
  "/my-account-quotes-history",
  "/my-account-saved-products",
];

// How long a verified token is trusted before we re-check it (ms).
// Keeps the auth round-trip off the hot path for normal navigation.
const AUTH_TTL_MS = 60 * 1000;

const AUTH_COOKIES = ["authToken", "userData", "userTokens", "cartQuantity", "authCheckedAt"];

const clearSession = (response) => {
  AUTH_COOKIES.forEach((name) => response.cookies.delete(name));
  return response;
};

/**
 * Verify the token against the backend. Returns:
 *   "valid"   -> token accepted
 *   "invalid" -> backend explicitly rejected it (401)
 *   "unknown" -> could not determine (network error / backend down) -> fail open
 */
const verifyToken = async (authToken) => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/auth/refresh-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    });
    if (res.status === 401) return "invalid";
    return "valid";
  } catch {
    // Backend unreachable — don't punish the user for our outage.
    return "unknown";
  }
};

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const authToken = req.cookies.get("authToken")?.value;
  const isPrivate = PRIVATE_ROUTES.includes(pathname);
  const hasToken = authToken && authToken !== "undefined";

  // No token: only guard private routes.
  if (!hasToken) {
    if (isPrivate) return NextResponse.redirect(new URL("/", req.url));
    return NextResponse.next();
  }

  // Recently verified? Trust it for the TTL window and skip the round-trip.
  const lastChecked = Number(req.cookies.get("authCheckedAt")?.value || 0);
  if (Date.now() - lastChecked < AUTH_TTL_MS) {
    return NextResponse.next();
  }

  const status = await verifyToken(authToken);

  if (status === "invalid") {
    // Dead session: wipe cookies everywhere, and bounce off private pages.
    const response = isPrivate
      ? NextResponse.redirect(new URL("/", req.url))
      : NextResponse.next();
    return clearSession(response);
  }

  if (status === "valid") {
    // Mark verified so subsequent navigations skip the check for AUTH_TTL_MS.
    const response = NextResponse.next();
    response.cookies.set("authCheckedAt", String(Date.now()), { path: "/" });
    return response;
  }

  // status === "unknown" -> fail open, do nothing.
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
