import CategoryPage from "@/components/Category/Index";
import { getHomePageContent } from "@/Services/HomeApis";
import { getFilterLocations } from "@/Services/NavbarApis";
import { fetchAllCategoriesData, fetchFilteredProducts, getSelectedColorsData } from "@/Services/ProductsApis";
import { getMarketsData } from "@/Services/SectionsApis";
import { findCategoryData } from "@/Utils/Utils";

export default async function Page({ params }) {
  const slug = "/category/" + params.id;
  const categoriesData = await fetchAllCategoriesData();
  const selectedCategoryData = findCategoryData(categoriesData, slug);
  const categoryId = selectedCategoryData?.parentCollection?._id || selectedCategoryData?._id || '00000000-000000-000000-000000000001';

  const [homePageContent, locations, marketsData, colorsData, products] = await Promise.all([
    getHomePageContent(),
    getFilterLocations(),
    getMarketsData(),
    getSelectedColorsData(categoryId),
    fetchFilteredProducts({ categories: [categoryId], pageSize: 18 }),
  ]);

  return (
    <CategoryPage
      pageContent={homePageContent}
      locations={locations}
      marketsData={marketsData}
      colorsData={colorsData}
      categoriesData={categoriesData}
      selectedCategoryData={selectedCategoryData}
      products={products}
    />
  );
}
