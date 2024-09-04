import Account from "@/components/Account/Index";
import { CategoriesListing } from "@/components/Admin/CategoriesListing";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/Services/FooterApis";
import { fetchAllCategoriesData } from "@/Services/ProductsApis";
import { getRentalsTeamsBanner } from "@/Services/SectionsApis";
import { getAllCategoriesWithChilds } from "@/Utils/Utils";

export const metadata = {
  title: "Admin",
  robots: "noindex,nofollow"
}

export default async function Page() {

  const [
    footerContent,
    contactData,
    socialLinks,
    navigationMenu,
    teamsBanner,
    categoriesData
  ] = await Promise.all([
    getFooterData(),
    getContactData(),
    getSocialLinks(),
    getFooterNavigationMenu(),
    getRentalsTeamsBanner(),
    fetchAllCategoriesData()
  ]);

  const categories = getAllCategoriesWithChilds(categoriesData);

  return (
    <Account banner={teamsBanner} footerData={{ footerContent, contactData, socialLinks, navigationMenu }} >
      <CategoriesListing data={categories} />
    </Account>
  );
}
