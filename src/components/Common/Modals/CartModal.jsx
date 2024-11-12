import CartModalCollection from "./CartModalCollection";
import CartModalSimple from "./CartModalSimple";

const CartModal = ({
  productData,
  setProductData,
  productSnapshots,
  productFilteredVariantData,
  selectedVariantData,
  setSelectedVariantData,
  handleImageChange,
  selectedVariantIndex,
  setProductSnapshots,
  setProductFilteredVariantData,
  bestSeller = [],
  savedProductsData,
  setSavedProductsData,
}) => {

  return (
    <>
      <CartModalSimple
        productData={productData}
        setProductData={setProductData}
        productSnapshots={productSnapshots}
        productFilteredVariantData={productFilteredVariantData}
        selectedVariantData={selectedVariantData}
        setSelectedVariantData={setSelectedVariantData}
        handleImageChange={handleImageChange}
        selectedVariantIndex={selectedVariantIndex}
        setProductSnapshots={setProductSnapshots}
        setProductFilteredVariantData={setProductFilteredVariantData}
        bestSeller={bestSeller}
        savedProductsData={savedProductsData}
        setSavedProductsData={setSavedProductsData}
      />
      <CartModalCollection
        productData={productData}
        setProductData={setProductData}
        selectedVariantData={selectedVariantData}
        setSelectedVariantData={setSelectedVariantData}
        selectedVariantIndex={selectedVariantIndex}
        setProductSnapshots={setProductSnapshots}
        setProductFilteredVariantData={setProductFilteredVariantData}
        bestSeller={bestSeller}
        savedProductsData={savedProductsData}
        setSavedProductsData={setSavedProductsData}
      />
    </>
  );
};

export default CartModal;
