import AnimateLink from "../Common/AnimateLink";
import Disclaimer from "./Disclaimer";

const CreateAccount = ({ createAccountModalContent }) => {
  return (
    <div className="container-create-account d-none">
      <div className="container-account" data-form-container>
        <form
          className="form-account form-create-account "
          data-redirect="my-account.html"
        >
          <input type="hidden" name="subject" value="[account]" />
          <div className="container-input col-md-12">
            <label for="create-account-first-name">
              {createAccountModalContent &&
                createAccountModalContent.firstNameFieldLabel}
            </label>
            <input
              id="create-account-first-name"
              name="first_name"
              type="text"
              placeholder="Name"
              required
            />
          </div>
          <div className="container-input col-md-12">
            <label for="create-account-last-name">
              {createAccountModalContent &&
                createAccountModalContent.lastNameFieldLabel}
            </label>
            <input
              id="create-account-last-name"
              name="last_name"
              type="text"
              placeholder="Last Name"
              required
            />
          </div>
          <div className="container-input col-md-12">
            <label for="create-account-email">
              {createAccountModalContent &&
                createAccountModalContent.emailFieldLabel}
            </label>
            <input
              id="create-account-email"
              name="email"
              type="email"
              placeholder="exemple@myemail.com"
              required
            />
          </div>
          <div className="container-input col-md-12">
            <label for="create-account-phone">
              {createAccountModalContent &&
                createAccountModalContent.phoneNumberFieldLabel}
            </label>
            <input
              id="create-account-phone"
              name="phone"
              type="tel"
              placeholder="+1 (415) 000-0000"
              required
            />
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
