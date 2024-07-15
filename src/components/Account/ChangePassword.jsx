"use client";

import { useEffect } from "react";
import { markPageLoaded } from "@/Utils/AnimationFunctions";

const ChangePassword = ({ changePasswordPageContent }) => {
  console.log(changePasswordPageContent, "changePasswordPageContent>>>");
  useEffect(() => {
    markPageLoaded();
  }, []);
  return (
    <div class="wrapper-account">
      <div class="wrapper-top">
        <h1 class="fs--60 blue-1 split-words" data-aos="d:loop">
          {changePasswordPageContent && changePasswordPageContent.title}
        </h1>
      </div>
      <div
        class="wrapper-bottom mt-lg-90 mt-tablet-25 mt-phone-35"
        data-aos="fadeIn .8s ease-in-out .2s, d:loop"
      >
        <div class="container-password" data-form-container>
          <form class="form-password form-password">
            <div class="container-input container-input-password col-lg-12">
              <label for="login-password-old">
                {" "}
                {changePasswordPageContent &&
                  changePasswordPageContent.enterYourPasswordFieldLabel}
              </label>
              <input
                id="login-password-old"
                class="password"
                name="password"
                type="password"
                placeholder="* * * * * *"
                required
              />
              <div class="toggle-password">
                <i class="icon-password"></i>
                <i class="icon-password-hide"></i>
              </div>
            </div>
            <div class="container-input container-input-password col-lg-12">
              <label for="login-password-new-1">
                {changePasswordPageContent &&
                  changePasswordPageContent.enterYourNewPasswordFieldLabel}
              </label>
              <input
                id="login-password-new-1"
                class="password"
                name="password"
                type="password"
                placeholder="* * * * * *"
                required
              />
              <div class="toggle-password">
                <i class="icon-password"></i>
                <i class="icon-password-hide"></i>
              </div>
            </div>
            <div class="container-input container-input-password col-lg-12">
              <label for="login-password-new-2">
                {changePasswordPageContent &&
                  changePasswordPageContent.confirmYourNewPasswordFieldLabel}
              </label>
              <input
                id="login-password-new-2"
                class="password"
                name="password"
                type="password"
                placeholder="* * * * * *"
                required
              />
              <div class="toggle-password">
                <i class="icon-password"></i>
                <i class="icon-password-hide"></i>
              </div>
            </div>
            <div class="container-submit flex-mobile-center col-lg-12 mt-lg-50">
              <button type="submit" class="btn-2-blue">
                <span class="submit-text">
                  {changePasswordPageContent &&
                    changePasswordPageContent.resetPasswordButtonLabel}
                </span>
                <i class="icon-arrow-right-2"></i>
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

export default ChangePassword;
