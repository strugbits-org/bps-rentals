import { useEffect } from "react";

const useNavigationDetection = (callback) => {
  useEffect(() => {
    const handlePopState = (event) => {
      callback(event);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [callback]);
};

export default useNavigationDetection;
