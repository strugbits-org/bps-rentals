"use client";

import { useEffect, useState } from "react";
import { closeModals, markPageLoaded, updatedWatched } from "@/Utils/AnimationFunctions";
import { getSavedProductData } from "@/Services/ProductsApis";
import ProductCard from "../Category/ProductCard";

const SavedProducts = ({ productsVariantImagesData, productsVariantsData }) => {

  const [savedProductsData, setSavedProductsData] = useState([]);
  const pageSize = 20;
  const [pageLimit, setPageLimit] = useState(pageSize);


  const fetchSavedProducts = async () => {
    const savedProducts = await getSavedProductData();

    const items = savedProducts.map((product) => {
      if (!product._id) return;
      const productId = product.product._id;
      product.productSnapshotData = productsVariantImagesData.filter(x => x.productId === productId);
      product.productVariantsData = productsVariantsData.filter(x => x.productId === productId);
      return product;
    });

    setSavedProductsData(items);
    setTimeout(markPageLoaded, 200);
  }
  useEffect(() => {
    fetchSavedProducts();
  }, []);

  useEffect(() => {
    closeModals();
  }, [savedProductsData]);

  return (
    <div class="wrapper-account">
      <div class="wrapper-top">
        <h1 class="fs--60 blue-1 split-words" data-aos="d:loop">
          Saved Products
        </h1>
      </div>
      <div class="wrapper-bottom mt-lg-105 mt-tablet-35 mt-phone-25">
        <ul
          class="list-saved-products grid-lg-25 grid-tablet-33 grid-phone-50"
          data-aos="fadeIn .8s ease-in-out .4s, d:loop"
        >
          {savedProductsData.length === 0 ? (
            <div style={{ margin: "20vh auto" }}>
              <h6 className="fs--20 text-center split-words ">
                No Products Found
              </h6>
            </div>
          ) : (
            savedProductsData.slice(0, pageLimit).map((data, index) => {
              return (
                <li key={index} className="grid-item">
                  <ProductCard
                    key={index}
                    isSavedProduct="product-link small saved-products active"
                    productData={data}
                    savedProductsData={savedProductsData}
                    setSavedProductsData={setSavedProductsData}
                  />
                </li>
              );
            })
          )}
        </ul>
        {pageLimit < savedProductsData.length && (
          <div class="flex-tablet-center mt-lg-60 mt-tablet-40 mt-phone-45">
            <button
              onClick={() => {
                setPageLimit((prev) => prev + pageSize);
                updatedWatched();
              }}
              class="btn-2-blue"
            >
              <span>Load more</span>
              <i class="icon-arrow-right-2"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedProducts;
