import Account from "@/components/Account/Index";
import SavedProducts from "@/components/Account/SavedProducts";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/Services/FooterApis";
import { getAllProductVariants, getAllProductVariantsImages } from "@/Services/ProductsApis";
import { getPageMetaData, getRentalsTeamsBanner } from "@/Services/SectionsApis";

export async function generateMetadata() {
  try {
    const metaData = await getPageMetaData("my-account-saved-products");
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
    productsVariantImagesData,
    productsVariantsData,
  ] = await Promise.all([
    getFooterData(),
    getContactData(),
    getSocialLinks(),
    getFooterNavigationMenu(),
    getRentalsTeamsBanner(),
    getAllProductVariantsImages(),
    getAllProductVariants(),
  ]);

  return (
    <Account banner={teamsBanner} footerData={{ footerContent, contactData, socialLinks, navigationMenu }}>
      <SavedProducts productsVariantImagesData={productsVariantImagesData} productsVariantsData={productsVariantsData} />
    </Account>
  );
}

export const dynamic = 'force-static'