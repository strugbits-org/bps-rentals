import { quoteDateFormatter } from "@/Utils/Utils";
import QuoteItems from "@/components/Quote/QuoteItems";
import AnimateLink from "../AnimateLink";

const QuoteViewModal = ({ data }) => {
  const issueDate = quoteDateFormatter(data?.dates.issueDate);

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

                            {/* {data &&
                              data.lineItems.length > 0 &&
                              data.lineItems.map((cart, index) => {
                                const {
                                  quantity,
                                  name,
                                  productUrl,
                                  src,
                                  description,
                                  location,
                                } = cart;

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
                                          src={generateImageUrl2({
                                            wix_url: src,
                                            h: "74",
                                            w: "74",
                                          })}
                                          class=" "
                                        />
                                      </div>
                                      <div class="wrapper-product-info">
                                        <div class="container-top">
                                          <div class="container-product-name">
                                            <h2 class="product-name">
                                              {description}
                                            </h2>
                                            <AnimateLink
                                              to={
                                                "/product" +
                                                extractSlugFromUrl(productUrl)
                                              }
                                              className="btn-view"
                                            >
                                              <span>View</span>
                                              <i class="icon-arrow-right"></i>
                                            </AnimateLink>
                                          </div>
                                          <button
                                            type="button"
                                            class="btn-cancel hidden"
                                          >
                                            <i class="icon-close"></i>
                                          </button>
                                        </div>
                                        <div class="container-specs">
                                          <ul class="list-specs">
                                            <li class="sku">
                                              <span class="specs-title">
                                                SKU
                                              </span>
                                              <span class="specs-text">
                                                {name}
                                              </span>
                                            </li>
                                            <li class="size hidden">
                                              <span class="specs-title">
                                                Size
                                              </span>
                                              <span class="specs-text">
                                                19”L X 15.5”W X 27.5”H
                                              </span>
                                            </li>
                                            <li class="color hidden">
                                              <span class="specs-title">
                                                Color
                                              </span>
                                              <span class="specs-text">
                                                color
                                              </span>
                                            </li>
                                            <li class="location">
                                              <span class="specs-title">
                                                Location
                                              </span>
                                              <span class="specs-text">
                                                {locations[location]}{" "}
                                                <i class="icon-pin"></i>
                                              </span>
                                            </li>
                                            <li class="customize-text hidden">
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
                                              <button
                                                type="button"
                                                class="minus"
                                                disabled
                                                hidden
                                              >
                                                <i class="icon-minus"></i>
                                              </button>
                                              <input
                                                type="number"
                                                min="1"
                                                class="input-number"
                                                readOnly
                                                defaultValue={quantity}
                                                placeholder="Item quantity"
                                              />
                                              <button
                                                type="button"
                                                class="plus"
                                                disabled
                                                hidden
                                              >
                                                <i class="icon-plus"></i>
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                );
                              })} */}
                          </ul>
                          <div class="flex-center mt-lg-105 mt-tablet-55 mt-phone-35">
                            <AnimateLink
                              to="/quote-request"
                              className="btn-1 btn-large btn-blue btn-request w-100 manual-modal-close"
                            >
                              <span>Request For Quote</span>
                              <i class="icon-arrow-right-2"></i>
                            </AnimateLink>
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
