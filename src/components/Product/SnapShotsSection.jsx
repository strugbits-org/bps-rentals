import { generateImageURL } from "@/Utils/GenerateImageURL";

const SnapShots = ({ data }) => {
  return (
    <section className="product-snapshots pt-lg-205 pt-tablet-75 pt-phone-155">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <h2
              className="fs--60 text-center mb-md-40 mb-phone-30 split-chars"
              data-aos="d:loop"
            >
              Snapshots
            </h2>
            <div className="wrapper-gallery">
              <div className="module-photo-gallery-img-50 module-gallery">
                {data &&
                  data.map((data, index) => {
                    const { src } = data;
                    return (
                      <div
                        key={index}
                        className="module-column"
                        data-aos="d:loop"
                      >
                        <div className="container-img">
                          <div className="wrapper-img">
                            <img
                              src={generateImageURL({
                                wix_url: src,
                                w: "867",
                                h: "578",
                                fit: "fill",
                                q: "95",
                              })}
                              data-preload
                              className="media"
                              alt="product-njk"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="module-photo-gallery-img-100 module-gallery">
                <div className="module-column" data-aos="d:loop">
                  <div className="container-img bg-blue">
                    <div className="wrapper-img">
                      <img
                        style={{ maxHeight: "80rem" }}
                        src={generateImageURL({
                          wix_url: data[0].src,
                          w: "1747",
                          h: "889",
                          fit: "fill",
                          q: "95",
                        })}
                        data-preload
                        className=""
                        alt="pro-product"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SnapShots;
