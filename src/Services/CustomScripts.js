"use client";

import { useRouter } from "next/navigation";
import Script from "next/script";
import React, { useEffect } from "react";
import { getPageName, markPageLoaded } from "@/Utils/AnimationFunctions";

export const CustomScripts = () => {
  const router = useRouter();
  const onReadyScript = () => {
    if (["home"].includes(getPageName())) markPageLoaded();
  };
  useEffect(() => {
    const handleHashChange = () => {
      if (["home"].includes(getPageName()))
        router.push(`/${window.location.hash}`);
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-4D3S4F1X60`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4D3S4F1X60');
          `}
      </Script>

      <Script type="module" rel="modulepreload" src="/assets/loader.js" />
      <Script type="module" rel="modulepreload" src="/assets/chat.js" />
      <Script
        onReady={onReadyScript}
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
        onReady={onReadyScript}
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
