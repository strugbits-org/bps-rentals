import { CustomButton } from "./CustomButton";

const StudiosFixedMenu = ({ data }) => {
  const url = process.env.CORPORATE_URL;
  return (
    <div className="category-menu-fixed">
      <div className="category-menu-wrapper">
        <div className="category-menu">
          <ul className="category-menu-list">
            {data.map((item, index) => {
              const { cardName, link } = item;
              return (
                <li key={index}>
                  <CustomButton
                    data={{ label: cardName, action: link.startsWith("https://") ? link : url + link }}
                    customClasses={"btn-underline-white"}
                    showArrow={false}
                  >
                  </CustomButton>
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
