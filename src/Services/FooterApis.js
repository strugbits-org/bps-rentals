"use server";

import getDataFetchFunction from "./FetchFunction";

export const getFooterContent = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsFooter",
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

export const getFooterLinksData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsFooterLinks",
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
      return response._items
        .map((x) => x.data)
        .sort((a, b) => a.order - b.order);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return [];
  }
};

export const getSocialLinksData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsSocialMediaLinks",
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
      return response._items
        .map((x) => x.data)
        .sort((a, b) => a.order - b.order);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return [];
  }
};

export const getAddressesData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsAddresses",
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
      return response._items
        .map((x) => x.data)
        .sort((a, b) => a.order - b.order);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return [];
  }
};
