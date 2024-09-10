import React from 'react'
import AnimateLink from '../Common/AnimateLink';
import { ImageWrapper } from '../Common/ImageWrapper';

export const MarketSlider = ({ content, marketSliderData }) => {
    if (marketSliderData.length === 0) return;

    const handleNavigate = (path) => {
        // window.open(process.env.CORPORATE_URL + path, "_blank");
        window.location.href = process.env.CORPORATE_URL + path;
    }

    return (
        <section className="section-slider-banner">
            <div className="slider-banner" data-aos="d:loop">
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {marketSliderData?.map((data, index) => {
                            return (
                                <div key={index} className="swiper-slide">
                                    <AnimateLink>
                                        <div
                                            onClick={() => handleNavigate(`/project/${data?.portfolioRef?.slug}`)}
                                            className="container-img"
                                        >
                                            <ImageWrapper key={data?.portfolioRef?.coverImage?.imageInfo} defaultDimensions={{ width: 1920, height: 1180 }} url={data?.portfolioRef?.coverImage?.imageInfo} type="2" customClasses={"media"} attributes={{ "data-parallax": "", "data-scale-from": "1.3" }} />
                                        </div>
                                        <div className="container-project">
                                            <h4 className="project split-words">
                                                {data?.portfolioRef?.title}
                                            </h4>
                                            <ul className="list-tags">
                                                {data?.markets.map((data, index) => (
                                                    <li key={index}>
                                                        <span>{data?.cardname}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="container-title">
                                            <h3 className="title split-words">
                                                {content?.rentalsPortfolioSectionTitle} <br />
                                                {content?.portfolioSectionTitleLine2}
                                            </h3>

                                            <div className="container-btn-bottom">
                                                <div
                                                    className="btn-blue btn-bottom"
                                                    data-cursor-style="off"
                                                    onClick={() => handleNavigate("/portfolio")}
                                                >
                                                    <span>{content?.rentalsPortfolioSectionButtonText}</span>
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