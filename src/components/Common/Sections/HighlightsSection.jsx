import AnimateLink from "../AnimateLink";

const Highlights = ({pageContent,data}) => {
  console.log("data", data);

  return (
    <section className="section-highlights">
      <div className="container-fluid">
        <div className="row pt-lg-250 pb-lg-310 pt-tablet-105 pb-tablet-100 pt-phone-195 pb-phone-205">
          <div className="col-lg-10 offset-lg-1">
            <h2
              className="fs--60 fs-phone-40 blue-1 text-center split-words"
              data-aos="d:loop"
            >
              {pageContent && pageContent.highlightsSectionTitle}
            </h2>
            <div className="slider-highlights mt-lg-95 mt-tablet-55 mt-phone-35">
              <div className="swiper-container">
                <div className="swiper-wrapper">
                  {data.map((index) => {
                    return (
                      <div key={index} className="swiper-slide">
                        <div className="highlight-content">
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
                            <AnimateLink to="/product" className="link">
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
                          <AnimateLink to="/product" className="link-highlight">
                            <div className="container-img bg-blue-1">
                              <img
                                src="/images/product/highlights.jpg"
                                className=" "
                                data-aos="scaleOut
                                      .8s ease-out-cubic 0s, d:loop"
                              />
                            </div>
                          </AnimateLink>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="swiper-button-prev">
                <i className="icon-arrow-left-3"></i>
              </div>
              <div className="swiper-button-next">
                <i className="icon-arrow-right-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
