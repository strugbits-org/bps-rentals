"use client";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

import ForgotPassword from "../Authentication/ForgotPassword";
import CreateAccount from "../Authentication/CreateAccount";
import Login from "../Authentication/Login";
import Request3dForm from "../Authentication/Request3dForm";
import Request3dConfirmation from "../Authentication/Request3dConfirmation";

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
import logError from "@/Utils/ServerActions";
import { fetchBlogsDataClient, fetchPortfoliosDataClient } from "@/Services/LayoutDataFetcher";
import { AUTH_REQUIRED, clearAuthCookies } from "@/Utils/AuthSession";

const Navbar = ({
  locations,
  loginModalContent,
  createAccountModalContent,
  forgotPasswordModalContent,
  marketsData,
  studiosData,
  categoriesData,
  searchSectionDetails,
  searchPagesData,
}) => {

  const [cookies, setCookie, removeCookie] = useCookies(["authToken", "cartQuantity", "userData", "userTokens"]);
  const router = useRouter();
  const path = usePathname();

  const [toggleModal, setToggleModal] = useState("");
  const [requestProduct, setRequestProduct] = useState(null);
  const [pending3dRequest, setPending3dRequest] = useState(false);
  const suppressOutsideCloseUntil = useRef(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [cartQuantity, setCartQuantity] = useState();
  const [message, setMessage] = useState("Message");
  const [modalState, setModalState] = useState({
    success: false,
    error: false,
  });
  const [blogsData, setBlogsData] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(true);
  const [portfoliosData, setPortfoliosData] = useState([]);
  const [portfoliosLoading, setPortfoliosLoading] = useState(true);

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
      // Reset any leftover 3D-request view so the login form shows when opened here.
      setToggleModal("");
      setPending3dRequest(false);
      const element = document.querySelector(".header-info-list li.local-item.active");
      if (element) element.querySelector(".custom-close").click();
      submenuLogin.classList.toggle(
        "active",
        !submenuLogin.classList.contains("active")
      );
    }
  };

  const getCartTotalQuantity = async () => {
    try {
      const response = await getProductsCart();
      if (response === AUTH_REQUIRED) {
        clearAuthCookies(removeCookie, cookies.userData);
        setTimeout(() => {
          router.push("/");
        }, 500);
        return;
      }
      const total = response ? calculateTotalCartQuantity(response) : "0";
      if (total !== cookies.cartQuantity) {
        setCookie("cartQuantity", total, { path: "/" });
      }
    } catch (error) {
      logError("Failed to fetch cart data:", error);
    }
  };

  useEffect(() => {
    const authTokenValid = cookies.authToken && cookies.authToken !== "undefined";
    setLoggedIn(authTokenValid);
    if (authTokenValid) {
      getCartTotalQuantity();
    }
  }, [cookies.authToken]);

  useEffect(() => {
    const quantity = cookies?.cartQuantity !== undefined
      ? String(cookies.cartQuantity)
      : "0";
    
    setCartQuantity(quantity);
  }, [cookies.cartQuantity]);

  // Opened from the product page "Get 3D library access" badge. Guests see the
  // login view first (and continue to the form after login); logged-in users go
  // straight to the request form.
  useEffect(() => {
    const handleOpen3dRequest = (e) => {
      const detail = e?.detail || {};
      setRequestProduct(detail.product || null);
      const submenuLogin = document.querySelector(".submenu-login");
      if (submenuLogin) submenuLogin.classList.add("active");
      if (detail.isLoggedIn) {
        setToggleModal(detail.alreadyRequested ? "3d-confirmation" : "3d-request");
      } else {
        setPending3dRequest(true);
        setToggleModal("login");
      }
    };
    window.addEventListener("open-3d-request", handleOpen3dRequest);
    return () => window.removeEventListener("open-3d-request", handleOpen3dRequest);
  }, []);

  // The login submenu is opened manually (bypassing the submenu controller that
  // normally pauses the smooth-scroller). Without pausing it, normalizeScroll
  // swallows wheel/touch so NO view (login / create account / forgot / 3D) can
  // scroll. Mirror the controller: pause on open, resume on close, for every view.
  // The app pauses the scroller on the "modal:open" event and resumes on "modal:close".
  useEffect(() => {
    const submenuLogin = document.querySelector(".submenu-login");
    if (!submenuLogin) return;
    let wasActive = submenuLogin.classList.contains("active");
    const observer = new MutationObserver(() => {
      const isActive = submenuLogin.classList.contains("active");
      if (isActive === wasActive) return;
      wasActive = isActive;
      document.dispatchEvent(new CustomEvent(isActive ? "modal:open" : "modal:close"));
      // Clear any leftover request intent on close so a later normal login can't
      // briefly flash the 3D request form from a stale pending flag.
      if (!isActive) setPending3dRequest(false);
    });
    observer.observe(submenuLogin, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Block the legacy submenu click-outside controller from closing the panel
  // while login is in-flight (mouseup can land outside once the form swaps).
  useEffect(() => {
    const extendGracePeriod = () => {
      suppressOutsideCloseUntil.current = Date.now() + 800;
    };
    window.addEventListener("3d-request-view-open", extendGracePeriod);
    return () => window.removeEventListener("3d-request-view-open", extendGracePeriod);
  }, []);

  useEffect(() => {
    const is3dFlow =
      pending3dRequest ||
      toggleModal === "3d-request" ||
      toggleModal === "3d-confirmation";
    if (!is3dFlow) return;

    const blockGhostOutsideClick = (e) => {
      if (Date.now() >= suppressOutsideCloseUntil.current) return;
      if (e.target.closest(".wrapper-submenu-login")) return;
      e.stopImmediatePropagation();
    };

    document.addEventListener("click", blockGhostOutsideClick, true);
    return () => document.removeEventListener("click", blockGhostOutsideClick, true);
  }, [pending3dRequest, toggleModal]);

  // For the 3D request/confirmation views, handle click-outside / close-button
  // (the manual open bypasses the controller's own outside-click handling).
  useEffect(() => {
    const is3dView = toggleModal === "3d-request" || toggleModal === "3d-confirmation";
    if (!is3dView) return;

    const close = () => {
      const submenuLogin = document.querySelector(".submenu-login");
      if (submenuLogin) submenuLogin.classList.remove("active");
      setPending3dRequest(false);
      // Keep the 3D view rendered through the panel's slide-out so the login form
      // underneath doesn't flash into view; clear it once the panel is hidden.
      setTimeout(() => setToggleModal(""), 700);
    };

    const handleDocClick = (e) => {
      if (Date.now() < suppressOutsideCloseUntil.current) return;
      if (e.target.closest(".container-3d-access")) return; // the badge that opens it
      if (e.target.closest("[data-close-submenu]")) { close(); return; } // close / back button
      if (e.target.closest(".wrapper-submenu-login")) return; // click inside the panel
      close(); // click outside
    };

    const timer = setTimeout(() => document.addEventListener("click", handleDocClick), 300);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleDocClick);
    };
  }, [toggleModal]);

  // Fetch blogs data client-side
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setBlogsLoading(true);
        const data = await fetchBlogsDataClient();
        setBlogsData(data);
      } catch (error) {
        logError("Failed to fetch blogs data:", error);
        setBlogsData([]);
      } finally {
        setBlogsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Fetch portfolios data client-side
  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        setPortfoliosLoading(true);
        const data = await fetchPortfoliosDataClient();
        setPortfoliosData(data);
      } catch (error) {
        logError("Failed to fetch portfolios data:", error);
        setPortfoliosData([]);
      } finally {
        setPortfoliosLoading(false);
      }
    };

    fetchPortfolios();
  }, []);

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
                    <g id="bt-menu-bars" fill="var(--blue-1)">
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
                blogsLoading={blogsLoading}
                portfolios={portfoliosData}
                portfoliosLoading={portfoliosLoading}
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
                        pending3dRequest={pending3dRequest}
                        setPending3dRequest={setPending3dRequest}
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
                      <Request3dForm
                        selectedProduct={requestProduct}
                        setToggleModal={setToggleModal}
                        active={toggleModal === "3d-request"}
                      />
                      <Request3dConfirmation setToggleModal={setToggleModal} />
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
