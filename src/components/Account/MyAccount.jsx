"use client";
import { useEffect } from "react";
import { markPageLoaded } from "@/Utils/AnimationFunctions";

const MyAccount = ({ myAccountPageContent }) => {
  useEffect(() => {
    markPageLoaded();
  }, []);
  return (
    <div className="wrapper-account">
      <div className="wrapper-top" data-aos="d:loop">
        <h1 className="fs--60 blue-1split-words" data-aos="d:loop">
          {myAccountPageContent && myAccountPageContent.title}
        </h1>
        <p
          className="font-2 fs--16 mt-10"
          data-aos="fadeIn .8s ease-in-out .4s, d:loop"
        >
          {myAccountPageContent && myAccountPageContent.description}
        </p>
        <h2
          className="font-2 fs--16 text-uppercase mt-lg-55 mt-mobile-35 split-words"
          data-aos="d:loop"
        >
          {myAccountPageContent && myAccountPageContent.subTitle}
        </h2>
        <p
          className="font-2 fs--16 mt-10"
          data-aos="fadeIn .8s ease-in-out .4s, d:loop"
        >
          {myAccountPageContent && myAccountPageContent.subDescription}
        </p>
      </div>
      <div
        className="wrapper-bottom"
        data-aos="fadeIn .8s ease-in-out .4s, d:loop"
      >
        <div className="container-text mb-md-60 mb-phone-35">
          <p className="font-2 fs--16">
            {" "}
            {myAccountPageContent && myAccountPageContent.loginEmailLabel}:
          </p>
          <span className="email">gabriel@petrikor.design</span>
          <p className="font-2 fs--16">
            {" "}
            {myAccountPageContent && myAccountPageContent.loginEmailMessage}
          </p>
        </div>
        <div className="container-account" data-form-container>
          <form
            className="form-account form-my-account"
            data-redirect="my-account.html"
          >
            <input type="hidden" name="subject" value="[account]" />
            <div className="container-input col-md-6">
              <label for="account-first-name">
                {" "}
                {myAccountPageContent &&
                  myAccountPageContent.firstNameFieldLabel}
              </label>
              <input
                id="account-first-name"
                name="first_name"
                type="text"
                placeholder="Name"
                required
              />
            </div>
            <div className="container-input col-md-6">
              <label for="account-last-name">
                {" "}
                {myAccountPageContent &&
                  myAccountPageContent.lastNameFieldLabel}
              </label>
              <input
                id="account-last-name"
                name="last_name"
                type="text"
                placeholder="Last Name"
                required
              />
            </div>
            <div className="container-input col-md-6">
              <label for="account-email">
                {" "}
                {myAccountPageContent && myAccountPageContent.emailFieldLabel}
              </label>
              <input
                id="account-email"
                name="email"
                type="email"
                placeholder="exemple@myemail.com"
                required
              />
            </div>
            <div className="container-input col-md-6">
              <label for="account-phone">
                {" "}
                {myAccountPageContent &&
                  myAccountPageContent.phoneNumberFieldLabel}
              </label>
              <input
                id="account-phone"
                name="phone"
                type="tel"
                placeholder="+1 (415) 000-0000"
                required
              />
            </div>
            <div className="container-discard flex-mobile-center order-mobile-2 mt-mobile-15">
              <a
                href="my-account.html"
                type=""
                className="btn-1 btn-border-blue btn-small btn-discard mr-10"
              >
                <div className="split-chars">
                  <span>
                    {myAccountPageContent &&
                      myAccountPageContent.discardButtonLabel}
                  </span>
                </div>
              </a>
            </div>
            <div className="container-submit flex-mobile-center order-mobile-1">
              <button type="submit" className="bt-submit btn-2-blue w-lg-100">
                <span>
                  {myAccountPageContent &&
                    myAccountPageContent.updateButtonLabel}
                </span>
                <i className="icon-arrow-right-2"></i>
              </button>
            </div>
          </form>
          <h3 data-aos="fadeIn" data-form-error>
            Error, Try again!
          </h3>
          <h3 data-aos="fadeIn" data-form-success>
            Success!
          </h3>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
