"use client";
import { useEffect, useState } from "react";
import { markPageLoaded } from "@/Utils/AnimationFunctions";
import { createPriceQuote } from "@/Services/CartApis";

const QuoteRequestPage = ({ quoteRequestPageContent, cartData }) => {
  const [cartItems, setCartItems] = useState();
  const [formData, setFormData] = useState({
    orderType: "Delivered",
    eventDate: "",
    deliveryDate: "",
    pickupDate: "",
    eventLocation: "",
    eventDescription: "",
    billTo: "",
    address: "",
    address2: "",
    city: "",
    state: "",
    zipCode: "",
    instructions: "",
    instructionsCity: "",
    instructionsState: "",
    name: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "radio" ? (checked ? value : formData[name]) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const lineItems = cartItems.map((product) => {
      return {
        id: product._id,
        name: product.physicalProperties.sku,
        description: product.productName.original,
        quantity: product.quantity,
        fullItem: product,
      };
    });
    try {
      const response = await createPriceQuote({
        lineItems,
        customerDetails: formData,
      });
      console.log(response, "response");
    } catch (error) {
      console.log("Error while creating quote:", error);
    }
  };

  useEffect(() => {
    setCartItems(cartData);
    setTimeout(() => {
      markPageLoaded();
    }, 1000);
  }, []);

  return (
    <section className="quote-request-content pt-lg-25 pb-lg-150 pb-mobile-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <div className="container-text text-center">
              <h1
                className="fs-lg-60 fs-mobile-40 fw-600 split-words"
                data-aos="d:loop"
              >
                {quoteRequestPageContent?.mainTitle}
              </h1>
              <span
                className="d-block fs--25 fs-phone-25 fw-600 pt-lg-20 pt-tablet-15 pt-phone-30"
                data-aos="fadeInUp .8s ease-out-cubic .3s, d:loop"
              >
                {quoteRequestPageContent?.subTitle}
              </span>
              <div
                className="text font-2 fs--16 lh-130 fw-500 pt-lg-20 pt-tablet-30 pt-phone-10"
                data-aos="fadeInUp .8s ease-out-cubic .4s, d:loop"
              >
                {quoteRequestPageContent?.paragraph}
              </div>
            </div>
            <div className="form-quote-request">
              <div className="container-form-quote" data-form-container>
                <form
                  className="form-quote"
                  data-aos="fadeIn .6s ease-in-out .3s, d:loop"
                  onSubmit={handleSubmit}
                >
                  <div className="col-12 column-container-input-top">
                    <div className="container-input-radio-top">
                      <span className="font-2 fs--16 fw-500 d-block text-uppercase">
                        Your order is:
                      </span>
                      <div className="container-radio">
                        <input
                          id="quote-delivered"
                          name="orderType"
                          type="radio"
                          value="Order Delivered"
                          onChange={handleChange}
                          checked={formData.orderType === "Delivered"}
                          required
                        />
                        <label htmlFor="quote-delivered">Delivered</label>
                      </div>
                      <div className="container-radio">
                        <input
                          id="quote-will-call"
                          name="orderType"
                          type="radio"
                          value="Will Call"
                          onChange={handleChange}
                          checked={formData.orderType === "Will Call"}
                          required
                        />
                        <label htmlFor="quote-will-call">Will Call</label>
                      </div>
                    </div>
                  </div>
                  <div className="container-input input-date col-lg-4">
                    <label htmlFor="quote-event-date">
                      {quoteRequestPageContent?.eventDateFieldLabel}
                    </label>
                    <input
                      id="quote-event-date"
                      name="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="container-input input-date col-lg-4">
                    <label htmlFor="quote-delivery-date">
                      {quoteRequestPageContent?.deliveryDateFieldLabel}
                    </label>
                    <input
                      id="quote-delivery-date"
                      name="deliveryDate"
                      type="date"
                      value={formData.deliveryDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="container-input input-date col-lg-4">
                    <label htmlFor="quote-pickup-date">
                      {quoteRequestPageContent?.pickupDateFieldLabel}
                    </label>
                    <input
                      id="quote-pickup-date"
                      name="pickupDate"
                      type="date"
                      value={formData.pickupDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="container-input col-lg-4">
                    <label htmlFor="quote-event-location">
                      {quoteRequestPageContent?.eventLocationFieldLabel}
                    </label>
                    <input
                      id="quote-event-location"
                      name="eventLocation"
                      type="text"
                      value={formData.eventLocation}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="container-input col-lg-8">
                    <label htmlFor="quote-event-description">
                      {quoteRequestPageContent?.eventDescriptionFieldLabel}
                    </label>
                    <input
                      id="quote-event-description"
                      name="eventDescription"
                      type="text"
                      value={formData.eventDescription}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="divisor"></div>
                  <span className="divisor-title fs--40 fw-600 d-block text-center w-100 pb-40">
                    Billing details
                  </span>
                  <div className="container-input col-lg-4">
                    <label htmlFor="quote-bill-to">
                      {quoteRequestPageContent?.billToFieldLabel}
                    </label>
                    <input
                      id="quote-bill-to"
                      name="billTo"
                      type="text"
                      placeholder="Customer account name"
                      value={formData.billTo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="container-input col-lg-4">
                    <label htmlFor="quote-address">
                      {quoteRequestPageContent?.streetAddressFieldLabel}
                    </label>
                    <input
                      id="quote-address"
                      name="address"
                      type="text"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="container-input col-lg-4">
                    <label htmlFor="quote-address2">
                      {quoteRequestPageContent?.addressLine2FieldLabel}
                    </label>
                    <input
                      id="quote-address2"
                      name="address2"
                      type="text"
                      value={formData.address2}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="container-input col-lg-4">
                    <label htmlFor="quote-city">
                      {quoteRequestPageContent?.cityFieldLabel}
                    </label>
                    <input
                      id="quote-city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="container-input col-lg-4">
                    <label htmlFor="quote-state">
                      {quoteRequestPageContent?.stateFieldLabel}
                    </label>
                    <input
                      id="quote-state"
                      name="state"
                      type="text"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="container-input col-lg-4">
                    <label htmlFor="quote-zip-code">
                      {quoteRequestPageContent?.zipCodeFieldLabel}
                    </label>
                    <input
                      id="quote-zip-code"
                      name="zipCode"
                      type="text"
                      value={formData.zipCode}
                      onChange={handleChange}
                    />
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
                      value={formData.instructions}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="container-input col-lg-4">
                    <label htmlFor="quote-instructions-city">City</label>
                    <input
                      id="quote-instructions-city"
                      name="instructionsCity"
                      type="text"
                      value={formData.instructionsCity}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="container-input col-lg-4">
                    <label htmlFor="quote-instructions-state">State</label>
                    <input
                      id="quote-instructions-state"
                      name="instructionsState"
                      type="text"
                      value={formData.instructionsState}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="container-input col-lg-6">
                    <label htmlFor="quote-name">Name</label>
                    <input
                      id="quote-name"
                      name="name"
                      type="text"
                      placeholder="Full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="container-input col-lg-6">
                    <label htmlFor="quote-email">Email</label>
                    <input
                      id="quote-email"
                      name="email"
                      type="email"
                      placeholder="Enter email"
                      value={formData.email}
                      onChange={handleChange}
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
  );
};

export default QuoteRequestPage;
