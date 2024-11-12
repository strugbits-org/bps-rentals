import { NextResponse } from "next/server";

import handleAuthentication from "@/Utils/HandleAuthentication";
import { createWixClientApiStrategy } from "@/Utils/CreateWixClient";
import logError from "@/Utils/ServerActions";

export const GET = async (req, context) => {
  try {
    const authenticatedUserData = await handleAuthentication(req);
    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { params } = context;
    const id = params.id;
    const memberId = authenticatedUserData.memberId;

    const wixClient = await createWixClientApiStrategy();
    const locationFilterVariantData = await wixClient.items.queryDataItems({ dataCollectionId: "locationFilteredVariant", })
      .eq("product", id)
      .hasSome("members", [memberId])
      .find();

    let productData = locationFilterVariantData._items[0];
    let membersData = productData.data.members;

    if (locationFilterVariantData._items.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    await wixClient.items.updateDataItem(productData._id, {
      dataCollectionId: "locationFilteredVariant",
      dataItem: {
        _id: productData._id,
        data: {
          ...productData.data,
          members: membersData.filter((member) => member !== memberId),
        },
      },
    });

    return NextResponse.json(
      { message: "Product removed Successfully" },
      { status: 200 }
    );
  } catch (error) {
    logError(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
