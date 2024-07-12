import { useState } from "react";
import { resetSlideIndex } from "@/Utils/AnimationFunctions";
import { getProductSnapShots, getProductVariants } from "@/Services/HomeApis";

const useProductFunctions = (index, product, variantData) => {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [selectedVariantData, setSelectedVariantData] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(variantData[0]);

  const [productSnapshots, setProductSnapshots] = useState([]);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [productFilteredVariantData, setProductFilteredVariantData] =
    useState();

  const getSelectedProductSnapShots = async () => {
    setSelectedVariantIndex(index);
    try {
      const product_id = product._id;
      const [productSnapshotData, productVariantsData] = await Promise.all([
        getProductSnapShots(product_id),
        getProductVariants(product_id),
      ]);

      let dataMap = new Map(
        productVariantsData.map((item) => [item.sku, item])
      );

      let filteredVariantData = variantData.filter((variant) => {
        if (dataMap.has(variant.sku)) {
          const dataItem = dataMap.get(variant.sku);
          variant.variant.variantId = dataItem._id;
          return true;
        }
        return false;
      });
      setProductFilteredVariantData(filteredVariantData);
      setProductSnapshots(productSnapshotData);

      if (filteredVariantData.length > 0) {
        handleImageChange({
          index: index,
          selectedVariantData: filteredVariantData[0].variant,
          productSnapshots: productSnapshotData,
          modalUrl: filteredVariantData[0].zipUrl,
        });
      }
      product.preview = true;
      setTimeout(() => {
        const modal_group = document.querySelector(
          `modal-group[name='${product._id}']`
        );
        modal_group.open();
      }, 10);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleImageChange = ({
    index,
    selectedVariantData,
    productSnapshots,
    modalUrl,
  }) => {
    if (productSnapshots) {
      const selectedVariantFilteredData = productSnapshots.find(
        (variant) => variant.colorVariation === selectedVariantData.variantId
      );

      if (selectedVariantFilteredData && selectedVariantFilteredData?.images) {
        const combinedVariantData = {
          ...selectedVariantData,
          ...selectedVariantFilteredData,
          modalUrl: modalUrl,
        };
        setSelectedVariantIndex(index);
        setSelectedVariantData(combinedVariantData);
      } else {
        const combinedVariantData = {
          ...selectedVariantData,
          ...selectedVariantFilteredData,
          modalUrl: modalUrl,
          images: [{ src: selectedVariantData.imageSrc }],
        };
        setSelectedVariantIndex(index);
        setSelectedVariantData(combinedVariantData);
      }
    }
    resetSlideIndex();
  };

  return {
    selectedVariantIndex,
    selectedVariantData,
    productSnapshots,
    successMessageVisible,
    errorMessageVisible,
    productFilteredVariantData,
    selectedVariant,
    getSelectedProductSnapShots,
    handleImageChange,
    setSuccessMessageVisible,
    setErrorMessageVisible,
    setSelectedVariantData,
    setProductFilteredVariantData,
    setProductSnapshots,
    setSelectedVariant,
  };
};

export default useProductFunctions;
