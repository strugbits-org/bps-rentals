import React, { useEffect, useState } from 'react'
import ProductCard from '../Category/ProductCard';
import { markPageLoaded, updatedWatched } from '@/Utils/AnimationFunctions';
import { getSavedProductData } from '@/Services/ProductsApis';
import CartModal from '../Common/Modals/CartModal';

export const MarketBestSeller = ({ products, bestSeller }) => {
    const pageSize = 6;
    const [pageLimit, setPageLimit] = useState(pageSize);
    const [savedProductsData, setSavedProductsData] = useState([]);
    const [successMessageVisible, setSuccessMessageVisible] = useState(false);
    const [errorMessageVisible, setErrorMessageVisible] = useState(false);
    const [selectedProductData, setSelectedProductData] = useState(null);
    const [productSnapshots, setProductSnapshots] = useState();
    const [selectedVariantData, setSelectedVariantData] = useState(null);
    const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
    const [productFilteredVariantData, setProductFilteredVariantData] =
        useState();

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

    const fetchSavedProducts = async () => {
        const savedProducts = await getSavedProductData();
        setSavedProductsData(savedProducts);
    }

    useEffect(() => {
        markPageLoaded();
        fetchSavedProducts();
    }, [])

    return (
        <>
            <CartModal
                productData={selectedProductData}
                setProductData={setSelectedProductData}
                setErrorMessageVisible={setErrorMessageVisible}
                setSuccessMessageVisible={setSuccessMessageVisible}
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
                bestSellerProducts={true}
            />
            <section className="market-products pb-lg-225 pb-tablet-100 pb-phone-170">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <ul className="market-products-list">
                                {products && products.slice(0, pageLimit).map((item, index) => {
                                    return (
                                        <li key={index} className="list-item">
                                            <ProductCard
                                                key={index}
                                                productData={item}
                                                getSelectedProductSnapShots={getSelectedProductSnapShots}
                                                savedProductsData={savedProductsData}
                                                setSavedProductsData={setSavedProductsData}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                            {pageLimit < products.length && (
                                <div className="flex-center">
                                    <button
                                        className="btn-border-blue mt-lg-90 mt-tablet-40 mt-phone-50"
                                        onClick={() => {
                                            setPageLimit((prev) => prev + pageSize);
                                            updatedWatched(true);
                                        }}
                                    >
                                        <span>See more</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
