"use client";
import { useEffect } from "react";
import AnimateLink from "../Common/AnimateLink";
import { markPageLoaded } from "@/Utils/AnimationFunctions";

const CartPage = () => {
  useEffect(() => {
    setTimeout(() => {
      markPageLoaded();
    }, 1000);
  }, []);
  return (
    <>
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
                    {[1, 2, 3].map((index) => {
                      return (
                        <li key={index} className="list-item">
                          <input type="hidden" name="sku[]" defaultValue="MODCH09" />
                          <div className="cart-product">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-3.png"
                                className=" "
                              />
                            </div>
                            <div className="wrapper-product-info">
                              <div className="container-top">
                                <div className="container-product-name">
                                  <h2 className="product-name">
                                    Arm Chair - Tapas
                                  </h2>
                                  <AnimateLink
                                    to="/product/1"
                                    className="btn-view"
                                  >
                                    <span>View</span>
                                    <i className="icon-arrow-right"></i>
                                  </AnimateLink>
                                </div>
                                <button type="button" className="btn-cancel">
                                  <i className="icon-close"></i>
                                </button>
                              </div>
                              <div className="container-specs">
                                <ul className="list-specs">
                                  <li className="sku">
                                    <span className="specs-title">SKU</span>
                                    <span className="specs-text">MODCH09</span>
                                  </li>
                                  <li className="size">
                                    <span className="specs-title">Size</span>
                                    <span className="specs-text">
                                      19”L X 15.5”W X 27.5”H
                                    </span>
                                  </li>
                                  <li className="color">
                                    <span className="specs-title">Color</span>
                                    <span className="specs-text">
                                      Yellow - Birch
                                    </span>
                                  </li>
                                  <li className="location">
                                    <span className="specs-title">
                                      Location
                                    </span>
                                    <span className="specs-text">
                                      San francisco <i className="icon-pin"></i>
                                    </span>
                                  </li>
                                  <li className="customize-text">
                                    <span className="specs-title">
                                      Customize text
                                    </span>
                                    <input
                                      type="text"
                                      placeholder="Lorem Ipsum"
                                    />
                                  </li>
                                </ul>
                                <div className="quantity">
                                  <span className="fs--20 no-mobile">
                                    Quantity
                                  </span>
                                  <div className="container-input container-input-quantity">
                                    <button type="button" className="minus">
                                      <i className="icon-minus"></i>
                                    </button>
                                    <input
                                      type="number"
                                      min="1"
                                      defaultValue="1"
                                      placeholder="1"
                                      className="input-number"
                                    />
                                    <button type="button" className="plus">
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
                  </ul>
                  <div className="container-btn mt-md-40 mt-phone-40">
                    <AnimateLink
                      to="/quote-request"
                      className="btn-1 btn-large btn-blue w-100 bt-submit"
                      data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                    >
                      <span>Request for quote</span>
                      <i className="icon-arrow-right"></i>
                    </AnimateLink>
                    <AnimateLink
                      to={`/category/${"123"}`}
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
    </>
  );
};

export default CartPage;
