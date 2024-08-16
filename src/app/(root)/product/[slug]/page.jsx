import { redirect } from 'next/navigation';

import ProductPostPage from '@/components/Product/Index';

import {
  getAllCategoriesData,
  getPairWithData,
  fetchAllProductsPaths,
  getAllProducts,
  fetchBestSellers,
} from '@/Services/ProductsApis';
import { getBlogsData, getPortfolioData } from "@/Services/SectionsApis";

// export const generateStaticParams = async () => {
//   try {
//     const paths = await fetchAllProductsPaths() || [];
//     return paths;
//   } catch (error) {
//     console.log("Error:", error);
//   }
// }

export default async function Page({ params }) {
  const slug = decodeURIComponent(params.slug);

  const [
    pairWithData,
    products,
    categoriesData,
    blogsData,
    portfolioData,
    bestSeller
  ] = await Promise.all([
    getPairWithData(),
    getAllProducts({}),
    getAllCategoriesData(),
    getBlogsData(),
    getPortfolioData(),
    fetchBestSellers()
  ]);
  const selectedProduct = products.find((x) => decodeURIComponent(x.product.slug) === slug);
  if (!selectedProduct) redirect("/error");

  const dataMap = new Map(selectedProduct.productVariantsData.map(({ sku, _id }) => [sku, _id]));

  selectedProduct.variantData = selectedProduct.variantData.reduce((acc, variant) => {
    const variantId = dataMap.get(variant.sku);
    if (variantId) {
      variant.variant.variantId = variantId;
      acc.push(variant);
    }
    return acc;
  }, []);
  if (selectedProduct.variantData.length === 0) redirect("/error");

  const selectedProductId = selectedProduct.product._id;
  const pairedProductsIds = pairWithData.filter((x) => x.productId === selectedProductId).map((x) => x.pairedProductId);
  const matchedProducts = products.filter(product => pairedProductsIds.includes(product.product._id));

  return (
    <ProductPostPage
      selectedProduct={selectedProduct}
      selectedProductDetails={selectedProduct}
      matchedProductsData={matchedProducts}
      categoriesData={categoriesData}
      blogsData={blogsData}
      portfolioData={portfolioData}
      bestSeller={bestSeller}
    />
  );
}
