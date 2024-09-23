import Account from "@/components/Account/Index";
import { ProductsListing } from "@/components/Admin/ProductsListing";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/Services/FooterApis";
import { fetchAllCategoriesData, getProductsByCategory } from "@/Services/ProductsApis";
import { getRentalsTeamsBanner } from "@/Services/SectionsApis";
import { extractCategoryIds, findCategoryData } from "@/Utils/Utils";

export const metadata = {
  title: "Admin | Manage Products | Products",
  robots: "noindex,nofollow"
}

export default async function Page({ params }) {
  try {

    const slug = "/category/" + decodeURIComponent(params.slug);

    const categoriesData = await fetchAllCategoriesData();

    const selectedCategoryData = findCategoryData(categoriesData, slug) || findCategoryData(categoriesData, "/category/" + params.slug);

    if (!selectedCategoryData) {
      throw new Error(`Category Data not found for slug: ${slug}`);
    }

    const categoryId = extractCategoryIds(selectedCategoryData)[0];

    const [
      footerContent,
      contactData,
      socialLinks,
      navigationMenu,
      teamsBanner,
      productsData
    ] = await Promise.all([
      getFooterData(),
      getContactData(),
      getSocialLinks(),
      getFooterNavigationMenu(),
      getRentalsTeamsBanner(),
      getProductsByCategory(categoryId),
    ]);

    return (
      <Account banner={teamsBanner} footerData={{ footerContent, contactData, socialLinks, navigationMenu }} >
        <ProductsListing data={productsData} slug={params.slug} />
      </Account>
    );
  } catch (error) {
    logError("Error fetching product management page(products listing) data:", error);
    notFound();
  }
}
export const dynamic = 'force-dynamic'