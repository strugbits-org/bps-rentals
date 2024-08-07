"use client";
import { useEffect } from "react";
import { markPageLoaded } from "@/Utils/AnimationFunctions";

const QuoteRequestPage = ({ quoteRequestPageContent }) => {
  useEffect(() => {
    setTimeout(() => {
      markPageLoaded();
    }, 1000);
  }, []);
  return (
    <>
      <section className="quote-request-content pt-lg-25 pb-lg-150 pb-mobile-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="container-text text-center">
                <h1
                  className="fs-lg-60 fs-mobile-40 fw-600 split-words"
                  data-aos="d:loop"
                >
                  {quoteRequestPageContent && quoteRequestPageContent.mainTitle}
                </h1>
                <span
                  className="d-block fs--25 fs-phone-25 fw-600 pt-lg-20 pt-tablet-15 pt-phone-30"
                  data-aos="fadeInUp .8s ease-out-cubic .3s, d:loop"
                >
                  {quoteRequestPageContent && quoteRequestPageContent.subTitle}
                </span>
                <div
                  className="text font-2 fs--16 lh-130 fw-500 pt-lg-20 pt-tablet-30 pt-phone-10"
                  data-aos="fadeInUp .8s ease-out-cubic .4s, d:loop"
                >
                  {quoteRequestPageContent && quoteRequestPageContent.paragraph}
                </div>
              </div>
              <div className="form-quote-request">
                <div className="container-form-quote" data-form-container>
                  <form
                    className="form-quote"
                    data-aos="fadeIn .6s ease-in-out .3s, d:loop"
                  >
                    <div className="col-12 column-container-input-top">
                      <div className="container-input-radio-top">
                        <span className="font-2 fs--16 fw-500 d-block text-uppercase">
                          Your order is:
                        </span>
                        <div className="container-radio">
                          <input
                            id="quote-delivered"
                            name="order_type"
                            type="radio"
                            defaultValue="Order Delivered"
                            required
                            checked
                          />
                          <label htmlFor="quote-delivered">Delivered</label>
                        </div>
                        <div className="container-radio">
                          <input
                            id="quote-will-call"
                            name="order_type"
                            type="radio"
                            defaultValue="Order Will Call"
                            required
                          />
                          <label htmlFor="quote-will-call">Will Call</label>
                        </div>
                      </div>
                    </div>
                    <div className="container-input input-date col-lg-4">
                      <label htmlFor="quote-event-date">
                        {" "}
                        {quoteRequestPageContent &&
                          quoteRequestPageContent.eventDateFieldLabel}
                      </label>
                      <input
                        id="quote-event-date"
                        name="event_date"
                        type="date"
                        placeholder="MM/DD/YY"
                        required
                      />
                    </div>
                    <div className="container-input input-date col-lg-4">
                      <label htmlFor="quote-delivery-date">
                        {quoteRequestPageContent &&
                          quoteRequestPageContent.deliveryDateFieldLabel}
                      </label>
                      <input
                        id="quote-delivery-date"
                        name="delivery_date"
                        type="date"
                        placeholder="MM/DD/YY"
                        required
                      />
                    </div>
                    <div className="container-input input-date col-lg-4">
                      <label htmlFor="quote-pickup-date">
                        {" "}
                        {quoteRequestPageContent &&
                          quoteRequestPageContent.pickupDateFieldLabel}
                      </label>
                      <input
                        id="quote-pickup-date"
                        name="pickup_date"
                        type="date"
                        placeholder="MM/DD/YY"
                        required
                      />
                    </div>
                    <div className="container-input col-lg-4">
                      <label htmlFor="quote-event-location">
                        {quoteRequestPageContent &&
                          quoteRequestPageContent.eventLocationFieldLabel}
                      </label>
                      <input
                        id="quote-event-location"
                        name="event_location"
                        type="text"
                      />
                    </div>
                    <div className="container-input col-lg-8">
                      <label htmlFor="quote-event-description">
                        {quoteRequestPageContent &&
                          quoteRequestPageContent.eventDescriptionFieldLabel}
                      </label>
                      <input
                        id="quote-event-description"
                        name="event_description"
                        type="text"
                        required
                      />
                    </div>
                    <div className="divisor"></div>
                    <span className="divisor-title fs--40 fw-600 d-block text-center w-100 pb-40">
                      Billing details
                    </span>
                    <div className="container-input col-lg-4">
                      <label htmlFor="quote-bill-to">
                        {" "}
                        {quoteRequestPageContent &&
                          quoteRequestPageContent.billToFieldLabel}
                      </label>
                      <input
                        id="quote-bill-to"
                        name="bill-to"
                        type="text"
                        placeholder="Customer account name"
                        required
                      />
                    </div>
                    <div className="container-input col-lg-4">
                      <label htmlFor="quote-address">
                        {" "}
                        {quoteRequestPageContent &&
                          quoteRequestPageContent.streetAddressFieldLabel}
                      </label>
                      <input
                        id="quote-address"
                        name="address"
                        type="text"
                        required
                      />
                    </div>
                    <div className="container-input col-lg-4">
                      <label htmlFor="quote-address2">
                        {" "}
                        {quoteRequestPageContent &&
                          quoteRequestPageContent.addressLine2FieldLabel}
                      </label>
                      <input id="quote-address2" name="address2" type="text" />
                    </div>
                    <div className="container-input col-lg-4">
                      <label htmlFor="quote-city">
                        {" "}
                        {quoteRequestPageContent &&
                          quoteRequestPageContent.cityFieldLabel}
                      </label>
                      <input id="quote-city" name="city" type="text" required />
                    </div>
                    <div className="container-input col-lg-4">
                      <label htmlFor="quote-state">
                        {" "}
                        {quoteRequestPageContent &&
                          quoteRequestPageContent.stateFieldLabel}
                      </label>
                      <input
                        id="quote-state"
                        name="state"
                        type="text"
                        required
                      />
                    </div>
                    <div className="container-input col-lg-4">
                      <label htmlFor="quote-zip-code">
                        {" "}
                        {quoteRequestPageContent &&
                          quoteRequestPageContent.zipCodeFieldLabel}
                      </label>
                      <input id="quote-zip-code" name="zip_code" type="text" />
                    </div>
                    <div className="divisor"></div>
                    <div className="container-input col-lg-4 col-12">
                      <label htmlFor="quote-instructions">
                        Special instructions or order comments
                      </label>
                      <input
                        id="quote-instructions"
                        name="instructions"
                        type="text"
                      />
                    </div>
                    <div className="container-input col-lg-4">
                      <label htmlFor="quote-instructions-city">City</label>
                      <input
                        id="quote-instructions-city"
                        name="instructions_city"
                        type="text"
                      />
                    </div>
                    <div className="container-input col-lg-4">
                      <label htmlFor="quote-instructions-state">State</label>
                      <input
                        id="quote-instructions-state"
                        name="instructions_state"
                        type="text"
                      />
                    </div>
                    <div className="divisor"></div>
                    <span className="divisor-title fs--40 fw-600 d-block text-center w-100 pb-lg-40 pb-mobile-30">
                      Ordered by
                    </span>
                    <div className="container-input col-lg-6">
                      <label htmlFor="quote-name">
                        {quoteRequestPageContent &&
                          quoteRequestPageContent.nameFieldLabel}
                      </label>
                      <input
                        id="quote-name"
                        name="name"
                        type="text"
                        placeholder="Gabriel Macohin"
                        required
                      />
                    </div>
                    <div className="container-input col-lg-6">
                      <label htmlFor="quote-email">
                        {quoteRequestPageContent &&
                          quoteRequestPageContent.emailFieldLabel}
                      </label>
                      <input
                        id="quote-email"
                        name="email"
                        type="email"
                        placeholder="gabriel@petrikor.design"
                        required
                      />
                    </div>
                    <div className="container-submit col-12">
                      <button
                        type="submit"
                        className="bt-submit btn-blue btn-large w-100"
                      >
                        <span className="submit-text">
                          {quoteRequestPageContent &&
                            quoteRequestPageContent.submitButtonLabel}
                        </span>
                        <i className="icon-arrow-right"></i>
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
          </div>
        </div>
      </section>
    </>
  );
};

export default QuoteRequestPage;
