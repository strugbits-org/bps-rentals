"use client";
import React, { useEffect, useState } from "react";
import { markPageLoaded, updatedWatched } from "@/Utils/AnimationFunctions";
import Markets from "../Common/Sections/MarketSection";
import { getProductVariants, getProductVariantsImages, getSavedProductData, searchProducts } from "@/Services/ProductsApis";
import { useCookies } from "react-cookie";
import CartModal from "../Common/Modals/CartModal";
import { scoreBasedBanners } from "@/Utils/Utils";
import ProductCard from "../Category/ProductCard";
import { Banner } from "../Category/Banner";
import AutoClickWrapper from "../Common/AutoClickWrapper";
import logError from "@/Utils/ServerActions";
import { useSearchParams } from "next/navigation";

const SearchPage = ({
    pageContent,
    bannersData,
    locations,
    marketsData,
    colorsData,
    bestSeller
}) => {
    let bannerIndex = -1;
    const pageSize = 6;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(["location", "searchFilterColors", "searchShowProductSets", "searchScrollPosition", "searchPageSize", "searchLoadPrevState", "searchLastActiveColor"]);

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
    const [productSetsFilter, setproductSetsFilter] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [searchCompleted, setSearchCompleted] = useState(false);

    const searchParams = useSearchParams();

    const handleFilterChange = async (colors = []) => {
        setLoading(true);
        try {
            const selectedColors = colors?.length > 0 ? colors.filter((x) => x.checked).map((x) => x.label) : filterColors.filter((x) => x.checked).map((x) => x.label);
            const products = await searchProducts({ term: searchTerm, location: cookies.location, colors: selectedColors, pageLimit: pageSize, productSets: productSetsFilter });
            if (products.length < pageSize) setSearchCompleted(true);

            setFilteredProducts(products);
            updatedWatched(true, true);
        } catch (error) {
            logError("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleColorChange = (data) => {
        setLastActiveColor(data.label !== lastActiveColor ? data.label : null);

        const updatedColors = filterColors.map((item) => item.label === data.label ? { ...item, checked: !item.checked } : item);
        setFilterColors(updatedColors);

        handleFilterChange(updatedColors);
        setCookie("searchFilterColors", updatedColors, { path: "/" });
    };

    const handleLocationChange = (data) => {
        setCookie("location", data.value, { path: "/" });
    };

    const setInitialValues = async () => {
        setLoading(true);
        if (colorsData) {
            const categoryId = "00000000-000000-000000-000000000001";
            const filteredColor = colorsData.find((x) => x.category === categoryId);
            if (filteredColor) {
                const colors = filteredColor.colors.map((x) => {
                    return { label: x, checked: false };
                });
                setFilterColors(colors);
            }
        }

        const searchTerm = searchParams.get("query");
        if (searchTerm) setSearchTerm(searchTerm);

        const filteredData = await searchProducts({ term: searchTerm, location: cookies.location, pageLimit: pageSize });
        if (filteredData.length < pageSize) setSearchCompleted(true);
        setFilteredProducts(filteredData);

        // if ((cookies?.searchFilterColors?.length !== 0 || cookies?.searchShowProductSets) && cookies?.searchLoadPrevState) {
        //     if (cookies.searchFilterColors) setFilterColors(cookies.searchFilterColors);
        //     if (cookies.searchShowProductSets) setproductSetsFilter(cookies.searchShowProductSets);
        //     if (cookies.searchLastActiveColor) setLastActiveColor(cookies.searchLastActiveColor);
        //     handleFilterChange({ filteredData, colors: cookies.searchFilterColors || [] });
        // }

        // if (cookies?.searchLoadPrevState) {
        //     setTimeout(() => {
        //         if (cookies.searchScrollPosition) window.scrollTo(0, cookies.searchScrollPosition);
        //         setTimeout(() => {
        //             updatedWatched(true, true);
        //             setLoading(false);
        //             setEnableFilterTrigger(true);
        //             clearPageState();
        //         }, 500);
        //     }, 500);
        // } else {
        // }
        setTimeout(() => {
            updatedWatched(true, true);
            setLoading(false);
            setEnableFilterTrigger(true);
            clearPageState();
        }, 500);

        const savedProducts = await getSavedProductData();
        setSavedProductsData(savedProducts);

        // while (filteredProducts.length < 120) {
        //     const filteredData = await searchProducts({ term: searchTerm, location: cookies.location, pageLimit: pageSize, skip: filteredProducts.length });
        //     const updatedProductsData = [...filteredProducts, ...filteredData];            
        //     setFilteredProducts(updatedProductsData);

        //     if (filteredData.length < pageSize) {
        //         setSearchCompleted(true);
        //         break;
        //     }
        // }

    };
    useEffect(() => {
        setFilterLocations(
            locations.map((x) =>
                cookies.location === x.value
                    ? { ...x, checked: true }
                    : { ...x, checked: false }
            )
        );
        if (enableFilterTrigger) handleFilterChange();
    }, [cookies.location]);

    useEffect(() => {
        if (enableFilterTrigger) handleFilterChange();
        setCookie("searchShowProductSets", productSetsFilter, { path: "/" });
    }, [productSetsFilter]);

    useEffect(() => {
        const banners = scoreBasedBanners({ bannersData, random: 3 });
        setSortedBanners(banners);
    }, [bannersData]);

    useEffect(() => {
        setTimeout(() => {
            markPageLoaded(true);
        }, 400);
        setInitialValues();
    }, [searchParams]);

    const getSelectedProductSnapShots = async (productData, activeVariant) => {
        setSelectedProductData(productData);
        try {
            const productId = productData.product._id;
            const [productSnapshotData, productVariantsData] = await Promise.all([
                getProductVariantsImages(productId),
                getProductVariants(productId)
            ]);

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

    const handleAutoSeeMore = async () => {
        try {
            setIsPageLoading(true);
            const selectedColors = filterColors.filter((x) => x.checked).map((x) => x.label);
            const products = await searchProducts({ term: searchTerm, location: cookies.location, colors: selectedColors, pageLimit: pageSize, productSets: productSetsFilter, skip: filteredProducts.length });
            if (products.length < pageSize) setSearchCompleted(true);

            const updatedProductsData = [...filteredProducts, ...products];
            setFilteredProducts(updatedProductsData);
            updatedWatched(true);
        } catch (error) {
            logError("Error fetcing more products:", error);
        } finally {
            setIsPageLoading(false);
        }
    }

    const savePageState = () => {
        const scrollPosition = window.scrollY;
        setCookie("searchScrollPosition", scrollPosition, { path: "/" });
        setCookie("searchPageSize", filteredProducts.length, { path: "/" });
        setCookie("searchLastActiveColor", lastActiveColor, { path: "/" });
    };

    const clearPageState = () => {
        removeCookie("searchFilterColors", { path: "/" });
        removeCookie("searchShowProductSets", { path: "/" });
        removeCookie("searchScrollPosition", { path: "/" });
        removeCookie("searchPageSize", { path: "/" });
        removeCookie("searchLoadPrevState", { path: "/" });
        removeCookie("searchLastActiveColor", { path: "/" });
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
            <section className="section-category-content section-category-fixed-pin min-h-100">
                <div className="container-fluid">
                    <div className="row pos-relative">
                        <div className="col-12">
                            <h1
                                className="d-block section-category-title fs--60 fw-600 pb-lg-50 pb-tablet-20 pb-phone-30"
                            >
                                Search Results for: {searchTerm}
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
                                                    title="Products Sets"
                                                    styleClass="container-list order-mobile-3"
                                                    items={[{
                                                        label: "Show Products Sets",
                                                        checked: productSetsFilter
                                                    }]}
                                                    handleChange={() => { setproductSetsFilter(prev => !prev) }}
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
                                <ul className="product-list grid-lg-33 grid-tablet-50 grid-list">
                                    {!loading && filteredProducts.map((data, index) => {
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
                                                        onProductRedirect={savePageState}
                                                        lastActiveColor={lastActiveColor}
                                                        savedProductsData={savedProductsData}
                                                        setSavedProductsData={setSavedProductsData}
                                                    />
                                                </li>
                                                {shouldInsertBanner && <Banner data={sortedBanners[bannerIndex]} />}
                                            </React.Fragment>
                                        );
                                    })}

                                </ul>
                                {filteredProducts.length === 0 && !loading && (
                                    <h6
                                        className="fs--40 text-center mt-90"
                                    >
                                        No Products Found
                                    </h6>
                                )}
                                <h6
                                    className="fs--40 text-center mt-90"
                                >
                                    {searchCompleted}
                                </h6>
                                {loading &&
                                    <div className="mt-50 d-flex justify-content-center">
                                        <div className="loader-small"></div>
                                    </div>
                                }
                                {!loading && isPageLoading &&
                                    <div className="mt-50 d-flex justify-content-center">
                                        <div className="loader-small"></div>
                                    </div>
                                }
                                {!loading && !isPageLoading && !searchCompleted && filteredProducts.length > 0 && (
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
export default SearchPage;
