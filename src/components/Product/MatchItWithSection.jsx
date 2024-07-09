import AnimateLink from "../Common/AnimateLink";

const MatchItWith = () => {
  return (
    <section className="product-match-it-with pt-lg-290 pt-tablet-100 pt-phone-195">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <h2
              className="fs--60 fw-600 text-center split-chars"
              data-aos="d:loop"
            >
              Match it with
            </h2>
            <div id="match-slider" className="mt-50" data-aos="d:loop">
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  {[1, 2, 3, 4, 5, 6, 7].map((index) => {
                    return (
                      <div key={index} className="swiper-slide">
                        <div
                          className="product-link large active"
                          data-product-category
                          data-product-location
                          data-product-colors
                        >
                          <div className="container-tags">
                            <div className="best-seller">
                              <span>Best Seller</span>
                            </div>
                            <button className="btn-bookmark">
                              <i className="icon-bookmark"></i>
                              <i className="icon-bookmark-full"></i>
                            </button>
                          </div>
                          <div className="container-copy">
                            <a
                              href="javascript:void(0)"
                              className="btn-copy copy-link"
                            >
                              <span>MODCH39</span>
                              <i className="icon-copy"></i>
                            </a>
                            <input
                              type="text"
                              className="copy-link-url"
                              value="MODCH39"
                              style={{
                                position: "absolute",
                                opacity: 0,
                                pointerEvents: "none",
                              }}
                            />
                          </div>
                          <AnimateLink
                            to={`/product/${index}`}
                            className="link"
                          >
                            <div className="container-top">
                              <h2 className="product-title">Bristol Chair</h2>
                              <div className="container-info">
                                <div className="dimensions">
                                  <span>24”L X 30”W X 37”H</span>
                                </div>
                              </div>
                            </div>
                            <div className="wrapper-product-img">
                              <div
                                className="container-img product-img"
                                data-get-product-link-color="green"
                                data-default-product-link-active
                              >
                                <img
                                  src="/images/chairs/bristol-chair-color-1.webp"
                                  className=" "
                                />
                              </div>
                              <div
                                className="container-img product-img"
                                data-get-product-link-color="white"
                              >
                                <img
                                  src="/images/chairs/bristol-chair-color-2.webp"
                                  className=" "
                                />
                              </div>
                              <div
                                className="container-img product-img"
                                data-get-product-link-color="blue"
                              >
                                <img
                                  src="/images/chairs/bristol-chair-color-3.webp"
                                  className=" "
                                />
                              </div>
                            </div>
                          </AnimateLink>
                          <div className="container-color-options">
                            <ul className="list-color-options">
                              <li
                                className="list-item"
                                data-set-product-link-color="green"
                                data-default-product-link-active
                              >
                                <div className="container-img">
                                  <img
                                    src="/images/chairs/bristol-chair-color-1.webp"
                                    className=" "
                                  />
                                </div>
                              </li>
                              <li
                                className="list-item"
                                data-set-product-link-color="white"
                              >
                                <div className="container-img">
                                  <img
                                    src="/images/chairs/bristol-chair-color-2.webp"
                                    className=" "
                                  />
                                </div>
                              </li>
                              <li
                                className="list-item"
                                data-set-product-link-color="blue"
                              >
                                <div className="container-img">
                                  <img
                                    src="/images/chairs/bristol-chair-color-3.webp"
                                    className=" "
                                  />
                                </div>
                              </li>
                            </ul>
                            <div className="colors-number">
                              <span>+3</span>
                            </div>
                          </div>
                          <btn-modal-open
                            group="modal-product"
                            class="modal-add-to-cart"
                          >
                            <span>Add to cart</span>
                            <i className="icon-cart"></i>
                          </btn-modal-open>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="swiper-button-prev no-mobile">
                <i className="icon-arrow-left-3"></i>
              </div>
              <div className="swiper-button-next no-mobile">
                <i className="icon-arrow-right-3"></i>
              </div>
              <div className="swiper-pagination swiper-pagination-01 no-desktop no-tablet"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MatchItWith;
