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

    const response = await getDataFetchFunction({
      dataCollectionId: "locationFilteredVariant",
      includeReferencedItems: ["product"],
      ne: [
        {
          key: "hidden",
          value: true,
        },
        {
          key: "isF1Exclusive",
          value: true,
        },
      ],
      ne: [
        {
          key: "productSets",
          value: []
        }
      ],
      isNotEmpty: "productSets",
      includeVariants: false,
      limit: "infinite",
      increasedLimit: 500
    });

    const data = response.items.filter(x => x.product?._id);    
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    logError(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
