import Account from "@/components/Account/Index";
import SavedProducts from "@/components/Account/SavedProducts";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/Services/FooterApis";
import {
  getSavedProductData,
} from "@/Services/ProductsApis";
import { getRentalsTeamsBanner } from "@/Services/SectionsApis";

export default async function Page() {
  const [
    footerContent,
    contactData,
    socialLinks,
    navigationMenu,
    savedProducts,
    teamsBanner
  ] = await Promise.all([
    getFooterData(),
    getContactData(),
    getSocialLinks(),
    getFooterNavigationMenu(),
    getSavedProductData(),
    getRentalsTeamsBanner()
  ]);

  return (
    <Account banner={teamsBanner}
      footerData={{ footerContent, contactData, socialLinks, navigationMenu }}
    >
      <SavedProducts savedProducts={savedProducts} />
    </Account>
  );
}
