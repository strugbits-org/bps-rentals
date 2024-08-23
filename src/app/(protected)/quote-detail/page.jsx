import QuoteDetails from "@/components/Quote/QuoteDetails";

import { getQuoteRequestPageContent } from "@/Services/Index";
import { getQuotesById } from "@/Services/QuoteApis";
import { getPageMetaData } from "@/Services/SectionsApis";

export async function generateMetadata() {
  try {
    const metaData = await getPageMetaData("quote-detail");
    const { title, noFollowTag } = metaData;
    
    return {
      title: title,
      robots: process.env.NEXT_PUBLIC_ENVIRONMENT !== "PRODUCTION" && noFollowTag ? "noindex,nofollow" : null,
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

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
