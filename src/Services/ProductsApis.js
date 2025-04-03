"use server";
import logError from "@/Utils/ServerActions";
import getDataFetchFunction from "./FetchFunction";
import { getAuthToken } from "./GetAuthToken";
import { sanitizeProduct } from "@/Utils/Utils";
const baseUrl = process.env.BASE_URL;

export const getProductsKeywords = async () => {
  try {
    const productKeywordsData = await getDataFetchFunction({ "dataCollectionId": "ProductKeywords" });
    const keywords = productKeywordsData._items[0]?.data?.keywords || [];
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
    if (adminPage) return response._items;

    if (!response || !response._items) {
      throw new Error("Response does not contain _items", response);
    }

    const products = response._items.map((x) => {
      const baseProduct = {
        subCategoryData: [],
        ...x.data,
        ...(x.data.subCategoryData && { subCategoryData: x.data.subCategoryData }),
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

    if (!response || !response._items) {
      throw new Error("Response does not contain _items", response);
    }
    return response._items;

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
    if (response && response._items) {
      return response._items.map((x) => x.data.subCategoryData ? x.data : { subCategoryData: [], ...x.data });
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
    if (response && response._items) {
      return response._items.find((x) => (x.data.product.slug === slug));
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
    if (response && response._items) {
      const paths = response._items
        .map(x => x.data?.product?.slug)
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

export const searchProducts = async (term, location) => {
  try {
    const isFullSearch = !location;
    const pageLimit = isFullSearch ? 1000 : 3;

    const baseFilters = {
      dataCollectionId: "locationFilteredVariant",
      includeReferencedItems: ["product"],
      ne: [
        { key: "hidden", value: true },
        { key: "isF1Exclusive", value: true }
      ],
      includeVariants: isFullSearch ? true : false,
      limit: pageLimit,
      sortOrder: "asc",
      sortKey: "_id"
    };

    if (location) baseFilters.hasSome = [{ key: "location", values: location }];

    let items = [];

    const response = await getDataFetchFunction({
      ...baseFilters,
      startsWith: [{ key: "title", value: term }]
    });

    const data = response._items?.filter(item => typeof item.data.product !== "string").map(item => item.data) || [];
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
      return response._items?.filter(item => typeof item.data.product !== "string").map(item => item.data) || [];
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

    if (response && response._items) {
      return response._items.map((x) => x.data);
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

    if (response && response._items) {
      return response._items.map((x) => x.data);
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
    if (response && response._items) {
      return response._items.map((x) => x.data);
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
    if (response && response._items) {
      const products = response._items.map((x) => ({
        subCategoryData: [],
        ...x.data,
        ...x.data.subCategoryData && { subCategoryData: x.data.subCategoryData }
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
    if (response && response._items) {
      return response._items.map((x) => x.data.category);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching best seller ids:", error);
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
    if (response && response._items) {
      const all = "00000000-000000-000000-000000000001";
      const categoriesData = response._items
        .map(x => ({
          ...x.data,
          slug: x.data._id === all ? "all" : x.data.slug,
          all: x.data._id === all
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
    if (response && response._items) {
      const categoriesData = response._items.map((x) => x.data);
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

    if (response && response._items) {
      return response._items.map((x) => x.data);
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
    logError("Error fetching product variants:", error);
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

      if (data && data._items) {
        return data._items.map((x) => x.data);
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
      returnTotalCount: null,
      contains: null,
      limit: null,
      hasSome: null,
      ne: null,
      eq: [
        {
          key: "sku",
          value: productSku,
        },
      ],
      skip: null,
    });

    if (response && response._items) {
      return response._items[0].data;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching product variants:", error);
    return [];
  }
};

export const getCartPricingTiersData = async (product) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "locationFilteredVariant",
      hasSome: [{ key: "product", values: product }],
    });

    if (!response?._items) {
      throw new Error("Response does not contain _items");
    }

    return response._items.map(({ data }) => ({
      _id: data.product,
      pricingTiers: Array.isArray(data?.pricingTiers) ? data.pricingTiers : [],
    }));
  } catch (error) {
    logError("Error fetching products pricing tiers data:", error);
    return [];
  }
};