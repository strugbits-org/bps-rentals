"use client";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { markPageLoaded, updatedWatched } from "@/Utils/AnimationFunctions";
import { calculateTotalCartQuantity } from "@/Utils/Utils";

import { getProductsCart, removeProductFromCart, updateProductsQuantityCart } from "@/Services/CartApis";

import AnimateLink from "../Common/AnimateLink";
import logError from "@/Utils/ServerActions";
import { CartItem, CartItemGroup } from "./CartItem";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsList, setCartItemsList] = useState([]);
  const [cookies, setCookie] = useCookies([
    "authToken",
    "userData",
    "cartQuantity",
    "userTokens",
  ]);

  const handleQuantityChange = async (id, quantity, disabled) => {
    if (quantity < 10000 && quantity > 0) {
      const updatedLineItems = cartItems.map((x) => {
        if (id === x._id) {
          x.quantity = Number(quantity);
        }
        return x;
      });
      setCartItems(updatedLineItems);
      if (!disabled) updateProducts(id, quantity, updatedLineItems);
    }
  };

  const updateProducts = async (id, quantity, updatedLineItems) => {
    try {
      const lineItems = [
        {
          _id: id,
          quantity: quantity,
        },
      ];
      const total = calculateTotalCartQuantity(updatedLineItems || cartItems);
      setCookie("cartQuantity", total, { path: "/" });
      await updateProductsQuantityCart(lineItems);
    } catch (error) {
      logError("Error while updating cart:", error);
    }
  };

  const removeProduct = async (id) => {
    try {
      setCartItems((prevCartItems) => prevCartItems.filter((item) => item._id !== id));
      updatedWatched();
      const response = await removeProductFromCart([id]);
      const total = calculateTotalCartQuantity(response.cart.lineItems);

      // setCartItems(response.cart.lineItems);
      setCookie("cartQuantity", total, { path: "/" });
    } catch (error) {
      logError("Error while removing product", error);
    }
  };

  const removeProductSet = async (ids) => {
    try {
      setCartItems((prevCartItems) => prevCartItems.filter((item) => !ids.includes(item._id)));
      updatedWatched();
      const response = await removeProductFromCart(ids);
      const total = calculateTotalCartQuantity(response.cart.lineItems);

      // setCartItems(response.cart.lineItems);
      setCookie("cartQuantity", total, { path: "/" });
    } catch (error) {
      logError("Error while removing product", error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await getProductsCart();
      setCartItems(response);

      const total = calculateTotalCartQuantity(response);
      setCookie("cartQuantity", total > 0 ? String(total) : "0", { path: "/" });
      setTimeout(markPageLoaded, 200);
    } catch (error) {
      markPageLoaded();
      logError("Error while fetching cart data:", error);
    }
  };

  useEffect(() => {
    if (!cartItems.length) return;
    const productSets = cartItems.filter((x) => x.catalogReference.options.customTextFields.productSetId);
    const item = cartItems.filter((x) => !x.catalogReference.options.customTextFields.productSetId);

    const data = item.map((item) => {
      const isProductSet = item.catalogReference.options.customTextFields.isProductSet;
      if (!isProductSet) return item;
      const productSetItems = productSets.filter((set) => set.catalogReference.options.customTextFields.productSetId === item.catalogReference.catalogItemId);
      return {
        ...item,
        productSets: productSetItems
      };
    });

    setCartItemsList(data);
  }, [cartItems]);


  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <section className="cart-intro pt-40 pb-lg-195 pb-tablet-70 pb-phone-135">
      <div className="container-fluid pos-relative z-5">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="container-title flex-center">
              <h1
                className="fs--60 blue-1 text-center"
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
                <ul className="list-cart list-cart-product min-h-100-sm" data-aos="d:loop">
                  {cartItemsList.length > 0 ? (
                    cartItemsList.map((cart) =>
                      cart.productSets && cart.productSets.length ? (
                        <CartItemGroup
                          key={cart._id}
                          data={cart}
                          handleQuantityChange={handleQuantityChange}
                          updateProducts={updateProducts}
                          removeProduct={removeProductSet}
                        />
                      ) : (
                        <CartItem
                          key={cart._id}
                          data={cart}
                          handleQuantityChange={handleQuantityChange}
                          updateProducts={updateProducts}
                          removeProduct={removeProduct}
                        />
                      )
                    )
                  ) : (
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
                  {cartItemsList.length && (
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
