import ProductPostPage from "@/components/Product/Index";
import {
  getAllCategoriesData,
  getPairItWithProducts,
  getPairItWithProductsId,
  getProductFound,
  getProductVariantsImages,
  getProductVariants,
  getSelectedProductDetails,
  getSelectedProductId,
} from "@/Services/ProductsApis";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const { slug } = params;

  const selectedProductRes = await getSelectedProductId(slug);
  if (!selectedProductRes?.length) {
    redirect("/error");
    return null; // Ensure early return after redirect
  }

  const selectedProductId = selectedProductRes[0]._id;

  // Fetch initial product data
  const [
    pairIWithRes,
    productVariantsData,
    selectedProductDetails,
    productVariantsImages,
    productFound,
    categoriesData,
  ] = await Promise.all([
    getPairItWithProductsId(selectedProductId),
    getProductVariants(selectedProductId),
    getSelectedProductDetails(selectedProductId),
    getProductVariantsImages(selectedProductId),
    getProductFound(),
    getAllCategoriesData(),
  ]);

  const pairedProductIds = pairIWithRes.map((item) => item.pairedProductId);

  // Fetch matched products data and their details
  const matchedProductsData = await getPairItWithProducts(pairedProductIds);
  const productsData = await Promise.all(
    matchedProductsData.map(async (productData) => {
      const productId = productData.product._id;
      const [productVariantsImages, productVariantsData] = await Promise.all([
        getProductVariantsImages(productId),
        getProductVariants(productId),
      ]);
      return {
        ...productData,
        productVariantsImages,
        productVariantsData,
      };
    })
  );

  // Filter and map variant data
  const dataMap = new Map(productVariantsData.map((item) => [item.sku, item]));
  const filteredVariantData = selectedProductDetails[0].variantData.filter(
    (variant) => {
      if (dataMap.has(variant.sku)) {
        const dataItem = dataMap.get(variant.sku);
        variant.variant.variantId = dataItem._id;
        return true;
      }
      return false;
    }
  );
  return (
    <ProductPostPage
      selectedProductDetails={{
        ...selectedProductDetails[0],
        variantData: filteredVariantData,
      }}
      matchedProductsData={productsData}
      productVariantsImages={productVariantsImages}
      productFoundData={productFound}
      categoriesData={categoriesData}
    />
  );
}
