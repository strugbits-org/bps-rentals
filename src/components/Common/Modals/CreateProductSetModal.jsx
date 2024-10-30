"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { ModalWrapper } from "./ModalWrapper/ModalWrapper";
import { CustomSelect } from "../CustomSelect";
import { closeModal, openModal } from "@/Utils/AnimationFunctions";

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
      product?.variantData?.forEach(variant => {
        variants.push({
          value: variant._id,
          label: variant.sku + " | " + product.product.name + " - " + variant.color,
        })
      })
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
    setProductsSet(prev =>
      prev.some(prod => prod._id === setProduct._id) ? prev : [...prev, setProduct]
    );
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
            <CustomSelect
              options={productsOptions}
              placeholder="Select your main product"
              onChange={handleSelectMainProduct}
            />
            {mainProduct && (
              <>
                <h2 className="fs--60 blue-1">{mainProduct.product.name}</h2>
                <CustomSelect
                  options={variantsOptions}
                  placeholder="Select set of product"
                  onChange={handleSelectSetProduct}
                />
              </>
            )}
          </div>
          <div className="col-6">
            {productsSet.map(setProduct => (
              <h4 key={setProduct._id} className="fs--20 blue-1">{setProduct.product.name}</h4>
            ))}
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default CreateProductSetModal;