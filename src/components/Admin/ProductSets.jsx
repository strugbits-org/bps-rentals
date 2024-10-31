"use client";
import React, { useState, useEffect } from 'react';
import useUserData from '@/Hooks/useUserData';
import Error404Page from '../Error404Page';
import { markPageLoaded } from '@/Utils/AnimationFunctions';
import { ImageWrapper } from '../Common/ImageWrapper';
import CreateProductSetModal from '../Common/Modals/CreateProductSetModal';

export const ProductSets = ({ products, productSets }) => {

    const [dataSets, setDataSets] = useState([]);
    const [toggleCreateNewModal, setToggleCreateNewModal] = useState(false);
    const { role } = useUserData();


    const editSet = async (id) => {
        console.log("editSet", id);
    }

    const removeSet = async (id) => {
        console.log("removeSet", id);
    }

    useEffect(() => {
        setDataSets(productSets);
        markPageLoaded();
    }, [])


    if (role !== "admin") return <Error404Page inline={true} />

    return (
        <>
            <div className="create-product-set-wrapper wrapper-account">
                <div className="wrapper-bottom d-flex-lg products-listing-admin">
                    <h1 className="fs--60 blue-1 split-words">PRODUCT SETS</h1>
                    <div className="d-flex-lg flex-mobile-center align-self-center ml-auto mt-10">
                        <button onClick={() => { setToggleCreateNewModal(true) }} className="btn-3-blue btn-blue btn-small mr-10 order-mobile-1">
                            <span>CREATE NEW SET</span>
                        </button>
                    </div>
                </div>
                <div className="wrapper-bottom mt-lg-60 mt-tablet-35 mt-phone-25">
                    {dataSets.length === 0 ? (
                        <div style={{ margin: '20vh auto' }}>
                            <h6 className="fs--20 text-center split-words">No Sets Found</h6>
                        </div>
                    ) : (
                        <ul className="list-cart list-cart-product min-h-100-sm">
                            {dataSets.map((item, index) => {
                                const { product } = item;
                                const { _id, name, mainMedia } = product;
                                return (
                                    <li key={index} className="list-item">
                                        <div className="cart-product">
                                            <div className="container-img">
                                                <ImageWrapper key={_id} defaultDimensions={{ width: 120, height: 120 }} url={mainMedia} />
                                            </div>
                                            <div className="wrapper-product-info">
                                                <div className="container-top">
                                                    <div className="container-product-name">
                                                        <h2 className="product-name">{name}</h2>
                                                        <button
                                                            onClick={() => editSet(item._id)}
                                                            className="btn-view"
                                                        >
                                                            <span>Edit</span>
                                                            <i className="icon-arrow-right"></i>
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeSet(item._id)}
                                                        type="button"
                                                        className="btn-cancel"
                                                    >
                                                        <i className="icon-close"></i>
                                                    </button>
                                                </div>
                                                <h4 className={"fs--25 mb-10"}>
                                                    <span>SETS OF PRODUCTS</span>
                                                </h4>
                                                <div className="container-specs">
                                                    <ul className={"sets-listing"}>
                                                        <li className={"fs--15"}> Charger - Bamboo Slate </li>
                                                        <li className={"fs--15"}> Charger - Bamboo Slate </li>
                                                        <li className={"fs--15"}> Charger - Bamboo Slate </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
            {toggleCreateNewModal && <CreateProductSetModal setToggleCreateNewModal={setToggleCreateNewModal} products={products} />}
        </>
    );
};
