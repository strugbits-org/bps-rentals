"use client";
import AnimateLink from "../AnimateLink";
import React, { useEffect, useState } from "react";
import { filterSearchData, formatDate } from "@/Utils/Utils";
import { useCookies } from "react-cookie";
import { searchProducts } from "@/Services/ProductsApis";
import debounce from 'lodash/debounce';
import { updatedWatched } from "@/Utils/AnimationFunctions";
import { ImageWrapper } from "../ImageWrapper";

const SearchModal = ({ searchSectionDetails, studiosData, marketsData, blogs, portfolios, searchPagesData }) => {

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
    console.log("term, cookies.location", term, cookies.location);
    const filteredProductsData = await searchProducts(term, cookies.location);
    console.log("filteredProductsData", filteredProductsData);
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
                                          <ImageWrapper timeout={0} key={product.mainMedia} defaultDimensions={{ width: 350, height: 350 }} url={product.mainMedia} />
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
                                                      <ImageWrapper timeout={0} key={variant.imageSrc} defaultDimensions={{ width: 40, height: 40 }} url={variant.imageSrc} type="product" />
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
                          // target={"_blank"}
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
                                    // target={"_blank"}
                                    className="link-portfolio "
                                    data-menu-close
                                  >
                                    <div
                                      className="container-img bg-blue"
                                      data-cursor-style="view"
                                    >
                                      <div className="wrapper-img">
                                        <ImageWrapper timeout={0} key={portfolioRef.coverImage.imageInfo} defaultDimensions={{ width: 220, height: 320 }} url={portfolioRef.coverImage.imageInfo} type="2" />
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
                        const {_id, rentalsMarket} = item;
                        return (
                          <li key={index} className={`grid-item ${selectedMarkets.includes(_id) ? "active" : ""}`}>
                            <div
                              onClick={() => { handleMarketFilter(_id) }}
                              className={`market-link project-link ${!resultMarkets.includes(_id) ? "disabled" : ""}`}
                              data-cursor-style="default"
                              data-menu-close
                            >
                              <div
                                className="container-img bg-blue"
                                data-cursor-style="default"
                              >
                                {resultMarkets.includes(_id) && (
                                  <ImageWrapper timeout={0} key={rentalsMarket.image} defaultDimensions={{ width: 500, height: 500 }} url={rentalsMarket.image} customClasses={"media"} min_h={"500"} min_w={"500"} attributes={{ "data-preload": "" }} />
                                )}
                              </div>
                              <div className="container-text">
                                <h3 className="title-project split-words">
                                  {rentalsMarket.cardname}
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
                        // target={"_blank"}
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
                                  // target={"_blank"}
                                  className="link-blog "
                                  data-menu-close
                                >
                                  <div
                                    className="container-img bg-blue"
                                    data-cursor-style="view"
                                  >
                                    <div className="wrapper-img">
                                      <ImageWrapper timeout={0} key={blogRef.coverImage} defaultDimensions={{ width: 400, height: 180 }} url={blogRef.coverImage} min_h={"180"} min_w={"400"} />
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
                              to={page.redirectToRentals ? path : process.env.CORPORATE_URL + path}
                              // target={page.redirectToRentals ? "" : "_blank"}
                              data-menu-close
                              className="link-order-pages"
                            >
                              <h3 className="title-order-pages">{page.redirectToRentals ? title : "Corporate | " + title}</h3>
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
