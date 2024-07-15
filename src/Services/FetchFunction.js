import { createWixClient } from "@/Utils/CreateWixClient";
import { apiAuth } from "@/Utils/IsAuthenticated";

export const getDataFetchFunction = async (payload) => {
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
    } = payload;

    const options = {};

    const authCollections = [
      "RentalsHomeHero",
      "RentalsHomeNewArrivals",
      "RentalsHomeStudios",
      "RentalsHomeHotTrends",
      "RentalsHomeDreamBig",
      "StudiosSection",
      "MarketSection",
      "RentalsLoginModal",
      "RentalsCreateAccountModal",
      "RentalsResetPasswordModal",
      "RentalsFooter",
      "SocialSectionDetails",
      "BlogProductData",
      "RentalsFooterLinks",
      "RentalsSocialMediaLinks",
      "RentalsAddresses",
      "RentalsHomeSectionsTitles",
      "DreamBigSection",
      "RentalsMyAccountPage",
      "RentalsChangePasswordPage",
      "F1CategoriesStructure",
      "BPSCatalogStructure",
      "HeaderCategoryMenu",
    ];

    const isValid = authCollections.includes(dataCollectionId);
    const wixClient = await createWixClient();

    if (dataCollectionId && !isValid) {
      return { error: "Unauthorized", status: 401 };
    }

    const apiKey = process.env.APIKEY;
    const auth = await apiAuth(apiKey, dataCollectionId);

    if (!auth) {
      return { error: "Unauthorized", status: 401 };
    }

    if (dataCollectionId) options.dataCollectionId = dataCollectionId;
    if (includeReferencedItems?.length > 0)
      options.includeReferencedItems = includeReferencedItems;
    if (returnTotalCount) options.returnTotalCount = returnTotalCount;

    let data = wixClient.items.queryDataItems(options);
    if (contains?.length === 2) {
      data = data.contains(contains[0], contains[1]);
    }

    if (eq && eq.length > 0 && eq !== "null") {
      eq.forEach((filter) => {
        data = data.eq(filter.key, filter.value);
      });
    }

    if (hasSome && hasSome.length > 0 && hasSome !== "null") {
      hasSome.forEach((filter) => {
        data = data.hasSome(filter.key, filter.values);
      });
    }

    if (skip && skip !== "null") {
      data = data.skip(skip);
    }

    if (limit && limit !== "null" && limit !== "infinite") {
      data = data.limit(limit);
    }

    if (limit == "infinite") {
      data = data.limit(50);
    }

    if (
      ne &&
      ne.length === 2 &&
      ne !== "null" &&
      ne[0] !== null &&
      ne[1] !== null
    ) {
      data = data.ne(ne[0], ne[1]);
    }

    data = await data.find();
    if (limit == "infinite") {
      let items = data._items;
      while (items.length < data._totalCount) {
        data = await data._fetchNextPage();
        items = [...items, ...data._items];
      }
      data._items = items;
    }

    if (data._items.length > 0) {
      if (dataCollectionId === "Stores/Products") {
        data._items = data._items.map((val) => {
          delete val.data.formattedDiscountedPrice;
          delete val.data.formattedPrice;
          delete val.data.price;
          delete val.data.discountedPrice;
          return val;
        });
      }
      if (dataCollectionId === "locationFilteredVariant") {
        data._items = data._items.map((val) => {
          val.data.variantData = val.data.variantData.map((val2) => {
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
    console.log(error);
    return { error: error.message, status: 500 };
  }
};

export default getDataFetchFunction;
