"use client";

import logError from "./ServerActions";

export const initAnimations = () => {
  if (typeof window !== "undefined") {
    setTimeout(() => {
      const customEvent = new Event("customInitScript");
      const elem = document.querySelector(".initScript");      
      if (elem) elem.dispatchEvent(customEvent);
    }, 400);
  }
};

export const initializeCanvasTrigger = () => {
  if (typeof window !== "undefined") {
    setTimeout(() => {
      const customEvent = new Event("customInit");
      document.querySelector(".initializeCanvas").dispatchEvent(customEvent);
    }, 200);
  }
};

export const reloadCartModal = () => {
  if (typeof window !== "undefined") {
    setTimeout(() => {
      const customEvent = new Event("reloadModal");
      const elem = document.querySelector(".addToCart");
      if (elem) elem.dispatchEvent(customEvent);
    }, 200);
  }
};

export const initializeMatchSwiper = () => {
  if (typeof window !== "undefined") {
    setTimeout(() => {
      const customEvent = new Event("initializeSwiper");
      const elem = document.querySelector(".matchSwiperSlider");
      if (elem) elem.dispatchEvent(customEvent);
    }, 200);
  }
};

export const splitWordsAnimation = () => {
  if (typeof window !== "undefined") {
    setTimeout(() => {
      const customEvent = new Event("splitWords");
      document.querySelector(".triggerSplitWordsAnimation").dispatchEvent(customEvent);
    }, 200);
  }
};

export const resetSlideIndexModal = () => {
  if (typeof window !== "undefined") {
    const swipers = document.querySelectorAll(".swiper-container.reset-slide-enabled");
    if (swipers.length !== 0) return;
    swipers.forEach((x) => {
      x.swiper.updateSlides();
      x.swiper.slideTo(0);
    });
  }
};

export const resetSlideIndex = () => {
  if (typeof window !== "undefined") {
    const swiper = document.querySelector(".swiper-container.reset-slide-enabled");
    if (!swiper?.swiper) return;
    swiper.swiper.updateSlides()
    swiper.swiper.slideTo(0);
  }
};

export const updatedWatched = (refreshScroll = false) => {
  if (typeof window !== "undefined") {
    setTimeout(() => {

      const customEvent = new Event("customUpdateWatch");
      const elem = document.querySelector(".updateWatched");
      if (elem) elem.dispatchEvent(customEvent);

      if (refreshScroll) {
        const scrollRefreshEvent = new Event("refreshScroll");
        document.querySelector(".scrollRefresh").dispatchEvent(scrollRefreshEvent);
        triggerParallax();
        splitWordsAnimation();
      }
    }, 200);
  }
};

export const triggerParallax = () => {
  if (typeof window !== "undefined") {
    const customEvent = new Event("triggerParallax");
    const elem = document.querySelector(".parallaxTrigger");
    if (elem) elem.dispatchEvent(customEvent);
  }
}

export const openModal = (name) => {
  if (typeof window !== "undefined") {
    const modal = document.querySelector(`modal-group[name=${name}]`);
    if (modal && modal.open) modal.open();
  }
}

export const closeModal = (name) => {
  if (typeof window !== "undefined") {
    const modal = document.querySelector(`modal-group[name=${name}]`);
    if (modal && modal.close) modal.close();
  }
}

export const enableRevalidate = () => {
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      document.querySelector(".activateRevalidateButton").click();
    }, 200);
  }
};

export const loadPinterest = () => {
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      try {
        const script = document.createElement("script");
        script.async = true;
        script.type = "text/javascript";
        script.dataset.pinBuild = "doBuild";
        script.src = "//assets.pinterest.com/js/pinit.js";
        document.body.appendChild(script);

        if (typeof window.doBuild === 'function') {
          window.doBuild();
        }
      } catch (error) {
        logError("Error loading Pinterest script:", error);
      }
    }, 1000);
  }
};

export const markPageLoaded = (watched = true) => {
  if (typeof window !== "undefined") {
    setTimeout(() => window.scrollTo({ top: 0 }), 200);
    initAnimations();
    if (watched) updatedWatched(true);
    setTimeout(loadPinterest, 1000);
    const isFirstLoadDone = document.body.classList.contains("first-load-done");
    if (isFirstLoadDone) {
      pageLoadEnd();
    } else {
      firstLoadAnimation();
    }
  }
};

export const firstLoadAnimation = async () => {
  for (let i = 0; i <= 100; i++) {
    await new Promise(resolve => setTimeout(resolve, 1));
    if (i % 25 === 0) {
      changeProgress(i);
    }
  }
  document.body.dataset.load = "first-leaving";
  setTimeout(() => {
    document.body.dataset.load = "first-done";
    document.body.classList.add("first-load-done");
    document.body.classList.remove("overflow-hidden");
    document.getElementById("loader").classList.add("hidden");
  }, 1200);
};

export const pageLoadStart = ({ noScroll = false }) => {
  if (typeof window !== "undefined") {
    closeModals();
    document.body.setAttribute("data-form-cart-state", "");
    document.body.classList.add("page-leave-active");

    if (!noScroll) {
      setTimeout(() => {
        const scrollContainer = document.querySelector("[data-scroll-container]");
        window.scrollTo({ top: 0, behavior: "auto" });
        if (scrollContainer) scrollContainer.classList.add("wrapper-no-transform");
      }, 500);
    }
  }
};
export const pageLoadEnd = () => {
  if (typeof window !== "undefined") {
    const scrollContainer = document.querySelector("[data-scroll-container]");
    if (scrollContainer && scrollContainer.classList.contains("wrapper-no-transform")) scrollContainer.classList.remove("wrapper-no-transform");
  }
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0 });
    const body = document.body;
    body.classList.replace("page-leave-active", "page-enter-active");
    setTimeout(() => {
      body.classList.remove("page-enter-active");
    }, 900);
  }
};

export const changeProgress = (percent) => {
  if (typeof window !== "undefined") {
    document.body.style.setProperty("--percentage", percent / 100);
    document.body.style.setProperty("--percentage2", `${percent}%`);
    const elProg = document.querySelector("[data-load-progress]");
    if (elProg) elProg.dataset.loadProgress = percent;
  }
};

export const closeModals = () => {
  if (typeof window !== "undefined") {
    setTimeout(() => {
      const element = document.querySelector(".header-info-list li.local-item.active");
      if (element) element.querySelector(".custom-close").click();
      const isActive = document.querySelector("body").classList.contains("menu-active");
      if (isActive) document.querySelector("#bt-menu")?.click();
      document.querySelector(".closeModals").click();

      const revalidateModalActive = document.querySelector(".revalidate-button")?.classList?.contains("active");
      if (revalidateModalActive) document.querySelector(".revalidate-button")?.classList?.remove("active");

    }, 200);
  }
};
export const getPageName = () => {
  if (typeof window !== "undefined") {
    const page =
      window.location.pathname.trim() === "/"
        ? "home"
        : location.pathname.substring(1);
    return page.split("/")[0].trim();
  }
};
export const closeLocationsDropdown = () => {
  if (typeof window !== "undefined") {
    const activeDropdown = document.querySelector(".accordion-item.active .accordion-header.custom-close");
    if (activeDropdown) activeDropdown.click();
  }
};
