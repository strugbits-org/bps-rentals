"use server";

import {
  getNavbarCategoriesData,
  getCreateAccountModalContent,
  getForgotPasswordModalContent,
  getLoginModalContent,
  getFilterLocations,
  getSearchSectionDetails,
} from "./NavbarApis";
import {
  getContactData,
  getContactUsContent,
  getFooterData,
  getFooterNavigationMenu,
  getSocialLinks,
} from "./FooterApis";
import {
  fetchInstaFeed,
  fetchSearchPages,
  getBlogsData,
  getMarketsData,
  getPortfolioData,
  getSocialSectionBlogs,
  getSocialSectionDetails,
  getStudiosData,
} from "./SectionsApis";
import { getChatConfiguration, getChatTriggerEvents } from "./Index";
import logError from "@/Utils/ServerActions";

export const fetchAllLayoutData = async () => {
  try {
    const BASE_URL = process.env.BASE_URL;

    const [
      filterLocations,
      loginModalContent,
      createAccountModalContent,
      forgotPasswordModalContent,
      footerData,
      contactData,
      socialLinks,
      navigationMenu,
      contactUsContent,
      socialSectionDetails,
      socialSectionBlogs,
      instaFeed,
      searchSectionDetails,
      searchPagesData,
      chatConfig,
      chatTriggerEvents,
      marketsData,
      studiosData,
      allCategoriesData,
    ] = await Promise.all([
      getFilterLocations(),
      getLoginModalContent(),
      getCreateAccountModalContent(),
      getForgotPasswordModalContent(),
      getFooterData(),
      getContactData(),
      getSocialLinks(),
      getFooterNavigationMenu(),
      getContactUsContent(),
      getSocialSectionDetails(),
      getSocialSectionBlogs(),
      fetchInstaFeed(),
      getSearchSectionDetails(),
      fetchSearchPages(),
      getChatConfiguration(BASE_URL),
      getChatTriggerEvents(),
      getMarketsData(),
      getStudiosData(),
      getNavbarCategoriesData(),
    ]);

    return {
      filterLocations: filterLocations.map((location) => ({
        value: location.value,
        label: location.label
      })),
      loginModalContent: loginModalContent ? {
        emailFieldLabel: loginModalContent.emailFieldLabel,
        passwordFieldLabel: loginModalContent.passwordFieldLabel,
        signInButtonLabel: loginModalContent.signInButtonLabel,
        createAccountButtonLabel: loginModalContent.createAccountButtonLabel,
        forgotYourPasswordLinkText: loginModalContent.forgotYourPasswordLinkText,
        taglineSignup: loginModalContent.taglineSignup,
        disclaimer: loginModalContent.disclaimer
      } : null,
      createAccountModalContent: createAccountModalContent ? {
        emailFieldLabel: createAccountModalContent.emailFieldLabel,
        password: createAccountModalContent.password,
        firstNameFieldLabel: createAccountModalContent.firstNameFieldLabel,
        lastNameFieldLabel: createAccountModalContent.lastNameFieldLabel,
        phoneNumberFieldLabel: createAccountModalContent.phoneNumberFieldLabel,
        createAccountButtonLabel: createAccountModalContent.createAccountButtonLabel,
        disclaimer: createAccountModalContent.disclaimer
      } : null,
      forgotPasswordModalContent: forgotPasswordModalContent ? {
        emailFieldLabel: forgotPasswordModalContent.emailFieldLabel,
        sendButtonLabel: forgotPasswordModalContent.sendButtonLabel
      } : null,
      footerData: footerData ? {
        logo1: footerData.logo1,
        logo2: footerData.logo2,
        logo3: footerData.logo3,
        heading: footerData.heading,
        copyright: footerData.copyright,
        newsletterTitle: footerData.newsletterTitle,
        newsletterDescription: footerData.newsletterDescription,
        newsletterPlaceholder: footerData.newsletterPlaceholder,
        newsletterSubmitButtonText: footerData.newsletterSubmitButtonText
      } : null,
      contactData: contactData ? contactData.map((data) => ({
        city: data.city,
        address1: data.address1,
        address2: data.address2,
        address3: data.address3,
        phone1: data.phone1,
        phone2: data.phone2
      })) : [],
      socialLinks: socialLinks ? socialLinks.map((link) => ({
        link: link.link,
        icon: link.icon
      })) : [],
      navigationMenu: navigationMenu ? navigationMenu.map((item) => ({
        _id: item._id,
        title: item.title,
        rentalsAction: item.rentalsAction,
        actionTargetRentals: item.actionTargetRentals
      })) : [],
      contactUsContent: contactUsContent ? {
        formTitle: contactUsContent.formTitle,
        firstNamePlaceholder: contactUsContent.firstNamePlaceholder,
        lastNamePlaceholder: contactUsContent.lastNamePlaceholder,
        emailPlaceholder: contactUsContent.emailPlaceholder,
        messageBoxPlaceholder: contactUsContent.messageBoxPlaceholder,
        formSubmitButton: contactUsContent.formSubmitButton,
        sfPhone: contactUsContent.sfPhone,
        lvPhone: contactUsContent.lvPhone,
        infoEmail: contactUsContent.infoEmail
      } : null,
      socialSectionDetails: socialSectionDetails ? {
        title: socialSectionDetails.title,
        description: socialSectionDetails.description,
        blogsTitle: socialSectionDetails.blogsTitle,
        instaFeedTitle: socialSectionDetails.instaFeedTitle,
        pinterestFeedTitle: socialSectionDetails.pinterestFeedTitle,
        pinterestUrl: socialSectionDetails.pinterestUrl
      } : null,
      socialSectionBlogs: socialSectionBlogs ? socialSectionBlogs.map((post) => ({
        _id: post._id,
        slug: post.slug,
        blogRef: {
          coverImage: post.blogRef?.coverImage,
          title: post.blogRef?.title,
          excerpt: post.blogRef?.excerpt
        }
      })) : [],
      instaFeed: instaFeed ? instaFeed.map((item) => ({
        permalink: item.permalink,
        caption: item.caption,
        image: item.image
      })) : [],
      searchSectionDetails: searchSectionDetails ? {
        studiosTitle: searchSectionDetails.studiosTitle,
        rentalTitle: searchSectionDetails.rentalTitle,
        portfolioTitle: searchSectionDetails.portfolioTitle,
        marketsTitle: searchSectionDetails.marketsTitle,
        blogTitle: searchSectionDetails.blogTitle,
        otherPagesTitle: searchSectionDetails.otherPagesTitle
      } : null,
      searchPagesData: searchPagesData ? searchPagesData.map((page) => ({
        path: page.path,
        title: page.title,
        description: page.description,
        content: page.content,
        redirectToRentals: page.redirectToRentals
      })) : [],
      chatConfig: chatConfig ? {
        widget: chatConfig.widget
      } : null,
      chatTriggerEvents: chatTriggerEvents || [],
      marketsData,
      studiosData,
      allCategoriesData,
    };
  } catch (error) {
    logError("Error fetching layout data:", error);
    throw error;
  }
};

// Client-side version for fetching blogs data
export const fetchBlogsDataClient = async () => {
  try {
    const data = await getBlogsData();
    return data;
  } catch (error) {
    logError("Error fetching blogs data client-side:", error);
    return [];
  }
};

// Client-side version for fetching portfolios data
export const fetchPortfoliosDataClient = async () => {
  try {
    const data = await getPortfolioData();
    return data;
  } catch (error) {
    logError("Error fetching portfolios data client-side:", error);
    return [];
  }
};
