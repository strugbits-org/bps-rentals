import { NextResponse } from "next/server";

import handleAuthentication from "@/Utils/HandleAuthentication";
import { createWixClientApiStrategy } from "@/Utils/CreateWixClient";
import logError from "@/Utils/ServerActions";
import { decryptProductPrices } from "@/Utils/Utils";

export const POST = async (req) => {
  try {
    const authenticatedUserData = await handleAuthentication(req);
    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const client = await createWixClientApiStrategy();
    const body = await req.json();
    const { dataCollectionId, items } = body;
    decryptProductPrices(items);

    await client.items.bulkUpdateDataItems({
      dataCollectionId,
      dataItems: items
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