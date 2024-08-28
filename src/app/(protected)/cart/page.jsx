import { getProductsCart } from "@/Services/CartApis";
import { getPageMetaData } from "@/Services/SectionsApis";
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
    console.log("Error:", error);
  }
}

export default async function Page() {
  const cartData = await getProductsCart();
  return <CartPage cartData={cartData || []} />;
}

export const dynamic = 'force-dynamic';