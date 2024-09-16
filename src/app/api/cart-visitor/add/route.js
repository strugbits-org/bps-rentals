import { NextResponse } from "next/server";
import { createWixClientApiStrategy } from "@/Utils/CreateWixClient";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { cartId, productData } = body;

    const wixClient = await createWixClientApiStrategy();
    const cart = await wixClient.cart.addToCart(cartId, productData);

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
