"use client";
import { markPageLoaded } from '@/Utils/AnimationFunctions';
import React, { useEffect, useState } from 'react';
import AnimateLink from '../Common/AnimateLink';
import { ImageWrapper } from '../Common/ImageWrapper';
import { getSlug } from '@/Utils/Utils';

export const CategoriesListing = ({ data }) => {

    const [categories, setCategories] = useState(data);

    useEffect(() => {
        setTimeout(markPageLoaded, 200);
    }, []);

    return (
        <div className="wrapper-account">
            <div className="wrapper-top">
                <h1 className="fs--60 blue-1 split-words" data-aos="d:loop">
                    Categories
                </h1>
            </div>
            <div className="wrapper-bottom mt-lg-60 mt-tablet-35 mt-phone-25">
                {categories.length === 0 ? (
                    <div style={{ margin: '20vh auto' }}>
                        <h6 className="fs--20 text-center split-words">
                            No Categories Found
                        </h6>
                    </div>
                ) : (
                    <ul
                        className="list-saved-products grid-lg-25 grid-tablet-33 grid-phone-50"
                        data-aos="fadeIn .8s ease-in-out .4s, d:loop"
                    >
                        {categories.map((category, index) => {
                            const { name, mainMedia } = category;
                            const slug = getSlug(category["link-copy-of-category-name-2"])
                            return (
                                <li key={index} className="grid-item">
                                    <div className="product-link small saved-products active">
                                        <AnimateLink to={slug} className="link">
                                            <div className="container-top">
                                                <h2 className="product-title">{name}</h2>
                                            </div>
                                            <div className="wrapper-product-img">
                                                <div className="container-img product-img active">
                                                    <ImageWrapper
                                                        timeout={0}
                                                        key={slug}
                                                        defaultDimensions={{ width: 350, height: 350 }}
                                                        url={mainMedia}
                                                    />
                                                </div>
                                            </div>
                                        </AnimateLink>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};
