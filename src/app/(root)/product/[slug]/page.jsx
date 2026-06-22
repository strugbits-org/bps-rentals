import { notFound } from 'next/navigation';

import ProductPostPage from '@/components/Product/Index';

import {
  getAllCategoriesData,
  getPairWithData,
  fetchAllProductsPaths,
  getAllProducts,
  fetchBestSellers,
  fetchComingSoon,
  fetchAllProducts,
  fetchProductAtthachmentTypes
} from '@/Services/ProductsApis';
import { getPageMetaData, getProductBlogsData, getProductPortfolioData } from "@/Services/SectionsApis";
import { buildMetadata, removeHTMLTags } from '@/Utils/Utils';
import logError from '@/Utils/ServerActions';
import { Suspense } from 'react';
import ProductCollectionPage from '@/components/Product/ProductCollectionPage';

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
    if (!productData && !productData) {
      throw new Error(`Product Data not found for slug: ${slug}`);
    }

    const { product } = productData;
    const description = removeHTMLTags(product.description);

    const metadata = buildMetadata(
      product.name + title,
      description,
      noFollowTag
    );

    return metadata;
  } catch (error) {
    logError("Error in metadata:", error);

    const metaData = await getPageMetaData("error");
    const { title, noFollowTag } = metaData;

    return buildMetadata(title, noFollowTag);
  }
}

export const generateStaticParams = async () => {
  try {
    const paths = await fetchAllProductsPaths() || [];
    return paths.slice(0, 1350);
  } catch (error) {
    logError("Error generating static params(product page):", error);
    return [];
  }
}

export default async function Page({ params }) {
  const slug = decodeURIComponent(params.slug);

  let pairWithData, products, categoriesData, bestSeller, comingSoon, attachmentTypes;
  try {
    [
      pairWithData,
      products,
      categoriesData,
      bestSeller,
      comingSoon,
      attachmentTypes
    ] = await Promise.all([
      getPairWithData(),
      getAllProducts({ throwOnError: true }),
      getAllCategoriesData(),
      fetchBestSellers(),
      fetchComingSoon(),
      fetchProductAtthachmentTypes()
    ]);
  } catch (error) {
    logError("Upstream data fetch failed (product page):", error);
    throw error;
  }

  const selectedProduct = products.find((x) => decodeURIComponent(x.product.slug) === slug);
  // Catalog fetched OK but slug not present => genuine 404.
  if (!selectedProduct) {
    notFound();
  }

  const selectedProductId = selectedProduct.product._id;

  const dataMap = new Map(selectedProduct.productVariantsData.map(({ sku, _id }) => [sku, _id]));

  selectedProduct.variantData = selectedProduct.variantData.reduce((acc, variant) => {
    const variantId = dataMap.get(variant.sku);
    if (variantId) {
      variant.variant.variantId = variantId;
      acc.push(variant);
    }
    return acc;
  }, []);

  if (selectedProduct.variantData.length === 0) {
    notFound();
  }

  const [
    blogsData,
    portfolioData
  ] = await Promise.all([
    getProductBlogsData(selectedProductId),
    getProductPortfolioData(selectedProductId),
  ]);

  const pairedProductsIds = (pairWithData || []).filter((x) => x.productId === selectedProductId).map((x) => x.pairedProductId);
  const matchedProducts = products.filter(product => pairedProductsIds.includes(product.product._id));

  return (
    <Suspense>
      {selectedProduct?.productSets?.length ? (
        <ProductCollectionPage
          selectedProductDetails={selectedProduct}
          matchedProductsData={matchedProducts}
          categoriesData={categoriesData}
          blogsData={blogsData}
          portfolioData={portfolioData}
          bestSeller={bestSeller}
          comingSoon={comingSoon}
          attachmentTypes={attachmentTypes}
        />
      ) : (
        <ProductPostPage
          selectedProductDetails={selectedProduct}
          matchedProductsData={matchedProducts}
          categoriesData={categoriesData}
          blogsData={blogsData}
          portfolioData={portfolioData}
          bestSeller={bestSeller}
          comingSoon={comingSoon}
          attachmentTypes={attachmentTypes}
        />
      )}
    </Suspense>
  );
}
