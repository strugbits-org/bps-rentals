"use client";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { markPageLoaded, updatedWatched } from "@/Utils/AnimationFunctions";
import { generateImageURL } from "@/Utils/GenerateImageURL";
import {
  calculateTotalCartQuantity,
  extractSlugFromUrl,
  formatDescriptionLines,
  formatPrice,
} from "@/Utils/Utils";

import {
  removeProductFromCart,
  updateProductsQuantityCart,
} from "@/Services/CartApis";

import AnimateLink from "../Common/AnimateLink";
import useUserData from "@/Hooks/useUserData";

const CartPage = ({ cartData }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cookies, setCookie] = useCookies([
    "authToken",
    "userData",
    "cartQuantity",
    "userTokens",
  ]);
  const { role } = useUserData();

  const handleQuantityChange = async (id, quantity, disabled) => {
    if (quantity < 10000 && quantity > 0) {
      const updatedLineItems = cartItems.map((x) => {
        if (id === x._id) {
          x.quantity = Number(quantity);
        }
        return x;
      });
      setCartItems(updatedLineItems);
      if (!disabled) updateProducts(id, quantity);
    }
  };

  const updateProducts = async (id, quantity) => {
    try {
      const lineItems = [
        {
          _id: id,
          quantity: quantity,
        },
      ];

      const response = await updateProductsQuantityCart(lineItems);

      const total = calculateTotalCartQuantity(response.cart.lineItems);
      setCookie("cartQuantity", total);
    } catch (error) {
      console.error("Error while updating cart:", error);
    }
  };

  const removeProduct = async (id) => {
    try {
      setCartItems((prevCartItems) =>
        prevCartItems.filter((item) => item._id !== id)
      );
      updatedWatched();
      const response = await removeProductFromCart([id]);
      const total = calculateTotalCartQuantity(response.cart.lineItems);

      setCartItems(response.cart.lineItems);
      setCookie("cartQuantity", total);
    } catch (error) {
      console.error("Error while removing product", error);
    }
  };

  useEffect(() => {
    if (cartData) {
      setCartItems(cartData);
      const total = calculateTotalCartQuantity(cartData);
      setCookie("cartQuantity", total > 0 ? String(total) : "0");
    }
    setTimeout(() => {
      markPageLoaded();
    }, 1000);
  }, [cartData]);

  return (
    <section className="cart-intro pt-40 pb-lg-195 pb-tablet-70 pb-phone-135">
      <div className="container-fluid pos-relative z-5">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="container-title flex-center">
              <h1
                className="fs--60 blue-1 text-center split-words"
                data-aos="d:loop"
              >
                Your Cart
              </h1>
            </div>
            <div
              data-form-container-cart
              className="mt-lg-55 mt-tablet-40 mt-phone-30"
            >
              <form action="" className="form-cart">
                <ul className="list-cart list-cart-product" data-aos="d:loop">
                  {cartItems &&
                    cartItems.map((cart, index) => {
                      const {
                        _id,
                        quantity,
                        productName,
                        url,
                        image,
                        physicalProperties,
                        descriptionLines,
                        price,
                      } = cart;

                      const formattedDescription = formatDescriptionLines(descriptionLines);
                      return (
                        <li key={index} className="list-item">
                          <input
                            type="hidden"
                            name="sku[]"
                            defaultValue="MODCH09"
                          />
                          <div className="cart-product">
                            <div className="container-img">
                              <img
                                src={generateImageURL({
                                  wix_url: image,
                                  h: "63",
                                  w: "63",
                                })}
                                className=" "
                              />
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
                                    return (
                                      <li className="location">
                                        <span className="specs-title">
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
                                  {/* <li className="customize-text">
                                    <span className="specs-title">
                                      Customize text
                                    </span>
                                    <input
                                      type="text"
                                      placeholder="Lorem Ipsum"
                                    />
                                  </li> */}
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
                      );
                    })}
                  {cartItems.length === 0 && (
                    <h6
                      className="fs--40 blue-1 text-center split-words"
                      style={{ margin: "28vh auto" }}
                      data-aos="d:loop"
                    >
                      No Products in Cart
                    </h6>
                  )}
                </ul>
                <div className="container-btn mt-md-40 mt-phone-40">
                  {cartItems.length > 0 && (
                    <AnimateLink
                      to="/quote-request"
                      className="btn-1 btn-large btn-blue w-100 bt-submit"
                      data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                    >
                      <span>Request for quote</span>
                      <i className="icon-arrow-right"></i>
                    </AnimateLink>
                  )}
                  <AnimateLink
                    to={`/category/${"new"}`}
                    className="btn-1 btn-border btn-border-blue btn-shopping btn-icon-left mt-lg-35 mt-mobile-20"
                    data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                  >
                    <i className="icon-arrow-diagonal-left"></i>
                    <span>Continue shopping</span>
                  </AnimateLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
