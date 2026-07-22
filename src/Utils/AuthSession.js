import { clearRequested, parseUserDataCookie } from "@/Utils/Request3dAccess";

export const AUTH_REQUIRED = "AUTH_REQUIRED";

/** Fired once when a data call proves the session is dead, so the app can log out consistently. */
export const SESSION_EXPIRED_EVENT = "session:expired";

/** Broadcast a "session is dead" signal. A single listener (Navbar) performs the actual logout. */
export const notifySessionExpired = () => {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(SESSION_EXPIRED_EVENT));
};

/** Normalize API results that may return AUTH_REQUIRED (string) instead of a list. */
export const asListOrEmpty = (result) => (Array.isArray(result) ? result : []);

/**
 * Central resolver for list endpoints where an auth failure means the session is dead
 * (e.g. saved products). Always returns an array, and signals a global logout on AUTH_REQUIRED
 * so no caller can crash on the sentinel string or keep a zombie session.
 */
export const resolveSavedList = (result) => {
  if (result === AUTH_REQUIRED) {
    notifySessionExpired();
    return [];
  }
  return asListOrEmpty(result);
};

export const isAuthErrorMessage = (message = "") => {
  const normalizedMessage = String(message || "");

  return (
    normalizedMessage === "Token has expired" ||
    normalizedMessage === "Unauthorized" ||
    normalizedMessage.startsWith("Unauthorized:")
  );
};

export const isAuthError = (error) => isAuthErrorMessage(error?.message);

export const clearAuthCookies = (removeCookie, userData) => {
  const parsed = parseUserDataCookie(userData);
  const userKey = parsed?.memberId || parsed?.loginEmail || null;
  if (userKey) clearRequested(userKey);

  removeCookie("authToken", { path: "/" });
  removeCookie("userData", { path: "/" });
  removeCookie("userTokens", { path: "/" });
  removeCookie("cartQuantity", { path: "/" });
  removeCookie("authCheckedAt", { path: "/" });
};
