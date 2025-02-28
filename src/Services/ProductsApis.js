"use server";
import logError from "@/Utils/ServerActions";
import getDataFetchFunction from "./FetchFunction";
import { getAuthToken } from "./GetAuthToken";
import Fuse from "fuse.js";
const baseUrl = process.env.BASE_URL;

const correctSearchTerm = async (searchTerm) => {
  const productKeywordsData = await getDataFetchFunction({ "dataCollectionId": "ProductKeywords" });
  const keywords = productKeywordsData._items[0]?.data?.keywords || [];

  const fuse = new Fuse(keywords, { threshold: 0.4 });
  const result = fuse.search(searchTerm);
  return result.length ? result[0].item : searchTerm;
};

const searchProductsData = async (searchTerm, products) => {
  if (!searchTerm || !products?.length) return [];

  const phraseMatchRegex = new RegExp(`\\b${searchTerm.trim().toLowerCase()}\\b`, "i");
  const words = searchTerm.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const exactMatchRegex = new RegExp(`\\b(${words.join("|")})\\b`, "i");
  const containsRegex = new RegExp(words.map(word => `(?=.*${word})`).join(""), "i");
  
  const correctedWords = await Promise.all(words.map(correctSearchTerm));
  const exactMatchRegexCorrected = new RegExp(`\\b(${correctedWords.join("|")})\\b`, "i");

  const phraseMatches = [];
  const exactMatches = [];
  const containsMatches = [];
  const containsMatchesCorrected = [];
  const fullSearchMatches = [];

  for (const product of products) {
    if (!product.search || !product.title) continue;
    
    const searchField = product.search.toLowerCase();
    const titleField = product.title.toLowerCase();

    switch (true) {
      case phraseMatchRegex.test(titleField): 
        phraseMatches.push(product);
        break;
      case exactMatchRegex.test(titleField): 
        exactMatches.push(product);
        break;
      case containsRegex.test(titleField): 
        containsMatches.push(product);
        break;
      case exactMatchRegexCorrected.test(titleField): 
        containsMatchesCorrected.push(product);
        break;
      case containsRegex.test(searchField): 
        fullSearchMatches.push(product);
        break;
    }
  }

  return [...phraseMatches, ...exactMatches, ...containsMatches, ...containsMatchesCorrected, ...fullSearchMatches];
};

export const getAllProducts = async ({ categories = [], searchTerm, adminPage = false }) => {
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
      includeVariants: adminPage ? false : true,
      limit: "infinite",
      increasedLimit: 700,
    };

    const response = await getDataFetchFunction(payload);
    if (adminPage) return response._items;

    if (!response || !response._items) {
      throw new Error("Response does not contain _items", response);
    }

    const products = response._items.map((x) => ({
      subCategoryData: [],
      ...x.data,
      ...x.data.subCategoryData && { subCategoryData: x.data.subCategoryData }
    }));

    if (categories.length === 0 && !searchTerm) {
      return products;
    }

    if (categories.length === 0 && searchTerm) {
      const term = searchTerm.trim().toLowerCase();
      if (!term) return products;

      return searchProductsData(term, products);
    }

    return products.filter(product =>
      product.subCategoryData.some(x => categories.includes(x._id))
    );
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
    const baseFilters = {
      dataCollectionId: "locationFilteredVariant",
      includeReferencedItems: ["product"],
      ne: [
        { key: "hidden", value: true },
        { key: "isF1Exclusive", value: true }
      ],
      hasSome: [{ key: "location", values: location }],
      includeVariants: false,
      limit: 3,
    };

    const fetchProducts = async (searchKey, limit, excludeIds = [], searchPrefix = " ", correctionEnabled = null) => {
      const response = await getDataFetchFunction({
        ...baseFilters,
        search: [searchKey, term],
        limit,
        searchPrefix,
        ne: [...baseFilters.ne, ...excludeIds.map(id => ({ key: "product", value: id }))],
        correctionEnabled
      });
      return response._items?.filter(item => typeof item.data.product !== "string").map(item => item.data) || [];
    };

    let items = await fetchProducts("title", 3);
    if (items.length === 3) return items;

    let excludeIds = items.map(({ product }) => product?._id);
    items = items.concat(await fetchProducts("title", 3 - items.length, excludeIds, ""));
    if (items.length === 3) return items;

    excludeIds = items.map(({ product }) => product?._id);
    items = items.concat(await fetchProducts("title", 3 - items.length, excludeIds, "", "correctionEnabled"));
    if (items.length === 3) return items;

    excludeIds = items.map(({ product }) => product?._id);
    items = items.concat(await fetchProducts("search", 3 - items.length, excludeIds, ""));
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