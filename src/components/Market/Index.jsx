"use client";
import { useEffect } from "react";
import { markPageLoaded } from "@/Utils/AnimationFunctions";
import Markets from "../Common/Sections/MarketSection";
import Studios from "../Common/Sections/StudiosSection";
import DreamBig from "../Common/Sections/DreamBigSection";
import NewArrival from "../Common/Sections/NewArrivalSection";
import Highlights from "../Common/Sections/HighlightsSection";
import PeopleReviewSlider from "../Common/Sections/PeopleReviewSlider";
import { MarketIntroSection } from "./MarketIntroSection";
import { MarketBestSeller } from "./MarketBestSeller";
import { MarketSlider } from "./MarketSlider";

const MarketPage = ({
  marketSection,
  newArrivalSectionContent,
  homeSectionDetails,
  dreamBigSectionContent,
  marketSliderData,
  studiosData,
  marketsData,
  peopleReviewSliderData,
  highlightsSectionData,
  bestSellerProducts
}) => {
  useEffect(() => {
    markPageLoaded();
  }, []);
  return (
    <>
      <MarketIntroSection data={marketSection} />
      <MarketBestSeller products={bestSellerProducts} />
      <NewArrival content={newArrivalSectionContent} />
      <Highlights pageContent={homeSectionDetails} data={highlightsSectionData} />
      <MarketSlider content={homeSectionDetails} marketSliderData={marketSliderData} />
      <PeopleReviewSlider data={peopleReviewSliderData} homeSectionDetails={homeSectionDetails} />
      <Markets marketsData={marketsData} />
      <Studios content={homeSectionDetails} studiosData={studiosData} />
      <DreamBig content={dreamBigSectionContent} />
    </>
  );
};

export default MarketPage;
