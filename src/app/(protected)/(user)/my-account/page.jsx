import Account from "@/components/Account/Index";
import MyAccount from "@/components/Account/MyAccount";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/Services/FooterApis";
import { getMyAccountPageContent } from "@/Services/MyAccountApis";

export default async function Page() {
  const [
    footerContent,
    contactData,
    socialLinks,
    navigationMenu,
    myAccountPageContent
  ] = await Promise.all([
    getFooterData(),
    getContactData(),
    getSocialLinks(),
    getFooterNavigationMenu(),
    getMyAccountPageContent()
  ]);
  return (
    <Account footerData={{ footerContent, contactData, socialLinks, navigationMenu }} >
      <MyAccount myAccountPageContent={myAccountPageContent} />
    </Account>
  );
}
