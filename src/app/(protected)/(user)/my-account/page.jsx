import Account from "@/components/Account/Index";
import MyAccount from "@/components/Account/MyAccount";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/Services/FooterApis";
import { getMyAccountPageContent } from "@/Services/MyAccountApis";
import { getNewArrivalSectionContent, getPageMetaData } from "@/Services/SectionsApis";
import logError from "@/Utils/ServerActions";

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
    logError("Error in metadata(Account page):", error);
  }
}

export default async function Page() {
  try {
    const [
      footerContent,
      contactData,
      socialLinks,
      navigationMenu,
      myAccountPageContent,
      banner
    ] = await Promise.all([
      getFooterData(),
      getContactData(),
      getSocialLinks(),
      getFooterNavigationMenu(),
      getMyAccountPageContent(),
      getNewArrivalSectionContent("account")
    ]);
    return (
      <Account banner={banner} footerData={{ footerContent, contactData, socialLinks, navigationMenu }} >
        <MyAccount myAccountPageContent={myAccountPageContent} />
      </Account>
    );
  } catch (error) {
    logError("Error fetching My Account page data:", error);
  }
}
