"use client";
import { useEffect } from "react";
import { markPageLoaded } from "../../Utils/AnimationFunctions";
import Markets from "../Common/Sections/MarketSection";
import Studios from "../Common/Sections/StudiosSection";
import DreamBig from "../Common/Sections/DreamBigSection";
import LetsGetSocial from "../Common/Sections/SocialSection";
import NewArrival from "../Common/Sections/NewArrivalSection";
import Highlights from "../Common/Sections/HighlightsSection";
import AnimateLink from "../Common/AnimateLink";

const MarketPage = () => {
  useEffect(() => {
    setTimeout(() => {
      markPageLoaded();
    }, 1000);
  }, []);
  return (
    <>
      <section className="market-intro">
        <div
          className="container-fluid pos-relative z-5"
          data-parallax-top
          data-translate-y="20rem"
        >
          <div className="row">
            <div className="col-lg-6 offset-lg-3 column-1 white-1">
              <div className="container-text text-center">
                <h1
                  className="fs--90 fs-mobile-60 split-chars"
                  data-aos="d:loop"
                >
                  Wedding Best Sellers
                </h1>
                <p
                  className="fs--40 fs-tablet-40 text text-center mt-lg-10 mt-lg-20 mt-tablet-35 mt-phone-10"
                  data-aos="fadeInUp .8s ease-out-cubic .5s, d:loop"
                >
                  Take a look at our exceptional products and start shopping
                  today!
                </p>
                <div
                  className="container-arrow no-mobile"
                  data-aos="fadeIn .6s ease-in-out .2s, d:loop"
                >
                  <i className="icon-arrow-down-2"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="container-img bg-blue-2"
          data-parallax-top
          data-translate-y="20rem"
          data-scale="1.2"
        >
          <img
            src="/images/market/market-intro.jpg"
            className=" "
            data-aos="scaleOut
        1.2s ease-out-cubic 0s, d:loop"
          />
        </div>
      </section>
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
      <NewArrival />
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

      <section className="market-heres-what-people-are-saying pt-lg-300 pt-tablet-105 pt-phone-145 pb-lg-130 pb-tablet-100 pb-phone-145 pos-relative">
        <div className="container-fluid pos-relative z-3">
          <div className="row">
            <div className="col-lg-6 offset-lg-3 column-1">
              <h2
                className="fs--80 white-1 title text-center split-words"
                data-aos="d:loop"
              >
                Here’s what people are saying.
              </h2>
            </div>
            <div className="col-lg-10 offset-lg-1 mt-lg-120 mt-tablet-100 mt-phone-45">
              <div className="slider-testimony" data-aos="d:loop">
                <div className="swiper-container">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide">
                      <div className="wrapper-content">
                        <div className="container-img">
                          <img src="/images/lib/06_desktop.jpg" className=" " />
                        </div>
                        <div className="container-text">
                          <p className="testimony">
                            We partnered with Blueprint Studios to provide our
                            employees with a virtual halloween experience
                            instead of hosting an in-person party this year, and
                            our employees loved it! The VES (Virtual Exploration
                            Space) was well built, immersive, and even
                            challenging to get through. We will definitely be
                            doing this again as a safe alternative to
                            celebrating our favorite holiday!
                          </p>
                          <div className="container-profile">
                            <div className="name">Jennifer Luu</div>
                            <div className="occupation">
                              Twitch / Global Internal Events Manager
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-slide">
                      <div className="wrapper-content">
                        <div className="container-img">
                          <img src="/images/lib/06_desktop.jpg" className=" " />
                        </div>
                        <div className="container-text">
                          <p className="testimony">
                            We partnered with Blueprint Studios to provide our
                            employees with a virtual halloween experience
                            instead of hosting an in-person party this year, and
                            our employees loved it! The VES (Virtual Exploration
                            Space) was well built, immersive, and even
                            challenging to get through. We will definitely be
                            doing this again as a safe alternative to
                            celebrating our favorite holiday!
                          </p>
                          <div className="container-profile">
                            <div className="name">Jennifer Luu</div>
                            <div className="occupation">
                              Twitch / Global Internal Events Manager
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="swiper-button-prev no-mobile">
                  <span>Back</span>
                </div>
                <div className="swiper-button-next no-mobile">
                  <span>Next</span>
                </div>
                <div className="swiper-pagination no-mobile"></div>
              </div>
            </div>
            <div className="col-lg-4 offset-lg-4 mt-lg-45 mt-tablet-90 mt-phone-25 flex-center column-btn">
              <btn-modal-open
                group="modal-contact"
                class="btn-blue"
                data-aos="fadeInUp .8s ease-out-cubic 0s, d:loop, trigger:.column-btn"
                data-cursor-style="off"
              >
                <span>Let’s Craft Magic Together</span>
                <i className="icon-arrow-right-2"></i>
              </btn-modal-open>
            </div>
          </div>
        </div>
      </section>

      <Markets />
      <Studios />
      <DreamBig />
      <LetsGetSocial />
    </>
  );
};

export default MarketPage;
