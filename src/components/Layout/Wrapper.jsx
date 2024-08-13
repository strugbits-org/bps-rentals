"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const Wrapper = ({ children }) => {
  const pathname = usePathname();

  const path = pathname.trim() === "/" ? "home" : pathname.substring(1);
  let cleanPath = path.split("/")[0].trim();
  if (cleanPath === "quote-details") cleanPath = "quote-request";

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.dataset.pg = `pg-${cleanPath}`;
    }
  }, [cleanPath]);
  return (
    <div id="main-transition">
      <div id={`pg-${cleanPath}`} className="wrapper" data-scroll-container>
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
