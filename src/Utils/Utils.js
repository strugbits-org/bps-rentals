import { decryptField, decryptPriceFields, encryptField } from "./Encrypt";
import logError from "./ServerActions";

export const parseArrayFromParams = (queryParams) => {
  if (queryParams) {
    try {
      return JSON.parse(queryParams);
    } catch (error) {
      logError('Error parsing JSON from query params:', error);
      return [];
    }
  }
  return [];
};

export const extractUniqueColors = (data) => {
  let allColors = [];
  data.forEach(item => {
    allColors = allColors.concat(item.colors);
  });
  const uniqueColors = [...new Set(allColors)];
  return uniqueColors;
}

export const findColor = (data) => {
  return data.filter((x) => x.colorInfo !== undefined).map((x) => x.colorInfo.original)
}

export const findLocation = (data) => {
  return data
    .filter((x) => x.plainText !== undefined)
    .map((x) => x.plainText.original);
};

export const formatPrice = (price, quantity) => {
  const currencySymbol = price.formattedAmount.charAt(0);
  const totalPrice = price.amount * quantity;
  const formattedPrice = totalPrice.toFixed(2);
  return `${currencySymbol}${formattedPrice}`;
}

export const formatPriceEncrypted = (price, quantity) => {
  const currencySymbol = decryptField(price.formattedAmount).charAt(0);
  const totalPrice = decryptField(price.amount) * quantity;
  const formattedPrice = totalPrice.toFixed(2);
  return `${currencySymbol}${formattedPrice}`;
}

export const extractSlugFromUrl = (url) => {
  const regex = /\/([^\/]+)\/?$/;
  const match = regex.exec(url);
  if (match) {
    return match[0];
  }
  return "";
}

export const calculateTotalCartQuantity = (lineItems) => {
  return lineItems
    .filter(item => !item?.catalogReference?.options.customTextFields.isProductSet)
    .reduce((total, currentItem) => total + currentItem.quantity, 0);
}

export const setCookie = (key, value) => {
  document.cookie = key + "=" + value + ";";
}

export const findCategoryData = (data, slug) => (data.find(x => x.parentCollection['link-copy-of-category-name-2'] === slug) || data.find((item) => item.level2Collections.some((x) => x['link-copy-of-category-name-2'] === slug))?.level2Collections.find((x) => x['link-copy-of-category-name-2'] === slug));

export const getSlug = (url) => url.match(/\/category\/(.+)/)[1];

export const getAllCategoriesPaths = (categoriesData) => {

  const paths = categoriesData.flatMap(category => {
    const parentCategory = category.parentCollection["link-copy-of-category-name-2"]
      ? [getSlug(category.parentCollection["link-copy-of-category-name-2"])]
      : [];

    const subcategories = category.level2Collections.flatMap(subcategory =>
      subcategory["link-copy-of-category-name-2"]
        ? [getSlug(subcategory["link-copy-of-category-name-2"])]
        : []
    );

    return [...parentCategory, ...subcategories];
  });
  return paths;
}

export const hasMatchingColor = (colorsArray, variantColors) => {
  const labels = colorsArray.map(item => item.label);
  return variantColors.some(item => labels.includes(item));
};

export const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const scoreBasedBanners = ({ bannersData, currentCategory, random = 9 }) => {
  const slug = "link-copy-of-category-name-2";

  // Create an array for the final placement of banners
  const finalBannersArray = Array(bannersData.length).fill(null);

  // Separate banners into fixed and dynamic
  const dynamicBanners = [];

  bannersData.forEach((banner) => {
    const { categories = [], desiredPosition, priority = 0 } = banner;

    // Check if the banner matches the current category
    const isCategoryMatch = categories.some(
      (category) => category?.[slug] === currentCategory
    );

    if (isCategoryMatch && desiredPosition !== undefined) {
      // Adjust desiredPosition (1-based) to 0-based index
      const index = desiredPosition - 1;

      // Ensure the desired position is within bounds
      if (index >= 0 && index < finalBannersArray.length) {
        finalBannersArray[index] = { ...banner };
      }
    } else {
      // Add dynamic banners for later placement
      const categoryMatchScore = isCategoryMatch ? 10 : 0;
      const randomScore = Math.random() * random;
      const dynamicScore = categoryMatchScore + priority + randomScore;
      dynamicBanners.push({ ...banner, score: dynamicScore });
    }
  });

  // Sort dynamic banners by their score
  dynamicBanners.sort((a, b) => b.score - a.score);

  // Fill empty slots in the final array with dynamic banners
  let dynamicIndex = 0;
  for (let i = 0; i < finalBannersArray.length; i++) {
    if (!finalBannersArray[i] && dynamicIndex < dynamicBanners.length) {
      finalBannersArray[i] = dynamicBanners[dynamicIndex++];
    }
  }
  return finalBannersArray;
}

