"use client";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import ForgotPassword from "../Authentication/ForgotPassword";
import CreateAccount from "../Authentication/CreateAccount";
import Login from "../Authentication/Login";

import { pageLoadEnd, pageLoadStart } from "@/Utils/AnimationFunctions";
import { usePathname, useRouter } from "next/navigation";
import LocationsFilter from "../Common/LocationsFilter";
import SearchModal from "../Common/Modals/SearchModal";
import MarketModal from "../Common/Modals/MarketModal";
import AllCategories from "../Category/AllCategories";
import Modal from "../Common/Modals/Modal";
import AnimateLink from "../Common/AnimateLink";
import { getProductsCart } from "@/Services/CartApis";
import { calculateTotalCartQuantity } from "@/Utils/Utils";

const Navbar = ({
  locations,
  loginModalContent,
  createAccountModalContent,
  forgotPasswordModalContent,
  marketsData,
  studiosData,
  categoriesData,
  searchSectionDetails,
  blogsData,
  portfoliosData,
  searchPagesData,
}) => {
  const [cookies, setCookie] = useCookies(["authToken", "cartQuantity"]);
  const router = useRouter();
  const path = usePathname();

  const [toggleModal, setToggleModal] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartQuantity, setCartQuantity] = useState();
  const [message, setMessage] = useState("Message");
  const [modalState, setModalState] = useState({
    success: false,
    error: false,
  });

  const checkUser = () => {
    const submenuLogin = document.querySelector(".submenu-login");
    if (loggedIn && loggedIn !== "undefined") {
      pageLoadStart();
      if (path === "/my-account") {
        setTimeout(() => {
          pageLoadEnd();
        }, 900);
        return;
      };
      setTimeout(() => {
        router.push("/my-account");
      }, 500);
    } else {
      if (path === "/my-account") return;
      const element = document.querySelector(".header-info-list li.local-item.active");
      if (element) element.querySelector(".custom-close").click();
      submenuLogin.classList.toggle(
        "active",
        !submenuLogin.classList.contains("active")
      );
    }
  };

  const getCartTotalQuantity = async () => {
    const response = await getProductsCart();
    const total = response ? calculateTotalCartQuantity(response) : "0";
    setCookie("cartQuantity", total, { path: "/"});
  };

  useEffect(() => {
    setLoggedIn(cookies.authToken && cookies.authToken !== "undefined");
    getCartTotalQuantity();
  }, [cookies]);

  useEffect(() => {
    const quantity =
      cookies?.cartQuantity !== undefined
        ? String(cookies.cartQuantity)
        : "0";

    setCartQuantity(quantity);
  }, [cookies]);

  return (
    <>
      {(modalState.error || modalState.success) && (
        <Modal
          message={message}
          setModalStatus={setModalState}
          modalStatus={modalState}
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
                      <span>{cartQuantity}</span>
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
                <button id="bt-menu" aria-label="Menu" data-search-remove>
                  <svg
                    version="1.1"
                    id="Layer_1"
                    x="0px"
                    y="0px"
                    viewBox="0 0 55 38.5"
                  >
                    <g id="bt-menu-bars" fill="#0F41FA">
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
                  </svg>
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
                    {!loggedIn && (
                      <li className="no-desktop">
                        <button className="header-link disable-click-outside"
                          onClick={checkUser}
                        >
                          <span data-letter="Login">Login</span>
                        </button>
                      </li>
                    )}
                    <li className="no-desktop cart-item">
                      <div className="cart-number">
                        <span>{cartQuantity}</span>
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
                      <AnimateLink to={"/"} className="bps-link">
                        <span data-letter="Back to">Back to</span>
                        <i className="icon-bps-logo"></i>
                      </AnimateLink>
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
                        <span>{cartQuantity}</span>
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
              <SearchModal
                blogs={blogsData}
                portfolios={portfoliosData}
                searchSectionDetails={searchSectionDetails}
                studiosData={studiosData}
                marketsData={marketsData}
                searchPagesData={searchPagesData}
              />
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
                        setMessage={setMessage}
                        setToggleModal={setToggleModal}
                        setModalState={setModalState}
                      />
                      <CreateAccount
                        createAccountModalContent={createAccountModalContent}
                        setMessage={setMessage}
                        setModalState={setModalState}
                      />
                      <ForgotPassword
                        forgotPasswordModalContent={forgotPasswordModalContent}
                        setMessage={setMessage}
                        setModalState={setModalState}
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
