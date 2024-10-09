"use client";
import { useEffect } from "react";
import { pageLoadStart, updatedWatched } from "@/Utils/AnimationFunctions";
import { useRouter } from "next/navigation";

const Modal = ({
  buttonLabel,
  message,
  setModalStatus,
  modalStatus,
  redirectUrl,
}) => {
  const router = useRouter();
  function closeModal() {
    document.body.setAttribute("data-form-cart-state", "");
    setModalStatus({
      success: false,
      error: false,
    });

    if (redirectUrl) {
      pageLoadStart({});
      setTimeout(() => {
        router.push(redirectUrl);
      }, 400);
    }
  }
  useEffect(() => {
    updatedWatched();
  }, [message]);

  useEffect(() => {
    setTimeout(() => {
      document.body.setAttribute("data-form-cart-state", "success");
      updatedWatched();
    }, 500);
  }, []);
  return (
    <div id="reloading-area">
      <div className="feedback-quote-request-confirmed" data-modal-area>
        <div className="feedback-container">
          <div className="feedback-item">
            <section className="feedback">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-6 offset-lg-3">
                    <div className="content" data-feedback-area>
                      <div class="container-img">
                        <img src="/images/logo.svg" class=" " alt="logo" />
                      </div>
                      {message && (
                        <h2
                          className="fs--40 mt-lg-105 mt-mobile-110 mb-lg-75 mb-mobile-90 text-center text-uppercase split-words"
                          data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                        >
                          {message}
                        </h2>
                      )}
                      {message !==
                        "Please wait, we're Creating your Account" && (
                          <div className="container-btn">
                            <button
                              onClick={closeModal}
                              className="btn-border-blue btn-my-account btn-back-to-categories mt-md-30 mt-phone-20 disable-click-outside"
                              data-close-feedback
                              data-aos="fadeIn .8s ease-in-out .2s, d:loop"
                            >
                              {modalStatus.error && (
                                <span>{buttonLabel || "Try Again!"}</span>
                              )}
                              {modalStatus.success && (
                                <span>{buttonLabel || "Ok"}</span>
                              )}
                            </button>
                          </div>
                        )}
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

export default Modal;
