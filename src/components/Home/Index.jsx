"use client";
import { useEffect } from "react";
import { SocialSection } from "../Common/Sections/SocialSection";
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
  pageContent,
  heroSectionContent,
  newArrivalSectionContent,
  hotTrendsSectionContent,
  bestSellerProducts,
  highlightsSectionData,
  homeSectionDetails,
  dreamBigSectionContent,
  studiosData,
  marketsData
}) => {

  useEffect(() => {
    markPageLoaded();
  }, [])
  
  
  return (
    <>
      <BannerHome content={heroSectionContent} />
      <BestSellersHome products={bestSellerProducts} content={heroSectionContent} />
      <NewArrival content={newArrivalSectionContent} />
      <Highlights pageContent={pageContent} data={highlightsSectionData} />
      <HotTrendsHome content={hotTrendsSectionContent} />
      <Markets pageContent={pageContent} marketsData={marketsData} />
      <Studios content={homeSectionDetails} studiosData={studiosData} />
      <DreamBig content={dreamBigSectionContent} />
    </>
  );
};

export default HomePage;
