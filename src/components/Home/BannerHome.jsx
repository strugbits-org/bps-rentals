"use client";
import React from 'react'
import { ImageWrapper } from '../Common/ImageWrapper';

const BannerHome = ({ content }) => {
  return (
    <section className="section-banner-our-team banner-home">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="container-banner">
              <div className="container-text white-1">
                <h3
                  className="fs-lg-90 fs-mobile-60 lh-100 fw-600 split-words"
                  data-aos="d:loop"
                >
                  {content && content.mainTitle}
                </h3>
              </div>
              <div
                className="container-img bg-img bg-black-1"
                data-parallax-top
                data-parallax-no-mobile
                data-translate-y="70vh"
              >
                <ImageWrapper url={content.backgroundImage} q="100" attributes={{ "data-aos": "fadeIn 1.2s ease-out-cubic 0s, d:loop" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BannerHome;