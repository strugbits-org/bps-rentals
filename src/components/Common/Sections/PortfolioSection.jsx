import React from "react";
import { generateImageUrl2 } from "@/Utils/GenerateImageURL";

const PortfolioSection = ({ data }) => {
  return (
    <section className="product-post-explore-projects pt-md-100 pt-phone-50 pb-lg-190 pb-mobile-130">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h2
              className="fs--60 text-center mb-lg-45 mb-tablet-35 mb-phone-40 split-words"
              data-aos="d:loop"
            >
              Where the product was used
            </h2>
            <div className="slider-content-mobile">
              <div className="swiper-container">
                <div className="swiper-wrapper list-portfolio list-slider-mobile">
                  {data.slice(0, 8).map((portfolioData, index) => {
                    const { portfolioRef, markets, studios } = portfolioData;
                    const { title, coverImage } = portfolioRef;
                    return (
                      <div key={index} className="swiper-slide grid-item">
                        <a
                          href={`product/${index}`}
                          className="link-portfolio link-portfolio-animation"
                          data-aos="d:loop"
                        >
                          <div
                            className="container-img bg-blue"
                            data-cursor-style="view"
                          >
                            <div className="wrapper-img">
                              <img
                                src={generateImageUrl2({
                                  wix_url: coverImage.imageInfo,
                                  w: "301",
                                  h: "371",
                                  q: "85",
                                })}
                                className=" "
                              />
                            </div>
                          </div>
                          <div className="container-text">
                            <ul className="list-tags-small">
                              {markets.map((market, index) => (
                                <li
                                  key={index}
                                  className={`tag-small
                                                   ? "active"
                                                   : ""
                                                   }`}
                                >
                                  <span>{market.cardname}</span>
                                </li>
                              ))}
                              {studios.map((studio, index) => (
                                <React.Fragment key={index}>
                                  {index < 2 && (
                                    <li
                                      className={`tag-small 
                                                          ? ${
                                                            index === 0
                                                          } "active"
                                                          : ""
                                                          }`}
                                    >
                                      <span>{studio.cardName}</span>a
                                    </li>
                                  )}
                                </React.Fragment>
                              ))}
                              {studios.length > 2 ? (
                                <li className="tag-small">
                                  <span>+{studios.length - 2} studios</span>
                                </li>
                              ) : null}
                            </ul>
                            <h2 className="title-portfolio">{title}</h2>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="swiper-button-prev swiper-button-01 no-mobile">
                <i className="icon-arrow-left-3"></i>
              </div>
              <div className="swiper-button-next swiper-button-01 no-mobile">
                <i className="icon-arrow-right-3"></i>
              </div>
            </div>
          </div>
          <div
            className="col-lg-2 offset-lg-5 flex-center mt-lg-60 mt-mobile-40"
            data-aos="fadeIn .8s ease-in-out .2s, d:loop"
          >
            <a href="/" className="btn-border-blue" data-cursor-style="off">
              <span>See more</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
