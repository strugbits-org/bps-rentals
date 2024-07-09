"use client";
import { usePathname } from "next/navigation";

const Wrapper = ({ children }) => {
  const pathname = usePathname();

  const path = pathname.trim() === "/" ? "home" : pathname.substring(1);
  const cleanPath = path.split("/")[0].trim();

  return (
    <div id="main-transition">
      <div id={`pg-${cleanPath}`} className="wrapper" data-scroll-container>
        {children}
      </div>
    </div>
  );
};

export default Wrapper;
