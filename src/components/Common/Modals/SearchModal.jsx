"use client";

import { generateImageURL } from "@/Utils/GenerateImageURL";
import AnimateLink from "../AnimateLink";
import { useState } from "react";

const SearchModal = ({ searchSectionDetails, studiosData, marketsData }) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudios, setSelectedStudios] = useState([]);
  const [selectedMarkets, setSelectedMarkets] = useState([]);

  const [resultStudios, setResultStudios] = useState([]);
  const [resultMarkets, setResultMarkets] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted");
    // document.body.setAttribute("data-search-state", "success");
  };

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
  };
  const handleStudioFilter = (studio) => {
    if (selectedStudios.includes(studio)) {
      setSelectedStudios(selectedStudios.filter((el) => el !== studio));
    } else {
      setSelectedStudios([...selectedStudios, tag]);
    }
  };
  const handleMarketFilter = (market) => {
    if (selectedMarkets.includes(market)) {
      setSelectedMarkets(selectedMarkets.filter((el) => el !== market));
    } else {
      setSelectedMarkets([...selectedMarkets, market]);
    }
  };


  return (
    <section className="menu-search" data-get-submenu="search">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="wrapper-search">
              <div className="container-form">
                <form
                  className="form-search header-search"
                  data-search-form
                  onSubmit={handleSubmit}
                >
                  <div className="container-input input-header">
                    <label
                      htmlFor="search"
                      className="split-chars"
                      data-aos="d:loop"
                    >
                      type here
                    </label>
                    <input
                      type="search"
                      className="search"
                      name="por"
                      value={searchTerm}
                      onChange={handleInputChange}
                      required
                    />
                    <div className="container-submit">
                      <button
                        type="submit"
                        className="btn-submit"
                        data-cursor-style="white"
                        data-aos="fadeIn .6s ease-in-out-cubic 0s, d:loop"
                      >
                        <span className="no-mobile">Enter</span>
                        <i className="icon-search no-desktop"></i>
                        <i className="icon-arrow-right-2 no-mobile"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="container-results">
                <div className="inner-container-results">
                  <button className="btn-close-results" data-search-remove>
                    X
                  </button>
                  <div className="result-all-studios">
                    <div className="container-title-results">
                      <h2 className="title-results split-chars" data-aos>
                        {searchSectionDetails?.studiosTitle}
                      </h2>
                    </div>
                    <ul
                      className="list-result-all-studios grid-lg-16 grid-tablet-33 grid-phone-50"
                      data-aos
                    >
                      {studiosData?.map((item, index) => {
                        return (
                          <li key={index} className="grid-item">
                            <div onClick={() => { handleStudioFilter(item._id) }}
                              className={`link-studios ${selectedStudios.includes(item._id) ? "active" : ""} ${resultStudios.includes(item._id) ? "" : "disabled"}`}>
                              <h3 className="title-all-studios">
                                <span>{item.cardName}</span>
                              </h3>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="column-results">
                    <div className="result-rental">
                      <div className="container-title-results">
                        <h2 className="title-results split-chars" data-aos>
                          {searchSectionDetails?.rentalTitle} <span>{`"${searchTerm}"`}</span>
                        </h2>
                        <AnimateLink
                          to="/"
                          data-menu-close
                          className="btn-border-blue"
                          data-aos
                        >
                          <span>See more</span>
                          <i className="icon-arrow-right"></i>
                        </AnimateLink>
                      </div>
                      <div className="slider-content-phone">
                        <div className="swiper-container">
                          <div
                            className="swiper-wrapper list-result-rental list-slider-phone grid-md-33"
                            data-aos
                          >
                            {[1, 2, 3].map((index) => {
                              return (
                                <div
                                  key={index}
                                  className="swiper-slide grid-item"
                                >
                                  <div className="rental-product-link">
                                    <AnimateLink
                                      to="/"
                                      className="product-link"
                                      data-menu-close
                                    >
                                      <h3 className="product-name">
                                        Bristol Chair
                                      </h3>
                                      <div className="wrapper-img">
                                        <div className="container-img">
                                          <img
                                            src="/images/chairs/bristol-chair-color-1.webp"
                                            className=" "
                                          />
                                        </div>
                                      </div>
                                      <div className="container-bottom">
                                        <div className="view-more">
                                          <span className="view">
                                            <span>View more</span>
                                          </span>
                                          <i className="icon-arrow-diagonal-right"></i>
                                        </div>
                                        <ul className="list-thumb">
                                          <li>
                                            <div className="container-img">
                                              <img
                                                src="/images/chairs/bristol-chair-color-1.webp"
                                                className=" "
                                              />
                                            </div>
                                          </li>
                                          <li>
                                            <div className="container-img">
                                              <img
                                                src="/images/chairs/bristol-chair-color-2.webp"
                                                className=" "
                                              />
                                            </div>
                                          </li>
                                          <li>
                                            <div className="container-img">
                                              <img
                                                src="/images/chairs/bristol-chair-color-3.webp"
                                                className=" "
                                              />
                                            </div>
                                          </li>
                                          <li>
                                            <div className="container-img">
                                              <img
                                                src="/images/chairs/bristol-chair-color-4.webp"
                                                className=" "
                                              />
                                            </div>
                                          </li>
                                        </ul>
                                        <div className="colors-number">
                                          <span>+3</span>
                                        </div>
                                      </div>
                                    </AnimateLink>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="result-portfolio mt-lg-60 mt-mobile-40">
                      <div className="container-title-results">
                        <h2 className="title-results split-chars" data-aos>
                          {searchSectionDetails?.portfolioTitle} <span>{`"${searchTerm}"`}</span>
                        </h2>
                        <AnimateLink
                          to="/"
                          data-menu-close
                          className="btn-border-blue"
                          data-aos
                        >
                          <span>See more</span>
                          <i className="icon-arrow-right"></i>
                        </AnimateLink>
                      </div>
                      <div className="slider-content-phone">
                        <div className="swiper-container">
                          <div
                            className="swiper-wrapper list-result-portfolio list-slider-phone grid-md-20"
                            data-aos
                          >
                            {[1, 2, 3, 4, 5].map((index) => {
                              return (
                                <div
                                  key={index}
                                  className="swiper-slide grid-item"
                                >
                                  <AnimateLink
                                    to="/"
                                    className="link-portfolio "
                                    data-menu-close
                                  >
                                    <div
                                      className="container-img bg-blue"
                                      data-cursor-style="view"
                                    >
                                      <div className="wrapper-img">
                                        <img
                                          src="/images/lib/06_desktop.jpg"
                                          className=" "
                                        />
                                      </div>
                                    </div>
                                    <div className="container-text">
                                      <h2 className="title-portfolio">
                                        F1 Las Vegas Grand Prix
                                      </h2>
                                    </div>
                                  </AnimateLink>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="result-our-markets">
                    <div className="container-title-results">
                      <h2 className="title-results split-chars" data-aos>
                        {searchSectionDetails?.marketsTitle}
                      </h2>
                    </div>
                    <ul
                      className="list-result-our-markets list-projects font-35 grid-md-50"
                      data-aos
                    >
                      {marketsData.map((item, index) => {
                        return (
                          <li key={index} className={`grid-item ${selectedMarkets.includes(item._id) ? "active" : ""}`}>
                            <div
                              onClick={() => { handleMarketFilter(item._id) }}
                              className={`market-link project-link ${!resultMarkets.includes(item._id) ? "disabled" : ""}`}
                              data-cursor-style="default"
                              data-menu-close
                            >
                              <div
                                className="container-img bg-blue"
                                data-cursor-style="default"
                              >
                                {resultMarkets.includes(item._id) && (
                                  <img
                                    src={generateImageURL({ wix_url: item?.image, fit: "fit", w: "500", h: "500", q: "95" })}
                                    data-preload
                                    className="media"
                                    alt=""
                                  />
                                )}
                              </div>
                              <div className="container-text">
                                <h3 className="title-project split-words">
                                  {item.cardname}
                                </h3>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="result-blog">
                    <div className="container-title-results">
                      <h2 className="title-results split-chars" data-aos>
                        {searchSectionDetails?.blogTitle} <span>{`"${searchTerm}"`}</span>
                      </h2>
                      <AnimateLink
                        to="/"
                        data-menu-close
                        className="btn-border-blue"
                        data-aos
                      >
                        <span>See more</span>
                        <i className="icon-arrow-right"></i>
                      </AnimateLink>
                    </div>
                    <div className="slider-content-search-blog">
                      <div className="swiper-container">
                        <div
                          className="swiper-wrapper list-result-blog list-slider-mobile list-blog grid-lg-20"
                          data-aos
                        >
                          {[1, 2, 3, 4, 5].map((index) => {
                            return (
                              <div
                                key={index}
                                className="swiper-slide grid-item"
                              >
                                <AnimateLink
                                  to="/"
                                  className="link-blog "
                                  data-menu-close
                                >
                                  <div
                                    className="container-img bg-blue"
                                    data-cursor-style="view"
                                  >
                                    <div className="wrapper-img">
                                      <img
                                        src="/images/lib/08_desktop.jpg"
                                        className=" "
                                      />
                                    </div>
                                  </div>
                                  <div className="container-text">
                                    <div className="container-author-post-info">
                                      <div className="author">
                                        <span className="author-name">
                                          Lily Yeung
                                        </span>
                                      </div>
                                      <div className="date">
                                        <span>Sep 30</span>
                                      </div>
                                    </div>
                                    <h2 className="title-blog">
                                      A Taste Explosion: Event Design
                                      Extravaganza at Boa Restaurant
                                    </h2>
                                    <p className="text-blog">
                                      Beverly Hills, renowned for its luxury and
                                      panache, witnessed an unforgettable
                                      evening that melded culinary wonders with
                                      unmatched event Lorem ipsum dolor sit
                                      amet, consectetur adipiscing elit.
                                    </p>
                                  </div>
                                </AnimateLink>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="result-order-pages">
                    <div className="container-title-results">
                      <h2 className="title-results split-chars" data-aos>
                        {searchSectionDetails?.otherPagesTitle} <span>{`"${searchTerm}"`}</span>
                      </h2>
                    </div>
                    <ul
                      className="list-order-pages grid-lg-25 grid-md-50"
                      data-aos
                    >
                      {[1, 2, 3, 4, 5].map((index) => {
                        return (
                          <li key={index} className="grid-item">
                            <AnimateLink
                              key={index}
                              to="/"
                              data-menu-close
                              className="link-order-pages"
                            >
                              <h3 className="title-order-pages">About</h3>
                              <p className="text-order-pages">
                                In the heart of the great outdoors, with nature
                                as our backdrop, Blueprint Studios embarked on a
                                creative journey - a photoshoot
                              </p>
                            </AnimateLink>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchModal;
