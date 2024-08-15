"use client";

import { useEffect, useState } from "react";

import { markPageLoaded } from "@/Utils/AnimationFunctions";
import QuoteViewModal from "../Common/Modals/QuoteViewModal";
import { quoteDateFormatter } from "@/Utils/Utils";

const QuotesHistory = ({ quotesData }) => {
  const [itemData, setItemData] = useState();

  useEffect(() => {
    setTimeout(markPageLoaded, 200);
  }, []);
  return (
    <>
      <QuoteViewModal data={itemData} />

      <div className="wrapper-account">
        <h1 className="fs--60 blue-1 split-words" data-aos="d:loop">
          Quotes history
        </h1>
        <div className="no-results d-none">
          <h2 className="fs--30 fw-400 red-1 split-words" data-aos="d:loop">
            No quotes history
          </h2>
        </div>
        <ul
          className="list-quotes-history mt-lg-90 mt-mobile-30"
          data-aos="d:loop"
        >
          {quotesData && quotesData.length === 0 ? (
            <div style={{ margin: "20vh auto" }}>
              <h6 className="fs--40 text-center split-words ">
                No Quote History Found
              </h6>
            </div>
          ) : (
            quotesData.map((quote, index) => {
              const { data } = quote;

              const issueDate = quoteDateFormatter(data.dates.issueDate);
              return (
                <li key={index} className="list-item">
                  <div className="content">
                    <div className="name-date">
                      <h2 className="name">{data.title}</h2>
                      <div className="date">{issueDate}</div>
                    </div>
                    <div className="value">$ 45.000</div>
                    <div className="container-btn">
                      <btn-modal-open
                        group="modal-quotes-history"
                        class="btn-view"
                        onClick={() => setItemData(quotesData[index].data)}
                      >
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
              );
            })
          )}
        </ul>
        <button className="btn-2-blue mt-lg-65 mt-mobile-45">
          <span>Load more</span>
          <i className="icon-arrow-right-2"></i>
        </button>
      </div>
    </>
  );
};

export default QuotesHistory;
