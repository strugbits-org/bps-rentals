import { createWixClient } from "@/Utils/CreateWixClient";
import handleAuthentication from "@/Utils/HandleAuthentication";
import { NextResponse } from "next/server";

// POST method handler
export const POST = async (req) => {
  try {
    const authenticatedUserData = await handleAuthentication(req);
    if (!authenticatedUserData) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const wixClient = await createWixClient();
    let locationFilterVariantData = await wixClient.items
      .queryDataItems({
        dataCollectionId: "locationFilteredVariant",
        includeReferencedItems: [
          "category",
          "product",
          "subCategory",
          "f1Collection",
        ],
        returnTotalCount: true,
      })

      .skip(req.body.skip)
      .limit(10)
      .find();

    console.log(locationFilterVariantData, "locationFilterVariantData");

    let items = locationFilterVariantData._items;
    while (items.length < locationFilterVariantData._totalCount) {
      locationFilterVariantData =
        await locationFilterVariantData._fetchNextPage();
      items = [...items, ...locationFilterVariantData._items];
    }
    locationFilterVariantData._items = items;

    if (locationFilterVariantData._items.length > 0) {
      locationFilterVariantData._items = locationFilterVariantData._items.map(
        (val) => {
          val.data.variantData = val.data.variantData.map((val2) => {
            delete val2.variant.discountedPrice;
            delete val2.variant.price;
            return val2;
          });
          delete val.data.product.formattedDiscountedPrice;
          delete val.data.product.discountedPrice;
          delete val.data.product.formattedPrice;
          delete val.data.product.price;
          return val;
        }
      );
    }

    return NextResponse.json(locationFilterVariantData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
