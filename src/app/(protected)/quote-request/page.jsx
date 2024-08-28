import { getQuoteRequestPageContent } from "@/Services/Index";
import { getPageMetaData } from "@/Services/SectionsApis";

import QuoteRequest from "@/components/Quote/QuoteRequest";

export async function generateMetadata() {
  try {
    const metaData = await getPageMetaData("quote-request");
    const { title, noFollowTag } = metaData;
    
const metadata = {
      title,
    };

    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION" && noFollowTag) {
      metadata.robots = "noindex,nofollow";
    }
    
    return metadata;
  } catch (error) {
    console.log("Error:", error);
  }
}

export default async function Page() {
  const quoteRequestPageContent = await getQuoteRequestPageContent();
  return <QuoteRequest quoteRequestPageContent={quoteRequestPageContent} />;
}
