import CategoryPage from "@/components/Category/Index";
import { getRentalsBanners } from "@/Services/Index";
import { getFilterLocations } from "@/Services/NavbarApis";
import {
  fetchAllCategoriesData,
  getAllColorsData,
  getProductsByCategory,
} from "@/Services/ProductsApis";
import { getHomeSectionDetails, getMarketsData } from "@/Services/SectionsApis";
import { findCategoryData, getAllCategoriesPaths } from "@/Utils/Utils";

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
  const slug = "/category/" + params.slug;
  const categoriesData = await fetchAllCategoriesData();
  const selectedCategoryData = findCategoryData(categoriesData, slug);
  const categoryId =
    selectedCategoryData?.parentCollection?._id ||
    selectedCategoryData?._id ||
    "00000000-000000-000000-000000000001";

  const [
    homePageContent,
    bannersData,
    locations,
    marketsData,
    colorsData,
    productsData,
    ,] = await Promise.all([
      getHomeSectionDetails(),
      getRentalsBanners(),
      getFilterLocations(),
      getMarketsData(),
      getAllColorsData(),
      getProductsByCategory({ category: categoryId }),
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
      productsData={productsData}
    />
  );
}
