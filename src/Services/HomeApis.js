"use server";

import logError from "@/Utils/ServerActions";
import getDataFetchFunction from "./FetchFunction";

export const getHomeHeroSectionContent = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsHomeHero",
    });
    if (response && response.items) {
      return response.items[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching HomeHeroSectionContent data:", error);
  }
};