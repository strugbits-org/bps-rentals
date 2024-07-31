import React, { useEffect, useState } from 'react'
import ProductCard from '../Category/ProductCard';
import { getBestSellerProducts } from '@/Services/ProductsApis';
import { updatedWatched } from '@/Utils/AnimationFunctions';

export const MarketBestSeller = ({ products }) => {
    const [selectedVariants, setSelectedVariants] = useState({});
    const [productsData, setProductsData] = useState([]);
    const [totalCount, setTotalCount] = useState();
    const [loading, setLoading] = useState(false);

    const handleImageHover = (index, variant) => {
        setSelectedVariants((prevSelectedVariants) => ({
            ...prevSelectedVariants,
            [index]: variant,
        }));
    };
    const handleSeeMore = async () => {
        try {
            setLoading(true);
            const response = await getBestSellerProducts(products.bestSellerId, 6, productsData.length);
            setProductsData(prev => [...prev, ...response.items]);
            setTotalCount(response.totalCount);
            updatedWatched();
        } catch (error) {
            console.error("Error fetching more products:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        setProductsData(products.items);
        setTotalCount(products.totalCount);
    }, [])


    return (
        <section className="market-products pb-lg-225 pb-tablet-100 pb-phone-170">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        <ul className="market-products-list">
                            {productsData.map((item, index) => {
                                const { product, variantData } = item;

                                return (
                                    <li key={index} className="list-item">
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
                                );
                            })}
                        </ul>
                        {productsData.length < totalCount && !loading && (
                            <div className="flex-center">
                                <button
                                    className="btn-border-blue mt-lg-90 mt-tablet-40 mt-phone-50"
                                    onClick={handleSeeMore}
                                >
                                    <span>See more</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
