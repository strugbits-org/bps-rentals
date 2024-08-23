import Account from "@/components/Account/Index";
import ChangePassword from "@/components/Account/ChangePassword";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/Services/FooterApis";
import { getChangePasswordPageContent } from "@/Services/MyAccountApis";
import { getPageMetaData, getRentalsTeamsBanner } from "@/Services/SectionsApis";

export async function generateMetadata() {
  try {
    const metaData = await getPageMetaData("my-account-change-password");
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
    changePasswordPageContent,
    teamsBanner
  ] = await Promise.all([
    getFooterData(),
    getContactData(),
    getSocialLinks(),
    getFooterNavigationMenu(),
    getChangePasswordPageContent(),
    getRentalsTeamsBanner()
  ]);
  return (
    <Account banner={teamsBanner} footerData={{ footerContent, contactData, socialLinks, navigationMenu }} >
      <ChangePassword changePasswordPageContent={changePasswordPageContent} />
    </Account>
  );
}

