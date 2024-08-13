import { confirmEmail } from "@/Services/AuthApis";
import { useState } from "react";

const ForgotPassword = ({
  forgotPasswordModalContent,
  successMessageVisible,
  setSuccessMessageVisible,
  setErrorMessageVisible,
  setMessage,
}) => {
  const [isDisabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleSubmit = async (e) => {
    setDisabled(true);
    try {
      e.preventDefault();
      setMessage("");
      const response = await confirmEmail({ email: formData?.email });
      if (response?.error) {
        setMessage(response.message);
        setErrorMessageVisible(true);
        return;
      }

      setMessage("Reset password link has been sent to your email");
      setSuccessMessageVisible(true);
      // setRedirection("/");
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log("Error during confirm email:", error);
      setErrorMessageVisible(true);
      setMessage(error?.message);
    } finally {
      setDisabled(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="container-forgot-password d-none">
      <div className="container-password">
        <div className="wrapper-form-forgot-password" data-form-container>
          <form
            className="form-forgot-password form-base"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="forgot_password" />
            <div className="container-input col-12">
              <label htmlFor="forgot-password-login-email">
                {forgotPasswordModalContent &&
                  forgotPasswordModalContent.emailFieldLabel}
              </label>
              <input
                id="forgot-password-login-email"
                name="email"
                type="email"
                placeholder="example@myemail.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>
            <div className="container-submit col-12 mt-mobile-10">
              <button
                type="submit"
                disabled={isDisabled}
                className="bt-submit btn-blue w-100"
              >
                <span>
                  {forgotPasswordModalContent &&
                    forgotPasswordModalContent.sendButtonLabel}
                </span>
              </button>
            </div>
          </form>
          <h3 data-aos="fadeIn" data-form-error>
            Error, Try again!
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
