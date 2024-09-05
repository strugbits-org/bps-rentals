"use client"
import AnimateLink from "../Common/AnimateLink";
import Newsletter from "../Common/NewsLetter";
import { CustomButton } from "../Common/CustomButton";
import { usePathname } from "next/navigation";
import { ImageWrapper } from "../Common/ImageWrapper";

const Footer = ({ menu, footerData, contactData, socialLinks }) => {
  const pathname = usePathname();

  const disabledPages = ["/my-account", "/my-account-saved-products", "/my-account-quotes-history", "/my-account-change-password"];

  return (
    <footer id="footer" className={`footer ${disabledPages.includes(pathname) ? "d-lg-none" : ""}`} data-cursor-style="off">
      <div className="container-fluid">
        <div className="row row-1">
          <div className="col-lg-7 column-1">
            <div className="container-logo">
              <div data-parallax data-end="bottom bottom" className="z-3">
                <ImageWrapper url={footerData.logo1} original={true} customClasses={"img-b z-3"} />
              </div>
              <div
                data-parallax
                data-translate-y-from="-15%"
                data-translate-x-from="10%"
                data-start="10% bottom"
                data-end="bottom center"
                className="z-2"
              >
                <ImageWrapper url={footerData.logo2} original={true} customClasses={"img-p z-2"} />
              </div>
              <div
                data-parallax
                data-translate-y-from="-30%"
                data-translate-x-from="30%"
                data-start="20% bottom"
                data-end="bottom center"
                className="z-1"
              >
                <ImageWrapper url={footerData.logo3} original={true} customClasses={"img-s z-1"} />
              </div>
            </div>
            <h2 className="fs--60 fs-mobile-50 title-footer white-1 mt-lg-170 mt-mobile-20">
              {footerData && footerData.heading}
            </h2>
          </div>
          <div className="col-lg-5 column-2 pt-lg-65 pt-mobile-50">
            <div className="wrapper-newsletter-menu">
              <Newsletter data={footerData} />
              <div className="container-footer-menu mt-lg-165 mt-tablet-55 mt-phone-125">
                <ul className="list-footer-menu">
                  {menu.map((item) => {
                    return (
                      <li key={item._id} className="list-item">
                        <CustomButton
                          customClasses={"link-footer-menu"}
                          data={{
                            label: item.title,
                            action: item.rentalsAction
                          }}
                        >
                        </CustomButton>
                      </li>
                    )
                  })}
                  <li className="list-item item-social-media">
                    <ul className="list-social-media">
                      {socialLinks.map((item, index) => (
                        <li key={index}>
                          <AnimateLink to={item.link} target="_blank"
                            attributes={{
                              "rel": "noopener noreferrer"
                            }}>
                            <i className={item.icon}></i>
                          </AnimateLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="container-address mt-lg-145 mt-phone-115">
              <ul className="list-address">
                {contactData.map((data, index) => {
                  return (

                    <li key={index}>
                      <h3 className="city">{data && data.city}</h3>
                      <address>
                        {data && data.address1} <br />
                        {data && data.address2} <br />
                        {data && data.address3}
                      </address>
                      <div className="phones">
                        <AnimateLink to={`tel:${data && data.phone1}`} target={"_blank"}>
                          <span>{data && data.phone1}</span>
                        </AnimateLink>
                        <AnimateLink to={`tel:${data && data.phone2}`} target={"_blank"}>
                          <span>{data && data.phone2}</span>
                        </AnimateLink>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="row row-2 mt-lg-80 mt-mobile-45">
          <div className="col-lg-12 column-1">
            <p className="fs--14 font-2 white-1">{footerData && footerData.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
