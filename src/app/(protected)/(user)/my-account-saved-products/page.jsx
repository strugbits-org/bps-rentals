import Account from "@/components/Account/Index";
import SavedProducts from "@/components/Account/SavedProducts";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/Services/FooterApis";
import { getAllProductVariants, getAllProductVariantsImages } from "@/Services/ProductsApis";
import { getPageMetaData, getNewArrivalSectionContent } from "@/Services/SectionsApis";
import logError from "@/Utils/ServerActions";

export async function generateMetadata() {
  try {
    const metaData = await getPageMetaData("my-account-saved-products");
    const { title, noFollowTag } = metaData;

    const metadata = {
      title,
    };

    if (process.env.NEXT_PUBLIC_ENVIRONMENT === "PRODUCTION" && noFollowTag) {
      metadata.robots = "noindex,nofollow";
    }

    return metadata;
  } catch (error) {
    logError("Error in metadata(Saved Products page):", error);
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
      productsVariantImagesData,
      productsVariantsData,
    ] = await Promise.all([
      getFooterData(),
      getContactData(),
      getSocialLinks(),
      getFooterNavigationMenu(),
      getNewArrivalSectionContent("account"),
      getAllProductVariantsImages(),
      getAllProductVariants(),
    ]);

    return (
      <Account banner={teamsBanner} footerData={{ footerContent, contactData, socialLinks, navigationMenu }}>
        <SavedProducts productsVariantImagesData={productsVariantImagesData} productsVariantsData={productsVariantsData} />
      </Account>
    );
  } catch (error) {
    logError("Error fetching Saved Products page data:", error);
  }
}

export const dynamic = 'force-static'