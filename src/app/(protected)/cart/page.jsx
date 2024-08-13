import { getProductsCart } from "@/Services/CartApis";
import CartPage from "@/components/Cart/Index";

export default async function Page() {
  const cartData = await getProductsCart();
  return <CartPage cartData={cartData || []} />;
}

export const dynamic = 'force-dynamic';