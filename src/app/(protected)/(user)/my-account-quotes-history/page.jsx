import {
  getContactData,
  getFooterData,
  getFooterNavigationMenu,
  getSocialLinks,
} from "@/Services/FooterApis";
import Account from "@/components/Account/Index";
import QuotesHistory from "@/components/Account/QuotesHistory";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/Services/FooterApis";
import { getRentalsTeamsBanner } from "@/Services/SectionsApis";

import QuotesHistory from "@/components/Account/QuotesHistory";
import Account from "@/components/Account/Index";

export default async function Page() {
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
    getRentalsTeamsBanner()
  ]);
  return (
    <Account
      banner={teamsBanner}
      footerData={{ footerContent, contactData, socialLinks, navigationMenu }}
    >
      <QuotesHistory />
    </Account>
  );
}
