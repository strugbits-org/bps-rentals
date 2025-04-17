import getDataFetchFunction from "./FetchFunction";
import { fetchProductsByIds } from "./ProductsApis";
import logError from "@/Utils/ServerActions";

export const getAllPagesMetaData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "PageSeoConfigurationRentals",
    });
    if (response && response.items) {
      return response.items;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching All PageMetaData:", error);
    return [];
  }
};

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
    if (response && response.items) {
      return response.items[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching PageMetaData:", error);
  }
};

export const getNewArrivalSectionContent = async (slug) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsNewArrivals",
      eq: [
        {
          key: "slug",
          value: slug || "/",
        }
      ]
    });
    if (response && response.items) {
      return response.items[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching RentalsNewArrivals data:", error);
    return [];
  }
};

export const getHighlightsSection = async (dataCollectionId) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId,
      sortKey: "orderNumber",
    });
    if (response && response.items) {
      const items = response.items;
      const productIds = items.map(x => (x.product || x.products));
      const fullProducts = await fetchProductsByIds(productIds);
      fullProducts.forEach((fullProduct) => {
        const matchingItem = items.find(item => (item.product || item.products) === fullProduct.product._id);
        if (matchingItem) {
          fullProduct.orderNumber = matchingItem.orderNumber;
          fullProduct.featureImage = matchingItem.featureImage;
        }
      });
      return fullProducts.filter(x => x.product._id).sort((a, b) => a.orderNumber - b.orderNumber);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError(`Error fetching HighlightsSection ${dataCollectionId} :`, error);
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
    if (response && response.items) {
      return response.items[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching HomeHotTrendsSectionContent data:", error);
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
    if (response && response.items) {
      return response.items.sort((a, b) => a.orderNumberRentals - b.orderNumberRentals);
    } else {
      throw new Error("Response does not contain _items", response);
    }
  } catch (error) {
    logError("Error fetching search pages data:", error);
    return [];
  }
}

export const getHomeSectionDetails = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsHomeSectionDetails",
    });
    if (response && response.items) {
      return response.items[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching HomeSectionDetails:", error);
  }
};

export const getDreamBigSectionContent = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "DreamBigSection",
    });
    if (response && response.items) {
      return response.items[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching HomeDreamBigSectionContent data:", error);
    return [];
  }
};

export const getPeopleReviewSliderData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "PeopleReviewSlider",
    });
    if (response && response.items) {
      return response.items
        
        .sort((a, b) => a.orderNumber - b.orderNumber);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching StudiosData data:", error);
    return [];
  }
};
export const getStudiosData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "StudiosSection",
    });
    if (response && response.items) {
      return response.items
        
        .sort((a, b) => a.orderNumber - b.orderNumber);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching StudiosData data:", error);
    return [];
  }
};

export const getRentalsTeamsBanner = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalTeamsBanner",
    });
    if (response && response.items) {
      return response.items[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching Rentals Teams Banner data:", error);
    return [];
  }
};

export const getMarketsData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "MarketSection",
      includeReferencedItems: ["rentalsMarket"],
    });
    if (response && response.items) {
      return response.items
        
        .sort((a, b) => a.orderNumber - b.orderNumber);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching MarketsData data:", error);
    return [];
  }
};
export const getMarketSection = async (slug) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "MarketSection",
      includeReferencedItems: ["rentalsMarket"],
      eq: [{
        key: "slug",
        value: slug
      }],
    });

    if (response && response.items) {
      return response.items[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching Market Section data:", error);
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
    if (response && response.items) {
      return response.items;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching MarketSliderData data:", error);
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

    if (response && response.items) {
      return response.items
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError(error, "error occured");
    return [];
  }
}

export const getSocialSectionDetails = async () => {
  try {
    const response = await getDataFetchFunction({
      "dataCollectionId": "SocialSectionDetails"
    });

    if (response && response.items) {
      return response.items[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching SocialSectionDetails:", error);
  }
}

export const fetchInstaFeed = async () => {
  try {
    const response = await getDataFetchFunction({
      "dataCollectionId": "InstagramFeed"
    });

    if (response && response.items) {
      return response.items
    } else {
      throw new Error("Response does not contain _items", response);
    }
  } catch (error) {
    logError("Error fetching InstaFeed:", error);
  }
}

export const getPortfolioData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "PortfolioCollection",
      includeReferencedItems: ["portfolioRef", "studios", "markets"],
      limit: "infinite",
      ne: [{ key: "isHidden", value: true }],
    });
    if (response && response.items) {
      return response.items;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching Portfolio data:", error);
    return [];
  }
};

export const getProductPortfolioData = async (productId) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "PortfolioCollection",
      includeReferencedItems: ["portfolioRef", "studios", "markets", "storeProducts"],
      limit: "infinite",
      ne: [{ key: "isHidden", value: true }],
    });
    if (response && response.items) {
      const portfolios = response.items;
      const productPortfolios = portfolios.filter(({ storeProducts }) =>
        storeProducts?.find(({ _id }) => _id === productId)
      );
      return productPortfolios;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching Portfolio data:", error);
    return [];
  }
};

export const getProductBlogsData = async (productId) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "BlogProductData",
      includeReferencedItems: ["blogRef", "studios", "markets", "author", "storeProducts"],
      limit: "infinite",
      ne: [{ key: "isHidden", value: true }],
    });

    if (response && response.items) {
      const blogs = response.items;
      const productBlogs = blogs.filter(({ storeProducts }) =>
        storeProducts?.find(({ _id }) => _id === productId)
      );
      return productBlogs;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching Blogs data:", error);
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

    if (response && response.items) {
      return response.items;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching Blogs data:", error);
    return [];
  }
};

export const getOurClientsSectionData = async () => {
  try {
    const response = await getDataFetchFunction({
      "dataCollectionId": "OurClientsSection",
      "eq": [{ "key": "rentals", "value": true }]
    });
    if (!response.items) {
      throw new Error("No data found for OurClientsSection");
    }
    return response.items.sort((a, b) => a.order - b.order);
  } catch (error) {
    logError("Error fetching OurClientsSection data:", error);
    return [];
  }
}