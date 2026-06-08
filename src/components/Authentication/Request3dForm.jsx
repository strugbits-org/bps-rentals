"use client";
import { useEffect, useState } from "react";

import useUserData from "@/Hooks/useUserData";
import { trackEvent } from "@/Utils/Analytics";
import { markRequested } from "@/Utils/Request3dAccess";
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

/**
 * Request-form view of the login submenu (data-form-active="3d-request").
 * Submitting fires a GA event and advances to the confirmation view. Sending the
 * email is intentionally left as a TODO for the backend wiring.
 */
const Request3dForm = ({ selectedProduct, setToggleModal, active }) => {
  const { firstName, lastName, memberId, email } = useUserData();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    company: "",
    usage: "",
    note: "",
  });

  // Prefill the name fields from the logged-in user (kept editable). Re-applies
  // when the user data arrives or the form is (re)opened, but never overwrites
  // anything the user has already typed.
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      first_name: prev.first_name || firstName || "",
      last_name: prev.last_name || lastName || "",
    }));
  }, [firstName, lastName, active]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");

    try {
      await submit3dAccessRequest({
        firstName: formData.first_name,
        lastName: formData.last_name,
        email,
        company: formData.company,
        usage: formData.usage,
        note: formData.note,
        productName: selectedProduct?.name || "",
        productSlug: selectedProduct?.slug || "",
      });

      trackEvent("request_3d_access_submit", {
        product_name: selectedProduct?.name || "",
        product_slug: selectedProduct?.slug || "",
        usage: formData.usage || "",
        company: formData.company || "",
      });

      // Remember this user requested access so reopening goes straight to confirmation.
      markRequested(memberId || email);
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
