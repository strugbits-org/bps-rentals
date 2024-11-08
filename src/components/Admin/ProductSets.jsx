"use client";
import React, { useState, useEffect } from 'react';
import useUserData from '@/Hooks/useUserData';
import Error404Page from '../Error404Page';
import { markPageLoaded } from '@/Utils/AnimationFunctions';
import { ImageWrapper } from '../Common/ImageWrapper';
import { PERMISSIONS } from '@/Utils/Schema/permissions';
import logError from '@/Utils/ServerActions';
import { getProductForUpdate, updateDataItem } from '@/Services/AdminApis';
import { revalidatePage } from '@/Services/RevalidateService';
import { toast } from 'react-toastify';
import ProductSetModal from '../Common/Modals/ProductSetModal';

export const ProductSets = ({ products }) => {

    const [dataSets, setDataSets] = useState([]);
    const [toggleEditSetModal, setToggleEditSetModal] = useState(false);
    const [activeSet, setActiveSet] = useState();
    const { permissions } = useUserData();
    const ADMIN_PANEL_ACCESS = permissions && permissions.includes(PERMISSIONS.ADMIN_PANEL_ACCESS);

    const removeSet = async (id, alert = true) => {
        const prevDataSets = [...dataSets];
        try {
            setDataSets(prev => prev.filter(set => set.product !== id));
            const productData = await getProductForUpdate(id);
            productData.data.productSets = [];
            const { slug } = prevDataSets.find(set => set.product === id);
            await updateDataItem(productData);
            if (alert) toast.info("Product set removed successfully");
            revalidatePage(`/product/${slug}`);
            revalidatePage("/admin/manage-product-sets");
        } catch (error) {
            logError("Error:", error);
            setDataSets(prevDataSets);
        }
    }

    const handleOnSave = (data) => {
        if (activeSet) {
            setDataSets(prev => prev.filter(set => set.product !== activeSet?.product));
            removeSet(activeSet.product, false);
            setActiveSet(null);
            toast.info("Product set updated successfully");
        } else {
            toast.info("Product set created successfully");
        }
        const { slug } = data;
        setDataSets(prev => [data, ...prev]);
        revalidatePage(`/product/${slug}`);
        revalidatePage("/admin/manage-product-sets");
    }

    const handleUpdateSet = (id) => {
        const set = dataSets.find(set => set.product === id);
        setActiveSet(set);
        setToggleEditSetModal(true);
    }

    const handleOnUpdate = (data) => {
        setDataSets(prev => prev.map(set => set.product === data.product ? data : set));
        setActiveSet(null);
        const { slug } = data;
        toast.info("Product set updated successfully");
        revalidatePage(`/product/${slug}`);
        revalidatePage("/admin/manage-product-sets");
    }

    useEffect(() => {
        const productSets = products.filter(product => product.product && product.productSets && product.productSets.length).map(({ product, productSets }) => {
            return {
                value: product._id,
                product: product._id,
                slug: product.slug,
                name: product.name,
                image: product.mainMedia,
                label: product.name,
                productSets: productSets,
            }
        });
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
                        <button onClick={() => { setToggleEditSetModal(true) }} className="btn-3-blue btn-blue btn-small mr-10 order-mobile-1">
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
                            {dataSets.map(({ product, name, image, productSets }) => {
                                return (
                                    <li key={product} className="list-item mb-30">
                                        <div className="cart-product cart-product-2" style={{ backgroundColor: "var(--white-1)" }}>
                                            <div className="container-img">
                                                <ImageWrapper key={product} defaultDimensions={{ width: 120, height: 120 }} timeout={0} min_w={120} min_h={120} url={image} />
                                            </div>
                                            <div className="wrapper-product-info">
                                                <div className="container-top">
                                                    <div className="container-product-name">
                                                        <h2 className="product-name">{name}</h2>
                                                        <button
                                                            onClick={() => { handleUpdateSet(product) }}
                                                            className="btn-view"
                                                        >
                                                            <span>Edit</span>
                                                            <i className="icon-arrow-right"></i>
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeSet(product)}
                                                        type="button"
                                                        className="btn-cancel"
                                                    >
                                                        <i className="icon-close"></i>
                                                    </button>
                                                </div>
                                                {productSets.length ? (
                                                    <>
                                                        <h4 className={"fs--25 mb-10"}>
                                                            <span>SETS OF PRODUCTS</span>
                                                        </h4>
                                                        <div className="container-specs">
                                                            <ul className={"sets-listing"}>
                                                                {productSets.map(({ name, color, variant }) => {
                                                                    return (
                                                                        <li key={variant} className={"fs--15"}> {name} {color ? `| ${color}` : ""} | {variant}</li>
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

            {toggleEditSetModal && (
                <ProductSetModal
                    activeSet={activeSet}
                    setActiveSet={setActiveSet}
                    setToggleEditSetModal={setToggleEditSetModal}
                    products={products.filter(({ productSets }) => !productSets?.length)}
                    onUpdate={handleOnUpdate}
                    onSave={handleOnSave}
                />
            )}

        </>
    );
};
