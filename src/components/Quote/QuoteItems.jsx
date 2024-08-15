import { generateImageURL, generateImageUrl2 } from "@/Utils/GenerateImageURL";
import {
  extractSlugFromUrl,
  findColor,
  findLocation,
  locations,
} from "@/Utils/Utils";
import AnimateLink from "../Common/AnimateLink";
import React from "react";

const QuoteItems = ({ quoteData }) => {
  if (!quoteData || quoteData.length === 0) return null;

  const renderFullItem = (cart, index) => {
    const {
      quantity,
      productName,
      url,
      image,
      physicalProperties,
      descriptionLines,
    } = cart.fullItem;

    const colors = findColor(descriptionLines).join("-");
    const location = findLocation(descriptionLines);

    return (
      <li key={index} className="list-item" style={{ margin: "8px 0" }}>
        <input type="hidden" name="sku[]" defaultValue="MODCH09" />
        <div className="cart-product">
          <div className="container-img">
            <img
              src={generateImageURL({
                wix_url: image,
                h: "100",
                w: "100",
              })}
              alt={productName.original}
            />
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
                  <span className="specs-text">{physicalProperties.sku}</span>
                </li>
                {/* <li className="size hidden">
                  <span className="specs-title">Size</span>
                  <span className="specs-text">19”L X 15.5”W X 27.5”H</span>
                </li> */}
                <li className="color">
                  <span className="specs-title">Color</span>
                  <span className="specs-text">{colors}</span>
                </li>
                <li className="location">
                  <span className="specs-title">Location</span>
                  <span className="specs-text">
                    {locations[location]} <i className="icon-pin"></i>
                  </span>
                </li>
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
    const { quantity, name, url, src, description, location } = cart;

    return (
      <li key={index} className="list-item" style={{ margin: "8px 0" }}>
        <input type="hidden" name="sku[]" defaultValue="MODCH09" />
        <div className="cart-product">
          <div className="container-img">
            <img
              src={generateImageUrl2({
                wix_url: src,
                h: "100",
                w: "100",
              })}
              alt={name}
            />
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
