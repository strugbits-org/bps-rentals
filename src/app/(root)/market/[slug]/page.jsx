import MarketPage from "@/components/Market/Index";
import { fetchBestSellers, fetchComingSoon, getBestSellerProducts } from "@/Services/ProductsApis";
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
import logError, { logUpstreamError } from "@/Utils/ServerActions";
import { buildMetadata } from "@/Utils/Utils";
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
    if (!selectedMarketData) {
      throw new Error(`Market Data not found for slug: ${slug}`);
    }

    const metadata = buildMetadata(
      selectedMarketData.cardname + title,
      selectedMarketData.description,
      noFollowTag
    );

    return metadata;
  } catch (error) {
    logError("Error in metadata:", error);

    const metaData = await getPageMetaData("error");
    const { title, noFollowTag } = metaData;

    return buildMetadata(title, noFollowTag);
  }
}

export const generateStaticParams = async () => {
  try {
    const marketsData = await getMarketsData();
    const paths = marketsData.map((data) => ({ slug: data.slug }));
    return paths;
  } catch (error) {
    logError("Error generating static params(market page):", error);
    return [];
  }
}

export default async function Page({ params }) {
  const slug = decodeURIComponent(params.slug);

  let marketSection;
  try {
    marketSection = await getMarketSection(slug, { throwOnError: true });
  } catch (error) {
    logUpstreamError("Upstream data fetch failed (market page):", error);
    throw error;
  }

  // Lookup OK but no market with this slug => genuine 404.
  if (!marketSection) {
    notFound();
  }

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
    bestSellers,
    comingSoon
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
    fetchBestSellers(),
    fetchComingSoon()
  ]);

  return (
    <MarketPage
      slug={slug}
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
      comingSoon={comingSoon}
    />
  );
}
