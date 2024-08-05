import { getAuthToken } from "./GetAuthToken";
const baseUrl = process.env.BASE_URL;

export const signUpUser = async (userData) => {
  try {
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
      `${baseUrl}/api/auth/resetPassword?token=${token}`,
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
    const authToken = getAuthToken();
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

export const changePassword = async (userData) => {
  try {
    const authToken = getAuthToken();
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
