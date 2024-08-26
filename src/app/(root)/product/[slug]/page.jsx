import { redirect } from 'next/navigation';

import ProductPostPage from '@/components/Product/Index';

import {
  getAllCategoriesData,
  getPairWithData,
  fetchAllProductsPaths,
  getAllProducts,
  fetchBestSellers,
  fetchAllProducts,
} from '@/Services/ProductsApis';
import { getBlogsData, getPageMetaData, getPortfolioData } from "@/Services/SectionsApis";

export async function generateMetadata({ params }) {
  try {
    const slug = decodeURIComponent(params.slug);
    const [
      metaData,
      productData,
    ] = await Promise.all([
      getPageMetaData("product"),
      fetchAllProducts(slug),
    ]);

    const { title, noFollowTag } = metaData;
    const { product } = productData.data;

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
