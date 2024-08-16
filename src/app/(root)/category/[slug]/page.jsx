import CategoryPage from "@/components/Category/Index";
import { getRentalsBanners } from "@/Services/Index";
import { getFilterLocations } from "@/Services/NavbarApis";
import {
  fetchAllCategoriesData,
  fetchBestSellers,
  getAllColorsData,
  getAllProducts,
} from "@/Services/ProductsApis";
import { getHomeSectionDetails, getMarketsData } from "@/Services/SectionsApis";
import { extractCategoryIds, findCategoryData, getAllCategoriesPaths } from "@/Utils/Utils";
import { redirect } from "next/navigation";

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
  const _slug = decodeURIComponent(params.slug);

  const slug = "/category/" + _slug;

  const categoriesData = await fetchAllCategoriesData();
  const selectedCategoryData = findCategoryData(categoriesData, slug);
  if (!selectedCategoryData) redirect("/error");
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
}
