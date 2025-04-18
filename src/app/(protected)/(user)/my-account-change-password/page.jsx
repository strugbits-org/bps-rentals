import Account from "@/components/Account/Index";
import ChangePassword from "@/components/Account/ChangePassword";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/Services/FooterApis";
import { getChangePasswordPageContent } from "@/Services/MyAccountApis";
import { getPageMetaData, getNewArrivalSectionContent } from "@/Services/SectionsApis";
import logError from "@/Utils/ServerActions";

export async function generateMetadata() {
  try {
    const metaData = await getPageMetaData("my-account-change-password");
    const { title, noFollowTag } = metaData;

    const metadata = {
      title,
    };

    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION" && noFollowTag) {
      metadata.robots = "noindex,nofollow";
    }

    return metadata;
  } catch (error) {
    logError("Error in metadata(change password page):", error);
  }
}

export default async function Page() {
  try {
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
      getNewArrivalSectionContent("account")
    ]);
    return (
      <Account banner={teamsBanner} footerData={{ footerContent, contactData, socialLinks, navigationMenu }} >
        <ChangePassword changePasswordPageContent={changePasswordPageContent} />
      </Account>
    );
  } catch (error) {
    logError("Error fetching Change Password page data:", error);
  }
}

