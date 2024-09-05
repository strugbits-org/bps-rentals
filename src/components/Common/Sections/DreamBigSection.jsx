import { CustomButton } from "../CustomButton";
import { ImageWrapper } from "../ImageWrapper";

const DreamBig = ({ content }) => {

  return (
    <section className="section-dream-big">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 offset-lg-4 column-1">
            <div className="container-img no-phone">
              <ImageWrapper url={content.desktopBackgroundImage} customClasses={"media"} attributes={{ "data-preload": "" }} />
            </div>
            <div className="container-img no-desktop no-tablet">
              <ImageWrapper url={content.mobileBackgroundImage} min_h={"773"} customClasses={"media"} attributes={{ "data-preload": "" }} />
            </div>
            <div
              data-parallax
              data-trigger=".section-dream-big"
              data-translate-y-from="30vh"
              data-end="center center"
              className="content"
            >
              <CustomButton
                data={{
                  label: content.buttonText,
                  action: content.buttonAction
                }}
                attributes={{
                  "data-cursor-style": "off",
                }}
              ></CustomButton>
              <p
                className="fs--20 flex-center fs-phone-16 fw-500 font-2 blue-1 text-center pos-relative z-5 mt-30 text"
                data-parallax
                data-trigger=".section-dream-big"
                data-translate-y-from="30vh"
                data-end="center center"
              >
                {content && content.paragraph1} <br />
                {content && content.paragraph2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DreamBig;
