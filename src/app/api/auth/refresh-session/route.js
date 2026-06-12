import { NextResponse } from "next/server";

import handleAuthentication from "@/Utils/HandleAuthentication";
import logError from "@/Utils/ServerActions";

// Returns the current member's fresh, badge-derived permissions so the client
// can silently re-sync its `userData` cookie without logging out. Reuses
// handleAuthentication -> isAuthenticated, which already re-derives permissions
// and pricingTier from live Wix badges on every call.
export const POST = async (req) => {
  try {
    const authToken = req.headers.get("authorization");
    if (!authToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let authenticatedUser;
    try {
      authenticatedUser = await handleAuthentication(req);
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Build the member object field-by-field in the exact shape the login route
    // returns. Do NOT spread authenticatedUser — it carries the bcrypt
    // userPassword hash from the membersPassword record, which must never reach
    // the client cookie.
    const member = {
      memberId: authenticatedUser.memberId,
      loginEmail: authenticatedUser.userEmail,
      firstName: authenticatedUser.firstName,
      lastName: authenticatedUser.lastName,
      mainPhone: authenticatedUser.phone,
      permissions: authenticatedUser.permissions,
      pricingTier: authenticatedUser.pricingTier,
    };

    return NextResponse.json({ member }, { status: 200 });
  } catch (error) {
    logError("Error refreshing session:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
