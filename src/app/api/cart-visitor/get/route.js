import { NextResponse } from "next/server";

import { createWixClientApiStrategy } from "@/Utils/CreateWixClient";

export const POST = async (req) => {
  const cartId = await req.json();
  try {
    const wixClient = await createWixClientApiStrategy();
    const cart = await wixClient.cart.getCart(cartId);

    return NextResponse.json(
      {
        message: "Cart Successfully fetched",
        cart,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
