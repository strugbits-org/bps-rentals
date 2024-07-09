const DreamBig = () => {
  return (
    <section className="section-dream-big">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 offset-lg-4 column-1">
            <div className="container-img no-phone">
              <img src="/images/dream-big.jpg" className=" " />
            </div>
            <div className="container-img no-desktop no-tablet">
              <img src="/images/dream-big-mobile.jpg" className=" " />
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
                <span>Let’s Craft Magic Together</span>
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
                Click the button to start the journey. <br />
                Contact us and let's turn your ideas into extraordinary
                experiences.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DreamBig;
