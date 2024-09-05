import React from "react";
import AnimateLink from "../AnimateLink";
import { formatDate } from "@/Utils/Utils";
import { ImageWrapper } from "../ImageWrapper";

const ArticleSection = ({ data }) => {
  const CORPORATE_URL = process.env.CORPORATE_URL;

  return (
    <section className="product-where-the-product-was-used pt-lg-295 pt-tablet-105 pt-phone-150 pb-lg-150 pb-mobile-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 column-1">
            <h2
              className="fs--60 text-center mb-lg-45 mb-mobile-40 split-words"
              data-aos="d:loop"
            >
              As Seen In Our Articles
            </h2>
            <div className="slider-content-mobile">
              <div className="swiper-container">
                <div
                  className="swiper-wrapper list-blog list-slider-mobile"
                  data-aos="d:loop"
                >
                  {data.slice(0, 8).map((blogData, index) => {
                    const { blogRef, studios, markets, author, slug } =
                      blogData;

                    const { coverImage, excerpt, title, lastPublishedDate } =
                      blogRef;

                    return (
                      <div key={index} className="swiper-slide grid-item">
                        <AnimateLink
                          to={`${CORPORATE_URL}/article/${slug}`}
                          target={"_blank"}
                          className="link-blog"
                        >
                          <div
                            className="container-img bg-blue"
                            data-cursor-style="view"
                          >
                            <div className="wrapper-img">
                            <ImageWrapper url={coverImage} />
                            </div>
                          </div>
                          <div className="container-text">
                            <div className="container-author-post-info">
                              <div className="author">
                                <span className="author-name">
                                  {" "}
                                  {author.nickname}
                                </span>
                              </div>
                              <div className="date">
                                <span>
                                  {" "}
                                  {formatDate(lastPublishedDate.$date)}
                                </span>
                              </div>
                            </div>
                            <h2 className="title-blog">{title}</h2>
                            <p className="text-blog">{excerpt}</p>
                            <ul className="list-tags-small">
                              {markets.map((market, index) => (
                                <li
                                  key={index}
                                  className={`tag-small
                                                    ? "active"
                                                    : ""
                                                    }`}
                                >
                                  <span>{market.cardname}</span>
                                </li>
                              ))}
                              {studios.map((studio, index) => (
                                <React.Fragment key={index}>
                                  {index < 2 && (
                                    <li
                                      className={`tag-small 
                                                            ? ${
                                                              index === 0
                                                            } "active"
                                                            : ""
                                                            }`}
                                    >
                                      <span>{studio.cardName}</span>a
                                    </li>
                                  )}
                                </React.Fragment>
                              ))}
                              {studios.length > 2 ? (
                                <li className="tag-small">
                                  <span>+{studios.length - 2} studios</span>
                                </li>
                              ) : null}
                            </ul>
                          </div>
                        </AnimateLink>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="swiper-button-prev swiper-button-01 no-mobile">
                <i className="icon-arrow-left-3"></i>
              </div>
              <div className="swiper-button-next swiper-button-01 no-mobile">
                <i className="icon-arrow-right-3"></i>
              </div>
            </div>
          </div>
          <div className="col-lg-2 offset-lg-5 flex-center mt-70">
            <AnimateLink
              to={`${CORPORATE_URL}/blog`}
              target={"_blank"}
              className="btn-border-blue"
              data-cursor-style="off"
            >
              <span>See all</span>
            </AnimateLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticleSection;
