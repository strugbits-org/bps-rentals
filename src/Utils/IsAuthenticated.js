import jwt from "jsonwebtoken";
import { createWixClient } from "./CreateWixClient";

export const isAuthenticated = async (token, dataCollectionId) => {
  try {
    const unAuthCollections = [
      "PrivacyandPolicyPageContentF1",
      "TermsandConditionsPageContentF1",
      "HomePageContentF1",
      "SocialMediaLinksF1",
      "HomePageBottomLeftLinksF1",
      "SignInPageF1",
      "CreateAccountPageF11",
      "HospitalitySpaceLocatedOptionsF1",
      "GalleryPageF1",
      "CollectionsF1",
      "BackgroundImagesF1",
      "ModalLogos",
      "ConfirmEmailPageContentF1",
      "ResetPasswordPageContentF1",
      "FooterDataF1",
      "FooterLinksDataF1",
    ];

    // // Allow unauthenticated access for certain collections
    // if (unAuthCollections.includes(dataCollectionId)) {
    //     return true; // Or some appropriate default object for unauthenticated users
    // }

    if (!token) {
      throw new Error("Unauthorized: No token provided");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const wixClient = await createWixClient();

    const memberData = await wixClient.items
      .queryDataItems({
        dataCollectionId: "F1UsersData",
      })
      .eq("email", decoded?.email)
      .find();

    if (memberData._items.length === 0) {
      throw new Error("Unauthorized: No matching user data");
    }

    const user = memberData._items[0].data;
    return user;
  } catch (error) {
    console.error(error); // Better error handling
    throw new Error(`Unauthorized: ${error.message}`);
  }
};

export const apiAuth = async (apiKey, dataCollectionId) => {
  if (!apiKey) {
    throw new Error("Unauthorized: No api key provided");
  }
  const unAuthCollections = [
    "RentalsHomeHero",
    "RentalsHomeNewArrivals",
    "RentalsHomeStudios",
    "RentalsHomeHotTrends",
    "RentalsHomeDreamBig",
    "StudiosSection",
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
    "RentalsHomeSectionsTitles",
    "DreamBigSection",
    "RentalsMyAccountPage",
    "RentalsChangePasswordPage",
    "F1CategoriesStructure",
  ];

  // Allow unauthenticated access for certain collections
  if (unAuthCollections.includes(dataCollectionId)) {
    return true; // Or some appropriate default object for unauthenticated users
  }

  if (apiKey.toString() !== process.env.APIKEY) {
    throw new Error("Unauthorized: Api key does not match");
  }

  return true;
};
