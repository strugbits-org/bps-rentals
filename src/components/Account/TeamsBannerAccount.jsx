import { generateImageURL } from '@/Utils/GenerateImageURL'
import React from 'react'
import { CustomButton } from '../Common/CustomButton'

export const TeamsBannerAccount = ({ data }) => {
    return (
        <section className="section-banner-our-team banner-account mt-lg-40 mt-mobile-10 mb-lg-10 ">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="container-banner">
                            <div className="container-text white-1">
                                <span
                                    className="d-block fs--40 fw-600 pb-20"
                                    data-aos="fadeIn .6s ease-in-out 0s, d:loop"
                                >
                                    {data && data.tagline}
                                </span>
                                <h3
                                    className="fs-lg-90 fs-mobile-60 lh-100 fw-600 split-words"
                                    data-aos="d:loop"
                                >
                                    {data && data.title}
                                </h3>
                                <CustomButton
                                    customClasses={"btn-contact btn-border-white no-mobile mt-60"}
                                    data={{
                                        label: data.buttonLabel,
                                        action: data.buttonAction
                                    }}
                                    attributes={{
                                        "data-cursor-style": "off",
                                        "data-aos": "fadeIn .6s ease-in-out 0s, d:loop"
                                    }}
                                    showArrow={false}
                                >
                                </CustomButton>
                                <CustomButton
                                    customClasses={"btn-contact btn-blue no-desktop mt-tablet-20 mt-phone-135"}
                                    data={{
                                        label: data.buttonLabel,
                                        action: data.buttonAction
                                    }}
                                    attributes={{
                                        "data-aos": "fadeIn .6s ease-in-out 0s, d:loop"
                                    }}
                                    showArrow={false}
                                >
                                </CustomButton>
                            </div>
                            <div className="container-img bg-img bg-black-1">
                                <img
                                    src={generateImageURL({
                                        wix_url: data.backgroundImage,
                                        w: "1374",
                                        h: "547",
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
