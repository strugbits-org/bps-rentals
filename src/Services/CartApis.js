"use server";
import { getAuthToken } from "./GetAuthToken";

const baseUrl = process.env.BASE_URL;

export const getProductsCart = async (memberTokens) => {
  try {
    const authToken = await getAuthToken();
    const response = await fetch(`${baseUrl}/api/cart/get`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: authToken,
      },
      body: JSON.stringify(memberTokens),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.cartData.lineItems;
  } catch (error) {
    console.error("Error", error);
    return null;
  }
};

export const AddProductToCart = async ({ memberTokens, productData }) => {
  const payload = {
    memberTokens,
    productData,
  };

  try {
    const authToken = await getAuthToken();
    const response = await fetch(`${baseUrl}/api/cart/add`, {
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

export const updateProductsQuantityCart = async ({
  memberTokens,
  lineItems,
}) => {
  const payload = {
    memberTokens,
    lineItems,
  };
  try {
    const authToken = await getAuthToken();
    const response = await fetch(`${baseUrl}/api/cart/updateQuantity`, {
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

export const removeProductFromCart = async ({ memberTokens, lineItemIds }) => {
  const payload = {
    memberTokens,
    lineItemIds,
  };
  try {
    const authToken = await getAuthToken();
    const response = await fetch(`${baseUrl}/api/cart/remove`, {
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