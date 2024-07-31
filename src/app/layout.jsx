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
import ContactFormModal from "@/components/Common/Modals/ContactFormModal";
import CartModal from "@/components/Common/Modals/CartModal";
import QuoteViewModal from "@/components/Common/Modals/QuoteViewModal";
import QuoteConfirmedModal from "@/components/Common/Modals/QuoteConfirmedModal";
import StudiosFixedMenu from "@/components/Common/StudiosFixedMenu";
import {
  getNavbarCategoriesData,
  getCreateAccountModalContent,
  getForgotPasswordModalContent,
  getLoginModalContent,
  getFilterLocations,
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
  getMarketsData,
  getSocialSectionBlogs,
  getSocialSectionDetails,
  getStudiosData,
} from "@/Services/SectionsApis";
import ContactUsModal from "@/components/Common/Modals/ContactUsModal";
import { SocialSection } from "@/components/Common/Sections/SocialSection";
import { getAuthToken } from "@/Services/GetAuthToken";

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
    marketsData,
    studiosData,
    allCategoriesData,
    socialSectionDetails,
    socialSectionBlogs,
    instaFeed,
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
    getMarketsData(),
    getStudiosData(),
    getNavbarCategoriesData(),
    getSocialSectionDetails(),
    getSocialSectionBlogs(),
    fetchInstaFeed(),
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
          <div className="external-triggers d-none">
            <span className="initScript d-none"></span>
            <span className="closeModals d-none"></span>
            <span className="initializeCanvas d-none"></span>
            <span className="home d-none"></span>
            <span className="updateWatched d-none"></span>
            <span className="galleryLightBox d-none"></span>
            <span className="collections d-none"></span>
            <span className="products d-none"></span>
            <span className="productsPost d-none"></span>
            <span className="cartPage d-none"></span>
            <span className="myAccount d-none"></span>
            <span className="savedProducts d-none"></span>
            <span className="quotesHistory d-none"></span>
            <span className="changePassword d-none"></span>
            <span className="galleryImages d-none"></span>
            <span className="addToCart d-none"></span>
            <span className="modalLoad d-none"></span>
            <span className="loadMore d-none"></span>
            <span className="updateWatchedTrigger d-none"></span>
            <span className="triggerSplitWordAnimation d-none"></span>
            <span className="stickyAnimationTrigger d-none"></span>
          </div>
          <Loader />
          <Navbar
            locations={filterLocations}
            loginModalContent={loginModalContent}
            createAccountModalContent={createAccountModalContent}
            forgotPasswordModalContent={forgotPasswordModalContent}
            marketsData={marketsData}
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
