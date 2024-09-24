"use client";
import React, { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove } from '@dnd-kit/sortable';
import { ImageWrapper } from '../Common/ImageWrapper';
import { markPageLoaded } from '@/Utils/AnimationFunctions';
import { bulkUpdateCollection } from '@/Services/AdminApis';
import { revalidatePage } from '@/Services/RevalidateService';
import { chunkArray } from '@/Utils/Utils';
import logError from '@/Utils/ServerActions';

const SortableItem = ({ product }) => {
    const { _id, name, mainMedia } = product;
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: _id });
    const style = {
        transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
        transition
    };

    return (
        <li ref={setNodeRef} style={style} {...attributes} {...listeners} className="grid-item touch-action-none">
            <div className="product-link small saved-products active">
                <div className="cursor-pointer link">
                    <div className="container-top">
                        <h2 className="product-title">{name}</h2>
                    </div>
                    <div className="wrapper-product-img">
                        <div className="container-img product-img active">
                            <ImageWrapper url={mainMedia} defaultDimensions={{ width: 350, height: 350 }} />
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
};

export const ProductsListing = ({ data, slug }) => {
    const pageSize = 16;
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [pageLimit, setPageLimit] = useState(pageSize);
    const [loading, setLoading] = useState(false);

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
                product.data.orderNumber[slug] = index;
                return product;
            });
            if (!updatedProducts.length) return;
            const chunkedItems = chunkArray(updatedProducts, 200);
            for (const chunk of chunkedItems) {
                try {
                    await bulkUpdateCollection("DemoProductsData", chunk);
                    // console.log("Bulk update response:", res.bulkActionMetadata);
                } catch (error) {
                    logError("Error updating chunk:", error);
                }
            }
            revalidatePage(`/admin/manage-products/${slug}`);
        } catch (error) {
            logError("Sort update request was not successful completely.", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setInitialData();
        setTimeout(markPageLoaded, 500);
    }, [data]);

    return (
        <div className="wrapper-account">
            <div className="wrapper-bottom d-flex-lg products-listing-admin">
                <h1 className="fs--60 blue-1 split-words">Products</h1>
                <div className="d-flex-lg flex-mobile-center align-self-center ml-auto mt-10">
                    <button onClick={handleSave} className="btn-3-blue btn-blue btn-small mr-10 order-mobile-1" disabled={loading}>
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
                                {filteredProducts.slice(0, pageLimit).map((item) => {
                                    const { data } = item;
                                    return (
                                        <SortableItem key={data.product._id} product={data.product} />
                                    )
                                })}
                            </ul>
                        </SortableContext>
                    </DndContext>
                )}
                {pageLimit < filteredProducts.length && (
                    <div className="flex-center">
                        <button onClick={() => setPageLimit((prev) => prev + pageSize)} className="btn-border-blue mt-90">
                            <span>See more</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
