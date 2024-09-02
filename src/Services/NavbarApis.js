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
      return response._items[0].data;
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
      return response._items[0].data;
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
      return response._items[0].data;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return [];
  }
};
export const getSearchSectionDetails = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "SearchSectionDetails",
    });
    if (response && response._items) {
      return response._items[0].data;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching search section data:", error);
    return [];
  }
};

export const getFilterLocations = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "FilterLocations",
    });
    if (response && response._items) {
      return response._items.map((x) => x.data);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching FilterLocations data:", error);
    return [];
  }
};

//Category Apis
export const getNavbarCategoriesData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "HeaderCategoryMenu",
      includeReferencedItems: ["categoryName"],
      // eq: [
      //   {
      //     key: "hideMenu",
      //     value: true,
      //   },
      // ],
    });
    if (response && response._items) {
      const categoriesData = response._items
        .map((x) => x.data)
        .sort((a, b) => a.order - b.order);
      return categoriesData;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
};