"use client";

import { markPageLoaded } from "@/Utils/AnimationFunctions";
import { useEffect } from "react";

const Error404Page = ({ inline = false }) => {
  useEffect(() => {
    if (!inline) setTimeout(markPageLoaded, 200);
  }, []);
  return (
    <section className={`section-error-404 ${inline ? "inline" : ""}`}>
      <div className="container-title">
        <h1 className="fs--900 blue-1 split-chars" data-aos="d:loop">
          <span>404</span>
        </h1>
        <span
          className="fs--20 fw-600 text-uppercase"
          data-aos="fadeIn .8s ease-in-out .6s"
        >
          Page not found
        </span>
      </div>
    </section>
  );
};

export default Error404Page;
