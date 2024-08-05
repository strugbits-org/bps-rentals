"use client";
import { useState } from "react";
import Disclaimer from "./Disclaimer";
import { useCookies } from "react-cookie";
import { signInUser } from "@/Services/AuthApis";
import { pageLoadStart } from "@/Utils/AnimationFunctions";
import { useRouter } from "next/navigation";

const Login = ({
  loginModalContent,
  successMessageVisible,
  setSuccessMessageVisible,
  setErrorMessageVisible,
  setMessage,
  setToggleModal
}) => {
  const router = useRouter();

  const [cookies, setCookie] = useCookies(["authToken", "userData"]);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const LoginUser = async (e) => {
    e.preventDefault();
    if (submittingForm) return;

    setSubmittingForm(true);
    setErrorMessageVisible(false);
    const submenuLogin = document.querySelector('.submenu-login');
    const button = document.querySelector('.new-login-button');
    try {
      const response = await signInUser({
        email: formData.email,
        password: formData.password,
      });

      if (response?.error) {
        setMessage(response.message);
        setErrorMessageVisible(true);
        return;
      }

      const userToken = response.jwtToken;
      const userData = JSON.stringify(response.member);

      setCookie("authToken", userToken, {
        path: "/",
        expires: new Date("2099-01-01"),
      });

      setCookie("userData", userData, {
        path: "/",
        expires: new Date("2099-01-01"),
      });
      if (userToken) {
        pageLoadStart();
        submenuLogin.classList.remove('active');
        button.classList.remove('active');
        router.push("/my-account");

        setFormData({
          email: "",
          password: "",
        })
      }
    } catch (error) {
      console.log("Error during login:", error);
      setMessage("Invalid Credentials!");
      setErrorMessageVisible(true);
      submenuLogin.classList.add('active');
    } finally {
      setTimeout(() => {
        setSubmittingForm(false);
      }, 1500);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container-sign-in">
      <div className="container-sign-in">
        <div
          className="wrapper-form-sign-in"
          // data-form-sign-in-container
          onSubmit={LoginUser}
        >
          <form action="/my-account" className="form-sign-in form-base">
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
              <button
                onClick={() => setToggleModal("forgot-password")}
                className="btn-forgot-password password-link"
              >
                <span>
                  {" "}
                  {loginModalContent &&
                    loginModalContent.forgotYourPasswordLinkText}
                </span>
              </button>
            </div>
            <div className="container-submit col-12 mt-mobile-10">
              <button type="submit" className="bt-submit btn-blue w-100">
                <span>
                  {loginModalContent && loginModalContent.signInButtonLabel}
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

        {/* <p className="text-agree font-2 fs--16 blue-1 lh-140 mt-lg-25 mt-mobile-30">
          By continuing, you are agreeing with
          <AnimateLink to="/terms-of-use" className="btn-underlined-blue-1">
            <span>Blueprint Studios Terms & Conditions</span>
          </AnimateLink>
          and
          <AnimateLink to="/privacy-policy" className="btn-underlined-blue-1">
            <span>Privacy Policy.</span>
          </AnimateLink>
        </p> */}
      </div>
      <div className="container-btn-create-account mt-auto d-flex-center pt-40">
        <span className="d-block fs-lg-35 fs-mobile-30 fw-600 text-center">
          New to Blueprint Studios?
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
