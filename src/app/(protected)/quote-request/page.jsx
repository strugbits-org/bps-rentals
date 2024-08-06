import QuoteRequestPage from "@/components/QuoteRequest/Index";
import { getQuoteRequestPageContent } from "@/Services/Index";

export default async function Page() {
  const [quoteRequestPageContent] = await Promise.all([
    getQuoteRequestPageContent(),
  ]);
  return <QuoteRequestPage quoteRequestPageContent={quoteRequestPageContent} />;
}
