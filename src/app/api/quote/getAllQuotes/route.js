import { NextResponse } from "next/server";

import handleAuthentication from "@/Utils/HandleAuthentication";
import { createWixClientApiStrategy } from "@/Utils/CreateWixClient";
import logError from "@/Utils/ServerActions";
import { encryptPriceForCart } from "@/Utils/Encrypt";

export const GET = async (req) => {
  try {
    const authenticatedUserData = await handleAuthentication(req);
    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const wixClient = await createWixClientApiStrategy();
    const data = await wixClient.items.queryDataItems({ dataCollectionId: "RequestQuote" }).eq("memberId", authenticatedUserData.memberId).find();

    const filteredData = data.items.map((item) => {
      item.data.lineItems.forEach((item) => {
        encryptPriceForCart(item.price);
        encryptPriceForCart(item.fullPrice);
        encryptPriceForCart(item.priceBeforeDiscounts);
      });
      return item;
    });

    console.log("data", filteredData.items.map(x => x.data));


    return NextResponse.json(
      {
        message: "Quotes data Successfully fetched",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    logError("Error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
export const dynamic = "force-dynamic";
