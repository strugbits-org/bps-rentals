import { createWixClientApiStrategy } from "@/Utils/CreateWixClient";
import { getAllProductVariants, getAllProductVariantsImages } from "./ProductsApis";
import { encryptField, encryptPriceFields } from "@/Utils/Encrypt";
import logError from "@/Utils/ServerActions";
import Fuse from 'fuse.js'

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retryAsyncOperation(operation, retries = 3, delayMs = 1000) {
  let attempt = 0;
  while (attempt < retries) {
    try {
      return await operation();
    } catch (error) {
      logError(`Error fetching query data items: Attempt ${attempt} failed: ${error}`);
      attempt++;
      if (attempt < retries) {
        logError(`Retrying in ${delayMs}ms...`);
        await delay(delayMs);
      } else {
        logError(`Attempt ${attempt} failed. No more retries left.`);
        throw error;
      }
    }
  }
}

const correctSearchTerm = async (searchTerm, keywords) => {
  const fuse = new Fuse(keywords, { threshold: 0.4 });
  const result = fuse.search(searchTerm);
  return result.length ? result[0].item : searchTerm;
};

const getDataFetchFunction = async (payload) => {
  try {
    const {
      dataCollectionId,
      includeReferencedItems,
      returnTotalCount,
      contains,
      limit,
      eq,
      ne,
      hasSome,
      skip,
      includeVariants,
      increasedLimit,
      encodePrice = true,
      sortOrder,
      sortKey,
      isNotEmpty,
      startsWith,
      search,
      searchPrefix,
      correctionEnabled,
      searchType,
      not,
      log
    } = payload;

    // Create Wix client
    const client = await createWixClientApiStrategy();

    // Set up query options
    const options = { returnTotalCount };
    let dataQuery = client.items.query(dataCollectionId);
    if (includeReferencedItems && includeReferencedItems.length > 0) includeReferencedItems.forEach(x => dataQuery = dataQuery.include(x));

    // Apply filters
    if (not?.length === 2 && not[1]?.length > 0) {
      dataQuery = dataQuery.not(client.items.filter().hasSome(not[0], not[1]));
    }

    if (contains?.length === 2) dataQuery = dataQuery.contains(contains[0], contains[1]);
    if (eq && eq.length > 0) eq.forEach(filter => dataQuery = dataQuery.eq(filter.key, filter.value));
    if (hasSome && hasSome.length > 0) hasSome.forEach(filter => dataQuery = dataQuery.hasSome(filter.key, filter.values));
    if (startsWith && startsWith.length > 0) startsWith.forEach(filter => dataQuery = dataQuery.startsWith(filter.key, filter.value));
    if (skip) dataQuery = dataQuery.skip(skip);
    if (isNotEmpty) dataQuery = dataQuery.isNotEmpty(isNotEmpty);
    if (limit && limit !== "infinite") dataQuery = dataQuery.limit(limit);
    if (ne && ne.length > 0) ne.forEach(filter => dataQuery = dataQuery.ne(filter.key, filter.value));
    if (sortKey) dataQuery = sortOrder === "asc" ? dataQuery.ascending(sortKey) : sortOrder === "desc" ? dataQuery.descending(sortKey) : dataQuery.ascending(sortKey);

    if (search?.length === 2) {
      let words = search[1].split(/\s+/).filter(Boolean);
      if (correctionEnabled) {
        const productKeywordsData = await getDataFetchFunction({ "dataCollectionId": "ProductKeywords" });
        const productKeywords = productKeywordsData.items[0]?.keywords || [];
        words = await Promise.all(words.map(word => correctSearchTerm(word, productKeywords)));
      }
      let newQuery = words.slice(1).reduce((query, word) =>
        query.contains(search[0], searchPrefix ? searchPrefix + word : word || ""),
        dataQuery
      );

      dataQuery = dataQuery.contains(search[0], searchPrefix ? searchPrefix + words[0] : words[0] || "");
      if (words.length > 1) {
        dataQuery = searchType === "or" ? dataQuery.or(newQuery) : dataQuery.and(newQuery);
      }
    };

    // Increase limit if "infinite"
    if (limit === "infinite") {
      dataQuery = dataQuery.limit(increasedLimit || 50);
    }

    // Fetch data with retries
    let data = await retryAsyncOperation(() => dataQuery.find(options));

    // Handle "infinite" limit scenario
    if (limit === "infinite") {
      let items = data.items;
      while (data.hasNext()) {
        data = await retryAsyncOperation(() => data.next());
        items = [...items, ...data.items];
      }
      data.items = items;
    }

    if (!encodePrice && !includeVariants) return data;

    // Include variants if needed
    if (includeVariants) {
      const [productsVariantImagesData, productsVariantsData] = await Promise.all([
        getAllProductVariantsImages(),
        getAllProductVariants()
      ]);

      data.items = data.items.map((product) => {
        if (!product._id) return;
        const productId = product.product._id;
        product.productSnapshotData = productsVariantImagesData.filter(x => x.productId === productId);
        product.productVariantsData = productsVariantsData.filter(x => x.productId === productId);
        return product;
      });
    }

    const fieldsToEncrypt = [
      'formattedDiscountedPrice',
      'pricePerUnitData',
      'pricePerUnit',
      'formattedPricePerUnit',
      'formattedPrice',
      'price',
      'discountedPrice',
      'productPrice'
    ];

    // Encrypt specific fields if required (ensure these fields are also handled in the decryption logic, particularly in the product sorting API where the collection is being updated)
    const collectionsToEncrypt = ["Stores/Products", "locationFilteredVariant", "RentalsNewArrivals"];
    if (data.items.length > 0 && collectionsToEncrypt.includes(dataCollectionId) && encodePrice) {
      data.items = data.items.map(val => {
        if (dataCollectionId === "locationFilteredVariant") {
          if (val?.productSets?.length) {
            val.productSets = val.productSets.map(set => {
              set.price = encryptField(set.price);
              set.productPrice = encryptField(set.productPrice);
              if (set.pricingTiers?.length) {
                set.pricingTiers.forEach(val2 => {
                  encryptPriceFields(val2, fieldsToEncrypt);
                })
              }

              return set;
            });
          }
          if (val.variantData) {
            val.variantData = val.variantData.map(val2 => {
              encryptPriceFields(val2.variant, fieldsToEncrypt);
              return val2;
            });
          }
          if (val.pricingTiers) {
            val.pricingTiers.forEach(val2 => {
              encryptPriceFields(val2, fieldsToEncrypt);
            })
          }
        }
        if (val?.product) {
          encryptPriceFields(val.product, fieldsToEncrypt, { useConsistentIV: true });
        }
        return val;
      });
    }

    return data;

  } catch (error) {
    logError("Error in queryDataItems:", payload.dataCollectionId, error);
    return { error: error.message, status: 500 };
  }
};

export default getDataFetchFunction;