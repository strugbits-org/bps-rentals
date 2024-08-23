import {
  getContactData,
  getFooterData,
  getFooterNavigationMenu,
  getSocialLinks,
} from "@/Services/FooterApis";

import { getPageMetaData, getRentalsTeamsBanner } from "@/Services/SectionsApis";

import QuotesHistory from "@/components/Account/QuotesHistory";
import Account from "@/components/Account/Index";

export async function generateMetadata() {
  try {
    const metaData = await getPageMetaData("my-account-quotes-history");
    const { title, noFollowTag } = metaData;

    return {
      title: title,
      robots: process.env.NEXT_PUBLIC_ENVIRONMENT !== "PRODUCTION" && noFollowTag ? "noindex,nofollow" : null,
    }
  } catch (error) {
    console.log("Error:", error);
  }
}

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
