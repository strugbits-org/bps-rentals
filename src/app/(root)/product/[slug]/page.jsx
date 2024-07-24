import ProductPostPage from "@/components/Product/Index";
import {
  getAllCategoriesData,
  getPairItWithProducts,
  getPairItWithProductsId,
  getProductFound,
  getProductSnapShots,
  getProductVariants,
  getSelectedProductDetails,
  getSelectedProductId,
} from "@/Services/ProductsApis";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const { slug } = params;

  const res = await getSelectedProductId(slug);
  let selectedProductId;
  if (res?.length) {
    selectedProductId = res[0]._id;
  } else {
    redirect("/error");
  }
  let pairedProductIds;
  let productVariantsData;
  let dataMap;
  if (selectedProductId) {
    const pairIWithRes = await getPairItWithProductsId(selectedProductId);
    pairedProductIds = pairIWithRes.map((item) => item.pairedProductId);

    productVariantsData = await getProductVariants(selectedProductId);
    dataMap = new Map(productVariantsData.map((item) => [item.sku, item]));
  }
  const [
    selectedProductDetails,
    matchedProductsData,
    productSnapshots,
    productFound,
    categoriesData,
  ] = await Promise.all([
    getSelectedProductDetails(selectedProductId),
    getPairItWithProducts(pairedProductIds),
    getProductSnapShots(selectedProductId),
    getProductFound(),
    getAllCategoriesData(),
  ]);

  const productsData = await Promise.all(
    matchedProductsData.map(async (productData) => {
      const productId = productData.product._id;
      const [productSnapshotData, productVariantsData] = await Promise.all([
        getProductSnapShots(productId),
        getProductVariants(productId),
      ]);
      productData.productSnapshotData = productSnapshotData;
      productData.productVariantsData = productVariantsData;
      return productData;
    })
  );
  let filteredVariantData;
  if (productVariantsData && selectedProductDetails) {
    filteredVariantData = selectedProductDetails[0].variantData =
      selectedProductDetails[0].variantData.filter((variant) => {
        if (dataMap.has(variant.sku)) {
          const dataItem = dataMap.get(variant.sku);
          variant.variant.variantId = dataItem._id;
          return true;
        }
        return false;
      });
  }
  return (
    <ProductPostPage
      selectedProductDetails={selectedProductDetails[0]}
      matchedProductsData={productsData}
      productSnapshots={productSnapshots}
      productFoundData={productFound}
      categoriesData={categoriesData}
    />
  );
}
