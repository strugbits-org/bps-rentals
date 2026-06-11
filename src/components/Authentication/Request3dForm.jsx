"use client";
import { useEffect, useRef, useState } from "react";
import { useCookies } from "react-cookie";

import useUserData from "@/Hooks/useUserData";
import { trackEvent } from "@/Utils/Analytics";
import {
  clear3dRequestIntent,
  get3dRequestIntentProduct,
  isAuthMemberCurrent,
  markRequested,
  parseUserDataCookie,
} from "@/Utils/Request3dAccess";
import { submit3dAccessRequest } from "@/Services/Request3dAccessApis";
import logError from "@/Utils/ServerActions";

const USAGE_OPTIONS = [
  "Event design & planning",
  "Interior design / visualization",
  "Architecture / construction",
  "Film, TV & photography",
  "Brand & marketing",
  "Other",
];

const CATEGORY_CHIPS = ["Sofas", "Chairs", "Tables", "Lighting", "F&B", "500+ models"];

const emptyFormData = () => ({
  first_name: "",
  last_name: "",
  company: "",
  usage: "",
  note: "",
});

/**
 * Request-form view of the login submenu (data-form-active="3d-request").
 * Email comes from the logged-in session (not a form field). After signup the
 * cookie may lag behind — authMember from the signup/login response is used first.
 */
const Request3dForm = ({ selectedProduct, authMember, setToggleModal, active }) => {
  const { firstName, lastName, memberId, email } = useUserData();
  const [cookies] = useCookies(["userData", "authToken"]);
  const cookieUserData = parseUserDataCookie(cookies?.userData);
  const hasAuthToken = Boolean(
    cookies.authToken && cookies.authToken !== "undefined"
  );
  const currentAuthMember = isAuthMemberCurrent(
    authMember,
    cookieUserData,
    hasAuthToken
  )
    ? authMember
    : null;
  const sessionEmail =
    currentAuthMember?.loginEmail || cookieUserData?.loginEmail || email;
  const sessionMemberId = currentAuthMember?.memberId || memberId;
  const sessionFirstName = currentAuthMember?.firstName || firstName;
  const sessionLastName = currentAuthMember?.lastName || lastName;
  const product =
    selectedProduct ||
    get3dRequestIntentProduct() ||
    null;
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(emptyFormData);
  const userKey = sessionMemberId || sessionEmail || "";
  const prevUserKeyRef = useRef(userKey);

  // Reset when a different user opens the form (e.g. logout → login as someone else).
  // The component stays mounted in Navbar, so form state would otherwise stick.
  useEffect(() => {
    const userChanged = prevUserKeyRef.current !== userKey;
    prevUserKeyRef.current = userKey;

    if (userChanged) {
      setFormData({
        ...emptyFormData(),
        first_name: sessionFirstName || "",
        last_name: sessionLastName || "",
      });
      setError("");
      return;
    }

    if (!active) return;

    // Session data may arrive after open — fill names only when still empty.
    setFormData((prev) => ({
      ...prev,
      first_name: prev.first_name || sessionFirstName || "",
      last_name: prev.last_name || sessionLastName || "",
    }));
  }, [userKey, active, sessionFirstName, sessionLastName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");

    if (!sessionEmail) {
      setError("Your session email could not be loaded. Please log out and log in again.");
      setSubmitting(false);
      return;
    }

    try {
      await submit3dAccessRequest({
        firstName: formData.first_name,
        lastName: formData.last_name,
        email: sessionEmail,
        company: formData.company,
        usage: formData.usage,
        note: formData.note,
        productName: product?.name || "",
        productSlug: product?.slug || "",
      });

      trackEvent("request_3d_access_submit", {
        product_name: product?.name || "",
        product_slug: product?.slug || "",
        usage: formData.usage || "",
        company: formData.company || "",
      });

      // Remember this user requested access so reopening goes straight to confirmation.
      markRequested(sessionMemberId || sessionEmail);
      clear3dRequestIntent();
      setToggleModal("3d-confirmation");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      logError("3D access request submit failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container-request-access">
      <h2 className="request-access-title fs--40 fs-phone-30 fw-600">
        Request 3D library access
      </h2>
      <p className="fs--16 fs-mobile-14 mb-10">
        One request — access to all Blueprint 3D models, including this product.
      </p>

      <div className="request-access-chips">
        {CATEGORY_CHIPS.map((chip) => (
          <span key={chip} className="request-access-chip">
            {chip}
          </span>
        ))}
      </div>

      <p className="request-access-hint fs--12">
        Tell us briefly about your work. Typically approved within 1 business day.
      </p>

      <form onSubmit={handleSubmit} className="form-sign-in form-base">
        <div className="container-input col-12">
          <label htmlFor="request-first-name">First name</label>
          <input
            id="request-first-name"
            name="first_name"
            type="text"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="container-input col-12">
          <label htmlFor="request-last-name">Last name</label>
          <input
            id="request-last-name"
            name="last_name"
            type="text"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="container-input col-12">
          <label htmlFor="request-company">Company / Studio</label>
          <input
            id="request-company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleChange}
          />
        </div>
        <div className="container-input container-select col-12 request-access-select">
          <label htmlFor="request-usage">How will you use the models?</label>
          <select
            id="request-usage"
            name="usage"
            value={formData.usage}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select one...
            </option>
            {USAGE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <div className="container-input col-12 request-access-textarea">
          <label htmlFor="request-note">Note (optional)</label>
          <textarea
            id="request-note"
            name="note"
            rows={3}
            value={formData.note}
            onChange={handleChange}
            placeholder="e.g. We create event renders for clients — this library would be a huge help."
          ></textarea>
        </div>
        {error && <p className="request-access-error fs--12">{error}</p>}
        <div className="container-submit col-12 mt-mobile-10">
          <button type="submit" className="bt-submit btn-blue w-100" disabled={submitting}>
            <span>{submitting ? "Please wait..." : "Submit request"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Request3dForm;
