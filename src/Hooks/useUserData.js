"use client";
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

  return {
    signedUserData,
    id: signedUserData?._id,
    email: signedUserData?.userEmail,
    firstName: signedUserData?.firstName,
    lastName: signedUserData?.lastName,
    memberId: signedUserData?.memberId,
  };
}

export default useUserData;
