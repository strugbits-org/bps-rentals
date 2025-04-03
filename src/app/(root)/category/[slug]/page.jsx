import CategoryPage from "@/components/Category/Index";
import { getRentalsBanners } from "@/Services/Index";
import { getFilterLocations } from "@/Services/NavbarApis";
import {
  fetchAllCategoriesData,
  fetchBestSellers,
  getAllColorsData,
  getAllProducts,
} from "@/Services/ProductsApis";
import { getHomeSectionDetails, getMarketsData, getPageMetaData } from "@/Services/SectionsApis";
import logError from "@/Utils/ServerActions";
import { buildMetadata, extractCategoryIds, findCategoryData, getAllCategoriesPaths } from "@/Utils/Utils";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  try {
    const decodedSlug = decodeURIComponent(params.slug);
    const slug = "/category/" + decodedSlug;

    const [metaData, categoriesData] = await Promise.all([
      getPageMetaData("category"),
      fetchAllCategoriesData(),
    ]);

    const { title, noFollowTag } = metaData;

    let selectedCategoryData = findCategoryData(categoriesData, slug) || findCategoryData(categoriesData, "/category/" + params.slug);

    if (!selectedCategoryData) {
      throw new Error(`Category Data not found for slug: ${slug}`);
    }

    const metadata = buildMetadata(
      (selectedCategoryData.parentCollection?.name || selectedCategoryData.name) + title,
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
    const categoriesData = await fetchAllCategoriesData();
    const slugs = getAllCategoriesPaths(categoriesData);
    const paths = slugs.map((slug) => ({ slug }));
    return      [];
  } catch (error) {
    logError("Error generating static params(category page):", error);
    return [];
  }
};

export default async function Page({ params }) {
  try {
    const slug = "/category/" + decodeURIComponent(params.slug);

    const categoriesData = await fetchAllCategoriesData();

    const selectedCategoryData = findCategoryData(categoriesData, slug) || findCategoryData(categoriesData, "/category/" + params.slug);

    if (!selectedCategoryData) {
      throw new Error(`Category Data not found for slug: ${slug}`);
    }

    const categoryIds = extractCategoryIds(selectedCategoryData);

    const [
      homePageContent,
      bannersData,
      locations,
      marketsData,
      colorsData,
      bestSeller,
      productsData
    ] = await Promise.all([
      getHomeSectionDetails(),
      getRentalsBanners(),
      getFilterLocations(),
      getMarketsData(),
      getAllColorsData(),
      fetchBestSellers(),
      getAllProducts({ categories: categoryIds }),
    ]);

    return (
      <CategoryPage
        slug={params.slug}
        pageContent={homePageContent}
        bannersData={bannersData}
        locations={locations}
        marketsData={marketsData}
        colorsData={colorsData}
        categoriesData={categoriesData}
        selectedCategoryData={selectedCategoryData}
        bestSeller={bestSeller}
        productsData={productsData}
      />
    );
  } catch (error) {
    logError("Error fetching category page data:", error);
    notFound();
  }
}
