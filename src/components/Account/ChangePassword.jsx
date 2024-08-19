"use client";
import { useEffect, useState } from "react";

import Modal from "../Common/Modals/Modal";

import { markPageLoaded } from "@/Utils/AnimationFunctions";
import { changePassword } from "@/Services/AuthApis";

const ChangePassword = ({ changePasswordPageContent }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [modalState, setModalState] = useState({
    success: false,
    error: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isButtonDisabled) return;
    setMessage("");
    setIsButtonDisabled(true);
    try {
      if (formData.newPassword !== formData.confirmNewPassword) {
        setMessage("PASSWORDS SHOULD BE MATCHED.");
        setModalState({ success: false, error: true });
        return;
      }
      const response = await changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.confirmNewPassword,
      });

      if (response?.error) {
        setMessage(response.message);
        setModalState({ success: false, error: true });

        return;
      }
      setModalState({ success: true, error: false });
    } catch (err) {
      setMessage("An error occurred. Please try again.");
      setModalState({ success: false, error: true });
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  useEffect(() => {
    setTimeout(markPageLoaded, 200);
  }, []);

  useEffect(() => {
    if (modalState.success) {
      const timer = setTimeout(() => {
        setModalState({ success: false, error: false });
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [modalState]);
  return (
    <>
      {modalState.error && (
        <Modal
          message={message}
          setModalStatus={setModalState}
          modalStatus={modalState}
        />
      )}
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
          <div
            class="container-password"
            data-form-state={modalState.success ? "success" : ""}
          >
            <form class="form-password form-password" onSubmit={handleSubmit}>
              {[
                {
                  label:
                    changePasswordPageContent &&
                    changePasswordPageContent.enterYourPasswordFieldLabel,
                  name: "oldPassword",
                  id: "login-password-old",
                },
                {
                  label:
                    changePasswordPageContent &&
                    changePasswordPageContent.enterYourNewPasswordFieldLabel,
                  name: "newPassword",
                  id: "login-password-new-1",
                },
                {
                  label:
                    changePasswordPageContent &&
                    changePasswordPageContent.confirmYourNewPasswordFieldLabel,
                  name: "confirmNewPassword",
                  id: "login-password-new-2",
                },
              ].map(({ label, name, id }) => (
                <div
                  className="container-input container-input-password col-lg-12"
                  key={id}
                >
                  <label htmlFor={id}>{label}</label>
                  <input
                    id={id}
                    className="password"
                    name={name}
                    type={showPassword[name] ? "text" : "password"}
                    placeholder="* * * * * *"
                    required
                    value={formData[name]}
                    onChange={handleChange}
                  />
                  <div
                    onClick={() => togglePassword(name)}
                    className={`toggle-password ${
                      showPassword[name] ? "show" : ""
                    }`}
                  >
                    <i className="icon-password"></i>
                    <i className="icon-password-hide"></i>
                  </div>
                </div>
              ))}

              <div class="container-submit flex-mobile-center col-lg-12 mt-lg-50">
                <button
                  type="submit"
                  class="btn-2-blue"
                  disabled={isButtonDisabled}
                >
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
    </>
  );
};

export default ChangePassword;
