import CategoryPage from "@/components/Category/Index";
import { getHomePageContent } from "@/Services/HomeApis";
import { fetchAllCategoriesData, fetchFilteredProducts, getSelectedColorsData } from "@/Services/ProductsApis";
import { getMarketsData } from "@/Services/SectionsApis";

export default async function Page({ params }) {
  const slug = params.id;
  const categoriesData = await fetchAllCategoriesData();
  const selectedCategoryData = categoriesData.find(x => x.parentCollection.slug === slug) || categoriesData.find((item) => item.level2Collections.some((x) => x.slug === slug))?.level2Collections.find((x) => x.slug === slug);
  const categoryId = selectedCategoryData?.parentCollection?._id || selectedCategoryData?._id || '00000000-000000-000000-000000000001';

  const [homePageContent, marketsData, colorsData, products] = await Promise.all([
    getHomePageContent(),
    getMarketsData(),
    getSelectedColorsData(categoryId),
    fetchFilteredProducts({ categories: [categoryId], pageSize: 18 }),
  ]);

  return (
    <CategoryPage
      pageContent={homePageContent}
      marketsData={marketsData}
      colorsData={colorsData}
      categoriesData={categoriesData}
      selectedCategoryData={selectedCategoryData}
      products={products}
    />
  );
}
