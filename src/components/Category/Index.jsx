"use client";
import React, { useEffect, useState } from "react";
import { markPageLoaded } from "@/Utils/AnimationFunctions";
import Markets from "../Common/Sections/MarketSection";
import AnimateLink from "../Common/AnimateLink";
import { HotTrendsCategory } from "../Common/Sections/HotTrendsSection";
import { generateImageURL } from "@/Utils/GenerateImageURL";
import ProductCard from "./ProductCard";

const categoryFilter = [
  "All",
  "Highboys",
  "Barstools",
  "Cafe tables",
  "Communal",
  "Banquettes",
  "Chairs",
  "Bars",
  "Greenery",
  "Lighting",
].map((name) => ({ name, href: "/products" }));

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
const CategoryPage = ({ pageContent, marketsData, products }) => {
  useEffect(() => {
    setTimeout(() => {
      markPageLoaded();
    }, 1000);
  }, []);
  const [selectedVariants, setSelectedVariants] = useState({});

  const handleVariantSelection = (productIndex, variant) => {
    setSelectedVariants((prevSelectedVariants) => ({
      ...prevSelectedVariants,
      [productIndex]: variant,
    }));
  };

  const handleImageHover = (productIndex, variant) => {
    setSelectedVariants((prevSelectedVariants) => ({
      ...prevSelectedVariants,
      [productIndex]: variant,
    }));
  };

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
                          {[...Array(7)].map((_, index) => (
                            <li key={index}>
                              <AnimateLink
                                to={`/category/${index || "123"}`}
                                className="blog-btn-tag"
                              >
                                <span>Accent Chairs</span>
                              </AnimateLink>
                            </li>
                          ))}
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
                        <FilterSection
                          title="Category"
                          styleClass="container-list order-mobile-0"
                          items={categoryFilter.map((data) => data.name)}
                        />
                        <FilterSection
                          title="Location"
                          styleClass="container-list order-mobile-2"
                          items={["San Francisco", "New York", "Los Angeles"]}
                        />
                        <FilterSection
                          title="Colors"
                          styleClass="container-list order-mobile-1"
                          items={productColors}
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-10 column-content">
              <div className="product-list-wrapper container-wrapper-list">
                <ul className="product-list grid-lg-33 grid-tablet-50 grid-list">
                  {products &&
                    products.map((data, index) => {
                      const { product, variantData } = data;
                      return (
                        <ProductCard
                          key={index}
                          index={index}
                          product={product}
                          variantData={variantData}
                          selectedVariant={
                            selectedVariants[index] || variantData[0]
                          }
                          handleVariantSelection={handleVariantSelection}
                          handleImageHover={handleImageHover}
                        />
                      );
                    })}

                  <HotTrendsCategory />

                  {products &&
                    products.map((data, index) => {
                      const { product, variantData } = data;
                      return (
                        <ProductCard
                          key={index}
                          index={index}
                          product={product}
                          variantData={variantData}
                          selectedVariant={
                            selectedVariants[index] || variantData[0]
                          }
                          handleVariantSelection={handleVariantSelection}
                          handleImageHover={handleImageHover}
                        />
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
                                class="btn-contact btn-border-white no-mobile mt-60"
                                data-cursor-style="off"
                                data-aos="fadeIn .6s ease-in-out 0s, d:loop"
                              >
                                <span>Contact Us</span>
                              </btn-modal-open>
                              <btn-modal-open
                                group="modal-contact"
                                class="btn-contact btn-blue no-desktop mt-tablet-20 mt-phone-135"
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

                  {products &&
                    products.map((data, index) => {
                      const { product, variantData } = data;
                      return (
                        <ProductCard
                          key={index}
                          index={index}
                          product={product}
                          variantData={variantData}
                          selectedVariant={
                            selectedVariants[index] || variantData[0]
                          }
                          handleVariantSelection={handleVariantSelection}
                          handleImageHover={handleImageHover}
                        />
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
    </>
  );
};

const FilterSection = ({ styleClass, title, items }) => (
  <div className={styleClass}>
    <h3 className="filter-title">{title}</h3>
    <div className="list-filter">
      {items.map((item, index) => (
        <div key={index} className="container-checkbox list-filter-item">
          <label className="checkbox-box">
            <input
              type="checkbox"
              name={item.toLowerCase().replace(" ", "_")}
              value={item}
            />
            <span className="checkmark"></span>
            <span className="filter-tag">{item}</span>
          </label>
        </div>
      ))}
    </div>
  </div>
);
export default CategoryPage;
