// "use client";
// import { useCookies } from "react-cookie";

// export const getAuthToken = () => {
//   const [cookies] = useCookies(["authToken"]);
//   const authToken = cookies.authToken;
//   return authToken;
// };
"use server";
import { cookies } from "next/headers";

export const getAuthToken = async () => {
  const cookieStore = cookies();
  const authToken = cookieStore?.get("authToken");
  const token = authToken.value;
  return token;
};
