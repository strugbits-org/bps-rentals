import { NextResponse } from "next/server";

import handleAuthentication from "@/Utils/HandleAuthentication";

export const POST = async (req) => {
  try {
    const authenticatedUserData = await handleAuthentication(req);
    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { lineItems, customerDetails } = body;

    // const lineItemsIdArr = lineItems.map((item) => item.id);

    // console.log(lineItems, "lineItems");
    // console.log(customerDetails, "customerDetails");

    return NextResponse.json(
      {
        message: "Price Quote Created",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
