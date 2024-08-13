import Account from "@/components/Account/Index";
import QuotesHistory from "@/components/Account/QuotesHistory";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/Services/FooterApis";
import { getAllQuotes, getQuotes } from "@/Services/QuoteApis";
import { getRentalsTeamsBanner } from "@/Services/SectionsApis";

export default async function Page() {
  const [
    footerContent,
    contactData,
    socialLinks,
    navigationMenu,
    teamsBanner,
    quotesData,
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
      <QuotesHistory quotesData={quotesData || []} />
    </Account>
  );
}
