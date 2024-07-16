import getDataFetchFunction from "./FetchFunction";

export const fetchProducts = async () => {
  try {
    const payload = {
      dataCollectionId: "locationFilteredVariant",
      includeReferencedItems: [
        "category",
        "product",
        "subCategory",
        "f1Members",
        "f1Collection",
      ],
      eq: [
        {
          key: "isF1Exclusive",
          value: false,
        },
      ],
      ne: [
        {
          key: "hidden",
          value: true,
        },
      ],
      returnTotalCount: true,
      limit: "infinite",
    };

    const response = await getDataFetchFunction(payload);
    if (response && response._items) {
      return response._items.map((x) => x.data).slice(20, 26);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
