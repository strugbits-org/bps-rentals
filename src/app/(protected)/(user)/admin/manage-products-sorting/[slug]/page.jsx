import Account from "@/components/Account/Index";
import { ProductsListing } from "@/components/Admin/ProductsListing";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/Services/FooterApis";
import { fetchAllCategoriesData, getAllProducts, getProductsByCategory } from "@/Services/ProductsApis";
import { getNewArrivalSectionContent } from "@/Services/SectionsApis";
import logError from "@/Utils/ServerActions";
import { extractCategoryIds, findCategoryData } from "@/Utils/Utils";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Admin | Manage Products | Sorting",
  robots: "noindex,nofollow"
}

export default async function Page({ params }) {
  try {

    const slug = "/category/" + decodeURIComponent(params.slug);

    const categoriesData = await fetchAllCategoriesData();

    const selectedCategoryData = findCategoryData(categoriesData, slug) || findCategoryData(categoriesData, "/category/" + params.slug);

    if (!selectedCategoryData && params.slug !== "all") {
      throw new Error(`Category Data not found for slug: ${slug}`);
    }

    let productsData;
    if (params.slug !== "all") {
      const categoryIds = extractCategoryIds(selectedCategoryData);
      productsData = await getProductsByCategory(categoryIds, true);
    } else {
      productsData = await getAllProducts({ adminPage: true });
    }

    const [
      footerContent,
      contactData,
      socialLinks,
      navigationMenu,
      teamsBanner
    ] = await Promise.all([
      getFooterData(),
      getContactData(),
      getSocialLinks(),
      getFooterNavigationMenu(),
      getNewArrivalSectionContent("account")
    ]);

    return (
      <Account banner={teamsBanner} footerData={{ footerContent, contactData, socialLinks, navigationMenu }} >
        <ProductsListing selectedCategoryData={selectedCategoryData} data={productsData} slug={params.slug} />
      </Account>
    );
  } catch (error) {
    logError("Error fetching product management page(products listing) data:", error);
    notFound();
  }
}
export const dynamic = 'force-dynamic'