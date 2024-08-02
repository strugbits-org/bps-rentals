import CategoryPage from "@/components/Category/Index";
import { getFilterLocations } from "@/Services/NavbarApis";
import { fetchAllCategoriesData, getAllColorsData, getAllProductVariants, getAllProductVariantsImages, getProductsByCategory } from "@/Services/ProductsApis";
import { getHomeSectionDetails, getMarketsData } from "@/Services/SectionsApis";
import { findCategoryData, getAllCategoriesPaths } from "@/Utils/Utils";

export const generateStaticParams = async () => {
  try {
    const categoriesData = await fetchAllCategoriesData();
    const slugs = getAllCategoriesPaths(categoriesData);
    const paths = slugs.map((slug) => ({ slug }));
    return paths;
  } catch (error) {
    console.log("Error:", error);
    return [];
  }
};


export default async function Page({ params }) {
  const slug = "/category/" + params.slug;
  const categoriesData = await fetchAllCategoriesData();
  const selectedCategoryData = findCategoryData(categoriesData, slug);
  const categoryId = selectedCategoryData?.parentCollection?._id || selectedCategoryData?._id || '00000000-000000-000000-000000000001';


  const [homePageContent, locations, marketsData, colorsData, productsData,] = await Promise.all([
    getHomeSectionDetails(),
    getFilterLocations(),
    getMarketsData(),
    getAllColorsData(),
    getProductsByCategory(categoryId),
  ]);
  // productsVariantImagesData, productsVariantsData
  // getAllProductVariantsImages(),
  // getAllProductVariants(),

  // console.log("fullProductsData", productsData[0]);
  // console.log("productsVariantImagesData", productsVariantImagesData[0]);
  // const fullProductsData = productsData.map((product) => {
  //   if (!product._id) return;
  //   const productId = product.product._id;
  //   product.productSnapshotData = productsVariantImagesData.find(x => x.productId === productId);
  //   product.productVariantsData = productsVariantImagesData.find(x => x.productId === productId);
  //   return product;
  // });
  // console.log("fullProductsData", fullProductsData[0]);

  // console.log("productsVariantImagesData", productsVariantImagesData.length);
  // console.log("productsData", productsData[0]);

  return (
    <CategoryPage
      pageContent={homePageContent}
      locations={locations}
      marketsData={marketsData}
      colorsData={colorsData}
      categoriesData={categoriesData}
      selectedCategoryData={selectedCategoryData}
      productsData={productsData}
    />
  );
}
