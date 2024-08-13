import { createWixClient } from "@/Utils/CreateWixClient";
import handleAuthentication from "@/Utils/HandleAuthentication";
import { NextResponse } from "next/server";
// GET method handler
export const GET = async (req, context) => {
  try {
    const authenticatedUserData = await handleAuthentication(req);
    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { params } = context;
    const id = params.id;

    const wixClient = await createWixClient();
    const data = await wixClient.items.getDataItem(id, {
      dataCollectionId: "RequestQuote",
    });

    if (data.data.lineItems === 0) {
      return NextResponse.json({ error: "Quotes not found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        message: "Quotes Successfully fetched",
        data: data.data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
