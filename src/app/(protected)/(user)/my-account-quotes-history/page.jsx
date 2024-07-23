import Account from "@/components/Account/Index";
import QuotesHistory from "@/components/Account/QuotesHistory";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/Services/FooterApis";

export default async function Page() {
  const [
    footerContent,
    contactData,
    socialLinks,
    navigationMenu,
  ] = await Promise.all([
    getFooterData(),
    getContactData(),
    getSocialLinks(),
    getFooterNavigationMenu(),

  ]);
  return (
    <Account footerData={{ footerContent, contactData, socialLinks, navigationMenu }} >
      <QuotesHistory />
    </Account>
  );
}
