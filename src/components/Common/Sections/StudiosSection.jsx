import AnimateLink from "../AnimateLink";

const Studios = () => {
  return (
    <section className="section-studios">
      <div className="container-fluid">
        <div className="row row-1">
          <div className="col-lg-2 col-md-6">
            <h2
              className="fs--90 fs-tablet-40 blue-1 split-chars"
              data-aos="d:loop"
            >
              Studios
            </h2>
          </div>
          <div className="col-lg-5 col-md-6 offset-lg-5 column-2">
            <p
              className="fs--40 fs-mobile-18 text"
              data-aos="fadeIn .6s ease-in-out .4s, d:loop"
            >
              Discover the versatility of our 6 internal studios working both
              independently and in tendem to fulfill any requirements you might
              have.
            </p>
          </div>
        </div>
        <div className="row mt-lg-95 mt-tablet-45 mt-phone-40">
          <div className="col-lg-12">
            <ul className="accordion-list-studios" data-aos="d:loop">
              {[1, 2, 3, 4, 5, 6].map((index) => {
                return (
                  <li key={index} className="accordion-item">
                    <div className="accordion-header">
                      <h3
                        className="accordion-title split-words"
                        data-aos="d:loop"
                      >
                        Event Design & Production
                      </h3>
                    </div>
                    <div className="accordion-content">
                      <div className="container-img bg-blue">
                        <img src="/images/lib/06_desktop.jpg" className=" " />
                      </div>
                      <div className="container-accordion-text">
                        <p className="accordion-text">
                          We’re not afraid to get technical. After all, the more
                          technical we get the better the final result. This is
                          why our pre-production design services include a
                          thorough strategy and understanding of the attendee
                          journey that leads to the best flow, later represented
                          in technical drawings.
                        </p>
                        <AnimateLink to="/">
                          <span>See more</span>
                          <i className="icon-arrow-right"></i>
                        </AnimateLink>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Studios;
