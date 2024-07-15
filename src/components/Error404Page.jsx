"use client";

const Error404Page = () => {
  return (
    <>
      <section className="section-error-404">
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
    </>
  );
};

export default Error404Page;
