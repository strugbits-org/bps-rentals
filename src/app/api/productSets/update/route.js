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
    const productData = await client.items.queryDataItems({ dataCollectionId: "DemoProductData" }).eq("product", id).find();

    if (productData._items.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const { _id, dataCollectionId, data } = productData._items[0];

    await client.items.updateDataItem(_id, {
      dataCollectionId,
      dataItem: {
        _id,
        data: {
          ...data,
          productSets
        }
      },
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