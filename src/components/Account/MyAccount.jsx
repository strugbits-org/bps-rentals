"use client";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import Modal from "../Common/Modals/Modal";

import { updateProfile } from "@/Services/AuthApis";
import useUserData from "@/Hooks/useUserData";

import {
  markPageLoaded,
  pageLoadEnd,
  pageLoadStart,
} from "@/Utils/AnimationFunctions";

const MyAccount = ({ myAccountPageContent }) => {
  useEffect(() => {
    setTimeout(markPageLoaded, 200);
  }, []);

  const [cookies, setCookie] = useCookies(["authToken", "userData"]);

  const { firstName, lastName, email, phone } = useUserData();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [initialData, setInitialData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });
  const [modalState, setModalState] = useState({
    success: false,
    error: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isButtonDisabled) return;
    setIsButtonDisabled(true);
    try {
      const response = await updateProfile(formData);
      if (response?.error) {
        setMessage(response.message);
        setModalState({ success: false, error: true });
        return;
      }
      setModalState({ success: true, error: false });

      const userData = JSON.stringify(response.updatedMember);

      setCookie("userData", userData, {
        path: "/",
        expires: new Date("2099-01-01"),
      });
      setInitialData(formData);
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error("Error updating profile", error);
      setModalState({ success: false, error: true });
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const discardChanges = (e) => {
    e.preventDefault();
    pageLoadStart();
    setTimeout(() => {
      setFormData(initialData);
      pageLoadEnd();
    }, 900);
  };

  useEffect(() => {
    const userData = {
      firstName: firstName || "",
      lastName: lastName || "",
      phone: phone || "",
    };
    setFormData(userData);
    setInitialData(userData);
  }, [firstName, lastName, phone]);

  useEffect(() => {
    if (modalState.success) {
      const timer = setTimeout(() => {
        setModalState({ success: false, error: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [modalState]);
  useEffect(() => {
    setModalState({
      success: false,
      error: false,
    });
  }, []);
  return (
    <>
      {modalState.error && (
        <Modal
          message={message}
          setModalStatus={setModalState}
          modalStatus={modalState}
        />
      )}

      <div className="wrapper-account">
        <div className="wrapper-top" data-aos="d:loop">
          <h1 className="fs--60 blue-1 split-words" data-aos="d:loop">
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
            <span className="email">{email}</span>
            <p className="font-2 fs--16">
              {" "}
              {myAccountPageContent && myAccountPageContent.loginEmailMessage}
            </p>
          </div>
          <div
            className="container-account"
            // data-form-container
            data-form-state={modalState.success ? "success" : ""}
          >
            <form
              className="form-account form-my-account"
              onSubmit={handleSubmit}
            >
              <div className="container-input col-md-6">
                <label htmlFor="account-first-name">
                  {" "}
                  {myAccountPageContent &&
                    myAccountPageContent.firstNameFieldLabel}
                </label>
                <input
                  id="account-first-name"
                  name="firstName"
                  type="text"
                  placeholder="Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="container-input col-md-6">
                <label htmlFor="account-last-name">
                  {" "}
                  {myAccountPageContent &&
                    myAccountPageContent.lastNameFieldLabel}
                </label>
                <input
                  id="account-last-name"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="container-input col-md-6">
                <label htmlFor="account-email">
                  {" "}
                  {myAccountPageContent && myAccountPageContent.emailFieldLabel}
                </label>
                <input
                  id="account-email"
                  name="email"
                  type="email"
                  value={email}
                  placeholder="exemple@myemail.com"
                  disabled
                />
              </div>
              <div className="container-input col-md-6">
                <label htmlFor="account-phone">
                  {" "}
                  {myAccountPageContent &&
                    myAccountPageContent.phoneNumberFieldLabel}
                </label>
                <input
                  id="account-phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (415) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="container-discard flex-mobile-center order-mobile-2 mt-mobile-15">
                <button
                  onClick={discardChanges}
                  className="btn-1 btn-border-blue btn-small btn-discard mr-10"
                >
                  <div className="split-chars">
                    <span>
                      {myAccountPageContent &&
                        myAccountPageContent.discardButtonLabel}
                    </span>
                  </div>
                </button>
              </div>
              <div className="container-submit flex-mobile-center order-mobile-1">
                <button
                  type="submit"
                  className="bt-submit btn-2-blue w-lg-100"
                  disabled={isButtonDisabled}
                >
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
    </>
  );
};

export default MyAccount;
