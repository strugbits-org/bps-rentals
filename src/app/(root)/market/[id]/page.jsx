import MarketPage from "@/components/Market/Index";
import {
  getDreamBigSectionContent,
  getHomeSectionDetails,
  getMarketsData,
  getMarketSection,
  getNewArrivalSectionContent,
  getPeopleReviewSliderData,
  getStudiosData,
} from "@/Services/SectionsApis";


export default async function Page({params}) {
  const marketSection = await getMarketSection(params.id);

  const [
    homeNewArrivalSectionContent,
    homeSectionDetails,
    homeDreamBigSectionContent,
    studiosData,
    marketsData,
    peopleReviewSliderData
  ] = await Promise.all([
    getNewArrivalSectionContent(),
    getHomeSectionDetails(),
    getDreamBigSectionContent(),
    getStudiosData(),
    getMarketsData(),
    getPeopleReviewSliderData()
  ]);
  return (
    <MarketPage
      marketSection={marketSection}
      newArrivalSectionContent={homeNewArrivalSectionContent}
      homeSectionDetails={homeSectionDetails}
      dreamBigSectionContent={homeDreamBigSectionContent}
      studiosData={studiosData}
      marketsData={marketsData}
      peopleReviewSliderData={peopleReviewSliderData}
    />
  );
}
