"use server";

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
    if (response && response._items) {
      return response._items.map((x) => x.data)[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching homepage data:", error);
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
    if (response && response._items) {
      return response._items.map((x) => x.data)[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching homepage data:", error);
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
    if (response && response._items) {
      return response._items.map((x) => x.data)[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return [];
  }
};

//Category Apis
export const getAllCategoriesData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "BPSCatalogStructure",
      includeReferencedItems: ["parentCollection"],
      eq: [
        {
          key: "hideMenu",
          value: true,
        },
      ],
    });
    if (response && response._items) {
      const categoriesData = response._items
        .map((x) => x.data)
        .sort((a, b) => a.displayOrder - b.displayOrder);
      // const filteredData = categoriesData.filter((x) => x.parentCollection.slug !== "all-products");
      return categoriesData;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
};