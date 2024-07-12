import { generateImageURL } from "@/Utils/GenerateImageURL";

const DreamBig = ({ pageContent }) => {
  return (
    <section className="section-dream-big">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 offset-lg-4 column-1">
            <div className="container-img no-phone">
              {/* src={generateImageURL({
                  wix_url: pageContent.titleImage,
                  w: "1356",
                  h: "953",
                  fit: "fill",
                  q: "95",
                })} */}
              <img
                src={generateImageURL({
                  wix_url: pageContent.titleImage,
                  w: "1356",
                  h: "953",
                  fit: "fill",
                  q: "95",
                })}
                className=" "
              />
            </div>
            <div className="container-img no-desktop no-tablet">
              <img
                src={generateImageURL({
                  wix_url: pageContent.mobileTitleImage,
                  w: "434",
                  h: "773",
                  fit: "fill",
                  q: "95",
                })}
                className=" "
              />
            </div>
            <div
              data-parallax
              data-trigger=".section-dream-big"
              data-translate-y-from="30vh"
              data-end="center center"
              className="content"
            >
              <btn-modal-open
                group="modal-contact"
                class="btn-blue"
                data-cursor-style="off"
              >
                <span>{pageContent && pageContent.buttonLabel}</span>
                <i className="icon-arrow-right-2"></i>
              </btn-modal-open>
              <p
                className="fs--20 fs-phone-16 fw-500 font-2 blue-1 text-center pos-relative z-5 mt-30 text"
                data-parallax
                data-trigger=".section-dream-big"
                data-translate-y-from="30vh"
                data-end="center center"
                //   className="flex-center"
              >
                {pageContent && pageContent.description1} <br />
                {pageContent && pageContent.description2}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DreamBig;
