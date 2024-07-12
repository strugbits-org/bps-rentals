import HomePage from "@/components/Home/Index";
import {
  getHomeDreamBigSectionContent,
  getHomeHeroSectionContent,
  getHomeHotTrendsSectionContent,
  getHomeNewArrivalSectionContent,
  getHomeStudioSectionContent,
  getMarketsData,
  getStudiosData,
} from "@/Services/HomeApis";

export default async function Page() {
  const [
    homeHeroSectionContent,
    homeNewArrivalSectionContent,
    homeHotTrendsSectionContent,
    homeStudioSectionContent,
    homeDreamBigSectionContent,
    studiosData,
    marketsData,
  ] = await Promise.all([
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
