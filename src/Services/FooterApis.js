"use server";

import logError from "@/Utils/ServerActions";
import getDataFetchFunction from "./FetchFunction";

export const getFooterData = async () => {
  try {
    const response = await getDataFetchFunction({
      "dataCollectionId": "Footer"
    });
    if (response && response.items) {
      return response.items[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching FooterData:", error);
  }
}

export const getContactData = async () => {
  try {
    const response = await getDataFetchFunction({
      "dataCollectionId": "ContactDetails"
    });
    if (response && response.items) {
      return response.items;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching ContactDetails:", error);
    return [];
  }
}

export const getSocialLinks = async () => {
  try {
    const response = await getDataFetchFunction({
      "dataCollectionId": "SocialLinks",
    });
    if (response && response.items) {
      return response.items.sort((a, b) => a.orderNumber - b.orderNumber);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching SocialLinks:", error);
    return [];
  }
}

export const getFooterNavigationMenu = async () => {
  try {
    const response = await getDataFetchFunction({
      "dataCollectionId": "FooterNavigationMenu",
      ne: [
        {
          key: "isHidden",
          value: true,
        },
        {
          key: "rentalsAction",
          value: "none",
        },
      ]
    });
    if (response && response.items) {
      return response.items.sort((a, b) => a.orderNumber - b.orderNumber);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching FooterNavigationMenu:", error);
    return [];
  }
}

export const getContactUsContent = async () => {
  try {
    const response = await getDataFetchFunction({
      "dataCollectionId": "ContactUsContent"
    });
    if (response && response.items) {
      return response.items[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching FooterNavigationMenu:", error);
    return [];
  }
}