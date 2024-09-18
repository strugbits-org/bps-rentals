import { Suspense } from "react";

import ResetPassword from "@/components/Authentication/ResetPassword";
import { getPageMetaData } from "@/Services/SectionsApis";
import logError from "@/Utils/ServerActions";

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
    logError("Error in metadata(Reset Password page):", error);
  }
}

export default async function Page() {
  return (
    <Suspense>
      <ResetPassword />;
    </Suspense>
  );
}
