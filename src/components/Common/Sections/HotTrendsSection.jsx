import AnimateLink from "../AnimateLink";

export const HotTrendsHome = () => {
  return (
    <section className="section-hot-trends white-1">
      <div className="container-fluid">
        <div className="row pt-lg-160 pb-lg-135 pt-tablet-65 pt-phone-190 pb-tablet-60 pb-phone-145">
          <div className="col-lg-5 offset-lg-1 col-tablet-6 pos-relative z-2 column-text">
            <span
              className="d-block fs--40 fs--mobile-25 fw-600"
              data-aos="fadeIn .6s ease-in-out 0s, d:loop"
            >
              Hot Trends
            </span>
            <h2
              className="fs--90 fs-tablet-40 fs-phone-60 lh-100 fw-600 pt-lg-35 pt-tablet-10 pt-phone-20 section-title split-words"
              data-aos="d:loop"
            >
              Modern elegant to elevate your celebration
            </h2>
          </div>
          <div className="col-12">
            <div className="container-img bg-img">
              <img
                src="/images/hot-trends.jpg"
                className=" "
                data-parallax
                data-translate-x-from="10vw"
                data-translate-x-to="0"
              />
            </div>
          </div>
          <div
            className="col-lg-5 offset-lg-1 pos-relative z-2 column-btn"
            data-aos="fadeIn .6s ease-in-out 0s, d:loop"
          >
            <AnimateLink
              to={`/category/${"123"}`}
              className="btn-blue mt-lg-50 mt-mobile-20"
              data-cursor-style="off"
            >
              <span>Show Now</span>
              <i className="icon-arrow-right"></i>
            </AnimateLink>
          </div>
        </div>
      </div>
    </section>
  );
};

export const HotTrendsCategory = () => {
  return (
    <section className="section-hot-trends white-1 hot-category my-lg-60 my-tablet-40 my-phone-25">
      <div className="container-fluid">
        <div className="row pt-lg-90 pb-lg-40 pt-tablet-65 pt-phone-190 pb-tablet-60 pb-phone-145">
          <div className="col-lg-5 offset-lg-1 col-tablet-6 pos-relative z-2 column-text">
            <span
              className="d-block fs--40 fs--mobile-25 fw-600"
              data-aos="fadeIn .6s ease-in-out 0s, d:loop"
            >
              Hot Trends
            </span>
            <h2
              className="fs--90 fs-tablet-40 fs-phone-60 lh-100 fw-600 pt-lg-35 pt-tablet-10 pt-phone-20 section-title split-words"
              data-aos="d:loop"
            >
              Modern elegant to elevate your celebration
            </h2>
          </div>
          <div className="col-12">
            <div className="container-img bg-img">
              <img
                src="/images/hot-trends.jpg"
                className=" "
                data-parallax
                data-translate-x-from="10vw"
                data-translate-x-to="0"
              />
            </div>
          </div>
          <div
            className="col-lg-5 offset-lg-1 pos-relative z-2 column-btn"
            data-aos="fadeIn .6s ease-in-out 0s, d:loop"
          >
            <AnimateLink
              to={`/category/${"123"}`}
              className="btn-blue mt-lg-50 mt-mobile-20"
              data-cursor-style="off"
            >
              <span>Show Now</span>
              <i className="icon-arrow-right"></i>
            </AnimateLink>
          </div>
        </div>
      </div>
    </section>
  );
};
