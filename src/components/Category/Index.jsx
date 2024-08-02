"use client";
import React, { useEffect, useState } from "react";
import { markPageLoaded, updatedWatched } from "@/Utils/AnimationFunctions";
import Markets from "../Common/Sections/MarketSection";
import AnimateLink from "../Common/AnimateLink";
import { HotTrendsCategory } from "../Common/Sections/HotTrendsSection";
import ProductCard from "./ProductCard";
import { BannerOurTeam } from "../Common/Sections/BannerOurTeam";
import { getProductVariants, getProductVariantsImages } from "@/Services/ProductsApis";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import CartModal from "../Common/Modals/CartModal";
import useUserData from "@/Hooks/useUserData";

const CategoryPage = ({
  pageContent,
  locations,
  marketsData,
  colorsData,
  selectedCategoryData,
  productsData,
}) => {
  const pageSize = 18;
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pageLimit, setPageLimit] = useState(pageSize);
  const [cookies, setCookie] = useCookies(["location"]);
  const [filterCategories, setFilterCategories] = useState([]);
  const [filterColors, setFilterColors] = useState([]);
  const [filterLocations, setFilterLocations] = useState([]);
  const [enableFilterTrigger, setEnableFilterTrigger] = useState(false);

  const [selectedVariants, setSelectedVariants] = useState({});
  const [savedProductsData, setSavedProductsData] = useState([]);

  const handleImageHover = (productIndex, variant) => {
    setSelectedVariants((prevSelectedVariants) => ({
      ...prevSelectedVariants,
      [productIndex]: variant,
    }));
  };

  const handleFilterChange = async ({ categories = [], colors = [] }) => {
    try {
      const checkedCategories = categories
        ? categories.filter((x) => x.checked).map((x) => x._id)
        : filterCategories.filter((x) => x.checked).map((x) => x._id);
      const selectedCategories =
        checkedCategories?.length !== 0
          ? checkedCategories
          : [
            selectedCategoryData?.parentCollection?._id ||
            selectedCategoryData?._id,
          ];
      const selectedColors =
        colors?.length !== 0
          ? colors.filter((x) => x.checked).map((x) => x.label)
          : filterColors.filter((x) => x.checked).map((x) => x.label);

      const selectedLocation = cookies.location;

      const filteredProductsList = productsData.filter((product) => {
        const hasCategory = selectedCategories.length > 0
          ? product.subCategory.some(subCat => selectedCategories.includes(subCat._id))
          : true;

        const hasColor = selectedColors.length > 0
          ? product.colors.some(color => selectedColors.includes(color))
          : true;

        const hasLocation = selectedLocation
          ? product.location.includes(selectedLocation)
          : true;

        return hasCategory && hasColor && hasLocation;
      });
      setFilteredProducts(filteredProductsList);
      updatedWatched(true);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleColorChange = (data) => {
    const updatedColors = filterColors.map((item) =>
      item.label === data.label ? { ...item, checked: !item.checked } : item
    );
    setFilterColors(updatedColors);
    handleFilterChange({ colors: updatedColors });
  };
  const handleLocationChange = (data) => {
    setCookie('location', data.value, { path: '/' });
  };
  const handleCategoryChange = (data) => {
    const updatedCategories = filterCategories.map((item) =>
      item._id === data._id ? { ...item, checked: !item.checked } : item
    );
    setFilterCategories(updatedCategories);
    handleFilterChange({ categories: updatedCategories });
  };

  const setInitialValues = () => {
    const categoryId = selectedCategoryData?.parentCollection?._id || selectedCategoryData?._id || '00000000-000000-000000-000000000001';

    // set category filters
    if (selectedCategoryData && selectedCategoryData.level2Collections !== undefined) {
      const categories = selectedCategoryData.level2Collections
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
      const filteredColor = colorsData.find(x => x.category === categoryId);
      if (filteredColor) {
        const colors = filteredColor.colors.map((x) => {
          return { label: x, checked: false };
        });
        setFilterColors(colors);
      }
    }

    console.log("productsData", productsData);
    const products = productsData.filter((product) => product.location.some((x) => x === cookies.location));
    console.log("products", products.length);
    setFilteredProducts(products);

    setTimeout(markPageLoaded, 500);
    setTimeout(setEnableFilterTrigger(true), 500);
  }
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
    setInitialValues();
  }, []);

  const router = useRouter();
  const { memberId } = useUserData();
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [selectedProductData, setSelectedProductData] = useState(null);
  const [productSnapshots, setProductSnapshots] = useState();
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedVariantData, setSelectedVariantData] = useState(null);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [productFilteredVariantData, setProductFilteredVariantData] =
    useState();

  const getSelectedProductSnapShots = async (productData) => {
    setSelectedProductData(productData);
    try {
      const product_id = productData.product._id;
      const [productSnapshotData, productVariantsData] = await Promise.all([
        getProductVariantsImages(product_id),
        getProductVariants(product_id),
      ]);
      // const { productSnapshotData, productVariantsData } = productData;

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
      if (filteredVariantData && filteredVariantData.length > 0) {
        handleImageChange({
          index: 0,
          selectedVariantData: filteredVariantData[0].variant,
          productSnapshots: productSnapshotData,
          modalUrl: filteredVariantData[0].zipUrl,
        });
      }
    } catch (error) {
      console.log('Error:', error);
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

  const changeQuery = (key, value) => {
    pageLoadStart();
    router.query[key] = value;
    router.push(router);
  };

  // const getCategoriesList = async () => {
  //   let categories;
  //   if (router.query.category === undefined) {
  //     let collectionIds = collectionsData.map((x) => x._id);
  //     if (selectedCollection.length !== 0) {
  //       collectionIds = selectedCollection.map((x) => x._id);
  //     }
  //     const response = await getCategoriesData(collectionIds);
  //     categories = response.map((x) => {
  //       return { ...x.parentCollection, type: 'category' };
  //     });
  //   } else {
  //     categories = selectedCategory[0]?.level2Collections
  //       .filter((x) => x._id !== undefined)
  //       .map((x) => {
  //         return { ...x, type: 'subCategory' };
  //       });
  //   }
  //   setFilterCategories(categories);
  // };

  // useEffect(() => {
  //   if (
  //     router.query.category === undefined ||
  //     (selectedCategory && selectedCategory.length !== 0)
  //   ) {
  //     getCategoriesList();
  //   }
  // }, [router, selectedCollection, collectionsData, selectedCategory]);

  // useEffect(() => {
  //   if (router.query.subCategory && selectedCategory.length !== 0) {
  //     const name = selectedCategory[0]?.level2Collections.find(
  //       (x) => x._id === router.query.subCategory
  //     ).name;
  //     setCategoryTitle(name);
  //   } else {
  //     setCategoryTitle(selectedCategory[0]?.parentCollection?.name);
  //   }
  // }, [router, selectedCategory]);

  return (
    <>
      <CartModal
        setProductData={setSelectedProductData}
        setErrorMessageVisible={setErrorMessageVisible}
        setSuccessMessageVisible={setSuccessMessageVisible}
        productData={selectedProductData}
        productSnapshots={productSnapshots}
        productFilteredVariantData={productFilteredVariantData}
        selectedVariantData={selectedVariantData}
        setSelectedVariantData={setSelectedVariantData}
        handleImageChange={handleImageChange}
        selectedVariantIndex={selectedVariantIndex}
        setProductSnapshots={setProductSnapshots}
        setProductFilteredVariantData={setProductFilteredVariantData}
      />
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
                    {selectedCategoryData.parentCollection
                      ? selectedCategoryData.parentCollection.name
                      : selectedCategoryData.name}
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
                                        to={
                                          item['link-copy-of-category-name-2']
                                        }
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
                  {filteredProducts.slice(0, pageLimit).map((data, index) => {
                    const { product, variantData } = data;
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
                            index={index}
                            product={product}
                            variantData={variantData}
                            selectedVariant={
                              selectedVariants[index] || variantData[0]
                            }
                            filteredProducts={filteredProducts}
                            handleImageHover={handleImageHover}
                            getSelectedProductSnapShots={
                              getSelectedProductSnapShots
                            }
                            savedProductsData={savedProductsData}
                            setSavedProductsData={setSavedProductsData}
                          />
                        </li>
                        {index === 5 && <HotTrendsCategory />}
                        {index === 11 && <BannerOurTeam />}
                      </React.Fragment>
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
                {/* {filteredProducts.length < totalCount && !loading && ( */}
                {pageLimit < filteredProducts.length && (
                  <div className="flex-center">
                    <button
                      className="btn-border-blue mt-90"
                      onClick={() => {
                        setPageLimit((prev) => prev + pageSize);
                        updatedWatched(true);
                      }}
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
  );
};
export default CategoryPage;
