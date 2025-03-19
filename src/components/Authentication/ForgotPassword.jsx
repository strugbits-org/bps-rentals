import { confirmEmail } from "@/Services/AuthApis";
import { isValidEmail } from "@/Utils/AuthApisUtils";
import logError from "@/Utils/ServerActions";
import { useState } from "react";

const ForgotPassword = ({
  forgotPasswordModalContent,
  setMessage,
  setModalState,
}) => {
  const [isDisabled, setDisabled] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isDisabled) return;
    setDisabled(true);
    try {
      const invalidEmail = isValidEmail(formData?.email);
      if (!invalidEmail) {
        throw new Error("Please enter a valid email address");
      }
      setMessage("");
      const response = await confirmEmail({ email: formData?.email });

      if (response?.error) {
        throw new Error(response.message);
      }

      setMessage("Reset password link has been sent to your email");
      setModalState({ success: true, error: false });

      setFormData({
        email: "",
      });
    } catch (error) {
      logError("Error sending confirmation email", error);
      setModalState({ success: false, error: true });
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
                  {forgotPasswordModalContent && !isDisabled
                    ? forgotPasswordModalContent.sendButtonLabel
                    : "Sending Email..."}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
