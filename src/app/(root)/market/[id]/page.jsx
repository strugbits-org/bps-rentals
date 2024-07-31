import MarketPage from "@/components/Market/Index";
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

export const generateStaticParams = async () => {
  try {
    const marketsData = await getMarketsData();
    const paths = marketsData.map((data) => ({ slug: data.slug }));
    return paths;
  } catch (error) {
    console.log("Error:", error);
  }
}

export default async function Page({ params }) {

  const marketSection = await getMarketSection(params.id);
  const bestSeller = await fetchBestSellers(params.id);
  const collectionIds = {
    "tradeshows": "HighlightsTradeshow",
    "social": "HighlightsSocial",
    "weddings": "HighlightsWedding",
    "corporate": "HighlightsCorporate",
  }
  const highlightsCollection = collectionIds[params.id];

  const [
    homeNewArrivalSectionContent,
    homeSectionDetails,
    homeDreamBigSectionContent,
    studiosData,
    marketsData,
    peopleReviewSliderData,
    highlightsSectionData,
    bestSellerProducts,
  ] = await Promise.all([
    getNewArrivalSectionContent(params.id),
    getHomeSectionDetails(),
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
