"use server";
import getDataFetchFunction from "./FetchFunction";
import { getAuthToken } from "./GetAuthToken";
const baseUrl = process.env.BASE_URL;

export const getAllProducts = async ({ category, searchTerm }) => {
  try {
    const payload = {
      dataCollectionId: "locationFilteredVariant",
      includeReferencedItems: ["product", "subCategory"],
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
      includeVariants: true,
      includeBestSellers: true,
      limit: "infinite",
      // limit: 50,
      // log:true
    };

    const response = await getDataFetchFunction(payload);
    if (response && response._items) {
      const products = response._items.map((x) => x.data);
      if (!category && !searchTerm) {
        return products;
      } else if (!category && searchTerm) {
        const filteredProducts = products.filter(product => {
          const matchedTerm = searchTerm === "" || (product.search && product.search.toLowerCase().includes(searchTerm));
          return matchedTerm;
        });
        return filteredProducts;
      }
      const filteredProducts = products.filter((product) =>
        product.subCategory.some((x) => x._id === category)
      );
      return filteredProducts;
    } else {
      throw new Error("Response does not contain _items", response);
    }
  } catch (error) {
    console.error("Error fetching products:", error);
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
    console.error("Error fetching colors:", error);
  }
};
export const getAllProductVariantsImages = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "BPSProductImages",
      increasedLimit: 1000,
      limit: "infinite",
    });

    if (response && response._items) {
      return response._items.map((x) => x.data);
    } else {
      throw new Error("Response does not contain _items", response);
    }
  } catch (error) {
    console.error("Error fetching product variant images:", error);
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
    console.error("Error fetching product variants:", error);
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
      increasedLimit: 1000,
      includeVariants: true,
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
    };
    if (slug) {
      payload.hasSome = [
        {
          key: "slug",
          values: [`/${slug}`],
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
        "f1Collection",
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
    });
    if (response && response._items) {
      return response._items.map((x) => x.data);
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
    console.error("Error fetching all categories:", error);
    return [];
  }
};
export const getSelectedColorsData = async (categoryId) => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "colorFilterCache",
      limit: "infinite",
    });

    if (response && response._items) {
      return categoryId
        ? response._items
          .map((x) => x.data)
          .find((x) => x.category === categoryId)
        : response._items.map((x) => x.data);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching colors:", error);
  }
};

export const fetchAllProductsPaths = async () => {
  try {
    const payload = {
      dataCollectionId: "locationFilteredVariant",
      includeReferencedItems: ["product"],
      limit: "infinite",
      increasedLimit: 1000,
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
      return response._items.map((x) => ({ slug: x.data.product.slug }));
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
export const getPairWithData = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "BPSPairItWith",
      increasedLimit: 1000,
      limit: "infinite",
    });

    if (response && response._items) {
      return response._items.map((x) => x.data);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.error("Error fetching products(getPairWithData):", error);
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
export const getSavedProductData = async () => {
  try {
    const authToken = await getAuthToken();
    const response = await fetch(`${baseUrl}/api/wix/getSavedProducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();

    if (data && data._items) {
      return data._items.map((x) => x.data);
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    console.log("Error:", error);

    return [];
  }
};

export const saveProduct = async (id) => {
  try {
    const authToken = await getAuthToken();

    const response = await fetch(`${baseUrl}/api/wix/saveProduct/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    });
    // const jsonResponse = await response.json();
    // if (jsonResponse.error) {
    //   throw new Error(jsonResponse.error);
    // }
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const unSaveProduct = async (id) => {
  try {
    const authToken = await getAuthToken();
    const response = await fetch(
      `${baseUrl}/api/wix/removeSavedProduct/${id}`,
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
    throw new Error(error);
  }
};
