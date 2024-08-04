import { generateImageURL } from "@/Utils/GenerateImageURL";
import AnimateLink from "../AnimateLink";
import ProductCard from "@/components/Category/ProductCard";
import { useState } from "react";

const Highlights = ({ pageContent, data }) => {
  if (data.length === 0) return;
  const [selectedVariants, setSelectedVariants] = useState({});

  const handleVariantChange = (index, variant) => {
    setSelectedVariants((prevSelectedVariants) => ({
      ...prevSelectedVariants,
      [index]: variant,
    }));
  };

  return (
    <section className="section-highlights">
      <div className="container-fluid">
        <div className="row pt-lg-250 pb-lg-310 pt-tablet-105 pb-tablet-100 pt-phone-195 pb-phone-205">
          <div className="col-lg-10 offset-lg-1">
            <h2
              className="fs--60 fs-phone-40 blue-1 text-center split-words"
              data-aos="d:loop"
            >
              {pageContent && pageContent.highlightsSectionTitle}
            </h2>
            <div className="slider-highlights mt-lg-95 mt-tablet-55 mt-phone-35">
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  {data && data.map((item, index) => {
                    const { product, variantData } = item;
                    return (
                      <div key={index} className="swiper-slide">
                        <div className="highlight-content">
                          <ProductCard
                            key={index}
                            index={index}
                            product={product}
                            variantData={variantData}
                            selectedVariant={
                              selectedVariants[index] || variantData[0]
                            }
                            handleVariantChange={handleVariantChange}
                          />
                          <AnimateLink to={`product/${item.product.slug}`} className="link-highlight">
                            <div className="container-img bg-blue-1">
                              <img
                                src={generateImageURL({
                                  wix_url: item.featureImage,
                                  w: "699",
                                  h: "385",
                                  fit: "fill",
                                  q: "95",
                                })}
                                className=" "
                                data-aos="scaleOut .8s ease-out-cubic 0s, d:loop"
                              />
                            </div>
                          </AnimateLink>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="swiper-button-prev">
                <i className="icon-arrow-left-3"></i>
              </div>
              <div className="swiper-button-next">
                <i className="icon-arrow-right-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
