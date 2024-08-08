import { NextResponse } from "next/server";

import handleAuthentication from "@/Utils/HandleAuthentication";
import { cartWixClient } from "@/Utils/CreateWixClient";

// POST method handler
export const POST = async (req) => {
  try {
    const authenticatedUserData = await handleAuthentication(req);
    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { memberTokens, lineItems } = body;

    const cartClient = await cartWixClient(memberTokens);

    const response =
      await cartClient.currentCart.updateCurrentCartLineItemQuantity(lineItems);

    return NextResponse.json(
      {
        message: "Cart updated Successfully",
        cartData: response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
