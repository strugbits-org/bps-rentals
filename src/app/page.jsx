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
    socialSectionDetails,
    socialSectionBlogs,
    instaFeed
  ] = await Promise.all([
    getHomePageContent(),
    getHomeHeroSectionContent(),
    getNewArrivalSectionContent(),
    getHotTrendsSectionContent(),
    getStudioSectionContent(),
    getDreamBigSectionContent(),
    getStudiosData(),
    getMarketsData(),
    getSocialSectionDetails(),
    getSocialSectionBlogs(),
    fetchInstaFeed(),
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
      socialSectionDetails={socialSectionDetails}
      socialSectionBlogs={socialSectionBlogs}
      instaFeed={instaFeed}
    />
  );
}
