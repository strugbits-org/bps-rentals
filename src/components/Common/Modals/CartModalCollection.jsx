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
import AnimateLink from "../AnimateLink";
import "@/assets/style/product-set.css"

const CartModalCollection = ({
  productData,
  setProductData,
  selectedVariantData,
  setSelectedVariantData,
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
  const [customTextFields, setCustomTextFields] = useState({});
  const [message, setMessage] = useState("");
  const [modalState, setModalState] = useState({ success: false, error: false });
  const [productsSets, setProductsSets] = useState([]);
  const [totalPrice, setTotalPrice] = useState();

  const handleClose = () => {
    setTimeout(() => {
      setProductData(null);
      setSelectedVariantData(null);
      setProductSnapshots(null);
      setProductFilteredVariantData(null);
    }, 1000);
  };

  useEffect(() => {
    reloadCartModal();
    resetSlideIndexModal();
  }, [selectedVariantData, productsSets]);

  useEffect(() => {
    if (productData && productData.productSets) {
      const isBestSellerProduct = compareArray(
        bestSeller,
        productData.subCategoryData.map((x) => x._id)
      );
      setIsBestSeller(isBestSellerProduct);
      setProductsSets(productData.productSets);
    }
  }, [productData]);

  const handleQuantityChange = async (id, qty) => {
    const quantity = Math.round(qty);
    if (quantity < 10000 && quantity >= 1) {
      setProductsSets(prev => {
        const updatedProductsSet = prev.map((x) => {
          if (id === x.variant) x.quantity = Number(quantity);
          return x;
        });
        return updatedProductsSet;
      });
    }
  };

  const handleInputChange = (name, value) => {
    setCustomTextFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddToCart = async (e) => {
    if (unavailable) return;
    e.preventDefault();
    setIsButtonDisabled(true);
    try {

      const product_id = productData.product._id;
      const product_location = cookies?.location;
      const variant_id = selectedVariantData.variantId.replace(product_id, "").substring(1);

      const customFields = Object.keys(customTextFields).reduce((acc, key) => {
        acc[key] = customTextFields[key] + "\n";
        return acc;
      }, {});

      const customFieldsSorted = { location: product_location, Size: selectedVariantData.size, ...customFields, productPrice: productData.product?.price };
      const lineItems = [
        {
          catalogReference: {
            appId: "215238eb-22a5-4c36-9e7b-e7c08025e04e",
            catalogItemId: product_id,
            options: {
              customTextFields: { ...customFieldsSorted, isProductSet: "true" },
              variantId: variant_id,
            },
          },
          quantity: 1,
        }
      ]

      productsSets.forEach(({ id, product, size, quantity, productPrice }) => {
        lineItems.push({
          catalogReference: {
            appId: "215238eb-22a5-4c36-9e7b-e7c08025e04e",
            catalogItemId: product,
            options: {
              customTextFields: { location: product_location, Size: size, productSetId: product_id, productPrice },
              variantId: id,
            },
          },
          quantity: quantity,
        });
      });

      const cartData = {
        lineItems: lineItems,
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

  useEffect(() => {
    const prices = productsSets.map(set => {
      const price = findPriceTier({
        tier: pricingTier,
        pricingTiers: set?.pricingTiers,
        price: set?.productPrice,
        variantPrice: set?.price,
        isRawPrice: true,
        quantity: set.quantity
      })
      return price;
    });
    const total = prices.reduce((acc, x) => acc + x, 0);
    setTotalPrice(`$ ${total.toFixed(2)}`);
  }, [productsSets]);

  return (
    <div id="scripts">
      {(modalState.error || modalState.success) && (
        <Modal
          message={message}
          setModalStatus={setModalState}
          modalStatus={modalState}
        />
      )}
      <modal-group name="modal-product-3" class="modal-product">
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

                              {SHOW_PRICES && (
                                <li className="seat-height">
                                  <span className="specs-title">Price</span>
                                  <span className="specs-text">
                                    {totalPrice}
                                  </span>
                                </li>
                              )}
                            </ul>

                            <div className="product-set-table">
                              <div className="product-set-item product-set-header fs--18">
                                <span className="name">Product Name</span>
                                <span className="size">Size</span>
                                {SHOW_PRICES && <span className="price">Price</span>}
                                <span className="quantity">Quantity</span>
                              </div>
                              {productsSets.map((set) => {
                                const { variant, slug, quantity, color, size, name } = set;
                                return (
                                  <div key={variant} className="product-set-item fs--16">
                                    <AnimateLink
                                      to={`/product/${slug}`}
                                      target={"_blank"}
                                      className="name"
                                    >
                                      {name} {color ? `| ${color}` : ""}
                                    </AnimateLink>
                                    <span className="size">{size || "-"}</span>
                                    {SHOW_PRICES && <span className="price">{findPriceTier({
                                      tier: pricingTier,
                                      pricingTiers: set?.pricingTiers,
                                      price: set?.productPrice,
                                      variantPrice: set?.price,
                                    })}</span>}
                                    <div className="quantity container-add-to-cart">
                                      <div className="container-input container-input-quantity">
                                        <button
                                          onClick={() => handleQuantityChange(variant, +quantity - 1)}
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
                                          className="input-number fs--16"
                                          onInput={(e) => handleQuantityChange(variant, e.target.value)}
                                        />
                                        <button
                                          onClick={() => handleQuantityChange(variant, +quantity + 1)}
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

                            <div
                              className="container-add-to-cart container-add-to-cart-collection mt-tablet-20 mt-phone-25"
                            >
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
                                  Not Available in Your Preferred Location. Please &nbsp;
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

export default CartModalCollection;
