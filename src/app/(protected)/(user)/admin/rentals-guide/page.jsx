import Account from "@/components/Account/Index";
import { InstructionsRentals } from "@/components/Admin/InstructionsRentals";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/Services/FooterApis";
import { fetchAllCategoriesCollections } from "@/Services/ProductsApis";
import { getRentalsTeamsBanner } from "@/Services/SectionsApis";
import logError from "@/Utils/ServerActions";

export const metadata = {
  title: "Instructions - Rentals",
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
      fetchAllCategoriesCollections(),
    ]);

    return (
      <Account banner={teamsBanner} footerData={{ footerContent, contactData, socialLinks, navigationMenu }} >
        <InstructionsRentals data={collectionsData} />
      </Account>
    );
  } catch (error) {
    logError("Error fetching product management page(categories listing) data:", error);
  }
}
