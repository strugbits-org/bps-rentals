import { NextResponse } from "next/server";

import handleAuthentication from "@/Utils/HandleAuthentication";
import { cartWixClient } from "@/Utils/CreateWixClient";
import logError from "@/Utils/ServerActions";

export const POST = async (req) => {
  try {
    const authenticatedUserData = await handleAuthentication(req);
    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { memberTokens, lineItemIds } = body;

    const cartClient = await cartWixClient(memberTokens);
    const cart = await cartClient.currentCart.removeLineItemsFromCurrentCart(
      lineItemIds
    );

    return NextResponse.json(
      {
        message: "Cart item removed Successfully",
        cart: cart.cart,
      },
      { status: 200 }
    );
  } catch (error) {
    logError(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
