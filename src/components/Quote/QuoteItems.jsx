import { locations } from "@/Utils/Utils";
import React, { useState } from "react";
import useUserData from "@/Hooks/useUserData";
import { ImageWrapper } from "../Common/ImageWrapper";
import { PERMISSIONS } from "@/Utils/Schema/permissions";
import { CartItem, CartItemGroup } from "../Cart/CartItem";
import { useEffect } from "react";

const QuoteItems = ({ quoteData }) => {
  const { permissions } = useUserData();
  const SHOW_PRICES = permissions && permissions.includes(PERMISSIONS.SHOW_PRICES);
  const [cartItems, setCartItems] = useState([]);


  const renderFullItem = (cart) => {
    const { fullItem } = cart;

    return (
      fullItem.productSets && fullItem.productSets.length ? (
        <CartItemGroup
          key={fullItem._id}
          data={fullItem}
          isReadOnly={true}
          handleQuantityChange={() => { }}
          updateProducts={() => { }}
          removeProduct={() => { }}
        />
      ) : (
        <CartItem
          key={fullItem._id}
          data={fullItem}
          isReadOnly={true}
          handleQuantityChange={() => { }}
          updateProducts={() => { }}
          removeProduct={() => { }}
        />
      )
    );
  };

  const renderSimpleItem = (cart, index) => {
    const { quantity, name, price, src, description, location } = cart;
    const formattedPrice = `$ ${(price * quantity).toLocaleString()}`

    return (
      <li key={index} className="list-item list-item-cart">
        <div className="cart-product">
          <div className="container-img">
            <ImageWrapper defaultDimensions={{ width: 120, height: 120 }} url={src} type="2" />
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
                {SHOW_PRICES && (
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

  useEffect(() => {
    if (!quoteData?.length) return;
  
    // Separate items with and without productSetId in a single loop for better efficiency
    const productSets = [];
    const items = [];
    quoteData.forEach((item) => {
      const customFields = item?.fullItem?.catalogReference?.options?.customTextFields;
      if (customFields?.productSetId) {
        productSets.push(item);
      } else {
        items.push(item);
      }
    });
  
    // Map items and attach corresponding productSets if `isProductSet` is true
    const data = items.map((item) => {
      const isProductSet = item?.fullItem?.catalogReference?.options?.customTextFields?.isProductSet;
      if (!isProductSet) return item;
  
      // Find and attach associated product sets
      const associatedSets = productSets
        .filter((set) =>
          set?.fullItem?.catalogReference?.options?.customTextFields?.productSetId ===
          item?.fullItem?.catalogReference?.catalogItemId
        )
        .map((set) => set.fullItem);
  
      return {
        ...item,
        fullItem: { ...item.fullItem, productSets: associatedSets },
      };
    });
  
    setCartItems(data);
  }, [quoteData]);
  

  if (!quoteData || !quoteData?.length) return;

  return (
    <React.Fragment>
      {cartItems.map((cart, index) => cart.fullItem ? renderFullItem(cart, index) : renderSimpleItem(cart, index))}
    </React.Fragment>
  );
};

export default QuoteItems;
