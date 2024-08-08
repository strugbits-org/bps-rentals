import CartPage from "@/components/Cart/Index";
import { getProductsCart } from "@/Services/CartApis";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const tokens = cookieStore.get("userTokens");
  const memberTokens = tokens.value;

  const [cartData] = await Promise.all([
    getProductsCart(JSON.parse(memberTokens)),
  ]);

  return <CartPage cartData={cartData || []} />;
}
