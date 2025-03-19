"use client";
import React, { useEffect, useState } from "react";
import { markPageLoaded, updatedWatched } from "@/Utils/AnimationFunctions";
import Markets from "../Common/Sections/MarketSection";
import AnimateLink from "../Common/AnimateLink";
import ProductCard from "./ProductCard";
import {
  getSavedProductData,
} from "@/Services/ProductsApis";
import { useCookies } from "react-cookie";
import CartModal from "../Common/Modals/CartModal";
import { Banner } from "./Banner";
import { compareArray, extractCategoryIds, scoreBasedBanners } from "@/Utils/Utils";
import AutoClickWrapper from "../Common/AutoClickWrapper";
import logError from "@/Utils/ServerActions";

const CategoryPage = ({
  slug,
  pageContent,
  bannersData,
  locations,
  marketsData,
  colorsData,
  selectedCategoryData,
  bestSeller,
  productsData,
}) => {
  const pageSize = 18;
  let bannerIndex = -1;

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pageLimit, setPageLimit] = useState(pageSize);
  const [cookies, setCookie, removeCookie] = useCookies(["location", "filterColors", "filterCategories", "showProductSets", "scrollPosition", "pageSize", "loadPrevState", "lastActiveColor", "categorySlug"]);
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterColors, setFilterColors] = useState([]);
  const [lastActiveColor, setLastActiveColor] = useState();
  const [filterLocations, setFilterLocations] = useState([]);
  const [enableFilterTrigger, setEnableFilterTrigger] = useState(false);

  const [sortedBanners, setSortedBanners] = useState([]);

  const [savedProductsData, setSavedProductsData] = useState([]);
  const [selectedProductData, setSelectedProductData] = useState(null);
  const [productSnapshots, setProductSnapshots] = useState();
  const [selectedVariantData, setSelectedVariantData] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [productFilteredVariantData, setProductFilteredVariantData] = useState();

  const [categoriesDropdown, setCategoriesDropdown] = useState(false);
  const [productSetsFilter, setProductSetsFilter] = useState(false);

  const handleFilterChange = async ({ categories = [], colors = [] }) => {
    try {
      const checkedCategories = categories.length !== 0
        ? categories.filter((x) => x.checked).map((x) => x._id)
        : filterCategories.filter((x) => x.checked).map((x) => x._id);

      const categoryIds = extractCategoryIds(selectedCategoryData);

      const selectedCategories =
        checkedCategories?.length !== 0
          ? checkedCategories
          : categoryIds;
      const selectedColors =
        colors?.length !== 0
          ? colors.filter((x) => x.checked).map((x) => x.label)
          : filterColors.filter((x) => x.checked).map((x) => x.label);

      const selectedLocation = cookies.location;


      const filteredProductsList = productsData.filter((product) => {
        if (productSetsFilter && (!product?.productSets || product?.productSets?.length === 0)) return false;
        const hasCategory =
          selectedCategories.length > 0
            ? product.subCategoryData.some((subCat) =>
              selectedCategories.includes(subCat._id)
            )
            : true;

        let hasVariants, hasColor, hasLocation;
        if (selectedColors.length !== 0) {
          const variantFilter = selectedColors.map(x => `${cookies.location}-${x}`);
          hasVariants = compareArray(variantFilter, product.variantColorLocation);

          return hasVariants && hasCategory;

        } else {
          hasColor =
            selectedColors.length > 0
              ? product.colors.some((color) => selectedColors.includes(color))
              : true;

          const productHasLocation = product.location.includes(selectedLocation);
          const variantHasLocation = productHasLocation ? product.variantData.some(variant => variant.location.includes(selectedLocation)) : false;
          hasLocation = productHasLocation && variantHasLocation;
          return hasLocation && hasColor && hasCategory;
        }
      });

      const sortedProducts = [...filteredProductsList].sort((a, b) => {
        const orderA = a?.orderNumber && a.orderNumber[slug] !== undefined ? a.orderNumber[slug] : 0;
        const orderB = b?.orderNumber && b.orderNumber[slug] !== undefined ? b.orderNumber[slug] : 0;
        return orderA - orderB;
      });

      setFilteredProducts(sortedProducts);
      updatedWatched(true, true);
    } catch (error) {
      logError("Error fetching products:", error);
    }
  };

  const handleColorChange = (data) => {
    setLastActiveColor(data.label !== lastActiveColor ? data.label : null);
    const updatedColors = filterColors.map((item) =>
      item.label === data.label ? { ...item, checked: !item.checked } : item
    );
    setFilterColors(updatedColors);
    handleFilterChange({ colors: updatedColors });
    setCookie("filterColors", updatedColors, { path: "/" });
  };
  const handleLocationChange = (data) => {
    setCookie("location", data.value, { path: "/" });
  };
  const handleCategoryChange = (data) => {
    const updatedCategories = filterCategories.map((item) =>
      item._id === data._id ? { ...item, checked: !item.checked } : item
    );
    setFilterCategories(updatedCategories);
    handleFilterChange({ categories: updatedCategories });
    const categoriesFilters = updatedCategories.filter((x) => x.checked).map((x) => { return { _id: x._id, checked: x.checked, name: x.name } });
    setCookie("filterCategories", categoriesFilters, { path: "/" });
  };
  useEffect(() => {
    if (enableFilterTrigger) handleFilterChange({});
    setCookie("showProductSets", productSetsFilter, { path: "/" });
  }, [productSetsFilter]);

  const setInitialValues = async () => {
    const categoryId =
      selectedCategoryData?.parentCollection?._id ||
      selectedCategoryData?._id ||
      "00000000-000000-000000-000000000001";

    let categories = [];
    // set category filters
    if (selectedCategoryData && selectedCategoryData.level2Collections !== undefined
    ) {
      categories = selectedCategoryData.level2Collections
        .filter((x) => x._id)
        .map((x) => ({
          ...x,
          checked: false,
          label: x.name,
        }));
      setFilterCategories(categories);
    }

    // set filter colors
    if (colorsData) {
      const filteredColor = colorsData.find((x) => x.category === categoryId);
      if (filteredColor) {
        const colors = filteredColor.colors.map((x) => {
          return { label: x, checked: false };
        });
        setFilterColors(colors);
      }
    }    

    if ((cookies?.filterColors?.length !== 0 || cookies?.filterCategories?.length !== 0 || cookies?.showProductSets) && cookies?.loadPrevState && cookies?.categorySlug) {
      if (cookies.filterCategories) setFilterCategories(categories.map((x) => { return { ...x, checked: cookies.filterCategories.some((y) => y._id === x._id) } }));
      if (cookies.filterColors) setFilterColors(cookies.filterColors);
      if (cookies.showProductSets) setProductSetsFilter(cookies.showProductSets);
      if (cookies.lastActiveColor) setLastActiveColor(cookies.lastActiveColor);
      handleFilterChange({ colors: cookies.filterColors || [], categories: cookies.filterCategories || [] });
    } else {
      const filteredProducts = productsData.filter((product) => {
        const productHasLocation = product.location.includes(cookies.location);
        const variantHasLocation = productHasLocation ? product.variantData.some(variant => variant.location.includes(cookies.location)) : false;
        return productHasLocation && variantHasLocation;
      });

      const sortedProducts = filteredProducts.sort((a, b) => {
        const orderA = a?.orderNumber && a.orderNumber[slug] !== undefined ? a.orderNumber[slug] : 0;
        const orderB = b?.orderNumber && b.orderNumber[slug] !== undefined ? b.orderNumber[slug] : 0;
        return orderA - orderB;
      });

      setFilteredProducts(sortedProducts);
    }

    if (cookies?.loadPrevState && cookies?.categorySlug === slug) {
      if (cookies.pageSize) setPageLimit(cookies.pageSize);
      setTimeout(() => {
        if (cookies.scrollPosition) window.scrollTo(0, cookies.scrollPosition);
        setTimeout(() => {
          markPageLoaded(true, false);
          setEnableFilterTrigger(true);
          clearPageState();
        }, 500);
      }, 500);
    } else {
      setTimeout(() => {
        markPageLoaded(true);
        setEnableFilterTrigger(true);
        clearPageState();
      }, 500);
    }

    const savedProducts = await getSavedProductData();
    setSavedProductsData(savedProducts);

  };
  useEffect(() => {
    setFilterLocations(
      locations.map((x) =>
        cookies.location === x.value
          ? { ...x, checked: true }
          : { ...x, checked: false }
      )
    );
    if (enableFilterTrigger) handleFilterChange({});
  }, [cookies.location]);

  useEffect(() => {
    const slugField = "link-copy-of-category-name-2";
    const currentCategory = selectedCategoryData?.parentCollection?.[slugField] || selectedCategoryData?.[slugField] || "";
    const banners = scoreBasedBanners({ bannersData, currentCategory });

    setSortedBanners(banners);
  }, [bannersData, selectedCategoryData]);

  useEffect(() => {
    setInitialValues();
  }, []);

  const getSelectedProductSnapShots = async (productData, activeVariant) => {
    setSelectedProductData(productData);
    try {
      const { productSnapshotData, productVariantsData } = productData;

      let dataMap = new Map(
        productVariantsData.map((item) => [item.sku.toLowerCase(), item])
      );
      let filteredVariantData;
      if (productVariantsData && productData) {
        filteredVariantData = productData.variantData.filter((variant) => {
          const normalizedSku = variant.sku.toLowerCase();
          if (dataMap.has(normalizedSku)) {
            const dataItem = dataMap.get(normalizedSku);
            variant.variant.variantId = dataItem._id;
            return true;
          }
          return false;
        });
      }
      setProductSnapshots(productSnapshotData);
      setProductFilteredVariantData(filteredVariantData);
      const currentActiveIndex = productData.variantData.findIndex(x => x.variant._id === activeVariant.variant._id);
      const currentActive = productData.variantData[currentActiveIndex];

      if (filteredVariantData && currentActive && filteredVariantData.length > 0) {
        handleImageChange({
          index: currentActiveIndex,
          selectedVariantData: currentActive.variant,
          productSnapshots: productSnapshotData,
          modalUrl: currentActive.zipUrl,
        });
      }
    } catch (error) {
      logError("Error:", error);
    }
  };

  const handleImageChange = ({
    index,
    selectedVariantData,
    productSnapshots,
    modalUrl,
  }) => {
    if (productSnapshots) {
      const selectedVariantFilteredData = productSnapshots.find(
        (variant) => variant.colorVariation === selectedVariantData.variantId
      );

      if (selectedVariantFilteredData && selectedVariantFilteredData?.images) {
        const combinedVariantData = {
          ...selectedVariantData,
          ...selectedVariantFilteredData,
          modalUrl: modalUrl,
        };

        setSelectedVariantIndex(index);
        setSelectedVariantData(combinedVariantData);
      } else {
        const combinedVariantData = {
          ...selectedVariantData,
          ...selectedVariantFilteredData,
          modalUrl: modalUrl,
          images: [{ src: selectedVariantData.imageSrc }],
        };
        setSelectedVariantIndex(index);
        setSelectedVariantData(combinedVariantData);
      }
    }
  };

  const handleAutoSeeMore = () => {
    setPageLimit((prev) => prev + pageSize);
    updatedWatched(true);
  }

  const savePageState = () => {
    const scrollPosition = window.scrollY;
    setCookie("scrollPosition", scrollPosition, { path: "/" });
    setCookie("pageSize", pageLimit, { path: "/" });
    setCookie("lastActiveColor", lastActiveColor, { path: "/" });
    setCookie("categorySlug", slug, { path: "/" });
  }

  const clearPageState = () => {
    removeCookie("filterColors", { path: "/" });
    removeCookie("filterCategories", { path: "/" });
    removeCookie("showProductSets", { path: "/" });
    removeCookie("scrollPosition", { path: "/" });
    removeCookie("pageSize", { path: "/" });
    removeCookie("loadPrevState", { path: "/" });
    removeCookie("lastActiveColor", { path: "/" });
    removeCookie("categorySlug", { path: "/" });
};

  return (
    <>
      <CartModal
        productData={selectedProductData}
        setProductData={setSelectedProductData}
        productSnapshots={productSnapshots}
        productFilteredVariantData={productFilteredVariantData}
        selectedVariantData={selectedVariantData}
        setSelectedVariantData={setSelectedVariantData}
        handleImageChange={handleImageChange}
        selectedVariantIndex={selectedVariantIndex}
        setProductSnapshots={setProductSnapshots}
        setProductFilteredVariantData={setProductFilteredVariantData}
        bestSeller={bestSeller}
        savedProductsData={savedProductsData}
        setSavedProductsData={setSavedProductsData}
      />
      <section className="section-category-content section-category-fixed-pin">
        <div className="container-fluid">
          <div className="row pos-relative">
            <div className="col-12">
              {selectedCategoryData && (
                <h1
                  className="d-block section-category-title fs--60 fw-600 pb-lg-50 pb-tablet-20 pb-phone-30 split-words"
                  data-aos
                >
                  {selectedCategoryData.parentCollection
                    ? selectedCategoryData.parentCollection.name
                    : selectedCategoryData.name}
                </h1>
              )}
            </div>

            <div className={"col-12 col-tablet-6 z-6"}>
              <div className={`container-category-filter pb-lg-60 pb-mobile-40 ${!filterCategories.length ? "no-mobile" : ""}`}>
                <div
                  className="blog-tags dropdown-tags"
                  data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                >
                  <button
                    className="btn-tag-mobile no-desktop"
                    onClick={() => { setCategoriesDropdown(prev => !prev) }}
                  >
                    <span>All Categories</span>
                    <i className="icon-arrow-down"></i>
                  </button>
                  <div className={`list-dropdown ${categoriesDropdown ? "active" : ""}`}>
                    <div className="container-wrapper-list">
                      <div className="wrapper-list">
                        <ul className="list-blog-tags list-dropdown-tags">
                          {filterCategories.map((item, index) => (
                            <li key={index}>
                              <AnimateLink
                                to={item["link-copy-of-category-name-2"]}
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
                          title="Products Sets"
                          styleClass="container-list order-mobile-3"
                          items={[{
                            label: "Show Products Sets",
                            checked: productSetsFilter
                          }]}
                          handleChange={() => { setProductSetsFilter(prev => !prev) }}
                        />
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
                <ul className="product-list grid-lg-33 grid-tablet-50 grid-list min-h-100">
                  {filteredProducts.slice(0, pageLimit).map((data, index) => {
                    const shouldInsertBanner = (index + 1) % 12 === 0 && sortedBanners.length > 0;
                    if (shouldInsertBanner) bannerIndex = (bannerIndex + 1) % sortedBanners.length;

                    return (
                      <React.Fragment key={index}>
                        <li
                          key={index}
                          className="product-item grid-item"
                          data-get-tag
                          data-aos="d:loop"
                        >
                          <ProductCard
                            key={index}
                            bestSeller={bestSeller}
                            productData={data}
                            filteredProducts={filteredProducts}
                            getSelectedProductSnapShots={getSelectedProductSnapShots}
                            lastActiveColor={lastActiveColor}
                            savedProductsData={savedProductsData}
                            setSavedProductsData={setSavedProductsData}
                            onProductRedirect={savePageState}
                          />
                        </li>
                        {shouldInsertBanner && <Banner data={sortedBanners[bannerIndex]} />}
                      </React.Fragment>
                    );
                  })}
                  {filteredProducts.length === 0 && (
                    <h6
                      className="w-full fs--40 text-center split-words mt-90"
                      data-aos="d:loop"
                    >
                      No Products Found
                    </h6>
                  )}

                </ul>
                {pageLimit < filteredProducts.length && (
                  <div className="flex-center">
                    <AutoClickWrapper onIntersect={handleAutoSeeMore}>
                      <button
                        onClick={handleAutoSeeMore}
                        className="btn-border-blue mt-90"
                        data-aos="fadeIn .6s ease-in-out 0s, d:loop"
                      >
                        <span>See more</span>
                      </button>
                    </AutoClickWrapper>
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
  );
};
export default CategoryPage;