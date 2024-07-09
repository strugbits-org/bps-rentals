import AnimateLink from "../Common/AnimateLink";

const Login = () => {
  return (
    <div className="container-sign-in">
      <div className="container-sign-in">
        <div className="wrapper-form-sign-in" data-form-sign-in-container>
          <form action="/my-account" className="form-sign-in form-base">
            <input type="hidden" name="login" value="[Login]" />
            <div className="container-input col-12">
              <label for="login-email">Email</label>
              <input
                id="login-email"
                name="email"
                type="email"
                placeholder="exemple@myemail.com"
                required
              />
            </div>
            <div className="container-input container-input-password col-12 pos-relative">
              <label for="login-password">Password</label>
              <input
                id="login-password"
                className="password"
                name="password"
                type="password"
                placeholder="* * * * * *"
                required
              />
              <div className="toggle-password">
                <i className="icon-password"></i>
                <i className="icon-password-hide"></i>
              </div>
              <a
                href="javascript:void(0)"
                className="btn-forgot-password password-link"
              >
                <span>Forgot your password?</span>
              </a>
            </div>
            <div className="container-submit col-12 mt-mobile-10">
              <button type="submit" className="bt-submit btn-blue w-100">
                <span>Sign In</span>
              </button>
            </div>
          </form>
          <h3 data-aos="fadeIn" data-form-error>
            Error, Try again!
          </h3>
        </div>
        <p className="text-agree font-2 fs--16 blue-1 lh-140 mt-lg-25 mt-mobile-30">
          By continuing, you are agreeing with
          <AnimateLink to="/terms-of-use" className="btn-underlined-blue-1">
            <span>Blueprint Studios Terms & Conditions</span>
          </AnimateLink>
          and
          <AnimateLink to="/privacy-policy" className="btn-underlined-blue-1">
            <span>Privacy Policy.</span>
          </AnimateLink>
        </p>
      </div>
      <div className="container-btn-create-account mt-auto d-flex-center pt-40">
        <span className="d-block fs-lg-35 fs-mobile-30 fw-600 text-center">
          New to Blueprint Studios?
        </span>
        <button className="btn-create-account btn-border-blue mx-auto mt-20">
          <i className="icon-arrow-diagonal-left"></i>
          <span>Create Your Account</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
