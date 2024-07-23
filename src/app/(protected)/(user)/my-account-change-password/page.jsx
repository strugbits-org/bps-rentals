import Account from "@/components/Account/Index";
import ChangePassword from "@/components/Account/ChangePassword";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/Services/FooterApis";
import { getChangePasswordPageContent } from "@/Services/MyAccountApis";

export default async function Page() {
  const [
    footerContent,
    contactData,
    socialLinks,
    navigationMenu,
    changePasswordPageContent
  ] = await Promise.all([
    getFooterData(),
    getContactData(),
    getSocialLinks(),
    getFooterNavigationMenu(),
    getChangePasswordPageContent(),
  ]);
  return (
    <Account footerData={{ footerContent, contactData, socialLinks, navigationMenu }} >
      <ChangePassword changePasswordPageContent={changePasswordPageContent} />
    </Account>
  );
}

