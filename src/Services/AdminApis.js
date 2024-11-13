"use server";
import logError from "@/Utils/ServerActions";
import { createWixClientApiStrategy } from "@/Utils/CreateWixClient";
import getDataFetchFunction from "./FetchFunction";
import { getAuthToken } from "./GetAuthToken";

const baseUrl = process.env.BASE_URL;

export const updateDataItem = async (data) => {
    try {
        const { dataCollectionId } = data;
        const options = {
            dataCollectionId,
            dataItem: data,
        }
        const client = await createWixClientApiStrategy();
        const response = await client.items.updateDataItem(data._id, options);
        return response;
    } catch (error) {
        logError("Error updating products:", error);
    }
};

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
            increasedLimit: 1000,
            includeVariants: false,
        });
        if (response && response._items) {
            return response._items.filter(x => x.data.product?._id).map((x) => x.data);
        } else {
            throw new Error("Response does not contain _items");
        }
    } catch (error) {
        logError("Error fetching product sets:", error);
        return [];
    }
};

export const getAllSetProducts = async (retries = 3, delay = 1000) => {
    const retryDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const authToken = await getAuthToken();            
            if (!authToken) return [];

            const response = await fetch(`${baseUrl}/api/product/getProductsSets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authToken,
                },
                cache: "no-store",
            });

            const data = await response.json();
            return data;

        } catch (error) {
            logError(`Error fetching products sets: Attempt ${attempt + 1} failed: ${error}`);

            if (attempt < retries) {
                logError(`Retrying in ${delay}ms...`);
                await retryDelay(delay);
                delay *= 2;
            } else {
                logError(`Attempt ${attempt} failed. No more retries left.`);
                return [];
            }
        }
    }
};

export const getProductForUpdate = async (id) => {
    try {
        const response = await getDataFetchFunction({
            dataCollectionId: "locationFilteredVariant",
            eq: [
                {
                    key: "product",
                    value: id
                }
            ],
            encodePrice: false,
            includeVariants: false,
        });
        if (response) return response._items[0];
    } catch (error) {
        logError(`Error fetching product ${id}:`, error);
    }
};