"use client";
import { useEffect, useState } from "react";

import { markPageLoaded } from "@/Utils/AnimationFunctions";
import QuoteItems from "./QuoteItems";
import { quoteDateFormatter } from "@/Utils/Utils";
import { getQuotesById } from "@/Services/QuoteApis";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const QuoteDetails = ({ quoteRequestPageContent, quoteDetailPageContent }) => {
  const searchParams = useSearchParams();
  const quoteId = searchParams.get("id");
  const [quoteData, setQuoteData] = useState();
  const router = useRouter();

  const fetchQuote = async () => {
    try {
      const id = encodeURIComponent(quoteId); 
      const data = await getQuotesById(id);
      setQuoteData(data);
      setTimeout(markPageLoaded, 200);
    } catch (error) {
      router.push("/error");
      console.error("Error while fetching quote data:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  if (!quoteData) return;

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
                {quoteDetailPageContent?.mainTitle}
              </h1>
              <span
                className="d-block fs--25 fs-phone-25 fw-600 pt-lg-20 pt-tablet-15 pt-phone-30"
                data-aos="fadeInUp .8s ease-out-cubic .3s, d:loop"
              >
                {quoteDetailPageContent?.subTitle}
              </span>
              <div
                className="text font-2 fs--16 lh-130 fw-500 pt-lg-20 pt-tablet-30 pt-phone-10"
                data-aos="fadeInUp .8s ease-out-cubic .4s, d:loop"
              >
                {quoteDetailPageContent?.paragraph}
              </div>
            </div>
            <div className="form-quote-request">
              <div className="container-form-quote" data-form-container>
                <form className="form-quote">
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
                          checked={quoteData.orderis === "Delivered"}
                          required
                          disabled
                        />
                        <label htmlFor="quote-delivered">Delivered</label>
                      </div>
                      <div className="container-radio">
                        <input
                          id="quote-will-call"
                          name="orderType"
                          type="radio"
                          value="Will call"
                          checked={quoteData.orderis === "Will call"}
                          required
                          disabled
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
                      value={quoteDateFormatter(quoteData?.eventDate)}
                      required
                      disabled
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
                      value={quoteDateFormatter(quoteData?.dilvDate)}
                      required
                      disabled
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
                      value={quoteDateFormatter(quoteData?.pickupDate)}
                      required
                      disabled
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
                      value={quoteData.eventLocation}
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
                      value={quoteData.eventDescript}
                      required
                      disabled
                    />
                  </div>
                  <div className="divisor"></div>
                  <span className="divisor-title fs--40 fw-600 d-block text-center w-100 pb-40">
                    {quoteDetailPageContent?.billingHeading}
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
                      value={quoteData?.billingDetails?.customerAccNameToBill}
                      required
                      disabled
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
                      value={quoteData?.billingDetails?.streetAddress}
                      required
                      disabled
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
                      value={quoteData?.billingDetails?.addressline2}
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
                      value={quoteData?.billingDetails?.city}
                      required
                      disabled
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
                      value={quoteData?.billingDetails?.state}
                      required
                      disabled
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
                      value={quoteData?.billingDetails?.zipCode}
                    />
                  </div>
                  <div className="divisor"></div>
                  <div className="container-input col-lg-4 col-12">
                    <label htmlFor="quote-instructions">
                      {quoteRequestPageContent?.orderCommentsFieldLabel}
                    </label>
                    <input
                      id="quote-instructions"
                      name="instructions"
                      type="text"
                      value={quoteData.billingDetails.specialInstructionsText}
                    />
                  </div>
                  <div className="container-input col-lg-4">
                    <label htmlFor="on-site-contact-field">
                      {" "}
                      {quoteRequestPageContent?.onSiteContactFieldLabel}
                    </label>
                    <input
                      id="on-site-contact-field"
                      name="onSiteContact"
                      type="text"
                      value={quoteData.billingDetails.onSiteContact}
                    />
                  </div>
                  <div className="container-input col-lg-4">
                    <label htmlFor="telephone">
                      {" "}
                      {quoteRequestPageContent?.telephoneFieldLabel}
                    </label>
                    <input
                      id="telephone"
                      name="telephone"
                      type="text"
                      value={quoteData.billingDetails.telephone}
                    />
                  </div>
                  <div className="container-input col-lg-4">
                    <label htmlFor="preferred-sales-person">
                      {" "}
                      {quoteRequestPageContent?.preferredSalesPersonFieldLabel}
                    </label>
                    <input
                      id="preferred-sales-person"
                      name="preferredSalesPerson"
                      type="text"
                      value={quoteData.billingDetails.prefferedSalesPerson}
                    />
                  </div>
                  <div className="divisor"></div>

                  <span className="divisor-title fs--40 fw-600 d-block text-center w-100 pb-40">
                    {quoteDetailPageContent?.orderedByHeading}
                  </span>

                  <div className="container-input col-lg-6">
                    <label htmlFor="quote-name">
                      {" "}
                      {quoteRequestPageContent?.nameFieldLabel}
                    </label>
                    <input
                      id="quote-name"
                      name="customerName"
                      type="text"
                      placeholder="Full name"
                      value={quoteData.billingDetails.nameeOrderedBy}
                      required
                      disabled
                    />
                  </div>
                  <div className="container-input col-lg-6">
                    <label htmlFor="quote-email">
                      {" "}
                      {quoteRequestPageContent?.emailFieldLabel}
                    </label>
                    <input
                      id="quote-email"
                      name="customerEmail"
                      type="email"
                      placeholder="Enter email"
                      value={quoteData.billingDetails.emaillOrderedBy}
                      required
                      disabled
                    />
                  </div>
                </form>
              </div>
            </div>

            {/* Quote Items */}
            <div className="mt-lg-55 mt-tablet-40 mt-phone-30">
              <span className="divisor-title fs--40 fw-600 d-block text-center w-100 pb-40">
                {quoteDetailPageContent.productsListingHeading}
              </span>
              <form className="form-cart">
                <ul className="list-cart list-cart-product" data-aos="d:loop">
                  <QuoteItems quoteData={quoteData.lineItems} />
                </ul>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteDetails;
