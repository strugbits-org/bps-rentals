import jwt from "jsonwebtoken";

import { authWixClient, createWixClient } from "./CreateWixClient";

const unAuthCollections = [
  "RentalsHomeNewArrivals",
  "TextCollectionPages",
  "Stores/Collections",
  "RentalsHomeHero",
  "RentalsNewArrivals",
  "RentalsHomeStudios",
  "RentalsHomeHotTrends",
  "RentalsHomeDreamBig",
  "Footer",
  "colorFilterCache",
  "FilterLocations",
  "ContactDetails",
  "MarketSection",
  "HighlightsProducts",
  "BestSellers",
  "SocialLinks",
  "ContactUsContent",
  "FooterNavigationMenu",
  "StudiosSection",
  "HomeSectionDetails",
  "PeopleReviewSlider",
  "MarketSection",
  "RentalsLoginModal",
  "SocialSectionDetails",
  "BlogProductData",
  "RentalsCreateAccountModal",
  "RentalsResetPasswordModal",
  "RentalsFooter",
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
  "RentalsPrivacyPageContent",
  "RentalsTermsPageContent",
  "RentalsQuoteRequestPage",
];

export const isAuthenticated = async (token) => {
  try {
    // // Allow unauthenticated access for certain collections
    // if (unAuthCollections.includes(dataCollectionId)) {
    //     return true; // Or some appropriate default object for unauthenticated users
    // }

    if (!token) {
      throw new Error("Unauthorized: No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const authClient = await authWixClient();
    const wixClient = await createWixClient();

    const privateMemberData = await authClient.items
      .queryDataItems({
        dataCollectionId: "Members/PrivateMembersData",
      })
      .eq("loginEmail", decoded.email)
      .find();

    const memberData = await wixClient.items
      .queryDataItems({
        dataCollectionId: "membersPassword",
      })
      .eq("userEmail", decoded.email)
      .find();

    const loggedInUserData = {
      ...memberData._items[0].data,
      memberId: privateMemberData._items[0].data._id,
      firstName: privateMemberData._items[0].data.firstName,
      lastName: privateMemberData._items[0].data.lastName,
      phone: privateMemberData._items[0].data.mainPhone,
    };

    if (memberData._items.length === 0) {
      throw new Error("Unauthorized: No matching user data");
    }

    return loggedInUserData;
  } catch (error) {
    console.error(error);
    throw new Error(`Unauthorized: ${error.message}`);
  }
};

export const apiAuth = async (apiKey, dataCollectionId) => {
  if (!apiKey) {
    throw new Error("Unauthorized: No api key provided");
  }

  if (unAuthCollections.includes(dataCollectionId)) {
    return true;
  }

  if (apiKey.toString() !== process.env.APIKEY) {
    throw new Error("Unauthorized: Api key does not match");
  }

  return true;
};
