import Account from "@/components/Account/Index";
import MyAccount from "@/components/Account/MyAccount";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/Services/FooterApis";
import { getMyAccountPageContent } from "@/Services/MyAccountApis";
import { getRentalsTeamsBanner } from "@/Services/SectionsApis";

export default async function Page() {
  const [
    footerContent,
    contactData,
    socialLinks,
    navigationMenu,
    myAccountPageContent,
    teamsBanner
  ] = await Promise.all([
    getFooterData(),
    getContactData(),
    getSocialLinks(),
    getFooterNavigationMenu(),
    getMyAccountPageContent(),
    getRentalsTeamsBanner()
  ]);
  return (
    <Account banner={teamsBanner} footerData={{ footerContent, contactData, socialLinks, navigationMenu }} >
      <MyAccount myAccountPageContent={myAccountPageContent} />
    </Account>
  );
}
