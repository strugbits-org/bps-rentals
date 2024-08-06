"use server";

import getDataFetchFunction from "./FetchFunction";

export const getHomeHeroSectionContent = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsHomeHero",
    });
    if (response && response._items) {
      return response._items.map((x) => x.data)[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching HomeHeroSectionContent data:", error);
    return [];
  }
};