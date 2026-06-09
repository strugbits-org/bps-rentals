"use server";

import { getAuthToken } from "./GetAuthToken";
import logError from "@/Utils/ServerActions";

const baseUrl = process.env.BASE_URL;

export const submit3dAccessRequest = async (requestData) => {
  try {
    const authToken = await getAuthToken();
    if (!authToken) {
      throw new Error("You must be logged in to request 3D library access.");
    }

    const response = await fetch(`${baseUrl}/api/3d-access/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: authToken,
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    logError("Error submitting 3D access request: ", error);
    throw new Error(error);
  }
};
