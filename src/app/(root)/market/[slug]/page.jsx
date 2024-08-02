import MarketPage from "@/components/Market/Index";
import { fetchBestSellers, getBestSellerProducts } from "@/Services/ProductsApis";
import {
  getDreamBigSectionContent,
  getHighlightsSection,
  getHomeSectionDetails,
  getMarketsData,
  getMarketSection,
  getMarketSliderData,
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

  const marketSection = await getMarketSection(params.slug);
  const bestSeller = await fetchBestSellers(params.slug);
  const collectionIds = {
    "tradeshows": "HighlightsTradeshow",
    "social": "HighlightsSocial",
    "weddings": "HighlightsWedding",
    "corporate": "HighlightsCorporate",
  }
  const highlightsCollection = collectionIds[params.slug];

  const [
    homeNewArrivalSectionContent,
    homeSectionDetails,
    homeDreamBigSectionContent,
    marketSliderData,
    studiosData,
    marketsData,
    peopleReviewSliderData,
    highlightsSectionData,
    bestSellerProducts,
  ] = await Promise.all([
    getNewArrivalSectionContent(params.slug),
    getHomeSectionDetails(),
    getDreamBigSectionContent(),
    getMarketSliderData(marketSection._id),
    getStudiosData(),
    getMarketsData(),
    getPeopleReviewSliderData(),
    getHighlightsSection(highlightsCollection),
    getBestSellerProducts(bestSeller),
  ]);

  return (
    <MarketPage
      marketSection={marketSection}
      newArrivalSectionContent={homeNewArrivalSectionContent}
      homeSectionDetails={homeSectionDetails}
      highlightsSectionData={highlightsSectionData}
      dreamBigSectionContent={homeDreamBigSectionContent}
      marketSliderData={marketSliderData}
      studiosData={studiosData}
      marketsData={marketsData}
      peopleReviewSliderData={peopleReviewSliderData}
      bestSellerProducts={bestSellerProducts}
    />
  );
}
