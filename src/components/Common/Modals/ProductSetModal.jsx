"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { ModalWrapper } from "./ModalWrapper/ModalWrapper";
import { CustomSelect } from "../CustomSelect";
import { closeModal, openModal } from "@/Utils/AnimationFunctions";
import { ImageWrapper } from "../ImageWrapper";
import { getProductForUpdate, updateDataItem } from "@/Services/AdminApis";
import { toast } from "react-toastify";
import logError from "@/Utils/ServerActions";
import { decryptField } from "@/Utils/Encrypt";

const ProductSetModal = ({ activeSet, setActiveSet, options, setToggleSetModal, onUpdate, onSave }) => {
  const [mainProduct, setMainProduct] = useState(null);
  const [productsSet, setProductsSet] = useState([]);
  const [productSetValue, setProductSetValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const productsOptions = useMemo(
    () =>
      options.map(({ subCategoryData = [], product }) => ({
        value: product._id,
        product: product._id,
        slug: product.slug,
        name: product.name,
        image: product.mainMedia,
        label: product.name,
        categories: subCategoryData.map((cat) => cat["link-copy-of-category-name-2"]),
      })),
    [options]
  );

  const variantsOptions = useMemo(() => {
    return options.flatMap(({ product, variantData }) =>
      product._id !== mainProduct?.product
        ? variantData
          .filter(({ sku, variant }) => variant._id && sku && !productsSet.some((prod) => prod.variant === sku))
          .map(({ sku, variant }) => ({
            value: sku,
            productId: product._id,
            name: product.name,
            slug: product.slug,
            size: variant.size,
            id: variant._id,
            price: variant.price,
            color: variant.color,
            image: variant.imageSrc,
            label: `${product.name}${variant.color ? ` | ${variant.color}` : ""} | ${sku}`,
          }))
        : []
    );
  }, [options, mainProduct, productsSet]);

  const handleSelectSetProduct = useCallback(
    (e) => {
      setProductSetValue(e);

      const data = {
        product: e.productId,
        variant: e.value,
        name: e.name,
        slug: e.slug,
        id: e.id,
        size: e.size,
        color: e.color,
        price: e.price ? decryptField(e.price) : "$0.00",
        image: e.image,
        quantity: 1,
      };

      setProductsSet((prev) => {
        return prev.find((prod) => prod.variant === e.value) ? prev : [data, ...prev];
      });
    },
    [setProductSetValue, setProductsSet]
  );


  const updateProductSet = async () => {
    if (!mainProduct) {
      toast.warn("Please select a main product first.");
      return;
    }
    if (productsSet.length === 0) {
      toast.warn("Please add at least one product to set.");
      return;
    }

    setLoading(true);

    try {
      const updatedProductSet = { ...mainProduct, productSets: productsSet };
      setMainProduct(updatedProductSet);

      const productData = await getProductForUpdate(mainProduct.product);
      if (!productData?.data) {
        throw new Error("Failed to fetch product data.");
      }
      productData.data.productSets = productsSet;

      await updateDataItem(productData);

      const isUpdatingMainProduct = activeSet?.product === mainProduct.product;
      if (isUpdatingMainProduct) {
        onUpdate(updatedProductSet);
      } else {
        onSave(updatedProductSet);
      }

      closeThisModal();
    } catch (error) {
      logError(`Failed to ${activeSet ? "update" : "create"} product set`, error);
      toast.error("An error occurred while updating. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const removeSetProduct = (id) => {
    setProductsSet(prev => {
      const updatedData = prev.filter(prod => prod.variant !== id);
      if (!updatedData.length) setProductSetValue(null);
      return updatedData;
    });
  };

  const handleQuantityChange = async (id, quantity) => {
    if (quantity < 10000 && quantity > 0) {
      setProductsSet(prev => {
        const updatedProductsSet = prev.map((x) => {
          if (id === x.variant) x.quantity = Number(quantity);
          return x;
        });
        return updatedProductsSet;
      });
    }
  };

  const setInitialValues = async () => {
    if (activeSet) {
      setMainProduct(activeSet);
      setProductsSet(activeSet.productSets);
    }
  }

  const closeThisModal = useCallback(() => {
    closeModal("modal-edit-product-set");
    setTimeout(() => {
      setToggleSetModal(false);
      setActiveSet(null);
    }, 400);
  }, [setToggleSetModal]);

  const handleEscapeKey = useCallback((e) => {
    if (e.key === "Escape") closeThisModal();
  }, [closeThisModal]);

  useEffect(() => {
    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [handleEscapeKey]);

  useEffect(() => {
    setInitialValues();
    openModal("modal-edit-product-set");
  }, []);

  return (
    <ModalWrapper name="modal-edit-product-set" onClose={closeThisModal}>
      <div className="wrapper-section products-set-wrapper min-h-100-sm">
        <h1 className="fs--60 blue-1">{activeSet ? "Update" : "Create"} Product Set</h1>
        <div className="row products-set-container products-set-container-top mt-lg-35 mt-tablet-20 mt-phone-15">
          <div className="col-lg-6">
            <CustomSelect
              options={productsOptions}
              label={"MAIN PRODUCT*"}
              placeholder="Select main product"
              selectedValue={mainProduct}
              onChange={(e) => { setMainProduct(e) }}
            />
          </div>
          <div className="col-lg-6">
            {mainProduct && (
              <ul className="list-cart list-cart-product">
                <li className="list-item">
                  <div className="cart-product cart-product-2 main-product">
                    <div className="container-img">
                      <ImageWrapper key={mainProduct.product} timeout={0} defaultDimensions={{ width: 120, height: 120 }} min_w={120} min_h={120} url={mainProduct.image} />
                    </div>
                    <div className="wrapper-product-info">
                      <div className="container-top">
                        <div className="container-product-name">
                          <h2 className="product-name">{mainProduct.name}</h2>
                        </div>
                        <button onClick={() => { setMainProduct(null) }} type="button" className="btn-cancel btn-cancel-2">
                          <i className="icon-close"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </div>
        <div className="row products-set-container products-set-container-bottom mt-lg-35 mt-tablet-20 mt-phone-15">
          <div className="col-lg-6">
            <div className={"mb-30"}>
              <CustomSelect
                options={variantsOptions}
                label={"SET OF PRODUCTS*"}
                placeholder="Select set of products"
                onChange={handleSelectSetProduct}
                selectedValue={productSetValue}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <ul className="list-cart list-cart-product list-set-products">
              {productsSet.map(set => {
                if (!set) return null;
                const { name, quantity, variant, product, color, image } = set;

                return (
                  <li key={variant} className="list-item mb-10">
                    <div className="cart-product cart-product-2">
                      <div className="container-img">
                        <ImageWrapper key={product} timeout={0} defaultDimensions={{ width: 120, height: 120 }} min_w={120} min_h={120} url={image} />
                      </div>
                      <div className="wrapper-product-info">
                        <div className="container-top">
                          <div className="container-product-name">
                            <h2 className="product-name text-sm-custom ">{name} {color ? `| ${color}` : ""} | {variant}</h2>
                          </div>
                          <button onClick={() => { removeSetProduct(variant) }} type="button" className="btn-cancel btn-cancel-2">
                            <i className="icon-close"></i>
                          </button>
                        </div>
                        <div className="container-product-description">
                          <div className="form-cart">
                            <div className="container-add-to-cart mt-tablet-20 mt-phone-25">
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
                                  className="input-number"
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
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="modal-buttons d-flex-lg flex-mobile-center align-self-center ml-auto mt-10">
          <button onClick={closeThisModal} className="btn-1 btn-border-blue btn-small mr-10" disabled={loading}>
            <span>Cancel</span>
          </button>
          <button onClick={updateProductSet} className={`btn-3-blue btn-blue btn-small order-mobile-1 ${loading ? "btn-disabled" : ""}`} disabled={loading}>
            <span>{loading ? "Please Wait" : (activeSet ? "Update" : "Create")}</span>
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ProductSetModal;