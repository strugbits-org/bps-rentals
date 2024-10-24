"use client";
import { useEffect, useRef } from "react";

import { updatedWatched } from "@/Utils/AnimationFunctions";
import AnimateLink from "../AnimateLink";

const QuoteConfirmedModal = () => {
  function closeModal() {
    document.body.setAttribute("data-form-cart-state", "");
    // setModalStatus(false);
    // if (redirectUrl) {
    //   router.push(redirectUrl);
    // }
  }
  useEffect(() => {
    setTimeout(() => {
      document.body.setAttribute("data-form-cart-state", "success");
      updatedWatched();
    }, 500);
  }, []);

  return (
    <div id="scripts">
      <div className="feedback-quote-request-confirmed" data-modal-area>
        <div className="feedback-container">
          <div className="feedback-item">
            <section className="feedback">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-6 offset-lg-3">
                    <div className="content" data-feedback-area>
                      <div className="container-img">
                        <img src="/images/logo.svg" alt="logo" />
                      </div>
                      <h2
                        className="fs--60 mt-lg-75 mt-mobile-70 mb-lg-75 mb-mobile-70 text-center text-uppercase split-words"
                        data-aos="d:loop"
                      >
                        Quote request confirmed
                      </h2>
                      <div className="container-btn">
                        <AnimateLink
                          to="/my-account"
                          className="btn-blue btn-my-account"
                          data-close-feedback
                          data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                        >
                          <i className="icon-arrow-right-2"></i>
                          <span>My Account</span>
                        </AnimateLink>
                        <AnimateLink
                          to={`/category/${"new"}`}
                          className="btn-border-blue btn-my-account btn-back-to-categories mt-md-30 mt-phone-20"
                          data-close-feedback
                          data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                        >
                          <span>Back to categories</span>
                        </AnimateLink>

                        {/* <button
                          onClick={closeModal}
                          className="btn-border-blue btn-my-account btn-back-to-categories mt-md-30 mt-phone-20"
                          data-close-feedback
                          data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                        >
                          <span>Close</span>
                        </button> */}
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
