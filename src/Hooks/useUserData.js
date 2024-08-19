"use client";
import { decryptField } from "@/Utils/Encrypt";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

function useUserData() {
  const [signedUserData, setUserData] = useState(null);
  const [cookies] = useCookies(["userData"]);

  useEffect(() => {
    if (cookies) {
      try {
        setUserData(cookies.userData);
      } catch (error) {
        console.error("Error parsing user data from cookie", error);
      }
    }
  }, [cookies]);

  const role = decryptField(signedUserData?.role);
  return {
    signedUserData,
    email: signedUserData?.loginEmail,
    firstName: signedUserData?.firstName,
    lastName: signedUserData?.lastName,
    memberId: signedUserData?.memberId,
    phone: signedUserData?.mainPhone,
    role: role || "user",
  };
}

export default useUserData;
