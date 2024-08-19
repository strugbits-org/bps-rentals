"use client";
import { useEffect, useState } from "react";

import { signUpUser } from "@/Services/AuthApis";
import Disclaimer from "./Disclaimer";
import { useRouter } from "next/navigation";
import { pageLoadStart } from "@/Utils/AnimationFunctions";
import { useCookies } from "react-cookie";

const CreateAccount = ({
  createAccountModalContent,
  setMessage,
  setModalState,
}) => {
  const router = useRouter();

  const [cookies, setCookie] = useCookies(["authToken", "userData"]);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Called");

    if (submittingForm) return;
    setSubmittingForm(true);
    setModalState({ success: true, error: false });

    const submenuLogin = document.querySelector(".submenu-login");
    try {
      setMessage("Please wait, we're Creating your Account");

      const userData = {
        email: formData.email,
        password: formData.password,
        firstName: formData.first_name,
        lastName: formData.last_name,
        phone: formData.phone,
      };

      const response = await signUpUser(userData);
      if (response.error) {
        setMessage(response.message);
        setModalState({ success: false, error: true });
        return;
      }

      if (!response.error) {
        setModalState({ success: true, error: false });

        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          password: "",
        });
      }
      const authToken = response.jwtToken;
      const newUserData = JSON.stringify(response.member);
      const userTokens = JSON.stringify(response.userTokens);

      setCookie("authToken", authToken, {
        path: "/",
        expires: new Date("2099-01-01"),
      });
      setCookie("userData", newUserData, {
        path: "/",
        expires: new Date("2099-01-01"),
      });
      setCookie("userTokens", userTokens, {
        path: "/",
        expires: new Date("2099-01-01"),
      });

      if (authToken) {
        pageLoadStart();
        submenuLogin.classList.remove("active");
        router.push("/my-account");
      }

      return response;
    } catch (error) {
      setMessage("Something Went Wrong");
      setModalState({ success: false, error: true });
    } finally {
      setTimeout(() => {
        setSubmittingForm(false);
      }, 1500);
    }
  };

  return (
    <div className="container-create-account d-none">
      <div className="container-account">
        <form
          className="form-account form-create-account "
          onSubmit={handleSubmit}
        >
          <div className="container-input col-md-12">
            <label htmlFor="create-account-first-name">
              {createAccountModalContent &&
                createAccountModalContent.firstNameFieldLabel}
            </label>
            <input
              id="create-account-first-name"
              name="first_name"
              type="text"
              placeholder="Name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="container-input col-md-12">
            <label htmlFor="create-account-last-name">
              {createAccountModalContent &&
                createAccountModalContent.lastNameFieldLabel}
            </label>
            <input
              id="create-account-last-name"
              name="last_name"
              type="text"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              required
            />
          </div>
          <div className="container-input col-md-12">
            <label htmlFor="create-account-email">
              {createAccountModalContent &&
                createAccountModalContent.emailFieldLabel}
            </label>
            <input
              id="create-account-email"
              name="email"
              type="email"
              placeholder="exemple@myemail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="container-input col-md-12">
            <label htmlFor="create-account-phone">
              {createAccountModalContent &&
                createAccountModalContent.phoneNumberFieldLabel}
            </label>
            <input
              id="create-account-phone"
              name="phone"
              type="tel"
              placeholder="+1 (415) 000-0000"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="container-input col-md-12">
            <label htmlFor="create-account-phone">
              {createAccountModalContent && createAccountModalContent.password}
            </label>
            <input
              id="create-account-phone"
              name="password"
              placeholder="* * * * * *"
              type={showPassword ? "text" : "password"}
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
          <div className="container-submit flex-center col-lg-12 mt-lg-5 mt-mobile-10">
            <button
              type="submit"
              className="bt-submit btn-blue w-100 mt-tablet-10 w-mobile-100"
            >
              <span>
                {createAccountModalContent &&
                  createAccountModalContent.createAccountButtonLabel}
              </span>
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
      <Disclaimer
        textClass="btn-underlined-white"
        data={createAccountModalContent.disclaimer}
      />
    </div>
  );
};

export default CreateAccount;
