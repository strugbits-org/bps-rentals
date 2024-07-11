import HomePage from "@/components/Home/Index";
import { getHomeHeroSectionData } from "@/Services/ScApiCalls";

export default async function Page() {
  const [homeHeroSectionData] = await Promise.all([getHomeHeroSectionData()]);
  console.log(homeHeroSectionData, "homeHeroSectionData>>");
  return <HomePage />;
}
