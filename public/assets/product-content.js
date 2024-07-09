import { D as DataSetGet, S as Swiper, N as Navigation, T as Thumb, I as InfiniteImageScroller } from "./infinite-image-scroller.js";
import "./all.js";
function productContent() {
  let productContent2 = document.querySelectorAll("[data-product-content]:not(.js-cart-running)");
  productContent2.forEach((element) => {
    element.classList.add("js-cart-running");
    new DataSetGet({
      parentContainer: element,
      dataGetSelector: "[data-get-color]",
      dataSetSelector: "[data-set-color]",
      listener: "click",
      //'hover' ou 'click'
      toggle: false,
      multiple: false,
      deactivateOnClickOutside: false,
      leaveDelay: 800,
      onClose: () => {
      },
      onComplete: () => {
      },
      onActivate: (item) => {
      },
      onDeactivate: (item) => {
      }
    });
    let slider = element.querySelectorAll(".wrapper-slider-product:not(.js-slider-running)");
    slider.forEach((el) => {
      el.classList.add("js-slider-running");
      let sliderProductThumb = new Swiper(el.querySelector(".slider-product-thumb .swiper-container"), {
        modules: [Navigation],
        slidesPerView: "auto",
        spaceBetween: 0,
        slidesPerGroup: 1,
        loop: false,
        effect: "slide",
        pagination: {
          el: el.querySelector(".slider-product-thumb .swiper-pagination"),
          clickable: true
        },
        navigation: {
          nextEl: el.querySelector(".slider-product-thumb .swiper-button-next"),
          prevEl: el.querySelector(".slider-product-thumb .swiper-button-prev")
        },
        loopFillGroupWithBlank: false,
        centerInsufficientSlides: true,
        grabCursor: false,
        observer: true,
        preloadImages: false,
        lazy: true,
        watchOverflow: true,
        speed: 600,
        direction: "vertical",
        touchStartPreventDefault: false
      });
      el.querySelector(".slider-product-thumb .swiper-container").swiper = slider;
      let sliderProduct = new Swiper(el.querySelector(".slider-product .swiper-container"), {
        modules: [Navigation, Thumb],
        slidesPerView: 1,
        spaceBetween: 0,
        slidesPerGroup: 1,
        loop: false,
        effect: "slide",
        navigation: {
          nextEl: el.querySelector(".slider-product .swiper-button-next"),
          prevEl: el.querySelector(".slider-product .swiper-button-prev")
        },
        loopFillGroupWithBlank: false,
        centerInsufficientSlides: true,
        grabCursor: false,
        observer: true,
        preloadImages: false,
        lazy: true,
        watchOverflow: true,
        speed: 600,
        allowTouchMove: false,
        preventClicksPropagation: false,
        thumbs: {
          swiper: sliderProductThumb
        }
      });
      el.querySelector(".slider-product .swiper-container").swiper = sliderProduct;
    });
    element.querySelectorAll(".infinite-image-scroller").forEach((ele) => {
      const imageScroller = new InfiniteImageScroller(ele, ele.dataset.frames, ele.dataset.path, ele.dataset.extension);
      ele.InfiniteImageScroller = imageScroller;
    });
    element.addEventListener("modal:open", function() {
      setTimeout(() => {
        resizeImages();
      }, 100);
    });
    function resizeImages() {
      let a = element.querySelectorAll(".swiper-slide-active .infinite-image-scroller");
      a.forEach((el) => {
        if (el)
          el.InfiniteImageScroller.resize();
      });
    }
    element.querySelectorAll("[data-set-color]").forEach((ele) => {
      ele.addEventListener("click", function() {
        setTimeout(() => {
          resizeImages();
        }, 100);
      });
    });
    element.querySelectorAll(".slider-product .swiper-container").forEach((ele) => {
      if (ele.swiper) {
        ele.swiper.on("slideChange", function() {
          setTimeout(() => {
            resizeImages();
          }, 100);
        });
      }
    });
  });
}
productContent();
document.addEventListener("pjax:complete", productContent);
