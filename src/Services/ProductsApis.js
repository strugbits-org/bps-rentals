"use server"
import getDataFetchFunction from "./FetchFunction";

export const fetchFilteredProducts = async ({ pageSize = 10, skip = 0, searchTerm = "", categories = [], colors = [], slug = null }) => {
  try {
    const hasSome = [];
    if (categories.length !== 0) {
      hasSome.push({
        key: "subCategory",
        values: categories
      });
    }
    if (colors.length !== 0) {
      hasSome.push({
        key: "colors",
        values: colors
      });
    }

    const payload = {
      dataCollectionId: "locationFilteredVariant",
      includeReferencedItems: [
        "category",
        "product",
        "subCategory",
        "f1Members",
        "f1Collection"
      ],
      ne: [
        {
          key: "hidden",
          value: true,
        },
        {
          key: "isF1Exclusive",
          value: true,
        },
      ],
      hasSome: hasSome,
      returnTotalCount: true,
      limit: pageSize,
      skip: skip,
    };

    const response = await getDataFetchFunction(payload);
    if (response && response._items) {
      return { items: response._items.map((x) => x.data), totalCount: response.totalCount };
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
export const fetchAllCategoriesData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "BPSCatalogStructure",
      includeReferencedItems: ["parentCollection", "level2Collections", "f1Collections"],
      limit: 50
    });
    if (response && response._items) {
      const categoriesData = response._items.map((x) => x.data);
      const filteredData = categoriesData.filter((x) => x._id !== undefined && x.parentCollection.slug !== "all-products");
      return filteredData;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
};
export const getSelectedColorsData = async (categoryId) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "colorFilterCache",
      limit: 1000
    });

    if (response && response._items) {
      return categoryId ? response._items.map((x) => x.data).find(x => x.category === categoryId) : response._items.map((x) => x.data);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching colors:", error);
  }
};
