"use client";
import { useEffect } from "react";
import LetsGetSocial, { SocialSection } from "../Common/Sections/SocialSection";
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
  studioSectionContent,
  dreamBigSectionContent,
  studiosData,
  marketsData,
  socialSectionDetails,
  socialSectionBlogs,
  instaFeed
}) => {
  
  return (
    <>
      <BannerHome content={heroSectionContent} />
      <BestSellersHome content={heroSectionContent} />
      <NewArrival content={newArrivalSectionContent} />
      <Highlights pageContent={pageContent} />
      <HotTrendsHome content={hotTrendsSectionContent} />
      <Markets pageContent={pageContent} marketsData={marketsData} />
      <Studios content={studioSectionContent} studiosData={studiosData} />
      <DreamBig content={dreamBigSectionContent} />
      <SocialSection data={socialSectionDetails} posts={socialSectionBlogs} insta_feed={instaFeed} />
      {/* <LetsGetSocial /> */}
    </>
  );
};

export default HomePage;
