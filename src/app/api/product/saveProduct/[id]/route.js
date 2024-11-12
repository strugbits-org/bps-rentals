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
    const locationFilterVariantData = await wixClient.items.queryDataItems({ dataCollectionId: "locationFilteredVariant" })
      .eq("product", id)
      .find();

    if (locationFilterVariantData._items.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const memberId = authenticatedUserData.memberId;
    let productData = locationFilterVariantData._items[0];
    let membersData = productData.data.members;

    await wixClient.items.updateDataItem(
      productData._id,
      {
        dataCollectionId: "locationFilteredVariant",
        dataItem: {
          _id: productData._id,
          data: {
            ...productData.data,
            members: membersData ? [...membersData, memberId] : [memberId],
          },
        },
      }
    );

    return NextResponse.json(
      { message: "Product saved successfully" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
