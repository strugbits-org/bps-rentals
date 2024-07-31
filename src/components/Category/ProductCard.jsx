import { productImageURL } from "@/Utils/GenerateImageURL";
import AnimateLink from "../Common/AnimateLink";
import React from "react";

const ProductCard = ({
  index,
  product,
  variantData,
  selectedVariant,
  handleImageHover,
  filteredProducts,
  getSelectedProductSnapShots,
}) => {
  const defaultVariantSku = selectedVariant?.sku;
  const defaultVariantImage = selectedVariant?.variant.imageSrc;
  return (
    <div
      className="product-link large active"
      data-product-category
      data-product-location
      data-product-colors
    >
      <div className="container-tags">
        <div className="best-seller">
          <span>Best Seller</span>
        </div>
        <button className="btn-bookmark">
          <i className="icon-bookmark"></i>
          <i className="icon-bookmark-full"></i>
        </button>
      </div>
      <div className="container-copy">
        <a href="javascript:void(0)" className="btn-copy copy-link">
          <span>{defaultVariantSku}</span>
          <i className="icon-copy"></i>
        </a>
        <input
          type="text"
          className="copy-link-url"
          defaultValue={defaultVariantSku}
          style={{
            position: "absolute",
            opacity: 0,
            pointerEvents: "none",
          }}
        />
      </div>
      <AnimateLink to={`/product/${product.slug}`} className="link">
        <div className="container-top">
          <h2 className="product-title">{product.name}</h2>
          <div className="container-info">
            <div className="dimensions">
              {product.additionalInfoSections?.map((data, index) => {
                const { title, description } = data;
                if (title == "Size") {
                  return (
                    <span
                      key={index}
                      dangerouslySetInnerHTML={{
                        __html: description,
                      }}
                    ></span>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div className="wrapper-product-img">
          {variantData.map((selectedData, index) => {
            return (
              <React.Fragment key={index}>
                <div
                  className="container-img product-img"
                  data-get-product-link-color={selectedData.color[0]}
                  data-default-product-link-active={index === 0}
                >
                  <img
                    src={productImageURL({
                      wix_url: defaultVariantImage,
                      w: "346",
                      h: "346",
                      fit: "fill",
                      q: "80",
                    })}
                    className=" "
                  />
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </AnimateLink>
      <div className="container-color-options">
        <ul className="list-color-options">
          {variantData.map((selVariantData, idx) => {
            return (
              <React.Fragment key={idx}>
                {idx < 4 && (
                  <li
                    className="list-item"
                    data-set-product-link-color={selVariantData.color[0]}
                    onMouseEnter={() => handleImageHover(index, selVariantData)}
                    data-default-product-link-active={idx === 0}
                  >
                    <div className="container-img">
                      <img
                        src={productImageURL({
                          wix_url: selVariantData.variant.imageSrc,
                          w: "22",
                          h: "22",
                          fit: "fill",
                          q: "90",
                        })}
                        data-preload
                        className="media"
                        alt="product"
                      />
                    </div>
                  </li>
                )}
              </React.Fragment>
            );
          })}
        </ul>
        {variantData.length > 4 && (
          <div className="colors-number">
            <span>+{variantData.length - 4}</span>
          </div>
        )}
      </div>
      <btn-modal-open
        onClick={() => getSelectedProductSnapShots(filteredProducts[index])}
        group="modal-product"
        class="modal-add-to-cart"
      >
        <span>Add to cart</span>
        <i className="icon-cart"></i>
      </btn-modal-open>
    </div>
  );
};
export default ProductCard;
