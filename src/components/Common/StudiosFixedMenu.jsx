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
                  <AnimateLink
                    to={`${url}/services/${data.slug}`}
                    // target={"_blank"}
                    className="btn-underline-white">
                    <span>{data.cardName}</span>
                  </AnimateLink>
                </li>
              );
            })}
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
