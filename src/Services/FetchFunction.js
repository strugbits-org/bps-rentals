import { createWixClientApiStrategy } from "@/Utils/CreateWixClient";
import { getAllProductVariants, getAllProductVariantsImages } from "./ProductsApis";
import { encryptField, encryptPriceFields } from "@/Utils/Encrypt";
import logError from "@/Utils/ServerActions";

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
        console.log(`Retrying in ${delayMs}ms...`);
        await delay(delayMs);
      } else {
        logError(`Attempt ${attempt} failed. No more retries left.`);
        throw error;
      }
    }
  }
}

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
      log
    } = payload;

    // Create Wix client
    const client = await createWixClientApiStrategy();

    // Set up query options
    let dataQuery = client.items.queryDataItems({
      dataCollectionId,
      includeReferencedItems,
      returnTotalCount: returnTotalCount || limit === "infinite",
    });

    // Apply filters
    if (contains?.length === 2) dataQuery = dataQuery.contains(contains[0], contains[1]);
    if (eq && eq.length > 0) eq.forEach(filter => dataQuery = dataQuery.eq(filter.key, filter.value));
    if (hasSome && hasSome.length > 0) hasSome.forEach(filter => dataQuery = dataQuery.hasSome(filter.key, filter.values));
    if (skip) dataQuery = dataQuery.skip(skip);
    if (isNotEmpty) dataQuery = dataQuery.isNotEmpty(isNotEmpty);
    if (limit && limit !== "infinite") dataQuery = dataQuery.limit(limit);
    if (ne && ne.length > 0) ne.forEach(filter => dataQuery = dataQuery.ne(filter.key, filter.value));
    if (sortKey) dataQuery = sortOrder === "asc" ? dataQuery.ascending(sortKey) : sortOrder === "desc" ? dataQuery.descending(sortKey) : dataQuery.ascending(sortKey);

    // Increase limit if "infinite"
    if (limit === "infinite") {
      dataQuery = dataQuery.limit(increasedLimit || 50);
    }

    // Fetch data with retries
    let data = await retryAsyncOperation(() => dataQuery.find());

    // Handle "infinite" limit scenario
    if (limit === "infinite") {
      let items = data._items;
      while (items.length < data._totalCount) {
        data = await retryAsyncOperation(() => data._fetchNextPage());
        items = [...items, ...data._items];
      }
      data._items = items;
    }

    if (!encodePrice && !includeVariants) return data;

    // Include variants if needed
    if (includeVariants) {
      const [productsVariantImagesData, productsVariantsData] = await Promise.all([
        getAllProductVariantsImages(),
        getAllProductVariants()
      ]);

      data._items = data._items.map((product) => {
        if (!product.data._id) return;
        const productId = product.data.product._id;
        product.data.productSnapshotData = productsVariantImagesData.filter(x => x.productId === productId);
        product.data.productVariantsData = productsVariantsData.filter(x => x.productId === productId);
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
    ];
    // Encrypt specific fields if needed
    const collectionsToEncrypt = ["Stores/Products", "DemoProductData", "RentalsNewArrivals", "DemoProductData"];
    if (data._items.length > 0 && collectionsToEncrypt.includes(dataCollectionId) && encodePrice) {
      data._items = data._items.map(val => {
        if (dataCollectionId === "DemoProductData" && val.data?.productSets?.length) {
          val.data.productSets = val.data.productSets.map(set => {
            set.price = encryptField(set.price);
            return set;
          });
        }
        if (dataCollectionId === "DemoProductData" && val.data.variantData) {
          val.data.variantData = val.data.variantData.map(val2 => {
            encryptPriceFields(val2.variant, fieldsToEncrypt);
            return val2;
          });
        }
        encryptPriceFields(val.data.product, fieldsToEncrypt);
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