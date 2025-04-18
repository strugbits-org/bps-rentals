import Account from "@/components/Account/Index";
import { ProductSets } from "@/components/Admin/ProductSets";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/Services/FooterApis";
import { getNewArrivalSectionContent } from "@/Services/SectionsApis";
import logError from "@/Utils/ServerActions";

export const metadata = {
  title: "Admin | Manage Product Sets",
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
    ] = await Promise.all([
      getFooterData(),
      getContactData(),
      getSocialLinks(),
      getFooterNavigationMenu(),
      getNewArrivalSectionContent("account"),
    ]);

    return (
      <Account banner={teamsBanner} footerData={{ footerContent, contactData, socialLinks, navigationMenu }} >
        <ProductSets />
      </Account>
    );
  } catch (error) {
    logError("Error fetching product management page(Product Sets) data:", error);
  }
}

export const dynamic = 'force-static';