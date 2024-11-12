import { NextResponse } from "next/server";

import handleAuthentication from "@/Utils/HandleAuthentication";
import logError from "@/Utils/ServerActions";
import getDataFetchFunction from "@/Services/FetchFunction";

export const POST = async (req) => {
  try {
    const authenticatedUserData = await handleAuthentication(req);

    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await getDataFetchFunction({
      "dataCollectionId": "locationFilteredVariant",
      "includeReferencedItems": [
        "category",
        "product",
        "subCategory",
        "f1Collection",
      ],
      "hasSome": [
        {
          "key": "members",
          "values": [authenticatedUserData.memberId]
        }
      ],
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    logError(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
