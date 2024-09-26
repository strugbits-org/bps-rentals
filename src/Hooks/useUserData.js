"use client";
import { decryptField } from "@/Utils/Encrypt";
import logError from "@/Utils/ServerActions";
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
        logError("Error parsing user data from cookie", error);
      }
    }
  }, [cookies]);

  const role = decryptField(signedUserData?.role);
  const permissions = signedUserData?.permissions?.map(x => decryptField(x)) || [];
  return {
    signedUserData,
    email: signedUserData?.loginEmail,
    firstName: signedUserData?.firstName,
    lastName: signedUserData?.lastName,
    memberId: signedUserData?.memberId,
    phone: signedUserData?.mainPhone,
    role: role || "user",
    permissions
  };
}

export default useUserData;
