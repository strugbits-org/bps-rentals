import { getQuoteRequestPageContent } from "@/Services/Index";

import QuoteRequest from "@/components/Quote/QuoteRequest";

export default async function Page() {
  const quoteRequestPageContent = await getQuoteRequestPageContent();
  return <QuoteRequest quoteRequestPageContent={quoteRequestPageContent} />;
}
