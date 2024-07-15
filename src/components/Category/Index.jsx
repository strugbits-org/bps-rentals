"use client";
import { useEffect } from "react";
import { markPageLoaded } from "@/Utils/AnimationFunctions";
import Markets from "../Common/Sections/MarketSection";
import Studios from "../Common/Sections/StudiosSection";
import DreamBig from "../Common/Sections/DreamBigSection";
import LetsGetSocial from "../Common/Sections/SocialSection";
import NewArrival from "../Common/Sections/NewArrivalSection";
import Highlights from "../Common/Sections/HighlightsSection";
import AnimateLink from "../Common/AnimateLink";
import { HotTrendsCategory } from "../Common/Sections/HotTrendsSection";

const categoryFilter = [
  {
    name: "All",
    href: "/products",
  },
  {
    name: "Highboys",
    href: "/products",
  },
  {
    name: "Barstools",
    href: "/products",
  },
  {
    name: "Cafe tables",
    href: "/products",
  },
  {
    name: "Communal",
    href: "/products",
  },
  {
    name: "Banquettes",
    href: "/products",
  },
  {
    name: "Chairs",
    href: "/products",
  },
  {
    name: "Bars",
    href: "/products",
  },
  {
    name: "Greenery",
    href: "/products",
  },
  {
    name: "Lighting",
    href: "/products",
  },
];
const productColors = [
  "Black",
  "Brown",
  "Gold",
  "Grey",
  "Pink",
  "Red",
  "White",
  "Yellow",
  "Multicolor",
];
const CategoryPage = ({ pageContent, marketsData }) => {
  useEffect(() => {
    setTimeout(() => {
      markPageLoaded();
    }, 1000);
  }, []);
  return (
    <>
      <section className="section-category-content section-category-fixed-pin">
        <div className="container-fluid">
          <div className="row pos-relative">
            <div className="col-12">
              <h1
                className="d-block section-category-title fs--60 fw-600 pb-lg-50 pb-tablet-20 pb-phone-30 split-words"
                data-aos
              >
                Chairs
              </h1>
            </div>
            <div className="col-12 col-tablet-6 z-6">
              <div className="container-category-filter pb-lg-60 pb-mobile-40">
                <div
                  className="blog-tags dropdown-tags"
                  data-parent-tag
                  data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                >
                  <button
                    className="btn-tag-mobile no-desktop"
                    data-set-tag="blog"
                  >
                    <span>All Categories</span>
                    <i className="icon-arrow-down"></i>
                  </button>
                  <div className="list-dropdown" data-get-tag="blog">
                    <div className="container-wrapper-list">
                      <div className="wrapper-list">
                        <ul className="list-blog-tags list-dropdown-tags">
                          {[1, 2, 3, 4, 5, 6, 7].map((index) => {
                            return (
                              <li key={index}>
                                <AnimateLink
                                  to={`/category/${index || "123"}`}
                                  className="blog-btn-tag"
                                >
                                  <span>Accent Chairs</span>
                                </AnimateLink>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-tablet-6 z-7">
              <div
                className="category-menu"
                data-aos="fadeIn .8s ease-in-out .2s, d:loop"
              >
                <div className="container-filter-products">
                  <button className="btn-filter no-desktop">
                    <i className="icon-filter"></i>
                  </button>
                  <div className="wrapper-content" data-filter-area>
                    <div className="wrapper-overflow">
                      <form
                        action=""
                        className="form-filter wrapper-list-filter"
                        data-aos
                      >
                        <div className="container-list order-mobile-0">
                          <h3 className="filter-title">Category</h3>
                          <div className="list-filter">
                            {categoryFilter.map((data, index) => {
                              return (
                                <div
                                  key={index}
                                  className="container-checkbox list-filter-item"
                                >
                                  <label className="checkbox-box">
                                    <input
                                      type="checkbox"
                                      required
                                      name="chairs"
                                      value="Chairs"
                                    />
                                    <span className="checkmark"></span>
                                    <span className="filter-tag">
                                      {data.name}
                                    </span>
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="container-list order-mobile-2">
                          <h3 className="filter-title">Location</h3>
                          <div className="list-filter">
                            {[1, 2, 3].map((index) => {
                              return (
                                <div
                                  key={index}
                                  className="container-checkbox list-filter-item"
                                >
                                  <label className="checkbox-box">
                                    <input
                                      type="checkbox"
                                      required
                                      name="san_francisco"
                                      value="San Francisco"
                                    />
                                    <span className="checkmark"></span>
                                    <span className="filter-tag">
                                      San Francisco
                                    </span>
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        <div className="container-list order-mobile-1">
                          <h3 className="filter-title">Colors</h3>
                          <div className="list-filter">
                            {productColors.map((data, index) => {
                              return (
                                <div
                                  key={index}
                                  className="container-checkbox list-filter-item"
                                >
                                  <label className="checkbox-box">
                                    <input
                                      type="checkbox"
                                      required
                                      name="black"
                                      value="Black"
                                    />
                                    <span className="checkmark"></span>
                                    <span className="filter-tag">{data}</span>
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-10 column-content">
              <div className="product-list-wrapper container-wrapper-list">
                <ul className="product-list grid-lg-33 grid-tablet-50 grid-list">
                  {[1, 2, 3, 4, 5, 6].map((index) => {
                    return (
                      <li
                        key={index}
                        className="product-item grid-item"
                        data-get-tag
                        data-aos="d:loop"
                      >
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
                          <AnimateLink
                            to={`/product/${index}`}
                            className="link"
                          >
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

                  <HotTrendsCategory />

                  {[1, 2, 3, 4, 5, 6].map((index) => {
                    return (
                      <li
                        key={index}
                        className="product-item grid-item"
                        data-get-tag
                        data-aos="d:loop"
                      >
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
                          <AnimateLink
                            to={`/product/${index}`}
                            className="link"
                          >
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
                  <section className="section-banner-our-team my-lg-60 my-tablet-40 my-phone-25">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-12">
                          <div className="container-banner">
                            <div className="container-text white-1">
                              <span
                                className="d-block fs--40 fw-600 pb-20"
                                data-aos="fadeIn .6s ease-in-out 0s, d:loop"
                              >
                                Looking for a partner?
                              </span>
                              <h3
                                className="fs-lg-90 fs-mobile-60 lh-100 fw-600 split-words"
                                data-aos="d:loop"
                              >
                                Learn what our team can do for your brand
                              </h3>
                              <btn-modal-open
                                group="modal-contact"
                                className="btn-contact btn-border-white no-mobile mt-60"
                                data-cursor-style="off"
                                data-aos="fadeIn .6s ease-in-out 0s, d:loop"
                              >
                                <span>Contact Us</span>
                              </btn-modal-open>
                              <btn-modal-open
                                group="modal-contact"
                                className="btn-contact btn-blue no-desktop mt-tablet-20 mt-phone-135"
                                data-aos="fadeIn .6s ease-in-out 0s, d:loop"
                              >
                                <span>Contact Us</span>
                                <i className="icon-arrow-right"></i>
                              </btn-modal-open>
                            </div>
                            <div className="container-img bg-img bg-black-1">
                              <img
                                src="/images/banner-our-team.jpg"
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
                  {[1, 2, 3, 4, 5, 6].map((index) => {
                    return (
                      <li
                        key={index}
                        className="product-item grid-item"
                        data-get-tag
                        data-aos="d:loop"
                      >
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
                          <AnimateLink
                            to={`/product/${index}`}
                            className="link"
                          >
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
                  <button
                    className="btn-border-blue mt-90"
                    data-aos="fadeIn .6s ease-in-out 0s, d:loop"
                  >
                    <span>See more</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Markets pageContent={pageContent} marketsData={marketsData} />
      <LetsGetSocial />
    </>
  );
};

export default CategoryPage;
