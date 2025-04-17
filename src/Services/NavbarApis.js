"use server";

import logError from "@/Utils/ServerActions";
import getDataFetchFunction from "./FetchFunction";

export const getLoginModalContent = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsLoginModal",
      includeReferencedItems: null,
      returnTotalCount: null,
      contains: null,
      limit: null,
      eq: null,
      ne: null,
      hasSome: null,
      skip: null,
    });
    if (response && response.items) {
      return response.items[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching homepage data:", error);
    return [];
  }
};

export const getCreateAccountModalContent = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsCreateAccountModal",
      includeReferencedItems: null,
      returnTotalCount: null,
      contains: null,
      limit: null,
      eq: null,
      ne: null,
      hasSome: null,
      skip: null,
    });
    if (response && response.items) {
      return response.items[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching homepage data:", error);
    return [];
  }
};

export const getForgotPasswordModalContent = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsResetPasswordModal",
      includeReferencedItems: null,
      returnTotalCount: null,
      contains: null,
      limit: null,
      eq: null,
      ne: null,
      hasSome: null,
      skip: null,
    });
    if (response && response.items) {
      return response.items[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching homepage data:", error);
    return [];
  }
};
export const getSearchSectionDetails = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "SearchSectionDetails",
    });
    if (response && response.items) {
      return response.items[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching search section data:", error);
    return [];
  }
};

export const getFilterLocations = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "FilterLocations",
    });
    if (response && response.items) {
      return response.items;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching FilterLocations data:", error);
    return [];
  }
};

//Category Apis
export const getNavbarCategoriesData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "HeaderCategoryMenu",
      includeReferencedItems: ["categoryName"],
    });
    if (response && response.items) {
      const categoriesData = response.items.sort((a, b) => a.order - b.order);
      return categoriesData;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching all categories:", error);
    return [];
  }
};