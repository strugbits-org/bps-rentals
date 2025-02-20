"use client";
import { extractSlugFromUrl, findPriceForTierWithQuantity, findPriceTierForCartSet, formatDescriptionLines, formatPriceEncrypted } from '@/Utils/Utils';
import React, { useEffect, useState } from 'react'
import { ImageWrapper } from '../Common/ImageWrapper';
import { PERMISSIONS } from '@/Utils/Schema/permissions';
import useUserData from '@/Hooks/useUserData';
import AnimateLink from '../Common/AnimateLink';
import "@/assets/style/product-set.css"

export const CartItem = ({ data, isReadOnly, handleQuantityChange, updateProducts, removeProduct }) => {
    const { permissions, pricingTier } = useUserData();
    const SHOW_PRICES = permissions && permissions.includes(PERMISSIONS.SHOW_PRICES);

    const { _id, quantity, productName, url, image, physicalProperties, descriptionLines } = data;
    const formattedDescription = formatDescriptionLines(descriptionLines);

    return (
        <li className="list-item list-item-cart">
            <div className="cart-product">
                <div className="container-img">
                    <ImageWrapper key={_id} defaultDimensions={{ width: 120, height: 120 }} url={image} />
                </div>
                <div className="wrapper-product-info">
                    <div className="container-top">
                        <div className="container-product-name">
                            <h2 className="product-name">
                                {productName.original}
                            </h2>
                            <AnimateLink
                                to={"/product" + extractSlugFromUrl(url)}
                                className="btn-view"
                            >
                                <span>View</span>
                                <i className="icon-arrow-right"></i>
                            </AnimateLink>
                        </div>
                        {!isReadOnly && (
                            <button
                                onClick={() => removeProduct([_id])}
                                type="button"
                                className="btn-cancel"
                            >
                                <i className="icon-close"></i>
                            </button>
                        )}
                    </div>
                    <div className="container-specs">
                        <ul className="list-specs">
                            <li className="sku">
                                <span className="specs-title">SKU</span>
                                <span className="specs-text">
                                    {physicalProperties.sku}
                                </span>
                            </li>
                            {formattedDescription.map((item) => {
                                const { title, value } = item;
                                if (!value) return null;

                                const titleWordCount = title.split(" ").length;
                                const valueWordCount = value.split(" ").length;

                                return (
                                    <li
                                        key={title}
                                        className={`location ${titleWordCount >= 2 || valueWordCount > 4 ? "long-desc" : ""}`}
                                    >
                                        <span className="specs-title capitalize">
                                            {title}
                                        </span>
                                        <span className="specs-text">
                                            {value}
                                            {title === "location" && (
                                                <>
                                                    {" "}
                                                    <i className="icon-pin"></i>
                                                </>
                                            )}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                        <div>
                            {SHOW_PRICES && <div class="fs--24 mb-10 text-right">{findPriceForTierWithQuantity(data, pricingTier, quantity)}</div>}
                            <div className="quantity position-static-lg">
                                <span className="fs--20 no-mobile">
                                    Quantity
                                </span>
                                {isReadOnly ? (
                                    <div className="container-input container-input-quantity">
                                        <input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            placeholder="1"
                                            className="input-number"
                                            readOnly="true"
                                            onChange={() => { }}
                                        />
                                    </div>
                                ) : (
                                    <div className="container-input container-input-quantity">
                                        <button
                                            onClick={() => handleQuantityChange(_id, quantity - 1)}
                                            type="button"
                                            className="minus"
                                        >
                                            <i className="icon-minus"></i>
                                        </button>
                                        <input
                                            type="number"
                                            min="1"
                                            value={quantity}
                                            placeholder="1"
                                            className="input-number"
                                            onInput={(e) => handleQuantityChange(_id, e.target.value, true)}
                                            onBlur={(e) => updateProducts(_id, e.target.value)}
                                        />
                                        <button
                                            onClick={() => handleQuantityChange(_id, quantity + 1)}
                                            type="button"
                                            className="plus"
                                        >
                                            <i className="icon-plus"></i>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export const CartItemGroup = ({ data, isReadOnly, handleQuantityChange, updateProducts, removeProduct }) => {
    const { permissions, pricingTier } = useUserData();
    const SHOW_PRICES = permissions && permissions.includes(PERMISSIONS.SHOW_PRICES);
    const [totalPrice, setTotalPrice] = useState();

    const { _id, productName, url, image, productSets, descriptionLines, physicalProperties } = data;
    const ids = [_id, ...productSets.map((item) => item._id)];
    const formattedDescription = formatDescriptionLines(descriptionLines);
    const location = formattedDescription.find(x => x.title === "location")?.value || "-";
    
    useEffect(() => {
        const prices = productSets.map((set) => {
            const { quantity, price } = set;
            const formattedPrice = pricingTier && set?.pricingTiers?.length ? findPriceForTierWithQuantity(set, pricingTier, quantity) : formatPriceEncrypted(price, quantity);
            const convertToNumber = Number(formattedPrice.replace(/[^\d.-]/g, ''));
            return convertToNumber;
        });
        const total = prices.reduce((acc, x) => acc + x, 0);
        const formattedPrice = `$ ${total.toFixed(2)}`;
        
        setTotalPrice(formattedPrice);
    }, [productSets, pricingTier]);

    return (
        <li className="list-item list-item-cart">
            <div className="cart-product set-product-group">
                <div className="container-img no-mobile">
                    <ImageWrapper key={_id} defaultDimensions={{ width: 120, height: 120 }} url={image} />
                </div>
                <div className="wrapper-product-info product-set">
                    <div className="container-top no-separator">
                        <div className="container-img no-desktop">
                            <ImageWrapper key={_id} defaultDimensions={{ width: 120, height: 120 }} url={image} />
                        </div>
                        <div className="container-product-name">
                            <h2 className="product-name">
                                {productName.original}
                            </h2>
                            <AnimateLink
                                to={"/product" + extractSlugFromUrl(url)}
                                className="btn-view"
                            >
                                <span>View</span>
                                <i className="icon-arrow-right"></i>
                            </AnimateLink>
                        </div>
                        {!isReadOnly && (
                            <div>
                                <button
                                    onClick={() => removeProduct(ids)}
                                    type="button"
                                    className="btn-cancel"
                                >
                                    <i className="icon-close"></i>
                                </button>
                            </div>
                        )}
                        <div className="container-specs w-100 mt-16">
                            <ul className="list-specs">
                                <li className="sku">
                                    <span className="specs-title">SKU</span>
                                    <span className="specs-text">
                                        {physicalProperties.sku}
                                    </span>
                                </li>

                                <li className="location">
                                    <span className="specs-title">LOCATION</span>
                                    <span className="specs-text">
                                        {location}
                                        <i className="icon-pin"></i>
                                    </span>
                                </li>
                            </ul>

                            {SHOW_PRICES && <div className="fs--24">{totalPrice}</div>}
                        </div>
                    </div>
                    <div className="product-set-table">
                        <div className="product-set-item product-set-header fs--18">
                            <span className="name">Product Name</span>
                            <span className="size">Size</span>
                            {SHOW_PRICES && <span className="price">Price</span>}
                            <span className={`quantity ${isReadOnly ? "read-only" : ""}`}>Quantity</span>
                        </div>
                        {productSets.map(item => {
                            const { quantity } = item;
                            const formattedData = formatDescriptionLines(item.descriptionLines);
                            const color = formattedData.find(x => x.title === "Color")?.value || "-";
                            const size = formattedData.find(x => x.title === "Size")?.value || "-";

                            return (
                                <div key={item._id} className="product-set-item fs--16">
                                    <AnimateLink
                                        to={"/product" + extractSlugFromUrl(item.url)}
                                        target={"_blank"}
                                        className="name"
                                    >
                                        {item.productName.original} {color ? `| ${color}` : ""}
                                    </AnimateLink>
                                    <span className="size">{size}</span>
                                    {SHOW_PRICES && <span className="price">{findPriceTierForCartSet(item, pricingTier) || "-"}</span>}
                                    {isReadOnly ? (
                                        <span className="quantity read-only">
                                            {quantity}
                                        </span>
                                    ) : (
                                        <div className="quantity container-add-to-cart">
                                            <div className="container-input container-input-quantity">
                                                <button
                                                    onClick={() => handleQuantityChange(item._id, +quantity - 1)}
                                                    type="button"
                                                    className="minus"
                                                >
                                                    <i className="icon-minus"></i>
                                                </button>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    value={quantity}
                                                    placeholder="1"
                                                    className="input-number fs--16"
                                                    onInput={(e) => handleQuantityChange(item._id, e.target.value, true)}
                                                    onBlur={(e) => updateProducts(item._id, e.target.value)}
                                                />
                                                <button
                                                    onClick={() => handleQuantityChange(item._id, +quantity + 1)}
                                                    type="button"
                                                    className="plus"
                                                >
                                                    <i className="icon-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </li>
    )
}