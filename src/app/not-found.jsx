import Error404Page from "@/components/Error404Page";
import { getPageMetaData } from "@/Services/SectionsApis";

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
    console.log("Error:", error);
  }
}

export default function NotFound() {
  return <Error404Page />;
}
export const dynamic = 'force-dynamic';