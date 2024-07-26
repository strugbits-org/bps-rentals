"use client";
import AnimateLink from "@/components/Common/AnimateLink";

const Disclaimer = ({ textClass, data }) => {
  return (
    <p className="text-agree font-2 fs--16 blue-1 lh-140 mt-lg-25 mt-mobile-20">
      By continuing, you are agreeing with{" "}
      <AnimateLink to="/terms-of-use" className={textClass}>
        <span>Blueprint Studios Terms & Conditions</span>
      </AnimateLink>
      and
      <AnimateLink to="/privacy-policy" className={textClass}>
        <span>Privacy Policy.</span>
      </AnimateLink>
    </p>
  );
};
export default Disclaimer;
