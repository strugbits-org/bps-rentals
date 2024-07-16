import CategoryPage from "@/components/Category/Index";
import { getHomePageContent } from "@/Services/HomeApis";
import { fetchProducts } from "@/Services/ProductsApis";
import { getMarketsData } from "@/Services/SectionsApis";

export default async function Page() {
  const [homePageContent, marketsData, products] = await Promise.all([
    getHomePageContent(),
    getMarketsData(),
    fetchProducts(),
  ]);
  console.log(products, "products>>");
  return (
    <CategoryPage
      pageContent={homePageContent}
      marketsData={marketsData}
      products={products}
    />
  );
}
