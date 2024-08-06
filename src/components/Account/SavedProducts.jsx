"use client";

import { useEffect, useState } from "react";
import { markPageLoaded } from "@/Utils/AnimationFunctions";
import {
  getProductVariants,
  getProductVariantsImages,
  getSavedProductData,
} from "@/Services/ProductsApis";
import ProductCard from "../Category/ProductCard";

const SavedProducts = ({ savedProducts }) => {
  useEffect(() => {
    setTimeout(markPageLoaded, 200);
  }, []);

  const [selectedVariants, setSelectedVariants] = useState({});
  const [savedProductsData, setSavedProductsData] = useState(
    savedProducts || []
  );
  const [selectedProductData, setSelectedProductData] = useState(null);

  const handleImageHover = (productIndex, variant) => {
    setSelectedVariants((prevSelectedVariants) => ({
      ...prevSelectedVariants,
      [productIndex]: variant,
    }));
  };

  const getSelectedProductSnapShots = async (productData) => {
    setSelectedProductData(productData);
    try {
      const product_id = productData.product._id;
      const [productSnapshotData, productVariantsData] = await Promise.all([
        getProductVariantsImages(product_id),
        getProductVariants(product_id),
      ]);

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
      if (filteredVariantData && filteredVariantData.length > 0) {
        handleImageChange({
          index: 0,
          selectedVariantData: filteredVariantData[0].variant,
          productSnapshots: productSnapshotData,
          modalUrl: filteredVariantData[0].zipUrl,
        });
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <div class="wrapper-account">
      <div class="wrapper-top">
        <h1 class="fs--60 blue-1 split-words" data-aos="d:loop">
          Saved Products
        </h1>
      </div>
      <div class="wrapper-bottom mt-lg-105 mt-tablet-35 mt-phone-25">
        <ul
          class="list-saved-products grid-lg-25 grid-tablet-33 grid-phone-50"
          data-aos="fadeIn .8s ease-in-out .4s, d:loop"
        >
          {savedProducts.map((data, index) => {
            const { product, variantData } = data;
            return (
              <li key={index} className="grid-item">
                <div
                  className="product-link small saved-products active"
                  data-product-category
                  data-product-location
                  data-product-colors
                >
                  <ProductCard
                    key={index}
                    index={index}
                    styleClassName="product-link small saved-products active"
                    product={product}
                    variantData={variantData}
                    selectedVariant={selectedVariants[index] || variantData[0]}
                    filteredProducts={savedProducts}
                    handleVariantChange={handleImageHover}
                    getSelectedProductSnapShots={getSelectedProductSnapShots}
                    savedProductsData={savedProductsData}
                    setSavedProductsData={setSavedProductsData}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <div class="flex-tablet-center mt-lg-60 mt-tablet-40 mt-phone-45">
          <button class="btn-2-blue">
            <span>Load more</span>
            <i class="icon-arrow-right-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedProducts;
