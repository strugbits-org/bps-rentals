"use client";
import { useEffect, useState } from "react";
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
import { getSavedProductData } from "@/Services/ProductsApis";
import CartModal from "../Common/Modals/CartModal";
import logError from "@/Utils/ServerActions";

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
  bestSellerProducts,
  bestSellers
}) => {

  const [savedProductsData, setSavedProductsData] = useState([]);
  const [selectedProductData, setSelectedProductData] = useState(null);
  const [productSnapshots, setProductSnapshots] = useState();
  const [selectedVariantData, setSelectedVariantData] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [productFilteredVariantData, setProductFilteredVariantData] =
    useState();

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
  }

  useEffect(() => {
    setTimeout(markPageLoaded, 200);
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
      <MarketBestSeller products={bestSellerProducts}  savedProductsData={savedProductsData} setSavedProductsData={setSavedProductsData} getSelectedProductSnapShots={getSelectedProductSnapShots} />
      <NewArrival content={newArrivalSectionContent} />
      <Highlights pageContent={homeSectionDetails} data={highlightsSectionData} savedProductsData={savedProductsData} setSavedProductsData={setSavedProductsData} getSelectedProductSnapShots={getSelectedProductSnapShots} />
      <MarketSlider content={homeSectionDetails} marketSliderData={marketSliderData} />
      <PeopleReviewSlider data={peopleReviewSliderData} homeSectionDetails={homeSectionDetails} />
      <Markets marketsData={marketsData} />
      <Studios content={homeSectionDetails} studiosData={studiosData} />
      <DreamBig content={dreamBigSectionContent} />
    </>
  );
};

export default MarketPage;
