"use client";
import { useEffect } from "react";
import AnimateLink from "../Common/AnimateLink";
import LetsGetSocial from "../Common/Sections/SocialSection";
import Studios from "../Common/Sections/StudiosSection";
import Markets from "../Common/Sections/MarketSection";
import Highlights from "../Common/Sections/HighlightsSection";
import DreamBig from "../Common/Sections/DreamBigSection";
import { HotTrendsHome } from "../Common/Sections/HotTrendsSection";
import NewArrival from "../Common/Sections/NewArrivalSection";
import { markPageLoaded } from "@/Utils/AnimationFunctions";
import { generateImageURL } from "@/Utils/GenerateImageURL";

const HomePage = ({
  heroSectionContent,
  newArrivalSectionContent,
  hotTrendsSectionContent,
  studioSectionContent,
  dreamBigSectionContent,
  studiosData,
  marketsData,
}) => {

  useEffect(() => {
    markPageLoaded();
  }, []);
  return (
    <>
      <section className="section-banner-our-team banner-home">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="container-banner">
                <div className="container-text white-1">
                  <h3
                    className="fs-lg-90 fs-mobile-60 lh-100 fw-600 split-words"
                    data-aos="d:loop"
                  >
                    {heroSectionContent && heroSectionContent.mainTitle}
                  </h3>
                </div>
                <div
                  className="container-img bg-img bg-black-1"
                  data-parallax-top
                  data-parallax-no-mobile
                  data-translate-y="70vh"
                >
                  <img
                    src={generateImageURL({
                      wix_url: heroSectionContent.backgroundImage,
                      w: "1336",
                      h: "581",
                      fit: "fill",
                      q: "95",
                    })}
                    className=" "
                    data-aos="fadeIn
                        1.2s ease-out-cubic 0s, d:loop"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="home-best-sellers white-1" data-aos="d:loop">
        <div className="container-fluid">
          <div className="row pb-lg-40 pb-tablet-100 pb-phone-190">
            <div className="col-lg-4 offset-lg-1">
              <div className="container-text pt-lg-65 pt-tablet-25 pt-phone-40">
                <h2 className="fs--60 fw-600 split-chars" data-aos="d:loop">
                  {heroSectionContent && heroSectionContent.subTitle}
                </h2>
                <p
                  className="d-block fs--40 fs-mobile-18 fw-600 lh-140 pt-10 pt-phone-10"
                  data-aos="fadeIn .8s ease-in-out .4s, d:loop"
                >
                  {heroSectionContent && heroSectionContent.firstDescription}

                  <br />
                  {heroSectionContent && heroSectionContent.secondDescription}
                </p>
                <AnimateLink
                  to={`/category/${"123"}`}
                  className="btn-blue mt-20 no-mobile"
                  data-cursor-style="off"
                  data-aos="d:fadeIn .6s ease-in-out .6s, m:fadeIn .6s ease-in-out 0s, d:loop"
                >
                  <span>
                    {" "}
                    {heroSectionContent && heroSectionContent.buttonLabel}
                  </span>
                  <i className="icon-arrow-right"></i>
                </AnimateLink>
              </div>
            </div>
            <div className="col-lg-7 mt-phone-5">
              <div className="best-sellers-slider" data-aos>
                <div className="swiper-container">
                  <div className="swiper-wrapper">
                    {[1, 2, 3, 4].map((index) => {
                      return (
                        <div key={index} className="swiper-slide">
                          <div
                            className="product-link large active"
                            data-product-category
                            data-product-location
                            data-product-colors
                          >
                            <div className="container-tags">
                              <button className="btn-bookmark">
                                <i className="icon-bookmark"></i>
                                <i className="icon-bookmark-full"></i>
                              </button>
                            </div>
                            <AnimateLink
                              to={`product/${index}`}
                              className="link"
                            >
                              <div className="container-top">
                                <h2 className="product-title">Bristol Chair</h2>
                              </div>
                              <div className="wrapper-product-img">
                                <div
                                  className="container-img product-img"
                                  data-get-product-link-color="green"
                                  data-default-product-link-active
                                >
                                  <img
                                    src="/images/chairs/bristol-chair-color-1.webp"
                                    className=" "
                                  />
                                </div>
                                <div
                                  className="container-img product-img"
                                  data-get-product-link-color="white"
                                >
                                  <img
                                    src="/images/chairs/bristol-chair-color-2.webp"
                                    className=" "
                                  />
                                </div>
                                <div
                                  className="container-img product-img"
                                  data-get-product-link-color="blue"
                                >
                                  <img
                                    src="/images/chairs/bristol-chair-color-3.webp"
                                    className=" "
                                  />
                                </div>
                              </div>
                            </AnimateLink>
                            <div className="container-color-options">
                              <ul className="list-color-options">
                                <li
                                  className="list-item"
                                  data-set-product-link-color="green"
                                  data-default-product-link-active
                                >
                                  <div className="container-img">
                                    <img
                                      src="/images/chairs/bristol-chair-color-1.webp"
                                      className=" "
                                    />
                                  </div>
                                </li>
                                <li
                                  className="list-item"
                                  data-set-product-link-color="white"
                                >
                                  <div className="container-img">
                                    <img
                                      src="/images/chairs/bristol-chair-color-2.webp"
                                      className=" "
                                    />
                                  </div>
                                </li>
                                <li
                                  className="list-item"
                                  data-set-product-link-color="blue"
                                >
                                  <div className="container-img">
                                    <img
                                      src="/images/chairs/bristol-chair-color-3.webp"
                                      className=" "
                                    />
                                  </div>
                                </li>
                              </ul>
                              <div className="colors-number">
                                <span>+3</span>
                              </div>
                            </div>
                            <btn-modal-open
                              group="modal-product"
                              class="modal-add-to-cart"
                            >
                              <span>Add to cart</span>
                              <i className="icon-cart"></i>
                            </btn-modal-open>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div
                  className="swiper-button-prev swiper-button-01 no-mobile"
                  data-aos="fadeIn .8s ease-in-out .4s, d:loop"
                >
                  <span>
                    <i className="icon-arrow-left-3"></i>
                  </span>
                </div>
                <div
                  className="swiper-button-next swiper-button-01 no-mobile"
                  data-aos="fadeIn .8s ease-in-out .4s, d:loop"
                >
                  <span>
                    <i className="icon-arrow-right-3"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-12 no-desktop column-btn">
              <AnimateLink
                to={`/category/${"123"}`}
                className="btn-blue mt-lg-20 mt-mobile-40"
              >
                <span>Dicover Favorites</span>
                <i className="icon-arrow-right"></i>
              </AnimateLink>
            </div>
          </div>
        </div>
      </section>
      <NewArrival pageContent={newArrivalSectionContent} />
      <Highlights />
      <HotTrendsHome pageContent={hotTrendsSectionContent} />
      <Markets marketsData={marketsData} />
      <Studios pageContent={studioSectionContent} studiosData={studiosData} />
      <DreamBig pageContent={dreamBigSectionContent} />
      <LetsGetSocial />
    </>
  );
};

export default HomePage;
