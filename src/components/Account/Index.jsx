"use client";

import { usePathname, useRouter } from "next/navigation";
import AnimateLink from "../Common/AnimateLink";
import { FooterAccount } from "./FooterAccount";
import { useCookies } from "react-cookie";
import useUserData from "@/Hooks/useUserData";
import { pageLoadStart } from "@/Utils/AnimationFunctions";

const links = [
  { name: "My Account", icon: "icon-account", href: "/my-account" },
  {
    name: "Saved Products",
    icon: "icon-saved",
    href: "/my-account-saved-products",
  },
  {
    name: "Quotes History",
    icon: "icon-history",
    href: "/my-account-quotes-history",
  },
  {
    name: "Change Password",
    icon: "icon-change",
    href: "/my-account-change-password",
  },
];
const Account = ({ children, footerData }) => {

  const pathname = usePathname();
  const accountSections = {
    '/my-account': 'section-my-account',
    '/my-account-saved-products': 'section-saved-products',
    '/my-account-quotes-history': 'section-quotes-history',
    '/my-account-change-password': 'section-change-password',
  };
  const activeSection = accountSections[pathname] || '';
  const { firstName } = useUserData();

  const [cookies, setCookie, removeCookie] = useCookies([
    "authToken",
    "userData",
  ]);
const router = useRouter()
  const handleLogOut = () => {
    pageLoadStart();
    try {
      const loggedIn = cookies.authToken !== undefined;
      if (loggedIn) {
        removeCookie("authToken", { path: "/" });
        removeCookie("userData", { path: "/" });
        router.push('/')
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <>
      <section className={`my-account-intro ${activeSection}`}>
        <div
          className="menu-my-account"
          data-sticky
          data-trigger="parent"
          data-sticky-no-mobile
          data-offset="#header"
        >
          <div className="container-my-account">
            <h2 className="fs--35 blue-1">
              Hello, <br className="no-tablet" /> {firstName}
            </h2>
            <ul className="list-menu-my-account mt-lg-65 mt-tablet-30">
              {links.map((data, index) => {
                const { name, href, icon } = data;
                return (
                  <li
                    key={index}
                    style={{ cursor: "pointer" }}
                    className="list-item"
                  >
                    <AnimateLink key={index} to={href} className="link-account">
                      <i className={icon}></i>
                      <span>{name}</span>
                    </AnimateLink>
                  </li>
                );
              })}
              <li className="list-item">
                <span onClick={handleLogOut} className="link-account">
                  <i className="icon-logout"></i>
                  <span>Log Out</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 offset-lg-2 column-form">{children}</div>
            <div className="col-lg-10 offset-lg-2">
              <section className="section-banner-our-team  banner-account mt-lg-40 mt-mobile-10 mb-lg-10 ">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-12">
                      <div className="container-banner">
                        <div className="container-text white-1">
                          <span
                            className="d-block fs--40 fw-600 pb-20"
                            data-aos="fadeIn .6s ease-in-out 0s, d:loop"
                          >
                            Looking for a partner?
                          </span>
                          <h3
                            className="fs-lg-90 fs-mobile-60 lh-100 fw-600 split-words"
                            data-aos="d:loop"
                          >
                            Learn what our team can do for your brand
                          </h3>
                          <btn-modal-open
                            group="modal-contact"
                            class="btn-contact btn-border-white no-mobile mt-60"
                            data-cursor-style="off"
                            data-aos="fadeIn .6s ease-in-out 0s, d:loop"
                          >
                            <span>Contact Us</span>
                          </btn-modal-open>
                          <btn-modal-open
                            group="modal-contact"
                            class="btn-contact btn-blue no-desktop mt-tablet-20 mt-phone-135"
                            data-aos="fadeIn .6s ease-in-out 0s, d:loop"
                          >
                            <span>Contact Us</span>
                            <i className="icon-arrow-right"></i>
                          </btn-modal-open>
                        </div>
                        <div className="container-img bg-img bg-black-1">
                          <img
                            src="images/banner-our-team.jpg"
                            className=" "
                            data-aos="fadeIn
                        1.2s ease-out-cubic 0s, d:loop"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <FooterAccount footerData={footerData} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Account;
