import { createWixClient } from '@/Utils/CreateWixClient';
import handleAuthentication from '@/Utils/HandleAuthentication';
import { NextResponse } from "next/server";

// GET method handler
export const GET = async (req, context) => {
    try {
        const authenticatedUserData = await handleAuthentication(req);
        console.log(authenticatedUserData, 'authenticatedUserData');
        if (!authenticatedUserData) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { params } = context;
        const id = params.id;
        console.log(id, 'id');
        const wixClient = await createWixClient();
        const locationFilterVariantData = await wixClient.items
            .queryDataItems({
                dataCollectionId: "locationFilteredVariant",
            })
            .eq("product", id)
            .find();

        console.log(locationFilterVariantData, 'locationFilterVariantData');
        if (locationFilterVariantData._items.length === 0) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }

        // console.log(locationFilterVariantData._items[0].data);
        const dataObject = {
            ...locationFilterVariantData._items[0].data,
            f1Members: locationFilterVariantData._items[0].data.f1Members
                ? [
                    ...locationFilterVariantData._items[0].data.f1Members,
                    authenticatedUserData.memberId,
                ]
                : [authenticatedUserData.memberId],
        };
        // delete dataObject._id;
        // delete dataObject._owner;
        // delete dataObject._createdDate;
        // delete dataObject._updatedDate;

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

        response.dataItem.data.variantData = response.dataItem.data.variantData.map((val) => {
            delete val.variant.discountedPrice
            delete val.variant.price
            return val
        })

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("errrrrr", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
};