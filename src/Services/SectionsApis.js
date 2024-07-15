import { instafeed, refreshToken } from "instafeed-node-js";
import getDataFetchFunction from "./FetchFunction";

export const getNewArrivalSectionContent = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsHomeNewArrivals",
    });
    if (response && response._items) {
      return response._items.map((x) => x.data)[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching HomeNewArrivalSectionContent data:", error);
    return [];
  }
};

export const getHotTrendsSectionContent = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsHomeHotTrends",
    });
    if (response && response._items) {
      return response._items.map((x) => x.data)[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching HomeHotTrendsSectionContent data:", error);
    return [];
  }
};

export const getStudioSectionContent = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsHomeStudios",
    });
    if (response && response._items) {
      return response._items.map((x) => x.data)[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching HomeStudioSectionContent data:", error);
  }
};

export const getDreamBigSectionContent = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "DreamBigSection",
    });
    if (response && response._items) {
      return response._items.map((x) => x.data)[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching HomeDreamBigSectionContent data:", error);
    return [];
  }
};

export const getStudiosData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "StudiosSection",
    });
    if (response && response._items) {
      return response._items
        .map((x) => x.data)
        .sort((a, b) => a.orderNumber - b.orderNumber);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching StudiosData data:", error);
    return [];
  }
};

export const getMarketsData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "MarketSection",
    });
    if (response && response._items) {
      return response._items
        .map((x) => x.data)
        .sort((a, b) => a.orderNumber - b.orderNumber);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching MarketsData data:", error);
    return [];
  }
};


export const getSocialSectionBlogs = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "BlogProductData",
      "includeReferencedItems": ["blogRef"],
      "limit": 9
    });

    if (response && response._items) {
      return response._items.map((x) => x.data)
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error(error, "error occured");
    return [];
  }
}

export const getSocialSectionDetails = async () => {
  try {
    const response = await getDataFetchFunction({
      "dataCollectionId": "SocialSectionDetails"
    });

    if (response && response._items) {
      return response._items.map((x) => x.data)[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching SocialSectionDetails:", error);
  }
}

export const fetchInstaFeed = async () => {
  try {
    const response = await instafeed({ access_token: process.env.INSTA_ACCESS_TOKEN, requestedCount: 24 });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  } finally {
    refreshToken({ access_token: process.env.INSTA_ACCESS_TOKEN });
  };
}