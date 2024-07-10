import HomePage from "@/components/Home/Index";
import { getHomeHeaderData } from "@/Services/ScApiCalls";

export default async function Page() {
  const [homeHeaderData] = await Promise.all([getHomeHeaderData()]);
  console.log(homeHeaderData, "homeHeaderData>>");
  return <HomePage />;
}
