import { getPageMetaData } from "@/Services/SectionsApis";
import logError from "@/Utils/ServerActions";
import CartPage from "@/components/Cart/Index";

export async function generateMetadata() {
  try {
    const metaData = await getPageMetaData("cart");
    const { title, noFollowTag } = metaData;
    const metadata = {
      title,
    };

    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION" && noFollowTag) {
      metadata.robots = "noindex,nofollow";
    }

    return metadata;
  } catch (error) {
    logError("Error in metadata(Cart page):", error);
  }
}

export default async function Page() {
  return <CartPage />;
}