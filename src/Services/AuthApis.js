"use server";
import { getAuthToken, getCartId } from "./GetAuthToken";
const baseUrl = process.env.BASE_URL;

export const signUpUser = async (userData) => {
  try {
    const cartId = await getCartId(false);
    if (cartId) userData.cartId = cartId;
    const response = await fetch(`${baseUrl}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const data = await response.json();
      return { error: true, message: data.message };
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const signInUser = async (userData) => {
  try {
    
    const cartId = await getCartId(false);
    if (cartId) userData.cartId = cartId;

    const response = await fetch(`${baseUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const data = await response.json();

      return { error: true, message: data.message };
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const confirmEmail = async (userData) => {
  try {
    const response = await fetch(`${baseUrl}/api/auth/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const data = await response.json();
      return { error: true, message: data.message };
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const resetPassword = async (userData, token) => {
  try {
    const response = await fetch(
      `${baseUrl}/api/auth/resetPassword?reset-id=${token}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      return { error: true, message: data.message };
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateProfile = async (userData) => {
  try {
    const authToken = await getAuthToken();

    const response = await fetch(`${baseUrl}/api/auth/updateProfile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const data = await response.json();
      return { error: true, message: data.message };
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};

// Background session re-sync. Unlike the other actions this never throws —
// a failed refresh must not disrupt the user's current session, so it returns
// an error descriptor the caller can quietly ignore.
export const refreshSession = async () => {
  try {
    const authToken = await getAuthToken();
    if (!authToken) return { error: true, status: 401 };

    const response = await fetch(`${baseUrl}/api/auth/refresh-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
    });

    if (!response.ok) {
      return { error: true, status: response.status };
    }
    return await response.json();
  } catch {
    return { error: true, status: 0 };
  }
};

export const changePassword = async (userData) => {
  try {
    const authToken = await getAuthToken();
    const response = await fetch(`${baseUrl}/api/auth/changePassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authToken,
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const data = await response.json();
      return { error: true, message: data.message };
    }
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error(error);
  }
};
