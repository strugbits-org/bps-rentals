import { fetchAllCategoriesData } from "@/Services/ProductsApis";
import { getAllCategoriesPaths } from "@/Utils/Utils";

const BASE_URL = process.env.BASE_URL;

export default async function sitemap() {
  const categoriesData = await fetchAllCategoriesData();
  const paths = getAllCategoriesPaths(categoriesData);

  const categories = paths.map((slug) => ({
    url: `${BASE_URL}/category/${slug}`,
    lastModified: new Date(),
  }));

  return [...categories];
}
