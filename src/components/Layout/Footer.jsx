import Addresses from "../Common/Addresses";
import AnimateLink from "../Common/AnimateLink";
import SocialLinks from "../Common/SocialLinks";

const Footer = () => {
  return (
    <footer id="footer" className="footer" data-cursor-style="off">
      <div className="container-fluid">
        <div className="row row-1">
          <div className="col-lg-7 column-1">
            <div className="container-logo">
              <div data-parallax data-end="bottom bottom" className="z-3">
                <img src="/images/logo/logo-bps-b.svg" className="img-b z-3" />
              </div>
              <div
                data-parallax
                data-translate-y-from="-15%"
                data-translate-x-from="10%"
                data-start="10% bottom"
                data-end="bottom center"
                className="z-2"
              >
                <img src="/images/logo/logo-bps-p.svg" className="img-p z-2" />
              </div>
              <div
                data-parallax
                data-translate-y-from="-30%"
                data-translate-x-from="30%"
                data-start="20% bottom"
                data-end="bottom center"
                className="z-1"
              >
                <img src="/images/logo/logo-bps-s.svg" className="img-s z-1" />
              </div>
            </div>
            <h2 className="fs--60 fs-mobile-50 title-footer white-1 mt-lg-170 mt-mobile-20">
              If it's not remarkable, it's invisible.
            </h2>
          </div>
          <div className="col-lg-5 column-2 pt-lg-65 pt-mobile-50">
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
                    <input type="hidden" name="assunto" value="[newsletter]" />
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
                  {[1, 2, 3, 4, 5].map((index) => {
                    return (
                      <li key={index} className="list-item">
                        <AnimateLink to="/" className="link-footer-menu">
                          <span>Store</span>
                        </AnimateLink>
                      </li>
                    );
                  })}
                  <li className="list-item">
                    <btn-modal-open
                      class="link-footer-menu"
                      group="modal-contact"
                    >
                      <span>Contact</span>
                    </btn-modal-open>
                  </li>
                  {[1, 2, 3].map((index) => {
                    return (
                      <li key={index} className="list-item">
                        <AnimateLink to="/" className="link-footer-menu">
                          <span>Rental</span>
                        </AnimateLink>
                      </li>
                    );
                  })}
                  <li className="list-item item-social-media">
                    <SocialLinks />
                  </li>
                </ul>
              </div>
            </div>
            <div className="container-address mt-lg-145 mt-phone-115">
              <Addresses />
            </div>
          </div>
        </div>
        <div className="row row-2 mt-lg-80 mt-mobile-45">
          <div className="col-lg-12 column-1">
            <p className="fs--14 font-2 white-1">
              © BLUEPRINT STUDIOS. ALL RIGHTS RESERVED. - If it’s not
              remarkable, it’s invisible is a trademark of blueprint studios.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
