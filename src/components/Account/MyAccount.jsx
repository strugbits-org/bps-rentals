"use client";
import { useEffect } from "react";
import { markPageLoaded } from "../../utils/AnimationFunctions";

const MyAccount = () => {
  useEffect(() => {
    console.log("my account page");
    // setTimeout(() => {
    markPageLoaded();
    // }, 1000);
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-10 offset-lg-2 column-form">
          <div className="wrapper-account">
            <div className="wrapper-top" data-aos="d:loop">
              <h1 className="fs--60 blue-1split-words" data-aos="d:loop">
                My Account
              </h1>
              <p
                className="font-2 fs--16 mt-10"
                data-aos="fadeIn .8s ease-in-out .4s, d:loop"
              >
                View and edit your personal info below.
              </p>
              <h2
                className="font-2 fs--16 text-uppercase mt-lg-55 mt-mobile-35 split-words"
                data-aos="d:loop"
              >
                Account
              </h2>
              <p
                className="font-2 fs--16 mt-10"
                data-aos="fadeIn .8s ease-in-out .4s, d:loop"
              >
                Update your personal information.
              </p>
            </div>
            <div
              className="wrapper-bottom"
              data-aos="fadeIn .8s ease-in-out .4s, d:loop"
            >
              <div className="container-text mb-md-60 mb-phone-35">
                <p className="font-2 fs--16">Login Email:</p>
                <span className="email">gabriel@petrikor.design</span>
                <p className="font-2 fs--16">
                  Your Login email can’t be changed
                </p>
              </div>
              <div className="container-account" data-form-container>
                <form
                  className="form-account form-my-account"
                  data-redirect="my-account.html"
                >
                  <input type="hidden" name="subject" value="[account]" />
                  <div className="container-input col-md-6">
                    <label for="account-first-name">First name</label>
                    <input
                      id="account-first-name"
                      name="first_name"
                      type="text"
                      placeholder="Name"
                      required
                    />
                  </div>
                  <div className="container-input col-md-6">
                    <label for="account-last-name">Last name</label>
                    <input
                      id="account-last-name"
                      name="last_name"
                      type="text"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                  <div className="container-input col-md-6">
                    <label for="account-email">E-mail</label>
                    <input
                      id="account-email"
                      name="email"
                      type="email"
                      placeholder="exemple@myemail.com"
                      required
                    />
                  </div>
                  <div className="container-input col-md-6">
                    <label for="account-phone">Phone Number</label>
                    <input
                      id="account-phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (415) 000-0000"
                      required
                    />
                  </div>
                  <div className="container-discard flex-mobile-center order-mobile-2 mt-mobile-15">
                    <a
                      href="my-account.html"
                      type=""
                      className="btn-1 btn-border-blue btn-small btn-discard mr-10"
                    >
                      <div className="split-chars">
                        <span>Discard</span>
                      </div>
                    </a>
                  </div>
                  <div className="container-submit flex-mobile-center order-mobile-1">
                    <button
                      type="submit"
                      className="bt-submit btn-2-blue w-lg-100"
                    >
                      <span> Update info </span>
                      <i className="icon-arrow-right-2"></i>
                    </button>
                  </div>
                </form>
                <h3 data-aos="fadeIn" data-form-error>
                  Error, Try again!
                </h3>
                <h3 data-aos="fadeIn" data-form-success>
                  Success!
                </h3>
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

export default MyAccount;
