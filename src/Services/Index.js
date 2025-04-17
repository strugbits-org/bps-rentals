"use server";

import logError from "@/Utils/ServerActions";
import getDataFetchFunction from "./FetchFunction";
import { encryptField } from "@/Utils/Encrypt";

const BASE_URL = process.env.BASE_URL;


export const postForm = async (name, payload) => {
  try {
    const response = await fetch(`${BASE_URL}/api/post-form/${name}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getRentalsBanners = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "DemoBanners",
      includeReferencedItems: ["categories"],
      limit: "infinite",
    });
    if (response && response.items) {
      return response.items;
    } else {
      throw new Error("Response does not contain _items", response);
    }
  } catch (error) {
    logError("Error fetching Rentals Banners data:", error);
    return [];
  }
};

export const getQuoteRequestPageContent = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsQuoteRequestPage",
    });

    if (response && response.items) {
      return response.items[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching RentalsQuoteRequestPage data:", error);
  }
};

export const getQuoteDetailPageContent = async () => {
  try {
    const response = await getDataFetchFunction({
      dataCollectionId: "RentalsQuotesDetailPage",
    });

    if (response && response.items) {
      return response.items[0];
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching RentalsQuotesDetailPage data:", error);
  }
};

export const getChatConfiguration = async (origin) => {
  try {
    const response = await getDataFetchFunction({
      "dataCollectionId": "ChatbotConfiguration",
      "eq": [
        {
          "key": "origin",
          "value": origin,
        },
        {
          "key": "enable",
          "value": true,
        }
      ],
    });
    if (!response.items || !response.items[0]) {
      throw new Error("No data found for ChatbotConfiguration");
    }
    return response.items[0];
  } catch (error) {
    // logError("Error fetching ChatbotConfiguration data:", error);
    return {};
  }
};

export const getChatTriggerEvents = async () => {
  try {
    const response = await getDataFetchFunction({ "dataCollectionId": "ChatWidgetTriggerRentals" });

    if (!response.items || !response.items) {
      throw new Error("No data found for ChatWidgetTrigger");
    }
    return response.items;
  } catch (error) {
    logError("Error getting chat trigger events", error);
  }
};

export const getMemberPricingTier = async (badgeIds) => {
  try {
    const response = await getDataFetchFunction({
      "dataCollectionId": "BadgesPricingTiers",
      "includeReferencedItems": ["badges"],
      "sortKey": "order",
    });

    if (!response.items || !response.items) {
      throw new Error("No data found for BadgesPricingTiers");
    }

    const badgesData = response.items;

    if (!badgesData.length) return null;

    for (const tier of badgesData) {
      if (tier.badges.some(badge => badgeIds.includes(badge._id))) {
        return encryptField(tier.title);
      }
    }

    return null;
  } catch (error) {
    logError("Error getting badges pricing tiers", error);
  }
};