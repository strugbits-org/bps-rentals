"use client";

import AnimateLink from "../Common/AnimateLink";

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

const Account = ({ children }) => {
  return (
    <section className="my-account-intro section-my-account">
      <div
        className="menu-my-account"
        data-sticky
        data-trigger="parent"
        data-sticky-no-mobile
        data-offset="#header"
      >
        <div className="container-my-account">
          <h2 className="fs--35 blue-1">
            Hello, <br className="no-tablet" />
            Gabriel
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
              <AnimateLink to="/" className="link-account">
                <i className="icon-logout"></i>
                <span>Log Out</span>
              </AnimateLink>
            </li>
          </ul>
        </div>
      </div>

      {children}
    </section>
  );
};
export default Account;
