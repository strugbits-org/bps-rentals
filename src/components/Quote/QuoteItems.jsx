import {
  extractSlugFromUrl,
  formatDescriptionLines,
  formatPrice,
  locations,
} from "@/Utils/Utils";
import AnimateLink from "../Common/AnimateLink";
import React from "react";
import useUserData from "@/Hooks/useUserData";
import { ImageWrapper } from "../Common/ImageWrapper";

const QuoteItems = ({ quoteData }) => {
  const { role } = useUserData();

  if (!quoteData || quoteData.length === 0) return null;

  const renderFullItem = (cart, index) => {
    const {
      quantity,
      productName,
      url,
      image,
      physicalProperties,
      descriptionLines,
      price
    } = cart.fullItem;
    const formattedDescription = formatDescriptionLines(descriptionLines);

    return (
      <li key={index} className="list-item" style={{ margin: "8px 0" }}>
        <input type="hidden" name="sku[]" defaultValue="MODCH09" />
        <div className="cart-product">
          <div className="container-img">
            <ImageWrapper url={image} />
          </div>
          <div className="wrapper-product-info">
            <div className="container-top">
              <div className="container-product-name">
                <h2 className="product-name">{productName.original}</h2>
                <AnimateLink
                  to={"/product" + extractSlugFromUrl(url)}
                  className="btn-view"
                >
                  <span>View</span>
                  <i className="icon-arrow-right"></i>
                </AnimateLink>
              </div>
              <button type="button" className="btn-cancel hidden">
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
                    <li className={`location ${titleWordCount >= 2 || valueWordCount > 4 ? "long-desc" : ""}`}>
                      <span className="specs-title capitalize">
                        {title}
                      </span>
                      <span className="specs-text">
                        {value}
                        {title === "location" && (<>{" "}<i className="icon-pin"></i></>)}
                      </span>
                    </li>
                  )
                })}
                {role === "admin" && (
                  <li className="price">
                    <span className="specs-title">Price</span>
                    <span className="specs-text">
                      {formatPrice(price, quantity)}
                    </span>
                  </li>
                )}
              </ul>
              <div className="quantity">
                <span className="fs--20 no-mobile">Quantity</span>
                <div className="container-input container-input-quantity">
                  <button type="button" className="minus" disabled hidden>
                    <i className="icon-minus"></i>
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    placeholder="1"
                    className="input-number"
                  />
                  <button type="button" className="plus" disabled hidden>
                    <i className="icon-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  };

  const renderSimpleItem = (cart, index) => {
    const { quantity, name, price, src, description, location } = cart;
    const formattedPrice = `$ ${(price * quantity).toLocaleString()}`

    return (
      <li key={index} className="list-item" style={{ margin: "8px 0" }}>
        <input type="hidden" name="sku[]" defaultValue="MODCH09" />
        <div className="cart-product">
          <div className="container-img">
            <ImageWrapper url={src} type="2" />
          </div>
          <div className="wrapper-product-info">
            <div className="container-top">
              <div className="container-product-name">
                <h2 className="product-name">{description}</h2>
              </div>
              <button type="button" className="btn-cancel hidden">
                <i className="icon-close"></i>
              </button>
            </div>
            <div className="container-specs">
              <ul className="list-specs">
                <li className="sku">
                  <span className="specs-title">SKU</span>
                  <span className="specs-text">{name}</span>
                </li>
                <li className="color hidden ">
                  <span className="specs-title">Color</span>
                  <span className="specs-text">color</span>
                </li>
                <li className="location">
                  <span className="specs-title">Location</span>
                  <span className="specs-text">
                    {locations[location]} <i className="icon-pin"></i>
                  </span>
                </li>
                {role === "admin" && (
                  <li className="price">
                    <span className="specs-title">Price</span>
                    <span className="specs-text">
                      {formattedPrice}
                    </span>
                  </li>
                )}
              </ul>
              <div className="quantity">
                <span className="fs--20 no-mobile">Quantity</span>
                <div className="container-input container-input-quantity">
                  <button type="button" className="minus" disabled hidden>
                    <i className="icon-minus"></i>
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    placeholder="1"
                    className="input-number"
                  />
                  <button type="button" className="plus" disabled hidden>
                    <i className="icon-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  };

  return (
    <React.Fragment>
      {quoteData.map((cart, index) =>
        cart.fullItem
          ? renderFullItem(cart, index)
          : renderSimpleItem(cart, index)
      )}
    </React.Fragment>
  );
};

export default QuoteItems;
