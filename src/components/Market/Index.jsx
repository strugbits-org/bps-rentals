"use client";
import { useEffect } from "react";
import { markPageLoaded } from "@/Utils/AnimationFunctions";
import Markets from "../Common/Sections/MarketSection";
import Studios from "../Common/Sections/StudiosSection";
import DreamBig from "../Common/Sections/DreamBigSection";
import NewArrival from "../Common/Sections/NewArrivalSection";
import Highlights from "../Common/Sections/HighlightsSection";
import AnimateLink from "../Common/AnimateLink";
import PeopleReviewSlider from "../Common/Sections/PeopleReviewSlider";
import { MarketIntroSection } from "./MarketIntroSection";
import { MarketBestSeller } from "./MarketBestSeller";
import { MarketSlider } from "./MarketSlider";

const MarketPage = ({
  marketSection,
  newArrivalSectionContent,
  homeSectionDetails,
  dreamBigSectionContent,
  studiosData,
  marketsData,
  peopleReviewSliderData,
  highlightsSectionData,
  bestSellerProducts
}) => {
  useEffect(() => {
    setTimeout(markPageLoaded, 500);
  }, []);
  return (
    <>
      <MarketIntroSection data={marketSection} />
      <MarketBestSeller products={bestSellerProducts} />
      <NewArrival content={newArrivalSectionContent} />
      <Highlights pageContent={homeSectionDetails} data={highlightsSectionData} />
      <MarketSlider />
      <PeopleReviewSlider data={peopleReviewSliderData} homeSectionDetails={homeSectionDetails} />
      <Markets marketsData={marketsData} />
      <Studios content={homeSectionDetails} studiosData={studiosData} />
      <DreamBig content={dreamBigSectionContent} />
    </>
  );
};

export default MarketPage;
