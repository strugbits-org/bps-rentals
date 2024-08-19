import { NextResponse } from "next/server";
import { createWixClient } from "@/Utils/CreateWixClient";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { cartId, lineItemIds } = body;

    const wixClient = await createWixClient();
    const cart = await wixClient.cart.removeLineItems(
      cartId,
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
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
