import { createWixClient } from "@/Utils/CreateWixClient";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { cartId, lineItems } = body;

    const wixClient = await createWixClient();
    const cart = await wixClient.cart.updateLineItemsQuantity(
      cartId,
      lineItems
    );

    return NextResponse.json(
      {
        message: "Cart updated Successfully",
        cart: cart.cart,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
