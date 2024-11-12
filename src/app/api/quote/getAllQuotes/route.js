import { NextResponse } from "next/server";

import handleAuthentication from "@/Utils/HandleAuthentication";
import logError from "@/Utils/ServerActions";
import { encryptField, encryptPriceFields } from "@/Utils/Encrypt";
import getDataFetchFunction from "@/Services/FetchFunction";

export const GET = async (req) => {
  try {
    const authenticatedUserData = await handleAuthentication(req);
    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const data = await getDataFetchFunction({
      "dataCollectionId": "RequestQuote",
      "eq": [
        {
          key: "memberId",
          value: authenticatedUserData.memberId
        }
      ],
      "limit": "infinite",
    })

    const fieldsToEncrypt = [
      'amount',
      'convertedAmount',
      'formattedAmount',
      'formattedConvertedAmount'
    ];

    data.items.forEach((item) => {
      item.data.lineItems.forEach((lineItem) => {
        if (lineItem.price) lineItem.price = encryptField(lineItem.price.toString());
        ['price', 'fullPrice', 'priceBeforeDiscounts'].forEach((field) => {
          if (lineItem?.fullItem) encryptPriceFields(lineItem.fullItem[field], fieldsToEncrypt);
        });
      });
    });

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
