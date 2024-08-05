import { generateImageURL } from '@/Utils/GenerateImageURL'
import React from 'react'
import { CustomButton } from '../Common/CustomButton'

export const Banner = ({ data }) => {
    return (
        <>
            {data.type === "1" ? (
                <section className="section-hot-trends white-1 hot-category my-lg-60 my-tablet-40 my-phone-25">
                    <div className="container-fluid">
                        <div className="row pt-lg-90 pb-lg-40 pt-tablet-65 pt-phone-190 pb-tablet-60 pb-phone-145">
                            <div className="col-lg-5 offset-lg-1 col-tablet-6 pos-relative z-2 column-text">
                                <span
                                    className="d-block fs--40 fs--mobile-25 fw-600"
                                    data-aos="fadeIn .6s ease-in-out 0s, d:loop"
                                >
                                    {data && data.tagline}
                                </span>
                                <h2
                                    className="fs--90 fs-tablet-40 fs-phone-60 lh-100 fw-600 pt-lg-35 pt-tablet-10 pt-phone-20 section-title split-words"
                                    data-aos="d:loop"
                                >
                                    {data && data.title}
                                </h2>
                            </div>
                            <div className="col-12">
                                <div className="container-img bg-img">
                                    <img
                                        src={generateImageURL({
                                            wix_url: data.backgroundImage,
                                            w: "1374",
                                            h: "547",
                                            fit: "fill",
                                            q: "95",
                                        })}
                                        className=" "
                                        data-parallax
                                        data-translate-x-from="10vw"
                                        data-translate-x-to="0"
                                    />
                                </div>
                            </div>
                            <div
                                className="col-lg-5 offset-lg-1 pos-relative z-2 column-btn"
                                data-aos="fadeIn .6s ease-in-out 0s, d:loop"
                            >
                                <CustomButton
                                    customClasses={"btn-blue mt-lg-50 mt-mobile-20"}
                                    data={{
                                        label: data.buttonLabel,
                                        action: data.buttonAction
                                    }}
                                    attributes={{
                                        "data-cursor-style": "off"
                                    }}
                                    showArrow={data.showArrow}
                                >
                                </CustomButton>
                            </div>
                        </div>
                    </div>
                </section >
            ) : data.type === "2" ? (
                <section className="section-banner-our-team my-lg-60 my-tablet-40 my-phone-25">
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
                                            showArrow={data.showArrow}
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
                                            showArrow={data.showArrow}
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
                                            data-aos="fadeIn 1.2s ease-out-cubic 0s, d:loop"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            ) : null}

        </>
    )
}
