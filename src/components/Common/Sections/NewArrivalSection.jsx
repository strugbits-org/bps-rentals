import AnimateLink from "../AnimateLink";

const NewArrival = () => {
  return (
    <section className="section-new-arrivals white-1">
      <div className="container-text pt-tablet-105 pt-phone-185 z-3">
        <span
          className="d-block fs--40 fs-tablet-30 fs-phone-25 fw-600"
          data-aos="fadeIn .6s ease-in-out-cubic 0s, d:loop"
        >
          Prepare To Want It All
        </span>
        <span
          className="d-block fs--80 fs-mobile-60 fw-600 pt-lg-15 pt-tablet-25 pt-phone-20 split-words"
          data-aos="d:loop"
        >
          Spring preview
        </span>
        <AnimateLink
          to={`/category/${"123"}`}
          className="btn-blue mt-lg-60 mt-tablet-45"
          data-cursor-style="off"
          data-aos="fadeIn .6s ease-in-out .3s, d:loop"
        >
          <span>Check New Arrivals</span>
          <i className="icon-arrow-right"></i>
        </AnimateLink>
      </div>
      <div
        className="container-img bg-img bg-beige-1 z-0"
        data-parallax
        data-translate-y-from="-20vh"
        data-translate-y-to="20vh"
      >
        <img src="/images/tables.jpg" className=" " />
      </div>
    </section>
  );
};

export default NewArrival;
