import AnimateLink from "../AnimateLink";

const Markets = () => {
  return (
    <section className="section-markets">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 offset-lg-5">
            <h2
              className="fs--60 fs-phone-40 blue-1 text-center split-chars"
              data-aos="d:loop"
            >
              Markets
            </h2>
          </div>
          <div className="col-12 mt-lg-50 mt-tablet-40 mt-phone-35">
            <ul className="list-markets list-projects font-60 grid-lg-25 grid-tablet-50">
              <li className="grid-item list-item" data-aos="d:loop">
                <AnimateLink
                  to="/market"
                  className="market-link project-link"
                  data-cursor-style="view"
                  data-menu-close
                >
                  <div
                    className="container-img bg-blue"
                    data-cursor-style="view"
                  >
                    <img src="/images/lib/06_desktop.jpg" className=" " />
                  </div>
                  <div className="container-text">
                    <h3 className="title-project split-words">Corporate</h3>
                    <ul className="list-tags">
                      <li>
                        <span>Personal</span>
                      </li>
                      <li>
                        <span>Wedding</span>
                      </li>
                      <li>
                        <span>Milestone event</span>
                      </li>
                    </ul>
                  </div>
                </AnimateLink>
              </li>
              <li
                className="grid-item list-item"
                data-aos="d:loop"
                data-delay-desktop="50"
              >
                <AnimateLink
                  to="/market"
                  className="project-link"
                  data-cursor-style="view"
                >
                  <div className="container-img">
                    <img src="/images/lib/01_desktop.jpg" className=" " />
                  </div>
                  <div className="container-text">
                    <h3 className="title-project split-words">Weddings</h3>
                    <ul className="list-tags">
                      <li>
                        <span>Personal</span>
                      </li>
                      <li>
                        <span>Wedding</span>
                      </li>
                      <li>
                        <span>Milestone event</span>
                      </li>
                    </ul>
                  </div>
                </AnimateLink>
              </li>
              <li
                className="grid-item list-item"
                data-aos="d:loop"
                data-delay-desktop="100"
              >
                <AnimateLink
                  to="/market"
                  className="project-link"
                  data-cursor-style="view"
                >
                  <div className="container-img">
                    <img src="/images/lib/07_desktop.jpg" className=" " />
                  </div>
                  <div className="container-text">
                    <h3 className="title-project split-words">Tradeshows</h3>
                    <ul className="list-tags">
                      <li>
                        <span>Personal</span>
                      </li>
                      <li>
                        <span>Wedding</span>
                      </li>
                      <li>
                        <span>Milestone event</span>
                      </li>
                    </ul>
                  </div>
                </AnimateLink>
              </li>
              <li
                className="grid-item list-item"
                data-aos="d:loop"
                data-delay-desktop="150"
              >
                <AnimateLink
                  to="/market"
                  className="project-link"
                  data-cursor-style="view"
                >
                  <div className="container-img">
                    <img src="/images/lib/05_desktop.jpg" className=" " />
                  </div>
                  <div className="container-text">
                    <h3 className="title-project split-words">Social</h3>
                    <ul className="list-tags">
                      <li>
                        <span>Personal</span>
                      </li>
                      <li>
                        <span>Wedding</span>
                      </li>
                      <li>
                        <span>Milestone event</span>
                      </li>
                    </ul>
                  </div>
                </AnimateLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Markets;
