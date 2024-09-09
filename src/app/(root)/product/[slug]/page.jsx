import { redirect } from 'next/navigation';

import ProductPostPage from '@/components/Product/Index';

import {
  getAllCategoriesData,
  getPairWithData,
  fetchAllProductsPaths,
  getAllProducts,
  fetchBestSellers,
  fetchAllProducts
} from '@/Services/ProductsApis';
import { getPageMetaData, getProductBlogsData, getProductPortfolioData } from "@/Services/SectionsApis";
import { removeHTMLTags } from '@/Utils/Utils';

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

    const description = removeHTMLTags(product.description);
    const metadata = {
      title: product.name + title,
      description: description,
    };

    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION" && noFollowTag) {
      metadata.robots = "noindex,nofollow";
    }

    return metadata;
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
    bestSeller
  ] = await Promise.all([
    getPairWithData(),
    getAllProducts({}),
    getAllCategoriesData(),
    fetchBestSellers()
  ]);
  const selectedProduct = products.find((x) => decodeURIComponent(x.product.slug) === slug);
  if (!selectedProduct) redirect("/error");
  const selectedProductId = selectedProduct.product._id;

  const [
    blogsData,
    portfolioData
  ] = await Promise.all([
    getProductBlogsData(selectedProductId),
    getProductPortfolioData(selectedProductId),
  ]);

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
