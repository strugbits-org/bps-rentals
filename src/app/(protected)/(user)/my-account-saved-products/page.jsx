import Account from "@/components/Account/Index";
import SavedProducts from "@/components/Account/SavedProducts";
import { getContactData, getFooterData, getFooterNavigationMenu, getSocialLinks } from "@/Services/FooterApis";
import {
  getProductVariants,
  getProductVariantsImages,
  getSavedProductData,
} from "@/Services/ProductsApis";

export default async function Page() {
  const [
    footerContent,
    contactData,
    socialLinks,
    navigationMenu,
    savedProducts,
  ] = await Promise.all([
    getFooterData(),
    getContactData(),
    getSocialLinks(),
    getFooterNavigationMenu(),
    getSavedProductData(),
  ]);

  const productsData = await Promise.all(
    savedProducts.map(async (productData) => {
      const productId = productData.product._id;
      const [productVariantsImages, productVariantsData] = await Promise.all([
        getProductVariantsImages(productId),
        getProductVariants(productId),
      ]);
      productData.productVariantsImages = productVariantsImages;
      productData.productVariantsData = productVariantsData;
      return productData;
    })
  );

  return (
    <Account
      footerData={{ footerContent, contactData, socialLinks, navigationMenu }}
    >
      <SavedProducts savedProducts={savedProducts} />
    </Account>
  );
}
