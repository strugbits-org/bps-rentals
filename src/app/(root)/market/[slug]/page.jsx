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
  getPageMetaData,
  getPeopleReviewSliderData,
  getStudiosData,
} from "@/Services/SectionsApis";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  try {
    const slug = decodeURIComponent(params.slug);

    const [
      metaData,
      marketsData,
    ] = await Promise.all([
      getPageMetaData("market"),
      getMarketsData(),
    ]);
    const { title, noFollowTag } = metaData;
    const selectedMarketData = marketsData.find(x => x.slug === slug);
    const metadata = {
      title: selectedMarketData.cardname + title,
      description: selectedMarketData.description,
    };

    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION" && noFollowTag) {
      metadata.robots = "noindex,nofollow";
    }
    
    return metadata;
  } catch (error) {
    console.log("Error:", error);
  }
}


export const generateStaticParams = async () => {
  try {
    const marketsData = await getMarketsData();
    const paths = marketsData.map((data) => ({ slug: data.slug }));
    return [];
  } catch (error) {
    console.log("Error:", error);
  }
}

export default async function Page({ params }) {
  const slug = decodeURIComponent(params.slug);

  const marketSection = await getMarketSection(slug);
  if (!marketSection) notFound();
  const bestSeller = await fetchBestSellers(slug);

  const collectionIds = {
    "tradeshows": "HighlightsTradeshow",
    "social": "HighlightsSocial",
    "weddings": "HighlightsWedding",
    "corporate": "HighlightsCorporate",
  }
  const highlightsCollection = collectionIds[slug];

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
    bestSellers
  ] = await Promise.all([
    getNewArrivalSectionContent(slug),
    getHomeSectionDetails(),
    getDreamBigSectionContent(),
    getMarketSliderData(marketSection._id),
    getStudiosData(),
    getMarketsData(),
    getPeopleReviewSliderData(),
    getHighlightsSection(highlightsCollection),
    getBestSellerProducts(bestSeller),
    fetchBestSellers()
  ]);

  return (
    <MarketPage
      marketSection={marketSection.rentalsMarket}
      newArrivalSectionContent={homeNewArrivalSectionContent}
      homeSectionDetails={homeSectionDetails}
      highlightsSectionData={highlightsSectionData}
      dreamBigSectionContent={homeDreamBigSectionContent}
      marketSliderData={marketSliderData}
      studiosData={studiosData}
      marketsData={marketsData}
      peopleReviewSliderData={peopleReviewSliderData}
      bestSellerProducts={bestSellerProducts}
      bestSellers={bestSellers}
    />
  );
}
