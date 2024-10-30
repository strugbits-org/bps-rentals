"use server";
import logError from "@/Utils/ServerActions";
import { createWixClientApiStrategy } from "@/Utils/CreateWixClient";
import getDataFetchFunction from "./FetchFunction";

export const bulkUpdateCollection = async (dataCollectionId, items) => {
    try {
        const options = {
            dataCollectionId,
            dataItems: items,
        }
        const client = await createWixClientApiStrategy();
        const response = await client.items.bulkUpdateDataItems(options);
        return response;
    } catch (error) {
        logError("Error updating sorted items/products:", error);
        return [];
    }
};

export const getAllProductsForSets = async () => {
    try {
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
            limit: "infinite",
            increasedLimit: 700
        });
        if (response && response._items) {
            return response._items.map((x) => x.data);
        } else {
            throw new Error("Response does not contain _items");
        }
    } catch (error) {
        logError("Error fetching product sets:", error);
        return [];
    }
};