import { initializeCanvasTrigger } from "@/Utils/AnimationFunctions";
import { useEffect } from "react";

const ModalCanvas3d = ({ path }) => {  
  useEffect(() => {
    initializeCanvasTrigger();
  }, []);

  const getPath = (url) => url.replace(/0\.jpg$/, "");

  return (
    <canvas
      className="infinite-image-scroller"
      data-frames="49"
      data-path={getPath(path)}
      data-extension="jpg"
    ></canvas>
  );
};

export default ModalCanvas3d;
