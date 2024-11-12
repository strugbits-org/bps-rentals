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
    const { memberTokens, productData } = body;

    const cartClient = await cartWixClient(memberTokens);

    await cartClient.currentCart.addToCurrentCart(productData);

    return NextResponse.json(
      { message: "Cart updated Successfully" },
      { status: 200 }
    );
  } catch (error) {
    logError("Error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
