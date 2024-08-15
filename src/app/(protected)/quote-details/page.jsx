import QuoteRequestPage from "@/components/QuoteRequest/Index";
import QuoteDetails from "@/components/QuoteRequest/QuoteDetails";
import { getProductsCart } from "@/Services/CartApis";
import { getQuoteRequestPageContent } from "@/Services/Index";
import { getQuotesById } from "@/Services/QuoteApis";

export default async function Page({ searchParams }) {
  const id = searchParams.id;

  const [quoteRequestPageContent, quoteData] = await Promise.all([
    getQuoteRequestPageContent(),
    getQuotesById(id),
  ]);

  return (
    <QuoteDetails
      quoteRequestPageContent={quoteRequestPageContent}
      quoteData={quoteData.data || []}
    />
  );
}
