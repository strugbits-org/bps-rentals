"use client";
import React, { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove } from '@dnd-kit/sortable';
import { ImageWrapper } from '../Common/ImageWrapper';
import { markPageLoaded, updatedWatched } from '@/Utils/AnimationFunctions';
import { bulkUpdateCollection } from '@/Services/AdminApis';
import { revalidatePage } from '@/Services/RevalidateService';
import { chunkArray } from '@/Utils/Utils';
import logError from '@/Utils/ServerActions';
import useUserData from '@/Hooks/useUserData';
import Error404Page from '../Error404Page';
import AutoClickWrapper from '../Common/AutoClickWrapper';
import { PERMISSIONS } from '@/Utils/Schema/permissions';

const SortableItem = ({ index, product }) => {
    const { _id, name, mainMedia } = product;
    const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef } = useSortable({ id: _id });
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    const style = {
        transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
        transition,
    };

    useEffect(() => {
        const handleTouchDetection = () => {
            setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
        };

        handleTouchDetection();
        window.addEventListener('resize', handleTouchDetection);

        return () => window.removeEventListener('resize', handleTouchDetection);
    }, []);

    return (
        <li ref={setNodeRef} style={style} {...attributes} className="grid-item no-select sorting-product" data-cursor-style="off">
            <div className="product-link small saved-products active">
                {isTouchDevice && (
                    <div className="container-tags drag-handle cursor-move touch-action-none" ref={setActivatorNodeRef} {...listeners}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="rgba(15,65,250,1)">
                            <path d="M18 11V8L22 12L18 16V13H13V18H16L12 22L8 18H11V13H6V16L2 12L6 8V11H11V6H8L12 2L16 6H13V11H18Z"></path>
                        </svg>
                    </div>
                )}
                <div className={`cursor-pointer link ${!isTouchDevice ? "cursor-move" : ""} `} {...(!isTouchDevice && listeners)}>
                    <div className="container-top">
                        <h2 className="product-title">{name}</h2>
                    </div>
                    <div className="wrapper-product-img">
                        <div className="container-img product-img active">
                            <ImageWrapper url={mainMedia} defaultDimensions={{ width: 350, height: 350 }} />
                        </div>
                    </div>
                </div>
                <div className="container-color-options">
                    <div className="colors-number">
                        <span>{index + 1}</span>
                    </div>
                </div>
            </div>
        </li>
    );
};

export const ProductsListing = ({ selectedCategoryData, data, slug }) => {
    const pageSize = 20;
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [pageLimit, setPageLimit] = useState(pageSize);
    const [loading, setLoading] = useState(false);
    const { permissions } = useUserData();
    const ADMIN_PANEL_ACCESS = permissions && permissions.includes(PERMISSIONS.ADMIN_PANEL_ACCESS);


    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id || loading) return;
        setFilteredProducts(prev => {
            const oldIndex = prev.findIndex(item => item.data.product._id === active.id);
            const newIndex = prev.findIndex(item => item.data.product._id === over.id);
            return arrayMove(prev, oldIndex, newIndex);
        });
    };

    const setInitialData = () => {
        const sortedProducts = [...data].sort((a, b) => {
            const orderA = a.data.orderNumber && a.data.orderNumber[slug] !== undefined ? a.data.orderNumber[slug] : 0;
            const orderB = b.data.orderNumber && b.data.orderNumber[slug] !== undefined ? b.data.orderNumber[slug] : 0;
            return orderA - orderB;
        });
        setFilteredProducts(sortedProducts);
    };


    const handleSave = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const updatedProducts = filteredProducts.map((item, index) => {
                const product = { ...item }
                if (!product.data.orderNumber) {
                    product.data.orderNumber = {};
                }
                product.data.orderNumber[slug] = index;
                return product;
            });
            if (!updatedProducts.length) return;
            const chunkedItems = chunkArray(updatedProducts, 200);
            for (const chunk of chunkedItems) {
                try {
                    await bulkUpdateCollection("DemoProductData", chunk);
                } catch (error) {
                    logError("Error updating chunk:", error);
                }
            }
            revalidatePage(`/admin/manage-products-sorting/${slug}`);
            revalidatePage(`/category/${slug}`);
        } catch (error) {
            logError("Error updating sort order:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAutoSeeMore = () => {
        setPageLimit((prev) => prev + pageSize);
        updatedWatched(true);
    }

    useEffect(() => {
        setInitialData();
        setTimeout(markPageLoaded, 500);
    }, [data]);

    if (!ADMIN_PANEL_ACCESS) return <Error404Page inline={true} />

    return (
        <div className="wrapper-account">
            <div className="wrapper-bottom d-flex-lg products-listing-admin">
                <h1 className="fs--60 blue-1 split-words">{selectedCategoryData?.name || "All"}</h1>
                <div className="d-flex-lg flex-mobile-center align-self-center ml-auto mt-10">
                    <button onClick={handleSave} className={`btn-3-blue btn-blue btn-small mr-10 order-mobile-1 ${loading ? "btn-disabled" : ""}`} disabled={loading}>
                        <span>{loading ? "Saving" : "Save"}</span>
                    </button>
                    <button onClick={setInitialData} className="btn-1 btn-border-blue btn-small" disabled={loading}>
                        <span>Reset</span>
                    </button>
                </div>
            </div>
            <div className="wrapper-bottom mt-lg-60 mt-tablet-35 mt-phone-25">
                {filteredProducts.length === 0 ? (
                    <div style={{ margin: '20vh auto' }}>
                        <h6 className="fs--20 text-center split-words">No Products Found</h6>
                    </div>
                ) : (
                    <DndContext onDragEnd={handleDragEnd}>
                        <SortableContext items={filteredProducts.map((item) => item.data.product._id)}>
                            <ul className="list-saved-products grid-lg-25 grid-tablet-33 grid-phone-50">
                                {filteredProducts.slice(0, pageLimit).map((item, index) => {
                                    const { data } = item;
                                    return (
                                        <SortableItem key={data.product._id} index={index} product={data.product} />
                                    )
                                })}
                            </ul>
                        </SortableContext>
                    </DndContext>
                )}
                {pageLimit < filteredProducts.length && (
                    <div className="flex-center">
                        <AutoClickWrapper onIntersect={handleAutoSeeMore}>
                            <button onClick={handleAutoSeeMore} className="btn-border-blue mt-90">
                                <span>See more</span>
                            </button>
                        </AutoClickWrapper>
                    </div>
                )}
            </div>
        </div>
    );
};
