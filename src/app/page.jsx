import HomePage from "@/components/Home/Index";
import {
  getDreamBigSectionContent,
  getHomeHeroSectionContent,
  getHomeHotTrendsSectionContent,
  getNewArrivalSectionContent,
  getHomePageContent,
  getStudioSectionContent,
  getMarketsData,
  getStudiosData,
} from "@/Services/HomeApis";

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
    getHomeHotTrendsSectionContent(),
    getStudioSectionContent(),
    getDreamBigSectionContent(),
    getStudiosData(),
    getMarketsData(),
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
