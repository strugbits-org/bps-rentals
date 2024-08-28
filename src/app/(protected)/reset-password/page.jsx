import { Suspense } from "react";

import ResetPassword from "@/components/Authentication/ResetPassword";
import { getPageMetaData } from "@/Services/SectionsApis";

export async function generateMetadata() {
  try {
    const metaData = await getPageMetaData("reset-password");
    const { title, noFollowTag } = metaData;
    
const metadata = {
      title,
    };

    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION" && noFollowTag) {
      metadata.robots = "noindex,nofollow";
    }
    
    return metadata;
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
