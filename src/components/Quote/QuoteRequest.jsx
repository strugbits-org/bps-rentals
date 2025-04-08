"use client";
import { useEffect, useState } from "react";

import { productImageURLForQuote } from "@/Utils/GenerateImageURL";
import { markPageLoaded } from "@/Utils/AnimationFunctions";
import { createPriceQuote } from "@/Services/QuoteApis";
import { getProductsCart } from "@/Services/CartApis";

import QuoteConfirmedModal from "../Common/Modals/QuoteConfirmedModal";
import Modal from "../Common/Modals/Modal";
import useUserData from "@/Hooks/useUserData";
import logError from "@/Utils/ServerActions";
import { decryptField, decryptPriceFields } from "@/Utils/Encrypt";
import { useCookies } from "react-cookie";
import { getCartPricingTiersData } from "@/Services/ProductsApis";
import { findPriceTier } from "@/Utils/Utils";

const QuoteRequest = ({ quoteRequestPageContent }) => {
  const { firstName, lastName, email } = useUserData();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [cartItems, setCartItems] = useState();
  const [message, setMessage] = useState("");
  const [modalButtonLabel, setModalButtonLabel] = useState("Try Again!");
  const [modalButtonRedirection, setModalButtonRedirection] = useState();
  const [_cookies, setCookie] = useCookies(["cartQuantity"]);
  const { pricingTier } = useUserData();
  const [modalState, setModalState] = useState({
    success: false,
    error: false,
  });
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
    onSiteContact: "",
    telephone: "",
    preferredSalesPerson: "",
    customerName: "",
    customerEmail: "",
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
    if (isButtonDisabled) return;
    setIsButtonDisabled(true);

    const lineItems = cartItems.map((product, index) => {
      const newUrl = productImageURLForQuote(product.image);
      const isProductSet = product.catalogReference.options.customTextFields?.isProductSet;
      const productSetId = product.catalogReference.options.customTextFields?.productSetId;
      const productPrice = product.catalogReference.options.customTextFields?.productPrice;
      const productSet = cartItems.find((item) => item.catalogReference.catalogItemId === productSetId);

      let description = product.productName.original;
      if (isProductSet) description = product.productName.original + " | PRODUCT SET";
      if (productSet) description = product.productName.original + ` | SET OF ${productSet.productName.original}`;

      const price = findPriceTier({
        tier: pricingTier,
        pricingTiers: product?.pricingTiers,
        price: pricingTier ? productPrice : product.price.amount,
        variantPrice: product.price.amount,
        isRawPrice: true,
      })

      return {
        lineItId: product._id,
        id: String(index + 1),
        name: product.physicalProperties.sku || "-",
        description: description,
        quantity: product.quantity,
        location: product.catalogReference.options.customTextFields.location,
        price: price,
        src: newUrl,
        productUrl: product.url,
        fullItem: product,
      };
    });


    try {
      if (lineItems.length === 0) {
        setMessage("Please add items to cart!");
        setModalState({ success: false, error: true });
        return;
      }

      const response = await createPriceQuote({
        lineItems,
        customerDetails: formData,
      });

      if (response?.error) {
        setMessage(response.message);
        return;
      }
      setCookie("cartQuantity", 0, { path: "/" });
      setModalState({ success: true, error: false });

      setFormData({
        orderType: "",
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
        onSiteContact: "",
        telephone: "",
        preferredSalesPerson: "",
        customerName: "",
        customerEmail: "",
      });
    } catch (error) {
      setMessage("Error while creating quote");
      setModalState({ success: false, error: true });
      logError("Error while creating quote:", error);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const handleEmptyCart = () => {
    setMessage("Your cart is currently empty. Please add items to continue");
    setModalButtonLabel("Continue Shopping");
    setModalButtonRedirection("/category/new");
    setModalState({ success: false, error: true });
  };

  const getCart = async () => {
    try {
      const response = await getProductsCart();
      if (!response.length) {
        handleEmptyCart();
        return;
      }

      const cartItemsIds = response.map(product => product.catalogReference.catalogItemId);
      const pricingTiersData = await getCartPricingTiersData(cartItemsIds);
      const pricingTiersMap = new Map(pricingTiersData.map(tier => [tier._id, tier.pricingTiers]));

      const cartData = response.map(item => {
        const pricingTiers = pricingTiersMap.get(item.catalogReference.catalogItemId) || [];
        return { ...item, pricingTiers: pricingTiers };
      });

      setCartItems(cartData);
      setIsButtonDisabled(false);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    setTimeout(markPageLoaded, 200);
    getCart();
  }, []);

  useEffect(() => {
    if (email) {
      setFormData({
        ...formData,
        customerName: firstName + " " + lastName,
        customerEmail: email,
      });
    }
  }, [email]);

  return (
    <>
      {modalState.error && (
        <Modal
          message={message}
          setModalStatus={setModalState}
          modalStatus={modalState}
          buttonLabel={modalButtonLabel}
          redirectUrl={modalButtonRedirection}
        />
      )}
      {modalState.success && <QuoteConfirmedModal />}
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
                <div className="container-form-quote">
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
                            value="Delivered"
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
                            value="Will call"
                            onChange={handleChange}
                            checked={formData.orderType === "Will call"}
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
                      {quoteRequestPageContent?.billingHeading}
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
                        {quoteRequestPageContent?.orderCommentsFieldLabel}
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
                      <label htmlFor="on-site-contact-field">
                        {" "}
                        {quoteRequestPageContent?.onSiteContactFieldLabel}
                      </label>
                      <input
                        id="on-site-contact-field"
                        name="onSiteContact"
                        type="text"
                        value={formData.onSiteContact}
                        onChange={handleChange}
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
                        value={formData.telephone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="container-input col-lg-4">
                      <label htmlFor="preferred-sales-person">
                        {" "}
                        {
                          quoteRequestPageContent?.preferredSalesPersonFieldLabel
                        }
                      </label>
                      <input
                        id="preferred-sales-person"
                        name="preferredSalesPerson"
                        type="text"
                        value={formData.preferredSalesPerson}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="divisor"></div>
                    <span className="divisor-title fs--40 fw-600 d-block text-center w-100 pb-40">
                      {quoteRequestPageContent?.orderedByHeading}
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
                        value={formData.customerName}
                        onChange={handleChange}
                        required
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
                        value={formData.customerEmail}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="container-submit col-12">
                      <button
                        type="submit"
                        className={`bt-submit btn-blue btn-large w-100 ${isButtonDisabled ? "btn-disabled" : ""}`}
                        disabled={isButtonDisabled}
                      >
                        <span className="submit-text">
                          {quoteRequestPageContent && !isButtonDisabled
                            ? quoteRequestPageContent.submitButtonLabel
                            : "Please wait..."}
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

export default QuoteRequest;
