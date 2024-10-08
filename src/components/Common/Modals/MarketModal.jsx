"use client";
import AnimateLink from "../AnimateLink";
import { ImageWrapper } from "../ImageWrapper";

const MarketModal = ({ marketsData }) => {
  return (
    <div className="submenu-market submenu" data-get-submenu="market">
      <div className="wrapper-submenu-market wrapper-submenu">
        <div className="container-title-mobile">
          <h2 className="submenu-title">Markets</h2>
          <button className="btn-go-back" data-submenu-close>
            <i className="icon-arrow-left-3"></i>
            <span>Go back</span>
          </button>
        </div>
        <ul className="list-submenu-market list-submenu list-projects font-submenu">
          {marketsData.filter(x => x.menuItem).map((data, index) => {
            const { slug, cardname, marketTags, image } = data.rentalsMarket;
            return (
              <li key={index} className="list-item">
                <AnimateLink
                  to={`/market/${slug}`}
                  className="market-link project-link"
                  data-cursor-style="view"
                >
                  <div
                    className="container-img bg-blue"
                    data-cursor-style="view"
                  >
                    <ImageWrapper key={image} defaultDimensions={{ width: 296, height: 855 }} url={image} />
                  </div>
                  <div className="container-text">
                    <h3 className="title-project split-words">{cardname}</h3>
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
  );
};

export default MarketModal;
