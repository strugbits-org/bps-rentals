"use server";
import logError from "@/Utils/ServerActions";
import getDataFetchFunction from "./FetchFunction";
import { getAuthToken } from "./GetAuthToken";
import { sanitizeProduct } from "@/Utils/Utils";
const baseUrl = process.env.BASE_URL;

export const getProductsKeywords = async () => {
  try {
    const productKeywordsData = await getDataFetchFunction({ "dataCollectionId": "ProductKeywords" });
    const keywords = productKeywordsData.items[0]?.keywords || [];
    return keywords;
  } catch (error) {
    logError("Error fetching products keywords:", error);
  }
};

export const getAllProducts = async ({ categories = [], adminPage = false, optimizeContent = true }) => {
  try {
    const payload = {
      dataCollectionId: "locationFilteredVariant",
      includeReferencedItems: ["product"],
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
      includeVariants: !adminPage,
      limit: "infinite",
      increasedLimit: 700,
    };

    const response = await getDataFetchFunction(payload);
    if (adminPage) return response.items;

    if (!response || !response.items) {
      throw new Error("Response does not contain _items", response);
    }

    const products = response.items.map((x) => {
      const baseProduct = {
        subCategoryData: [],
        ...x,
        ...(x.subCategoryData && { subCategoryData: x.subCategoryData }),
      };

      return optimizeContent ? sanitizeProduct(baseProduct) : baseProduct;
    });

    if (categories.length === 0) return products;

    const filteredProducts = products.filter(product =>
      product.subCategoryData.some(x => categories.includes(x._id))
    );

    return filteredProducts;
  } catch (error) {
    logError("Error fetching products:", error);
    return [];
  }
};


export const getProductsByCategory = async (categories = [], adminPage = false) => {
  try {
    const payload = {
      dataCollectionId: "locationFilteredVariant",
      includeReferencedItems: ["product"],
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
      hasSome: [
        {
          key: "subCategory",
          values: categories
        }
      ],
      includeVariants: adminPage ? false : true,
      limit: "infinite",
      increasedLimit: 700,
    };

    const response = await getDataFetchFunction(payload);

    if (!response || !response.items) {
      throw new Error("Response does not contain _items", response);
    }
    return response.items;

  } catch (error) {
    logError("Error fetching products(admin):", error);
    return [];
  }
};

