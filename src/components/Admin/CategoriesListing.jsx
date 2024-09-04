"use client"
import { markPageLoaded } from '@/Utils/AnimationFunctions'
import React, { useEffect, useState } from 'react'
import AnimateLink from '../Common/AnimateLink'

export const CategoriesListing = ({ data }) => {

    console.log("data", data);

    const [categories, setCategories] = useState(data);

    useEffect(() => {
        markPageLoaded();
    }, [])

    return (
        <div className="wrapper-account">
            <div className="wrapper-top">
                <h1 className="fs--60 blue-1 split-words" data-aos="d:loop">
                    Categories
                </h1>
            </div>
            <div className="wrapper-bottom mt-lg-60 mt-tablet-35 mt-phone-25">
                <ul
                    className="list-saved-products grid-lg-25 grid-tablet-33 grid-phone-50"
                    data-aos="fadeIn .8s ease-in-out .4s, d:loop"
                >
                    {categories.length === 0 ? (
                        <div style={{ margin: "20vh auto" }}>
                            <h6 className="fs--20 text-center split-words ">
                                No Categories Found
                            </h6>
                        </div>
                    ) : (
                        categories.map((category, index) => {
                            const { name, slug } = category;
                            return (
                                <li key={index} className="grid-item">
                                    <div className="product-link small saved-products active" >
                                        <AnimateLink to={slug} className="link">
                                            <div className="container-top">
                                                <h2 className="product-title">{name}</h2>
                                            </div>
                                            <div className="wrapper-product-img">
                                                <div className="container-img product-img active">
                                                    <img src="https://static.wixstatic.com/media/626075_42a57f202dc4411295917195bc94ee5b~mv2.jpg/v1/fill/w_346,h_346,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/compress.webp" />
                                                </div>
                                            </div>
                                        </AnimateLink>
                                    </div>
                                </li>
                            );
                        })
                    )}
                </ul>
            </div>
        </div>
    )
}
