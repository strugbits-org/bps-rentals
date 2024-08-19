import { useState } from "react";
import { quoteDateFormatter } from "@/Utils/Utils";
import QuoteItems from "@/components/Quote/QuoteItems";

const QuoteViewModal = ({ data, handleAddToCart }) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const issueDate = quoteDateFormatter(data?.dates.issueDate);

  const handleButtonClick = async () => {
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
            <div class="wrapper-section">
              <section class="section-modal-quotes-history">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-lg-10 offset-lg-1">
                      <div
                        class="modal-content"
                        data-modal-area
                        data-form-container-cart
                      >
                        <div class="container-title">
                          <div class="title">
                            <h2 class="fs--60 blue-1 text-uppercase">
                              {data && data.title}
                            </h2>
                            <p class="font-2 fs--12 text-uppercase">
                              {issueDate}
                            </p>
                          </div>
                        </div>
                        <form class="form-cart mt-lg-50 mt-mobile-40">
                          <ul
                            class="list-cart list-cart-product"
                            data-aos="d:loop"
                          >
                            <QuoteItems quoteData={data?.lineItems} />
                          </ul>
                          <div class="flex-center mt-lg-105 mt-tablet-55 mt-phone-35">
                            <button
                              onClick={handleButtonClick}
                              class="btn-1 btn-large btn-blue btn-request w-100 manual-modal-close"
                              disabled={isButtonDisabled}
                            >
                              <span>
                                {isButtonDisabled
                                  ? "Please Wait!"
                                  : "Order Again"}
                              </span>
                              <i class="icon-arrow-right-2"></i>
                            </button>
                          </div>
                        </form>
                        <div class="container-btn-modal-close">
                          <btn-modal-close class="btn-close">
                            <i class="icon-close"></i>
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
