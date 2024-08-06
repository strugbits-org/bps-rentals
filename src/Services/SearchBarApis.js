import getDataFetchFunction from "./FetchFunction";

export const getPortfolioData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "PortfolioCollection",
      includeReferencedItems: ["portfolioRef", "studios", "markets"],
      limit: "infinite",
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
      "includeReferencedItems": ["blogRef", "studios", "markets"],
      limit: "infinite",
    });

    if (response && response._items) {
      return response._items.map((x) => x.data)
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching Blogs data:", error);
    return [];
  }
}