import Account from "@/components/Account/Index";
import { CategoriesListing } from "@/components/Admin/CategoriesListing";
import { getAdminPagesData } from "@/Services/AdminApis";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/Services/FooterApis";
import { fetchAllCategoriesCollections } from "@/Services/ProductsApis";
import { getRentalsTeamsBanner } from "@/Services/SectionsApis";
import logError from "@/Utils/ServerActions";

export const metadata = {
  title: "Admin | Manage Products | Categories",
  robots: "noindex,nofollow"
}

export default async function Page() {
  try {
    const [
      footerContent,
      contactData,
      socialLinks,
      navigationMenu,
      teamsBanner,
      collectionsData,
      adminPagesData
    ] = await Promise.all([
      getFooterData(),
      getContactData(),
      getSocialLinks(),
      getFooterNavigationMenu(),
      getRentalsTeamsBanner(),
      fetchAllCategoriesCollections(),
      getAdminPagesData()
    ]);

    const allProductsCard = {
      "name": "All Products",
      "mainMedia": adminPagesData.allCategoriesImage,
      "slug": "all",
      "all": true,
    }
    const categoriesData = [allProductsCard, ...collectionsData];

    return (
      <Account banner={teamsBanner} footerData={{ footerContent, contactData, socialLinks, navigationMenu }} >
        <CategoriesListing data={categoriesData} />
      </Account>
    );
  } catch (error) {
    logError("Error fetching product management page(categories listing) data:", error);
  }
}
