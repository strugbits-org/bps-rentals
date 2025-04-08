import { notFound } from 'next/navigation';

import ProductPostPage from '@/components/Product/Index';

import {
  getAllCategoriesData,
  fetchAllProductsPaths,
  // getAllProducts,
  fetchBestSellers,
  fetchAllProducts,
  fetchProductsByIds,
  fetchProductById,
  getPairedProducts,
  getProductVariantsImages
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
    if (!productData && !productData?.data) {
      throw new Error(`Product Data not found for slug: ${slug}`);
    }

    const { product } = productData.data;
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
  return [];
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
    const selectedProduct = await fetchProductById(slug);
    const selectedProductId = selectedProduct.product._id;

    const [
      pairedProducts,
      productSnapshotData,
      // products,
      categoriesData,
      bestSeller
    ] = await Promise.all([
      getPairedProducts(selectedProductId),
      getProductVariantsImages([selectedProductId]),
      // getAllProducts({}),
      getAllCategoriesData(),
      fetchBestSellers()
    ]);
    // const selectedProduct = products.find((x) => decodeURIComponent(x.product.slug) === slug);
    if (!selectedProduct) {
      throw new Error(`Product Data not found for slug: ${slug}`);
    }

    const [
      blogsData,
      portfolioData
    ] = await Promise.all([
      getProductBlogsData(selectedProductId),
      getProductPortfolioData(selectedProductId),
    ]);

    // const dataMap = new Map(selectedProduct.productVariantsData.map(({ sku, _id }) => [sku, _id]));
    selectedProduct.productSnapshotData = productSnapshotData;

    selectedProduct.variantData = selectedProduct.variantData.map((variant) => {
      variant.variant.variantId = variant.variant._id;
      return variant;
    });
    // selectedProduct.variantData = selectedProduct.variantData.reduce((acc, variant) => {
    //   const variantId = dataMap.get(variant.sku);
    //   if (variantId) {
    //     variant.variant.variantId = variantId;
    //     acc.push(variant);
    //   }
    //   return acc;
    // }, []);

    if (selectedProduct.variantData.length === 0) {
      throw new Error(`No Variants found for product/slug: ${slug}`);
    }
    if (selectedProduct.variantData.length === 0) notFound();

    const pairedProductsIds = pairedProducts.map((item) => item.pairedProductId);
    const matchedProducts = await fetchProductsByIds(pairedProductsIds);

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
          />
        ) : (
          <ProductPostPage
            selectedProductDetails={selectedProduct}
            matchedProductsData={matchedProducts}
            categoriesData={categoriesData}
            blogsData={blogsData}
            portfolioData={portfolioData}
            bestSeller={bestSeller}
          />
        )}
      </Suspense>
    );
  } catch (error) {
    logError("Error fetching product page data:", error);
    notFound();
  }
}
