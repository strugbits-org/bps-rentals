import HomePage from "@/components/Home/Index";
import {
  getHomeDreamBigSectionContent,
  getHomeHeroSectionContent,
  getHomeHotTrendsSectionContent,
  getHomeNewArrivalSectionContent,
  getHomePageContent,
  getHomeStudioSectionContent,
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
    getHomeNewArrivalSectionContent(),
    getHomeHotTrendsSectionContent(),
    getHomeStudioSectionContent(),
    getHomeDreamBigSectionContent(),
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
