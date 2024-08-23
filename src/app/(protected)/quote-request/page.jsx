import { getQuoteRequestPageContent } from "@/Services/Index";
import { getPageMetaData } from "@/Services/SectionsApis";

import QuoteRequest from "@/components/Quote/QuoteRequest";

export async function generateMetadata() {
  try {
    const metaData = await getPageMetaData("quote-request");
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
  const quoteRequestPageContent = await getQuoteRequestPageContent();
  return <QuoteRequest quoteRequestPageContent={quoteRequestPageContent} />;
}
