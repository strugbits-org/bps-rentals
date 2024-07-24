import MarketPage from "@/components/Market/Index";
import { getPageContentRentals } from "@/Services/HomeApis";
import { fetchBestSellers, getBestSellerProducts } from "@/Services/ProductsApis";
import {
  getDreamBigSectionContent,
  getHighlightsSection,
  getHomeSectionDetails,
  getMarketsData,
  getMarketSection,
  getNewArrivalSectionContent,
  getPeopleReviewSliderData,
  getStudiosData,
} from "@/Services/SectionsApis";

export default async function Page({ params }) {
  const marketSection = await getMarketSection(params.id);
  const bestSeller = await fetchBestSellers(params.id);
  const collectionIds = {
    "tradeshows": "HighlightsTradeshow",
    "Social": "HighlightsSocial",
    "weddings": "HighlightsWedding",
    "corporate": "HighlightsCorporate",
  }
  const highlightsCollection = collectionIds[params.id];

  const [
    homeNewArrivalSectionContent,
    homeSectionDetails,
    pageContentRentals,
    homeDreamBigSectionContent,
    studiosData,
    marketsData,
    peopleReviewSliderData,
    highlightsSectionData,
    bestSellerProducts,
  ] = await Promise.all([
    getNewArrivalSectionContent(),
    getHomeSectionDetails(),
    getPageContentRentals(),
    getDreamBigSectionContent(),
    getStudiosData(),
    getMarketsData(),
    getPeopleReviewSliderData(),
    getHighlightsSection(highlightsCollection),
    getBestSellerProducts(bestSeller, 6),
  ]);

  return (
    <MarketPage
      marketSection={marketSection}
      newArrivalSectionContent={homeNewArrivalSectionContent}
      pageContentRentals={pageContentRentals}
      homeSectionDetails={homeSectionDetails}
      highlightsSectionData={highlightsSectionData}
      dreamBigSectionContent={homeDreamBigSectionContent}
      studiosData={studiosData}
      marketsData={marketsData}
      peopleReviewSliderData={peopleReviewSliderData}
      bestSellerProducts={{ ...bestSellerProducts, bestSellerId: bestSeller }}
    />
  );
}
