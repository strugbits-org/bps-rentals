import AnimateLink from "./AnimateLink";

const StudiosFixedMenu = ({ data }) => {
  const url = process.env.CORPORATE_URL;
  return (
    <div className="category-menu-fixed">
      <div className="category-menu-wrapper">
        <div className="category-menu">
          <ul className="category-menu-list">
            {data.map((data, index) => {
              return (
                <li key={index}>
                  <AnimateLink target={"_blank"} to={`${url}/services/${data.slug}`} className="btn-underline-white">
                    <span>{data.cardName}</span>
                  </AnimateLink>
                </li>
              );
            })}
            {/* <li>
              <AnimateLink to="/">
                <i className="icon-bps-logo"></i>
                <span className="hide">Blueprint Studios</span>
              </AnimateLink>
            </li>
            <li>
              <AnimateLink to="/" className="btn-underline-white">
                <span>Event Design & Production</span>
              </AnimateLink>
            </li>
            <li>
              <AnimateLink to="/" className="btn-underline-white">
                <span>Creative Agency</span>
              </AnimateLink>
            </li>
            <li>
              <AnimateLink to="/" className="btn-underline-white">
                <span>Custom Fabrication</span>
              </AnimateLink>
            </li>
            <li>
              <AnimateLink to="/" className="btn-underline-white">
                <span>Floral Design</span>
              </AnimateLink>
            </li>
            <li>
              <AnimateLink to="/" className="btn-underline-white">
                <span>Printing Services</span>
              </AnimateLink>
            </li> */}
          </ul>
        </div>
        <button className="btn-close-category-menu" data-category-menu-close>
          <i className="icon-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default StudiosFixedMenu;
