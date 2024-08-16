"use client";
import { useEffect, useState } from "react";

import { signUpUser } from "@/Services/AuthApis";
import Disclaimer from "./Disclaimer";
import { useRouter } from "next/navigation";
import { pageLoadStart } from "@/Utils/AnimationFunctions";
import { useCookies } from "react-cookie";

const CreateAccount = ({
  createAccountModalContent,
  successMessageVisible,
  setSuccessMessageVisible,
  setErrorMessageVisible,
  setMessage,
}) => {
  const router = useRouter();

  const [submittingForm, setSubmittingForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [cookies, setCookie] = useCookies(["authToken", "userData"]);

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
    if (submittingForm) return;
    setSubmittingForm(true);
    setErrorMessageVisible(true);
    setSuccessMessageVisible(false);
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
        setErrorMessageVisible(true);
        return;
      }

      if (!response.error) {
        setSuccessMessageVisible(true);
        setErrorMessageVisible(false);
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

      console.log("Auth Token:", authToken);

      if (authToken) {
        pageLoadStart();
        submenuLogin.classList.remove("active");
        router.push("/my-account");
      }

      return response;
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something Went Wrong");
      setSuccessMessageVisible(false);
      setErrorMessageVisible(true);
    } finally {
      setTimeout(() => {
        setSubmittingForm(false);
      }, 1500);
    }
  };

  useEffect(() => {
    if (successMessageVisible) {
      const timer = setTimeout(() => {
        setSuccessMessageVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessageVisible]);
  return (
    <div className="container-create-account d-none">
      <div
        className="container-account"
        data-form-state={successMessageVisible ? "success" : ""}
      >
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
      {/* <p className="text-agree font-2 fs--16 blue-1 lh-140 mt-lg-25 mt-mobile-20">
        By continuing, you are agreeing with{" "}
        <AnimateLink to="/terms-of-use" className="btn-underlined-white">
          <span>Blueprint Studios Terms & Conditions</span>
        </AnimateLink>
        and
        <AnimateLink to="/privacy-policy" className="btn-underlined-white">
          <span>Privacy Policy.</span>
        </AnimateLink>
      </p> */}
    </div>
  );
};

export default CreateAccount;
