"use client";

import { useCallback, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";

import { decryptField } from "@/Utils/Encrypt";
import { parseUserDataCookie } from "@/Utils/Request3dAccess";
import { refreshSession } from "@/Services/AuthApis";

// Minimum gap between focus-triggered refreshes, to absorb rapid alt-tabbing.
const THROTTLE_MS = 5000;
// Match login's cookie options exactly so the cookie's scope can't drift.
const COOKIE_OPTIONS = { path: "/", expires: new Date("2099-01-01") };

// Stable, comparable signature of a member's access + profile. Permissions and
// pricingTier are encrypted with a random IV (so the ciphertext differs every
// time) — they must be decrypted before comparison.
const buildSignature = (member) => {
  if (!member) return "";
  const perms = (member.permissions || [])
    .map((x) => decryptField(x))
    .sort()
    .join("|");
  const tier = member.pricingTier ? decryptField(member.pricingTier) : "";
  return [
    member.memberId || "",
    member.loginEmail || "",
    member.firstName || "",
    member.lastName || "",
    member.mainPhone || "",
    perms,
    tier,
  ].join("::");
};

// Silently re-syncs the `userData` cookie with the server's live badge-derived
// permissions on app load and whenever the tab regains focus. Renders nothing.
// It only writes the cookie when access actually changed, and never logs the
// user out — any failure is a no-op (see plan Safety A & B).
function SessionRefresher() {
  const [cookies, setCookie] = useCookies(["authToken", "userData"]);
  const inFlightRef = useRef(false);
  const lastRunRef = useRef(0);
  const cookiesRef = useRef(cookies);
  cookiesRef.current = cookies;

  const hasToken = Boolean(cookies?.authToken);

  const runRefresh = useCallback(async () => {
    if (!cookiesRef.current?.authToken) return;
    if (inFlightRef.current) return;

    const now = Date.now();
    if (now - lastRunRef.current < THROTTLE_MS) return;
    lastRunRef.current = now;
    inFlightRef.current = true;

    try {
      const result = await refreshSession();
      // Fail silently on auth/server/network errors — keep the current cookie.
      if (!result || result.error || !result.member) return;

      const current = parseUserDataCookie(cookiesRef.current?.userData);
      // Diff before write: skip if access + profile are unchanged so existing
      // flows never see a spurious cookie write / re-render.
      if (buildSignature(current) === buildSignature(result.member)) return;

      setCookie("userData", result.member, COOKIE_OPTIONS);
    } catch {
      // Background refresh must never disrupt the session.
    } finally {
      inFlightRef.current = false;
    }
  }, [setCookie]);

  useEffect(() => {
    if (!hasToken) return;
    runRefresh();
    const onFocus = () => runRefresh();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [hasToken, runRefresh]);

  return null;
}

export default SessionRefresher;
