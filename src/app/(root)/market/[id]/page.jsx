import MarketPage from "@/components/Market/Index";
import {
  getDreamBigSectionContent,
  getMarketsData,
  getNewArrivalSectionContent,
  getStudiosData,
  getStudioSectionContent,
} from "@/Services/SectionsApis";


export default async function Page() {
  const [
    homeNewArrivalSectionContent,
    homeStudioSectionContent,
    homeDreamBigSectionContent,
    studiosData,
    marketsData,
  ] = await Promise.all([
    getNewArrivalSectionContent(),
    getStudioSectionContent(),
    getDreamBigSectionContent(),
    getStudiosData(),
    getMarketsData(),
  ]);
  return (
    <MarketPage
      newArrivalSectionContent={homeNewArrivalSectionContent}
      studioSectionContent={homeStudioSectionContent}
      dreamBigSectionContent={homeDreamBigSectionContent}
      studiosData={studiosData}
      marketsData={marketsData}
    />
  );
}
