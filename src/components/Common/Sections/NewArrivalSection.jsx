import { generateImageURL } from "@/Utils/GenerateImageURL";
import AnimateLink from "../AnimateLink";

const NewArrival = ({ content }) => {
  if (!content) return;
  return (
    <section className="section-new-arrivals white-1">
      <div className="container-text pt-tablet-105 pt-phone-185 z-3 col-6">
        <span
          className="d-block fs--40 fs-tablet-30 fs-phone-25 fw-600"
          data-aos="fadeIn .6s ease-in-out-cubic 0s, d:loop"
        >
          {content && content.description}
        </span>
        <span
          className="d-block fs--80 fs-mobile-60 fw-600 pt-lg-15 pt-tablet-25 pt-phone-20 split-words"
          data-aos="d:loop"
        >
          {content && content.title}
        </span>
        <AnimateLink
          to={content.buttonAction}
          className={"btn-blue mt-lg-60 mt-tablet-45 aos-animate fadeIn"}
          attributes={{
            "data-aos": "fadeIn .6s ease-in-out .3s, d:loop",
            "data-cursor-style": "off",
          }}
        >
          <span>{content && content.buttonLabel} </span>
          <i class="icon-arrow-right"></i>
        </AnimateLink>
      </div>
      <div
        className="container-img bg-img bg-beige-1 z-0"
        data-parallax
        data-translate-y-from="-20vh"
        data-translate-y-to="20vh"
      >
        <img
          src={generateImageURL({
            wix_url: content.backgroundImage,
            w: "1336",
            h: "568",
            fit: "fill",
            q: "95",
          })}
          className=" "
        />
      </div>
    </section>
  );
};

export default NewArrival;
