"use client";
import { useEffect } from "react";
import { markPageLoaded } from "@/Utils/AnimationFunctions";
import Markets from "../Common/Sections/MarketSection";
import Studios from "../Common/Sections/StudiosSection";
import DreamBig from "../Common/Sections/DreamBigSection";
import NewArrival from "../Common/Sections/NewArrivalSection";
import Highlights from "../Common/Sections/HighlightsSection";
import AnimateLink from "../Common/AnimateLink";
import PeopleReviewSlider from "../Common/Sections/PeopleReviewSlider";
import { MarketIntroSection } from "./MarketIntroSection";

const MarketPage = ({
  marketSection,
  newArrivalSectionContent,
  homeSectionDetails,
  dreamBigSectionContent,
  studiosData,
  marketsData,
  peopleReviewSliderData
}) => {
  useEffect(() => {
    markPageLoaded();
  }, []);
  return (
    <>
      <MarketIntroSection data={marketSection} />
      <section className="market-products pb-lg-225 pb-tablet-100 pb-phone-170">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <ul className="market-products-list">
                {[1, 2, 3, 4, 5, 6].map((index) => {
                  return (
                    <li key={index} className="list-item">
                      <div
                        className="product-link large active"
                        data-product-category
                        data-product-location
                        data-product-colors
                      >
                        <div className="container-tags">
                          <div className="best-seller">
                            <span>Best Seller</span>
                          </div>
                          <button className="btn-bookmark">
                            <i className="icon-bookmark"></i>
                            <i className="icon-bookmark-full"></i>
                          </button>
                        </div>
                        <div className="container-copy">
                          <a
                            href="javascript:void(0)"
                            className="btn-copy copy-link"
                          >
                            <span>MODCH39</span>
                            <i className="icon-copy"></i>
                          </a>
                          <input
                            type="text"
                            className="copy-link-url"
                            value="MODCH39"
                            style={{
                              position: "absolute",
                              opacity: 0,
                              pointerEvents: "none",
                            }}
                          />
                        </div>
                        <AnimateLink to="/product" className="link">
                          <div className="container-top">
                            <h2 className="product-title">Bristol Chair</h2>
                            <div className="container-info">
                              <div className="dimensions">
                                <span>24”L X 30”W X 37”H</span>
                              </div>
                            </div>
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
                    </li>
                  );
                })}
              </ul>
              <div className="flex-center">
                <button className="btn-border-blue mt-lg-90 mt-tablet-40 mt-phone-50">
                  <span>See more</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <NewArrival content={newArrivalSectionContent} />
      <Highlights />
      <section className="section-slider-banner">
        <div className="slider-banner" data-aos="d:loop">
          <div className="swiper-container">
            <div className="swiper-wrapper">
              {[1, 2, 3].map((index) => {
                return (
                  <div key={index} className="swiper-slide">
                    <AnimateLink to="/">
                      <div className="container-img">
                        <img
                          src="/images/market/google-workspace.webp"
                          className=" "
                          data-parallax
                          data-scale-from="1.3"
                        />
                      </div>
                      <div className="container-project">
                        <h4 className="project split-words">
                          Google Workspace
                        </h4>
                        <ul className="list-tags">
                          <li>
                            <span>Personal</span>
                          </li>
                          <li>
                            <span>Wedding</span>
                          </li>
                          <li>
                            <span>Milestone event</span>
                          </li>
                        </ul>
                      </div>
                      <div className="container-title">
                        <h3 className="title split-words">
                          Every project is unique, <br />
                          each event its own.
                        </h3>
                        <div className="container-btn-bottom">
                          <div
                            className="btn-blue btn-bottom"
                            data-cursor-style="off"
                          >
                            <span>We Create Dreams</span>
                            <i className="icon-arrow-right"></i>
                          </div>
                        </div>
                      </div>
                    </AnimateLink>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </section>

      <PeopleReviewSlider data={peopleReviewSliderData} homeSectionDetails={homeSectionDetails} />
      <Markets marketsData={marketsData} />
      <Studios content={homeSectionDetails} studiosData={studiosData} />
      <DreamBig content={dreamBigSectionContent} />
    </>
  );
};

export default MarketPage;
