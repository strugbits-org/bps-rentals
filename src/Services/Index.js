"use server";

import logError from "@/Utils/ServerActions";
import getDataFetchFunction from "./FetchFunction";

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
      dataCollectionId: "RentalsBanners",
    });
    if (response && response._items) {
      return response._items.map((x) => x.data);
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

    if (response && response._items) {
      return response._items[0].data;
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

    if (response && response._items) {
      return response._items[0].data;
    } else {
      throw new Error("Response does not contain _items");
    }
  } catch (error) {
    logError("Error fetching RentalsQuotesDetailPage data:", error);
  }
};