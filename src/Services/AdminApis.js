"use server";
import logError from "@/Utils/ServerActions";
import { createWixClientApiStrategy } from "@/Utils/CreateWixClient";

export const UpdateProductsSorting = async (items) => {
    try {
        const options = {
            dataCollectionId: "DemoProducts",
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
