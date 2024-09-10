import AnimateLink from "../AnimateLink";
import { ImageWrapper } from "../ImageWrapper";

const Studios = ({ content, studiosData }) => {
  const CORPORATE_URL = process.env.CORPORATE_URL;

  return (
    <section className="section-studios">
      <div className="container-fluid">
        <div className="row row-1">
          <div className="col-lg-2 col-md-6">
            <h2
              className="fs--90 fs-tablet-40 blue-1 split-chars"
              data-aos="d:loop"
            >
              {content && content.studioTitle}
            </h2>
          </div>
          <div className="col-lg-5 col-md-6 offset-lg-5 column-2">
            <p
              className="fs--40 fs-mobile-18 text"
              data-aos="fadeIn .6s ease-in-out .4s, d:loop"
            >
              {content && content.studioDescription}
            </p>
          </div>
        </div>
        <div className="row mt-lg-95 mt-tablet-45 mt-phone-40">
          <div className="col-lg-12">
            <ul className="accordion-list-studios" data-aos="d:loop">
              {studiosData &&
                studiosData.map((data, index) => {
                  const { cardName, slug, cardDescription, image } = data;
                  return (
                    <li key={index} className="accordion-item">
                      <div className="accordion-header">
                        <h3
                          className="accordion-title split-words"
                          data-aos="d:loop"
                        >
                          {cardName}
                        </h3>
                      </div>
                      <div className="accordion-content">
                        <div className="container-img bg-blue">
                          <ImageWrapper key={image} defaultDimensions={{ width: 1337, height: 620 }} url={image} min_h={"620"} />
                        </div>
                        <div className="container-accordion-text">
                          <p className="accordion-text">{cardDescription}</p>
                          <AnimateLink
                            to={`${CORPORATE_URL}/services/${slug}`}
                            // target={"_blank"}
                          >
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
