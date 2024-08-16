"use client";
import AnimateLink from "@/components/Common/AnimateLink";

const Disclaimer = ({ textClass, data }) => {
  const CORPORATE_URL = process.env.CORPORATE_URL;

  return (
    <p className="text-agree font-2 fs--16 blue-1 lh-140 mt-lg-25 mt-mobile-20">
      By continuing, you are agreeing with{" "}
      <AnimateLink to={`${CORPORATE_URL}/terms-of-use`} target={"_blank"} className={textClass}>
        <span>Blueprint Studios Terms & Conditions</span>
      </AnimateLink>
      and
      <AnimateLink to={`${CORPORATE_URL}/privacy-policy`} target={"_blank"} className={textClass}>
        <span>Privacy Policy.</span>
      </AnimateLink>
    </p>
  );
};
export default Disclaimer;
