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

export const filterItemsBySchedule = (items) => {
  const now = new Date();
  return items.filter((banner) => {
    if (!banner.scheduled) return true;
    const startDate = banner.visibilityStartDate ? new Date(banner.visibilityStartDate.$date) : null;
    const endDate = banner.visibilityEndDate ? new Date(banner.visibilityEndDate.$date) : null;

    return (
      (!startDate || now >= startDate) &&
      (!endDate || now <= endDate)
    );
  });
};

const filterDefaultBanner = (banners) => {
  const defaultBanners = [];
  const regularBanners = [];

  for (const banner of banners) {
    (banner.default ? defaultBanners : regularBanners).push(banner);
  }

  return regularBanners.length ? regularBanners : defaultBanners;
};

export const scoreBasedBanners = ({ bannersData, currentCategory, random = 9 }) => {
  const slug = "link-copy-of-category-name-2";

  // Create an array for the final placement of banners
  const activeBanners = filterItemsBySchedule(bannersData);
  const filteredBanners = filterDefaultBanner(activeBanners);
  const finalBannersArray = Array(filteredBanners.length).fill(null);

  // Separate banners into fixed and dynamic
  const dynamicBanners = [];

  filteredBanners.forEach((banner) => {
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
    if (title && title !== "isProductSet" && title !== "productSetId" && title !== "productPrice") {
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
    'productPrice'
  ];
  if (data.length > 0) {
    data = data.map(val => {
      if (val.data?.productSets?.length) {
        val.data.productSets = val.data.productSets.map(set => {
          set.price = decryptField(set.price);
          if (set.productPrice) {
            set.productPrice = decryptField(set.productPrice);
          }
          return set;
        });
      }
      if (val.data.pricingTiers?.length) {
        val.data.pricingTiers.forEach(val2 => {
          decryptPriceFields(val2, fieldsToDecrypt);
        })
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

export const formatPrice = (price, quantity) => {
  const currencySymbol = price.formattedAmount.charAt(0);
  const totalPrice = price.amount * quantity;
  const formattedPrice = totalPrice.toFixed(2);
  return `${currencySymbol}${formattedPrice}`;
}

const normalizedPrice = (price, quantity, priceDifference) => {
  const cleaned = price && decryptField(price)?.replace(/[^0-9.-]+/g, "");
  const priceValue = Number(cleaned) + (priceDifference || 0);
  return quantity ? priceValue * quantity : priceValue;
};

export const findPriceTier = ({ price, variantPrice, pricingTiers = [], tier, quantity, isRawPrice = false }) => {
  const formatPriceValue = price => isRawPrice ? price : "$ " + price.toFixed(2);
  try {
    const priceValue = normalizedPrice(price);
    const variantPriceValue = normalizedPrice(variantPrice);
    const priceDifference = Number(variantPriceValue) - Number(priceValue);

    const hasTiers = tier && pricingTiers.length > 0;

    if (hasTiers) {
      const priceData = pricingTiers.find(({ name }) => name === tier);
      if (priceData) {
        const finalPrice = normalizedPrice(priceData.price, quantity, priceDifference);
        return formatPriceValue(finalPrice);
      }
    } else {
      throw new Error("No pricing tiers available");
    }
  } catch (_) {
    // Silent fail
  }

  const fallbackPrice = normalizedPrice(variantPrice, quantity);
  return formatPriceValue(fallbackPrice);
};

export const sanitizeProducts = (products) => products.map(sanitizeProduct);

const sanitizeObject = (obj, keysToRemove) => {
  if (!obj || typeof obj !== 'object') return obj;
  const sanitized = { ...obj };
  keysToRemove.forEach((key) => delete sanitized[key]);
  return sanitized;
};

export const sanitizeProduct = (product) => {
  const keysToRemove = ['defaultVariant', 'isF1', 'isF1Exclusive', 'category', 'syncColor', '_owner'];
  const sanitizedProduct = sanitizeObject(product, keysToRemove);

  if (sanitizedProduct.product) {
    const nestedKeysToRemove = [
      'brand', 'collections', 'currency', 'discount', 'discountedPrice',
      'formattedDiscountedPrice', 'inStock', 'inventoryItem', 'manageVariants',
      'numericId', 'productType', 'quantityInStock', 'ribbon', 'ribbons',
      'seoData', 'trackInventory', 'productOptions', 'link-products-slug', 'productPageUrl', 'pricePerUnitData'
    ];
    sanitizedProduct.product = sanitizeObject(sanitizedProduct.product, nestedKeysToRemove);
  }

  return sanitizedProduct;
};

export const attachVariantsAndSnapshots = (data, productSnapshotData, productVariantsData) => {
  const updatedData = data.map((product) => {
    if (!product._id) return;
    const productId = product.product._id;
    product.productSnapshotData = productSnapshotData.filter(x => x.productId === productId);
    product.productVariantsData = productVariantsData.filter(x => x.productId === productId);
    return product;
  });

  return updatedData;
};