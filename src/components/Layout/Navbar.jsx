import CreateAccount from "../Authentication/CreateAccount";
import ForgotPassword from "../Authentication/ForgotPassword";
import Login from "../Authentication/Login";
import AllCategories from "../Category/AllCategories";
import AnimateLink from "../Common/AnimateLink";
import SearchModal from "../Common/Modals/SearchModal";

const links = [
  "New",
  "Chairs",
  "Tables",
  "Sofas",
  "Benches",
  "Lighting",
  "F&B Rentals",
];
const Navbar = () => {
  return (
    <>
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
                  <li className="local-item accordion-item">
                    <div className="accordion-header">
                      <i className="icon-pin"></i>
                      <span>National</span>
                    </div>
                    <div className="accordion-content">
                      <ul>
                        {["San Francisco", "Las Vegas", "Nacional"].map(
                          (data, index) => {
                            return (
                              <li key={index}>
                                <AnimateLink to="/#">{data}</AnimateLink>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </div>
                  </li>
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
                    <button data-set-submenu="login">
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
                  href="javascript:void(0)"
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
                    {links.map((data, index) => {
                      return (
                        <li key={index} className="no-mobile">
                          <AnimateLink
                            to={`/category/${index}`}
                            className="header-link"
                            data-menu-close
                          >
                            <span data-letter="New">{data}</span>
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
                    <li className="local-item accordion-item">
                      <div className="accordion-header">
                        <i className="icon-pin"></i>
                        <span>National</span>
                      </div>
                      <div className="accordion-content">
                        <ul>
                          {["San Francisco", "Las Vegas", "Nacional"].map(
                            (data, index) => {
                              return (
                                <li key={index}>
                                  <AnimateLink to="/#">{data}</AnimateLink>
                                </li>
                              );
                            }
                          )}
                        </ul>
                      </div>
                    </li>
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
                      <button data-set-submenu="login">
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
              <div className="submenu-market submenu" data-get-submenu="market">
                <div className="wrapper-submenu-market wrapper-submenu">
                  <div className="container-title-mobile">
                    <h2 className="submenu-title">Markets</h2>
                    <button className="btn-go-back" data-submenu-close>
                      <i className="icon-arrow-left-3"></i>
                      <span>Go back</span>
                    </button>
                  </div>
                  <ul className="list-submenu-market list-submenu list-projects font-submenu">
                    {[1, 2, 3, 4].map((index) => {
                      return (
                        <li key={index} className="list-item">
                          <AnimateLink
                            to="/market"
                            className="market-link project-link"
                            data-cursor-style="view"
                          >
                            <div
                              className="container-img bg-blue"
                              data-cursor-style="view"
                            >
                              <img
                                src="/images/lib/06_desktop.jpg"
                                className=" "
                              />
                            </div>
                            <div className="container-text">
                              <h3 className="title-project split-words">
                                Corporate
                              </h3>
                              <ul className="list-tags">
                                <li>
                                  <span>Personal</span>
                                </li>
                                <li>
                                  <span>Wedding</span>
                                </li>
                                <li>
                                  <span>Milestone event</span>
                                </li>
                              </ul>
                            </div>
                          </AnimateLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>{" "}
              {/* All categories */}
              <AllCategories />
              {/* Search */}
              <SearchModal />
              {/* User Authentication */}
              <div
                className="submenu-login submenu"
                data-get-submenu="login"
                data-form-active=""
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
                        Reset password
                      </span>
                    </div>
                    <div className="wrapper-form mt-lg-65 mt-mobile-35">
                      <Login />
                      <CreateAccount />
                      <ForgotPassword />
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