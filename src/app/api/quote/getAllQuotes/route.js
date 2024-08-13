import { createWixClient } from "@/Utils/CreateWixClient";
import handleAuthentication from "@/Utils/HandleAuthentication";
import { NextResponse } from "next/server";

// GET method handler
export const GET = async (req) => {
  try {
    const authenticatedUserData = await handleAuthentication(req);
    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const wixClient = await createWixClient();
    const data = await wixClient.items
      .queryDataItems({
        dataCollectionId: "RequestQuote",
      })
      .eq("memberId", authenticatedUserData.memberId)
      .find();

    if (data._items.length === 0) {
      return NextResponse.json({ message: "Quote not found" }, { status: 404 });
    }

    // data._items = data._items.map((val) => {
    //   val.data.lineItems = val.data.lineItems.map((val2) => {
    //     delete val2.price;
    //     delete val2.fullItem.price;
    //     delete val2.fullItem.priceBeforeDiscounts;
    //     delete val2.fullItem.fullPrice;
    //     return val2;
    //   });
    //   return val;
    // });
    return NextResponse.json(
      {
        message: "Quotes data Successfully fetched",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
