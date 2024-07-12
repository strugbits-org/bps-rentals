"use client";
import { useEffect } from "react";
import { markPageLoaded } from "@/Utils/AnimationFunctions";

const MyAccount = () => {
  useEffect(() => {
    markPageLoaded();
  }, []);
  return (
    <div className="wrapper-account">
      <div className="wrapper-top" data-aos="d:loop">
        <h1 className="fs--60 blue-1split-words" data-aos="d:loop">My Account</h1>
        <p className="font-2 fs--16 mt-10" data-aos="fadeIn .8s ease-in-out .4s, d:loop">
          View and edit your personal info below.</p>
        <h2 className="font-2 fs--16 text-uppercase mt-lg-55 mt-mobile-35 split-words"
          data-aos="d:loop">Account</h2>
        <p className="font-2 fs--16 mt-10" data-aos="fadeIn .8s ease-in-out .4s, d:loop">
          Update your
          personal information.</p>
      </div>
      <div className="wrapper-bottom" data-aos="fadeIn .8s ease-in-out .4s, d:loop">
        <div className="container-text mb-md-60 mb-phone-35">
          <p className="font-2 fs--16">Login Email:</p>
          <span className="email">gabriel@petrikor.design</span>
          <p className="font-2 fs--16">Your Login email can’t be changed</p>
        </div>
        <div className="container-account" data-form-container>
          <form className="form-account form-my-account" data-redirect="my-account.html">
            <input type="hidden" name="subject" value="[account]" />
            <div className="container-input col-md-6">
              <label for="account-first-name">First name</label>
              <input id="account-first-name" name="first_name" type="text"
                placeholder="Name" required />
            </div>
            <div className="container-input col-md-6">
              <label for="account-last-name">Last name</label>
              <input id="account-last-name" name="last_name" type="text"
                placeholder="Last Name" required />
            </div>
            <div className="container-input col-md-6">
              <label for="account-email">E-mail</label>
              <input id="account-email" name="email" type="email"
                placeholder="exemple@myemail.com" required />
            </div>
            <div className="container-input col-md-6">
              <label for="account-phone">Phone Number</label>
              <input id="account-phone" name="phone" type="tel"
                placeholder="+1 (415) 000-0000" required />
            </div>
            <div
              className="container-discard flex-mobile-center order-mobile-2 mt-mobile-15">
              <a href="my-account.html" type=""
                className="btn-1 btn-border-blue btn-small btn-discard mr-10">
                <div className="split-chars">
                  <span>Discard</span>
                </div>
              </a>
            </div>
            <div className="container-submit flex-mobile-center order-mobile-1">
              <button type="submit" className="bt-submit btn-2-blue w-lg-100">
                <span>
                  Update info
                </span>
                <i className="icon-arrow-right-2"></i>
              </button>
            </div>
          </form>
          <h3 data-aos="fadeIn" data-form-error>Error, Try again!</h3>
          <h3 data-aos="fadeIn" data-form-success>Success!</h3>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
