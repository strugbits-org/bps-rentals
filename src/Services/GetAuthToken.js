"use server";
import { cookies } from "next/headers";

export const getAuthToken = async () => {
  const cookieStore = cookies();
  const authToken = cookieStore?.get("authToken");
  const token = authToken.value;
  return token;
};

export const getMemberTokens = async () => {
  const cookieStore = cookies();
  const tokens = cookieStore.get("userTokens");
  const memberTokens = tokens.value;
  return JSON.parse(memberTokens);
};
