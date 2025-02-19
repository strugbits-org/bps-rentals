"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCookies } from "react-cookie";

import {
  markPageLoaded,
  pageLoadEnd,
  pageLoadStart,
  resetSlideIndex,
  updatedWatched,
} from "@/Utils/AnimationFunctions";
import { calculateTotalCartQuantity, compareArray, findPriceForTier } from "@/Utils/Utils";

import { getSavedProductData } from "@/Services/ProductsApis";
import { AddProductToCart } from "@/Services/CartApis";

import PortfolioSection from "../Common/Sections/PortfolioSection";
import { SaveProductButton } from "../Common/SaveProductButton";
import ArticleSection from "../Common/Sections/ArticleSection";
import ModalCanvas3d from "../Common/ModalCanvas3d";
import AnimateLink from "../Common/AnimateLink";

import { AvailabilityCard } from "./AvailabilityCard";
import MatchItWith from "./MatchItWithSection";
import SnapShots from "./SnapShotsSection";
import useUserData from "@/Hooks/useUserData";
import { decryptField } from "@/Utils/Encrypt";
import { ImageWrapper } from "../Common/ImageWrapper";
import logError from "@/Utils/ServerActions";
import { PERMISSIONS } from "@/Utils/Schema/permissions";

const ProductPostPage = ({
  selectedProductDetails,
  matchedProductsData,
  categoriesData,
  blogsData,
  portfolioData,
  bestSeller,
}) => {
  const descriptionRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [cookies, setCookie] = useCookies([
    "authToken",
    "userData",
    "cartQuantity",
    "userTokens",
    "location",
  ]);

  const { productSnapshotData, defaultVariant } = selectedProductDetails;
  const [productFoundInCategories, setProductFoundInCategories] = useState([]);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [savedProductsData, setSavedProductsData] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState();
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [buttonLabel, setButtonLabel] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [customTextFields, setCustomTextFields] = useState({});

  const { permissions, pricingTier } = useUserData();
  const SHOW_PRICES = permissions && permissions.includes(PERMISSIONS.SHOW_PRICES);
  const SHOW_FIREPROOF_CERTIFICATES = permissions && permissions.includes(PERMISSIONS.SHOW_FIREPROOF_CERTIFICATES);
  const SHOW_DOCUMENTS = permissions && permissions.includes(PERMISSIONS.SHOW_DOCUMENTS);


  const handleImageChange = ({ index, selectedVariantData, modalUrl }) => {
    const selectedVariantFilteredData = productSnapshotData.find(
      (variant) => variant.colorVariation === selectedVariantData.variantId
    );
    if (selectedVariantFilteredData && selectedVariantFilteredData?.images) {
      const combinedVariantData = {
        ...selectedVariantData,
        ...selectedVariantFilteredData, 
        modalUrl: modalUrl,
      };

      setSelectedVariantIndex(index);
      setSelectedVariant(combinedVariantData);
    } else {
      const combinedVariantData = {
        ...selectedVariantData,
        ...selectedVariantFilteredData,
        modalUrl: modalUrl,
        images: [{ src: selectedVariantData.imageSrc }],
      };
      setSelectedVariantIndex(index);
      setSelectedVariant(combinedVariantData);
    }
  };

  useEffect(() => {
    const defaultVariantIndexFromParams = searchParams.get("variant");
    const variantIndex = selectedProductDetails.variantData.findIndex((x) => x.sku === (searchParams.has("variant") ? defaultVariantIndexFromParams : defaultVariant));
    const defaultVariantIndex = variantIndex > -1 ? variantIndex : 0;

    if (selectedProductDetails && productSnapshotData) {
      const selectedVariantData = selectedProductDetails.variantData[defaultVariantIndex].variant;
      const selectedVariantFilteredData = productSnapshotData.find(
        (variant) => variant.colorVariation === selectedVariantData.variantId
      );

      if (selectedVariantFilteredData && selectedVariantFilteredData.images) {
        const combinedVariantData = {
          ...selectedVariantData,
          ...selectedVariantFilteredData,
          modalUrl: selectedProductDetails.variantData[defaultVariantIndex].zipUrl,
        };

        setSelectedVariantIndex(defaultVariantIndex);
        setSelectedVariant(combinedVariantData);
      } else {
        const combinedVariantData = {
          ...selectedVariantData,
          ...selectedVariantFilteredData,
          modalUrl: selectedProductDetails.variantData[defaultVariantIndex].zipUrl,
          images: [{ src: selectedVariantData.imageSrc }],
        };
        setSelectedVariantIndex(defaultVariantIndex);
        setSelectedVariant(combinedVariantData);
      }

      const isBestSellerProduct = compareArray(
        bestSeller,
        selectedProductDetails.subCategoryData.map((x) => x._id)
      );
      setIsBestSeller(isBestSellerProduct);

      const categoriesFound = categoriesData.reduce((acc, subCategory) => {
        const { parentCollection, level2Collections } = subCategory;
        if (
          selectedProductDetails.subCategoryData.some(
            (x) => x.slug === parentCollection.slug
          )
        ) {
          acc.push(parentCollection);
        }
        level2Collections.forEach((level2Category) => {
          if (
            level2Category.slug &&
            selectedProductDetails.subCategoryData.some(
              (x) => x.slug === level2Category.slug
            )
          ) {
            acc.push(level2Category);
          }
        });
        return acc;
      }, []);

      setProductFoundInCategories(categoriesFound);
    }
    setTimeout(markPageLoaded, 900);
    console.log("selectedProductDetails", selectedProductDetails);
    
  }, [selectedProductDetails]);

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

  const handleAddToCart = async (e) => {
    if (unavailable) return;
    e.preventDefault();
    setIsButtonDisabled(true);
    try {

      const product_id = selectedProductDetails.product._id;
      const product_location = cookies?.location;
      const variant_id = selectedVariant.variantId
        .replace(product_id, "")
        .substring(1);

      const customFields = Object.keys(customTextFields).reduce((acc, key) => {
        acc[key] = customTextFields[key] + "\n";
        return acc;
      }, {});

      const customFieldsSorted = { location: product_location, Size: selectedVariant.size, ...customFields }

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

      pageLoadStart({});
      router.push("/cart");
    } catch (error) {
      pageLoadEnd();
      logError("Error while adding item to cart:", error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const updatedDescription = selectedProductDetails.product.description.replace(
    /color:#000000;/g,
    "color:#0F41FA"
  );

  const fetchSavedProducts = async () => {
    try {
      const savedProducts = await getSavedProductData();
      setSavedProductsData(savedProducts);
    } catch (error) {
      logError("Error while fetching Saved Product", error);
    }
  };

  useEffect(() => {
    fetchSavedProducts();
  }, []);


  useEffect(() => {
    if (selectedVariant) {
      resetSlideIndex();
      updatedWatched(true);
    }
  }, [selectedVariant])


  return (
    <>
      <section className="product-intro pt-lg-70" data-product-content>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-7 offset-lg-1 column-1 min-h-45-vh">
              <ul
                className="list-slider-product"
                data-aos="fadeIn .8s ease-in-out .2s, d:loop"
              >
                <li
                  className="wrapper-slider-product"
                  data-default-active
                  data-get-color={selectedVariant && selectedVariant.color}
                >
                  <div className="slider-product">
                    <div className="container-btn-top">
                      {isBestSeller && (
                        <div className="best-seller-tag">
                          <span>Best Seller</span>
                        </div>
                      )}
                      <SaveProductButton
                        productData={selectedProductDetails.product}
                        savedProductsData={savedProductsData}
                        setSavedProductsData={setSavedProductsData}
                      />
                    </div>
                    <div className="swiper-container reset-slide-enabled">
                      <div className="swiper-wrapper">
                        {selectedVariant && selectedVariant.images?.map((imageData, index) => {
                          return (
                            <div key={index} className="swiper-slide">
                              <div className="wrapper-img">
                                <div className="container-img">
                                  <ImageWrapper timeout={0} key={imageData.src} defaultDimensions={{ width: 671, height: 671 }} url={imageData.src} min_w={"671"} min_h={"671"} />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        {selectedVariant?.modalUrl && (
                          <div className="swiper-slide slide-360">
                            <div className="wrapper-img">
                              <i className="icon-360"></i>
                              <div className="container-img">
                                <ModalCanvas3d key={selectedVariant?.modalUrl} path={selectedVariant?.modalUrl} />
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
                          {selectedVariant &&
                            selectedVariant.images?.map((data, index) => {
                              const { src } = data;
                              return (
                                <div
                                  key={index}
                                  className={`swiper-slide  ${index === selectedVariantIndex
                                    ? "active"
                                    : ""
                                    }`}
                                >
                                  <div className="wrapper-img">
                                    <div className="container-img">
                                      <ImageWrapper timeout={0} key={src} defaultDimensions={{ width: 170, height: 170 }} url={src} min_w={"170"} min_h={"170"} />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          {selectedVariant?.modalUrl && (
                            <div className="swiper-slide">
                              <div className="wrapper-img img-3d">
                                <div className="container-img">
                                  <img
                                    src="/images/3d.svg"
                                    data-preload
                                    className="media"
                                    alt="3d model"
                                  />
                                </div>
                                <span className="hide">360</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 column-2 mt-tablet-20 mt-phone-25">
              <div className="container-product-description">
                <form className="form-cart" onSubmit={handleAddToCart}>
                  <input type="hidden" name="sku[]" defaultValue="MODCH09" />
                  <div className="wrapper-product-name">
                    <div className="container-product-name">
                      <h1
                        className="fs--60 fs-phone-30 product-name"
                        data-aos="d:loop"
                      >
                        {selectedProductDetails.product.name} {pricingTier}
                      </h1>
                    </div>
                  </div>
                  <ul className="list-specs mt-tablet-20 mt-phone-15 min-h-250-px"
                    data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                  >
                    {selectedVariant && selectedVariant.sku && (
                      <li className="sku">
                        <span className="specs-title">SKU</span>
                        <span className="specs-text">
                          {selectedVariant && selectedVariant.sku}
                        </span>
                      </li>
                    )}

                    {selectedVariant && selectedVariant.color && (
                      <li className="color">
                        <span className="specs-title">Color</span>
                        <span className="specs-text">
                          {selectedVariant && selectedVariant.color}
                        </span>
                      </li>
                    )}

                    {selectedVariant?.weight ? (
                      <li className="color cs-weight">
                        <span className="specs-title">Weight</span>
                        <span className="specs-text">
                          {selectedVariant && selectedVariant.weight}LBS
                        </span>
                      </li>
                    ) : null}

                    {selectedProductDetails &&
                      selectedProductDetails.product?.additionalInfoSections &&
                      selectedProductDetails.product.additionalInfoSections.map(
                        (sec, index) => {
                          const { title, description } = sec;

                          return (
                            <li className={`${title} ${title === "IMPORTANT" ? "long-desc" : ""}`} key={index}>
                              <span className="specs-title">{title}</span>
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

                    {selectedProductDetails && SHOW_PRICES &&
                      selectedProductDetails.product.formattedPrice && (
                        <li className="seat-height">
                          <span className="specs-title">Price</span>
                          <span className="specs-text">
                            {findPriceForTier(selectedProductDetails, pricingTier)}
                          </span>
                        </li>
                      )}
                  </ul>
                  <ul
                    className="list-colors"
                    data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                  >
                    {selectedProductDetails.variantData.map(
                      (variantData, index) => {
                        return (
                          <li key={index} className="list-colors-item">
                            <div
                              className="container-input"
                              data-set-color={variantData.variant.color}
                              onClick={() =>
                                handleImageChange({
                                  index: index,
                                  selectedVariantData: variantData.variant,
                                  modalUrl: variantData.zipUrl,
                                })
                              }
                            >
                              <label>
                                <input
                                  type="radio"
                                  name="colors"
                                  value={variantData.variant.color}
                                  checked={index === selectedVariantIndex}
                                  readOnly
                                />
                                <div className="container-img">
                                  <ImageWrapper timeout={0} key={variantData.variant.imageSrc} defaultDimensions={{ width: 50, height: 50 }} url={variantData.variant.imageSrc} type="product" />
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
                        onClick={() => handleQuantityChange(+cartQuantity - 1)}
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
                        onInput={(e) => handleQuantityChange(e.target.value)}
                      />
                      <button
                        onClick={() => handleQuantityChange(+cartQuantity + 1)}
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
                        Color Variant Not Available in Your Preferred Location.
                        Please &nbsp;
                      </p>
                      <btn-modal-open group="modal-contact">
                        Contact Us
                      </btn-modal-open>
                    </div>
                  )}
                  <AvailabilityCard
                    selectedVariantData={
                      selectedProductDetails.variantData[selectedVariantIndex]
                    }
                    setUnavailable={setUnavailable}
                  />

                  {selectedProductDetails &&
                    selectedProductDetails.product.customTextFields.map(
                      (data, index) => {
                        const { title, mandatory } = data;
                        return (
                          <div
                            key={index}
                            className="container-product-notes mt-lg-30 mt-tablet-25 mt-phone-30"
                            data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                          >
                            <div className="container-input product-notes">
                              {index === 0 && (<label>Customize product text</label>)}
                              <input
                                name={`product_notes_${index}`}
                                type="text"
                                placeholder={title}
                                required={mandatory}
                                onChange={(e) => handleInputChange(title, e.target.value)}
                              />
                            </div>
                          </div>
                        );
                      }
                    )}
                </form>
              </div>

              {/* DESCRIPTION */}
              {selectedProductDetails &&
                selectedProductDetails.product.description && selectedProductDetails.product.description !== "<p>&nbsp;</p>" && (
                  <div
                    className={`container-info-text container-read-more description mt-lg-40 mt-tablet-20 mt-phone-50 ${buttonLabel ? "active" : ""
                      }`}
                    data-aos=""
                  >
                    <h3 className="title-info-text" data-aos="">
                      <span>Description</span>
                    </h3>
                    <div
                      className="wrapper-text"
                      data-aos="fadeIn .8s ease-in-out"
                    >
                      <div
                        ref={descriptionRef}
                        className="text"
                        dangerouslySetInnerHTML={{
                          __html: updatedDescription,
                        }}
                      ></div>
                    </div>
                    <button
                      className="btn-read-more"
                      data-aos="fadeIn .8s ease-in-out"
                      onClick={() => setButtonLabel(!buttonLabel)}
                    >
                      <div className="btn-text">
                        <span className="read-more">Read More</span>
                        <span className="to-go-back">To go back</span>
                      </div>
                      <i className="icon-arrow-down"></i>
                    </button>
                  </div>
                )}

              {/* DOWNLOADS */}
              {selectedProductDetails && SHOW_DOCUMENTS &&
                selectedProductDetails.productDocs?.length > 0 && (
                  <div className="container-info-text" data-aos="">
                    <h3 className="title-info-text" data-aos="">
                      Downloads
                    </h3>
                    <div
                      className="container-btn container-btn-downloads"
                      data-aos="fadeIn .8s ease-in-out"
                    >
                      {selectedProductDetails.productDocs.map((data, index) => {
                        const { fileName, downloadUrl } = data;
                        return (
                          <a key={index} href={downloadUrl} download={fileName}>
                            <button className="btn-small-tag">
                              <span>{fileName}</span>
                              <i className="icon-arrow-down"></i>
                            </button>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}

              {/* Certificates */}
              {selectedProductDetails && SHOW_FIREPROOF_CERTIFICATES &&
                selectedProductDetails.fireProofCertificates?.length > 0 && (
                  <div className="container-info-text" data-aos="">
                    <h3 className="title-info-text" data-aos="">
                      Fireproof Certificates
                    </h3>
                    <div
                      className="container-btn container-btn-downloads"
                      data-aos="fadeIn .8s ease-in-out"
                    >
                      {selectedProductDetails.fireProofCertificates.map((data, index) => {
                        const { fileName, downloadUrl } = data;
                        return (
                          <a key={index} href={downloadUrl} download={fileName}>
                            <button className="btn-small-tag">
                              <span>{fileName}</span>
                              <i className="icon-arrow-down"></i>
                            </button>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}

              {/* PRODUCT FOUND */}
              {selectedProductDetails &&
                productFoundInCategories.length > 0 && (
                  <div className="container-info-text" data-aos="">
                    <h3 className="title-info-text" data-aos="">
                      Product found in
                    </h3>
                    <div
                      className="container-btn"
                      data-aos="fadeIn .8s ease-in-out"
                    >
                      {productFoundInCategories.map((data, index) => {
                        const { name } = data;
                        const slug = data["link-copy-of-category-name-2"];

                        return (
                          <AnimateLink key={index} to={slug}>
                            <button className="btn-small-tag">
                              <span>{name}</span>
                            </button>
                          </AnimateLink>
                        );
                      })}
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>
      {selectedVariant && selectedVariant.usecaseImages?.length > 0 && (
        <SnapShots data={selectedVariant.usecaseImages} />
      )}

      {matchedProductsData.length > 0 && (
        <MatchItWith
          matchedProductsData={matchedProductsData}
          savedProductsData={savedProductsData}
          setSavedProductsData={setSavedProductsData}
          bestSeller={bestSeller}
        />
      )}

      <ArticleSection data={blogsData} />

      <PortfolioSection data={portfolioData} />
    </>
  );
};

export default ProductPostPage;
