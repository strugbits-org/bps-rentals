import AnimateLink from "../AnimateLink";

const LetsGetSocial = () => {
  return (
    <section className="section-lets-get-social pt-lg-195 pt-tablet-105 pt-phone-155 pb-lg-130 pb-tablet-105 pb-phone-140 mt-lg-240">
      <div
        className="bg"
        data-parallax
        data-translate-y-from="50vh"
        data-parallax-no-phone
        data-parallax-no-tablet
        data-end="center 80%"
        data-phone-end="top top"
        data-trigger="parent"
      ></div>
      <div className="container-fluid pos-relative z-5">
        <div className="row">
          <div className="col-lg-3 mx-auto">
            <h2
              className="fs--60 blue-1 text-center split-words"
              data-aos="d:loop"
            >
              Let’s get social
            </h2>
            <h3
              className="fs--16 fs-tablet-20 fs-phone-18 blue-1 text-center mt-10"
              data-aos="fadeIn .8s ease-in-out .2s, d:loop"
            >
              Connect, create, celebrate: #BlueprintVibes
            </h3>
          </div>
          <div className="col-lg-12 column-2">
            <ul className="list-social mt-lg-60 mt-tablet-100 mt-phone-40">
              <li
                data-parallax
                data-translate-y-from="-30%"
                data-parallax-no-phone
                data-parallax-no-tablet
                data-end="center 80%"
                data-phone-end="top top"
                data-trigger="parent"
              >
                <div className="content blog-content">
                  <div className="social-media-title">
                    <i className="icon-blog"></i>
                    <h3>From our blog</h3>
                  </div>
                  <ul className="list-blog-lets-get-social">
                    {[1, 2, 3].map((index) => {
                      return (
                        <li key={index}>
                          <AnimateLink to="#" className="link-blog">
                            <div
                              className="container-img"
                              data-cursor-style="view"
                            >
                              <img
                                src="/images/lib/06_desktop.jpg"
                                className=" "
                              />
                            </div>
                            <div className="container-text">
                              <h4 className="blog-title">
                                A Picturesque Day with Blueprint Studios:
                                Showcasing Our New Wooden Furniture Collection
                              </h4>
                              <p className="blog-text">
                                In the heart of the great outdoors, with nature
                                as our backdrop, Blueprint Studios embarked on a
                                creative journey
                              </p>
                            </div>
                          </AnimateLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
              <li
                data-parallax
                data-translate-y-from="-60%"
                data-parallax-no-phone
                data-parallax-no-tablet
                data-end="center 80%"
                data-phone-end="top top"
                data-trigger="parent"
              >
                <div className="content">
                  <div className="social-media-title">
                    <i className="icon-instagram"></i>
                    <h3>Stay connected Feed</h3>
                  </div>
                  <ul className="list-instagram">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => {
                      return (
                        <li key={index}>
                          <AnimateLink
                            to="#"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="container-img">
                              <img
                                src="/images/lib/06_desktop.jpg"
                                className=" "
                              />
                            </div>
                          </AnimateLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
              <li
                data-parallax
                data-translate-y-from="-80%"
                data-parallax-no-phone
                data-parallax-no-tablet
                data-end="center 80%"
                data-phone-end="top top"
                data-trigger="parent"
              >
                <div className="content">
                  <div className="social-media-title">
                    <i className="icon-pinterest"></i>
                    <h3>Stay connected Feed</h3>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LetsGetSocial;
