import { productImageURL } from "@/Utils/GenerateImageURL";
import AnimateLink from "../Common/AnimateLink";
import React, { useEffect, useState } from "react";
import { SaveProductButton } from "../Common/SaveProductButton";
import { hasMatchingColor } from "@/Utils/Utils";

const ProductCard = ({
  index,
  product,
  styleClassName,
  variantData,
  selectedVariant,
  filteredProducts,
  getSelectedProductSnapShots,
  savedProductsData,
  setSavedProductsData,
  filterColors = []
}) => {
  const [filteredVariants, setFilteredVariants] = useState(variantData);
  const [activeVariant, setActiveVariant] = useState(selectedVariant);

  useEffect(() => {
    const matchingVariants = variantData.filter(variant => hasMatchingColor(
      filterColors.filter((x) => x.checked),
      variant.color
    ));
    const newVariants = matchingVariants.length !== 0 ? matchingVariants : variantData;
    setFilteredVariants(newVariants);
    setActiveVariant(newVariants[0]);
  }, [filterColors]);

  return (
    <div
      className={`${
        styleClassName ? styleClassName : "product-link large active"
      }`}
      data-product-category
      data-product-location
      data-product-colors
    >
      <div className="container-tags">
        <div className="best-seller">
          <span>Best Seller</span>
        </div>
        <SaveProductButton
          productData={product}
          savedProductsData={savedProductsData}
          setSavedProductsData={setSavedProductsData}
        />
      </div>
      <div className="container-copy">
        <button className="btn-copy copy-link">
          <span>{activeVariant.sku}</span>
          <i className="icon-copy"></i>
        </button>
        <input
          type="text"
          className="copy-link-url"
          defaultValue={activeVariant.sku}
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
          {filteredVariants.map((selectedData, index) => {
            return (
              <React.Fragment key={index}>
                <div
                  className="container-img product-img"
                  data-get-product-link-color={selectedData.color[0]}
                  data-default-product-link-active={index === 1}
                >
                  <img
                    src={productImageURL({
                      wix_url: activeVariant.variant.imageSrc,
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
          {filteredVariants.map((variant, idx) => {
            return (
              <React.Fragment key={idx}>
                {idx < 4 && (
                  <li
                    className="list-item"
                    data-set-product-link-color={variant.color[0]}
                    onMouseEnter={() => setActiveVariant(variant)}
                    data-default-product-link-active={idx === 0}
                  >
                    <div className="container-img">
                      <img
                        src={productImageURL({
                          wix_url: variant.variant.imageSrc,
                          w: "40",
                          h: "40",
                          fit: "fill",
                          q: "100",
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
        {filteredVariants.length > 4 && (
          <div className="colors-number">
            <span>+{filteredVariants.length - 4}</span>
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
