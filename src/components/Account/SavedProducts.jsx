"use client";

import { useEffect, useState } from "react";
import { markPageLoaded, updatedWatched } from "@/Utils/AnimationFunctions";
import {
  getSavedProductData,
} from "@/Services/ProductsApis";
import ProductCard from "../Category/ProductCard";
import CartModal from "../Common/Modals/CartModal";
import AutoClickWrapper from "../Common/AutoClickWrapper";
import logError from "@/Utils/ServerActions";

const SavedProducts = ({ productsVariantImagesData, productsVariantsData }) => {


  const pageSize = 20;
  const [pageLimit, setPageLimit] = useState(pageSize);

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

  const handleAutoSeeMore = () => {
    setPageLimit((prev) => prev + pageSize);
    updatedWatched(true);
  }

  const fetchSavedProducts = async () => {
    try {
      const savedProducts = await getSavedProductData();
      const items = savedProducts.map((product) => {
        if (!product._id) return;
        const productId = product.product._id;
        product.productSnapshotData = productsVariantImagesData.filter(
          (x) => x.productId === productId
        );
        product.productVariantsData = productsVariantsData.filter(
          (x) => x.productId === productId
        );
        return product;
      });
      setSavedProductsData(items);
      setTimeout(markPageLoaded, 200);
    } catch (error) {
      logError("Error while fetching Saved Product", error);
    }
  }
  useEffect(() => {
    fetchSavedProducts();
  }, []);

  return (
    <div className="wrapper-account">
      <div className="wrapper-top">
        <h1 className="fs--60 blue-1 split-words" data-aos="d:loop">
          Saved Products
        </h1>
      </div>
      <div className="wrapper-bottom mt-lg-105 mt-tablet-35 mt-phone-25">
        <ul
          className="list-saved-products grid-lg-25 grid-tablet-33 grid-phone-50"
          data-aos="fadeIn .8s ease-in-out .4s, d:loop"
        >
          {savedProductsData.length === 0 ? (
            <div style={{ margin: "20vh auto" }}>
              <h6 className="fs--20 text-center split-words ">
                No Products Found
              </h6>
            </div>
          ) : (
            savedProductsData.slice(0, pageLimit).map((data, index) => {
              return (
                <li key={index} className="grid-item">
                  <ProductCard
                    key={data._id}
                    isSavedProduct="product-link small saved-products active"
                    productData={data}
                    getSelectedProductSnapShots={getSelectedProductSnapShots}
                    savedProductsData={savedProductsData}
                    setSavedProductsData={setSavedProductsData}
                  />
                </li>
              );
            })
          )}
        </ul>
        {pageLimit < savedProductsData.length && (
          <div className="flex-tablet-center mt-lg-60 mt-tablet-40 mt-phone-45">
            <AutoClickWrapper onIntersect={handleAutoSeeMore}>
              <button
                onClick={handleAutoSeeMore}
                className="btn-2-blue"
              >
                <span>Load more</span>
                <i className="icon-arrow-right-2"></i>
              </button>
            </AutoClickWrapper>
          </div>
        )}
      </div>
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
        savedProductsData={savedProductsData}
        setSavedProductsData={setSavedProductsData}
      />
    </div>
  );
};

export default SavedProducts;
