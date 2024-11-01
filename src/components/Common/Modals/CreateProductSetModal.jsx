"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { ModalWrapper } from "./ModalWrapper/ModalWrapper";
import { CustomSelect } from "../CustomSelect";
import { closeModal, openModal } from "@/Utils/AnimationFunctions";
import { ImageWrapper } from "../ImageWrapper";
import { getProductForUpdate, updateDataItem } from "@/Services/AdminApis";
import { toast } from "react-toastify";

const CreateProductSetModal = ({ products, setToggleCreateNewModal, onSave }) => {
  const [mainProduct, setMainProduct] = useState(null);
  const [productsSet, setProductsSet] = useState([]);
  const [productValue, setProductValue] = useState(null);
  const [setproductValue, setSetProductValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const productsOptions = useMemo(() =>
    products?.map(product => ({
      value: product._id,
      label: product.product.name,
    })),
    [products]
  );

  const variantsOptions = useMemo(() => {
    const variants = [];
    products.filter(product => product._id !== mainProduct?._id).forEach(product => {
      product.variantData.forEach(variant => {
        variants.push({
          value: variant.sku,
          productId: product._id,
          sku: variant.sku,
          label: product.product.name + (variant.variant.color ? " | " + variant.variant.color : "") + " | " + variant.sku,
        });
      });
    });
    return variants;
  },
    [products, mainProduct]
  );

  const handleSelectMainProduct = useCallback((e) => {
    setProductValue(e);
    const productId = e.value;
    if (!mainProduct || mainProduct._id !== productId) {
      setMainProduct(products.find(product => product._id === productId));
    }
  }, [mainProduct, products]);

  const handleSelectSetProduct = useCallback((e) => {
    setSetProductValue(e);
    const data = {
      product: e.productId,
      variant: e.value,
      quantity: 1,
    }
    setProductsSet(prev => prev.some(prod => prod.variant === e.value) ? prev : [data, ...prev]);
  }, [productsSet, products]);


  const createProductSet = async () => {
    if (!mainProduct) {
      toast.warn("Please select a main product first.");
      return;
    }
    if (!productsSet.length) {
      toast.warn("Please add at least one product to set.");
      return;
    }
    setLoading(true);

    try {
      setMainProduct(prev => ({ ...prev, productSets: productsSet }));
      const productData = await getProductForUpdate(mainProduct.product._id);
      productData.data.productSets = productsSet;
      await updateDataItem(productData);
      onSave({ ...mainProduct, productSets: productsSet });
      closeThisModal();
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  }

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

  const handleQuantityChange = async (id, quantity) => {
    console.log("handleQuantityChange", id, quantity);
    
    if (quantity < 10000 && quantity > 0) {
      setProductsSet(prev => {
        const updatedProductsSet = prev.map((x) => {
          if (id === x.product) {
            x.quantity = Number(quantity);
          }
          return x;
        });
        return updatedProductsSet;
      });
    }
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
                if (!setProduct) return null;
                const { quantity } = setProduct;                
                const product = products.find(product => product._id === setProduct.product);
                const variant = product.variantData.find(variant => variant.sku === setProduct.variant);

                return (
                  <li key={setProduct.variant} className="list-item mb-10">
                    <div className="cart-product cart-product-2">
                      <div className="container-img">
                        <ImageWrapper key={product.product._id} timeout={0} defaultDimensions={{ width: 120, height: 120 }} min_w={120} min_h={120} url={variant.variant.imageSrc} />
                      </div>
                      <div className="wrapper-product-info">
                        <div className="container-top">
                          <div className="container-product-name">
                            <h2 className="product-name text-sm-custom ">{product.product.name} {variant.variant.color ? `| ${variant.variant.color}` : ""} | {variant.sku}</h2>
                          </div>
                          <button onClick={() => { removeSetProduct(product._id) }} type="button" className="btn-cancel btn-cancel-2">
                            <i className="icon-close"></i>
                          </button>
                        </div>
                        <div className="container-product-description">
                          <div className="form-cart">
                            <div className="container-add-to-cart mt-tablet-20 mt-phone-25">
                              <div className="container-input container-input-quantity">
                                <button
                                  onClick={() => handleQuantityChange(product._id, +quantity - 1)}
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
                                  onInput={(e) => handleQuantityChange(product._id, e.target.value)}
                                />
                                <button
                                  onClick={() => handleQuantityChange(product._id, +quantity + 1)}
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
          <button onClick={createProductSet} className={`btn-3-blue btn-blue btn-small order-mobile-1 ${loading ? "btn-disabled" : ""}`} disabled={loading}>
            <span>{loading ? "Please Wait" : "Create"}</span>
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default CreateProductSetModal;