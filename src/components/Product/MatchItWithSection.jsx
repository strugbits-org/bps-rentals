import { useState } from "react";

import ProductCard from "../Category/ProductCard";

const MatchItWith = ({ matchedProductsData }) => {
  const [selectedVariants, setSelectedVariants] = useState({});

  const handleImageHover = (productIndex, variant) => {
    setSelectedVariants((prevSelectedVariants) => ({
      ...prevSelectedVariants,
      [productIndex]: variant,
    }));
  };
  return (
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
                      const { product, variantData } = data;
                      return (
                        <div key={index} className="swiper-slide">
                          <ProductCard
                            key={index}
                            index={index}
                            product={product}
                            variantData={variantData}
                            selectedVariant={
                              selectedVariants[index] || variantData[0]
                            }
                            handleImageHover={handleImageHover}
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
  );
};

export default MatchItWith;
