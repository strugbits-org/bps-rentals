"use client";
import { useEffect, useRef, useState } from "react";
import { markPageLoaded, updatedWatched } from "@/Utils/AnimationFunctions";
import Markets from "../Common/Sections/MarketSection";
import Studios from "../Common/Sections/StudiosSection";
import DreamBig from "../Common/Sections/DreamBigSection";
import NewArrival from "../Common/Sections/NewArrivalSection";
import Highlights from "../Common/Sections/HighlightsSection";
import PeopleReviewSlider from "../Common/Sections/PeopleReviewSlider";
import { MarketIntroSection } from "./MarketIntroSection";
import { MarketBestSeller } from "./MarketBestSeller";
import { MarketSlider } from "./MarketSlider";
import { getSavedProductData } from "@/Services/ProductsApis";
import CartModal from "../Common/Modals/CartModal";
import logError from "@/Utils/ServerActions";
import { useCookies } from "react-cookie";

const MarketPage = ({
  slug,
  marketSection,
  newArrivalSectionContent,
  homeSectionDetails,
  dreamBigSectionContent,
  marketSliderData,
  studiosData,
  marketsData,
  peopleReviewSliderData,
  highlightsSectionData,
  bestSellerProducts,
  bestSellers
}) => {

  const pageSize = 6;
  const [pageLimit, setPageLimit] = useState(pageSize);
  const [cookies, setCookie, removeCookie] = useCookies(["marketScrollPosition", "marketPageSize", "marketLoadPrevState", "marketSlug"]);
  const [savedProductsData, setSavedProductsData] = useState([]);
  const [selectedProductData, setSelectedProductData] = useState(null);
  const [productSnapshots, setProductSnapshots] = useState();
  const [selectedVariantData, setSelectedVariantData] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [productFilteredVariantData, setProductFilteredVariantData] = useState();
  const sliderRef = useRef(null);

  const getSelectedProductSnapShots = async (productData, activeVariant) => {
    setSelectedProductData(productData);
    try {
      const { productSnapshotData, productVariantsData } = productData;

      let dataMap = new Map(
        productVariantsData.map((item) => [item.sku.toLowerCase(), item])
      );
      let filteredVariantData;
      if (productVariantsData && productData) {
        filteredVariantData = productData.variantData.filter((variant) => {
          const normalizedSku = variant.sku.toLowerCase();
          if (dataMap.has(normalizedSku)) {
            const dataItem = dataMap.get(normalizedSku);
            variant.variant.variantId = dataItem._id;
            return true;
          }
          return false;
        });
      }
      setProductSnapshots(productSnapshotData);
      setProductFilteredVariantData(filteredVariantData);
      const currentActiveIndex = productData.variantData.findIndex(x => x.variant._id === activeVariant.variant._id);
      const currentActive = productData.variantData[currentActiveIndex];

      if (filteredVariantData && currentActive && filteredVariantData.length > 0) {
        handleImageChange({
          index: currentActiveIndex,
          selectedVariantData: currentActive.variant,
          productSnapshots: productSnapshotData,
          modalUrl: currentActive.zipUrl,
        });
      }
    } catch (error) {
      logError("Error:", error);
    }
  };

  const handleImageChange = ({
    index,
    selectedVariantData,
    productSnapshots,
    modalUrl,
  }) => {
    if (productSnapshots) {
      const selectedVariantFilteredData = productSnapshots.find(
        (variant) => variant.colorVariation === selectedVariantData.variantId
      );

      if (selectedVariantFilteredData && selectedVariantFilteredData?.images) {
        const combinedVariantData = {
          ...selectedVariantData,
          ...selectedVariantFilteredData,
          modalUrl: modalUrl,
        };

        setSelectedVariantIndex(index);
        setSelectedVariantData(combinedVariantData);
      } else {
        const combinedVariantData = {
          ...selectedVariantData,
          ...selectedVariantFilteredData,
          modalUrl: modalUrl,
          images: [{ src: selectedVariantData.imageSrc }],
        };
        setSelectedVariantIndex(index);
        setSelectedVariantData(combinedVariantData);
      }
    }
  };

  const fetchSavedProducts = async () => {
    try {
      const savedProducts = await getSavedProductData();
      setSavedProductsData(savedProducts);
    } catch (error) {
      logError("Error while fetching Saved Product", error);
    }
  };

  const handleAutoSeeMore = () => {
    setPageLimit((prev) => prev + pageSize);
    updatedWatched(true);
  }

  const savePageState = (slideIndex) => {
    if (slideIndex) {
      setCookie("marketSlideIndex", slideIndex, { path: "/" });
    }

    const scrollPosition = window.scrollY;
    setCookie("marketScrollPosition", scrollPosition, { path: "/" });
    setCookie("marketPageSize", pageLimit, { path: "/" });
    setCookie("marketSlug", slug, { path: "/" });
    setCookie("marketLoadPrevState", true, { path: "/" });
  }

  const clearPageState = () => {
    removeCookie("marketScrollPosition", { path: "/" });
    removeCookie("marketPageSize", { path: "/" });
    removeCookie("marketLoadPrevState", { path: "/" });
    removeCookie("marketSlideIndex", { path: "/" });
    removeCookie("marketSlug", { path: "/" });
  };

  useEffect(() => {
    if (cookies.marketLoadPrevState && cookies.marketSlug === slug) {
      if (cookies.marketPageSize) setPageLimit(cookies.marketPageSize);
      setTimeout(() => {
        if (cookies.marketScrollPosition) window.scrollTo(0, cookies.marketScrollPosition);
        if (cookies.marketSlideIndex) {
          setTimeout(() => {
            const swiper = sliderRef.current.swiper;
            if (swiper) {
              swiper.updateSlides();
              swiper.slideTo(cookies.marketSlideIndex);
            }
          }, 2e3);
        }
        setTimeout(() => {
          markPageLoaded(true, false);
          clearPageState();
        }, 500);
      }, 500);
    } else {
      setTimeout(() => {
        markPageLoaded();
        clearPageState();
      }, 500);
    }
    fetchSavedProducts();
  }, [])

  return (
    <>
      <CartModal
        productData={selectedProductData}
        setProductData={setSelectedProductData}
        productSnapshots={productSnapshots}
        productFilteredVariantData={productFilteredVariantData}
        selectedVariantData={selectedVariantData}
        setSelectedVariantData={setSelectedVariantData}
        handleImageChange={handleImageChange}
        selectedVariantIndex={selectedVariantIndex}
        setProductSnapshots={setProductSnapshots}
        setProductFilteredVariantData={setProductFilteredVariantData}
        bestSeller={bestSellers}
        savedProductsData={savedProductsData}
        setSavedProductsData={setSavedProductsData}
      />
      <MarketIntroSection data={marketSection} />
      <MarketBestSeller products={bestSellerProducts} savedProductsData={savedProductsData} setSavedProductsData={setSavedProductsData} getSelectedProductSnapShots={getSelectedProductSnapShots} pageLimit={pageLimit} handleAutoSeeMore={handleAutoSeeMore} savePageState={savePageState} />
      <NewArrival content={newArrivalSectionContent} />
      <Highlights pageContent={homeSectionDetails} data={highlightsSectionData} savedProductsData={savedProductsData} setSavedProductsData={setSavedProductsData} getSelectedProductSnapShots={getSelectedProductSnapShots} savePageState={savePageState} sliderRef={sliderRef} />
      <MarketSlider content={homeSectionDetails} marketSliderData={marketSliderData} />
      <PeopleReviewSlider data={peopleReviewSliderData} homeSectionDetails={homeSectionDetails} />
      <Markets marketsData={marketsData} />
      <Studios content={homeSectionDetails} studiosData={studiosData} />
      <DreamBig content={dreamBigSectionContent} />
    </>
  );
};

export default MarketPage;
