import Error404Page from "@/components/Error404Page";
import { getPageMetaData } from "@/Services/SectionsApis";
import logError from "@/Utils/ServerActions";

export async function generateMetadata() {
  try {
    const metaData = await getPageMetaData("error");
    const { title, noFollowTag } = metaData;
    const metadata = {
      title,
    };

    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION" && noFollowTag) {
      metadata.robots = "noindex,nofollow";
    }

    return metadata;
  } catch (error) {
    logError("Error in metadata(404 page):", error);
  }
}

export default function NotFound() {
  return <Error404Page />;
}
export const dynamic = 'force-dynamic';