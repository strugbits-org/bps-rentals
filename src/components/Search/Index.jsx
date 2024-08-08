"use client";
import React, { useEffect, useState } from "react";
import { markPageLoaded, updatedWatched } from "@/Utils/AnimationFunctions";
import Markets from "../Common/Sections/MarketSection";
import {
    getSavedProductData,
} from "@/Services/ProductsApis";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import CartModal from "../Common/Modals/CartModal";
import useUserData from "@/Hooks/useUserData";
import { compareArray, shuffleArray } from "@/Utils/Utils";
import ProductCard from "../Category/ProductCard";
import { Banner } from "../Category/Banner";

const SearchPage = ({
    searchFor,
    pageContent,
    bannersData,
    locations,
    marketsData,
    colorsData,
    productsData,
    bestSeller
}) => {
    const pageSize = 18;
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [pageLimit, setPageLimit] = useState(pageSize);
    const [cookies, setCookie] = useCookies(["location"]);
    const [filterColors, setFilterColors] = useState([]);
    const [filterLocations, setFilterLocations] = useState([]);
    const [enableFilterTrigger, setEnableFilterTrigger] = useState(false);

    const [shuffledBanners, setShuffledBanners] = useState([]);

    const [selectedVariants, setSelectedVariants] = useState({});
    const [savedProductsData, setSavedProductsData] = useState([]);
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

    const handleVariantChange = (productIndex, variant) => {
        setSelectedVariants((prevSelectedVariants) => ({
            ...prevSelectedVariants,
            [productIndex]: variant,
        }));
    };

    const handleFilterChange = async ({ colors = [] }) => {
        try {
            const selectedColors =
                colors?.length !== 0
                    ? colors.filter((x) => x.checked).map((x) => x.label)
                    : filterColors.filter((x) => x.checked).map((x) => x.label);

            const selectedLocation = cookies.location;

            const filteredProductsList = productsData.filter((product) => {
                let hasVariants, hasColor, hasLocation;
                if (selectedColors.length !== 0) {
                  const variantFilter = selectedColors.map(x => `${cookies.location}-${x}`);
                  hasVariants = compareArray(variantFilter, product.variantColorLocation);
        
                  return hasVariants;
        
                } else {
                  hasColor =
                    selectedColors.length > 0
                      ? product.colors.some((color) => selectedColors.includes(color))
                      : true;
        
                  hasLocation = selectedLocation
                    ? product.location.includes(selectedLocation)
                    : true;
                    
                  return hasLocation && hasColor;
                }
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
        setCookie("location", data.value, { path: "/" });
    };

    const setInitialValues = async () => {
        const categoryId = "00000000-000000-000000-000000000001";

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

        const products = productsData.filter((product) => product.location.some((x) => x === cookies.location));
        setFilteredProducts(products);

        const savedProducts = await getSavedProductData();
        setSavedProductsData(savedProducts);

        setTimeout(markPageLoaded, 500);
        setTimeout(setEnableFilterTrigger(true), 500);
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
        setShuffledBanners(shuffleArray([...bannersData]));
    }, [bannersData]);

    useEffect(() => {
        setInitialValues();
    }, []);

    const getSelectedProductSnapShots = async (productData) => {
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
            if (filteredVariantData && filteredVariantData.length > 0) {
                handleImageChange({
                    index: 0,
                    selectedVariantData: filteredVariantData[0].variant,
                    productSnapshots: productSnapshotData,
                    modalUrl: filteredVariantData[0].zipUrl,
                });
            }
        } catch (error) {
            console.log("Error:", error);
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
                        <div className="col-12">
                            <h1
                                className="d-block section-category-title fs--60 fw-600 pb-lg-50 pb-tablet-20 pb-phone-30 split-words"
                                data-aos
                            >
                                Search Results for: {searchFor}
                            </h1>
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
                                                        bestSeller={bestSeller}
                                                        product={product}
                                                        categories={data?.subCategoryData || []}
                                                        variantData={variantData}
                                                        selectedVariant={
                                                            selectedVariants[index] || variantData[0]
                                                        }
                                                        filteredProducts={filteredProducts}
                                                        handleVariantChange={handleVariantChange}
                                                        getSelectedProductSnapShots={
                                                            getSelectedProductSnapShots
                                                        }
                                                        filterColors={filterColors}
                                                        savedProductsData={savedProductsData}
                                                        setSavedProductsData={setSavedProductsData}
                                                    />
                                                </li>
                                                {(index + 1) % 6 === 0 && (
                                                    <Banner key={`banner-${index}`} data={shuffledBanners[Math.floor((index + 1) / 6) % shuffledBanners.length]} />
                                                )}
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
export default SearchPage;