export const fetchProductsByIds = async (products) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "locationFilteredVariant",
      includeReferencedItems: [
        "product"
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
      hasSome: [
        {
          key: "product",
          values: products,
        },
      ],
      includeSubCategory: true,
      includeVariants: true,
      limit: "infinite",
      increasedLimit: 700,
    });
    if (response && response.items) {
      const products = response.items.map((x) => ({
        subCategoryData: [],
        ...x,
        ...x.subCategoryData && { subCategoryData: x.subCategoryData }
      }));
      return products;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching products by ids:", error);
    return [];
  }
};
export const fetchAllProducts = async (slug) => {
  try {
    const payload = {
      dataCollectionId: "locationFilteredVariant",
      includeReferencedItems: ["product"],
      limit: "infinite",
      increasedLimit: 700,
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
    if (response && response.items) {
      return response.items.find((x) => (x.product.slug === slug));
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching all products:", error);
  }
};
export const fetchAllProductsPaths = async () => {
  try {
    const payload = {
      dataCollectionId: "locationFilteredVariant",
      includeReferencedItems: ["product"],
      limit: "infinite",
      increasedLimit: 700,
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
      hasSome: [
        {
          key: "subCategory",
          values: ["77f8aa7c-38c7-ac49-ef1e-fea401cdc075"],
        },
      ],
    };
    const response = await getDataFetchFunction(payload);
    if (response && response.items) {
      const paths = response.items
        .map(x => x?.product?.slug)
        .filter(slug => slug !== undefined)
        .map(slug => ({ slug }));
      return paths;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching all products:", error);
  }
};

export const searchProducts = async ({ term, productSets, location, colors = [], pageLimit = 3, skip = 0, skipProducts = [] }) => {
  try {
    const baseFilters = {
      dataCollectionId: "locationFilteredVariant",
      includeReferencedItems: ["product"],
      ne: [
        { key: "hidden", value: true },
        { key: "isF1Exclusive", value: true }
      ],
      includeVariants: false,
      limit: pageLimit,
      skip: skip,
      sortOrder: "asc",
      sortKey: "_id",
      not: ["product", skipProducts]
    };

    if (location) baseFilters.hasSome = [{ key: "location", values: location }];
    if (colors.length > 0) baseFilters.hasSome = [{ key: "colors", values: colors }];
    if (productSets) {
      baseFilters.ne.push({
        key: "productSets",
        value: []
      });
      baseFilters.isNotEmpty = "productSets";
    };

    let items = [];

    const response = await getDataFetchFunction({
      ...baseFilters,
      startsWith: [{ key: "title", value: term }]
    });

    const data = response.items?.filter(item => typeof item.product !== "string") || [];
    items = items.concat(data);
    if (items.length >= pageLimit) return items;

    const fetchProducts = async ({ searchKey, limit, excludeIds = [], searchPrefix = " ", correctionEnabled = false, searchType = "and" }) => {
      const response = await getDataFetchFunction({
        ...baseFilters,
        search: [searchKey, term],
        limit,
        searchPrefix,
        ne: [...baseFilters.ne, ...excludeIds.map(id => ({ key: "product", value: id }))],
        correctionEnabled,
        searchType
      });
      return response.items?.filter(item => typeof item.product !== "string") || [];
    };

    // Define search strategies in order of preference
    const searchStrategies = [
      { searchKey: "title", searchPrefix: " ", correctionEnabled: false, searchType: "and" },
      { searchKey: "title", searchPrefix: "", correctionEnabled: false, searchType: "and" },
      { searchKey: "title", searchPrefix: " ", correctionEnabled: false, searchType: "or" },
      { searchKey: "title", searchPrefix: "", correctionEnabled: false, searchType: "or" },
      { searchKey: "title", searchPrefix: " ", correctionEnabled: true, searchType: "and" },
      { searchKey: "title", searchPrefix: "", correctionEnabled: true, searchType: "and" },
      { searchKey: "title", searchPrefix: " ", correctionEnabled: true, searchType: "or" },
      { searchKey: "title", searchPrefix: "", correctionEnabled: true, searchType: "or" },
      { searchKey: "search", searchPrefix: "", correctionEnabled: false, searchType: "and" },
      { searchKey: "search", searchPrefix: "", correctionEnabled: false, searchType: "or" }
    ];

    // Execute strategies in sequence until we have 3 items
    for (const strategy of searchStrategies) {
      if (items.length >= pageLimit) break;

      const excludeIds = items.map(({ product }) => product?._id);
      const newLimit = pageLimit - items.length;
      const newItems = await fetchProducts({
        ...strategy,
        limit: newLimit,
        excludeIds
      });

      items = items.concat(newItems);

      if (items.length >= pageLimit) break;
    }

    return items;
  } catch (error) {
    logError("Error searching products:", error);
    return [];
  }
};

export const getAllColorsData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "colorFilterCache",
      limit: "infinite",
      // log: true
    });

    if (response && response.items) {
      return response.items;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching colors:", error);
  }
};
export const getAllProductVariantsImages = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "BPSProductImages",
      increasedLimit: 700,
      limit: "infinite",
    });

    if (response && response.items) {
      return response.items;
    } else {
      throw new Error("Response does not contain _items", response);
    }
  } catch (error) {
    logError("Error fetching product variant images:", error);
    return [];
  }
};
export const getAllProductVariants = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "Stores/Variants",
      increasedLimit: 100,
      limit: "infinite",
    });
    if (response && response.items) {
      return response.items;
    } else {
      throw new Error("Response does not contain _items", response);
    }
  } catch (error) {
    logError("Error fetching product variants:", error);
    return [];
  }
};

export const getBestSellerProducts = async (bestSeller, limit) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "locationFilteredVariant",
      includeReferencedItems: ["product"],
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
      increasedLimit: 700,
      includeVariants: true,
      limit: "infinite",
    });
    if (response && response.items) {
      const products = response.items.map((x) => ({
        subCategoryData: [],
        ...x,
        ...x.subCategoryData && { subCategoryData: x.subCategoryData }
      }));

      if (limit) {
        return products.slice(0, limit);
      }
      return products;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching products by ids:", error);
    return [];
  }
};

