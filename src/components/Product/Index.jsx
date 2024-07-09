"use client";
import { useEffect } from "react";
import { markPageLoaded } from "../../utils/AnimationFunctions";
import SnapShots from "./SnapShotsSection";
import MatchItWith from "./MatchItWithSection";
import LetsGetSocial from "../Common/Sections/SocialSection";
import AnimateLink from "../Common/AnimateLink";

const ProductPage = () => {
  useEffect(() => {
    setTimeout(() => {
      markPageLoaded();
    }, 100);
  }, []);
  return (
    <>
      <section className="product-intro pt-lg-70" data-product-content>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-7 offset-lg-1 column-1">
              <ul
                className="list-slider-product"
                data-aos="fadeIn .8s ease-in-out .2s, d:loop"
              >
                <li
                  className="wrapper-slider-product"
                  data-default-active
                  data-get-color="yellow"
                >
                  <div className="slider-product">
                    <div className="container-btn-top">
                      <div className="best-seller-tag">
                        <span>Best Seller</span>
                      </div>
                      <button className="btn-bookmark">
                        <i className="icon-bookmark"></i>
                        <i className="icon-bookmark-full"></i>
                      </button>
                    </div>
                    <div className="swiper-container">
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-1.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-1.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-1.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide slide-360">
                          <div className="wrapper-img">
                            <i className="icon-360"></i>
                            <div className="container-img">
                              <canvas
                                className="infinite-image-scroller"
                                data-frames="49"
                                data-path="/images/chairs/chair/0_"
                                data-extension="jpg"
                              ></canvas>
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-1.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-1.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-1.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide slide-360">
                          <div className="wrapper-img">
                            <i className="icon-360"></i>
                            <div className="container-img">
                              <canvas
                                className="infinite-image-scroller"
                                data-frames="49"
                                data-path="/images/chairs/chair/0_"
                                data-extension="jpg"
                              ></canvas>
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-1.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-1.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-1.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide slide-360">
                          <div className="wrapper-img">
                            <i className="icon-360"></i>
                            <div className="container-img">
                              <canvas
                                className="infinite-image-scroller"
                                data-frames="49"
                                data-path="/images/chairs/chair/0_"
                                data-extension="jpg"
                              ></canvas>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-button-prev">
                      <i className="icon-arrow-left-3"></i>
                    </div>
                    <div className="swiper-button-next">
                      <i className="icon-arrow-right-3"></i>
                    </div>
                  </div>
                  <div className="wrapper-slider-thumb no-mobile">
                    <div className="slider-product-thumb">
                      <div className="swiper-container">
                        <div className="swiper-wrapper">
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-1.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-1.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-1.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img img-3d">
                              <div className="container-img">
                                <img src="/images/3d.svg" className=" " />
                              </div>
                              <span className="hide">360</span>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-1.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-1.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-1.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img img-3d">
                              <div className="container-img">
                                <img src="/images/3d.svg" className=" " />
                              </div>
                              <span className="hide">360</span>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-1.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-1.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-1.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img img-3d">
                              <div className="container-img">
                                <img src="/images/3d.svg" className=" " />
                              </div>
                              <span className="hide">360</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="wrapper-slider-product" data-get-color="blue">
                  <div className="slider-product">
                    <div className="container-btn-top">
                      <div className="best-seller-tag">
                        <span>Best Seller</span>
                      </div>
                      <button className="btn-bookmark">
                        <i className="icon-bookmark"></i>
                        <i className="icon-bookmark-full"></i>
                      </button>
                    </div>
                    <div className="swiper-container">
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-2.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-2.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-2.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-2.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-2.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-2.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-2.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-2.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-2.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-button-prev">
                      <i className="icon-arrow-left-3"></i>
                    </div>
                    <div className="swiper-button-next">
                      <i className="icon-arrow-right-3"></i>
                    </div>
                    <div className="swiper-pagination no-desktop no-tablet"></div>
                  </div>
                  <div className="wrapper-slider-thumb no-mobile">
                    <div className="slider-product-thumb">
                      <div className="swiper-container">
                        <div className="swiper-wrapper">
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-2.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-2.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-2.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img img-3d">
                              <div className="container-img">
                                <img src="/images/3d.svg" className=" " />
                              </div>
                              <span className="hide">360</span>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-2.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-2.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-2.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img img-3d">
                              <div className="container-img">
                                <img src="/images/3d.svg" className=" " />
                              </div>
                              <span className="hide">360</span>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-2.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-2.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-2.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img img-3d">
                              <div className="container-img">
                                <img src="/images/3d.svg" className=" " />
                              </div>
                              <span className="hide">360</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="wrapper-slider-product" data-get-color="red">
                  <div className="slider-product">
                    <div className="container-btn-top">
                      <div className="best-seller-tag">
                        <span>Best Seller</span>
                      </div>
                      <button className="btn-bookmark">
                        <i className="icon-bookmark"></i>
                        <i className="icon-bookmark-full"></i>
                      </button>
                    </div>
                    <div className="swiper-container">
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-3.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-3.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-3.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide slide-360">
                          <div className="wrapper-img">
                            <i className="icon-360"></i>
                            <div className="container-img">
                              <canvas
                                className="infinite-image-scroller"
                                data-frames="49"
                                data-path="/images/chairs/chair/0_"
                                data-extension="jpg"
                              ></canvas>
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-3.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-3.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-3.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide slide-360">
                          <div className="wrapper-img">
                            <i className="icon-360"></i>
                            <div className="container-img">
                              <canvas
                                className="infinite-image-scroller"
                                data-frames="49"
                                data-path="/images/chairs/chair/0_"
                                data-extension="jpg"
                              ></canvas>
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-3.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-3.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-3.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide slide-360">
                          <div className="wrapper-img">
                            <i className="icon-360"></i>
                            <div className="container-img">
                              <canvas
                                className="infinite-image-scroller"
                                data-frames="49"
                                data-path="/images/chairs/chair/0_"
                                data-extension="jpg"
                              ></canvas>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-button-prev">
                      <i className="icon-arrow-left-3"></i>
                    </div>
                    <div className="swiper-button-next">
                      <i className="icon-arrow-right-3"></i>
                    </div>
                    <div className="swiper-pagination no-desktop no-tablet"></div>
                  </div>
                  <div className="wrapper-slider-thumb no-mobile">
                    <div className="slider-product-thumb">
                      <div className="swiper-container">
                        <div className="swiper-wrapper">
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-3.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-3.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-3.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img img-3d">
                              <div className="container-img">
                                <img src="/images/3d.svg" className=" " />
                              </div>
                              <span className="hide">360</span>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-3.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-3.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-3.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img img-3d">
                              <div className="container-img">
                                <img src="/images/3d.svg" className=" " />
                              </div>
                              <span className="hide">360</span>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-3.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-3.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-3.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img img-3d">
                              <div className="container-img">
                                <img src="/images/3d.svg" className=" " />
                              </div>
                              <span className="hide">360</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="wrapper-slider-product" data-get-color="pink">
                  <div className="slider-product">
                    <div className="container-btn-top">
                      <div className="best-seller-tag">
                        <span>Best Seller</span>
                      </div>
                      <button className="btn-bookmark">
                        <i className="icon-bookmark"></i>
                        <i className="icon-bookmark-full"></i>
                      </button>
                    </div>
                    <div className="swiper-container">
                      <div className="swiper-wrapper">
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-4.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-4.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-4.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide slide-360">
                          <div className="wrapper-img">
                            <i className="icon-360"></i>
                            <div className="container-img">
                              <canvas
                                className="infinite-image-scroller"
                                data-frames="49"
                                data-path="/images/chairs/chair/0_"
                                data-extension="jpg"
                              ></canvas>
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-4.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-4.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-4.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide slide-360">
                          <div className="wrapper-img">
                            <i className="icon-360"></i>
                            <div className="container-img">
                              <canvas
                                className="infinite-image-scroller"
                                data-frames="49"
                                data-path="/images/chairs/chair/0_"
                                data-extension="jpg"
                              ></canvas>
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-4.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-4.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide">
                          <div className="wrapper-img">
                            <div className="container-img">
                              <img
                                src="/images/chairs/bristol-chair-color-4.webp"
                                className=" "
                              />
                            </div>
                          </div>
                        </div>
                        <div className="swiper-slide slide-360">
                          <div className="wrapper-img">
                            <i className="icon-360"></i>
                            <div className="container-img">
                              <canvas
                                className="infinite-image-scroller"
                                data-frames="49"
                                data-path="/images/chairs/chair/0_"
                                data-extension="jpg"
                              ></canvas>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="swiper-button-prev">
                      <i className="icon-arrow-left-3"></i>
                    </div>
                    <div className="swiper-button-next">
                      <i className="icon-arrow-right-3"></i>
                    </div>
                    <div className="swiper-pagination no-desktop no-tablet"></div>
                  </div>
                  <div className="wrapper-slider-thumb no-mobile">
                    <div className="slider-product-thumb">
                      <div className="swiper-container">
                        <div className="swiper-wrapper">
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-4.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-4.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-4.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img img-3d">
                              <div className="container-img">
                                <img src="/images/3d.svg" className=" " />
                              </div>
                              <span className="hide">360</span>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-4.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-4.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-4.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img img-3d">
                              <div className="container-img">
                                <img src="/images/3d.svg" className=" " />
                              </div>
                              <span className="hide">360</span>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-4.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-4.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img">
                              <div className="container-img">
                                <img
                                  src="/images/chairs/bristol-chair-color-4.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </div>
                          <div className="swiper-slide">
                            <div className="wrapper-img img-3d">
                              <div className="container-img">
                                <img src="/images/3d.svg" className=" " />
                              </div>
                              <span className="hide">360</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 column-2 mt-tablet-20 mt-phone-25">
              <ul className="list-breadcrumb" data-aos="fadeIn .8s ease-in-out">
                {["Home", "Corporate"].map((data, index) => {
                  return (
                    <li key={index} className="list-breadcrumb-item">
                      <AnimateLink to="/" className="breadcrumb">
                        <span>{data}</span>
                      </AnimateLink>
                    </li>
                  );
                })}
              </ul>
              <div className="container-product-description">
                <form action="cart.html" className="form-cart" data-pjax>
                  <input type="hidden" name="sku[]" value="MODCH09" />
                  <div className="wrapper-product-name">
                    <div className="container-product-name">
                      <h1
                        className="fs--60 fs-phone-30 product-name split-words"
                        data-aos="d:loop"
                      >
                        Bristol Chair
                      </h1>
                    </div>
                  </div>
                  <ul
                    className="list-specs mt-tablet-20 mt-phone-15"
                    data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                  >
                    <li className="sku">
                      <span className="specs-title">SKU</span>
                      <span className="specs-text">MODCH09</span>
                    </li>
                    <li className="size">
                      <span className="specs-title">Size</span>
                      <span className="specs-text">19”L X 15.5”W X 27.5”H</span>
                    </li>
                    <li className="color">
                      <span className="specs-title">Color</span>
                      <span className="specs-text">Yellow - Birch</span>
                    </li>
                    <li className="weight">
                      <span className="specs-title">Weight</span>
                      <span className="specs-text">11.5lbs</span>
                    </li>
                    <li className="seat-height">
                      <span className="specs-title">Seat Height</span>
                      <span className="specs-text">17” H</span>
                    </li>
                  </ul>
                  <ul
                    className="list-colors"
                    data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                  >
                    <li className="list-colors-item">
                      <div
                        className="container-input active"
                        data-set-color="yellow"
                      >
                        <label>
                          <input
                            type="radio"
                            name="colors"
                            value="yellow"
                            checked
                          />
                          <div className="container-img">
                            <img
                              src="/images/chairs/bristol-chair-color-1.webp"
                              className=" "
                            />
                          </div>
                        </label>
                      </div>
                    </li>
                    <li className="list-colors-item">
                      <div className="container-input" data-set-color="blue">
                        <label>
                          <input type="radio" name="colors" value="blue" />
                          <div className="container-img">
                            <img
                              src="/images/chairs/bristol-chair-color-2.webp"
                              className=" "
                            />
                          </div>
                        </label>
                      </div>
                    </li>
                    <li className="list-colors-item">
                      <div className="container-input" data-set-color="red">
                        <label>
                          <input type="radio" name="colors" value="red" />
                          <div className="container-img">
                            <img
                              src="/images/chairs/bristol-chair-color-3.webp"
                              className=" "
                            />
                          </div>
                        </label>
                      </div>
                    </li>
                    <li className="list-colors-item">
                      <div className="container-input" data-set-color="pink">
                        <label>
                          <input type="radio" name="colors" value="pink" />
                          <div className="container-img">
                            <img
                              src="/images/chairs/bristol-chair-color-4.webp"
                              className=" "
                            />
                          </div>
                        </label>
                      </div>
                    </li>
                  </ul>
                  <div
                    className="container-add-to-cart mt-tablet-20 mt-phone-25"
                    data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                  >
                    <div className="container-input container-input-quantity">
                      <button type="button" className="minus">
                        <i className="icon-minus"></i>
                      </button>
                      <input
                        type="number"
                        value="1"
                        placeholder="1"
                        min="1"
                        className="input-number"
                      />
                      <button type="button" className="plus">
                        <i className="icon-plus"></i>
                      </button>
                    </div>
                    <button className="btn-add-to-cart" type="submit">
                      <span>Add to cart</span>
                      <i className="icon-arrow-right"></i>
                    </button>
                  </div>
                  <div
                    className="container-available font-2 blue-1 mt-md-40 mt-phone-30"
                    data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                  >
                    <div className="available-title">
                      <i className="icon-pin"></i>
                      <h3 className="fs--16 fs-phone-14">
                        Available for national delivery (Conditions apply)
                      </h3>
                    </div>
                    <p className="fs--10 fs-tablet-14 mt-5">
                      Please note, screen colors may not accurately match actual
                      product colors. Also, natural wood items can vary in
                      color, grain, and texture, which is part of their unique
                      charm.
                    </p>
                  </div>
                  <div
                    className="container-product-notes mt-lg-30 mt-tablet-25 mt-phone-30"
                    data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                  >
                    <div className="container-input product-notes">
                      <label>Customize product text</label>
                      <input
                        name="product_notes"
                        type="text"
                        placeholder="Enter you text"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div
                className="container-info-text container-read-more description mt-lg-40 mt-tablet-20 mt-phone-50"
                data-aos=""
              >
                <h3 className="title-info-text split-words" data-aos="">
                  <span>Description</span>
                </h3>
                <div className="wrapper-text" data-aos="fadeIn .8s ease-in-out">
                  <div className="text">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Ut ultrices ipsum purus, at aliquam mauris interdum nec.
                      Maecenas in pellentesque sapien, ut sodales augue. Sed
                      magna lacus, scelerisque quis dui eu, tempus auctor nunc.
                      In pulvinar sapien id mi mattis pulvinar. Vivamus lobortis
                      nibh in blandit pulvinar. Morbi sagittis justo vitae risus
                      tristique condimentum. Pellentesque elementum convallis
                      dui, sed aliquet odio rhoncus sed. Cras bibendum orci a
                      turpis vulputate dictum. Suspendisse egestas enim lacus,
                      eget volutpat tellus vestibulum at.
                    </p>
                    <p>
                      Maecenas in pellentesque sapien, ut sodales augue. Sed
                      magna lacus, scelerisque quis dui eu, tempus auctor nunc.
                      In pulvinar sapien id mi mattis pulvinar. Vivamus lobortis
                      nibh in blandit pulvinar. Morbi sagittis justo vitae risus
                      tristique condimentum. Pellentesque elementum convallis
                      dui, sed aliquet odio rhoncus sed. Cras bibendum orci a
                      turpis vulputate dictum. Suspendisse egestas enim lacus,
                      eget volutpat tellus vestibulum at.
                    </p>
                  </div>
                </div>
                <button
                  className="btn-read-more"
                  data-aos="fadeIn .8s ease-in-out"
                >
                  <div className="btn-text">
                    <span className="read-more">Read More</span>
                    <span className="to-go-back">To go back</span>
                  </div>
                  <i className="icon-arrow-down"></i>
                </button>
              </div>
              <div className="container-info-text" data-aos="">
                <h3 className="title-info-text split-words" data-aos="">
                  Downloads
                </h3>
                <div
                  className="container-btn container-btn-downloads"
                  data-aos="fadeIn .8s ease-in-out"
                >
                  <button className="btn-small-tag">
                    <span>Technical drawing</span>
                    <i className="icon-arrow-down"></i>
                  </button>
                  <button className="btn-small-tag">
                    <span>Installation video</span>
                    <i className="icon-arrow-down"></i>
                  </button>
                </div>
              </div>
              <div className="container-info-text" data-aos="">
                <h3 className="title-info-text split-words" data-aos="">
                  Product found in
                </h3>
                <div
                  className="container-btn"
                  data-aos="fadeIn .8s ease-in-out"
                >
                  <button className="btn-small-tag">
                    <span>Chars</span>
                  </button>
                  <button className="btn-small-tag">
                    <span>Accent Charis</span>
                  </button>
                  <button className="btn-small-tag">
                    <span>Outdoor Furniture</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SnapShots />
      <MatchItWith />
      <section className="product-where-the-product-was-used pt-lg-295 pt-tablet-105 pt-phone-150 pb-lg-150 pb-mobile-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 column-1">
              <h2
                className="fs--60 text-center mb-lg-45 mb-mobile-40 split-words"
                data-aos="d:loop"
              >
                Where the product was used
              </h2>
              <div className="slider-content-mobile">
                <div className="swiper-container">
                  <div
                    className="swiper-wrapper list-blog list-slider-mobile"
                    data-aos="d:loop"
                  >
                    {[1, 2, 3, 4, 5, 6].map((index) => {
                      return (
                        <div key={index} className="swiper-slide grid-item">
                          <AnimateLink to="/" className="link-blog">
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
                                A Taste Explosion: Event Design Extravaganza at
                                Boa Restaurant
                              </h2>
                              <p className="text-blog">
                                Beverly Hills, renowned for its luxury and
                                panache, witnessed an unforgettable evening that
                                melded culinary wonders with unmatched event
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.
                              </p>
                              <ul className="list-tags-small">
                                <li className="tag-small active">
                                  <span>Corporate</span>
                                </li>
                                <li className="tag-small">
                                  <span>Event Design and Production</span>
                                </li>
                                <li className="tag-small">
                                  <span>Creative Services Agency</span>
                                </li>
                                <li className="tag-small">
                                  <span>+ 3 studios</span>
                                </li>
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
              <a href="/#" className="btn-border-blue" data-cursor-style="off">
                <span>See all</span>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="product-post-explore-projects pt-md-100 pt-phone-50 pb-lg-190 pb-mobile-130">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h2
                className="fs--60 text-center mb-lg-45 mb-tablet-35 mb-phone-40 split-words"
                data-aos="d:loop"
              >
                As Seen In Our Articles
              </h2>
              <div className="slider-content-mobile">
                <div className="swiper-container">
                  <div className="swiper-wrapper list-portfolio list-slider-mobile">
                    {[1, 2, 3, 4, 5].map((index) => {
                      return (
                        <div key={index} className="swiper-slide grid-item">
                          <a
                            href={`product/${index}`}
                            className="link-portfolio link-portfolio-animation"
                            data-aos="d:loop"
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
                              <ul className="list-tags-small">
                                <li className="tag-small active">
                                  <span>Corporate</span>
                                </li>
                                <li className="tag-small">
                                  <span>Event Design and Production</span>
                                </li>
                                <li className="tag-small">
                                  <span>Creative Services Agency</span>
                                </li>
                                <li className="tag-small">
                                  <span>+ 3 studios</span>
                                </li>
                              </ul>
                              <h2 className="title-portfolio">
                                F1 Las Vegas Grand Prix
                              </h2>
                            </div>
                          </a>
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
            <div
              className="col-lg-2 offset-lg-5 flex-center mt-lg-60 mt-mobile-40"
              data-aos="fadeIn .8s ease-in-out .2s, d:loop"
            >
              <a href="/" className="btn-border-blue" data-cursor-style="off">
                <span>See more</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <LetsGetSocial />
    </>
  );
};

export default ProductPage;
