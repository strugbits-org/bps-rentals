"use client";
import { useCookies } from "react-cookie";

export const getAuthToken = () => {
  const [cookies] = useCookies(["authToken"]);
  const authToken = cookies.authToken;
  return authToken;
};
