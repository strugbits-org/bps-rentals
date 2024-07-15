"use client";
import React from 'react'
import AnimateLink from '../Common/AnimateLink';
import { CustomButton } from '../Common/CustomButton';

const BestSellersHome = ({ content }) => {
  return (
    <section className="home-best-sellers white-1" data-aos="d:loop">
      <div className="container-fluid">
        <div className="row pb-lg-40 pb-tablet-100 pb-phone-190">
          <div className="col-lg-4 offset-lg-1">
            <div className="container-text pt-lg-65 pt-tablet-25 pt-phone-40">
              <h2 className="fs--60 fw-600 split-chars" data-aos="d:loop">
                {content && content.subTitle}
              </h2>
              <p
                className="d-block fs--40 fs-mobile-18 fw-600 lh-140 pt-10 pt-phone-10"
                data-aos="fadeIn .8s ease-in-out .4s, d:loop"
              >
                {content && content.firstDescription}

                <br />
                {content && content.secondDescription}
              </p>
              <CustomButton
                customClasses={"btn-blue mt-20 no-mobile"}
                data={{
                  label: content.buttonLabel,
                  action: content.buttonAction
                }}
                attributes={{
                  "data-aos":
                    "d:fadeIn .6s ease-in-out .6s, m:fadeIn .6s ease-in-out 0s, d:loop",
                  "data-cursor-style": "off",
                }}
              >
                {content && content.buttonLabel}

              </CustomButton>
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
            <CustomButton
              customClasses={"btn-blue mt-lg-20 mt-mobile-40"}
              data={{
                label: content.buttonLabel,
                action: content.buttonAction
              }}
            >
              {content && content.buttonLabel}

            </CustomButton>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BestSellersHome;