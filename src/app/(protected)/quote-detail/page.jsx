import QuoteDetails from "@/components/Quote/QuoteDetails";

import { getQuoteRequestPageContent } from "@/Services/Index";
import { getQuotesById } from "@/Services/QuoteApis";
import { getPageMetaData } from "@/Services/SectionsApis";

export async function generateMetadata() {
  try {
    const metaData = await getPageMetaData("quote-detail");
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
