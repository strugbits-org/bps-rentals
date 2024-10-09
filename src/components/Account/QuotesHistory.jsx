"use client";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import QuoteViewModal from "../Common/Modals/QuoteViewModal";
import Modal from "../Common/Modals/Modal";
import useUserData from "@/Hooks/useUserData";
import {
  markPageLoaded,
  pageLoadStart,
  updatedWatched,
} from "@/Utils/AnimationFunctions";
import { calculateTotalCartQuantity, quoteDateFormatter } from "@/Utils/Utils";
import { getAllQuotes } from "@/Services/QuoteApis";
import { AddProductToCart } from "@/Services/CartApis";
import { getCatalogIdBySku } from "@/Services/ProductsApis";
import { revalidatePage } from "@/Services/RevalidateService";
import logError from "@/Utils/ServerActions";

const QuotesHistory = () => {
  const [cookies, setCookie] = useCookies(["cartQuantity"]);
  const router = useRouter();
  const pageSize = 4;

  const [disabledButtons, setDisabledButtons] = useState({});
  const [pageLimit, setPageLimit] = useState(pageSize);
  const [quotesData, setQuotesData] = useState([]);
  const [itemData, setItemData] = useState();
  const [message, setMessage] = useState(null);
  const [modalState, setModalState] = useState({
    success: false,
    error: false,
  });
  const { role } = useUserData();

  const handleAddToCart = async (data, index) => {
    if (disabledButtons[index]) return;

    setDisabledButtons((prevState) => ({
      ...prevState,
      [index]: true,
    }));

    try {
      const products = [];
      for (const item of data) {
        const { name, quantity, fullItem, location } = item;
        const productSku = name;

        try {
          let catalogReference = fullItem?.catalogReference;
          if (!catalogReference) {
            const res = await getCatalogIdBySku(productSku);
            const productId = res.productId;
            const variantId = res.variantId;

            const appId = "215238eb-22a5-4c36-9e7b-e7c08025e04e";
            catalogReference = {
              appId,
              catalogItemId: productId,
              options: {
                variantId,
                customTextFields: { location: location },
              },
            };
          }

          const product = {
            catalogReference: catalogReference,
            quantity: quantity,
          };

          products.push(product);
        } catch (error) {
          logError(`Error processing SKU ${productSku}:`, error);
        }
      }

      const productData = {
        lineItems: products,
      };

      const response = await AddProductToCart(productData);
      const total = calculateTotalCartQuantity(response.cart.lineItems);
      pageLoadStart({});

      setCookie("cartQuantity", total, { path: "/"});
      router.push("/cart");
    } catch (error) {
      logError("Error while adding products to cart:", error);
      setMessage("Error while adding products to cart");
      setModalState({ success: false, error: true });
    } finally {
      setDisabledButtons((prevState) => ({
        ...prevState,
        [index]: false,
      }));
    }
  };

  const fetchQuotes = async () => {
    try {
      await revalidatePage("/api/quote/getAllQuotes")
      const data = await getAllQuotes();
      setQuotesData(data);
      setTimeout(markPageLoaded, 200);
    } catch (error) {
      markPageLoaded();
      logError("Error while fetching quote data:", error);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <>
      {modalState.error && (
        <Modal
          message={message}
          setModalStatus={setModalState}
          modalStatus={modalState}
        />
      )}
      <QuoteViewModal data={itemData} handleAddToCart={handleAddToCart} />

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
            quotesData.slice(0, pageLimit).map((quote, index) => {
              const { data } = quote;
              const totalPrice = data.lineItems.reduce((total, item) => {
                return total + Number(item.price) * item.quantity;
              }, 0);

              const issueDate = quoteDateFormatter(data.dates.issueDate);
              return (
                <li key={index} className="list-item">
                  <div className="content">
                    <div className="name-date">
                      <h2 className="name">{data.title}</h2>
                      <div className="date">{issueDate}</div>
                    </div>
                    {role === "admin" && totalPrice ? (
                      <div className="value">
                        $ {totalPrice.toLocaleString()}
                      </div>
                    ) : (
                      <div className="value"></div>
                    )}
                    <div className="container-btn">
                      <btn-modal-open
                        group="modal-quotes-history"
                        class="btn-view"
                        onClick={() => setItemData(quotesData[index].data)}
                      >
                        <span>View</span>
                        <i className="icon-arrow-diagonal"></i>
                      </btn-modal-open>
                      <button
                        onClick={() => handleAddToCart(data.lineItems, index)}
                        className="btn-order-again"
                        disabled={!!disabledButtons[index]}
                      >
                        <span>
                          {!disabledButtons[index]
                            ? "Order again"
                            : "Please Wait!"}
                        </span>
                        <i className="icon-arrow-diagonal"></i>
                      </button>
                    </div>
                  </div>
                </li>
              );
            })
          )}
        </ul>
        {quotesData && quotesData.length > pageLimit && (
          <button
            onClick={() => {
              setPageLimit((prev) => prev + pageSize);
              updatedWatched();
            }}
            className="btn-2-blue mt-lg-65 mt-mobile-45"
          >
            <span>Load more</span>
            <i className="icon-arrow-right-2"></i>
          </button>
        )}
      </div>
    </>
  );
};

export default QuotesHistory;
