import { NextResponse } from "next/server";

import handleAuthentication from "@/Utils/HandleAuthentication";
import { cartWixClient } from "@/Utils/CreateWixClient";

export const POST = async (req) => {
  try {
    const authenticatedUserData = await handleAuthentication(req);
    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { memberTokens, productData } = body;

    const cartClient = await cartWixClient(memberTokens);

    const cart = await cartClient.currentCart.addToCurrentCart(productData);
    return NextResponse.json(
      {
        message: "Item added Successfully",
        cart: cart.cart,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
