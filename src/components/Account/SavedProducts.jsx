"use client";

import { useEffect } from "react";
import { markPageLoaded } from "../../utils/AnimationFunctions";

const SavedProducts = () => {
  useEffect(() => {
    setTimeout(() => {
      markPageLoaded();
    }, 1000);
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-10 offset-lg-2 column-form">
          <div className="wrapper-account">
            <div className="wrapper-top">
              <h1 className="fs--60 blue-1 split-words" data-aos="d:loop">
                Saved Products
              </h1>
            </div>
            <div className="wrapper-bottom mt-lg-105 mt-tablet-35 mt-phone-25">
              <ul
                className="list-saved-products grid-lg-25 grid-tablet-33 grid-phone-50"
                data-aos="fadeIn .8s ease-in-out .4s, d:loop"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
                  return (
                    <li key={index} className="grid-item">
                      <div
                        className="product-link small saved-products active"
                        data-product-category
                        data-product-location
                        data-product-colors
                      >
                        <div className="container-tags">
                          <button className="btn-bookmark">
                            <i className="icon-bookmark"></i>
                            <i className="icon-bookmark-full"></i>
                          </button>
                        </div>
                        <a href="product.html" className="link">
                          <div className="container-top">
                            <h2 className="product-title">Bristol Chair</h2>
                          </div>
                          <div className="wrapper-product-img">
                            <div
                              className="container-img product-img"
                              data-get-product-link-color="green"
                              data-default-product-link-active
                            >
                              <img
                                src="/images/chairs/bristol-chair-color-1.webp"
                                className=" "
                              />
                            </div>
                            <div
                              className="container-img product-img"
                              data-get-product-link-color="white"
                            >
                              <img
                                src="/images/chairs/bristol-chair-color-2.webp"
                                className=" "
                              />
                            </div>
                            <div
                              className="container-img product-img"
                              data-get-product-link-color="blue"
                            >
                              <img
                                src="/images/chairs/bristol-chair-color-3.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </a>
                        <div className="container-color-options">
                          <ul className="list-color-options">
                            <li
                              className="list-item"
                              data-set-product-link-color="green"
                              data-default-product-link-active
                            >
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-1.webp"
                                  className=" "
                                />
                              </div>
                            </li>
                            <li
                              className="list-item"
                              data-set-product-link-color="white"
                            >
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-2.webp"
                                  className=" "
                                />
                              </div>
                            </li>
                            <li
                              className="list-item"
                              data-set-product-link-color="blue"
                            >
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-3.webp"
                                  className=" "
                                />
                              </div>
                            </li>
                          </ul>
                          <div className="colors-number">
                            <span>+3</span>
                          </div>
                        </div>
                        <btn-modal-open
                          group="modal-product"
                          class="modal-add-to-cart"
                        >
                          <span>Add to cart</span>
                          <i className="icon-cart"></i>
                        </btn-modal-open>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="flex-tablet-center mt-lg-60 mt-tablet-40 mt-phone-45">
                <button className="btn-2-blue">
                  <span>Load more</span>
                  <i className="icon-arrow-right-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-10 offset-lg-2">
          <section className="section-banner-our-team banner-account mt-lg-40 mt-mobile-10 mb-lg-10">
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
                        className="btn-contact btn-border-white no-mobile mt-60"
                        data-cursor-style="off"
                        data-aos="fadeIn .6s ease-in-out 0s, d:loop"
                      >
                        <span>Contact Us</span>
                      </btn-modal-open>
                      <btn-modal-open
                        group="modal-contact"
                        className="btn-contact btn-blue no-desktop mt-tablet-20 mt-phone-135"
                        data-aos="fadeIn .6s ease-in-out 0s, d:loop"
                      >
                        <span>Contact Us</span>
                        <i className="icon-arrow-right"></i>
                      </btn-modal-open>
                    </div>
                    <div className="container-img bg-img bg-black-1">
                      <img
                        src="/images/banner-our-team.jpg"
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
          <footer
            className="footer footer-account d-mobile-none"
            data-cursor-style="off"
          >
            <div className="col-lg-4 offset-lg-1">
              <div className="footer-logo-account">
                <div className="z-3">
                  <img
                    src="/images/logo/logo-bps-b.svg"
                    className="img-b z-3"
                  />
                </div>
                <div className="z-2">
                  <img
                    src="/images/logo/logo-bps-p.svg"
                    className="img-p z-2"
                  />
                </div>
                <div className="z-1">
                  <img
                    src="/images/logo/logo-bps-s.svg"
                    className="img-s z-1"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="wrapper-newsletter-menu">
                <div className="container-newsletter" data-form-container>
                  <div className="container-text">
                    <h3 className="fs-25 white-1">Newsletter:</h3>
                    <p className="fs--16 fs-phone-15 font-2 white-1 mt-5">
                      Register your email and stay up to date with everything
                      before anyone else.
                    </p>
                  </div>
                  <div className="container-newsletter mt-mobile-25">
                    <form className="form-newsletter">
                      <input
                        type="hidden"
                        name="assunto"
                        value="[newsletter]"
                      />
                      <div className="container-input">
                        <label for="newsletter-email">Enter your email</label>
                        <input
                          id="newsletter-email"
                          name="email"
                          type="email"
                          required
                        />
                      </div>
                      <div className="container-submit">
                        <button type="submit" className="bt-submit">
                          <span className="submit-text">Send</span>
                        </button>
                      </div>
                    </form>
                    <h3
                      className="feedback-newsletter white-1"
                      data-aos="fadeIn"
                      data-form-success
                    >
                      Success!
                    </h3>
                    <h3
                      className="feedback-newsletter white-1"
                      data-aos="fadeIn"
                      data-form-error
                    >
                      Error, Try again!
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 offset-lg-1 mt-lg-30">
              <h2 className="fs--30 fs-mobile-50 title-footer white-1">
                If it's not remarkable, it's invisible.
              </h2>
              <div className="container-menu">
                <div className="container-footer-menu">
                  <ul className="list-footer-menu">
                    <li className="list-item">
                      <button
                        data-set-submenu="services"
                        className="link-footer-menu"
                      >
                        <span>Services</span>
                      </button>
                    </li>
                    <li className="list-item">
                      <a href="index.html" className="link-footer-menu">
                        <span>Rental Store</span>
                      </a>
                    </li>
                    <li className="list-item">
                      <button
                        data-set-submenu="market"
                        className="link-footer-menu"
                      >
                        <span>Market</span>
                      </button>
                    </li>
                    <li className="list-item">
                      <a href="index.html" className="link-footer-menu">
                        <span>Portfolio</span>
                      </a>
                    </li>
                    <li className="list-item">
                      <a href="index.html" className="link-footer-menu">
                        <span>About</span>
                      </a>
                    </li>
                    <li className="list-item">
                      <a href="index.html" className="link-footer-menu">
                        <span>Blog</span>
                      </a>
                    </li>
                    <li className="list-item">
                      <btn-modal-open
                        className="link-footer-menu"
                        group="modal-contact"
                      >
                        <span>Contact</span>
                      </btn-modal-open>
                    </li>
                    <li className="list-item">
                      <a href="index.html" className="link-footer-menu">
                        <span>FAQ</span>
                      </a>
                    </li>
                    <li className="list-item">
                      <a href="terms-of-use.html" className="link-footer-menu">
                        <span>Terms of use</span>
                      </a>
                    </li>
                    <li className="list-item">
                      <a
                        href="privacy-policy.html"
                        className="link-footer-menu"
                      >
                        <span>Privacy policy</span>
                      </a>
                    </li>
                    <li className="list-item item-social-media">
                      <ul className="list-social-media">
                        <li>
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <i className="icon-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <i className="icon-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <i className="icon-x"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <i className="icon-linkedin"></i>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="container-address mt-lg-30">
                <ul className="list-address">
                  <li>
                    <h3 className="city">Napa Valley</h3>
                    <address>
                      955 Vintage Ave <br />
                      St. Helena, CA 94574
                    </address>
                    <div className="phones">
                      <a href="tel:">
                        <span>P / 707742.7777</span>
                      </a>
                      <a href="tel:">
                        <span>F / 415.822.8844</span>
                      </a>
                    </div>
                  </li>
                  <li>
                    <h3 className="city">Las Vegas</h3>
                    <address>
                      7900 W Sunset RD <br />
                      Suite 400 <br />
                      Las Vegas, NV 89113
                    </address>
                    <div className="phones">
                      <a href="tel:">
                        <span>P / 702.757.7987</span>
                      </a>
                    </div>
                  </li>
                  <li>
                    <h3 className="city">San Francisco</h3>
                    <address>
                      352 Shaw RD <br />
                      S. San Francisco, CA 94080
                    </address>
                    <div className="phones">
                      <a href="tel:">
                        <span>P / 415.922.9004</span>
                      </a>
                      <a href="tel:">
                        <span>F / 415.822.8844</span>
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row row-2 mt-lg-60 mt-mobile-45">
              <div className="col-lg-10 offset-lg-1">
                <div className="column-rights fs--14 font-2 white-1">
                  <span>© BLUEPRINT STUDIOS. ALL RIGHTS RESERVED.</span>
                  <span>
                    If it’s not remarkable, it’s invisible is a trademark of
                    blueprint studios.
                  </span>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default SavedProducts;
