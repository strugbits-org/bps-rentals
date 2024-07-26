"use client";
import React, { useEffect, useState } from "react";
import { markPageLoaded, updatedWatched } from "@/Utils/AnimationFunctions";
import Markets from "../Common/Sections/MarketSection";
import AnimateLink from "../Common/AnimateLink";
import { HotTrendsCategory } from "../Common/Sections/HotTrendsSection";
import ProductCard from "./ProductCard";
import { BannerOurTeam } from "../Common/Sections/BannerOurTeam";
import { fetchFilteredProducts } from "@/Services/ProductsApis";
import { useCookies } from "react-cookie";

const CategoryPage = ({ pageContent, locations, marketsData, colorsData, selectedCategoryData, products }) => {

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalCount, setTotalCount] = useState();
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie] = useCookies(["location"]);
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterColors, setFilterColors] = useState([]);
  const [filterLocations, setFilterLocations] = useState([]);
  const [enableLocationFilter, setEnableLocationFilter] = useState(false);
  const pageSize = 18;

  const [selectedVariants, setSelectedVariants] = useState({});

  const handleImageHover = (productIndex, variant) => {
    setSelectedVariants((prevSelectedVariants) => ({
      ...prevSelectedVariants,
      [productIndex]: variant,
    }));
  };

  const handleFilterChange = async ({ categories = [], colors = [] }) => {
    try {
      setLoading(true);
      const checkedCategories = categories ? categories.filter(x => x.checked).map(x => x._id) : filterCategories.filter(x => x.checked).map(x => x._id);
      const selectedCategories = checkedCategories?.length !== 0 ? checkedCategories : [selectedCategoryData?.parentCollection?._id || selectedCategoryData?._id];
      const checkedColors = colors?.length !== 0 ? colors.filter(x => x.checked).map(x => x.label) : filterColors.filter(x => x.checked).map(x => x.label);
      const response = await fetchFilteredProducts({
        pageSize,
        location: cookies.location,
        categories: selectedCategories,
        colors: checkedColors,
      });
      setFilteredProducts(response.items);
      setTotalCount(response.totalCount);
      updatedWatched();
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSeeMore = async () => {
    try {
      setLoading(true);

      const selectedCategories = filterCategories.filter(x => x.checked).map(x => x._id);
      const selectedColors = filterColors.filter(x => x.checked).map(x => x.label);
      const categories = selectedCategories.length !== 0 ? selectedCategories : [selectedCategoryData?.parentCollection?._id || selectedCategoryData?._id];
      const response = await fetchFilteredProducts({
        pageSize,
        skip: filteredProducts.length,
        location: cookies.location,
        categories,
        colors: selectedColors
      });
      setFilteredProducts(prev => [...prev, ...response.items]);
      setTotalCount(response.totalCount);
      updatedWatched();
    } catch (error) {
      console.error("Error fetching more products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleColorChange = (data) => {
    const updatedColors = filterColors.map(item => item.label === data.label ? { ...item, checked: !item.checked } : item);
    setFilterColors(updatedColors);
    handleFilterChange({ colors: updatedColors });

  }
  const handleLocationChange = (data) => {
    setCookie("location", data.value, { path: '/' });
  }
  const handleCategoryChange = (data) => {
    const updatedCategories = filterCategories.map(item => item._id === data._id ? { ...item, checked: !item.checked } : item);
    setFilterCategories(updatedCategories);
    handleFilterChange({ categories: updatedCategories });
  }

  const setInitialValues = () => {
    if (selectedCategoryData.level2Collections !== undefined) {
      const categories = selectedCategoryData.level2Collections.filter(x => x._id).map(x => ({
        ...x,
        checked: false,
        label: x.name
      }));
      setFilterCategories(categories);
    }
    if (colorsData) {
      const colors = colorsData.colors.map(x => { return { label: x, checked: false } });
      setFilterColors(colors);
    }
    setFilteredProducts(products.items);
    setTotalCount(products.totalCount);
    setTimeout(markPageLoaded, 200);
    setTimeout(setEnableLocationFilter(true), 200);
  }

  useEffect(() => {
    setFilterLocations(locations.map(x => (cookies.location === x.value ? { ...x, checked: true } : { ...x, checked: false })));
    if (enableLocationFilter) handleFilterChange({});
  }, [cookies.location]);

  useEffect(() => {
    setInitialValues();
  }, []);


  // useEffect(() => {
  //   console.log("HEllllllllllloooooooooooooooooooooo", cookies.location);
  // }, [cookies])


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
                                  {filterCategories.map((item, index) => (
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
                        {filterCategories.length !== 0 && (
                          <FilterSection
                            title="Category"
                            styleClass="container-list order-mobile-0"
                            items={filterCategories}
                            handleChange={handleCategoryChange}
                          />
                        )}
                        <FilterSection
                          title="Location"
                          styleClass="container-list order-mobile-2"
                          items={filterLocations}
                          handleChange={handleLocationChange}
                        />
                        {filterColors.length !== 0 && (
                          <FilterSection
                            title="Colors"
                            styleClass="container-list order-mobile-1"
                            items={filterColors}
                            handleChange={handleColorChange}
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
                      return (
                        <>
                          <li className="product-item grid-item" data-get-tag data-aos="d:loop">
                            <ProductCard
                              key={index}
                              index={index}
                              product={product}
                              variantData={variantData}
                              selectedVariant={
                                selectedVariants[index] || variantData[0]
                              }
                              handleImageHover={handleImageHover}
                            />
                          </li>
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

const FilterSection = ({ styleClass, title, items, handleChange }) => {
  return (
    <div className={styleClass}>
      <h3 className="filter-title">{title}</h3>
      <div className="list-filter">
        {items.map((item, index) => (
          <div key={index} className="container-checkbox list-filter-item">
            <label className="checkbox-box">
              <input
                type="checkbox"
                checked={item.checked || false}
                onChange={() => handleChange(item)}
              />
              <span className="checkmark"></span>
              <span className="filter-tag capitalize">{item.label}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  )
};
export default CategoryPage;
