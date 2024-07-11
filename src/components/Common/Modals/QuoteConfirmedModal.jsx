import AnimateLink from "../AnimateLink";

const QuoteConfirmedModal = () => {
  return (
    <div id="scripts">
      <div class="feedback-quote-request-confirmed" data-modal-area>
        <div class="feedback-container">
          <div class="feedback-item">
            <section class="feedback">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-lg-6 offset-lg-3">
                    <div class="content" data-feedback-area>
                      <div class="container-img">
                        <img src="/images/logo.svg" class=" " />
                      </div>
                      <h2
                        class="fs--60 mt-lg-75 mt-mobile-70 mb-lg-75 mb-mobile-70 text-center text-uppercase split-words"
                        data-aos="d:loop"
                      >
                        Quote request confirmed
                      </h2>
                      <div class="container-btn">
                        <AnimateLink
                          to="/my-account"
                          className="btn-blue btn-my-account"
                          data-close-feedback
                          data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                        >
                          <i class="icon-arrow-right-2"></i>
                          <span>My Account</span>
                        </AnimateLink>
                        <AnimateLink
                          to={`/category/${"123"}`}
                          className="btn-border-blue btn-my-account btn-back-to-categories mt-md-30 mt-phone-20"
                          data-close-feedback
                          data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                        >
                          <span>Back to categories</span>
                        </AnimateLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteConfirmedModal;