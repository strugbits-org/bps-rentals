"use client";

import { usePathname, useRouter } from "next/navigation";
import AnimateLink from "../Common/AnimateLink";
import { FooterAccount } from "./FooterAccount";
import { useCookies } from "react-cookie";
import useUserData from "@/Hooks/useUserData";
import { pageLoadStart } from "@/Utils/AnimationFunctions";
import { TeamsBannerAccount } from "./TeamsBannerAccount";
import logError from "@/Utils/ServerActions";
import mangeBlogIcon from "@/assets/menu-icons/blog.svg"
import mangeCacheIcon from "@/assets/menu-icons/cache.svg"
import mangeProductIcon from "@/assets/menu-icons/product.svg"
import mangeProjectsIcon from "@/assets/menu-icons/project.svg"
import mangeSortIcon from "@/assets/menu-icons/sort.svg"
import productSetIcon from "@/assets/menu-icons/product-set.svg"
import { PERMISSIONS } from "@/Utils/Schema/permissions";

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
  {
    name: "Manage Products",
    icon: mangeProductIcon,
    href: "https://illumeet.editorx.io/rentalx/account/manage-product",
    target: "_blank",
    adminAccess: "ADMIN_PANEL_ACCESS",
  },
  {
    name: "Manage Product Sets",
    icon: productSetIcon,
    href: "/admin/manage-product-sets",
    adminAccess: "MANAGE_PRODUCTS_SET",
  },
  {
    name: "Manage Blogs",
    icon: mangeBlogIcon,
    href: "https://illumeet.editorx.io/rentalx/account/reference-blogs",
    target: "_blank",
    adminAccess: "ADMIN_PANEL_ACCESS",
  },
  {
    name: "Manage Projects",
    icon: mangeProjectsIcon,
    href: "https://illumeet.editorx.io/rentalx/account/reference-projects",
    target: "_blank",
    adminAccess: "ADMIN_PANEL_ACCESS",
  },
  {
    name: "Manage Cache",
    icon: mangeCacheIcon,
    href: "https://illumeet.editorx.io/rentalx/account/manage-cache",
    target: "_blank",
    adminAccess: "ADMIN_PANEL_ACCESS",
  },
  {
    name: "Product Sorting by Category",
    icon: mangeSortIcon,
    href: "/admin/manage-products-sorting",
    adminAccess: "ADMIN_PANEL_ACCESS",
  }
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
  const { permissions } = useUserData();

  const [cookies, setCookie, removeCookie] = useCookies([
    "authToken",
    "userData",
    "userTokens",
    "cartQuantity",
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
        removeCookie("cartQuantity", { path: "/" });
        setTimeout(() => {
          router.push("/");
        }, 200);
      }
    } catch (error) {
      logError("Error:", error);
    }
  };
  return (
    <section className={`my-account-intro ${activeSection || "section-saved-products"}`}>
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
          <ul className="list-menu-my-account mt-lg-65 mt-tablet-30 min-h-45-vh">
            {links.map((data, index) => {
              const { name, href, icon, adminAccess, target } = data;
              const ADMIN_ACCESS = permissions && permissions.includes(PERMISSIONS[adminAccess]);
              if (!ADMIN_ACCESS && adminAccess) return;
              return (
                <li
                  key={index}
                  style={{ cursor: "pointer" }}
                  className="list-item"
                >
                  <AnimateLink key={index} to={href} target={target} className="link-account">
                    {!adminAccess ? (
                      <i className={icon}></i>
                    ) : (
                      <div className="svg-custom">
                        <img src={icon.src} alt="" />
                      </div>
                    )}
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
