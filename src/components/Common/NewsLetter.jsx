"use client"
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { postForm } from "@/Services/Index";

const Newsletter = ({ data }) => {
  const validationSchema = Yup.object().shape({
    email_f932: Yup.string()
      .email("Invalid email address")
      .required("Required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await postForm("newsletter", data);
      setFeedback("success");
    } catch (error) {
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
    <div className={`container-newsletter ${feedback === "success" ? "letter-success" : ""} ${feedback === "error" ? "formError" : ""}`}>
      <div className="container-text">
        <h3 className="fs-25 white-1">{data?.newsletterTitle}</h3>
        <p className="fs--16 fs-phone-15 font-2 white-1 mt-5">
          {data?.newsletterDescription}
        </p>
      </div>

      <div className="container-newsletter mt-mobile-25">
        <form className="form-newsletter" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" name="assunto" defaultValue="[newsletter]" />
          <div className="container-input">
            <label htmlFor="newsletter-email">
              {data?.newsletterPlaceholder}
            </label>

            <input
              id="email_f932"
              name="email_f932"
              type="email"
              {...register("email_f932")}
              required
              disabled={loading}
            />

            {formErrors.email_f932 && (
              <span className="error">{formErrors.email_f932.message}</span>
            )}
          </div>
          <div className="container-submit">
            <button type="submit" className="bt-submit" disabled={loading}>
              <span className="submit-text">
                {data?.newsletterSubmitButtonText}
              </span>
            </button>
          </div>
        </form>

        {feedback === "success" && (
          <h3 className="feedback-newsletter white-1">Success!</h3>
        )}

        {feedback === "error" && (
          <h3 className="feedback-newsletter white-1">Error, Try again!</h3>
        )}
      </div>
    </div>
  );
};

export default Newsletter;
