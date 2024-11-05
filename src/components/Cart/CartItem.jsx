import { extractSlugFromUrl, formatDescriptionLines, formatPrice } from '@/Utils/Utils';
import React from 'react'
import { ImageWrapper } from '../Common/ImageWrapper';
import { PERMISSIONS } from '@/Utils/Schema/permissions';
import useUserData from '@/Hooks/useUserData';
import AnimateLink from '../Common/AnimateLink';

export const CartItem = ({ data, handleQuantityChange, updateProducts, removeProduct }) => {
    const { permissions } = useUserData();
    const SHOW_PRICES = permissions && permissions.includes(PERMISSIONS.SHOW_PRICES);

    const { _id, quantity, productName, url, image, physicalProperties, descriptionLines, price } = data;
    const formattedDescription = formatDescriptionLines(descriptionLines);

    return (
        <li className="list-item">
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
                        <button
                            onClick={() => removeProduct(_id)}
                            type="button"
                            className="btn-cancel"
                        >
                            <i className="icon-close"></i>
                        </button>
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

                            {SHOW_PRICES && (
                                <li className="price">
                                    <span className="specs-title">Price</span>
                                    <span className="specs-text">
                                        {formatPrice(price, quantity)}
                                    </span>
                                </li>
                            )}
                        </ul>
                        <div className="quantity">
                            <span className="fs--20 no-mobile">
                                Quantity
                            </span>
                            <div className="container-input container-input-quantity">
                                <button
                                    onClick={() =>
                                        handleQuantityChange(_id, quantity - 1)
                                    }
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
                                    onInput={(e) =>
                                        handleQuantityChange(
                                            _id,
                                            e.target.value,
                                            true
                                        )
                                    }
                                    onBlur={(e) =>
                                        updateProducts(_id, e.target.value)
                                    }
                                />
                                <button
                                    onClick={() =>
                                        handleQuantityChange(_id, quantity + 1)
                                    }
                                    type="button"
                                    className="plus"
                                >
                                    <i className="icon-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    )
}

export const CartItemGroup = ({ data, handleQuantityChange, updateProducts, removeProduct }) => {
    const { permissions } = useUserData();
    const SHOW_PRICES = permissions && permissions.includes(PERMISSIONS.SHOW_PRICES);

    const { _id, productName, url, image, productSets } = data;
    const ids = [_id, ...productSets.map((item) => item._id)];

    return (
        <li className="list-item">
            <div className="cart-product set-product-group">
                <div className="container-img no-mobile">
                    <ImageWrapper key={_id} defaultDimensions={{ width: 120, height: 120 }} url={image} />
                </div>
                <div className="wrapper-product-info product-set">
                    <div className="container-top">
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
                        <div>
                            <button
                                onClick={() => removeProduct(ids)}
                                type="button"
                                className="btn-cancel"
                            >
                                <i className="icon-close"></i>
                            </button>
                        </div>
                    </div>
                    <h4 className={"fs--25 mb-10"}>
                        <span>SETS OF PRODUCTS</span>
                    </h4>
                    <div className="container-specs">
                        {productSets.map((item) => {
                            const formattedDescription = formatDescriptionLines(item.descriptionLines);
                            return (
                                <div key={item._id} className='product-set-cart'>
                                    <div className="container-img">
                                        <ImageWrapper key={item._id} defaultDimensions={{ width: 60, height: 60 }} min_w={60} min_h={60} url={item.image} />
                                    </div>
                                    <ul className="list-specs">
                                        <li className="name">
                                            <span className="specs-title">Name</span>
                                            <span className="specs-text">
                                                {item.productName.original}
                                            </span>
                                        </li>
                                        <li className="sku">
                                            <span className="specs-title">SKU</span>
                                            <span className="specs-text">
                                                {item.physicalProperties.sku}
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

                                        {SHOW_PRICES && (
                                            <li className="price">
                                                <span className="specs-title">Price</span>
                                                <span className="specs-text">
                                                    {formatPrice(item.price, item.quantity)}
                                                </span>
                                            </li>
                                        )}
                                    </ul>
                                    <div className="quantity">
                                        <span className="fs--20">
                                            Quantity
                                        </span>
                                        <div className="container-input container-input-quantity">
                                            <button
                                                onClick={() =>
                                                    handleQuantityChange(item._id, item.quantity - 1)
                                                }
                                                type="button"
                                                className="minus"
                                            >
                                                <i className="icon-minus"></i>
                                            </button>
                                            <input
                                                type="number"
                                                min="1"
                                                value={item.quantity}
                                                placeholder="1"
                                                className="input-number"
                                                onInput={(e) =>
                                                    handleQuantityChange(
                                                        item._id,
                                                        e.target.value,
                                                        true
                                                    )
                                                }
                                                onBlur={(e) =>
                                                    updateProducts(item._id, e.target.value)
                                                }
                                            />
                                            <button
                                                onClick={() =>
                                                    handleQuantityChange(item._id, item.quantity + 1)
                                                }
                                                type="button"
                                                className="plus"
                                            >
                                                <i className="icon-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>
            </div>
        </li>
    )
}