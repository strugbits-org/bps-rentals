import { instafeed, refreshToken } from "instafeed-node-js";
import getDataFetchFunction from "./FetchFunction";
import { fetchProductsByIds } from "./ProductsApis";

export const getPageMetaData = async (path) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "PageSeoConfigurationRentals",
      eq: [
        {
          key: "slug",
          value: path
        }
      ]
    });
    if (response && response._items) {
      return response._items[0].data;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching PageMetaData:", error);
    return [];
  }
};

export const getNewArrivalSectionContent = async () => {
  try {
    const response = await getDataFetchFunction({ dataCollectionId: "RentalsHomeNewArrivals" });
    if (response && response._items) {
      return response._items[0].data;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching RentalsNewArrivals data:", error);
    return [];
  }
};

export const getHighlightsSection = async (dataCollectionId) => {
  try {
    const response = await getDataFetchFunction({ dataCollectionId });
    if (response && response._items) {
      const items = response._items.map((x) => x.data);
      const productIds = items.map(x => (x.product || x.products));
      const fullProducts = await fetchProductsByIds(productIds);
      fullProducts.forEach((fullProduct) => {
        const matchingItem = items.find(item => (item.product || item.products) === fullProduct.product._id);
        if (matchingItem) {
          fullProduct.featureImage = matchingItem.featureImage;
        }
      });
      return fullProducts.filter(x => x.product._id);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching HighlightsSection:", error);
    return [];
  }
};

export const getHotTrendsSection = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "Stores/Collections",
      eq: [
        {
          key: "name",
          value: "Hot Trends"
        }
      ],
    });
    if (response && response._items) {
      return response._items[0].data;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching HomeHotTrendsSectionContent data:", error);
    return [];
  }
};

export const fetchSearchPages = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "SearchPages",
      eq: [
        {
          key: "showInSearch",
          value: true
        }
      ],
    });
    if (response && response._items) {
      return response._items.map((x) => x.data).sort((a, b) => a.orderNumberRentals - b.orderNumberRentals);
    } else {
      throw new Error("Response does not contain _items", response);
    }
  } catch (error) {
    console.error("Error fetching search pages data:", error);
    return [];
  }
}

export const getHomeSectionDetails = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsHomeSectionDetails",
    });
    if (response && response._items) {
      return response._items[0].data;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching HomeSectionDetails:", error);
  }
};

export const getDreamBigSectionContent = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "DreamBigSection",
    });
    if (response && response._items) {
      return response._items[0].data;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching HomeDreamBigSectionContent data:", error);
    return [];
  }
};

export const getPeopleReviewSliderData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "PeopleReviewSlider",
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

export const getRentalsTeamsBanner = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalTeamsBanner",
    });
    if (response && response._items) {
      return response._items[0].data;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching Rentals Teams Banner data:", error);
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
export const getMarketSection = async (slug) => {
  try {
    const response = await getDataFetchFunction({
      "dataCollectionId": "MarketSection",
      "includeReferencedItems": ["howWeDoItSections"],
      "eq": [{
        key: "slug",
        value: slug
      }],
    });

    if (response && response._items) {
      return response._items[0].data;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching Market Section data:", error);
  }
};
export const getMarketSliderData = async (id) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "PortfolioCollection",
      includeReferencedItems: ["portfolioRef", "markets"],
      limit: 3,
      hasSome: [
        {
          key: "markets",
          values: [id]
        }
      ]
    });
    if (response && response._items) {
      return response._items.map((x) => x.data);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching MarketSliderData data:", error);
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
      return response._items[0].data;
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

export const getPortfolioData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "PortfolioCollection",
      includeReferencedItems: ["portfolioRef", "studios", "markets"],
      limit: "infinite",
      ne: [{ key: "isHidden", value: true }],
    });
    if (response && response._items) {
      return response._items.map((x) => x.data);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching Portfolio data:", error);
    return [];
  }
};

export const getBlogsData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "BlogProductData",
      includeReferencedItems: ["blogRef", "studios", "markets", "author"],
      limit: "infinite",
      ne: [{ key: "isHidden", value: true }],
    });

    if (response && response._items) {
      return response._items.map((x) => x.data);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching Blogs data:", error);
    return [];
  }
};