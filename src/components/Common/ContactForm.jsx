import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import contactFormSchema from "@/Utils/schema/contact";
import { postForm } from "@/Services/Index";

const ContactForm = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm({
    resolver: yupResolver(contactFormSchema),
  });

  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      await postForm("contact", formData);
      setFeedback("success");
    } catch (error) {
      console.error("Error submitting form:", error);
      setFeedback("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (feedback) {
      const timeoutId = setTimeout(() => {
        setFeedback(null);
        if (feedback === "success") {
          reset();
          Array.from(document.querySelectorAll(".preenchido")).forEach((el) =>
            el.classList.remove("preenchido")
          );
        }
      }, 3000);
      return () => clearTimeout(timeoutId);
    }
  }, [feedback]);
  
  return (
    <div className="column-1">
      <h2 className="fs--60 title">
        <span>{data?.formTitle}</span>
        <i className="icon-arrow-down"></i>
      </h2>
      <div className={`container-contact mt-lg-140 mt-tablet-65 ${feedback === "success" ? "form-success" : ""} ${feedback === "error" ? "formError" : ""}`}>
        <form className="form-contact" onSubmit={handleSubmit(onSubmit)}>
          <div className="container-input col-md-6">
            <label htmlFor="contact-first-name">
              {data?.firstNamePlaceholder}
            </label>
            <input
              id="first_name_3469"
              name="first_name_3469"
              type="text"
              required
              disabled={loading}
              {...register("first_name_3469")}
            />
            {formErrors.first_name_3469 && (
              <span className="error">
                {formErrors.first_name_3469.message}
              </span>
            )}
          </div>
          <div className="container-input col-md-6">
            <label htmlFor="contact-last-name">{data?.lastNamePlaceholder}</label>
            <input
              id="last_name_425e"
              name="last_name_425e"
              type="text"
              required
              {...register("last_name_425e")}
              disabled={loading}
            />
            {formErrors.last_name_425e && (
              <span className="error">{formErrors.last_name_425e.message}</span>
            )}
          </div>
          <div className="container-input col-12">
            <label htmlFor="contact-email">{data?.emailPlaceholder}</label>
            <input
              id="email_d74b"
              name="email_d74b"
              type="email"
              required
              {...register("email_d74b")}
              disabled={loading}
            />
            {formErrors.email_d74b && (
              <span className="error">{formErrors.email_d74b.message}</span>
            )}
          </div>
          <div className="container-textarea col-12">
            <label htmlFor="contact-message">{data?.messageBoxPlaceholder}</label>
            <textarea
              id="long_answer_e038"
              name="long_answer_e038"
              {...register("long_answer_e038")}
              disabled={loading}
            ></textarea>
            {formErrors.long_answer_e038 && (
              <span className="error">
                {formErrors.long_answer_e038.message}
              </span>
            )}
          </div>
          <div className="container-submit col-12">
            <button type="submit" className="bt-submit btn-medium" disabled={loading}>
              <span className="submit-text">{data?.formSubmitButton}</span>
            </button>
          </div>
        </form>
        {feedback === "error" && <h3 className="data-form-error">Error, Try again!</h3>}
        {feedback === "success" && <h3 className="data-form-success">Success!</h3>}
      </div>
    </div >
  );
};

export default ContactForm;