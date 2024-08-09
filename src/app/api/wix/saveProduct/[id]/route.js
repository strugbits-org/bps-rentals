import { NextResponse } from "next/server";

import handleAuthentication from "@/Utils/HandleAuthentication";
import { createWixClient } from "@/Utils/CreateWixClient";

export const GET = async (req, context) => {
  try {
    const authenticatedUserData = await handleAuthentication(req);

    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { params } = context;
    const id = params.id;

    const wixClient = await createWixClient();
    const locationFilterVariantData = await wixClient.items
      .queryDataItems({
        dataCollectionId: "locationFilteredVariant",
      })
      .eq("product", id)
      .find();

    if (locationFilterVariantData._items.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const memberId = authenticatedUserData.memberId;
    let productData = locationFilterVariantData._items[0];
    let membersData = productData.data.members;

    const dataObject = {
      ...productData.data,
      members: membersData ? [...membersData, memberId] : [memberId],
    };

    const response = await wixClient.items.updateDataItem(
      locationFilterVariantData._items[0]._id,
      {
        dataCollectionId: "locationFilteredVariant",
        dataItem: {
          _id: locationFilterVariantData._items[0]._id,
          data: dataObject,
        },
      }
    );

    response.dataItem.data.variantData = response.dataItem.data.variantData.map(
      (val) => {
        delete val.variant.discountedPrice;
        delete val.variant.price;
        return val;
      }
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
