import AnimateLink from "../AnimateLink";
import { ImageWrapper } from "../ImageWrapper";

const Markets = ({ pageContent, marketsData }) => {

  return (
    <section className="section-markets">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 offset-lg-5">
            <h2
              className="fs--60 fs-phone-40 blue-1 text-center split-chars"
              data-aos="d:loop"
            >
              {pageContent && pageContent.marketTitle}
            </h2>
          </div>
          <div className="col-12 mt-lg-50 mt-tablet-40 mt-phone-35">
            <ul className="list-markets list-projects font-60 grid-lg-25 grid-tablet-50">
              {marketsData &&
                marketsData.map((data, index) => {
                  const { slug, cardname, marketTags, image } = data;
                  return (
                    <li
                      key={index}
                      className="grid-item list-item"
                      data-aos="d:loop"
                    >
                      <AnimateLink
                        to={`/market/${slug}`}
                        className="market-link project-link"
                        data-cursor-style="view"
                        data-menu-close
                      >
                        <div
                          className="container-img bg-blue"
                          data-cursor-style="view"
                        >
                          <ImageWrapper url={image} />
                        </div>
                        <div className="container-text">
                          <h3 className="title-project split-words">
                            {cardname}
                          </h3>
                          <ul className="list-tags">
                            {marketTags.map((data, index) => {
                              return (
                                <li key={index}>
                                  <span>{data}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </AnimateLink>
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

export default Markets;
