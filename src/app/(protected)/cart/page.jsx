import { getProductsCart } from "@/Services/CartApis";
import { getPageMetaData } from "@/Services/SectionsApis";
import CartPage from "@/components/Cart/Index";

export async function generateMetadata() {
  try {
    const metaData = await getPageMetaData("cart");
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
  const cartData = await getProductsCart();
  return <CartPage cartData={cartData || []} />;
}

export const dynamic = 'force-dynamic';