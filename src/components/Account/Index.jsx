"use client";

import { usePathname, useRouter } from "next/navigation";
import AnimateLink from "../Common/AnimateLink";
import { FooterAccount } from "./FooterAccount";
import { useCookies } from "react-cookie";
import useUserData from "@/Hooks/useUserData";
import { pageLoadStart } from "@/Utils/AnimationFunctions";
import { TeamsBannerAccount } from "./TeamsBannerAccount";

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

const accountSections = {
  "/my-account": "section-my-account",
  "/my-account-saved-products": "section-saved-products",
  "/my-account-quotes-history": "section-quotes-history",
  "/my-account-change-password": "section-change-password",
};

const Account = ({ children, footerData, banner }) => {
  const { firstName } = useUserData();
  const pathname = usePathname();
  const router = useRouter();
  const [cookies, removeCookie] = useCookies([
    "authToken",
    "userData",
    "userTokens",
  ]);

  const activeSection = accountSections[pathname] || "";

  const handleLogOut = () => {
    pageLoadStart();
    try {
      const loggedIn = cookies.authToken !== undefined;
      if (loggedIn) {
        removeCookie("authToken", { path: "/" });
        removeCookie("userData", { path: "/" });
        removeCookie("userTokens", { path: "/" });
        router.push("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
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
              <span
                onClick={handleLogOut}
                className="link-account cursor-pointer"
              >
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
            <TeamsBannerAccount data={banner} />
            <FooterAccount footerData={footerData} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Account;
