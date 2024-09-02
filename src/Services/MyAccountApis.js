"use server";

import getDataFetchFunction from "./FetchFunction";

export const getMyAccountPageContent = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsMyAccountPage",
    });
    if (response && response._items) {
      return response._items[0].data;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching RentalsMyAccountPage data:", error);
    return [];
  }
};

export const getChangePasswordPageContent = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsChangePasswordPage",
    });
    if (response && response._items) {
      return response._items[0].data;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching RentalsChangePasswordPage data:", error);
    return [];
  }
};
