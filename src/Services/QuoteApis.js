"use server";
import { getAuthToken, getMemberTokens } from "./GetAuthToken";

const baseUrl = process.env.BASE_URL;

export const createPriceQuote = async ({ lineItems, customerDetails }) => {
  try {
    const authToken = await getAuthToken();
    const memberTokens = await getMemberTokens();
    const payload = { memberTokens, lineItems, customerDetails };

    const response = await fetch(`${baseUrl}/api/quote/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: authToken,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllQuotes = async () => {
  try {
    const authToken = await getAuthToken();
    const response = await fetch(`${baseUrl}/api/quote/getAllQuotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: authToken,
      },
      cache: "no-store",
    });
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data.data._items;
  } catch (error) {
    throw new Error(error);
  }
};

export const getQuotesById = async (id) => {
  try {
    const authToken = await getAuthToken();
    const response = await fetch(`${baseUrl}/api/quote/getById/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: authToken,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch quotes");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};
