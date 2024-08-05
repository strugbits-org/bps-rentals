"use client";
import { useState } from "react";

import CreateAccount from "../Authentication/CreateAccount";
import ForgotPassword from "../Authentication/ForgotPassword";
import Login from "../Authentication/Login";

import LocationsFilter from "../Common/LocationsFilter";
import SearchModal from "../Common/Modals/SearchModal";
import MarketModal from "../Common/Modals/MarketModal";
import AllCategories from "../Category/AllCategories";
import ErrorModal from "../Common/Modals/ErrorModal";
import AnimateLink from "../Common/AnimateLink";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import { pageLoadStart } from "@/Utils/AnimationFunctions";

const Navbar = ({
  locations,
  loginModalContent,
  createAccountModalContent,
  forgotPasswordModalContent,
  marketsData,
  categoriesData,
}) => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [message, setMessage] = useState("Message");
  const [toggleModal, setToggleModal] = useState("");
  const [cookies, setCookie] = useCookies(["authToken"]);
  const router = useRouter();

  const checkUser = () => {
    const loggedIn = cookies.authToken;
    const submenuLogin = document.querySelector(".submenu-login");
    if (loggedIn) {
      pageLoadStart();
      router.push("/my-account");
    } else {
      submenuLogin.classList.toggle("active", !submenuLogin.classList.contains("active"));
    }
  };

  return (
    <>
      {errorMessageVisible && (
        <ErrorModal
          message={message}
          setErrorMessageVisible={setErrorMessageVisible}
        />
      )}
      <div className="cursor-wrapper" id="wrapper-cursor">
        <div>
          <span className="view text-wrapper">
            <span>view</span>
          </span>
        </div>
      </div>
      <header id="header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12 column-header" data-parent-submenu>
              <div className="wrapper-header-mobile no-desktop">
                <AnimateLink
                  to="/"
                  className="logo"
                  data-pjax
                  aria-label="Blueprint Rentals"
                  data-menu-close
                >
                  <span>Blueprint Rentals</span>
                  <i className="icon-logo"></i>
                </AnimateLink>
                <ul className="header-info-list no-desktop">
                  <LocationsFilter locations={locations} />
                  <li className="search-item no-mobile">
                    <button
                      className="link-search"
                      data-set-submenu="search"
                      data-search-remove
                    >
                      <i className="icon-search"></i>
                      <span className="hide">search</span>
                    </button>
                  </li>
                  <li className="login-item">
                    {/* {"login" === "login" ? (
                      <button
                        data-set-submenu="login"
                        className="new-login-button"
                      >
                        <i className="icon-user"></i>
                        <span className="hide">Login</span>
                      </button>
                    ) : (
                      )} */}
                    <button
                      data-set-submenu="login"
                      className="new-login-button"
                    >
                      <i className="icon-user"></i>
                      <span className="hide">Login</span>
                    </button>
                  </li>
                  <li className="cart-item">
                    <div className="cart-number">
                      <span>99+</span>
                    </div>
                    <AnimateLink
                      to="/cart"
                      className=""
                      data-menu-close
                      data-pg-active="pg-cart"
                    >
                      <i className="icon-cart"></i>
                      <span className="hide">My Cart</span>
                    </AnimateLink>
                  </li>{" "}
                </ul>
                <button
                  id="bt-menu"
                  aria-label="Menu"
                  data-search-remove
                >
                  svg
                  {/* <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 55 38.5"
                  style="enable-background:new 0 0 55 38.5;"
                  xml:space="preserve"
                >
                  <g id="bt-menu-bars">
                    <rect
                      id="bottombar"
                      y="32.5"
                      className="st0"
                      width="55"
                      height="6"
                    />
                    <rect
                      id="middlebar"
                      y="16.4"
                      className="st0"
                      width="55"
                      height="6"
                    />
                    <rect id="topbar" className="st0" width="55" height="6" />
                  </g>
                </svg> */}
                </button>
              </div>
              <nav className="menu" data-cursor-style="default">
                <div className="menu--wrapper">
                  <ul className="menu--list fs--header">
                    <li className="no-mobile">
                      <AnimateLink
                        to="/"
                        className="logo"
                        aria-label="Blueprint Rentals"
                      >
                        <span>Blueprint Rentals</span>
                        <i className="icon-logo"></i>
                      </AnimateLink>
                    </li>
                    <li className="no-desktop">
                      <AnimateLink
                        to="/"
                        className="header-link"
                        data-menu-close
                      >
                        <span data-letter="Home">Home</span>
                      </AnimateLink>
                    </li>
                    <li>
                      <button
                        className="header-link btn-submenu"
                        data-set-submenu="market"
                      >
                        <span data-letter="Market">Market</span>
                        <i className="icon-arrow-down"></i>
                      </button>
                    </li>
                    {categoriesData &&
                      categoriesData.slice(0, 6).map((data, index) => {
                        const { name } = data.categoryName;
                        const slug =
                          data.categoryName["link-copy-of-category-name-2"];
                        return (
                          <li key={index} className="no-mobile">
                            <AnimateLink
                              to={slug}
                              className="header-link"
                              data-menu-close
                            >
                              <span data-letter="New">{name}</span>
                            </AnimateLink>
                          </li>
                        );
                      })}

                    <li className="btn-submenu-categories">
                      <button
                        className="header-link btn-submenu"
                        data-set-submenu="all-categories"
                      >
                        <span data-letter="See All" className="no-mobile">
                          See All
                        </span>
                        <span data-letter="Products" className="no-desktop">
                          Products
                        </span>
                        <i className="icon-arrow-down"></i>
                      </button>
                    </li>
                    <li className="no-desktop">
                      <button className="header-link" data-set-submenu="login">
                        <span data-letter="Login">Login</span>
                      </button>
                    </li>
                    <li className="no-desktop cart-item">
                      <div className="cart-number">
                        <span>99+</span>
                      </div>
                      <AnimateLink
                        to="/cart"
                        className="header-link"
                        data-menu-close
                      >
                        <span data-letter="Your Cart">Your Cart</span>
                      </AnimateLink>
                    </li>
                    <li className="no-desktop item-bps-link">
                      <a href="" target="_blank" className="bps-link">
                        <span data-letter="Back to">Back to</span>
                        <i className="icon-bps-logo"></i>
                      </a>
                    </li>
                  </ul>
                  <ul className="header-info-list no-mobile">
                    <LocationsFilter locations={locations} />
                    <li className="search-item no-mobile">
                      <button
                        className="link-search"
                        data-set-submenu="search"
                        data-search-remove
                      >
                        <i className="icon-search"></i>
                        <span className="hide">search</span>
                      </button>
                    </li>
                    <li className="login-item">
                      {/* {"login" !== "login" ? (
                        <AnimateLink
                          to="/my-account"
                          className="new-login-button"
                        >
                          <i className="icon-user"></i>
                          <span className="hide">Login</span>
                        </AnimateLink>
                      ) : (
                        <button
                          data-set-submenu="login"
                          className="new-login-button"
                        >
                          <i className="icon-user"></i>
                          <span className="hide">Login</span>
                        </button>
                      )} */}
                      <button
                        onClick={checkUser}
                        className="new-login-button disable-click-outside"
                      >
                        <i className="icon-user"></i>
                        <span className="hide">Login</span>
                      </button>
                    </li>
                    <li className="cart-item">
                      <div className="cart-number">
                        <span>99+</span>
                      </div>
                      <AnimateLink
                        to="/cart"
                        className=""
                        data-menu-close
                        data-pg-active="pg-cart"
                      >
                        <i className="icon-cart"></i>
                        <span className="hide">My Cart</span>
                      </AnimateLink>
                    </li>{" "}
                  </ul>
                </div>
              </nav>
              <MarketModal marketsData={marketsData} />
              {/* All categories */}
              <AllCategories categoriesData={categoriesData} />
              {/* Search */}
              <SearchModal marketsData={marketsData} />
              {/* User Authentication */}
              <div
                className="submenu-login submenu"
                data-get-submenu="login"
                data-form-active={toggleModal}
              >
                <div
                  className="wrapper-submenu-login wrapper-submenu"
                  data-cursor-style="default"
                >
                  <div className="container-login">
                    <div className="container-btn-close">
                      <button className="btn-close-login close-to-login">
                        <i className="icon-arrow-left"></i>
                        <span className="hide">Close menu</span>
                      </button>
                      <button
                        className="btn-close-login close-submenu"
                        data-close-submenu
                      >
                        <i className="icon-arrow-left"></i>
                        <span className="hide">Close menu</span>
                      </button>
                    </div>
                    <div className="container-title mt-lg-35 mt-mobile-25">
                      <span className="text-login fs-lg-60 fs-mobile-40 fw-600">
                        Login
                      </span>
                      <span className="text-create-account fs-lg-60 fs-mobile-40 fw-600">
                        Create Account
                      </span>
                      <span className="text-forgot-password fs-lg-60 fs-mobile-40 fw-600">
                        Reset Password
                      </span>
                    </div>
                    <div className="wrapper-form mt-lg-65 mt-mobile-35">
                      <Login
                        loginModalContent={loginModalContent}
                        successMessageVisible={successMessageVisible}
                        setSuccessMessageVisible={setSuccessMessageVisible}
                        setErrorMessageVisible={setErrorMessageVisible}
                        setMessage={setMessage}
                        setToggleModal={setToggleModal}
                      />
                      <CreateAccount
                        createAccountModalContent={createAccountModalContent}
                        successMessageVisible={successMessageVisible}
                        setSuccessMessageVisible={setSuccessMessageVisible}
                        setErrorMessageVisible={setErrorMessageVisible}
                        setMessage={setMessage}
                      />
                      <ForgotPassword
                        forgotPasswordModalContent={forgotPasswordModalContent}
                        successMessageVisible={successMessageVisible}
                        setSuccessMessageVisible={setSuccessMessageVisible}
                        setErrorMessageVisible={setErrorMessageVisible}
                        setMessage={setMessage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Navbar;
