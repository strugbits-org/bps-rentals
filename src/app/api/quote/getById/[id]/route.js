import { NextResponse } from "next/server";

import { createWixClientApiStrategy } from "@/Utils/CreateWixClient";
import logError from "@/Utils/ServerActions";
import { encryptField, encryptPriceFields } from "@/Utils/Encrypt";

export const GET = async (req, context) => {
  try {
    const { params } = context;
    const id = params.id;

    const wixClient = await createWixClientApiStrategy();
    const data = await wixClient.items.getDataItem(id, { dataCollectionId: "RequestQuote", });

    if (!data.data.lineItems.length) {
      return NextResponse.json({ error: "Quote not found" }, { status: 404 })
    };

    const fieldsToEncrypt = [
      'amount',
      'convertedAmount',
      'formattedAmount',
      'formattedConvertedAmount'
    ];

    data.data.lineItems.forEach((item) => {
      if (item.price) item.price = encryptField(item.price.toString());
      ['price', 'fullPrice', 'priceBeforeDiscounts', 'lineItemPrice'].forEach((field) => {
        if (item?.fullItem) encryptPriceFields(item.fullItem[field], fieldsToEncrypt);
      });
    });

    return NextResponse.json(
      {
        message: "Quotes Successfully fetched",
        data: data.data,
      },
      { status: 200 }
    );
  } catch (error) {
    logError("Error", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const dynamic = "force-dynamic";
