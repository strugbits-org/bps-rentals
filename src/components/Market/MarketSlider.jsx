import React from 'react'
import AnimateLink from '../Common/AnimateLink';
import { generateImageUrl2 } from '@/Utils/GenerateImageURL';
import { useRouter } from 'next/navigation';
import { pageLoadStart } from '@/Utils/AnimationFunctions';

export const MarketSlider = ({ content, marketSliderData }) => {
    const router = useRouter();
    if (marketSliderData.length === 0) return;

    const handleNavigate = (path) => {
        pageLoadStart();
        setTimeout(() => {
            router.push(process.env.CORPORATE_URL + path)
        }, 900);
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
                                            <img
                                                src={generateImageUrl2({ wix_url: data?.portfolioRef?.coverImage?.imageInfo, w: "1920", h: "1180", q: "95" })}
                                                className="media"
                                                data-parallax
                                                data-scale-from="1.3"
                                            />
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