import CategoryPage from "@/components/Category/Index";
import { getHomePageContent } from "@/Services/HomeApis";
import { getMarketsData } from "@/Services/SectionsApis";

export default async function Page() {
  const [homePageContent, marketsData] = await Promise.all([
    getHomePageContent(),
    getMarketsData(),
  ]);
  return (
    <CategoryPage pageContent={homePageContent} marketsData={marketsData} />
  );
}
