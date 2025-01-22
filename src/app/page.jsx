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
  getOurClientsSectionData,
  getPageMetaData,
  getStudiosData,
} from "@/Services/SectionsApis";
import logError from "@/Utils/ServerActions";

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
    logError("Error in metadata(home page):", error);
  }
}

export default async function Page() {
  try {
    const bestSeller = await fetchBestSellers("all");

    const [
      homeHeroSectionContent,
      homeNewArrivalSectionContent,
      homeHotTrendsSectionContent,
      highlightsSectionData,
      bestSellerProducts,
      homeSectionDetails,
      homeDreamBigSectionContent,
      ourClientsSectionData,
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
      getOurClientsSectionData(),
      getStudiosData(),
      getMarketsData(),
      fetchBestSellers()
    ]);

    const clientsGallery = ourClientsSectionData.find(x => x.slug === "/")?.images || [];

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
        clientsGallery={clientsGallery}
      />
    );
  } catch (error) {
    logError("Error fetching home page data:", error);
  }
}

export const dynamic = 'force-static'