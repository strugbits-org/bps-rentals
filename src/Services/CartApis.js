"use server";
import { AddProductToCartVisitor, getProductsCartVisitor, removeProductFromCartVisitor, updateProductsQuantityCartVisitor } from "./CartApisVisitor";
import { getAuthToken, getCartId, getMemberTokens } from "./GetAuthToken";

const baseUrl = process.env.BASE_URL;

export const getProductsCart = async () => {
  try {
    const authToken = await getAuthToken();
    const memberTokens = await getMemberTokens();

    if (!authToken) {
      const cartId = await getCartId();
      const response = getProductsCartVisitor(cartId);
      return response;
    }

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

    return data.cart.lineItems;
  } catch (error) {
    console.error("Error", error);
    return null;
  }
};

export const AddProductToCart = async (productData) => {
  try {
    const authToken = await getAuthToken();
    const memberTokens = await getMemberTokens();
    const payload = {
      memberTokens,
      productData,
    };

    if (!authToken) {
      const cartId = await getCartId();
      const response = AddProductToCartVisitor(cartId, productData);
      return response;
    }

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

export const updateProductsQuantityCart = async (lineItems) => {
  try {
    const authToken = await getAuthToken();
    const memberTokens = await getMemberTokens();
    const payload = {
      memberTokens,
      lineItems,
    };

    if (!authToken) {
      const cartId = await getCartId();
      const response = updateProductsQuantityCartVisitor(cartId, lineItems);
      return response;
    }

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

export const removeProductFromCart = async (lineItemIds) => {
  try {
    const authToken = await getAuthToken();
    const memberTokens = await getMemberTokens();

    if (!authToken) {
      const cartId = await getCartId();
      const response = removeProductFromCartVisitor(cartId, lineItemIds);
      return response;
    }

    const payload = {
      memberTokens,
      lineItemIds,
    };
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

