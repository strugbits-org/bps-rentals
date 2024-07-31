import React from 'react'

export const BannerOurTeam = () => {
    return (
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
                                    class="btn-contact btn-border-white no-mobile mt-60"
                                    data-cursor-style="off"
                                    data-aos="fadeIn .6s ease-in-out 0s, d:loop"
                                >
                                    <span>Contact Us</span>
                                </btn-modal-open>
                                <btn-modal-open
                                    group="modal-contact"
                                    class="btn-contact btn-blue no-desktop mt-tablet-20 mt-phone-135"
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
    )
}
