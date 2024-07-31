"use client";
import { generateImageURL } from '@/Utils/GenerateImageURL';
import React from 'react'

const BannerHome = ({content}) => {
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
                  <img
                    src={generateImageURL({
                      wix_url: content.backgroundImage,
                      w: "1336",
                      h: "581",
                      fit: "fill",
                      q: "95",
                    })}
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
  )
}

export default BannerHome;