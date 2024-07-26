import HomePage from "@/components/Home/Index";
import {
  getHomeHeroSectionContent,
  getPageContentRentals,
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
    homePageContent,
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
    getPageContentRentals(),
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
      pageContent={homePageContent}
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
