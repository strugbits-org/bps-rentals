import { redirect } from 'next/navigation';

import ProductPostPage from '@/components/Product/Index';

import {
  getAllCategoriesData,
  getPairWithData,
  fetchBestSellers,
  fetchProductById,
  fetchProductsByIds,
  getProductData,
  getProductVariantsImages,
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
  return [];
}

export default async function Page({ params }) {
  const slug = decodeURIComponent(params.slug);
  const selectedProduct = await fetchProductById(slug);
  if (!selectedProduct) redirect("/error");
  const productId = selectedProduct.product._id;
  const [
    pairWithData,
    productSnapshotData,
    categoriesData,
    blogsData,
    portfolioData,
    bestSeller
  ] = await Promise.all([
    getPairWithData(),
    getProductVariantsImages(productId),
    getAllCategoriesData(),
    getBlogsData(8),
    getPortfolioData(8),
    fetchBestSellers()
  ]);
  
  selectedProduct.productSnapshotData = productSnapshotData;
  
  selectedProduct.variantData = selectedProduct.variantData.map((variant) => {
    variant.variant.variantId = variant.variant._id;
    return variant;
  });
  
  if (selectedProduct.variantData.length === 0) redirect("/error");

  const selectedProductId = selectedProduct.product._id;
  const pairedProductsIds = pairWithData.filter((x) => x.productId === selectedProductId).map((x) => x.pairedProductId);
  const matchedProducts = await fetchProductsByIds(pairedProductsIds);

  return (
    <ProductPostPage
      selectedProductDetails={selectedProduct}
      matchedProductsData={matchedProducts}
      categoriesData={categoriesData}
      blogsData={blogsData}
      portfolioData={portfolioData}
      bestSeller={bestSeller}
    />
  );
}