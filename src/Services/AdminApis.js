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

export const getAdminPagesData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "AdminPagesData",
    });
    if (response && response._items) {
      return response._items[0].data;
    } else {
      throw new Error("Response does not contain _items", response);
    }
  } catch (error) {
    logError("Error fetching Admin Pages data:", error);
  }
};