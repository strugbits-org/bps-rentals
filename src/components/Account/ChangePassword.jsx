"use client";

import { useEffect } from "react";
import { markPageLoaded } from "@/Utils/AnimationFunctions";

const ChangePassword = () => {
  useEffect(() => {
    markPageLoaded();
  }, []);
  return (
    <div class="wrapper-account">
      <div class="wrapper-top">
        <h1 class="fs--60 blue-1 split-words" data-aos="d:loop">Change Password
        </h1>
      </div>
      <div class="wrapper-bottom mt-lg-90 mt-tablet-25 mt-phone-35"
        data-aos="fadeIn .8s ease-in-out .2s, d:loop">
        <div class="container-password" data-form-container>
          <form class="form-password form-password">
            <input type="hidden" name="subject" value="[password]" />
            <div class="container-input container-input-password col-lg-12">
              <label for="login-password-old">Enter your password</label>
              <input id="login-password-old" class="password" name="password"
                type="password" placeholder="* * * * * *" required />
              <div class="toggle-password">
                <i class="icon-password"></i>
                <i class="icon-password-hide"></i>
              </div>
            </div>
            <div class="container-input container-input-password col-lg-12">
              <label for="login-password-new-1">Enter your NEW password</label>
              <input id="login-password-new-1" class="password" name="password"
                type="password" placeholder="* * * * * *" required />
              <div class="toggle-password">
                <i class="icon-password"></i>
                <i class="icon-password-hide"></i>
              </div>
            </div>
            <div class="container-input container-input-password col-lg-12">
              <label for="login-password-new-2">Confirm your NEW password</label>
              <input id="login-password-new-2" class="password" name="password"
                type="password" placeholder="* * * * * *" required />
              <div class="toggle-password">
                <i class="icon-password"></i>
                <i class="icon-password-hide"></i>
              </div>
            </div>
            <div class="container-submit flex-mobile-center col-lg-12 mt-lg-50">
              <button type="submit" class="btn-2-blue">
                <span class="submit-text">
                  Reset password
                </span>
                <i class="icon-arrow-right-2"></i>
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

export default ChangePassword;
