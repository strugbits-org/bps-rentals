"use client";
import { useEffect } from "react";
import LetsGetSocial from "../Common/Sections/SocialSection";
import Studios from "../Common/Sections/StudiosSection";
import Markets from "../Common/Sections/MarketSection";
import Highlights from "../Common/Sections/HighlightsSection";
import DreamBig from "../Common/Sections/DreamBigSection";
import { HotTrendsHome } from "../Common/Sections/HotTrendsSection";
import NewArrival from "../Common/Sections/NewArrivalSection";
import { markPageLoaded } from "@/Utils/AnimationFunctions";
import BannerHome from "./BannerHome";
import BestSellersHome from "./BestSellersHome";

const HomePage = ({
  heroSectionContent,
  newArrivalSectionContent,
  hotTrendsSectionContent,
  studioSectionContent,
  dreamBigSectionContent,
  studiosData,
  marketsData,
}) => {

  useEffect(() => {
    markPageLoaded();
  }, []);
  return (
    <>
      <BannerHome content={heroSectionContent}/>
      <BestSellersHome content={heroSectionContent}/>
      <NewArrival content={newArrivalSectionContent} />
      <Highlights />
      <HotTrendsHome content={hotTrendsSectionContent} />
      <Markets marketsData={marketsData} />
      <Studios content={studioSectionContent} studiosData={studiosData} />
      <DreamBig content={dreamBigSectionContent} />
      <LetsGetSocial />
    </>
  );
};

export default HomePage;
