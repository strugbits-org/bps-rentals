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
import { extractCategoryIds, findCategoryData, getAllCategoriesPaths } from "@/Utils/Utils";
import { redirect } from "next/navigation";

export async function generateMetadata({ params }) {
  try {
    // const _slug = decodeURIComponent(params.slug);
    const slug = "/category/" + params.slug;
    const [
      metaData,
      categoriesData,
    ] = await Promise.all([
      getPageMetaData("category"),
      fetchAllCategoriesData(),
    ]);
    const { title, noFollowTag } = metaData;
    const selectedCategoryData = findCategoryData(categoriesData, slug);

    const metadata = {
      title: (selectedCategoryData?.parentCollection?.name || selectedCategoryData?.name) + title,
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
    const categoriesData = await fetchAllCategoriesData();
    const slugs = getAllCategoriesPaths(categoriesData);
    const paths = slugs.map((slug) => ({ slug }));

    return paths;
  } catch (error) {
    console.log("Error:", error);
    return [];
  }
};

export default async function Page({ params }) {
  try {
    const _slug = decodeURIComponent(params.slug);
    const slug = "/category/" + _slug;
    const param_slug = "/category/" + params.slug;

    const categoriesData = await fetchAllCategoriesData();

    let selectedCategoryData = findCategoryData(categoriesData, slug);
    if (!selectedCategoryData) {
      selectedCategoryData = findCategoryData(categoriesData, param_slug);
      if (!selectedCategoryData) {
        throw `Category Data not found: ${_slug} ${slug}, ${selectedCategoryData}`;
      }
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
    console.error("Error fetching category page data:", error);
    redirect("/error");
  }
}
