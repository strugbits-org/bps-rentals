import React, { useState } from 'react'
import ProductCard from '../Category/ProductCard';
import { updatedWatched } from '@/Utils/AnimationFunctions';

export const MarketBestSeller = ({ products }) => {
    const [selectedVariants, setSelectedVariants] = useState({});
    const pageSize = 6;
    const [pageLimit, setPageLimit] = useState(pageSize);

    const handleVariantChange = (index, variant) => {
        setSelectedVariants((prevSelectedVariants) => ({
            ...prevSelectedVariants,
            [index]: variant,
        }));
    };
    return (
        <section className="market-products pb-lg-225 pb-tablet-100 pb-phone-170">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        <ul className="market-products-list">
                            {products && products.slice(0, pageLimit).map((item, index) => {
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
                                            handleVariantChange={handleVariantChange}
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
    )
}
