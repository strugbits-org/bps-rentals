"use server";
import logError from "@/Utils/ServerActions";
import { createWixClientApiStrategy } from "@/Utils/CreateWixClient";
import getDataFetchFunction from "./FetchFunction";
import { getAuthToken } from "./GetAuthToken";
import { decryptField, decryptPriceFields } from "@/Utils/Encrypt";

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
            dataCollectionId: "DemoProductData",
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
            return response._items.filter(x => x.data.product?._id).map((x) => x.data);
        } else {
            throw new Error("Response does not contain _items");
        }
    } catch (error) {
        logError("Error fetching product sets:", error);
        return [];
    }
};

export const getProductForUpdate = async (id) => {
    try {
        const authToken = await getAuthToken();

        const response = await fetch(`${baseUrl}/api/product/get/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: authToken,
            },
            cache: "no-store"
        });

        const data = await response.json();

        const fieldsToDecrypt = [
            'formattedDiscountedPrice',
            'pricePerUnitData',
            'pricePerUnit',
            'formattedPricePerUnit',
            'formattedPrice',
            'price',
            'discountedPrice',
        ];

        data._items = data._items.map(val => {
            if (val.data?.productSets?.length) {
                val.data.productSets = val.data.productSets.map(set => {
                    set.price = decryptField(set.price);
                    return set;
                });
            }
            if (val.data.variantData) {
                val.data.variantData = val.data.variantData.map(val2 => {
                    decryptPriceFields(val2.variant, fieldsToDecrypt);
                    return val2;
                });
            }
            decryptPriceFields(val.data.product, fieldsToDecrypt);
            return val;
        });

        return data._items[0];
    } catch (error) {
        logError(`Error fetching product ${id}:`, error);
    }
};