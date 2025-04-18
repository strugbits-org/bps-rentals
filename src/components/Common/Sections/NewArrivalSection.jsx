import { CustomButton } from "../CustomButton";
import { ImageWrapper } from "../ImageWrapper";

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
        <CustomButton
          customClasses={"btn-blue mt-lg-60 mt-tablet-45 aos-animate fadeIn"}
          data={{
            label: content.buttonLabel,
            action: content.buttonAction
          }}
          attributes={{
            "data-aos": "fadeIn .6s ease-in-out .3s, d:loop",
            "data-cursor-style": "off",
          }}
        >
        </CustomButton>
      </div>
      <div
        className="container-img bg-img bg-beige-1 z-0"
        data-parallax
        data-translate-y-from="-20vh"
        data-translate-y-to="20vh"
      >
        <ImageWrapper useNextImage={true} defaultDimensions={{ width: 1336, height: 568 }} url={content.bannerImage} q={"90"} />
      </div>
    </section>
  );
};

export default NewArrival;
