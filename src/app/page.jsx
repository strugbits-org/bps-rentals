import HomePage from "@/components/Home/Index";
import {
  getHomeHeroSectionContent,
} from "@/Services/HomeApis";
import { fetchBestSellers, getBestSellerProducts } from "@/Services/ProductsApis";

import {
  getDreamBigSectionContent,
  getHighlightsSection,
  getHomeSectionDetails,
  getHotTrendsSectionContent,
  getMarketsData,
  getNewArrivalSectionContent,
  getStudiosData,
} from "@/Services/SectionsApis";

export default async function Page() {
  const bestSeller = await fetchBestSellers();

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
    getHotTrendsSectionContent(),
    getHighlightsSection("HighlightsProducts"),
    getBestSellerProducts(bestSeller),
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
      bestSellerProducts={bestSellerProducts.items}
      highlightsSectionData={highlightsSectionData}
      homeSectionDetails={homeSectionDetails}
      dreamBigSectionContent={homeDreamBigSectionContent}
      studiosData={studiosData}
      marketsData={marketsData}
    />
  );
}
