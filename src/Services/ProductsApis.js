"use server"
import getDataFetchFunction from "./FetchFunction";

export const fetchFilteredProducts = async ({ pageSize = 10, skip = 0, searchTerm = "", categories = [], location = "NT", colors = [], slug = null }) => {
  try {
    const payload = {
      dataCollectionId: "locationFilteredVariant",
      includeReferencedItems: [
        "category",
        "product",
        "subCategory",
        "f1Collection"
      ],
      eq: [],
      hasSome: [],
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
      returnTotalCount: true,
      limit: pageSize,
      skip: skip,
    };


    if (location) {
      payload.eq.push({
        key: "location",
        value: location
      });
    }


    if (categories.length !== 0) {
      payload.hasSome.push({
        key: "subCategory",
        values: categories
      });
    }
    if (colors.length !== 0) {
      payload.hasSome.push({
        key: "colors",
        values: colors
      });
    }


    const response = await getDataFetchFunction(payload);
    if (response && response._items) {
      return { items: response._items.map((x) => x.data), totalCount: response.totalCount };
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return { items: [], totalCount: 0 };
  }
};
export const getBestSellerProducts = async (bestSeller, limit) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "locationFilteredVariant",
      includeReferencedItems: [
        "product",
        "subCategory",
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
      hasSome: [{
        key: "subCategory",
        values: bestSeller
      }],
      limit: "infinite",
    });
    if (response && response._items) {
      if (limit) {
        return response._items.map((x) => x.data).slice(0, limit);
      }
      return response._items.map((x) => x.data);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching products by ids:", error);
    return [];
  }
};
export const fetchBestSellers = async (slug) => {
  try {
    const payload = {
      dataCollectionId: "BestSellers",
    }
    if (slug) {
      payload.hasSome = [{
        key: "slug",
        values: [`/${slug}`]
      }]
    }
    const response = await getDataFetchFunction(payload);
    if (response && response._items) {
      return response._items.map((x) => x.data.category)
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching best seller ids:", error);
    return [];
  }
};
export const fetchProductsByIds = async (products) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "locationFilteredVariant",
      includeReferencedItems: [
        "category",
        "product",
        "subCategory",
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
      hasSome: [{
        key: "product",
        values: products
      }],
    });
    if (response && response._items) {
      return response._items.map((x) => x.data)
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching products by ids:", error);
    return [];
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

export const fetchAllProducts = async () => {
  try {
    const payload = {
      dataCollectionId: "locationFilteredVariant",
      includeReferencedItems: ["product"],
      limit: 1000,
      eq: [],
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
    };
    const response = await getDataFetchFunction(payload);
    if (response && response._items) {
      return response._items.map((x) => x.data);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching all products:", error);
  }
};
export const getSelectedProductId = async (slug) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "Stores/Products",
      returnTotalCount: null,
      contains: null,
      limit: null,
      eq: [
        {
          key: "slug",
          value: slug,
        },
      ],
      ne: null,
      hasSome: null,
      skip: null,
    });
    if (response && response._items) {
      return response._items.map((x) => x.data);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching selected ProductId:", error);
  }
};
export const getSelectedProductDetails = async (slug) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "locationFilteredVariant",
      includeReferencedItems: [
        "category",
        "product",
        "subCategory",
        "f1Collection",
      ],
      returnTotalCount: null,
      contains: null,
      limit: null,
      eq: [
        {
          key: "product",
          value: slug,
        },
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
      hasSome: null,
      skip: null,
    });

    if (response && response._items) {
      return response._items.map((x) => x.data);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching selected product details:", error);
  }
};
export const getPairItWithProductsId = async (slug) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "BPSPairItWith",
      includeReferencedItems: null,
      returnTotalCount: null,
      contains: null,
      limit: null,
      eq: [
        {
          key: "productId",
          value: slug,
        },
      ],
      ne: null,
      hasSome: null,
      skip: null,
    });

    if (response && response._items) {
      return response._items.map((x) => x.data);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching products(getPairItWithProductsId):", error);
  }
};

export const getProductVariants = async (id) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "Stores/Variants",
      returnTotalCount: null,
      contains: null,
      limit: null,
      hasSome: null,
      ne: null,
      eq: [
        {
          key: "productId",
          value: id,
        },
      ],
      skip: null,
    });

    if (response && response._items) {
      return response._items.map((x) => x.data);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching product variants:", error);
    return [];
  }
};
export const getProductVariantsImages = async (id) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "BPSProductImages",
      returnTotalCount: null,
      contains: null,
      limit: null,
      hasSome: null,
      ne: null,
      eq: [
        {
          key: "productId",
          value: id,
        },
      ],
      skip: null,
    });

    if (response && response._items) {
      return response._items.map((x) => x.data);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching product snapshots:", error);
    return [];
  }
};
export const getProductFound = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "BPSCatalogStructure",
      includeReferencedItems: ["parentCollection"],
      returnTotalCount: null,
      contains: null,
      limit: null,
      eq: null,
      ne: null,
      hasSome: null,
      skip: null,
    });

    if (response && response._items) {
      const categoriesData = response._items.map((x) => x.data);
      const filteredData = categoriesData.filter(
        (x) => x.parentCollection.slug !== "all-products"
      );
      return filteredData;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching products(getProductFound):", error);
  }
};
export const getAllCategoriesData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "BPSCatalogStructure",
      includeReferencedItems: [
        "parentCollection",
        "level2Collections",
        "f1Collections",
      ],
      limit: 50,
    });
    if (response && response._items) {
      const categoriesData = response._items.map((x) => x.data);
      const filteredData = categoriesData.filter(
        (x) => x.parentCollection.slug !== "all-products"
      );
      return filteredData;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching all categories:", error);
    return [];
  }
};
export const getPairItWithProducts = async (productIds) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "locationFilteredVariant",
      includeReferencedItems: [
        "category",
        "product",
        "subCategory",
        "f1Collection",
      ],
      returnTotalCount: null,
      contains: null,
      limit: null,
      eq: [
        {
          key: "isF1",
          value: true,
        },
      ],
      ne: [
        {
          key: "hidden",
          value: true,
        },
      ],
      hasSome: [
        {
          key: "product",
          values: productIds,
        },
      ],
      skip: null,
    });
    if (response && response._items) {
      return response._items.map((x) => x.data);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching products(getPairItWithProducts):", error);
  }
};