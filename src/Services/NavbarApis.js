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
