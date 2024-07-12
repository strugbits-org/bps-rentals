"use server";

import getDataFetchFunction from "./FetchFunction";

export const getHomeHeroSectionContent = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsHomeHero",
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

export const getHomeNewArrivalSectionContent = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsHomeNewArrivals",
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

export const getHomeHotTrendsSectionContent = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsHomeHotTrends",
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

export const getHomeStudioSectionContent = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsHomeStudios",
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

export const getHomeDreamBigSectionContent = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsHomeDreamBig",
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

export const getStudiosData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "StudiosSection",
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
        .sort((a, b) => a.orderNumber - b.orderNumber);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return [];
  }
};

export const getMarketsData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "MarketSection",
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
        .sort((a, b) => a.orderNumber - b.orderNumber);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return [];
  }
};
