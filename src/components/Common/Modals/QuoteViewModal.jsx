import { useState } from "react";
import { quoteDateFormatter } from "@/Utils/Utils";
import QuoteItems from "@/components/Quote/QuoteItems";

const QuoteViewModal = ({ data, handleAddToCart }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const issueDate = quoteDateFormatter(data?.dates.issueDate);

  const handleOrderAgain = async () => {
    if (isButtonDisabled) return;
    setIsButtonDisabled(true);

    try {
      await handleAddToCart(data?.lineItems);
    } finally {
      setIsButtonDisabled(false);
    }
  };

  return (
    <div id="scripts">
      <modal-group name="modal-quotes-history" class="modal-quotes-history">
        <modal-container>
          <modal-item>
            <div className="wrapper-section">
              <section className="section-modal-quotes-history">
                <div className="container-fluid">
                  <div className="row">
                    <div className="col-lg-10 offset-lg-1">
                      <div
                        className="modal-content"
                        data-modal-area
                        data-form-container-cart
                      >
                        <div className="container-title">
                          <div className="title">
                            <h2 className="fs--60 blue-1 text-uppercase">
                              {data && data.title}
                            </h2>
                            <p className="font-2 fs--12 text-uppercase">
                              {issueDate}
                            </p>
                          </div>
                        </div>
                        <form className="form-cart mt-lg-50 mt-mobile-40">
                          <ul
                            className="list-cart list-cart-product"
                            data-aos="d:loop"
                          >
                            <QuoteItems quoteData={data?.lineItems} status={"created"} />
                          </ul>
                          <div className="flex-center mt-lg-105 mt-tablet-55 mt-phone-35">
                            <button
                              onClick={handleOrderAgain}
                              className="btn-1 btn-large btn-blue btn-request w-100 manual-modal-close"
                              disabled={isButtonDisabled}
                            >
                              <span>
                                {isButtonDisabled
                                  ? "Please Wait!"
                                  : "Order Again"}
                              </span>
                              <i className="icon-arrow-right-2"></i>
                            </button>
                          </div>
                        </form>
                        <div className="container-btn-modal-close">
                          <btn-modal-close class="btn-close">
                            <i className="icon-close"></i>
                          </btn-modal-close>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </modal-item>
        </modal-container>
      </modal-group>
    </div>
  );
};

export default QuoteViewModal;
