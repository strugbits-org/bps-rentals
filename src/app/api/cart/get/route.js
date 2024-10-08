import { NextResponse } from "next/server";

import { cartWixClient } from "@/Utils/CreateWixClient";
import handleAuthentication from "@/Utils/HandleAuthentication";

export const POST = async (req) => {
  const memberTokens = await req.json();

  try {
    const authenticatedUserData = await handleAuthentication(req);
    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const cartClient = await cartWixClient(memberTokens);
    const cart = await cartClient.currentCart.getCurrentCart();

    return NextResponse.json(
      {
        message: "Cart Successfully fetched",
        cart,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching cart: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
