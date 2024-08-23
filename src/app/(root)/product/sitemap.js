import { fetchAllProductsPaths } from "@/Services/ProductsApis";
const BASE_URL = process.env.BASE_URL;

export default async function sitemap() {
  const productsData = await fetchAllProductsPaths();

  const products = productsData.map(({ slug }) => ({
    url: `${BASE_URL}/product/${slug}`,
    lastModified: new Date(),
  }));

  return [...products];
}
