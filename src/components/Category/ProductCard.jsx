import { productImageURL } from "@/Utils/GenerateImageURL";
import AnimateLink from "../Common/AnimateLink";
import React, { useEffect, useState } from "react";
import { SaveProductButton } from "../Common/SaveProductButton";
import { compareArray, hasMatchingColor } from "@/Utils/Utils";
import { useCookies } from "react-cookie";
import { decryptField } from "@/Utils/encrypt";
import useUserData from "@/Hooks/useUserData";

const ProductCard = ({
  productData,
  isSavedProduct,
  getSelectedProductSnapShots,
  savedProductsData,
  setSavedProductsData,
  filteredProducts = [],
  filterColors = [],
  bestSeller = []
}) => {
  const { product, variantData } = productData;
  const categories = productData?.subCategoryData || [];

  const [filteredVariants, setFilteredVariants] = useState(variantData);
  const [activeVariant, setActiveVariant] = useState(variantData[0]);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [cookies, setCookie] = useCookies(["location"]);
  const { role } = useUserData();

  const handleFilteredData = () => {
    const matchingVariants = variantData.filter(variant => {
      const hasColor = hasMatchingColor(
        filterColors.filter((x) => x.checked),
        variant.color
      );

      const hasLocation = cookies.location
        ? variant.location.includes(cookies.location)
        : true;

      return hasColor && hasLocation;
    });
    const checkedColors = filterColors.filter((x) => x.checked);
    const newVariants = checkedColors.length !== 0 ? matchingVariants : variantData;
    setFilteredVariants(newVariants);
    setActiveVariant(newVariants[0]);

    const isBestSellerProduct = compareArray(bestSeller, categories.map(x => x._id));
    setIsBestSeller(isBestSellerProduct);
  }
  useEffect(() => {
    if (filteredProducts.length !== 0) handleFilteredData();
  }, [filteredProducts]);

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
          productData={product}
          savedProductsData={savedProductsData}
          setSavedProductsData={setSavedProductsData}
        />
      </div>
      {!isSavedProduct && (
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
                {product && role === "admin" && (<span>{decryptField(product.formattedPrice)}</span>)}
              </div>
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
                  <img
                    src={productImageURL({
                      wix_url: selectedData.variant.imageSrc,
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
                    key={idx}
                    onMouseEnter={() => setActiveVariant(variant)}
                    className={`list-item ${variant.sku === activeVariant.sku ? "active" : ""}`}
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
        onClick={() => getSelectedProductSnapShots(productData)}
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
