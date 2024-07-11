"use server";

import getDataFetchFunction from "./FetchFunction";

export const getHomeHeroSectionData = async () => {
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
