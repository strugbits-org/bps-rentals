const ContactFormModal = () => {
  return (
    <modal-group name="modal-contact" data-cursor-style="default">
      <modal-container>
        <modal-item>
          <section className="section-modal-contact">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-10 offset-lg-1 column-contact">
                  <div className="row contact-info">
                    <div className="column-1">
                      <h2 className="fs--60 title">
                        <span>Contact form</span>
                        <i className="icon-arrow-down"></i>
                      </h2>
                      <div
                        className="container-contact mt-lg-140 mt-tablet-65"
                        data-form-container
                      >
                        <form className="form-contact">
                          <div className="container-input col-md-6">
                            <label htmlFor="contact-first-name">First name</label>
                            <input
                              id="contact-first-name"
                              name="name"
                              type="text"
                              required
                            />
                          </div>
                          <div className="container-input col-md-6">
                            <label htmlFor="contact-last-name">Last name</label>
                            <input
                              id="contact-last-name"
                              name="name"
                              type="text"
                              required
                            />
                          </div>
                          <div className="container-input col-12">
                            <label htmlFor="contact-email">E-mail</label>
                            <input
                              id="contact-email"
                              name="email"
                              type="email"
                              required
                            />
                          </div>
                          <div className="container-textarea col-12">
                            <label htmlFor="contact-message">Message</label>
                            <textarea
                              id="contact-message"
                              name="message"
                            ></textarea>
                          </div>
                          <div className="container-submit col-12">
                            <button
                              type="submit"
                              className="bt-submit btn-medium"
                            >
                              <span className="submit-text">Send</span>
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
                    <div className="column-2">
                      <div className="container-info">
                        <div className="container-tel">
                          <a href="tel:">
                            <span>SF (415) 922-9004</span>
                          </a>
                          <a href="tel:">
                            <span>LV (702) 757-7987</span>
                          </a>
                        </div>
                        <a href="mailto:info@blueprintstudios.com">
                          <span>info@blueprintstudios.com</span>
                        </a>
                      </div>
                      <ul className="list-social-media">
                        <li>
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <i className="icon-facebook"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <i className="icon-instagram"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <i className="icon-x"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#" target="_blank" rel="noopener noreferrer">
                            <i className="icon-linkedin"></i>
                          </a>
                        </li>
                      </ul>
                      <ul className="list-address">
                        <li>
                          <h3 className="city">Napa Valley</h3>
                          <address>
                            955 Vintage Ave <br />
                            St. Helena, CA 94574
                          </address>
                          <div className="phones">
                            <a href="tel:">
                              <span>P / 707742.7777</span>
                            </a>
                            <a href="tel:">
                              <span>F / 415.822.8844</span>
                            </a>
                          </div>
                        </li>
                        <li>
                          <h3 className="city">Las Vegas</h3>
                          <address>
                            7900 W Sunset RD <br />
                            Suite 400 <br />
                            Las Vegas, NV 89113
                          </address>
                          <div className="phones">
                            <a href="tel:">
                              <span>P / 702.757.7987</span>
                            </a>
                          </div>
                        </li>
                        <li>
                          <h3 className="city">San Francisco</h3>
                          <address>
                            352 Shaw RD <br />
                            S. San Francisco, CA 94080
                          </address>
                          <div className="phones">
                            <a href="tel:">
                              <span>P / 415.922.9004</span>
                            </a>
                            <a href="tel:">
                              <span>F / 415.822.8844</span>
                            </a>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <btn-modal-close data-cursor-style="default">
                    <i className="icon-close"></i>
                    <i className="icon-arrow-left"></i>
                    <span className="text-go-back no-desktop">Go back</span>
                    <span className="text-hide">close</span>
                  </btn-modal-close>
                </div>
              </div>
            </div>
          </section>
        </modal-item>
      </modal-container>
    </modal-group>
  );
};

export default ContactFormModal;
