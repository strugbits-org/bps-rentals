// "use client";
// import { useCookies } from "react-cookie";

// export const getAuthToken = () => {
//   const [cookies] = useCookies(["authToken"]);
//   const authToken = cookies.authToken;
//   return authToken;
// };
"use server";
import { cookies } from "next/headers";

export const getAuthToken = () => {
  const cookieStore = cookies();
  const authToken = cookieStore?.get("authToken");
  if (authToken && authToken.value) {
    return authToken.value;
  }
};
