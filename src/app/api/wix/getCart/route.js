import { cartWixClient } from "@/Utils/CreateWixClient";
import handleAuthentication from "@/Utils/HandleAuthentication";

import { NextResponse } from "next/server";

// GET method handler
export const POST = async (req) => {
  const memberTokens = await req.json();

  try {
    const authenticatedUserData = await handleAuthentication(req);
    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const cartClient = await cartWixClient(memberTokens);
    const cartResponse = await cartClient.currentCart.getCurrentCart();

    return NextResponse.json(
      {
        message: "Cart Successfully fetched",
        cartData: cartResponse,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error on Tokens", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
