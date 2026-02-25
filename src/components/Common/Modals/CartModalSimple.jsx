"use client";
import React, { useEffect, useState } from "react";
import ModalCanvas3d from "../ModalCanvas3d";
import { reloadCartModal, resetSlideIndexModal } from "@/Utils/AnimationFunctions";
import { AvailabilityCard } from "@/components/Product/AvailabilityCard";
import { SaveProductButton } from "../SaveProductButton";
import { calculateTotalCartQuantity, compareArray, findPriceTier } from "@/Utils/Utils";
import { AddProductToCart } from "@/Services/CartApis";
import { useCookies } from "react-cookie";
import Modal from "./Modal";
import useUserData from "@/Hooks/useUserData";
import { ImageWrapper } from "../ImageWrapper";
import logError from "@/Utils/ServerActions";
import { PERMISSIONS } from "@/Utils/Schema/permissions";

const CartModalSimple = ({
  productData,
  setProductData,
  productSnapshots,
  productFilteredVariantData,
  selectedVariantData,
  setSelectedVariantData,
  handleImageChange,
  selectedVariantIndex,
  setProductSnapshots,
  setProductFilteredVariantData,
  bestSeller = [],
  savedProductsData,
  setSavedProductsData,
}) => {

  const { permissions, pricingTier } = useUserData();
  const SHOW_PRICES = permissions && permissions.includes(PERMISSIONS.SHOW_PRICES);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [cookies, setCookie] = useCookies(["location", "cartQuantity"]);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [customTextFields, setCustomTextFields] = useState({});
  const [message, setMessage] = useState("");
  const [modalState, setModalState] = useState({
    success: false,
    error: false,
  });

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
    resetSlideIndexModal();
  }, [selectedVariantData]);

  useEffect(() => {
    if (productData) {
      const isBestSellerProduct = compareArray(
        bestSeller,
        productData.subCategoryData.map((x) => x._id)
      );
      setIsBestSeller(isBestSellerProduct);
    }
  }, [productData]);

  const handleQuantityChange = async (value) => {
    if (value < 10000 && value > 0) {
      setCartQuantity(value);
    }
  };

  const handleInputChange = (name, value) => {
    setCustomTextFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddToCart = async () => {
    if (unavailable) return;
    setIsButtonDisabled(true);
    try {
      const product_id = productData.product._id;
      const variant_id = selectedVariantData.variantId
        .replace(product_id, "")
        .substring(1);
      const product_location = cookies?.location;

      const customFields = Object.keys(customTextFields).reduce((acc, key) => {
        acc[key] = customTextFields[key] + "\n";
        return acc;
      }, {});

      const customFieldsSorted = { location: product_location, Size: selectedVariantData.size, ...customFields, productPrice: productData.product?.price };

      const cartData = {
        lineItems: [
          {
            catalogReference: {
              appId: "215238eb-22a5-4c36-9e7b-e7c08025e04e",
              catalogItemId: product_id,
              options: {
                customTextFields: customFieldsSorted,
                variantId: variant_id,
              },
            },
            quantity: cartQuantity,
          },
        ],
      };

      await AddProductToCart(cartData);
      const newItems = calculateTotalCartQuantity(cartData.lineItems);
      const total = cookies.cartQuantity ? cookies.cartQuantity + newItems : newItems;
      setCookie("cartQuantity", total, { path: "/" });

      handleClose();
      setModalState({ success: true, error: false });
      setMessage("Product Successfully Added to Cart!");
    } catch (error) {
      logError("Error:", error);
      setMessage("Failed to Add Product to Cart");
      setModalState({ success: false, error: true });
    } finally {
      setIsButtonDisabled(false);
    }
  };
  return (
    <div id="scripts">
      {(modalState.error || modalState.success) && (
        <Modal
          message={message}
          setModalStatus={setModalState}
          modalStatus={modalState}
        />
      )}
      <modal-group name="modal-product-2" class="modal-product">
        <modal-container>
          <modal-item>
            <div className="wrapper-section">
              <section className="section-modal-product">
                <div className={`container-fluid  ${!selectedVariantData && "hidden"}`}>
                  <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                      <div
                        className="wrapper-product-info"
                        data-modal-area
                        data-product-content
                      >
                        <ul
                          className="list-slider-product"
                          data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                        >
                          <li
                            className="wrapper-slider-product"
                            data-default-active
                            data-get-color="yellow"
                          >
                            <div className="slider-product">
                              <div className="container-btn-top">
                                {isBestSeller && (
                                  <div className="best-seller-tag">
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
                              <div className="swiper-container reset-slide-enabled">
                                <div className="swiper-wrapper">
                                  {selectedVariantData &&
                                    selectedVariantData.images?.map(
                                      (imageData, index) => {
                                        return (
                                          <div key={index} className="swiper-slide">
                                            <div className="wrapper-img">
                                              <div className="container-img">
                                                <ImageWrapper timeout={0} key={imageData.src} defaultDimensions={{ width: 671, height: 671 }} url={imageData.src} />
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      }
                                    )}
                                  {selectedVariantData?.modalUrl && (
                                    <div className="swiper-slide slide-360">
                                      <div className="wrapper-img">
                                        <i className="icon-360"></i>
                                        <div className="container-img">
                                          <ModalCanvas3d key={selectedVariantData?.modalUrl} path={selectedVariantData?.modalUrl} />
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                </div>
                              </div>
                              <div className="swiper-button-prev">
                                <i className="icon-arrow-left-3"></i>
                              </div>
                              <div className="swiper-button-next">
                                <i className="icon-arrow-right-3"></i>
                              </div>
                            </div>
                            <div className="wrapper-slider-thumb no-mobile">
                              <div className="slider-product-thumb">
                                <div className="swiper-container">
                                  <div className="swiper-wrapper">
                                    {selectedVariantData &&
                                      selectedVariantData.images?.map(
                                        (data, index) => {
                                          const { src } = data;
                                          return (
                                            <div
                                              key={index}
                                              className="swiper-slide"
                                            >
                                              <div className="wrapper-img">
                                                <div className="container-img">
                                                  <ImageWrapper timeout={0} key={src} defaultDimensions={{ width: 170, height: 170 }} url={src} />
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        }
                                      )}

                                    {selectedVariantData?.modalUrl && (
                                      <div className="swiper-slide">
                                        <div className="wrapper-img">
                                          <div className="container-img">
                                            <img
                                              alt="3d model"
                                              src="/images/3d.svg"
                                              className=" "
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
                        <div className="container-product-description">
                          <div className="form-cart">
                            <input
                              type="hidden"
                              name="sku[]"
                              defaultValue="MODCH09"
                            />
                            <div className="wrapper-product-name">
                              <div className="container-product-name">
                                <h1
                                  className="fs--60 fs-phone-30 product-name split-words"
                                  data-aos="d:loop"
                                >
                                  {productData && productData.product.name}
                                </h1>
                              </div>
                            </div>
                            <ul
                              className="list-specs mt-tablet-20 mt-phone-15"
                              data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                            >
                              {selectedVariantData?.sku && (
                                <li className="sku">
                                  <span className="specs-title">SKU</span>
                                  <span className="specs-text">
                                    {selectedVariantData &&
                                      selectedVariantData.sku}
                                  </span>
                                </li>
                              )}

                              {selectedVariantData?.color && (
                                <li className="color">
                                  <span className="specs-title">Color</span>
                                  <span className="specs-text">
                                    {selectedVariantData &&
                                      selectedVariantData.color}
                                  </span>
                                </li>
                              )}

                              {selectedVariantData?.weight ? (
                                <li className="color cs-weight">
                                  <span className="specs-title">Weight</span>
                                  <span className="specs-text">
                                    {selectedVariantData && selectedVariantData.weight}LBS
                                  </span>
                                </li>
                              ) : null}

                              {productData &&
                                productData.product?.additionalInfoSections &&
                                productData.product.additionalInfoSections.map(
                                  (sec, index) => {
                                    const { title, description } = sec;

                                    return (
                                      <li className={`${title} ${title === "IMPORTANT" ? "long-desc" : ""}`} key={index}>
                                        <span className="specs-title">
                                          {title}
                                        </span>
                                        <span
                                          className="specs-text"
                                          dangerouslySetInnerHTML={{
                                            __html: description,
                                          }}
                                        ></span>
                                      </li>
                                    );
                                  }
                                )}
                              {selectedVariantData && SHOW_PRICES && selectedVariantData.price && (
                                <li className="seat-height">
                                  <span className="specs-title">Price</span>
                                  <span className="specs-text">
                                    {findPriceTier({
                                      tier: pricingTier,
                                      pricingTiers: productData?.variantData?.[selectedVariantIndex]?.pricingTiers,
                                      variantPrice: selectedVariantData?.price,
                                    })}
                                  </span>
                                </li>
                              )}
                            </ul>
                            <ul
                              className="list-colors"
                              data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                            >
                              {productFilteredVariantData &&
                                productFilteredVariantData.map(
                                  (variantData, index) => {
                                    const { variant } = variantData;

                                    return (
                                      <li key={index} className="list-colors-item">
                                        <div
                                          className="container-input active"
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
                                              checked={variant.sku === selectedVariantData.sku}
                                            />
                                            <div className="container-img">
                                              <img
                                                alt="3d model"
                                                src={
                                                  variantData.variant.imageSrc
                                                }
                                                className=" "
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
                              className="container-add-to-cart mt-tablet-20 mt-phone-25"
                              data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                            >
                              <div className="container-input container-input-quantity">
                                <button
                                  onClick={() =>
                                    handleQuantityChange(+cartQuantity - 1)
                                  }
                                  type="button"
                                  className="minus"
                                >
                                  <i className="icon-minus"></i>
                                </button>
                                <input
                                  type="number"
                                  min="1"
                                  value={cartQuantity}
                                  placeholder="1"
                                  className="input-number"
                                  onInput={(e) =>
                                    handleQuantityChange(e.target.value)
                                  }
                                />
                                <button
                                  onClick={() =>
                                    handleQuantityChange(+cartQuantity + 1)
                                  }
                                  type="button"
                                  className="plus"
                                >
                                  <i className="icon-plus"></i>
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
                                  disabled={isButtonDisabled}
                                >
                                  <span>{isButtonDisabled ? "Please wait..." : "Add to cart"}</span>
                                  <i className="icon-arrow-right"></i>
                                </button>
                              )}
                            </div>

                            {unavailable && (
                              <div className="unavailable-warning-wrapper font-2 mt-3-cs">
                                <p className="unavailable-warning">
                                  Color Variant Not Available in Your Preferred
                                  Location. Please &nbsp;
                                </p>
                                <btn-modal-open group="modal-contact">
                                  Contact Us
                                </btn-modal-open>
                              </div>
                            )}
                            {productData && (
                              <AvailabilityCard
                                selectedVariantData={
                                  productData.variantData[selectedVariantIndex]
                                }
                                setUnavailable={setUnavailable}
                              />
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
                                            name={`product_notes_${index}`}
                                            type="text"
                                            placeholder={title}
                                            required={mandatory}
                                            onChange={(e) => handleInputChange(title, e.target.value)}
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
                          <i className="icon-close"></i>
                        </btn-modal-close>
                      </div>
                    </div>
                  </div>
                </div>
                {!selectedVariantData && <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                        <div className="w-full d-flex justify-content-center">
                          <div className="loader-small"></div>
                        </div>
                    </div>
                  </div>
                </div>}
              </section>
            </div>
          </modal-item>
        </modal-container>
      </modal-group>
    </div>
  );
};

export default CartModalSimple;
