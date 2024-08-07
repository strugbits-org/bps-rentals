const PortfolioSection = () => {
  return (
    <section className="product-post-explore-projects pt-md-100 pt-phone-50 pb-lg-190 pb-mobile-130">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h2
              className="fs--60 text-center mb-lg-45 mb-tablet-35 mb-phone-40 split-words"
              data-aos="d:loop"
            >
              Where the product was used
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
  );
};

export default PortfolioSection;
