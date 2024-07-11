"use client";

import { useEffect } from "react";
import { markPageLoaded } from "../../utils/AnimationFunctions";

const QuotesHistory = () => {
  useEffect(() => {
    markPageLoaded();
  }, []);
  return (
    <div className="wrapper-account">
      <h1 className="fs--60 blue-1 split-words" data-aos="d:loop">Quotes history</h1>
      <div className="no-results d-none">
        <h2 className="fs--30 fw-400 red-1 split-words" data-aos="d:loop">No quotes history
        </h2>
      </div>
      <ul className="list-quotes-history mt-lg-90 mt-mobile-30" data-aos="d:loop">
        <li className="list-item">
          <div className="content">
            <div className="name-date">
              <h2 className="name">Ferrari</h2>
              <div className="date">February, 09h, 2024</div>
            </div>
            <div className="value">$ 45.000</div>
            <div className="container-btn">
              <btn-modal-open group="modal-quotes-history" class="btn-view">
                <span>View</span>
                <i className="icon-arrow-diagonal"></i>
              </btn-modal-open>
              <a href="cart.html" className="btn-order-again">
                <span>Order again</span>
                <i className="icon-arrow-diagonal"></i>
              </a>
            </div>
          </div>
        </li>
        <li className="list-item">
          <div className="content">
            <div className="name-date">
              <h2 className="name">Tesla</h2>
              <div className="date">February, 09h, 2024</div>
            </div>
            <div className="value">$ 45.000</div>
            <div className="container-btn">
              <btn-modal-open group="modal-quotes-history" class="btn-view">
                <span>View</span>
                <i className="icon-arrow-diagonal"></i>
              </btn-modal-open>
              <a href="cart.html" className="btn-order-again">
                <span>Order again</span>
                <i className="icon-arrow-diagonal"></i>
              </a>
            </div>
          </div>
        </li>
        <li className="list-item">
          <div className="content">
            <div className="name-date">
              <h2 className="name">McLaren</h2>
              <div className="date">February, 09h, 2024</div>
            </div>
            <div className="value">$ 45.000</div>
            <div className="container-btn">
              <btn-modal-open group="modal-quotes-history" class="btn-view">
                <span>View</span>
                <i className="icon-arrow-diagonal"></i>
              </btn-modal-open>
              <a href="cart.html" className="btn-order-again">
                <span>Order again</span>
                <i className="icon-arrow-diagonal"></i>
              </a>
            </div>
          </div>
        </li>
        <li className="list-item">
          <div className="content">
            <div className="name-date">
              <h2 className="name">Williams</h2>
              <div className="date">February, 09h, 2024</div>
            </div>
            <div className="value">$ 45.000</div>
            <div className="container-btn">
              <btn-modal-open group="modal-quotes-history" class="btn-view">
                <span>View</span>
                <i className="icon-arrow-diagonal"></i>
              </btn-modal-open>
              <a href="cart.html" className="btn-order-again">
                <span>Order again</span>
                <i className="icon-arrow-diagonal"></i>
              </a>
            </div>
          </div>
        </li>
      </ul>
      <button className="btn-2-blue mt-lg-65 mt-mobile-45">
        <span>Load more</span>
        <i className="icon-arrow-right-2"></i>
      </button>
    </div>
  );
};

export default QuotesHistory;
