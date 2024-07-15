import HomePage from "@/components/Home/Index";
import {
  getHomeHeroSectionContent,
  getHomePageContent,
} from "@/Services/HomeApis";

import {
  fetchInstaFeed,
  getDreamBigSectionContent,
  getHotTrendsSectionContent,
  getMarketsData,
  getNewArrivalSectionContent,
  getSocialSectionBlogs,
  getSocialSectionDetails,
  getStudiosData,
  getStudioSectionContent,
} from "@/Services/SectionsApis";

export default async function Page() {
  const [
    homePageContent,
    homeHeroSectionContent,
    homeNewArrivalSectionContent,
    homeHotTrendsSectionContent,
    homeStudioSectionContent,
    homeDreamBigSectionContent,
    studiosData,
    marketsData,
  ] = await Promise.all([
    getHomePageContent(),
    getHomeHeroSectionContent(),
    getNewArrivalSectionContent(),
    getHotTrendsSectionContent(),
    getStudioSectionContent(),
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
      studioSectionContent={homeStudioSectionContent}
      dreamBigSectionContent={homeDreamBigSectionContent}
      studiosData={studiosData}
      marketsData={marketsData}
    />
  );
}
