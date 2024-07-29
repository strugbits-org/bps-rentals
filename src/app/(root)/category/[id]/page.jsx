import CategoryPage from "@/components/Category/Index";
import { getPageContentRentals } from "@/Services/HomeApis";
import { getFilterLocations } from "@/Services/NavbarApis";
import { fetchAllCategoriesData, fetchFilteredProducts, getSelectedColorsData } from "@/Services/ProductsApis";
import { getMarketsData } from "@/Services/SectionsApis";
import { findCategoryData } from "@/Utils/Utils";

export const generateStaticParams = async () => {
  try {
    const getSlug = (url) => {
      return "/" + url.match(/\/category\/(.+)/)[1];
    }
    const categoriesData = await fetchAllCategoriesData();
    const paths = categoriesData.map((data) => ({ slug: getSlug(data.parentCollection["link-copy-of-category-name-2"]) }));
    return paths;
  } catch (error) {
    console.log("Error:", error);
  }
}

export default async function Page({ params }) {
  const slug = "/category/" + params.id;
  const categoriesData = await fetchAllCategoriesData();
  const selectedCategoryData = findCategoryData(categoriesData, slug);
  const categoryId = selectedCategoryData?.parentCollection?._id || selectedCategoryData?._id || '00000000-000000-000000-000000000001';

  const [homePageContent, locations, marketsData, colorsData, products] = await Promise.all([
    getPageContentRentals(),
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
