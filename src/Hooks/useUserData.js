"use client";
import { decryptField } from "@/Utils/Encrypt";
import { parseUserDataCookie } from "@/Utils/Request3dAccess";
import { useCookies } from "react-cookie";

function useUserData() {
  const [cookies] = useCookies(["userData"]);
  const signedUserData = parseUserDataCookie(cookies?.userData);

  return {
    signedUserData,
    email: signedUserData?.loginEmail,
    firstName: signedUserData?.firstName,
    lastName: signedUserData?.lastName,
    memberId: signedUserData?.memberId,
    phone: signedUserData?.mainPhone,
    permissions: signedUserData?.permissions?.map((x) => decryptField(x)) || [],
    pricingTier: decryptField(signedUserData?.pricingTier),
  };
}

export default useUserData;
