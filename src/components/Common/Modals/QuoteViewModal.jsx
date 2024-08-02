import AnimateLink from "../AnimateLink";

const QuoteViewModal = () => {
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
                              Mclaren
                            </h2>
                            <p class="font-2 fs--12 text-uppercase">
                              February, 09h, 2024
                            </p>
                          </div>
                        </div>
                        <form action="" class="form-cart mt-lg-50 mt-mobile-40">
                          <ul
                            class="list-cart list-cart-product"
                            data-aos="d:loop"
                          >
                            {[1, 2, 3, 4, 5].map((index) => {
                              return (
                                <li key={index} class="list-item">
                                  <input
                                    type="hidden"
                                    name="sku[]"
                                    defaultValue="MODCH09"
                                  />
                                  <div class="cart-product">
                                    <div class="container-img">
                                      <img
                                        src="/images/chairs/bristol-chair-color-3.png"
                                        class=" "
                                      />
                                    </div>
                                    <div class="wrapper-product-info">
                                      <div class="container-top">
                                        <div class="container-product-name">
                                          <h2 class="product-name">
                                            Arm Chair - Tapas
                                          </h2>
                                          <AnimateLink
                                            to={`product/${index}`}
                                            className="btn-view"
                                          >
                                            <span>View</span>
                                            <i class="icon-arrow-right"></i>
                                          </AnimateLink>
                                        </div>
                                        <button
                                          type="button"
                                          class="btn-cancel"
                                        >
                                          <i class="icon-close"></i>
                                        </button>
                                      </div>
                                      <div class="container-specs">
                                        <ul class="list-specs">
                                          <li class="sku">
                                            <span class="specs-title">SKU</span>
                                            <span class="specs-text">
                                              MODCH09
                                            </span>
                                          </li>
                                          <li class="size">
                                            <span class="specs-title">
                                              Size
                                            </span>
                                            <span class="specs-text">
                                              19”L X 15.5”W X 27.5”H
                                            </span>
                                          </li>
                                          <li class="color">
                                            <span class="specs-title">
                                              Color
                                            </span>
                                            <span class="specs-text">
                                              Yellow - Birch
                                            </span>
                                          </li>
                                          <li class="location">
                                            <span class="specs-title">
                                              Location
                                            </span>
                                            <span class="specs-text">
                                              San francisco{" "}
                                              <i class="icon-pin"></i>
                                            </span>
                                          </li>
                                          <li class="customize-text">
                                            <span class="specs-title">
                                              Customize text
                                            </span>
                                            <input
                                              type="text"
                                              placeholder="Lorem Ipsum"
                                            />
                                          </li>
                                        </ul>
                                        <div class="quantity">
                                          <span class="fs--20 no-mobile">
                                            Quantity
                                          </span>
                                          <div class="container-input container-input-quantity">
                                            <button type="button" class="minus">
                                              <i class="icon-minus"></i>
                                            </button>
                                            <input
                                              type="number"
                                              min="1"
                                              defaultValue="1"
                                              placeholder="1"
                                              class="input-number"
                                            />
                                            <button type="button" class="plus">
                                              <i class="icon-plus"></i>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                          <div class="flex-center mt-lg-105 mt-tablet-55 mt-phone-35">
                            <button
                              type="submit"
                              class="btn-1 btn-large btn-blue btn-request w-100 manual-modal-close"
                            >
                              <span>Request For Quote</span>
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
