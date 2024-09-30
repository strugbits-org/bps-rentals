"use client";

import { usePathname, useRouter } from "next/navigation";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import useUserData from "@/Hooks/useUserData";

export const CustomScripts = () => {
  const pathname = usePathname();
  const baseUrl = process.env.BASE_URL;

  const { email } = useUserData();
  const [userEmail, setUserEmail] = useState();
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    if (email) {
      setUserEmail(email);
    } else {
      if (hasRun) {
        setUserEmail("visitor");
      }
    }
    setHasRun(true);
  }, [email, hasRun]);

  const canonicalUrl = `${baseUrl}${pathname}`;

  return (
    <>
      <link rel="canonical" href={canonicalUrl} />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-4D3S4F1X60`}
        strategy="afterInteractive"
      />
      <Script src='//fw-cdn.com/11846215/4437905.js' chat='false' strategy="afterInteractive" />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4D3S4F1X60');
          `}
      </Script>
      {userEmail && userEmail !== "visitor" ? (
        <Script id="pinterest-tags" strategy="afterInteractive">
          {`
          !function(e){if(!window.pintrk){window.pintrk = function () {
          window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
            n=window.pintrk;n.queue=[],n.version="3.0";var
            t=document.createElement("script");t.async=!0,t.src=e;var
            r=document.getElementsByTagName("script")[0];
            r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
          pintrk('load', '2613816880133', {em: '${userEmail}'});
          pintrk('page');
          `}
        </Script>
      ) : userEmail === "visitor" ? (
        <Script id="pinterest-tags" strategy="afterInteractive">
          {`
          !function(e){if(!window.pintrk){window.pintrk = function () {
          window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
            n=window.pintrk;n.queue=[],n.version="3.0";var
            t=document.createElement("script");t.async=!0,t.src=e;var
            r=document.getElementsByTagName("script")[0];
            r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
          pintrk('load', '2613816880133');
          pintrk('page');
          `}
        </Script>
      ) : null}

      <Script type="module" rel="modulepreload" src="/assets/loader.js" />
      <Script type="module" rel="modulepreload" src="/assets/chat.js" />
      <Script
        type="module"
        rel="modulepreload"
        src="/assets/app2.js"
      />
      <Script type="module" rel="modulepreload" src="/assets/pjax.js" />
      <Script type="module" rel="modulepreload" src="/assets/all.js" />
      <Script type="module" rel="modulepreload" src="/assets/screen-size.js" />
      <Script type="module" rel="modulepreload" src="/assets/search.js" />
      <Script
        type="module"
        rel="modulepreload"
        src="/assets/product-content.js"
      />
      <Script
        type="module"
        rel="modulepreload"
        src="/assets/cancel-product.js"
      />

      <Script
        type="module"
        rel="modulepreload"
        src="/assets/infinite-image-scroller.js"
      />
      <Script type="module" rel="modulepreload" src="/assets/form-cart.js" />
      <Script type="module" rel="modulepreload" src="/assets/form-sign-in.js" />
      <Script type="module" rel="modulepreload" src="/assets/forms.js" />

      <Script type="module" src="/assets/loader.js"></Script>
      <Script
        type="module"
        src="/assets/app2.js"
      ></Script>
      <Script type="module" src="/assets/all.js"></Script>
      <Script type="module" src="/assets/product-content.js"></Script>
      <Script type="module" src="/assets/infinite-image-scroller.js"></Script>
      <Script type="module" src="/assets/cancel-product.js"></Script>
      <Script type="module" src="/assets/form-cart.js"></Script>
      <Script type="module" src="/assets/form-sign-in.js"></Script>
      <Script type="module" src="/assets/forms.js"></Script>
      <Script type="module" src="/assets/search.js"></Script>
    </>
  );
};
export default CustomScripts;
