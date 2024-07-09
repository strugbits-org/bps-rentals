const SnapShots = () => {
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
                <div className="module-column" data-aos="d:loop">
                  <div className="container-img bg-blue">
                    <div className="wrapper-img">
                      <img src="/images/product/highlights.jpg" className=" " />
                    </div>
                  </div>
                </div>
                <div className="module-column" data-aos="d:loop">
                  <div className="container-img bg-blue">
                    <div className="wrapper-img">
                      <img src="/images/product/snapshots.jpg" className=" " />
                    </div>
                  </div>
                </div>
              </div>
              <div className="module-photo-gallery-img-100 module-gallery">
                <div className="module-column" data-aos="d:loop">
                  <div className="container-img bg-blue">
                    <div className="wrapper-img">
                      <img
                        src="/images/product/snapshots-02.jpg"
                        className=" "
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
