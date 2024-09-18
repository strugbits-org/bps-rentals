import { useState, useEffect } from "react";
import { saveProduct, unSaveProduct } from "@/Services/ProductsApis";
import useUserData from "@/Hooks/useUserData";
import { useCookies } from "react-cookie";
import logError from "@/Utils/ServerActions";

export const SaveProductButton = ({
  productData,
  dataAos,
  savedProductsData,
  setSavedProductsData,
}) => {
  const [productSaved, setProductSaved] = useState(false);
  const [error, setError] = useState("");
  const { memberId } = useUserData();
  const productId = productData?._id;
  const [cookies, setCookie] = useCookies(["authToken"]);

  useEffect(() => {
    if (savedProductsData?.length) {
      setProductSaved(
        savedProductsData.some((i) => i?.product?._id === productId)
      );
    }
  }, [memberId, savedProductsData]);

  const handleProductSaveToggle = async (productId, isSaving) => {
    try {
      setProductSaved(isSaving);
      updateSavedProducts(productId, isSaving);
      if (isSaving) {
        const res = await saveProduct(productId);
        if (!res) {
          setProductSaved(false);
          updateSavedProducts(productId, false);
        }
      } else {
        const res = await unSaveProduct(productId);
        if (!res) {
          setProductSaved(true);
          updateSavedProducts(productId, true);
        }
      }
    } catch (error) {
      logError(
        `Error ${isSaving ? "saving" : "unsaving"} product:`,
        error
      );
      setProductSaved(!isSaving);
      setError(isSaving ? "saving" : "unsaving");
      updateSavedProducts(productId, !isSaving);
    }
  };

  const updateSavedProducts = (productId, isSaving) => {
    if (setSavedProductsData) {
      if (isSaving) {
        const data = [...savedProductsData, { product: productData }];
        setSavedProductsData(data);
      } else {
        const data = savedProductsData.filter(
          (i) => i?.product?._id !== productId
        );
        setSavedProductsData(data);
      }
    }
  };

  const handleClick = () => {
    const loggedIn = cookies.authToken;
    if (loggedIn && loggedIn !== "undefined") {
      handleProductSaveToggle(productId, !productSaved);
    } else {
      const submenuLogin = document.querySelector(".submenu-login");
      submenuLogin.classList.add("active");
    }

  };

  const buttonProps = {
    className: `btn-bookmark disable-click-outside aos-animate 
    ${error === "" && productSaved ? " productSavedColor" : ""}
    ${error === "saving" && productSaved ? " productSavedColor" : ""}
    ${error === "unsaving" && productSaved ? " productSavedColor" : ""}`,
    onClick: handleClick,
    ...(dataAos && { "data-aos": dataAos }),
  };

  return (
    <button type="button" {...buttonProps}>
      <i className={`icon-bookmark ${productSaved ? "hidden" : "visible"}`}></i>
      <i
        className={`icon-bookmark-full ${productSaved ? "visible" : "hidden"}`}
      ></i>
    </button>
  );
};
