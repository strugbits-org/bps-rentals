"use server";

import getDataFetchFunction from "./FetchFunction";

export const getFooterData = async () => {
  try {
    const response = await getDataFetchFunction({
      "dataCollectionId": "Footer"
    });
    if (response && response._items) {
      return response._items.map((x) => x.data)[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching FooterData:", error);
  }
}

export const getContactData = async () => {
  try {
    const response = await getDataFetchFunction({
      "dataCollectionId": "ContactDetails"
    });
    if (response && response._items) {
      return response._items.map((x) => x.data);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching ContactDetails:", error);
    return [];
  }
}

export const getSocialLinks = async () => {
  try {
    const response = await getDataFetchFunction({
      "dataCollectionId": "SocialLinks",
    });
    if (response && response._items) {
      return response._items.map((x) => x.data).sort((a, b) => a.orderNumber - b.orderNumber);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching SocialLinks:", error);
    return [];
  }
}

export const getFooterNavigationMenu = async () => {
  try {
    const response = await getDataFetchFunction({
      "dataCollectionId": "FooterNavigationMenu"
    });
    if (response && response._items) {
      return response._items.filter(x => !x.data.isHidden).map((x) => x.data).sort((a, b) => a.orderNumber - b.orderNumber);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching FooterNavigationMenu:", error);
    return [];
  }
}

export const getContactUsContent = async () => {
  try {
    const response = await getDataFetchFunction({
      "dataCollectionId": "ContactUsContent"
    });
    if (response && response._items) {
      return response._items.map((x) => x.data)[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching FooterNavigationMenu:", error);
    return [];
  }
}