"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { ModalWrapper } from "./ModalWrapper/ModalWrapper";
import { CustomSelect } from "../CustomSelect";
import { closeModal, openModal } from "@/Utils/AnimationFunctions";
import { ImageWrapper } from "../ImageWrapper";

const CreateProductSetModal = ({ products, setToggleCreateNewModal }) => {
  const [mainProduct, setMainProduct] = useState(null);
  const [productsSet, setProductsSet] = useState([]);
  const [productValue, setProductValue] = useState(null);
  const [setproductValue, setSetProductValue] = useState(null);

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
          label: product.product.name + (variant.variant.color ? " | " + variant.variant.color : "") + " | " + variant.sku,
        });
      });
    });
    return variants;
  },
    [products]
  );

  // Main product selection
  const handleSelectMainProduct = useCallback((e) => {
    setProductValue(e);
    const productId = e.value;
    if (!mainProduct || mainProduct._id !== productId) {
      setMainProduct(products.find(product => product._id === productId));
    }
  }, [mainProduct, products]);

  // Set product selection, ensuring no duplicates
  const handleSelectSetProduct = useCallback((e) => {
    setSetProductValue(e);
    const productId = e.value;
    const setProduct = products.find(product => product._id === productId);
    const variant = setProduct.variantData.find(variant => variant.sku === e.sku);
    const data = {
      product: setProduct,
      variant: variant,
    }
    setProductsSet(prev => prev.some(prod => prod.product._id === setProduct._id) ? prev : [data, ...prev]);
  }, [productsSet, products]);

  const handleRemoveMainProduct = () => {
    setMainProduct(null);
    setProductValue(null);
  }

  const removeSetProduct = (id) => {
    setProductsSet(prev => {
      const updatedData = prev.filter(prod => prod.product._id !== id);
      if (!updatedData.length) setSetProductValue(null);
      return updatedData;
    });
  };

  const closeThisModal = useCallback(() => {
    closeModal("modal-create-product-set");
    setTimeout(() => {
      setToggleCreateNewModal(false);
    }, 400);
  }, [setToggleCreateNewModal]);

  const handleEscapeKey = useCallback((e) => {
    if (e.key === "Escape") closeThisModal();
  }, [closeThisModal]);

  useEffect(() => {
    window.addEventListener("keydown", handleEscapeKey);
    return () => window.removeEventListener("keydown", handleEscapeKey);
  }, [handleEscapeKey]);

  useEffect(() => {
    openModal("modal-create-product-set");
  }, []);

  return (
    <ModalWrapper name="modal-create-product-set" onClose={closeThisModal}>
      <div className="wrapper-section products-set-wrapper min-h-100-sm">
        <h1 className="fs--60 blue-1">Create New Product Set</h1>
        <div className="row products-set-container products-set-container-top mt-lg-35 mt-tablet-20 mt-phone-15">
          <div className="col-lg-6">
            <CustomSelect
              options={productsOptions}
              label={"MAIN PRODUCT*"}
              placeholder="Select main product"
              selectedValue={productValue}
              onChange={handleSelectMainProduct}
            />
          </div>
          <div className="col-lg-6">
            {mainProduct && (
              <ul className="list-cart list-cart-product">
                <li className="list-item">
                  <div className="cart-product cart-product-2 main-product">
                    <div className="container-img">
                      <ImageWrapper key={mainProduct.product._id} timeout={0} defaultDimensions={{ width: 120, height: 120 }} min_w={120} min_h={120} url={mainProduct.product.mainMedia} />
                    </div>
                    <div className="wrapper-product-info">
                      <div className="container-top">
                        <div className="container-product-name">
                          <h2 className="product-name">{mainProduct.product.name}</h2>
                        </div>
                        <button onClick={handleRemoveMainProduct} type="button" className="btn-cancel btn-cancel-2">
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
                selectedValue={setproductValue}
              />
            </div>
          </div>
          <div className="col-lg-6">
            <ul className="list-cart list-cart-product list-set-products">
              {productsSet.map(setProduct => {
                const { product, variant } = setProduct;
                return (
                  <li className="list-item mb-10">
                    <div className="cart-product cart-product-2">
                      <div className="container-img">
                        <ImageWrapper key={product.product._id} timeout={0} defaultDimensions={{ width: 120, height: 120 }} min_w={120} min_h={120} url={variant.variant.imageSrc} />
                      </div>
                      <div className="wrapper-product-info">
                        <div className="container-top">
                          <div className="container-product-name">
                            <h2 className="product-name">{product.product.name} | {variant.variant.color} | {variant.sku}</h2>
                          </div>
                          <button onClick={() => { removeSetProduct(product._id) }} type="button" className="btn-cancel btn-cancel-2">
                            <i className="icon-close"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default CreateProductSetModal;