import Account from "@/components/Account/Index";
import { CategoriesListing } from "@/components/Admin/CategoriesListing";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/Services/FooterApis";
import { fetchAllCategoriesCollections } from "@/Services/ProductsApis";
import { getRentalsTeamsBanner } from "@/Services/SectionsApis";

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
        collectionsData
      ] = await Promise.all([
        getFooterData(),
        getContactData(),
        getSocialLinks(),
        getFooterNavigationMenu(),
        getRentalsTeamsBanner(),
        fetchAllCategoriesCollections()
      ]);
    
      return (
        <Account banner={teamsBanner} footerData={{ footerContent, contactData, socialLinks, navigationMenu }} >
          <CategoriesListing data={collectionsData} />
        </Account>
      );
  } catch (error) {
    logError("Error fetching product management page(categories listing) data:", error);
  }
}
