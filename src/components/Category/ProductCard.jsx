import AnimateLink from "../Common/AnimateLink";
import React, { useEffect, useState } from "react";
import { SaveProductButton } from "../Common/SaveProductButton";
import { compareArray } from "@/Utils/Utils";
import { decryptField } from "@/Utils/Encrypt";
import useUserData from "@/Hooks/useUserData";
import { ImageWrapper } from "../Common/ImageWrapper";

const ProductCard = ({
  productData,
  isSavedProduct,
  getSelectedProductSnapShots,
  savedProductsData,
  setSavedProductsData,
  lastActiveColor,
  filteredProducts = [],
  bestSeller = []
}) => {

  const { product, variantData } = productData;
  const categories = productData?.subCategoryData || [];

  const [filteredVariants, setFilteredVariants] = useState(variantData);
  const [activeVariant, setActiveVariant] = useState(variantData[0]);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const { role } = useUserData();

  const handleFilteredData = () => {
    setFilteredVariants(variantData);
    const newVariant = variantData.find(variant => variant.color.some(x => x === lastActiveColor));
    if (newVariant) {
      setActiveVariant(newVariant)
    } else {
      setActiveVariant(variantData[0])
    };
    const isBestSellerProduct = compareArray(bestSeller, categories.map(x => x._id));
    setIsBestSeller(isBestSellerProduct);
  }
  useEffect(() => {
    if (filteredProducts.length !== 0) handleFilteredData();
  }, [filteredProducts]);

  const copySku = () => navigator.clipboard.writeText(activeVariant.sku);

  useEffect(() => {
    handleFilteredData();
  }, []);
  return (
    <div
      className={`${isSavedProduct ? isSavedProduct : "product-link large active"
        }`}
      data-product-category
      data-product-location
      data-product-colors
    >
      <div className="container-tags">
        {!isSavedProduct && isBestSeller && (
          <div className="best-seller">
            <span>Best Seller</span>
          </div>
        )}
        <SaveProductButton
          key={product._id}
          productData={product}
          savedProductsData={savedProductsData}
          setSavedProductsData={setSavedProductsData}
        />
      </div>
      {!isSavedProduct && (
        <div className="container-copy">
          <button onClick={copySku} className="btn-copy copy-link">
            <span>{activeVariant.sku}</span>
            <i className="icon-copy"></i>
          </button>
        </div>
      )}
      <AnimateLink to={`/product/${product.slug}`} className="link">
        <div className="container-top">
          <h2 className="product-title">{product.name}</h2>
          {!isSavedProduct && (
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
              <div className="dimensions"><span>{activeVariant.location.toString()} <i className="icon-pin"></i></span></div>
              <div className="dimensions">{product && role === "admin" && (<span>{decryptField(product.formattedPrice)}</span>)}</div>
            </div>
          )}
        </div>
        <div className="wrapper-product-img">
          {filteredVariants.map((selectedData, index) => {
            return (
              <React.Fragment key={index}>
                <div
                  key={index}
                  className={`container-img product-img ${selectedData.sku === activeVariant.sku ? "active" : ""}`}
                >
                  <ImageWrapper url={selectedData.variant.imageSrc} type="product" />
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
                    key={idx}
                    onMouseEnter={() => setActiveVariant(variant)}
                    onTouchStart={() => setActiveVariant(variant)}
                    className={`list-item ${variant.sku === activeVariant.sku ? "active" : ""}`}
                  >
                    <div className="container-img">
                      <ImageWrapper url={variant.variant.imageSrc} type="product" />
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
        onClick={() => getSelectedProductSnapShots(productData, activeVariant)}
        group="modal-product-2"
        class="modal-add-to-cart"
      >
        <span>Add to cart</span>
        <i className="icon-cart"></i>
      </btn-modal-open>
    </div>
  );
};
export default ProductCard;
