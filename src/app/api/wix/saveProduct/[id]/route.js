import { createWixClient } from "@/Utils/CreateWixClient";
import handleAuthentication from "@/Utils/HandleAuthentication";
import { NextResponse } from "next/server";
export async function addtoWishList(memberId, productId) {
  const options = {
    suppressAuth: true,
    suppressHooks: true,
  };

  let res = await wixData
    .query("locationFilteredVariant")
    .eq("product", productId)
    .find();

  if (res.items.length > 0) {
    let data = res.items[0];
    let memberArr = data.members;

    if (memberArr && memberArr.length > 0) {
      let chk = memberArr.includes(memberId);
      if (!chk) {
        memberArr.push(memberId);
        data.members = memberArr;

        await wixData
          .update("locationFilteredVariant", data, options)
          .then(() => {
            console.log("updated");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      data.members = [memberId];

      await wixData
        .update("locationFilteredVariant", data, options)
        .then(() => {
          console.log("updated from else");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
}
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
    const locationFilterVariantData = await wixClient.items
      .queryDataItems({
        dataCollectionId: "locationFilteredVariant",
      })
      .eq("product", id)
      .find();

    if (locationFilterVariantData._items.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const memberId = authenticatedUserData.memberId;
    let productData = locationFilterVariantData._items[0];
    let membersData = productData.data.members;

    const dataObject = {
      ...productData.data,
      members: membersData ? [...membersData, memberId] : [memberId],
    };

    const response = await wixClient.items.updateDataItem(
      locationFilterVariantData._items[0]._id,
      {
        dataCollectionId: "locationFilteredVariant",
        dataItem: {
          _id: locationFilterVariantData._items[0]._id,
          data: dataObject,
        },
      }
    );

    response.dataItem.data.variantData = response.dataItem.data.variantData.map(
      (val) => {
        delete val.variant.discountedPrice;
        delete val.variant.price;
        return val;
      }
    );

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
