import { notFound } from 'next/navigation';

import ProductPostPage from '@/components/Product/Index';

import {
  getAllCategoriesData,
  getPairWithData,
  fetchAllProductsPaths,
  getAllProducts,
  fetchBestSellers,
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
    return paths.slice(0, 1);
  } catch (error) {
    logError("Error generating static params(product page):", error);
    return [];
  }
}

export default async function Page({ params }) {
  try {
    const slug = decodeURIComponent(params.slug);

    const [
      pairWithData,
      products,
      categoriesData,
      bestSeller,
      attachmentTypes
    ] = await Promise.all([
      getPairWithData(),
      getAllProducts({}),
      getAllCategoriesData(),
      fetchBestSellers(),
      fetchProductAtthachmentTypes()
    ]);
    const selectedProduct = products.find((x) => decodeURIComponent(x.product.slug) === slug);
    if (!selectedProduct) {
      throw new Error(`Product Data not found for slug: ${slug}`);
    }
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

    if (selectedProduct.variantData.length === 0) {
      throw new Error(`No Variants found for product/slug: ${slug}`);
    }
    if (selectedProduct.variantData.length === 0) notFound();

    const pairedProductsIds = pairWithData.filter((x) => x.productId === selectedProductId).map((x) => x.pairedProductId);
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
            attachmentTypes={attachmentTypes}
          />
        )}
      </Suspense>
    );
  } catch (error) {
    logError("Error fetching product page data:", error);
    notFound();
  }
}
