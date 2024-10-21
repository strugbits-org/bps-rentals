import { fetchAllCategoriesData } from "@/Services/ProductsApis";
import { getAllCategoriesPaths, getAllCategoriesPathsMultiple } from "@/Utils/Utils";

const BASE_URL = process.env.BASE_URL;

export default async function sitemap() {
  const categoriesData = await fetchAllCategoriesData();

  const paths = getAllCategoriesPathsMultiple(categoriesData);
  const pathsParent = getAllCategoriesPaths(categoriesData);

  const parentCategories = pathsParent.map((slug) => ({
    url: `${BASE_URL}/category/${slug}`,
    lastModified: new Date(),
  }));

  const categories = paths.map(({ slug, subCategory }) => ({
    url: `${BASE_URL}/category/${slug}/${subCategory}`,
    lastModified: new Date(),
  }));

  return [...parentCategories, ...categories];
}
