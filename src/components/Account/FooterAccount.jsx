import React from 'react'
import Newsletter from "../Common/NewsLetter";
import { CustomButton } from "../Common/CustomButton";
import AnimateLink from "../Common/AnimateLink";
import { ImageWrapper } from "../Common/ImageWrapper";

export const FooterAccount = ({ footerData }) => {
    const { footerContent, contactData, socialLinks, navigationMenu } = footerData;

    return (
        <footer className="footer footer-account d-mobile-none" data-cursor-style="off">
            <div className="col-lg-4 offset-lg-1">
                <div className="footer-logo-account">
                    <ImageWrapper url={footerContent.logo1} original={true} customClasses={"img-b z-3"} />
                    <ImageWrapper url={footerContent.logo2} original={true} customClasses={"img-p z-2"} />
                    <ImageWrapper url={footerContent.logo3} original={true} customClasses={"img-s z-1"} />
                </div>
            </div>
            <div className="col-lg-6">
                <div className="wrapper-newsletter-menu">
                    <Newsletter data={footerContent} />
                </div>
            </div>
            <div className="col-lg-4 offset-lg-1 mt-lg-30">
                <h2 className="fs--30 fs-mobile-50 title-footer white-1">
                    {footerContent && footerContent.heading}
                </h2>
                <div className="container-menu">
                    <div className="container-footer-menu">
                        <ul className="list-footer-menu">
                            {navigationMenu.map((item) => {
                                return (
                                    <li key={item._id} className="list-item">
                                        <CustomButton
                                            customClasses={"link-footer-menu"}
                                            data={{
                                                label: item.title,
                                                action: item.rentalsAction
                                            }}
                                            target={item.actionTargetRentals ? item.actionTargetRentals : "self"}
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
            </div>
            <div className="col-lg-6">
                <div className="container-address mt-lg-30">
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
            <div className="row row-2 mt-lg-60 mt-mobile-45">
                <div className="col-lg-10 offset-lg-1">
                    <div className="column-rights fs--14 font-2 white-1">
                        {footerContent && footerContent.copyright ? (
                            footerContent.copyright.split("-").map((x, index) => <span key={index}>{x}</span>)
                        ) : (
                            <span>{footerContent?.copyright}</span>
                        )}
                    </div>

                </div>
            </div>
        </footer>
    )
}