export const fetchBestSellers = async (slug) => {
  try {
    const payload = {
      dataCollectionId: "BestSellers",
    };
    if (slug) {
      payload.hasSome = [
        {
          key: "slug",
          values: [slug],
        },
      ];
    }
    const response = await getDataFetchFunction(payload);
    if (response && response.items) {
      return response.items.map((x) => x.category);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching best seller ids:", error);
    return [];
  }
};

export const fetchProductAtthachmentTypes = async () => {
  try {
    const payload = {
      dataCollectionId: "ProductAttachmentTypes",
    };
    const response = await getDataFetchFunction(payload);
    if (response && response.items) {
      return response.items;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching product attachment types:", error);
    return [];
  }
};

export const fetchAllCategoriesCollections = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "Stores/Collections",
      increasedLimit: 100,
      limit: "infinite",
    });
    if (response && response.items) {
      const all = "00000000-000000-000000-000000000001";
      const categoriesData = response.items
        .map(x => ({
          ...x,
          slug: x._id === all ? "all" : x.slug,
          all: x._id === all
        }))
        .sort((a, b) => a._id === all ? -1 : 0);

      return categoriesData;

    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching all categories from Stores/Collections:", error);
    return [];
  }
};

export const fetchAllCategoriesData = async () => {
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
    if (response && response.items) {
      const categoriesData = response.items;
      const filteredData = categoriesData.filter(
        (x) => x._id !== undefined && x.parentCollection.slug !== "all-products"
      );
      return filteredData;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching all categories:", error);
    return [];
  }
};

export const getPairWithData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "BPSPairItWith",
      increasedLimit: 700,
      limit: "infinite",
    });

    if (response && response.items) {
      return response.items;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching products(getPairWithData):", error);
  }
};

export const getProductVariants = async (id) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "Stores/Variants",
      eq: [
        {
          key: "productId",
          value: id,
        },
      ],
    });

    if (response && response.items) {
      return response.items;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching product variants:", error);
    return [];
  }
};
export const getProductVariantsImages = async (id) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "BPSProductImages",
      eq: [
        {
          key: "productId",
          value: id,
        },
      ],
    });

    if (response && response.items) {
      return response.items;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching product snapshots:", error);
    return [];
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
      limit: "infinite",
    });
    if (response && response.items) {
      const categoriesData = response.items;
      const filteredData = categoriesData.filter(
        (x) => x.parentCollection.slug !== "all-products"
      );
      return filteredData;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching all categories:", error);
    return [];
  }
};

export const getSavedProductData = async (retries = 3, delay = 1000) => {
  const retryDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const authToken = await getAuthToken();
      if (!authToken) return [];

      const response = await fetch(`${baseUrl}/api/product/getSavedProducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
        cache: "no-store",
      });

      const data = await response.json();

      if (data && data.items) {
        return data.items;
      } else {
        throw new Error("Response does not contain _items", response);
      }
    } catch (error) {
      logError(`Error fetching saved products: Attempt ${attempt + 1} failed: ${error}`);

      if (attempt < retries) {
        logError(`Retrying in ${delay}ms...`);
        await retryDelay(delay);
        delay *= 2;
      } else {
        logError(`Attempt ${attempt} failed. No more retries left.`);
        return [];
      }
    }
  }
};

export const saveProduct = async (id) => {
  try {
    const authToken = await getAuthToken();

    const response = await fetch(`${baseUrl}/api/product/saveProduct/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    logError("Error saving product:", error);
    throw new Error(error);
  }
};

export const unSaveProduct = async (id) => {
  try {
    const authToken = await getAuthToken();
    const response = await fetch(
      `${baseUrl}/api/product/removeSavedProduct/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    logError("Error removing product:", error);
    throw new Error(error);
  }
};

export const getCatalogIdBySku = async (productSku) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "Stores/Variants",
      eq: [
        {
          key: "sku",
          value: productSku,
        },
      ],
    });

    if (response && response.items) {
      return response.items[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching product variants:", error);
    return [];
  }
};

export const getVariantBySku = async (sku) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "Stores/Variants",
      hasSome: [
        {
          key: "sku",
          values: sku,
        },
      ],
    });

    if (response && response.items) {
      return response.items[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching product variants:", error);
  }
};

export const getCartPricingTiersData = async (product) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "locationFilteredVariant",
      hasSome: [{ key: "product", values: product }],
    });

    if (!response?.items) {
      throw new Error("Response does not contain _items");
    }

    return response.items.map((data) => ({
      _id: data.product,
      pricingTiers: Array.isArray(data?.pricingTiers) ? data.pricingTiers : [],
    }));
  } catch (error) {
    logError("Error fetching products pricing tiers data:", error);
    return [];
  }
};