import { createWixClient } from "@/Utils/CreateWixClient";
import { apiAuth } from "@/Utils/IsAuthenticated";
import { unstable_cache } from 'next/cache';
import { fetchBestSellers, getAllProductVariants, getAllProductVariantsImages, getBestSellerProducts } from "./ProductsApis";

// Query data items from Wix data collections
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
      includeBestSellers,
      increasedLimit,
      log
    } = payload;

    // Options for the query
    const options = {};

    // List of collections requiring authentication
    const authCollections = [
      "SearchSectionDetails",
      "RentalsBanners",
      "RentalsHomeHero",
      "RentalsNewArrivals",
      "BestSellers",
      "RentalsHomeStudios",
      "RentalsHomeHotTrends",
      "HighlightsProducts",
      "MarketSection",
      "RentalsHomeDreamBig",
      "Footer",
      "HighlightsSocial",
      "HighlightsTradeshow",
      "HighlightsWedding",
      "HighlightsCorporate",
      "ContactDetails",
      "SocialLinks",
      "ContactUsContent",
      "colorFilterCache",
      "PeopleReviewSlider",
      "HomeSectionDetails",
      "FooterNavigationMenu",
      "StudiosSection",
      "MarketSection",
      "RentalsLoginModal",
      "FilterLocations",
      "RentalsCreateAccountModal",
      "RentalsResetPasswordModal",
      "RentalsFooter",
      "PortfolioCollection",
      "SocialSectionDetails",
      "BlogProductData",
      "RentalsFooterLinks",
      "RentalsSocialMediaLinks",
      "RentalsAddresses",
      "DreamBigSection",
      "RentalsMyAccountPage",
      "RentalsChangePasswordPage",
      "BPSCatalogStructure",
      "HeaderCategoryMenu",
      "locationFilteredVariant",
      "Stores/Products",
      "BPSPairItWith",
      "BPSProductImages",
      "Stores/Variants",
    ];

    // Validate collection ID
    if (dataCollectionId && !authCollections.includes(dataCollectionId)) {
      return { error: "Unauthorized", status: 401 };
    }

    // Authenticate the API key
    const apiKey = process.env.APIKEY;
    const auth = await apiAuth(apiKey, dataCollectionId);

    if (!auth) {
      return { error: "Unauthorized", status: 401 };
    }

    // Populate query options
    if (dataCollectionId) options.dataCollectionId = dataCollectionId;
    if (includeReferencedItems?.length > 0) options.includeReferencedItems = includeReferencedItems;
    if (returnTotalCount || limit === "infinite") options.returnTotalCount = returnTotalCount || true;

    // Initialize query
    const client = await createWixClient();
    let data = client.items.queryDataItems(options);

    // Apply filters
    if (contains?.length === 2) data = data.contains(contains[0], contains[1]);
    if (eq && eq.length > 0 && eq !== "null") eq.forEach(filter => data = data.eq(filter.key, filter.value));
    if (hasSome && hasSome.length > 0 && hasSome !== "null") hasSome.forEach(filter => data = data.hasSome(filter.key, filter.values));
    if (skip && skip !== "null") data = data.skip(skip);
    if (limit && limit !== "null" && limit !== "infinite") data = data.limit(limit);
    if (limit === "infinite" && increasedLimit) {
      data = data.limit(increasedLimit);
    } else if (limit === "infinite") {
      data = data.limit(50);
    };
    if (ne && ne.length > 0 && ne !== "null") ne.forEach(filter => data = data.ne(filter.key, filter.value));

    // Fetch data
    data = await data.find();

    // Handle infinite limit
    if (limit === "infinite") {
      let items = data._items;
      while (items.length < data._totalCount) {
        data = await data._fetchNextPage();
        items = [...items, ...data._items];
      }
      data._items = items;
    }

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

    // Data cleanup for specific collections
    if (data._items.length > 0) {
      if (dataCollectionId === "Stores/Products") {
        data._items = data._items.map(val => {
          delete val.data.formattedDiscountedPrice;
          delete val.data.formattedPrice;
          delete val.data.price;
          delete val.data.discountedPrice;
          return val;
        });
      }
      if (dataCollectionId === "locationFilteredVariant") {
        data._items = data._items.map(val => {
          val.data.variantData = val.data.variantData.map(val2 => {
            delete val2.variant.discountedPrice;
            delete val2.variant.price;
            return val2;
          });
          delete val?.data?.product?.formattedDiscountedPrice;
          delete val?.data?.product?.discountedPrice;
          delete val?.data?.product?.formattedPrice;
          delete val?.data?.product?.price;
          return val;
        });
      }
    }

    return data;

  } catch (error) {
    console.log("Error in queryDataItems:", payload.dataCollectionId, error);
    return { error: error.message, status: 500 };
  }
};

export default getDataFetchFunction;