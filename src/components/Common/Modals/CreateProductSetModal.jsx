"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { ModalWrapper } from "./ModalWrapper/ModalWrapper";
import { CustomSelect } from "../CustomSelect";
import { closeModal, openModal } from "@/Utils/AnimationFunctions";
import { ImageWrapper } from "../ImageWrapper";

const CreateProductSetModal = ({ products, setToggleCreateNewModal }) => {
  const [mainProduct, setMainProduct] = useState(null);
  const [productsSet, setProductsSet] = useState([]);

  // Memoized options to avoid recalculation
  const productsOptions = useMemo(() =>
    products?.map(product => ({
      value: product._id,
      label: product.product.name,
    })),
    [products]
  );

  const variantsOptions = useMemo(() => {
    const variants = [];
    products.forEach(product => {
      product.variantData.forEach(variant => {
        variants.push({
          value: product._id,
          sku: variant.sku,
          label: product.product.name + " | " + variant.variant.color + " | " + variant.sku,
        });
      });
    });
    return variants;
  },
    [products]
  );

  // Main product selection
  const handleSelectMainProduct = useCallback((e) => {
    const productId = e.value;
    if (!mainProduct || mainProduct._id !== productId) {
      setMainProduct(products.find(product => product._id === productId));
    }
  }, [mainProduct, products]);

  // Set product selection, ensuring no duplicates
  const handleSelectSetProduct = useCallback((e) => {
    const productId = e.value;
    const setProduct = products.find(product => product._id === productId);
    const variant = setProduct.variantData.find(variant => variant.sku === e.sku);
    const data = {
      product: setProduct,
      variant: variant,
    }
    setProductsSet(prev => prev.some(prod => prod.product._id === setProduct._id) ? prev : [...prev, data]);
  }, [products]);

  // Close modal with delay for animation
  const closeThisModal = useCallback(() => {
    closeModal("modal-create-product-set");
    setTimeout(() => {
      setToggleCreateNewModal(false);
    }, 400);
  }, [setToggleCreateNewModal]);

  // Handle Escape key to close modal
  const handleEscapeKey = useCallback((e) => {
    if (e.key === "Escape") closeThisModal();
  }, [closeThisModal]);

  // Add Escape key listener
  useEffect(() => {
    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [handleEscapeKey]);

  // Open modal on mount
  useEffect(() => {
    openModal("modal-create-product-set");
  }, []);

  return (
    <ModalWrapper name="modal-create-product-set" onClose={closeThisModal}>
      <div className="wrapper-section" style={{ minHeight: "50vh", width: "100%" }}>
        <h1 className="fs--60 blue-1">Create New Product Set</h1>
        <div className="row products-set-container mt-lg-35 mt-tablet-20 mt-phone-15">
          <div className="col-6">
            {mainProduct ? (
              <>
                <ul className="list-cart list-cart-product min-h-100-sm">
                  <li className="list-item">
                    <div className="cart-product cart-product-2">
                      <div className="container-img">
                        <ImageWrapper key={mainProduct.product._id} timeout={0} defaultDimensions={{ width: 120, height: 120 }} url={mainProduct.product.mainMedia} />
                      </div>
                      <div className="wrapper-product-info">
                        <div className="container-top">
                          <div className="container-product-name">
                            <h2 className="product-name">{mainProduct.product.name}</h2>
                          </div>
                          <button onClick={() => setMainProduct(null)} type="button" className="btn-cancel">
                            <i className="icon-close"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div className={"mt-lg-35 mt-tablet-20 mt-phone-15"}>
                  <CustomSelect
                    options={variantsOptions}
                    label={"ADD PRODUCT TO SET (You can add multiple products)*"}
                    placeholder="Search any product"
                    onChange={handleSelectSetProduct}
                  />
                </div>
              </>
            ) : (
              <>
                <CustomSelect
                  options={productsOptions}
                  label={"SELECT MAIN PRODUCT*"}
                  placeholder="Search any product"
                  onChange={handleSelectMainProduct}
                />
              </>
            )}
          </div>
          <div className="col-6">
            {productsSet.map(setProduct => {
              const { product, variant } = setProduct;

              return (
                <>
                  <h4 key={product._id} className="fs--20 blue-1">{product.product.name} | {variant.sku}</h4>
                </>
              )
            })}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default CreateProductSetModal;