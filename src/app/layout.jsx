import "./globals.css";
import Wrapper from "@/components/Layout/Wrapper";
import "../../public/assets/utils.css";
import "../../public/assets/app.css";
import "../../public/assets/custom.css";
import Loader from "@/components/Common/Loader";
import CustomScripts from "@/Services/CustomScripts";
import Footer from "@/components/Layout/Footer";
import CookiesConsent from "@/components/Common/CookiesConsent";
import Navbar from "@/components/Layout/Navbar";
import QuoteViewModal from "@/components/Common/Modals/QuoteViewModal";
import StudiosFixedMenu from "@/components/Common/StudiosFixedMenu";
import {
  getNavbarCategoriesData,
  getCreateAccountModalContent,
  getForgotPasswordModalContent,
  getLoginModalContent,
  getFilterLocations,
  getSearchSectionDetails,
} from "@/Services/NavbarApis";
import {
  getContactData,
  getContactUsContent,
  getFooterData,
  getFooterNavigationMenu,
  getSocialLinks,
} from "@/Services/FooterApis";
import {
  fetchInstaFeed,
  getBlogsData,
  getMarketsData,
  getPortfolioData,
  getSocialSectionBlogs,
  getSocialSectionDetails,
  getStudiosData,
} from "@/Services/SectionsApis";
import ContactUsModal from "@/components/Common/Modals/ContactUsModal";
import { SocialSection } from "@/components/Common/Sections/SocialSection";
import { ExternalTriggers } from "@/components/Common/ExternalTriggers";
import { getProductsByCategory } from "@/Services/ProductsApis";

export const metadata = {
  title: "BPS Rentals",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  const [
    filterLocations,
    loginModalContent,
    createAccountModalContent,
    forgotPasswordModalContent,
    footerData,
    contactData,
    socialLinks,
    navigationMenu,
    contactUsContent,
    productsData,
    blogsData,
    portfoliosData,
    marketsData,
    studiosData,
    allCategoriesData,
    socialSectionDetails,
    socialSectionBlogs,
    instaFeed,
    searchSectionDetails
  ] = await Promise.all([
    getFilterLocations(),
    getLoginModalContent(),
    getCreateAccountModalContent(),
    getForgotPasswordModalContent(),
    getFooterData(),
    getContactData(),
    getSocialLinks(),
    getFooterNavigationMenu(),
    getContactUsContent(),
    getProductsByCategory({}),
    getBlogsData(),
    getPortfolioData(),
    getMarketsData(),
    getStudiosData(),
    getNavbarCategoriesData(),
    getSocialSectionDetails(),
    getSocialSectionBlogs(),
    fetchInstaFeed(),
    getSearchSectionDetails()
  ]);

  return (
    <>
      <CustomScripts />
      <html lang="en">
        <body
          data-scroll-direction="initial"
          data-search-container
          data-load="first-loading"
          className="overflow-hidden"
        >
          <ExternalTriggers />
          <Loader />
          <Navbar
            locations={filterLocations}
            loginModalContent={loginModalContent}
            createAccountModalContent={createAccountModalContent}
            forgotPasswordModalContent={forgotPasswordModalContent}
            productsData={productsData}
            blogsData={blogsData}
            portfoliosData={portfoliosData}
            marketsData={marketsData}
            studiosData={studiosData}
            searchSectionDetails={searchSectionDetails}
            categoriesData={allCategoriesData}
          />
          <CookiesConsent />
          <Wrapper>
            <main>
              {children}
              <SocialSection
                data={socialSectionDetails}
                posts={socialSectionBlogs}
                insta_feed={instaFeed}
              />
            </main>
            <Footer
              menu={navigationMenu}
              footerData={footerData}
              contactData={contactData}
              socialLinks={socialLinks}
            />
          </Wrapper>
          <StudiosFixedMenu data={studiosData} />
          {/* <CartModal /> */}
          <ContactUsModal
            contactUsContent={contactUsContent}
            contactData={contactData}
            socialLinks={socialLinks}
          />
          {/* <ContactFormModal /> */}
          <QuoteViewModal />
          {/* <QuoteConfirmedModal /> */}
        </body>
      </html>
    </>
  );
}
