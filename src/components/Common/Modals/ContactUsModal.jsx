"use client";
import React from "react";
import AnimateLink from "@/components/Common/AnimateLink";
import ContactForm from "@/components/Common/ContactForm";
import { ModalWrapper } from "./ModalWrapper/ModalWrapper";

const ContactUsModal = ({ contactUsContent, contactData, socialLinks }) => {
  return (
    <ModalWrapper name={"modal-contact"}>
      <ContactForm data={contactUsContent} />
      <div className="column-2">
        {contactUsContent && (
          <div className="container-info">
            <div className="container-tel">
              <AnimateLink
                target={"_blank"}
                to={"tel:" + contactUsContent.sfPhone}
              >
                <span>{contactUsContent.sfPhone}</span>
              </AnimateLink>
              <AnimateLink
                target={"_blank"}
                to={"tel:" + contactUsContent.lvPhone}
              >
                <span>{contactUsContent.lvPhone}</span>
              </AnimateLink>
            </div>
            <AnimateLink
              target={"_blank"}
              to={"mailto:" + contactUsContent.infoEmail}
            >
              <span>{contactUsContent.infoEmail}</span>
            </AnimateLink>
          </div>
        )}
        <ul className="list-social-media">
          {socialLinks.map((item, index) => (
            <li key={index}>
              <AnimateLink
                to={item.link}
                target="_blank"
                attributes={{
                  rel: "noopener noreferrer",
                }}
              >
                <i className={item.icon}></i>
              </AnimateLink>
            </li>
          ))}
        </ul>
        <ul className="list-address">
          {contactData.map((data, index) => {
            return (
              <li key={index}>
                <h3 className="city">{data.city}</h3>
                <address>
                  {data.address1} <br />
                  {data.address2} <br />
                  {data.address3}
                </address>
                <div className="phones">
                  <AnimateLink to={`tel:${data.phone1}`} target={"_blank"}>
                    <span>{data.phone1}</span>
                  </AnimateLink>
                  <AnimateLink to={`tel:${data.phone2}`} target={"_blank"}>
                    <span>{data.phone2}</span>
                  </AnimateLink>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </ModalWrapper>
  );
};

export default ContactUsModal;
