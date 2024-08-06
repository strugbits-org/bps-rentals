import Account from "@/components/Account/Index";
import ChangePassword from "@/components/Account/ChangePassword";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/Services/FooterApis";
import { getChangePasswordPageContent } from "@/Services/MyAccountApis";
import { getRentalsTeamsBanner } from "@/Services/SectionsApis";

export default async function Page() {
  const [
    footerContent,
    contactData,
    socialLinks,
    navigationMenu,
    changePasswordPageContent,
    teamsBanner
  ] = await Promise.all([
    getFooterData(),
    getContactData(),
    getSocialLinks(),
    getFooterNavigationMenu(),
    getChangePasswordPageContent(),
    getRentalsTeamsBanner()
  ]);
  return (
    <Account banner={teamsBanner} footerData={{ footerContent, contactData, socialLinks, navigationMenu }} >
      <ChangePassword changePasswordPageContent={changePasswordPageContent} />
    </Account>
  );
}

