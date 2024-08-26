import { redirect } from 'next/navigation';

import ProductPostPage from '@/components/Product/Index';

import {
  getAllCategoriesData,
  getPairWithData,
  fetchAllProductsPaths,
  fetchBestSellers,
  fetchProductById,
  fetchProductsByIds,
  getProductData,
} from '@/Services/ProductsApis';
import { getBlogsData, getPageMetaData, getPortfolioData } from "@/Services/SectionsApis";

export async function generateMetadata({ params }) {
  try {
    const slug = decodeURIComponent(params.slug);
    const [
      metaData,
      product,
    ] = await Promise.all([
      getPageMetaData("product"),
      getProductData(slug),
    ]);

    const { title, noFollowTag } = metaData;

    return {
      title: product.name + title,
      description: product.description,
      robots: process.env.NEXT_PUBLIC_ENVIRONMENT !== "PRODUCTION" && noFollowTag ? "noindex,nofollow" : null,
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

export const generateStaticParams = async () => {
  try {
    const paths = await fetchAllProductsPaths() || [];
    return paths;
  } catch (error) {
    console.error("Error:", error);
  }
}

export default async function Page({ params }) {
  const slug = decodeURIComponent(params.slug);

  const [
    pairWithData,
    categoriesData,
    blogsData,
    portfolioData,
    bestSeller
  ] = await Promise.all([
    getPairWithData(),
    getAllCategoriesData(),
    getBlogsData(),
    getPortfolioData(),
    fetchBestSellers()
  ]);

  const selectedProduct = await fetchProductById(slug);
  
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
  const matchedProducts = await fetchProductsByIds(pairedProductsIds);

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
