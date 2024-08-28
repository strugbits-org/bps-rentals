import Account from "@/components/Account/Index";
import MyAccount from "@/components/Account/MyAccount";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/Services/FooterApis";
import { getMyAccountPageContent } from "@/Services/MyAccountApis";
import { getPageMetaData, getRentalsTeamsBanner } from "@/Services/SectionsApis";

export async function generateMetadata() {
  try {
    const metaData = await getPageMetaData("my-account");
    const { title, noFollowTag } = metaData;

    const metadata = {
      title,
    };

    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION" && noFollowTag) {
      metadata.robots = "noindex,nofollow";
    }

    return metadata;
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
