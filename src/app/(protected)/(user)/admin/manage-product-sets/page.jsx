import Account from "@/components/Account/Index";
import { ProductSets } from "@/components/Admin/ProductSets";
import { getAllProductsForSets } from "@/Services/AdminApis";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/Services/FooterApis";
import { getRentalsTeamsBanner } from "@/Services/SectionsApis";
import logError from "@/Utils/ServerActions";

export const metadata = {
  title: "Admin | Manage Product Sets",
  robots: "noindex,nofollow"
}

export default async function Page() {
  try {
    const [
      footerContent,
      contactData,
      socialLinks,
      navigationMenu,
      teamsBanner,
      productsData
    ] = await Promise.all([
      getFooterData(),
      getContactData(),
      getSocialLinks(),
      getFooterNavigationMenu(),
      getRentalsTeamsBanner(),
      getAllProductsForSets(),
    ]);

    const productSets = productsData.filter(product => product.productSets && product.productSets.length);

    return (
      <Account banner={teamsBanner} footerData={{ footerContent, contactData, socialLinks, navigationMenu }} >
        <ProductSets products={productsData} productSets={productSets} />
      </Account>
    );
  } catch (error) {
    logError("Error fetching product management page(Product Sets) data:", error);
  }
}
