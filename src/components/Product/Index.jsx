"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";

import {
  markPageLoaded,
  pageLoadEnd,
  pageLoadStart,
  resetSlideIndex,
} from "@/Utils/AnimationFunctions";
import { generateImageURL, productImageURL } from "@/Utils/GenerateImageURL";
import { calculateTotalCartQuantity, compareArray } from "@/Utils/Utils";
import { checkParameters } from "@/Utils/CheckParams";

import { getSavedProductData } from "@/Services/ProductsApis";
import { AddProductToCart } from "@/Services/CartApis";

import PortfolioSection from "../Common/Sections/PortfolioSection";
import { SaveProductButton } from "../Common/SaveProductButton";
import ArticleSection from "../Common/Sections/ArticleSection";
import ModalCanvas3d from "../Common/ModalCanvas3d";
import Breadcrumb from "../Common/BreadCrumbData";
import AnimateLink from "../Common/AnimateLink";

import { AvailabilityCard } from "./AvailabilityCard";
import MatchItWith from "./MatchItWithSection";
import SnapShots from "./SnapShotsSection";

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
  const [cookies, setCookie] = useCookies([
    "authToken",
    "userData",
    "cartQuantity",
    "userTokens",
    "location",
  ]);

  const { productSnapshotData } = selectedProductDetails;
  const [productFoundInCategories, setProductFoundInCategories] = useState([]);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [savedProductsData, setSavedProductsData] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState();
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [buttonLabel, setButtonLabel] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(1);

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
    resetSlideIndex();
  };

  useEffect(() => {
    if (selectedProductDetails && productSnapshotData) {
      const selectedVariantData = selectedProductDetails.variantData[0].variant;
      const selectedVariantFilteredData = productSnapshotData.find(
        (variant) => variant.colorVariation === selectedVariantData.variantId
      );

      if (selectedVariantFilteredData && selectedVariantFilteredData.images) {
        const combinedVariantData = {
          ...selectedVariantData,
          ...selectedVariantFilteredData,
          modalUrl: selectedProductDetails.variantData[0].zipUrl,
        };

        setSelectedVariantIndex(0);
        setSelectedVariant(combinedVariantData);
      } else {
        const combinedVariantData = {
          ...selectedVariantData,
          ...selectedVariantFilteredData,
          modalUrl: selectedProductDetails.variantData[0].zipUrl,
          images: [{ src: selectedVariantData.imageSrc }],
        };
        setSelectedVariantIndex(0);
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
  }, [selectedProductDetails]);

  const seatHeightData =
    selectedProductDetails.product.additionalInfoSections.find(
      (data) => data.title.toLowerCase() === "seat height".toLowerCase()
    );

  const handleQuantityChange = async (value) => {
    if (value < 10000 && value > 0) {
      setCartQuantity(value);
    }
  };

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      pageLoadStart();

      const product_id = selectedProductDetails.product._id;
      const product_location = cookies?.location;
      const variant_id = selectedVariant.variantId
        .replace(product_id, "")
        .substring(1);

      const productData = {
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
      const response = await AddProductToCart(productData);

      const total = calculateTotalCartQuantity(response.cart.lineItems);
      setCookie("cartQuantity", total);
      if (response) {
        router.push("/cart");
      }
    } catch (error) {
      pageLoadEnd();
      console.error("Error while adding item to cart:", error);
    }
  };
  useEffect(() => {
    const params = [
      selectedProductDetails,
      matchedProductsData,
      productSnapshotData,
    ];
    if (checkParameters(params)) {
      markPageLoaded();
    }
  }, [selectedProductDetails, matchedProductsData, productSnapshotData]);

  const updatedDescription = selectedProductDetails.product.description.replace(
    /color:#000000;/g,
    "color:#0F41FA"
  );

  const fetchSavedProducts = async () => {
    const savedProducts = await getSavedProductData();
    setSavedProductsData(savedProducts);
  };

  useEffect(() => {
    fetchSavedProducts();
    setTimeout(markPageLoaded, 100);
  }, []);

  return (
    <>
      <section className="product-intro pt-lg-70" data-product-content>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-7 offset-lg-1 column-1">
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
                      {/* <button className="btn-bookmark">
                        <i className="icon-bookmark"></i>
                        <i className="icon-bookmark-full"></i>
                      </button> */}
                    </div>
                    <div className="swiper-container">
                      <div className="swiper-wrapper">
                        {selectedVariant &&
                          selectedVariant.images?.map((imageData, index) => {
                            return (
                              <div key={index} className="swiper-slide">
                                <div className="wrapper-img">
                                  <div className="container-img">
                                    <img
                                      src={generateImageURL({
                                        wix_url: imageData.src,
                                        w: "671",
                                        h: "671",
                                        fit: "fill",
                                        q: "95",
                                      })}
                                    />
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
                                <ModalCanvas3d
                                  path={selectedVariant?.modalUrl}
                                />
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
                                  class={`swiper-slide  ${
                                    index === selectedVariantIndex
                                      ? "active"
                                      : ""
                                  }`}
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
                                        style={{ padding: "20px" }}
                                        data-preload
                                        class=""
                                        alt={`product-thumb-${index}`}
                                      />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          {selectedVariant?.modalUrl && (
                            <div class="swiper-slide">
                              <div class="wrapper-img img-3d">
                                <div class="container-img">
                                  <img
                                    src="/images/3d.svg"
                                    data-preload
                                    class="media"
                                  />
                                </div>
                                <span class="hide">360</span>
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
              <ul className="list-breadcrumb" data-aos="fadeIn .8s ease-in-out">
                <Breadcrumb selectedProductDetails={selectedProductDetails} />
              </ul>
              <div className="container-product-description">
                <form className="form-cart" onSubmit={handleAddToCart}>
                  <input type="hidden" name="sku[]" defaultValue="MODCH09" />
                  <div className="wrapper-product-name">
                    <div className="container-product-name">
                      <h1
                        className="fs--60 fs-phone-30 product-name split-words"
                        data-aos="d:loop"
                      >
                        {selectedProductDetails.product.name}
                      </h1>
                    </div>
                  </div>
                  <ul
                    className="list-specs mt-tablet-20 mt-phone-15"
                    data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                  >
                    {selectedVariant && selectedVariant.sku && (
                      <li class="sku">
                        <span class="specs-title">SKU</span>
                        <span class="specs-text">
                          {selectedVariant && selectedVariant.sku}
                        </span>
                      </li>
                    )}

                    {selectedVariant && selectedVariant.size && (
                      <li class="size">
                        <span class="specs-title">Size</span>
                        <span
                          class="specs-text"
                          dangerouslySetInnerHTML={{
                            __html: selectedVariant.size,
                          }}
                        ></span>
                      </li>
                    )}

                    {selectedVariant && selectedVariant.color && (
                      <li class="color">
                        <span class="specs-title">Color</span>
                        <span class="specs-text">
                          {selectedVariant && selectedVariant.color}
                        </span>
                      </li>
                    )}

                    <li className="weight">
                      <span className="specs-title">Weight</span>
                      <span className="specs-text">11.5lbs</span>
                    </li>

                    {seatHeightData && (
                      <li class="seat-height">
                        <span class="specs-title">Seat Height</span>
                        <span
                          class="specs-text"
                          dangerouslySetInnerHTML={{
                            __html: seatHeightData.description,
                          }}
                        ></span>
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
                          <li key={index} class="list-colors-item">
                            <div
                              class="container-input"
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
                                <div class="container-img">
                                  <img
                                    src={productImageURL({
                                      wix_url: variantData.variant.imageSrc,
                                      w: "49",
                                      h: "49",
                                      fit: "fill",
                                      q: "95",
                                    })}
                                    data-preload
                                    class="media"
                                    alt="pro-product"
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
                        class="input-number"
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
                      <button className="btn-add-to-cart" type="submit">
                        <span>Add to cart</span>
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
                              <label>Customize product text</label>
                              <input
                                name="product_notes"
                                type="text"
                                placeholder={title}
                                required={mandatory}
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
                selectedProductDetails.product.description && (
                  <div
                    className={`container-info-text container-read-more description mt-lg-40 mt-tablet-20 mt-phone-50 ${
                      buttonLabel ? "active" : ""
                    }`}
                    data-aos=""
                  >
                    <h3 className="title-info-text split-words" data-aos="">
                      <span>Description</span>
                    </h3>
                    <div
                      className="wrapper-text"
                      data-aos="fadeIn .8s ease-in-out"
                    >
                      <div
                        ref={descriptionRef}
                        class="text"
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
              {selectedProductDetails &&
                selectedProductDetails.productDocs?.length > 0 && (
                  <div className="container-info-text" data-aos="">
                    <h3 className="title-info-text split-words" data-aos="">
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
                            <button class="btn-small-tag btn-gray btn-hover-red">
                              <div class="split-chars">
                                <span>{fileName}</span>
                              </div>
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
                    <h3 className="title-info-text split-words" data-aos="">
                      Product found in
                    </h3>
                    <div
                      className="container-btn"
                      data-aos="fadeIn .8s ease-in-out"
                    >
                      {productFoundInCategories.map((data, index) => {
                        const { name, slug } = data;

                        return (
                          <AnimateLink key={index} to={`/category/${slug}`}>
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
        <MatchItWith matchedProductsData={matchedProductsData} />
      )}

      <ArticleSection data={blogsData} />

      <PortfolioSection data={portfolioData} />
    </>
  );
};

export default ProductPostPage;
