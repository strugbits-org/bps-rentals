import QuoteDetails from "@/components/Quote/QuoteDetails";

import { getQuoteDetailPageContent, getQuoteRequestPageContent } from "@/Services/Index";
import { getPageMetaData } from "@/Services/SectionsApis";
import { Suspense } from "react";

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

export default async function Page() {
  const [quoteRequestPageContent, quoteDetailPageContent] = await Promise.all([
    getQuoteRequestPageContent(),
    getQuoteDetailPageContent(),
  ]);

  return (
    <Suspense>
      <QuoteDetails quoteRequestPageContent={quoteRequestPageContent} quoteDetailPageContent={quoteDetailPageContent} />
    </Suspense>
  );
}
