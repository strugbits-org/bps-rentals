import { NextResponse } from "next/server";
import { cartWixClient } from "@/Utils/CreateWixClient";
import handleAuthentication from "@/Utils/HandleAuthentication";
import { encryptPriceFields } from "@/Utils/Encrypt";

const addItemToCart = async (cartClient) => {
  return await cartClient.currentCart.addToCurrentCart({
    lineItems: [
      {
        catalogReference: {
          appId: "215238eb-22a5-4c36-9e7b-e7c08025e04e",
          catalogItemId: "1",
        },
        quantity: 1,
      },
    ],
  });
};

const handleCartResponse = (cart, message = "Cart Successfully fetched", status = 200) => {
  return NextResponse.json({ message, cart }, { status });
};

const createNewCart = async (memberTokens) => {
  try {
    const cartClient = await cartWixClient(memberTokens);
    const cart = await addItemToCart(cartClient);
    return handleCartResponse(cart.cart);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const POST = async (req) => {
  const memberTokens = await req.json();
  try {
    const authenticatedUserData = await handleAuthentication(req);
    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const cartClient = await cartWixClient(memberTokens);
    const cart = await cartClient.currentCart.getCurrentCart();

    const fieldsToEncrypt = [
      'amount',
      'convertedAmount',
      'formattedAmount',
      'formattedConvertedAmount'
    ];

    cart.lineItems.forEach((item) => {
      ['price', 'fullPrice', 'priceBeforeDiscounts', 'lineItemPrice'].forEach((field) => {
        encryptPriceFields(item[field], fieldsToEncrypt);
      });
    });

    return handleCartResponse(cart);
  } catch (error) {
    if (error?.details?.applicationError?.code === "OWNED_CART_NOT_FOUND") {
      return await createNewCart(memberTokens);
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};