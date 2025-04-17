import { NextResponse } from "next/server";

import handleAuthentication from "@/Utils/HandleAuthentication";
import { createWixClientApiStrategy } from "@/Utils/CreateWixClient";
import logError from "@/Utils/ServerActions";

export const POST = async (req) => {
  try {
    const authenticatedUserData = await handleAuthentication(req);
    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const client = await createWixClientApiStrategy();

    const body = await req.json();

    const { id, productSets } = body;
    const productData = await client.items.query("locationFilteredVariant").eq("product", id).find();

    if (productData.items.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const data = productData.items[0];

    await client.items.update("locationFilteredVariant", {
      ...data,
      productSets
    });
    return NextResponse.json(
      {
        message: "Item update successfully",
      },
      { status: 200 }
    );

  } catch (error) {
    logError("Error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};