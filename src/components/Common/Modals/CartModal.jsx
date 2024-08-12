"use client";
import { generateImageURL } from "@/Utils/GenerateImageURL";
import React, { useEffect, useState } from "react";
import ModalCanvas3d from "../ModalCanvas3d";
import { reloadCartModal, resetSlideIndex } from "@/Utils/AnimationFunctions";
import { AvailabilityCard } from "@/components/Product/AvailabilityCard";
import { SaveProductButton } from "../SaveProductButton";
import { calculateTotalCartQuantity, compareArray } from "@/Utils/Utils";
import { AddProductToCart } from "@/Services/CartApis";
import { useCookies } from "react-cookie";

const CartModal = ({
  productData,
  setProductData,
  setErrorMessageVisible,
  setSuccessMessageVisible,
  productSnapshots,
  productFilteredVariantData,
  selectedVariantData,
  setSelectedVariantData,
  handleImageChange,
  selectedVariantIndex,
  setProductSnapshots,
  setProductFilteredVariantData,
  bestSeller = [],
  bestSellerProducts,
  savedProductsData,
  setSavedProductsData,
}) => {

  const [unavailable, setUnavailable] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [cookies, setCookie] = useCookies(["location"]);

  const handleClose = () => {
    setTimeout(() => {
      setProductData(null);
      setSelectedVariantData(null);
      setProductSnapshots(null);
      setProductFilteredVariantData(null);
      setCartQuantity(1);
    }, 1000);
  };

  useEffect(() => {
    reloadCartModal();
    resetSlideIndex();
  }, [selectedVariantData]);
  useEffect(() => {
    if (productData) {
      const isBestSellerProduct = compareArray(bestSeller, productData.subCategoryData.map(x => x._id));
      setIsBestSeller(bestSellerProducts || isBestSellerProduct);
    }
  }, [productData])


  const seatHeightData =
    productData &&
    productData.product.additionalInfoSections.find(
      (data) => data.title.toLowerCase() === "seat height".toLowerCase()
    );

  const handleQuantityChange = async (value) => {
    if (value < 10000 && value > 0) {
      setCartQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    setSuccessMessageVisible(false);
    setErrorMessageVisible(false);

    try {
      const product_id = productData.product._id;
      const variant_id = selectedVariantData.variantId
        .replace(product_id, "")
        .substring(1);
      const product_location = cookies?.location;

      const cartData = {
        lineItems: [
          {
            catalogReference: {
              appId: "215238eb-22a5-4c36-9e7b-e7c08025e04e",
              catalogItemId: product_id,
              options: {
                customTextFields: { location: product_location },
                variantId: variant_id,
              },
            },
            quantity: cartQuantity,
          },
        ],
      };

      const response = await AddProductToCart(cartData);
      const total = calculateTotalCartQuantity(response.cart.lineItems);
      setCookie("cartQuantity", total);
      handleClose();
      setSuccessMessageVisible(true);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessageVisible(true);
    }
  };
  return (
    <div id="scripts">
      <modal-group name="modal-product-2" class="modal-product">
        <modal-container>
          <modal-item>
            <div class="wrapper-section">
              <section class="section-modal-product">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-lg-10 offset-lg-1">
                      <div
                        class="wrapper-product-info"
                        data-modal-area
                        data-product-content
                      >
                        <ul
                          class="list-slider-product"
                          data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                        >
                          <li
                            class="wrapper-slider-product"
                            data-default-active
                            data-get-color="yellow"
                          >
                            <div class="slider-product">
                              <div class="container-btn-top">
                                {isBestSeller && (
                                  <div class="best-seller-tag">
                                    <span>Best Seller</span>
                                  </div>
                                )}
                                {productData && (
                                  <SaveProductButton
                                    productData={productData.product}
                                    savedProductsData={savedProductsData}
                                    setSavedProductsData={setSavedProductsData}
                                  />
                                )}
                              </div>
                              <div class="swiper-container reset-slide-enabled">
                                <div class="swiper-wrapper">
                                  {selectedVariantData &&
                                    selectedVariantData.images?.map(
                                      (imageData, index) => {
                                        return (
                                          <div key={index} class="swiper-slide">
                                            <div class="wrapper-img">
                                              <div class="container-img">
                                                <img
                                                  src={generateImageURL({
                                                    wix_url: imageData.src,
                                                    w: "671",
                                                    h: "671",
                                                    fit: "fill",
                                                    q: "95",
                                                  })}
                                                  class=" "
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                    )}
                                  {selectedVariantData?.modalUrl && (
                                    <div class="swiper-slide slide-360">
                                      <div class="wrapper-img">
                                        <i class="icon-360"></i>
                                        <div class="container-img">
                                          <ModalCanvas3d
                                            path={selectedVariantData?.modalUrl}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div class="swiper-button-prev">
                                <i class="icon-arrow-left-3"></i>
                              </div>
                              <div class="swiper-button-next">
                                <i class="icon-arrow-right-3"></i>
                              </div>
                            </div>
                            <div class="wrapper-slider-thumb no-mobile">
                              <div class="slider-product-thumb">
                                <div class="swiper-container">
                                  <div class="swiper-wrapper">
                                    {selectedVariantData &&
                                      selectedVariantData.images?.map(
                                        (data, index) => {
                                          const { src } = data;
                                          return (
                                            <div
                                              key={index}
                                              class="swiper-slide"
                                            >
                                              <div class="wrapper-img">
                                                <div class="container-img">
                                                  <img
                                                    src={generateImageURL({
                                                      wix_url: src,
                                                      w: "168",
                                                      h: "168",
                                                      fit: "fill",
                                                      q: "95",
                                                    })}
                                                    class=" "
                                                  />
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        }
                                      )}

                                    {selectedVariantData?.modalUrl && (
                                      <div class="swiper-slide">
                                        <div class="wrapper-img">
                                          <div class="container-img">
                                            <img
                                              src="/images/3d.svg"
                                              class=" "
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                        <div class="container-product-description">
                          <div class="form-cart">
                            <input type="hidden" name="sku[]" defaultValue="MODCH09" />
                            <div class="wrapper-product-name">
                              <div class="container-product-name">
                                <h1
                                  class="fs--60 fs-phone-30 product-name split-words"
                                  data-aos="d:loop"
                                >
                                  {productData && productData.product.name}
                                </h1>
                              </div>
                            </div>
                            <ul
                              class="list-specs mt-tablet-20 mt-phone-15"
                              data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                            >
                              {selectedVariantData?.sku && (
                                <li class="sku">
                                  <span class="specs-title">SKU</span>
                                  <span class="specs-text">
                                    {selectedVariantData &&
                                      selectedVariantData.sku}
                                  </span>
                                </li>
                              )}

                              {selectedVariantData?.size && (
                                <li class="size">
                                  <span class="specs-title">Size</span>
                                  <span class="specs-text">
                                    {selectedVariantData &&
                                      selectedVariantData.size}
                                  </span>
                                </li>
                              )}
                              {selectedVariantData?.color && (
                                <li class="color">
                                  <span class="specs-title">Color</span>
                                  <span class="specs-text">
                                    {selectedVariantData &&
                                      selectedVariantData.color}
                                  </span>
                                </li>
                              )}
                              <li class="weight">
                                <span class="specs-title">Weight</span>
                                <span class="specs-text">11.5lbs</span>
                              </li>
                              {seatHeightData && (
                                <li className="seat-height">
                                  <span className="specs-title">
                                    Seat Height
                                  </span>
                                  <span
                                    className="specs-text"
                                    dangerouslySetInnerHTML={{
                                      __html: seatHeightData.description,
                                    }}
                                  ></span>
                                </li>
                              )}
                            </ul>
                            <ul
                              class="list-colors"
                              data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                            >
                              {productFilteredVariantData &&
                                productFilteredVariantData.map(
                                  (variantData, index) => {
                                    return (
                                      <li key={index} class="list-colors-item">
                                        <div
                                          class="container-input active"
                                          data-set-color={
                                            variantData.variant.color
                                          }
                                          onClick={() =>
                                            handleImageChange({
                                              index: index,
                                              selectedVariantData:
                                                variantData.variant,
                                              productSnapshots:
                                                productSnapshots,
                                              modalUrl: variantData.zipUrl,
                                            })
                                          }
                                        >
                                          <label>
                                            <input
                                              type="radio"
                                              name="colors"
                                              value={variantData.variant.color}
                                              checked={
                                                index === selectedVariantIndex
                                              }
                                            />
                                            <div class="container-img">
                                              <img
                                                src={
                                                  variantData.variant.imageSrc
                                                }
                                                class=" "
                                              />
                                            </div>
                                          </label>
                                        </div>
                                      </li>
                                    );
                                  }
                                )}
                            </ul>
                            <div
                              class="container-add-to-cart mt-tablet-20 mt-phone-25"
                              data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                            >
                              <div class="container-input container-input-quantity">
                                <button
                                  onClick={() =>
                                    handleQuantityChange(+cartQuantity - 1)
                                  }
                                  type="button"
                                  class="minus"
                                >
                                  <i class="icon-minus"></i>
                                </button>
                                <input
                                  type="number"
                                  min="1"
                                  value={cartQuantity}
                                  placeholder="1"
                                  class="input-number"
                                  onInput={(e) =>
                                    handleQuantityChange(e.target.value)
                                  }
                                />
                                <button
                                  onClick={() =>
                                    handleQuantityChange(+cartQuantity + 1)
                                  }
                                  type="button"
                                  class="plus"
                                >
                                  <i class="icon-plus"></i>
                                </button>
                              </div>
                              {unavailable ? (
                                <button
                                  disabled
                                  className="btn-add-to-cart btn-disabled"
                                  type="submit"
                                >
                                  <span>Add to cart</span>
                                  <i className="icon-arrow-right"></i>
                                </button>
                              ) : (
                                <button
                                  onClick={handleAddToCart}
                                  className="btn-add-to-cart"
                                  type="submit"
                                >
                                  <span>Add to cart</span>
                                  <i className="icon-arrow-right"></i>
                                </button>
                              )}
                            </div>

                            {unavailable && (
                              <div className="unavailable-warning-wrapper font-2 mt-3-cs">
                                <p className="unavailable-warning">Color Variant Not Available in Your Preferred Location. Please &nbsp;</p>
                                <btn-modal-open
                                  group="modal-contact"
                                >
                                  Contact Us
                                </btn-modal-open>
                              </div>
                            )}
                            {productData && (
                              <AvailabilityCard selectedVariantData={productData.variantData[selectedVariantIndex]} setUnavailable={setUnavailable} />
                            )}
                            {productData &&
                              productData.product.customTextFields.length >
                              0 && (
                                <div
                                  style={{ paddingTop: "20px" }}
                                  className="container-product-notes container-info-text "
                                >
                                  <h3 className="container-input product-notes">
                                    <label>Customize product text</label>
                                  </h3>
                                </div>
                              )}

                            {productData &&
                              productData.product.customTextFields.map(
                                (data, index) => {
                                  const { title, mandatory } = data;
                                  return (
                                    <React.Fragment key={index}>
                                      <div
                                        style={{ paddingTop: "10px" }}
                                        className="container-product-notes "
                                      >
                                        <div className="container-input product-notes">
                                          <input
                                            name="product_notes"
                                            type="text"
                                            placeholder={title}
                                            required={mandatory}
                                          />
                                        </div>
                                        <div className="container-submit">
                                          <button type="submit">
                                            <i className="icon-arrow-right"></i>
                                          </button>
                                        </div>
                                      </div>
                                    </React.Fragment>
                                  );
                                }
                              )}
                          </div>
                        </div>
                        <btn-modal-close onClick={handleClose}>
                          <i class="icon-close"></i>
                        </btn-modal-close>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </modal-item>
        </modal-container>
      </modal-group>
    </div>
  );
};

export default CartModal;
