import { NextResponse } from "next/server";

import handleAuthentication from "@/Utils/HandleAuthentication";
import { createWixClientApiStrategy } from "@/Utils/CreateWixClient";

export const GET = async (req) => {
  try {
    const authenticatedUserData = await handleAuthentication(req);
    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const wixClient = await createWixClientApiStrategy();
    const data = await wixClient.items
      .queryDataItems({
        dataCollectionId: "RequestQuote",
      })
      .eq("memberId", authenticatedUserData.memberId)
      .find();

    if (data._items.length === 0) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Quotes data Successfully fetched",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
export const dynamic = "force-dynamic";
