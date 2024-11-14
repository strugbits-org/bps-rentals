import "./globals.css";
import Wrapper from "@/components/Layout/Wrapper";
import "../../public/assets/utils.css";
import "../../public/assets/app.css";
import 'react-toastify/dist/ReactToastify.css';
import "../../public/assets/custom.css";
import Loader from "@/components/Common/Loader";
import CustomScripts from "@/Services/CustomScripts";
import Footer from "@/components/Layout/Footer";
import CookiesConsent from "@/components/Common/CookiesConsent";
import Navbar from "@/components/Layout/Navbar";
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
  fetchSearchPages,
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
import { SpeedInsights } from '@vercel/speed-insights/next';
import RevalidateButton from "@/components/Common/RevalidateButton";
import CustomBodyScripts from "@/Services/CustomBodyScripts";
import { ToastContainer } from 'react-toastify';
import { getChatConfiguration } from "@/Services/Index";
import Chat from "@/components/Common/Chat";

export const metadata = {
  title: "Rent Event Furnishings - Blueprint Studios",
  robots: process.env.NEXT_PUBLIC_ENVIRONMENT !== "PRODUCTION" ? "noindex,nofollow" : null,
};

export default async function RootLayout({ children }) {

  const BASE_URL = process.env.BASE_URL;

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
    blogsData,
    portfoliosData,
    marketsData,
    studiosData,
    allCategoriesData,
    socialSectionDetails,
    socialSectionBlogs,
    instaFeed,
    searchSectionDetails,
    searchPagesData,
    chatConfig
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
    getBlogsData(),
    getPortfolioData(),
    getMarketsData(),
    getStudiosData(),
    getNavbarCategoriesData(),
    getSocialSectionDetails(),
    getSocialSectionBlogs(),
    fetchInstaFeed(),
    getSearchSectionDetails(),
    fetchSearchPages(),
    getChatConfiguration(BASE_URL)
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
          <ToastContainer
            position="top-center"
            autoClose={1500}
            hideProgressBar
          />
          <Navbar
            locations={filterLocations}
            loginModalContent={loginModalContent}
            createAccountModalContent={createAccountModalContent}
            forgotPasswordModalContent={forgotPasswordModalContent}
            blogsData={blogsData}
            portfoliosData={portfoliosData}
            marketsData={marketsData}
            studiosData={studiosData}
            searchSectionDetails={searchSectionDetails}
            categoriesData={allCategoriesData}
            searchPagesData={searchPagesData}
          />
          <CookiesConsent />
          <RevalidateButton />
          <Chat config={chatConfig} />
          <SpeedInsights />
          <Wrapper>
            <main className={"min-h-100"}>
              {children}
            </main>
            <SocialSection
              data={socialSectionDetails}
              posts={socialSectionBlogs}
              insta_feed={instaFeed}
            />
            <Footer
              menu={navigationMenu}
              footerData={footerData}
              contactData={contactData}
              socialLinks={socialLinks}
            />
          </Wrapper>
          <StudiosFixedMenu data={studiosData} />
          <ContactUsModal
            contactUsContent={contactUsContent}
            contactData={contactData}
            socialLinks={socialLinks}
          />
          <CustomBodyScripts />
        </body>
      </html>
    </>
  );
}

const time = +process.env.NEXT_PUBLIC_REVALIDATE_TIME || 86400;
export const revalidate = time;