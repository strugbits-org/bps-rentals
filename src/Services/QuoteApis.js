"use server";
import { getAuthToken } from "./GetAuthToken";

const baseUrl = process.env.BASE_URL;

export const getQuotes = async () => {
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
    if (!response.ok) {
      throw new Error("Failed to fetch quotes");
    }
    const data = await response.json();
    console.log(data, "data of quotes");

    return data.data._items;
  } catch (error) {
    throw new Error(error);
  }
};

export const createPriceQuote = async ({ lineItems, customerDetails }) => {
  const payload = { lineItems, customerDetails };
  try {
    const authToken = await getAuthToken();
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
