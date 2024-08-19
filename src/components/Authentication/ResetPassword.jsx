"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { markPageLoaded, pageLoadStart } from "@/Utils/AnimationFunctions";
import { resetPassword } from "@/Services/AuthApis";
import Modal from "../Common/Modals/Modal";

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const userId = searchParams.get("reset-id");

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [modalState, setModalState] = useState({
    success: false,
    error: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDisabled) return;
    setDisabled(true);

    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setMessage("Passwords should be matched.");
      setModalState({ success: false, error: true });
      setDisabled(false);
      return;
    }

    try {
      const response = await resetPassword(
        { password, confirmPassword },
        userId
      );

      if (response?.error) {
        setMessage(response.message);
        setModalState({ success: false, error: true });
      } else {
        setMessage("Your password has been reset successfully.");
        setModalState({ success: true, error: false });
        pageLoadStart();
        router.push("/");
      }
    } catch (error) {
      console.error("Error during password reset:", error);
      setMessage(error.message);
      setModalState({ success: false, error: true });
    } finally {
      setDisabled(false);
    }
  };

  const handleClose = () => {
    router.push("/");
  };

  useEffect(() => {
    if (userId) {
      markPageLoaded();
    } else {
      handleClose();
    }
  }, [userId]);

  return (
    <div className="reset-password-main">
      {modalState.error && (
        <Modal
          message={message}
          setModalStatus={setModalState}
          modalStatus={modalState}
        />
      )}

      <div className="reset-password-form-container">
        <div className="reset-password-form-logos">
          <div className="container-img">
            <img src="/images/logo.svg" alt="Logo" />
          </div>
          <h2
            className="fs--30 mt-lg-30 mt-mobile-30 mb-lg-30 mb-mobile-30 text-center text-uppercase split-words"
            data-aos="d:loop"
          >
            Reset Password
          </h2>
        </div>

        <form className="form-sign-in form-base" onSubmit={handleSubmit}>
          <div className="container-input container-input-password col-12 pos-relative">
            <label htmlFor="login-password">New Password</label>
            <input
              id="login-password"
              className="password"
              name="password"
              type={showNewPassword ? "text" : "password"}
              placeholder="* * * * * *"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <div
              onClick={() => setShowNewPassword((prev) => !prev)}
              className={`toggle-password ${showNewPassword ? "show" : ""}`}
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
