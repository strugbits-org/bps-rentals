"use client";

import { useEffect } from "react";
import { markPageLoaded } from "../../utils/AnimationFunctions";

const SavedProducts = () => {
  useEffect(() => {
    markPageLoaded();
  }, []);
  return (
    <div class="wrapper-account">
      <div class="wrapper-top">
        <h1 class="fs--60 blue-1 split-words" data-aos="d:loop">Saved Products</h1>
      </div>
      <div class="wrapper-bottom mt-lg-105 mt-tablet-35 mt-phone-25">
        <ul class="list-saved-products grid-lg-25 grid-tablet-33 grid-phone-50"
          data-aos="fadeIn .8s ease-in-out .4s, d:loop">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
            return (
              <li key={index} className="grid-item">
                <div
                  className="product-link small saved-products active"
                  data-product-category
                  data-product-location
                  data-product-colors
                >
                  <div className="container-tags">
                    <button className="btn-bookmark">
                      <i className="icon-bookmark"></i>
                      <i className="icon-bookmark-full"></i>
                    </button>
                  </div>
                  <a href="product.html" className="link">
                    <div className="container-top">
                      <h2 className="product-title">Bristol Chair</h2>
                    </div>
                    <div className="wrapper-product-img">
                      <div
                        className="container-img product-img"
                        data-get-product-link-color="green"
                        data-default-product-link-active
                      >
                        <img
                          src="/images/chairs/bristol-chair-color-1.webp"
                          className=" "
                        />
                      </div>
                      <div
                        className="container-img product-img"
                        data-get-product-link-color="white"
                      >
                        <img
                          src="/images/chairs/bristol-chair-color-2.webp"
                          className=" "
                        />
                      </div>
                      <div
                        className="container-img product-img"
                        data-get-product-link-color="blue"
                      >
                        <img
                          src="/images/chairs/bristol-chair-color-3.webp"
                          className=" "
                        />
                      </div>
                    </div>
                  </a>
                  <div className="container-color-options">
                    <ul className="list-color-options">
                      <li
                        className="list-item"
                        data-set-product-link-color="green"
                        data-default-product-link-active
                      >
                        <div className="container-img">
                          <img
                            src="/images/chairs/bristol-chair-color-1.webp"
                            className=" "
                          />
                        </div>
                      </li>
                      <li
                        className="list-item"
                        data-set-product-link-color="white"
                      >
                        <div className="container-img">
                          <img
                            src="/images/chairs/bristol-chair-color-2.webp"
                            className=" "
                          />
                        </div>
                      </li>
                      <li
                        className="list-item"
                        data-set-product-link-color="blue"
                      >
                        <div className="container-img">
                          <img
                            src="/images/chairs/bristol-chair-color-3.webp"
                            className=" "
                          />
                        </div>
                      </li>
                    </ul>
                    <div className="colors-number">
                      <span>+3</span>
                    </div>
                  </div>
                  <btn-modal-open
                    group="modal-product"
                    class="modal-add-to-cart"
                  >
                    <span>Add to cart</span>
                    <i className="icon-cart"></i>
                  </btn-modal-open>
                </div>
              </li>
            );
          })}
        </ul>
        <div class="flex-tablet-center mt-lg-60 mt-tablet-40 mt-phone-45">
          <button class="btn-2-blue">
            <span>Load more</span>
            <i class="icon-arrow-right-2"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SavedProducts;
