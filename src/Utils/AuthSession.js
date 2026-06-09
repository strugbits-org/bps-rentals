import { clearRequested, getUserKeyFromUserData } from "@/Utils/Request3dAccess";

export const AUTH_REQUIRED = "AUTH_REQUIRED";

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
  const userKey = getUserKeyFromUserData(userData);
  if (userKey) clearRequested(userKey);

  removeCookie("authToken", { path: "/" });
  removeCookie("userData", { path: "/" });
  removeCookie("userTokens", { path: "/" });
  removeCookie("cartQuantity", { path: "/" });
};
