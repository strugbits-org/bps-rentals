import QuoteDetails from "@/components/Quote/QuoteDetails";

import { getQuoteDetailPageContent, getQuoteRequestPageContent } from "@/Services/Index";
import { getPageMetaData } from "@/Services/SectionsApis";
import logError from "@/Utils/ServerActions";
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
    logError("Error in metadata(Quote Details page):", error);
  }
}

export default async function Page() {
  try {
    const [quoteRequestPageContent, quoteDetailPageContent] = await Promise.all([
      getQuoteRequestPageContent(),
      getQuoteDetailPageContent(),
    ]);

    return (
      <Suspense>
        <QuoteDetails quoteRequestPageContent={quoteRequestPageContent} quoteDetailPageContent={quoteDetailPageContent} />
      </Suspense>
    );
  } catch (error) {
    logError("Error fetching Quote Details page data:", error);
  }
}
