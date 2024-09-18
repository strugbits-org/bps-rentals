"use server";

import logError from "@/Utils/ServerActions";

const baseUrl = process.env.BASE_URL;

export const createPriceQuoteVisitor = async ({ cartId, lineItems, customerDetails }) => {
  try {
    const payload = { cartId, lineItems, customerDetails };

    const response = await fetch(`${baseUrl}/api/quote-visitor/create`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    logError("Error creating cart: ", error);
    throw new Error(error);
  }
};
