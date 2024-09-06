import React from 'react'
import { ImageWrapper } from '../Common/ImageWrapper'

export const MarketIntroSection = ({ data }) => {
  return (
    <section className="market-intro">
      <div
        className="container-fluid pos-relative z-5"
        data-parallax-top
        data-translate-y="20rem"
      >
        <div className="row">
          <div className="col-lg-6 offset-lg-3 column-1 white-1">
            <div className="container-text text-center">
              <h1
                className="fs--90 fs-mobile-60 split-chars"
                data-aos="d:loop"
              >
                {data.cardname && data.cardname}
              </h1>
              <p
                className="fs--40 fs-tablet-40 text text-center mt-lg-10 mt-lg-20 mt-tablet-35 mt-phone-10"
                data-aos="fadeInUp .8s ease-out-cubic .5s, d:loop"
              >
                {data.description && data.description}
              </p>
              <div
                className="container-arrow no-mobile"
                data-aos="fadeIn .6s ease-in-out .2s, d:loop"
              >
                <i className="icon-arrow-down-2"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container-img bg-blue-2"
        data-parallax-top
        data-translate-y="20rem"
        data-scale="1.2"
      >
        <ImageWrapper defaultDimensions={{ width: 1336, height: 1080 }} url={data?.image} q={"90"} attributes={{ "data?.image": "scaleOut 1.2s ease-out-cubic 0s, d:loop" }} />
      </div>
    </section>
  )
}
