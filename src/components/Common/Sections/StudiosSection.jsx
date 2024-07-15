import { generateImageURL } from "@/Utils/GenerateImageURL";
import AnimateLink from "../AnimateLink";

const Studios = ({ content, studiosData }) => {
  return (
    <section className="section-studios">
      <div className="container-fluid">
        <div className="row row-1">
          <div className="col-lg-2 col-md-6">
            <h2
              className="fs--90 fs-tablet-40 blue-1 split-chars"
              data-aos="d:loop"
            >
              {content && content.title}
            </h2>
          </div>
          <div className="col-lg-5 col-md-6 offset-lg-5 column-2">
            <p
              className="fs--40 fs-mobile-18 text"
              data-aos="fadeIn .6s ease-in-out .4s, d:loop"
            >
              {content && content.description}
            </p>
          </div>
        </div>
        <div className="row mt-lg-95 mt-tablet-45 mt-phone-40">
          <div className="col-lg-12">
            <ul className="accordion-list-studios" data-aos="d:loop">
              {studiosData &&
                studiosData.slice(1).map((data, index) => {
                  const { cardName, cardDescription, image } = data;
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
                          <img
                            src={generateImageURL({
                              wix_url: image,
                              w: "1337",
                              h: "497",
                              fit: "fill",
                              q: "95",
                            })}
                            className=" "
                          />
                        </div>
                        <div className="container-accordion-text">
                          <p className="accordion-text">{cardDescription}</p>
                          <AnimateLink 
                          to="/"
                          // to={`/services/${data.slug}`}
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
