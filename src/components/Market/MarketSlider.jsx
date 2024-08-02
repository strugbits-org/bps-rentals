import React from 'react'
import AnimateLink from '../Common/AnimateLink';

export const MarketSlider = () => {
    return (
        <section className="section-slider-banner">
            <div className="slider-banner" data-aos="d:loop">
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {[1, 2, 3].map((index) => {
                            return (
                                <div key={index} className="swiper-slide">
                                    <AnimateLink to="/">
                                        <div className="container-img">
                                            <img
                                                src="/images/market/google-workspace.webp"
                                                className=" "
                                                data-parallax
                                                data-scale-from="1.3"
                                            />
                                        </div>
                                        <div className="container-project">
                                            <h4 className="project split-words">
                                                Google Workspace
                                            </h4>
                                            <ul className="list-tags">
                                                <li>
                                                    <span>Personal</span>
                                                </li>
                                                <li>
                                                    <span>Wedding</span>
                                                </li>
                                                <li>
                                                    <span>Milestone event</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="container-title">
                                            <h3 className="title split-words">
                                                Every project is unique, <br />
                                                each event its own.
                                            </h3>
                                            <div className="container-btn-bottom">
                                                <div
                                                    className="btn-blue btn-bottom"
                                                    data-cursor-style="off"
                                                >
                                                    <span>We Create Dreams</span>
                                                    <i className="icon-arrow-right"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </AnimateLink>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="swiper-pagination"></div>
            </div>
        </section>
    )
}
