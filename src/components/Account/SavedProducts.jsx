"use client";

import { useEffect, useState } from "react";
import { markPageLoaded, updatedWatched } from "@/Utils/AnimationFunctions";
// getProductVariants,
// getProductVariantsImages,
import {
  getSavedProductData,
} from "@/Services/ProductsApis";
import ProductCard from "../Category/ProductCard";
import CartModal from "../Common/Modals/CartModal";

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

  const getSelectedProductSnapShots = async (productData) => {
    setSelectedProductData(productData);
    try {
      // const product_id = productData.product._id;
      // const [productSnapshotData, productVariantsData] = await Promise.all([
      //   getProductVariantsImages(product_id),
      //   getProductVariants(product_id),
      // ]);
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
    const savedProducts = await getSavedProductData();
    const items = savedProducts.map((product) => {
      if (!product._id) return;
      const productId = product.product._id;
      product.productSnapshotData = productsVariantImagesData.filter(x => x.productId === productId);
      product.productVariantsData = productsVariantsData.filter(x => x.productId === productId);
      return product;
    });
    setSavedProductsData(items);
    setTimeout(markPageLoaded, 200);
  }
  useEffect(() => {
    fetchSavedProducts();
  }, []);

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
                      key={index}
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
          <div class="flex-tablet-center mt-lg-60 mt-tablet-40 mt-phone-45">
            <button
              onClick={() => {
                setPageLimit((prev) => prev + pageSize);
                updatedWatched();
              }}
              class="btn-2-blue"
            >
              <span>Load more</span>
              <i class="icon-arrow-right-2"></i>
            </button>
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
