"use client";
import React, { useState, useEffect } from 'react';
import useUserData from '@/Hooks/useUserData';
import Error404Page from '../Error404Page';
import { markPageLoaded } from '@/Utils/AnimationFunctions';
import { ImageWrapper } from '../Common/ImageWrapper';
import CreateProductSetModal from '../Common/Modals/CreateProductSetModal';
import { PERMISSIONS } from '@/Utils/Schema/permissions';
import logError from '@/Utils/ServerActions';
import { getProductForUpdate, updateDataItem } from '@/Services/AdminApis';
import { revalidatePage } from '@/Services/RevalidateService';
import EditProductSetModal from '../Common/Modals/editProductSetModal';
import { toast } from 'react-toastify';

export const ProductSets = ({ products, productSets }) => {

    const [dataSets, setDataSets] = useState([]);
    const [toggleCreateNewModal, setToggleCreateNewModal] = useState(false);
    const [toggleEditSetModal, setToggleEditSetModal] = useState(false);
    const [activeSet, setActiveSet] = useState();
    const { permissions } = useUserData();
    const ADMIN_PANEL_ACCESS = permissions && permissions.includes(PERMISSIONS.ADMIN_PANEL_ACCESS);

    const removeSet = async (id, alert = true) => {
        const prevDataSets = [...dataSets];
        try {
            setDataSets(prev => prev.filter(set => set.product._id !== id));
            const productData = await getProductForUpdate(id);
            productData.data.productSets = [];
            await updateDataItem(productData);
            if (alert) toast.info("Product set removed successfully");
            revalidatePage("/admin/manage-product-sets");
        } catch (error) {
            logError("Error:", error);
            setDataSets(prevDataSets);
        }
    }

    const handleOnSave = (data) => {
        if (activeSet) {
            setDataSets(prev => prev.filter(set => set?.product._id !== activeSet?.product._id));
            removeSet(activeSet?.product._id, false);
            setActiveSet(null);
            toast.info("Product set updated successfully");
        } else {
            toast.info("Product set created successfully");
        }
        setDataSets(prev => [data, ...prev]);
        revalidatePage("/admin/manage-product-sets");
    }

    const handleUpdateSet = (id) => {
        const set = dataSets.find(set => set?.product._id === id);
        setActiveSet(set);
        setToggleEditSetModal(true);
    }

    const handleOnUpdate = (data) => {
        setDataSets(prev => prev.map(set => set?.product._id === data?.product._id ? data : set));
        setActiveSet(null);
        toast.info("Product set updated successfully");
        revalidatePage("/admin/manage-product-sets");
    }

    useEffect(() => {
        setDataSets(productSets);
        markPageLoaded();
    }, [])


    if (!ADMIN_PANEL_ACCESS) return <Error404Page inline={true} />

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
                                    <li key={index} className="list-item mb-30">
                                        <div className="cart-product cart-product-2" style={{ backgroundColor: "var(--white-1)" }}>
                                            <div className="container-img">
                                                <ImageWrapper key={_id} defaultDimensions={{ width: 120, height: 120 }} timeout={0} min_w={120} min_h={120} url={mainMedia} />
                                            </div>
                                            <div className="wrapper-product-info">
                                                <div className="container-top">
                                                    <div className="container-product-name">
                                                        <h2 className="product-name">{name}</h2>
                                                        <button
                                                            onClick={() => { handleUpdateSet(_id) }}
                                                            className="btn-view"
                                                        >
                                                            <span>Edit</span>
                                                            <i className="icon-arrow-right"></i>
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeSet(_id)}
                                                        type="button"
                                                        className="btn-cancel"
                                                    >
                                                        <i className="icon-close"></i>
                                                    </button>
                                                </div>
                                                {item?.productSets.length ? (
                                                    <>
                                                        <h4 className={"fs--25 mb-10"}>
                                                            <span>SETS OF PRODUCTS</span>
                                                        </h4>
                                                        <div className="container-specs">
                                                            <ul className={"sets-listing"}>
                                                                {item.productSets.map(set => {
                                                                    if (!set) return null;
                                                                    const product = products.find(product => product._id === set.product);
                                                                    const variant = product.variantData.find(variant => variant.sku === set.variant);
                                                                    return (
                                                                        <li key={set.variant} className={"fs--15"}> {product.product.name} {variant.variant.color ? `| ${variant.variant.color}` : ""} | {variant.sku}</li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                    </>
                                                ) : null}
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
            {toggleCreateNewModal && <CreateProductSetModal setToggleCreateNewModal={setToggleCreateNewModal} products={products.filter(product => !product?.productSets || !product.productSets.length)} onSave={handleOnSave} />}
            {toggleEditSetModal && activeSet && <EditProductSetModal activeSet={activeSet} setToggleEditSetModal={setToggleEditSetModal} products={products.filter(product => !product?.productSets || !product.productSets.length)} onUpdate={handleOnUpdate} onSave={handleOnSave} />}
        </>
    );
};
