"use client";
import { useEffect, useRef, useState } from "react";
import Studios from "../Common/Sections/StudiosSection";
import Markets from "../Common/Sections/MarketSection";
import Highlights from "../Common/Sections/HighlightsSection";
import DreamBig from "../Common/Sections/DreamBigSection";
import { HotTrendsCategory } from "../Common/Sections/HotTrendsSection";
import NewArrival from "../Common/Sections/NewArrivalSection";
import { markPageLoaded } from "@/Utils/AnimationFunctions";
import BannerHome from "./BannerHome";
import BestSellersHome from "./BestSellersHome";
import { getSavedProductData } from "@/Services/ProductsApis";
import CartModal from "../Common/Modals/CartModal";
import logError from "@/Utils/ServerActions";
import ClientsSection from "../Common/Sections/ClientsSection";
import { useCookies } from "react-cookie";

const HomePage = ({
  heroSectionContent,
  newArrivalSectionContent,
  hotTrendsSectionContent,
  bestSellerProducts,
  highlightsSectionData,
  homeSectionDetails,
  dreamBigSectionContent,
  studiosData,
  marketsData,
  bestSellers,
  clientsGallery
}) => {
  const [savedProductsData, setSavedProductsData] = useState([]);
  const [selectedProductData, setSelectedProductData] = useState(null);
  const [productSnapshots, setProductSnapshots] = useState();
  const [selectedVariantData, setSelectedVariantData] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [productFilteredVariantData, setProductFilteredVariantData] = useState();
  const [cookies, setCookie, removeCookie] = useCookies(["homeScrollPosition", "homeLoadPrevState", "homeSlideIndex"]);
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
      const currentActiveIndex = productData.variantData.findIndex(x => {
        if (x.variant._id) {
          return x.variant._id === activeVariant.variant._id;
        } else if (x.variant.variantId) {
          return x.variant.variantId === activeVariant.variant.variantId;
        }
        return false;
      });
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
  }

  const savePageState = (slideIndex) => {
    const scrollPosition = window.scrollY;
    setCookie("homeScrollPosition", scrollPosition, { path: "/" });
    setCookie("homeSlideIndex", slideIndex, { path: "/" });
  }

  const clearPageState = () => {
    removeCookie("homeScrollPosition", { path: "/" });
    removeCookie("homeSlideIndex", { path: "/" });
    removeCookie("homeLoadPrevState", { path: "/" });
  };

  const handlePageLoad = () => {
    if (cookies.homeLoadPrevState) {
      setTimeout(() => {
        if (cookies.homeScrollPosition) window.scrollTo(0, cookies.homeScrollPosition);
        if (cookies.homeSlideIndex) {
          const waitForSwiper = setInterval(() => {
            if (sliderRef.current?.swiper) {
              clearInterval(waitForSwiper);
              const swiper = sliderRef.current.swiper;
              swiper.updateSlides();
              swiper.slideTo(cookies.homeSlideIndex);
            }
          }, 3e2);    
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
    };
  };

  useEffect(() => {
    console.log("Page Loaded");
    
    handlePageLoad();
    fetchSavedProducts();
  }, []);

  return (
    <>
      <BannerHome content={heroSectionContent} />
      <BestSellersHome products={bestSellerProducts} content={heroSectionContent} savedProductsData={savedProductsData} setSavedProductsData={setSavedProductsData} getSelectedProductSnapShots={getSelectedProductSnapShots} />
      <NewArrival content={newArrivalSectionContent} />
      <Highlights pageContent={homeSectionDetails} data={highlightsSectionData} savedProductsData={savedProductsData} setSavedProductsData={setSavedProductsData} getSelectedProductSnapShots={getSelectedProductSnapShots} savePageState={savePageState} sliderRef={sliderRef} />
      <HotTrendsCategory pageContent={homeSectionDetails} data={hotTrendsSectionContent} />
      <Markets pageContent={homeSectionDetails} marketsData={marketsData} />
      <Studios content={homeSectionDetails} studiosData={studiosData} />
      <DreamBig content={dreamBigSectionContent} />
      <ClientsSection data={clientsGallery} />
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
    </>
  );
};

export default HomePage;
