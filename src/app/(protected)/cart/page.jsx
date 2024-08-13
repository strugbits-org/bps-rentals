import { getProductsCart } from "@/Services/CartApis";
import CartPage from "@/components/Cart/Index";

export default async function Page() {
  const [cartData] = await Promise.all([getProductsCart()]);
  return <CartPage cartData={cartData || []} />;
}
