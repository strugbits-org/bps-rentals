"use client";
import React, { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import { SortableContext, useSortable, arrayMove } from '@dnd-kit/sortable';
import { ImageWrapper } from '../Common/ImageWrapper';
import { markPageLoaded } from '@/Utils/AnimationFunctions';
import { UpdateProductsSorting } from '@/Services/AdminApis';

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
    const [updatedProducts, setUpdatedProducts] = useState([]);
    const [pageLimit, setPageLimit] = useState(pageSize);

    useEffect(() => {
        initListing();
        setTimeout(markPageLoaded, 500);
    }, [data]);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = filteredProducts.findIndex(item => item.product._id === active.id);
        const newIndex = filteredProducts.findIndex(item => item.product._id === over.id);
        const activeProduct = data.find(({ data }) => data.product._id === active.id);

        if (!activeProduct) return;

        const updatedProduct = { ...activeProduct };
        if (!updatedProduct.data.orderNumber) {
            updatedProduct.data.orderNumber = {};
        }
        updatedProduct.data.orderNumber[slug] = newIndex;

        setUpdatedProducts(prev => {
            const existingIndex = prev.findIndex(p => p.data.product._id === updatedProduct.data.product._id);
            if (existingIndex !== -1) {
                const updatedProducts = [...prev];
                updatedProducts[existingIndex] = updatedProduct;
                return updatedProducts;
            }
            return [...prev, updatedProduct];
        });

        setFilteredProducts(prev => arrayMove(prev, oldIndex, newIndex));
    };


    const initListing = () => {
        setFilteredProducts(
            data
                .sort((a, b) => {
                    const orderA = a.data.orderNumber?.[slug] ?? 0;
                    const orderB = b.data.orderNumber?.[slug] ?? 0;
                    return orderA + orderB;
                })
                .map(x => x.data)
        );

    };

    const handleSave = async () => {
        if (!updatedProducts.length) return;
        const res = await UpdateProductsSorting(updatedProducts);
        // console.log("res", res);
    };

    return (
        <div className="wrapper-account">
            <div className="wrapper-bottom d-flex-lg products-listing-admin">
                <h1 className="fs--60 blue-1 split-words">Products</h1>
                <div className="d-flex-lg flex-mobile-center align-self-center ml-auto mt-10">
                    <button onClick={handleSave} className="btn-3-blue btn-blue btn-small mr-10 order-mobile-1">
                        <span>Save</span>
                    </button>
                    <button onClick={initListing} className="btn-1 btn-border-blue btn-small">
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
                        <SortableContext items={filteredProducts.map((item) => item.product._id)}>
                            <ul className="list-saved-products grid-lg-25 grid-tablet-33 grid-phone-50">
                                {filteredProducts.slice(0, pageLimit).map((item) => (
                                    <SortableItem key={item.product._id} product={item.product} />
                                ))}
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
