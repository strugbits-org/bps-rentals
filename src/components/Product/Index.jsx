"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  markPageLoaded,
  pageLoadStart,
  resetSlideIndex,
} from "@/Utils/AnimationFunctions";
import { generateImageURL, productImageURL } from "@/Utils/GenerateImageURL";
import { checkParameters } from "@/Utils/CheckParams";

import Breadcrumb from "../Common/BreadCrumbData";
import AnimateLink from "../Common/AnimateLink";
import MatchItWith from "./MatchItWithSection";
import SnapShots from "./SnapShotsSection";
import ArticleSection from "../Common/Sections/ArticleSection";
import PortfolioSection from "../Common/Sections/PortfolioSection";
import ModalCanvas3d from "../Common/ModalCanvas3d";

const ProductPostPage = ({
  selectedProductDetails,
  matchedProductsData,
  productVariantsImages,
  productFoundData,
  categoriesData,
  blogsData,
  portfolioData,
}) => {
  const router = useRouter();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [savedProductsData, setSavedProductsData] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState();
  const [cartQuantity, setCartQuantity] = useState(1);
  const descriptionRef = useRef(null);
  const [buttonLabel, setButtonLabel] = useState(false);

  const handleImageChange = ({ index, selectedVariantData, modalUrl }) => {
    const selectedVariantFilteredData = productVariantsImages.find(
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

  const productFondFilteredData = productFoundData.filter((data) => {
    const parentCollectionId = data.parentCollection._id;
    return selectedProductDetails.subCategory.some(
      (collection) => collection._id === parentCollectionId
    );
  });

  useEffect(() => {
    if (selectedProductDetails && productVariantsImages) {
      const selectedVariantData = selectedProductDetails.variantData[0].variant;
      const selectedVariantFilteredData = productVariantsImages.find(
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
    }
  }, [productVariantsImages, selectedProductDetails]);

  const seatHeightData =
    selectedProductDetails.product.additionalInfoSections.find(
      (data) => data.title.toLowerCase() === "seat height".toLowerCase()
    );

  const handleQuantityChange = async (value) => {
    if (value < 10000 && value > 0) {
      setCartQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    try {
      pageLoadStart();
      const product_id = selectedProductDetails.product._id;
      const variant_id = selectedVariant.variantId
        .replace(product_id, "")
        .substring(1);
      const collection = selectedProductDetails.f1Collection
        .map((x) => x.collectionName)
        .join(" - ");

      const product = {
        catalogReference: {
          appId: "215238eb-22a5-4c36-9e7b-e7c08025e04e",
          catalogItemId: product_id,
          options: {
            variantId: variant_id,
            customTextFields: {
              collection: collection,
              additonalInfo: "",
            },
          },
        },
        quantity: cartQuantity,
      };
      const data = await AddProductToCart([product]);
      const total = calculateTotalCartQuantity(data.cart.lineItems);
      setCookie("cartQuantity", total);

      router.push("/cart");
    } catch (error) {
      pageLoadEnd();
      console.log("Error:", error);
    }
  };
  useEffect(() => {
    const params = [
      selectedProductDetails,
      matchedProductsData,
      productVariantsImages,
    ];
    if (checkParameters(params)) {
      markPageLoaded();
    }
  }, [selectedProductDetails, matchedProductsData, productVariantsImages]);

  const updatedDescription = selectedProductDetails.product.description.replace(
    /color:#000000;/g,
    "color:#0F41FA"
  );

  // const fetchSavedProducts = async () => {
  //   const savedProducts = await getSavedProductData();
  //   setSavedProductsData(savedProducts);
  // };
  // useEffect(() => {
  //   fetchSavedProducts();
  // }, []);
  useEffect(() => {
    setTimeout(() => {
      markPageLoaded();
    }, 100);
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
                      <div className="best-seller-tag">
                        <span>Best Seller</span>
                      </div>
                      <button className="btn-bookmark">
                        <i className="icon-bookmark"></i>
                        <i className="icon-bookmark-full"></i>
                      </button>
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

                {/* {["Home", "Corporate"].map((data, index) => {
                  return (
                    <li key={index} className="list-breadcrumb-item">
                      <AnimateLink to="/" className="breadcrumb">
                        <span>{data}</span>
                      </AnimateLink>
                    </li>
                  );
                })} */}
              </ul>
              <div className="container-product-description">
                <form action="cart.html" className="form-cart" data-pjax>
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
                    <button
                      onClick={handleAddToCart}
                      className="btn-add-to-cart"
                      type="submit"
                    >
                      <span>Add to cart</span>
                      <i className="icon-arrow-right"></i>
                    </button>
                  </div>
                  <div
                    className="container-available font-2 blue-1 mt-md-40 mt-phone-30"
                    data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                  >
                    <div className="available-title">
                      <i className="icon-pin"></i>
                      <h3 className="fs--16 fs-phone-14">
                        Available for national delivery (Conditions apply)
                      </h3>
                    </div>
                    <p className="fs--10 fs-tablet-14 mt-5">
                      Please note, screen colors may not accurately match actual
                      product colors. Also, natural wood items can vary in
                      color, grain, and texture, which is part of their unique
                      charm.
                    </p>
                  </div>

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
              {selectedProductDetails && productFondFilteredData.length > 0 && (
                <div className="container-info-text" data-aos="">
                  <h3 className="title-info-text split-words" data-aos="">
                    Product found in
                  </h3>
                  <div
                    className="container-btn"
                    data-aos="fadeIn .8s ease-in-out"
                  >
                    {productFondFilteredData.map((data, index) => {
                      const { name, slug } = data.parentCollection;

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
