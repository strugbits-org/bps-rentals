import HomePage from "@/components/Home/Index";
import {
  getHomeHeroSectionContent,
} from "@/Services/HomeApis";
import { fetchBestSellers, getBestSellerProducts } from "@/Services/ProductsApis";

import {
  getDreamBigSectionContent,
  getHighlightsSection,
  getHomeSectionDetails,
  getHotTrendsSection,
  getMarketsData,
  getNewArrivalSectionContent,
  getPageMetaData,
  getStudiosData,
} from "@/Services/SectionsApis";

export async function generateMetadata() {
  try {
    const metaData = await getPageMetaData("home");
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
  const bestSeller = await fetchBestSellers("all");

  const [
    homeHeroSectionContent,
    homeNewArrivalSectionContent,
    homeHotTrendsSectionContent,
    highlightsSectionData,
    bestSellerProducts,
    homeSectionDetails,
    homeDreamBigSectionContent,
    studiosData,
    marketsData,
    bestSellers
  ] = await Promise.all([
    getHomeHeroSectionContent(),
    getNewArrivalSectionContent(),
    getHotTrendsSection(),
    getHighlightsSection("HighlightsProducts"),
    getBestSellerProducts(bestSeller, 12),
    getHomeSectionDetails(),
    getDreamBigSectionContent(),
    getStudiosData(),
    getMarketsData(),
    fetchBestSellers()
  ]);

  return (
    <HomePage
      heroSectionContent={homeHeroSectionContent}
      newArrivalSectionContent={homeNewArrivalSectionContent}
      hotTrendsSectionContent={homeHotTrendsSectionContent}
      bestSellerProducts={bestSellerProducts}
      highlightsSectionData={highlightsSectionData}
      homeSectionDetails={homeSectionDetails}
      dreamBigSectionContent={homeDreamBigSectionContent}
      studiosData={studiosData}
      marketsData={marketsData}
      bestSellers={bestSellers}
    />
  );
}

export const dynamic = 'force-static'