"use client";

import { generateImageURL } from "@/Utils/GenerateImageURL";
import AnimateLink from "../AnimateLink";

const SearchModal = ({ marketsData }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted");
    // document.body.setAttribute("data-search-state", "success");
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
                      for="search"
                      className="split-chars"
                      data-aos="d:loop"
                    >
                      type here
                    </label>
                    <input
                      type="search"
                      className="search"
                      name="por"
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
                        All Studios
                      </h2>
                    </div>
                    <ul
                      className="list-result-all-studios grid-lg-16 grid-tablet-33 grid-phone-50"
                      data-aos
                    >
                      {[1, 2, 3, 4, 5, 6].map((index) => {
                        return (
                          <li key={index} className="grid-item">
                            <AnimateLink
                              to="/"
                              data-menu-close
                              className="link-studios" //we can add "disabled" className to disable the studio
                            >
                              <h3 className="title-all-studios">
                                <span>Event Design And Prodution</span>
                              </h3>
                            </AnimateLink>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="column-results">
                    <div className="result-rental">
                      <div className="container-title-results">
                        <h2 className="title-results split-chars" data-aos>
                          Rental <span>“Wedding”</span>
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
                          Portfolio <span>“Wedding”</span>
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
                        Our Markets
                      </h2>
                    </div>
                    <ul
                      className="list-result-our-markets list-projects font-35 grid-md-50"
                      data-aos
                    >
                      {marketsData &&
                        marketsData.map((data, index) => {
                          const { slug, cardname, marketTags, image } = data;

                          return (
                            <li key={index} className="grid-item">
                              <AnimateLink
                                key={index}
                                to={`/category/${slug}`}
                                className="market-link project-link"
                                data-cursor-style="view"
                                data-menu-close
                              >
                                <div
                                  className="container-img bg-blue"
                                  data-cursor-style="view"
                                >
                                  <img
                                    src={generateImageURL({
                                      wix_url: image,
                                      w: "203",
                                      h: "216",
                                      fit: "fill",
                                      q: "95",
                                    })}
                                    className=" "
                                  />
                                </div>
                                <div className="container-text">
                                  <h3 className="title-project split-words">
                                    {cardname}
                                  </h3>
                                </div>
                              </AnimateLink>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                  <div className="result-blog">
                    <div className="container-title-results">
                      <h2 className="title-results split-chars" data-aos>
                        Blog <span>“Wedding”</span>
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
                        Order pages <span>“Wedding”</span>
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
