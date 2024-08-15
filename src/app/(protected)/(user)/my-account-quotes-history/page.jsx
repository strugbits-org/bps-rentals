import {
  getContactData,
  getFooterData,
  getFooterNavigationMenu,
  getSocialLinks,
} from "@/Services/FooterApis";
import { getRentalsTeamsBanner } from "@/Services/SectionsApis";
import { getAllQuotes } from "@/Services/QuoteApis";

import QuotesHistory from "@/components/Account/QuotesHistory";
import Account from "@/components/Account/Index";

export default async function Page() {
  const [
    footerContent,
    contactData,
    socialLinks,
    navigationMenu,
    teamsBanner,
    allQuotes,
  ] = await Promise.all([
    getFooterData(),
    getContactData(),
    getSocialLinks(),
    getFooterNavigationMenu(),
    getRentalsTeamsBanner(),
    getAllQuotes(),
  ]);
  return (
    <Account
      banner={teamsBanner}
      footerData={{ footerContent, contactData, socialLinks, navigationMenu }}
    >
      <QuotesHistory quotesData={allQuotes || []} />
    </Account>
  );
}
