const ForgotPassword = () => {
  return (
    <div className="container-forgot-password d-none">
      <div className="container-password">
        <div className="wrapper-form-forgot-password" data-form-container>
          <form
            className="form-forgot-password form-base"
            data-redirect="my-account.html"
          >
            <input
              type="hidden"
              name="forgot_password"
              value="[Forgot Password]"
            />
            <div className="container-input col-12">
              <label for="forgot-password-login-email">Email</label>
              <input
                id="forgot-password-login-email"
                name="email"
                type="email"
                placeholder="exemple@myemail.com"
                required
              />
            </div>
            <div className="container-submit col-12 mt-mobile-10">
              <button type="submit" className="bt-submit btn-blue w-100">
                <span>Send</span>
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
