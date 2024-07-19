"use client";
import React, { useEffect, useState } from "react";
import { markPageLoaded, updatedWatched } from "@/Utils/AnimationFunctions";
import Markets from "../Common/Sections/MarketSection";
import AnimateLink from "../Common/AnimateLink";
import { HotTrendsCategory } from "../Common/Sections/HotTrendsSection";
import ProductCard from "./ProductCard";
import { BannerOurTeam } from "../Common/Sections/BannerOurTeam";
import { fetchFilteredProducts } from "@/Services/ProductsApis";

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

const CategoryPage = ({ pageContent, marketsData, colorsData, categoriesData, selectedCategoryData, products }) => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [loading, setLoading] = useState(false);
  const pageSize = 18;
  // console.log("products total count", totalCount);
  // console.log("products count", products.items.length);
  // console.log("categories data", categoriesData);

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

  const handleSeeMore = async () => {
    try {
      setLoading(true);
      const categoryId = selectedCategoryData?.parentCollection?._id || selectedCategoryData?._id;
      if (!categoryId) throw "category id is not defined";
      const response = await fetchFilteredProducts({ pageSize, skip: filteredProducts.length, categories: [categoryId] });
      setFilteredProducts((prev) => [
        ...prev,
        ...response.items,
      ]);
      setTotalCount(response.totalCount);
      updatedWatched();
    } catch (error) {
      console.log("error:", error);
    } finally {
      setLoading(false);
    }
  };

  const setInitialValues = () => {
    console.log("setInitialValues");
    setFilteredProducts(products.items);
    setTotalCount(products.totalCount);
  }

  useEffect(() => {
    setInitialValues();
    setTimeout(() => {
      markPageLoaded();
    }, 200);
  }, []);

  return (
    <>
      <section className="section-category-content section-category-fixed-pin">
        <div className="container-fluid">
          <div className="row pos-relative">
            {selectedCategoryData && (
              <>
                <div className="col-12">
                  <h1
                    className="d-block section-category-title fs--60 fw-600 pb-lg-50 pb-tablet-20 pb-phone-30 split-words"
                    data-aos
                  >
                    {selectedCategoryData.parentCollection ? selectedCategoryData.parentCollection.name : selectedCategoryData.name}
                  </h1>
                </div>
                {selectedCategoryData.parentCollection && (
                  <>
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
                                  {selectedCategoryData.level2Collections.filter(x => x._id).map((item, index) => (
                                    <li key={index}>
                                      <AnimateLink
                                        to={item['link-copy-of-category-name-2']}
                                        className="blog-btn-tag"
                                      >
                                        <span>{item.name}</span>
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
                  </>
                )}
              </>
            )}
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
                        {colorsData && (
                          <FilterSection
                            title="Colors"
                            styleClass="container-list order-mobile-1"
                            items={colorsData.colors}
                          />
                        )}
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
                    filteredProducts.map((data, index) => {
                      const { product, variantData } = data;
                      const productsCount = filteredProducts;
                      const isLastProduct = index === productsCount - 1;
                      return (
                        <>
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
                          {index === 5 && (
                            <HotTrendsCategory />
                          )}
                          {index === 11 && (
                            <BannerOurTeam />
                          )}

                        </>
                      );
                    })}
                </ul>
                {filteredProducts.length === 0 && (
                  <h6
                    className="fs--40 text-center split-words mt-90"
                    data-aos="d:loop"
                  >
                    No Products Found
                  </h6>
                )}
                {/* {products.totalCount < filteredProducts.length && ( */}
                {filteredProducts.length < totalCount && !loading && (
                  <div className="flex-center">
                    <button
                      className="btn-border-blue mt-90"
                      onClick={handleSeeMore}
                      data-aos="fadeIn .6s ease-in-out 0s, d:loop"
                    >
                      <span>See more</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Markets pageContent={pageContent} marketsData={marketsData} />
    </>
  );
};

const FilterSection = ({ styleClass, title, items }) => {
  return (
    <div className={styleClass}>
      <h3 className="filter-title">{title}</h3>
      <div className="list-filter">
        {items.map((item, index) => (
          <div key={index} className="container-checkbox list-filter-item">
            <label className="checkbox-box">
              <input
                type="checkbox"
              // checked={item.checked || false}
              // onChange={() => handleValueChange(item.value)}
              />
              <span className="checkmark"></span>
              <span className="filter-tag">{item}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
};
export default CategoryPage;
