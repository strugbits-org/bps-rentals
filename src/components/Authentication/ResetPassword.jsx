"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { resetPassword } from "@/Services/AuthApis";
import { markPageLoaded } from "@/Utils/AnimationFunctions";
import ErrorModal from "../Common/Modals/ErrorModal";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [errorMessageVisible, setErrorMessageVisible] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [message, setMessage] = useState("Message");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    setDisabled(true);

    try {
      e?.preventDefault();
      setMessage("");
      const { password, confirmPassword } = formData;
      const token = searchParams.get("token");
      if (password !== confirmPassword) {
        setMessage("Passwords should be matched.");
        setErrorMessageVisible(true);
        return;
      }
      const response = await resetPassword(
        { password, confirmPassword },
        token
      );
      if (response?.error) {
        setMessage(response.message);
        setErrorMessageVisible(true);
        return;
      }
      setMessage("Your password has been reset successfully.");
      setSuccessMessageVisible(true);
    } catch (error) {
      console.log("Error during confirm email:", error);
      setErrorMessageVisible(true);
      setMessage(error?.message);
    } finally {
      setDisabled(false);
    }
  };

  const handleClose = () => {
    router.push("/#sign-in");
  };

  useEffect(() => {
    if (searchParams.get("token")) {
      markPageLoaded();
    } else {
      handleClose();
    }
  }, []);

  return (
    <div className="reset-password-main">
      {errorMessageVisible && (
        <ErrorModal
          message={message}
          setErrorMessageVisible={setErrorMessageVisible}
        />
      )}
      {/* {successMessageVisible && (
        <SuccessModal
          message={message}
          setSuccessMessageVisible={setSuccessMessageVisible}
          onClose={handleClose}
        />
      )} */}

      <div className="reset-password-form-container">
        <div className="reset-password-form-logos">
          <div class="container-img">
            <img src="/images/logo.svg" class=" " />
          </div>
          <h2
            class="fs--30 mt-lg-30 mt-mobile-30 mb-lg-30 mb-mobile-30 text-center text-uppercase split-words"
            data-aos="d:loop"
          >
            Reset Password
          </h2>
        </div>
        {/* <p
          className="container-input container-input-password "
          style={{
            fontSize: "4rem",
          }}
        >
          Description
        </p> */}
        <form className="form-sign-in form-base" onSubmit={handleSubmit}>
          <div className="container-input container-input-password col-12 pos-relative">
            <label htmlFor="login-password">New Password</label>
            <input
              id="login-password"
              className="password"
              name="password"
              type="password"
              placeholder="* * * * * *"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div
              onClick={() => setShowPassword((prev) => !prev)}
              className={`toggle-password ${showPassword ? "show" : ""}`}
            >
              <i className="icon-password"></i>
              <i className="icon-password-hide"></i>
            </div>
          </div>
          <div className="container-input container-input-password col-12">
            <label htmlFor="confirmPassword">Confirm new Password</label>
            <input
              id="confirmPassword"
              className="password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="* * * * * *"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <div
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className={`toggle-password ${showConfirmPassword ? "show" : ""}`}
            >
              <i className="icon-password"></i>
              <i className="icon-password-hide"></i>
            </div>
          </div>
          <div className="container-submit col-12 mt-mobile-10">
            <button
              disabled={isDisabled}
              type="submit"
              className="bt-submit btn-blue w-100"
            >
              <span>Reset Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
