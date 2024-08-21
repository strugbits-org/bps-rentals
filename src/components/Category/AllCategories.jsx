import { generateImageURL } from "@/Utils/GenerateImageURL";
import AnimateLink from "../Common/AnimateLink";

const AllCategories = ({ categoriesData }) => {
  return (
    <div
      className="submenu-categories submenu"
      data-get-submenu="all-categories"
    >
      <div className="wrapper-submenu-categories wrapper-submenu">
        <div className="container-title-mobile">
          <h2 className="submenu-title">All Categories</h2>
          <button className="btn-go-back" data-submenu-close>
            <i className="icon-arrow-left-3"></i>
            <span>Go back</span>
          </button>
        </div>
        <ul className="list-submenu-categories list-submenu font-submenu">
          {categoriesData.map((data, index) => {
            const { name, mainMedia } = data.categoryName;
            const slug = data.categoryName["link-copy-of-category-name-2"];
            return (
              <li key={index} className="list-item">
                <AnimateLink
                  to={slug}
                  className="category-link"
                  data-cursor-style="view"
                  data-menu-close
                >
                  <div className="container-img">
                    <img
                      src={generateImageURL({
                        wix_url: mainMedia,
                        w: "99",
                        h: "99",
                        fit: "fill",
                        q: "95",
                      })}
                      className=" "
                    />
                    {/* <img
                      src="/images/chairs/bristol-chair-color-4.webp"
                      className=" "
                    /> */}
                  </div>
                  <div className="container-text pt-15">
                    <h3 className="fs--21 fw-600 blue-1 text-center title-project split-words">
                      {name}
                    </h3>
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
export default AllCategories;
