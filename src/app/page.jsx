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
  getStudiosData,
} from "@/Services/SectionsApis";

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
  ] = await Promise.all([
    getHomeHeroSectionContent(),
    getNewArrivalSectionContent(),
    getHotTrendsSection(),
    getHighlightsSection("HighlightsProducts"),
    getBestSellerProducts(bestSeller, 12),
    getHomeSectionDetails(),
    getDreamBigSectionContent(),
    getStudiosData(),
    getMarketsData()
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
    />
  );
}

export const dynamic = 'force-static'