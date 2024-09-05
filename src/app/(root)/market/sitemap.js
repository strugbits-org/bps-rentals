import { getMarketsData } from "@/Services/SectionsApis";

const BASE_URL = process.env.BASE_URL;

export default async function sitemap() {
  const marketsData = await getMarketsData();
  const paths = marketsData.map((data) => ({ slug: data.rentalsMarket.slug }));

  const markets = paths.map(({ slug }) => ({
    url: `${BASE_URL}/market/${slug}`,
    lastModified: new Date(),
  }));

  return [...markets];
}
