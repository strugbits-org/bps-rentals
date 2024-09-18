import {
  getContactData,
  getFooterData,
  getFooterNavigationMenu,
  getSocialLinks,
} from "@/Services/FooterApis";

import { getPageMetaData, getRentalsTeamsBanner } from "@/Services/SectionsApis";

import QuotesHistory from "@/components/Account/QuotesHistory";
import Account from "@/components/Account/Index";
import logError from "@/Utils/ServerActions";

export async function generateMetadata() {
  try {
    const metaData = await getPageMetaData("my-account-quotes-history");
    const { title, noFollowTag } = metaData;

    const metadata = {
      title,
    };

    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION" && noFollowTag) {
      metadata.robots = "noindex,nofollow";
    }

    return metadata;
  } catch (error) {
    logError("Error in metadata(Quotes History page):", error);
  }
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
  } catch (error) {
    logError("Error fetching Quotes History page data:", error);
  }
}
