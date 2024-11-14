"use client";
import { useEffect } from "react";
import { updatedWatched } from "@/Utils/AnimationFunctions";

const ModalDialogue = ({
  buttonLabel,
  message,
  handleConfirmation,
  isDeleteConfirmation = false,
}) => {

  useEffect(() => {
    setTimeout(() => {
      document.body.setAttribute("data-form-cart-state", "success");
      updatedWatched();
    }, 500);
  }, []);
  return (
    <div id="reloading-area">
      <div className="feedback-quote-request-confirmed dialogue" data-modal-area>
        <div className="feedback-container">
          <div className="feedback-item">
            <section className="feedback">
              <div className="container-fluid">
                <div className="row flex-center">
                  <div className="col-lg-4">
                    <div className="content" data-feedback-area>
                      <div className="container-img">
                        <img src="/images/logo.svg" alt="logo" />
                      </div>
                      <h2
                        className="fs--30 mt-lg-75 mt-mobile-75 mb-lg-75 mb-mobile-90 text-center text-uppercase split-words"
                        data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                      >
                        {message}
                      </h2>
                      <div className="container-btn">
                        <button
                          onClick={() => handleConfirmation(false)}
                          className="btn-border-blue disable-click-outside"
                          data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                        >
                          <span>Cancel</span>
                        </button>
                        <button
                          onClick={() => handleConfirmation(true)}
                          className={`btn-border-blue disable-click-outside ${isDeleteConfirmation ? "red" : ""}`}
                          data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                        >
                          <span>{buttonLabel}</span>
                        </button>
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

export default ModalDialogue;
