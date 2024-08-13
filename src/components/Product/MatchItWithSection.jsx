import { useState } from "react";

import ProductCard from "../Category/ProductCard";
import CartModal from "../Common/Modals/CartModal";

const MatchItWith = ({ matchedProductsData, savedProductsData, setSavedProductsData, bestSeller }) => {
  const [selectedProductData, setSelectedProductData] = useState(null);
  const [productSnapshots, setProductSnapshots] = useState();
  const [selectedVariantData, setSelectedVariantData] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [productFilteredVariantData, setProductFilteredVariantData] =
    useState();

  const getSelectedProductSnapShots = async (productData) => {
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
        bestSeller={bestSeller}
        savedProductsData={savedProductsData}
        setSavedProductsData={setSavedProductsData}
      />
      <section className="product-match-it-with pt-lg-290 pt-tablet-100 pt-phone-195">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <h2
                className="fs--60 fw-600 text-center split-chars"
                data-aos="d:loop"
              >
                Match it with
              </h2>
              <div id="match-slider" className="mt-50" data-aos="d:loop">
                <div className="swiper-container">
                  <div className="swiper-wrapper">
                    {matchedProductsData &&
                      matchedProductsData.map((data, index) => {
                        return (
                          <div key={index} className="swiper-slide">
                            <ProductCard
                              key={index}
                              bestSeller={bestSeller}
                              productData={data}
                              getSelectedProductSnapShots={
                                  getSelectedProductSnapShots
                              }
                              savedProductsData={savedProductsData}
                              setSavedProductsData={setSavedProductsData}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="swiper-button-prev no-mobile">
                  <i className="icon-arrow-left-3"></i>
                </div>
                <div className="swiper-button-next no-mobile">
                  <i className="icon-arrow-right-3"></i>
                </div>
                <div className="swiper-pagination swiper-pagination-01 no-desktop no-tablet"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MatchItWith;
