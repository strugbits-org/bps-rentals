import { redirect } from 'next/navigation';

import ProductPostPage from '@/components/Product/Index';

import {
  getAllCategoriesData,
  getPairItWithProducts,
  getPairItWithProductsId,
  getProductFound,
  getProductVariantsImages,
  getProductVariants,
  getSelectedProductDetails,
  getSelectedProductId,
  fetchAllProducts,
} from '@/Services/ProductsApis';
import { getBlogsData, getPortfolioData } from "@/Services/SectionsApis";

// export const generateStaticParams = async () => {
//   try {
//     const all_products = await fetchAllProducts() || [];
//     const paths = all_products.map((data) => ({ slug: data.product.slug }));
//     return paths;
//   } catch (error) {
//     console.log("Error:", error);
//   }
// }

export default async function Page({ params }) {
  const slug = decodeURIComponent(params.slug);

  const selectedProductRes = await getSelectedProductId(slug);
  if (!selectedProductRes?.length) {
    redirect("/error");
    return null;
  }

  const selectedProductId = selectedProductRes[0]._id;

  const [
    pairIWithRes,
    productVariantsData,
    selectedProductDetails,
    productVariantsImages,
    productFound,
    categoriesData,
    blogsData,
    portfolioData,
  ] = await Promise.all([
    getPairItWithProductsId(selectedProductId),
    getProductVariants(selectedProductId),
    getSelectedProductDetails(selectedProductId),
    getProductVariantsImages(selectedProductId),
    getProductFound(),
    getAllCategoriesData(),
    getBlogsData(),
    getPortfolioData(),
  ]);

  const pairedProductIds = pairIWithRes.map((item) => item.pairedProductId);

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
        productVariantsImages: productVariantsImages,
      }}
      matchedProductsData={productsData}
      productVariantsImages={productVariantsImages}
      productFoundData={productFound}
      categoriesData={categoriesData}
      blogsData={blogsData}
      portfolioData={portfolioData}
    />
  );
}
