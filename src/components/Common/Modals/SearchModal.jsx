"use client";

import { generateImageURL, generateImageUrl2, productImageURL } from "@/Utils/GenerateImageURL";
import AnimateLink from "../AnimateLink";
import React, { useEffect, useState } from "react";
import { filterSearchData, formatDate } from "@/Utils/Utils";
import { useCookies } from "react-cookie";
import { searchProducts } from "@/Services/ProductsApis";
import debounce from 'lodash/debounce';
import { updatedWatched } from "@/Utils/AnimationFunctions";

const SearchModal = ({ searchSectionDetails, studiosData, marketsData, blogs, portfolios, products = [], searchPagesData }) => {

  const CORPORATE_URL = process.env.CORPORATE_URL;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchActive, setSearchActive] = useState(false);

  const [selectedStudios, setSelectedStudios] = useState([]);
  const [selectedMarkets, setSelectedMarkets] = useState([]);

  const [resultStudios, setResultStudios] = useState([]);
  const [resultMarkets, setResultMarkets] = useState([]);

  const [BlogsResult, setBlogsResult] = useState([]);
  const [portfoliosResult, setPortfoliosResult] = useState([]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [filteredPortfolios, setFilteredPortfolios] = useState([]);
  const [filteredPages, setFilteredPages] = useState([]);
  const [cookies, setCookie] = useCookies(["location"]);

  const handleSearchFilter = (value) => {
    const term = value !== undefined ? value : searchTerm;
    const filteredPagesData = searchPagesData.filter(page => {
      const matchedTerm = term === "" || (page.content && page.content.toLowerCase().includes(term));
      return matchedTerm;
    });
    setFilteredPages(filteredPagesData);

    const filteredPortfoliosData = portfolios.filter(portfolio => {
      const matchedTerm = term === "" || (portfolio.titleAndDescription && portfolio.titleAndDescription.toLowerCase().includes(term));
      return matchedTerm;
    });
    setPortfoliosResult(filteredPortfoliosData);

    const filteredBlogsData = blogs.filter(blog => {
      const matchedTerm = term === "" || (blog.titleAndDescription && blog.titleAndDescription.toLowerCase().includes(term));
      return matchedTerm;
    });
    setBlogsResult(filteredBlogsData);
  }

  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSelectedStudios([]);
    setSelectedMarkets([]);
    setSearchTerm(value);
    handleSearchFilter(value);
  };
  const handleStudioFilter = (studio) => {
    if (selectedStudios.includes(studio)) {
      setSelectedStudios(selectedStudios.filter((el) => el !== studio));
    } else {
      setSelectedStudios([...selectedStudios, studio]);
    }
  };
  const handleMarketFilter = (market) => {
    if (selectedMarkets.includes(market)) {
      setSelectedMarkets(selectedMarkets.filter((el) => el !== market));
    } else {
      setSelectedMarkets([...selectedMarkets, market]);
    }
  };

  useEffect(() => {
    const filteredPortfolioItems = filterSearchData(portfoliosResult, selectedStudios, selectedMarkets);
    const filteredBlogItems = filterSearchData(BlogsResult, selectedStudios, selectedMarkets);
    setFilteredPortfolios(filteredPortfolioItems.slice(0, 5))
    setFilteredBlogs(filteredBlogItems.slice(0, 5))
  }, [selectedStudios, selectedMarkets])

  useEffect(() => {
    const portfolioStudios = portfoliosResult.flatMap(item => item.studios.map(studio => studio._id));
    const blogStudios = BlogsResult.flatMap(item => item.studios.map(studio => studio._id));
    const portfolioMarkets = portfoliosResult.flatMap(item => item.markets.map(market => market._id));
    const blogMarkets = BlogsResult.flatMap(item => item.markets.map(market => market._id));

    setResultStudios([...new Set([...portfolioStudios, ...blogStudios])]);
    setResultMarkets([...new Set([...portfolioMarkets, ...blogMarkets])]);

    setFilteredPortfolios(portfoliosResult.slice(0, 5));
    setFilteredBlogs(BlogsResult.slice(0, 5));
  }, [BlogsResult, portfoliosResult]);

  const handleProductsFilter = async (term = "") => {
    const filteredProductsData = await searchProducts(term, cookies.location);
    setFilteredProducts(filteredProductsData);
    updatedWatched();
  }

  useEffect(() => {
    if (searchActive) {
      const delayedSearch = debounce(() => { handleProductsFilter(searchTerm) }, 500);
      delayedSearch();
      return () => delayedSearch.cancel();
    }
  }, [searchActive, searchTerm]);

  const handleSubmit = async (e) => {
    if (searchActive) {
      handleProductsFilter(searchTerm);
    } else {
      setSearchActive(true);
    }
    e.preventDefault();
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
                    <div className={`result-rental ${filteredProducts.length === 0 ? "hidden" : ""}`}>
                      <div className="container-title-results">
                        <h2 className="title-results split-chars" data-aos>
                          {searchSectionDetails?.rentalTitle} <span>{` "${searchTerm}"`}</span>
                        </h2>
                        <AnimateLink
                          to={`/search/${searchTerm}`}
                          data-menu-close
                          className="btn-border-blue"
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
                            {filteredProducts.map((data, index) => {
                              const { product, variantData } = data;
                              return (
                                <div
                                  key={index}
                                  className="swiper-slide grid-item"
                                >
                                  <div className="rental-product-link">
                                    <AnimateLink
                                      to={`/product/${product.slug}`}
                                      className="product-link"
                                      data-menu-close
                                    >
                                      <h3 className="product-name">
                                        {product.name}
                                      </h3>
                                      <div className="wrapper-img">
                                        <div className="container-img">
                                          <img
                                            src={generateImageURL({
                                              wix_url: product.mainMedia,
                                              w: "346",
                                              h: "346",
                                              fit: "fill",
                                              q: "80",
                                            })}
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
                                          {variantData.map((item, idx) => {
                                            const { variant } = item;
                                            return (
                                              <React.Fragment key={idx}>
                                                {idx < 4 && (
                                                  <li>
                                                    <div className="container-img">
                                                      <img
                                                        src={productImageURL({
                                                          wix_url: variant.imageSrc,
                                                          w: "40",
                                                          h: "40",
                                                          fit: "fill",
                                                          q: "100",
                                                        })}
                                                        className=" "
                                                      />
                                                    </div>
                                                  </li>
                                                )}
                                              </React.Fragment>
                                            )
                                          })}
                                        </ul>
                                        {variantData.length > 4 && (
                                          <div className="colors-number">
                                            <span>+{variantData.length - 4}</span>
                                          </div>
                                        )}

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
                    <div className={`result-portfolio mt-lg-60 mt-mobile-40 ${filteredPortfolios.length === 0 ? "hidden" : ""}`}>
                      <div className="container-title-results">
                        <h2 className="title-results split-chars" data-aos>
                          {searchSectionDetails?.portfolioTitle} <span>{` "${searchTerm}"`}</span>
                        </h2>
                        <AnimateLink
                          to={`${CORPORATE_URL}/portfolio`}
                          target={"_blank"}
                          data-menu-close
                          className="btn-border-blue"
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
                            {filteredPortfolios.map((portfolio, index) => {
                              const { portfolioRef } = portfolio;
                              return (
                                <div
                                  key={index}
                                  className="swiper-slide grid-item"
                                >
                                  <AnimateLink
                                    to={`${CORPORATE_URL}/project/${portfolio.slug}`}
                                    target={"_blank"}
                                    className="link-portfolio "
                                    data-menu-close
                                  >
                                    <div
                                      className="container-img bg-blue"
                                      data-cursor-style="view"
                                    >
                                      <div className="wrapper-img">
                                        <img
                                          src={generateImageUrl2({ wix_url: portfolioRef.coverImage.imageInfo, fit: "fit", w: "220", h: "320", q: "95" })}
                                          className=" "
                                        />
                                      </div>
                                    </div>
                                    <div className="container-text">
                                      <h2 className="title-portfolio">
                                        {portfolioRef.title}
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
                    {filteredProducts.length === 0 && filteredPortfolios.length === 0 && <h6 style={{ width: "100%" }} className="ml-4 mt-3-cs fs--40">No products or projects were found for {searchTerm}</h6>}
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
                  <div className={`result-blog ${filteredBlogs.length === 0 ? "hidden" : ""}`}>
                    <div className="container-title-results">
                      <h2 className="title-results split-chars" data-aos>
                        {searchSectionDetails?.blogTitle} <span>{` "${searchTerm}"`}</span>
                      </h2>
                      <AnimateLink
                        to={`${CORPORATE_URL}/blog`}
                        target={"_blank"}
                        data-menu-close
                        className="btn-border-blue"
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
                          {filteredBlogs.map((blog, index) => {
                            const { blogRef, author } = blog;
                            return (
                              <div
                                key={index}
                                className="swiper-slide grid-item"
                              >
                                <AnimateLink
                                  to={`${CORPORATE_URL}/article/${blog.slug}`}
                                  target={"_blank"}
                                  className="link-blog "
                                  data-menu-close
                                >
                                  <div
                                    className="container-img bg-blue"
                                    data-cursor-style="view"
                                  >
                                    <div className="wrapper-img">
                                      <img
                                        src={generateImageURL({ wix_url: blogRef.coverImage, fit: "fit", w: "400", h: "180", q: "95" })}
                                        className=" "
                                      />
                                    </div>
                                  </div>
                                  <div className="container-text">
                                    <div className="container-author-post-info">
                                      <div className="author">
                                        <span className="author-name">
                                          {author.nickname}

                                        </span>
                                      </div>
                                      <div className="date">
                                        <span>
                                          {formatDate(blogRef.lastPublishedDate.$date)}
                                        </span>
                                      </div>
                                    </div>
                                    <h2 className="title-blog">
                                      {blogRef.title}
                                    </h2>
                                    <p className="text-blog">
                                      {blogRef.excerpt}
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
                  <div className={`result-order-pages ${filteredPages.length === 0 ? "hidden" : ""}`}>
                    <div className="container-title-results">
                      <h2 className="title-results split-chars" data-aos>
                        {searchSectionDetails?.otherPagesTitle} <span>{` "${searchTerm}"`}</span>
                      </h2>
                    </div>
                    <ul
                      className="list-order-pages grid-lg-25 grid-md-50"
                      data-aos
                    >
                      {filteredPages.map((page, index) => {
                        const { path, title, description } = page;

                        return (
                          <li key={index} className="grid-item">
                            <AnimateLink
                              key={index}
                              to={`${process.env.CORPORATE_URL}${path}`}
                              data-menu-close
                              className="link-order-pages"
                            >
                              <h3 className="title-order-pages">{title}</h3>
                              <p className="text-order-pages">{description}</p>
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
