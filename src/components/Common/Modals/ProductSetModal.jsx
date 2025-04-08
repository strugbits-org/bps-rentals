"use client";
import React, { useEffect, useState, useCallback } from "react";
import { ModalWrapper } from "./ModalWrapper/ModalWrapper";
import { CustomSelect } from "../CustomSelect";
import { closeModal, openModal } from "@/Utils/AnimationFunctions";
import { ImageWrapper } from "../ImageWrapper";
import { updateProductSetData } from "@/Services/AdminApis";
import { toast } from "react-toastify";
import logError from "@/Utils/ServerActions";
import { decryptField } from "@/Utils/Encrypt";
import { getVariantBySku } from "@/Services/ProductsApis";

const ProductSetModal = ({ activeSet, setActiveSet, setToggleSetModal, onUpdate, onSave }) => {
  const [mainProduct, setMainProduct] = useState(null);
  const [productsSet, setProductsSet] = useState([]);
  const [productSetValue, setProductSetValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectSetProduct = useCallback(
    async (e) => {
      setProductSetValue(e);

      const decryptedPringTiers = e.pricingTiers.map((tier) => ({
        ...tier,
        price: decryptField(tier.price),
        formattedPrice: decryptField(tier.formattedPrice),
      }));

      const variantData = await getVariantBySku(e.sku);      

      const data = {
        product: e.productId,
        variant: e.value,
        name: e.name,
        slug: e.slug,
        id: variantData.variantId,
        sku: e.sku,
        size: e.size,
        color: e.color,
        productPrice: e.productPrice ? decryptField(e.productPrice) : 0,
        price: e.price ? decryptField(e.price) : 0,
        pricingTiers: decryptedPringTiers,
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

      const payload = {
        id: mainProduct.product,
        productSets: productsSet,
      };

      await updateProductSetData(payload);
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

  const removeSetProduct = (sku) => {
    setProductsSet(prev => {
      const updatedData = prev.filter(prod => prod.variant !== sku);
      if (!updatedData.length) setProductSetValue(null);
      return updatedData;
    });
  };

  const handleQuantityChange = async (sku, quantity) => {
    if (quantity < 10000 && quantity > 0) {
      setProductsSet(prev => {
        const updatedProductsSet = prev.map((x) => {
          if (sku === x.variant) x.quantity = Number(quantity);
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
              type={"products"}
              productsSet={productsSet}
              activeSet={activeSet}
              mainProduct={mainProduct}
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
                productsSet={productsSet}
                activeSet={activeSet}
                type={"variants"}
                label={"SET OF PRODUCTS*"}
                mainProduct={mainProduct}
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