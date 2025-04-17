import { NextResponse } from "next/server";

import handleAuthentication from "@/Utils/HandleAuthentication";
import { createWixClientApiStrategy } from "@/Utils/CreateWixClient";

export const GET = async (req, context) => {
  try {
    const authenticatedUserData = await handleAuthentication(req);

    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { params } = context;
    const id = params.id;

    const wixClient = await createWixClientApiStrategy();
    const locationFilterVariantData = await wixClient.items.query("locationFilteredVariant")
      .eq("product", id)
      .find();

    if (locationFilterVariantData.items.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const memberId = authenticatedUserData.memberId;
    let productData = locationFilterVariantData.items[0];
    let membersData = productData.members;

    await wixClient.items.update("locationFilteredVariant", {
      ...productData,
      members: membersData ? [...membersData, memberId] : [memberId],
    });

    return NextResponse.json(
      { message: "Product saved successfully" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