export const compareArray = (arr1, arr2) => {
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  for (let item of set1) {
    if (set2.has(item)) {
      return true;
    }
  }

  return false;
}

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  });
};

export const filterSearchData = (collection, selectedStudios, selectedMarkets) => {
  let data = collection;
  if (selectedStudios.length > 0 && selectedMarkets.length > 0) {
    data = data.filter(item =>
      item.studios.some(studio => selectedStudios.includes(studio._id)) ||
      item.markets.some(market => selectedMarkets.includes(market._id))
    );
  } else if (selectedStudios.length > 0) {
    data = data.filter(item =>
      item.studios.some(studio => selectedStudios.includes(studio._id))
    );
  } else if (selectedMarkets.length > 0) {
    data = data.filter(item =>
      item.markets.some(market => selectedMarkets.includes(market._id))
    );
  }
  return data;
}

export const locations = {
  SF: "San Francisco",
  LV: "Las Vegas",
  NT: "National",
};

export const formatCustomDate = (dateString) => {
  if (dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "2-digit" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    const day = date.getDate();
    const dayWithSuffix = `${day < 10 ? "0" : ""}${day}h`;

    return formattedDate.replace(/\d{2}/, dayWithSuffix);
  }
};

export const quoteDateFormatter = (date) => {
  if (typeof date === "string") {
    return new Date(date).toISOString().split("T")[0];
  } else if (date && date.$date) {
    return new Date(date.$date).toISOString().split("T")[0];
  }
  return "";
};

export const extractCategoryIds = (selectedCategoryData) => {
  if (selectedCategoryData.level2Collections) {
    const parentCollectionId = selectedCategoryData.parentCollection._id;
    const level2CollectionIds = selectedCategoryData.level2Collections
      .filter(collection => typeof collection === 'object')
      .map(collection => collection._id);

    return [parentCollectionId, ...level2CollectionIds];
  } else {
    return [selectedCategoryData._id];
  }
}

export const formatDescriptionLines = (items) => {
  return items.reduce((acc, item) => {
    const title = item.name?.translated || item.name?.original;
    if (title && title !== "isProductSet" && title !== "productSetId") {
      const value = item.colorInfo?.translated || item.colorInfo?.original || item.plainText?.translated || item.plainText?.original || item.colorInfo?.code;
      acc.push({ title, value });
    }
    return acc;
  }, []);
}

export const removeHTMLTags = (html) => {
  return html.replace(/<[^>]*>/g, '');
}

export const buildMetadata = (title, description, noFollowTag) => {

  const metadata = { title };
  if (description) metadata.description = description;

  if (process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION" && noFollowTag) {
    metadata.robots = "noindex,nofollow";
  }

  return metadata;
}

export const chunkArray = (array, chunkSize) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
};

export const decryptProductPrices = (data) => {
  const fieldsToDecrypt = [
    'formattedDiscountedPrice',
    'pricePerUnitData',
    'pricePerUnit',
    'formattedPricePerUnit',
    'formattedPrice',
    'price',
    'discountedPrice',
  ];
  if (data.length > 0) {
    data = data.map(val => {
      if (val.data?.productSets?.length) {
        val.data.productSets = val.data.productSets.map(set => {
          set.price = encryptField(set.price);
          return set;
        });
      }
      if (val.data.variantData) {
        val.data.variantData = val.data.variantData.map(val2 => {
          decryptPriceFields(val2.variant, fieldsToDecrypt);
          return val2;
        });
      }
      decryptPriceFields(val.data.product, fieldsToDecrypt);
      return val;
    });
  }
}
export const findPriceForTier = (fullProductData, tier) => {
  try {
    if (
      fullProductData &&
      fullProductData.pricingTiers &&
      Array.isArray(fullProductData.pricingTiers) &&
      tier
    ) {
      const priceData = fullProductData.pricingTiers.find(
        (tierItem) => tierItem.name === tier
      );

      if (priceData?.formattedPrice) {
        return decryptField(priceData.formattedPrice);
      }
    }
  } catch (error) {
    // console.error("Error fetching price:", error);
  }

  return decryptField(fullProductData?.product?.formattedPrice);
};
