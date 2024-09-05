import AnimateLink from "../AnimateLink";
import ProductCard from "@/components/Category/ProductCard";
import { ImageWrapper } from "../ImageWrapper";

const Highlights = ({ pageContent, data, savedProductsData, setSavedProductsData, getSelectedProductSnapShots }) => {
  if (data.length === 0) return;
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
                    return (
                      <div key={index} className="swiper-slide">
                        <div className="highlight-content">
                          <ProductCard
                            key={index}
                            productData={item}
                            getSelectedProductSnapShots={getSelectedProductSnapShots}
                            savedProductsData={savedProductsData}
                            setSavedProductsData={setSavedProductsData}
                          />
                          <AnimateLink to={`product/${item.product.slug}`} className="link-highlight">
                            <div className="container-img bg-blue-1">
                              <ImageWrapper url={item.featureImage} attributes={{ "data-aos": "scaleOut .8s ease-out-cubic 0s, d:loop" }} />
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
