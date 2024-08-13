import QuoteRequestPage from "@/components/QuoteRequest/Index";
import { getProductsCart } from "@/Services/CartApis";
import { getQuoteRequestPageContent } from "@/Services/Index";

export default async function Page() {
  const [quoteRequestPageContent, cartData] = await Promise.all([
    getQuoteRequestPageContent(),
    getProductsCart(),
  ]);
  return (
    <QuoteRequestPage
      quoteRequestPageContent={quoteRequestPageContent}
      cartData={cartData || []}
    />
  );
}
