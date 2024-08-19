"use client";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

import { pageLoadStart } from "@/Utils/AnimationFunctions";
import { signInUser } from "@/Services/AuthApis";
import Disclaimer from "./Disclaimer";

const Login = ({
  loginModalContent,
  setMessage,
  setToggleModal,
  setModalState,
}) => {
  const router = useRouter();
  const [cookies, setCookie] = useCookies(["authToken", "userData"]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const LoginUser = async (e) => {
    e.preventDefault();
    if (isButtonDisabled) return;
    setIsButtonDisabled(true);
    const submenuLogin = document.querySelector(".submenu-login");
    const button = document.querySelector(".new-login-button");
    try {
      const response = await signInUser({
        email: formData.email,
        password: formData.password,
      });
      if (response && response.error) {
        setMessage(response.message);
        setModalState({ success: false, error: true });
        return;
      }

      if (response) {
        const authToken = response.jwtToken;
        const userData = JSON.stringify(response.member);
        const userTokens = JSON.stringify(response.userTokens);
        setCookie("authToken", authToken, {
          path: "/",
          expires: new Date("2099-01-01"),
        });
        setCookie("userData", userData, {
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
          button.classList.remove("active");
          router.push("/my-account");
          setFormData({
            email: "",
            password: "",
          });
        }
      }
    } catch (error) {
      setMessage("Error during login:", error);
      setModalState({ success: false, error: true });
      submenuLogin.classList.add("active");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="container-sign-in">
      <div className="container-sign-in">
        <div className="wrapper-form-sign-in">
          <form onSubmit={LoginUser} className="form-sign-in form-base">
            <div className="container-input col-12">
              <label htmlFor="login-email">
                {loginModalContent && loginModalContent.emailFieldLabel}
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="exemple@myemail.com"
                required
              />
            </div>
            <div className="container-input container-input-password col-12 pos-relative">
              <label htmlFor="login-password">
                {" "}
                {loginModalContent && loginModalContent.passwordFieldLabel}
              </label>
              <input
                id="login-password"
                className="password"
                name="password"
                type={showPassword ? "text" : "password"}
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
              <span
                onClick={() => setToggleModal("forgot-password")}
                className="cursor-pointer btn-forgot-password password-link"
              >
                <span>
                  {" "}
                  {loginModalContent &&
                    loginModalContent.forgotYourPasswordLinkText}
                </span>
              </span>
            </div>
            <div className="container-submit col-12 mt-mobile-10">
              <button
                type="submit"
                className="bt-submit btn-blue w-100"
                disabled={isButtonDisabled}
              >
                <span>
                  {loginModalContent && !isButtonDisabled
                    ? loginModalContent.signInButtonLabel
                    : "Please Wait!"}
                </span>
              </button>
            </div>
          </form>
          <h3 data-aos="fadeIn" data-form-error>
            Error, Try again!
          </h3>
        </div>
        <Disclaimer
          textClass="btn-underlined-blue-1"
          data={loginModalContent.disclaimer}
        />
      </div>
      <div className="container-btn-create-account mt-auto d-flex-center pt-40">
        <span className="d-block fs-lg-35 fs-mobile-30 fw-600 text-center">
          {loginModalContent && loginModalContent.taglineSignup}
        </span>
        <button
          onClick={() => setToggleModal("create-account")}
          className="btn-create-account btn-border-blue mx-auto mt-20"
        >
          <i className="icon-arrow-diagonal-left"></i>
          <span>
            {" "}
            {loginModalContent && loginModalContent.createAccountButtonLabel}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;
