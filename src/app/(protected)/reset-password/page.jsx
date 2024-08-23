import { Suspense } from "react";

import ResetPassword from "@/components/Authentication/ResetPassword";
import { getPageMetaData } from "@/Services/SectionsApis";

export async function generateMetadata() {
  try {
    const metaData = await getPageMetaData("reset-password");
    const { title, noFollowTag } = metaData;
    
    return {
      title: title,
      robots: process.env.NEXT_PUBLIC_ENVIRONMENT !== "PRODUCTION" && noFollowTag ? "noindex,nofollow" : null,
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

export default async function Page() {
  return (
    <Suspense>
      <ResetPassword />;
    </Suspense>
  );
}
