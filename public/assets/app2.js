var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) =>
  function __require() {
    return (
      mod ||
      (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    );
  };
import {
  g as geral,
  s as singlePjaxInstance,
  m as manualModalClose,
  c as commonjsGlobal,
  a as getDefaultExportFromCjs,
} from "./pjax.js";
import {
  e as elementOuterSize,
  a as elementIndex,
  c as createElementIfNotDefined,
  b as elementParents,
  g as getDocument,
  d as getSlideTransformEl,
  f as elementTransitionEnd,
  S as Swiper,
  N as Navigation,
  D as DataSetGet,
  t as toElement,
  T as Thumb,
  I as InfiniteImageScroller,
} from "./infinite-image-scroller.js";
import { s as screen } from "./screen-size.js";
import {
  g as gsapWithCSS$1,
  S as ScrollTrigger$1,
  P as Power3,
  a as Power0,
  B as Back,
  b as gsap$1,
  C as CSSPlugin,
  c as ScrollSmoother,
  d as Power1,
} from "./all.js";
import { initializeCanvas } from "./product-content.js";

var require_app2 = __commonJS({
  "assets/app2.js"(exports, module) {
    // if (VARS.analytics) {
    //   let analytics = function () {
    //     ga("set", "location", window.location.href);
    //     ga("send", "pageview");
    //   };
    //   (function (i, s, o, g, r, a, m) {
    //     i["GoogleAnalyticsObject"] = r;
    //     (i[r] =
    //       i[r] ||
    //       function () {
    //         (i[r].q = i[r].q || []).push(arguments);
    //       }),
    //       (i[r].l = 1 * /* @__PURE__ */ new Date());
    //     (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
    //     a.async = 1;
    //     a.src = g;
    //     m.parentNode.insertBefore(a, m);
    //   })(
    //     window,
    //     document,
    //     "script",
    //     "https://www.google-analytics.com/analytics.js",
    //     "ga"
    //   );
    //   ga("create", VARS.analytics, "auto");
    //   ga("send", "pageview");
    //   document.addEventListener("pjax:end", analytics);
    // }
    // if (VARS.gtag) {
    //   let gtagEvent = function () {
    //     gtag("event", "pageview", {
    //       page_path: location.pathname + location.search + location.hash,
    //     });
    //   };
    //   document.addEventListener("pjax:end", gtagEvent);
    // }
    function toElementArray(selector) {
      if (typeof selector == "string") {
        return Array.from(document.querySelectorAll(selector));
      } else if (selector instanceof Array) {
        return selector;
      } else if (
        selector instanceof HTMLCollection ||
        selector instanceof NodeList
      ) {
        return Array.from(selector);
      } else if (selector instanceof HTMLElement) {
        return [selector];
      } else {
        console.error("O que é isso? ", selector);
      }
    }
    function onClickOutside(internalAreas, callback, options) {
      const {
        autoStop = true,
        autoStart = true,
        once = false,
      } = options ? options : {};
      const obj = {
        areas: toElementArray(internalAreas),
        clickInside: false,
        cb: callback,
        autoStop,
        once,
        in: (ev) => {
          obj.clickInside = true;
        },
        out: (ev) => {
          if (!obj.clickInside) {
            obj.cb(ev);
            if (obj.autoStop) obj.stop();
            if (obj.once) obj.destroy();
          }
          obj.clickInside = false;
        },
        start() {
          setTimeout(() => {
            this.areas.forEach((el) => el.addEventListener("click", this.in));
            document.addEventListener("click", this.out);
          }, 0);
        },
        stop() {
          this.areas.forEach((el) => el.removeEventListener("click", this.in));
          document.removeEventListener("click", this.out);
        },
        destroy() {
          this.stop();
          this.areas = null;
          this.cb = null;
        },
      };
      if (autoStart) obj.start();
      return obj;
    }
    (function () {
      const menuactive = "menu-active";
      const menuleave = "menu-leave";
      const bodycl = document.body.classList;
      Array.from(
        document.querySelectorAll(
          ".menu--wrapper, #bt-menu, [data-modal],.modal"
        )
      );
      const menu = {
        get isOpen() {
          return bodycl.contains(menuactive);
        },
        open() {
          bodycl.add(menuactive);
        },
        close(time = 800) {
          if (!bodycl.contains(menuactive)) {
            return;
          }
          bodycl.remove(menuactive);
          bodycl.add(menuleave);
          setTimeout(() => {
            bodycl.remove(menuleave);
          }, 800);
        },
      };
      const btnMenu = document.getElementById("bt-menu");
      btnMenu.addEventListener("click", () => {
        const element = document.querySelector(".header-info-list li.local-item.active");
        if (element) element.querySelector(".custom-close").click();
        menu.isOpen ? menu.close() : menu.open();
      });
      const btnMenuClose = document.querySelectorAll("[data-menu-close]");
      btnMenuClose.forEach((el) => {
        el.addEventListener("click", () => menu.close());
      });
    })();
    function parseAnimation(strAr) {
      let animation = "",
        duration = ".8s",
        timingFunction = "ease-in-out",
        delay = "",
        iteration = "",
        fill = "both";
      for (let i = 0; i < strAr.length; i++) {
        const str = strAr[i];
        const n = Number.parseFloat(str);
        if (i == 0) {
          animation = str;
          continue;
        }
        if (i == 1) {
          if (!isNaN(n)) {
            duration = str;
          } else if (isEase(str)) {
            timingFunction = timingDict[str];
          } else if (str === "infinite") {
            delay = "0s";
            iteration = str;
          }
          continue;
        }
        if (i == 2) {
          if (!isNaN(n)) {
            delay = str;
          } else if (str == "-") {
            delay = "0s";
          } else if (isEase(str)) {
            timingFunction = timingDict[str];
          } else if (str === "infinite") {
            delay = "0s";
            iteration = str;
          }
          continue;
        }
        if (i == 3) {
          if (!isNaN(n) && !delay) {
            delay = str;
          } else if (!isNaN(n) && delay) {
            iteration = str;
          } else if (str == "-") {
            delay = "0s";
          } else if (isEase(str)) {
            timingFunction = timingDict[str];
          } else if (str === "infinite") {
            delay = "0s";
            iteration = str;
          }
          continue;
        }
        if (i == 4) {
          if (!isNaN(str)) {
            iteration = str;
          } else if (str === "infinite") {
            iteration = str;
          }
        }
      }
      let result = `${animation} ${duration} ${timingFunction}`;
      if (delay) result += " " + delay;
      if (iteration) result += " " + iteration;
      result += " " + fill;
      return result;
    }
    function isEase(str) {
      if (timingDict[str]) {
        return true;
      } else {
        return false;
      }
    }
    const timingDict = {
      ease: "ease",
      linear: "linear",
      "ease-in": "ease-in",
      "ease-out": "ease-out",
      "ease-in-out": "ease-in-out",
      "ease-in-quad": "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
      "ease-in-cubic": "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
      "ease-in-quart": "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
      "ease-in-quint": "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
      "ease-in-sine": "cubic-bezier(0.470, 0.000, 0.745, 0.715)",
      "ease-in-expo": "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
      "ease-in-circ": "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
      "ease-in-back": "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
      "ease-out-quad": "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
      "ease-out-cubic": "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
      "ease-out-quart": "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
      "ease-out-quint": "cubic-bezier(0.230, 1.000, 0.320, 1.000)",
      "ease-out-sine": "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
      "ease-out-expo": "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
      "ease-out-circ": "cubic-bezier(0.075, 0.820, 0.165, 1.000)",
      "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
      "ease-in-out-quad": "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
      "ease-in-out-cubic": "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
      "ease-in-out-quart": "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
      "ease-in-out-quint": "cubic-bezier(0.860, 0.000, 0.070, 1.000)",
      "ease-in-out-sine": "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
      "ease-in-out-expo": "cubic-bezier(1.000, 0.000, 0.000, 1.000)",
      "ease-in-out-circ": "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
      "ease-in-out-back": "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
    };
    function tokenizer(input) {
      const regTokens = /([^,\s].[^,]*)/g;
      const regKey = /.+?(?=:)/;
      const regValues = /(?!.+?:)[^:\s]\S+|-|\d+/g;
      const result = [];
      const tokens2 = input.match(regTokens);
      if (!tokens2) return null;
      tokens2.forEach((t) => {
        const key = t.match(regKey);
        const values = t.match(regValues);
        result.push({ key: key ? key[0] : null, values });
      });
      return result;
    }
    let watched = [];
    let screenSize = "";
    const getsize = function () {
      const iw = window.innerWidth;
      if (iw < 768) screenSize = "phone";
      if (iw >= 768 && iw <= 1200) screenSize = "tablet";
      if (iw > 1200) screenSize = "desktop";
    };
    getsize();
    window.addEventListener("resize", getsize);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const defs = watched.filter((t) => t.trigger === entry.target);
        const vis = entry.isIntersecting;
        const scrollingDown = entry.boundingClientRect.top < 0;
        defs.forEach((def) => {
          if (!def.el.isConnected || (vis && !def.isConnected)) {
            def.isConnected = def.el.isConnected;
            return;
          }
          if ((vis && !def.animated) || (vis && def.loop[screenSize])) {
            let animate = function () {
              def.animated = true;
              def.el.classList.add("aos-animate");
              if (def[screenSize]) {
                def.el.style.animation = def[screenSize];
                def.el.classList.add(def[screenSize].match(/^\S+/)[0]);
              }
            };
            let delay = 0;
            if (screenSize == "phone" && def.el.dataset.delayPhone) {
              delay = def.el.dataset.delayPhone;
            } else if (screenSize == "tablet" && def.el.dataset.delayTablet) {
              delay = def.el.dataset.delayTablet;
            } else if (screenSize == "desktop" && def.el.dataset.delayDesktop) {
              delay = def.el.dataset.delayDesktop;
            } else if (def.el.dataset.delay) {
              delay = def.el.dataset.delay;
            }
            if (delay > 0) {
              setTimeout(() => {
                animate();
              }, delay);
            } else {
              animate();
            }
          }
          if (!vis && def.loop[screenSize] && !scrollingDown) {
            if (def[screenSize]) {
              def.el.style.animation = "";
              const elclass = def[screenSize].match(/^\S+/);
              if (elclass) def.el.classList.remove(elclass[0]);
            }
            def.el.classList.remove("aos-animate");
          }
        });
      });
    });
    const obsAttrbutes = new MutationObserver(() => {
      updateWatched();
    });
    const updateWatched = function () {
      watched = [];
      obs.disconnect();
      obsAttrbutes.disconnect();
      const els = document.querySelectorAll("[data-aos]");
      els.forEach((el) => {
        createAosParams(el);
      });
    };
    function createAosParams(el) {
      const aosdef = {
        el,
        isConnected: el.isConnected,
        trigger: el,
        loop: {
          desktop: false,
          tablet: false,
          phone: false,
        },
        animated: false,
        desktop: null,
        tablet: null,
        phone: null,
      };
      const tokens2 = tokenizer(el.dataset.aos);
      if (tokens2) {
        tokens2.forEach((t) => {
          if (t.key === "trigger") {
            let trigger = el.closest(t.values[0]);
            if (!trigger) {
              trigger = document.querySelector(t.values[0]);
            }
            aosdef.trigger = trigger;
            return;
          }
          if (t.values[0] === "loop") {
            if (!t.key) {
              aosdef.loop.desktop = true;
              aosdef.loop.tablet = true;
              aosdef.loop.phone = true;
            } else {
              if (t.key.includes("d")) aosdef.loop.desktop = true;
              if (t.key.includes("t")) aosdef.loop.tablet = true;
              if (t.key.includes("p")) aosdef.loop.phone = true;
            }
            return;
          }
          const v = parseAnimation(t.values);
          if (!t.key) {
            aosdef.desktop = v;
            aosdef.tablet = v;
            aosdef.phone = v;
            return;
          }
          if (t.key.includes("d")) aosdef.desktop = v;
          if (t.key.includes("t")) aosdef.tablet = v;
          if (t.key.includes("p")) aosdef.phone = v;
        });
      }
      obs.observe(aosdef.trigger);
      obsAttrbutes.observe(aosdef.el, { attributeFilter: ["data-aos"] });
      watched.push(aosdef);
    }
    const defaultConfig = {
      rootMargin: "0px",
      threshold: 0,
      load: function load(a) {
        if ("picture" === a.nodeName.toLowerCase()) {
          let src = a.querySelector("source").getAttribute("srcset");
          let image = new Image();
          image.src = src;
          a.append(image);
          image.onload = function () {
            markAsLoaded(a);
          };
        }
        "iframe" === a.nodeName.toLowerCase() &&
          a.getAttribute("data-src") &&
          (a.setAttribute("src", a.getAttribute("data-src")),
            a.setAttribute("data-loaded", "true"));
        if (
          "video" === a.nodeName.toLowerCase() &&
          !a.getAttribute("data-src") &&
          a.children
        ) {
          a.setAttribute("poster", a.getAttribute("data-poster"));
          b = a.children;
          for (var d, c = 0; c <= b.length - 1; c++)
            if ((d = b[c].getAttribute("data-src"))) b[c].src = d;
          a.load();
        }
        a.getAttribute("data-src") && (a.src = a.getAttribute("data-src"));
        a.getAttribute("data-srcset") &&
          a.setAttribute("srcset", a.getAttribute("data-srcset"));
        a.getAttribute("data-background-image") &&
          (a.style.backgroundImage =
            "url('" + a.getAttribute("data-background-image") + "')");
        a.getAttribute("data-toggle-class") &&
          a.classList.toggle(a.getAttribute("data-toggle-class"));
      },
      loaded: function loaded(e) {
        e.onload = (e2) => {
          markAsLoaded(e2.target);
        };
      },
    };
    function markAsLoaded(element) {
      element.setAttribute("data-loaded", true);
      element.parentElement.setAttribute("data-loaded", true);
    }
    const isLoaded = function (element) {
      return element.getAttribute("data-loaded") === "true";
    };
    const onIntersection = function onIntersection2(load, loaded) {
      return function (entries, observer2) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio > 0 || entry.isIntersecting) {
            observer2.unobserve(entry.target);
            if (!isLoaded(entry.target)) {
              load(entry.target);
              loaded(entry.target);
            }
          }
        });
      };
    };
    const getElements = function getElements2(selector) {
      var root =
        arguments.length > 1 && arguments[1] !== void 0
          ? arguments[1]
          : document;
      if (selector instanceof Element) {
        return [selector];
      }
      if (selector instanceof NodeList) {
        return selector;
      }
      return root.querySelectorAll(selector);
    };
    function lozad(selector = ".lozad", options = {}) {
      var selector =
        arguments.length > 0 && arguments[0] !== void 0
          ? arguments[0]
          : ".lozad";
      var options =
        arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var _Object$assign = Object.assign({}, defaultConfig, options),
        root = _Object$assign.root,
        rootMargin = _Object$assign.rootMargin,
        threshold = _Object$assign.threshold,
        load = _Object$assign.load,
        loaded = _Object$assign.loaded;
      var observer2 = void 0;
      if (typeof window !== "undefined" && window.IntersectionObserver) {
        observer2 = new IntersectionObserver(onIntersection(load, loaded), {
          root,
          rootMargin,
          threshold,
        });
      }
      return {
        observe: function observe() {
          var elements = getElements(selector, root);
          for (var i = 0; i < elements.length; i++) {
            if (isLoaded(elements[i])) {
              continue;
            }
            if (observer2) {
              observer2.observe(elements[i]);
              continue;
            }
            load(elements[i]);
            markAsLoaded(elements[i]);
            loaded(elements[i]);
          }
        },
        triggerLoad: function triggerLoad(element) {
          if (isLoaded(element)) {
            return;
          }
          load(element);
          markAsLoaded(element);
          loaded(element);
        },
        observer: observer2,
      };
    }
    function observers() {
      var pictureObserver = lozad("[data-lazy]", {
        threshold: 0.01,
        rootMargin: "1000px 0px",
      });
      pictureObserver.observe();
      let video = document.querySelectorAll("video[data-play-pause]");
      let videoObserver = new IntersectionObserver(
        function (entries, videoObserver2) {
          entries.forEach(function (entry, key) {
            if (entry.intersectionRatio == 0 && !entry.target.paused) {
              entry.target.pause();
              this["isPaused" + key] = true;
            } else if (
              this["isPaused" + key] == true ||
              entry.target.hasAttribute("autoplay")
            ) {
              entry.target.play();
              this["isPaused" + key] = false;
            }
          });
        },
        {
          threshold: 0,
        }
      );
      video.forEach(function (video2) {
        videoObserver.observe(video2);
      });
      let play = document.querySelectorAll("[data-play-toggle]");
      let playObserver = new IntersectionObserver(
        function (entries, playObserver2) {
          entries.forEach(function (entry) {
            var slide = document.querySelector(
              "#" + entry.target.id + " .swiper-container"
            ).swiper;
            if (entry.intersectionRatio > 0) {
              slide.autoplay.start();
            } else {
              slide.autoplay.stop();
            }
          });
        },
        {
          threshold: 0,
          rootMargin: "0px",
        }
      );
      play.forEach(function (play2) {
        playObserver.observe(play2);
      });
    }
    function cursor(options) {
      const {
        disabledState = "",
        clickDiv = false,
        baseElement = document.getElementById("wrapper-cursor"),
        cursorElement = baseElement,
        defaultCursor = "default",
      } = options ? options : {};
      let y = 0;
      let x = 0;
      let waitingRecalc = false;
      let elementsStack = [];
      let cursorData = defaultCursor;
      let cursorTitle = "";
      let cursorColor = "";
      let cursorInWindow = true;
      let lastFrame = performance.now();
      let elementsDefault = [];
      document.addEventListener("mousemove", mouseMove, { passive: true });
      document.addEventListener("click", click, { passive: true });
      document.addEventListener("mouseout", mouseOut, { passive: true });
      document.addEventListener("scroll", scroll, { passive: true });
      function mouseOut(e) {
        if (e.toElement === null) {
          cursorInWindow = false;
        }
      }
      function scroll() {
        if (waitingRecalc === false) {
          waitingRecalc = true;
          setTimeout(recalcStack, 100);
        }
      }
      function click() {
        baseElement.dataset.clicked = true;
        setTimeout(() => {
          baseElement.dataset.clicked = false;
        }, 350);
        recalcStack();
        if (clickDiv) {
          let node = document.createElement("div");
          node.dataset.cursor =
            cursorData != "" ? `${cursorData}-click` : "click";
          node.style.top = y + "px";
          node.style.left = x + "px";
          node.style.position = "fixed";
          document.body.appendChild(node);
          setTimeout(document.body.removeChild, 1e3, node);
        }
      }
      function mouseMove(e) {
        x = e.clientX;
        y = e.clientY;
        cursorInWindow = true;
        if (waitingRecalc === false) {
          waitingRecalc = true;
          setTimeout(recalcStack, 100);
        }
        if (performance.now() - lastFrame > 10) {
          window.requestAnimationFrame(function (animationStart) {
            cursorElement.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
            lastFrame = animationStart;
          });
        }
      }
      function recalcStack() {
        elementsStack = document.elementsFromPoint(x, y);
        let hasMouseClass = false;
        let hasDefaultClass = false;
        let hasMouseTitle = false;
        let hasMouseColor = false;
        elementsStack
          .slice()
          .reverse()
          .forEach((e) => {
            if (e.nodeName === "IFRAME") {
              cursorInWindow = false;
            }
            if ("cursorTitle" in e.dataset) {
              cursorTitle = e.dataset.cursorTitle;
              hasMouseTitle = true;
            }
            if ("cursorStyle" in e.dataset) {
              cursorData = e.dataset.cursorStyle;
              hasMouseClass = true;
            }
            if ("cursorColor" in e.dataset) {
              cursorColor = e.dataset.cursorColor;
              hasMouseColor = true;
            }
            if (hasMouseClass == false && elementsDefault.length > 0) {
              let thisDefault = elementsDefault.find(
                (d) => d.e === e.nodeName.toLowerCase()
              );
              if (thisDefault != void 0) {
                cursorData = thisDefault.r;
                hasDefaultClass = true;
              }
            }
          });
        if (hasMouseTitle === false) {
          setTimeout(() => {
            cursorTitle = "";
          }, 600);
        }
        if (hasMouseColor === false) {
          setTimeout(() => {
            cursorColor = "";
          }, 600);
        }
        if (hasMouseClass === false && hasDefaultClass === false) {
          cursorData = defaultCursor;
        }
        waitingRecalc = false;
        baseElement.dataset.cursorTitle = cursorInWindow ? cursorTitle : "";
        baseElement.dataset.cursorColor = cursorInWindow ? cursorColor : "";
        baseElement.style.setProperty(
          "--cursor-color",
          cursorInWindow ? cursorColor : ""
        );
        baseElement.dataset.cursor = cursorInWindow
          ? cursorData
          : disabledState;
      }
      function AddDefault(element, rule) {
        elementsDefault.push({ e: element, r: rule });
      }
      return {
        AddDefault,
      };
    }
    class Page {
      /**
       * Objeto definindo uma página
       * @param {object} params
       * @param {string} params.pageName Nome da página sem o "pg"
       * @param {function} params.init Primeira função a ser chamada, no primeiro carregamento é no "readyState interactive" no pjax, "success"
       * @param {function} params.main Principal função, chamada no primeiro carregamento no "readyState complete"
       * @param {function} params.destroy Chamada
       */
      constructor({ pageName: pageName2, main: main2, init, destroy }) {
        this.pageName = pageName2;
        this.init = init ? init : empty;
        this.main = main2;
        this.destroy = destroy ? destroy : empty;
        this.transitionDelayDesktop = 600;
        this.transitionDelayMobile = 300;
        function empty() {
          return true;
        }
      }
    }
    // class PageController {
    //   constructor() {
    //     this.pages = [];
    //     this.currentPage = {};
    //     this.lastPage = {};
    //     this.firstPage = true;
    //     document.addEventListener("pjax:send", this);
    //     document.addEventListener("pjax:complete", this);
    //     document.addEventListener("pjax:error", this);
    //   }
    //   /**
    //    * @param {Event} ev
    //    */
    //   handleEvent(ev) {
    //     switch (ev.type) {
    //       case "pjax:send":
    //         if (this.currentPage) {
    //           this.currentPage.destroy();
    //         }
    //         break;
    //       case "pjax:complete":
    //         this.firstPage = false;
    //         if (this.updateCurrent()) {
    //           this.runCurrent();
    //         }
    //         break;
    //       case "pjax:error":
    //         const problematicUrl = ev.triggerElement.href;
    //         location.assign(problematicUrl);
    //         break;
    //     }
    //   }
    //   updateCurrent() {
    //     const pg = this.pages.find((e) =>
    //       e.pageName.includes(geral.currentPageId)
    //     );
    //     if (!pg) {
    //       console.warn(`js da página ${geral.currentPageId} não encontrado`);
    //       this.currentPage = null;
    //       return false;
    //     }
    //     if (this.firstPage) {
    //       this.currentPage = pg;
    //       return true;
    //     } else {
    //       this.lastPage = this.currentPage;
    //       this.currentPage = pg;
    //       return true;
    //     }
    //   }
    //   runCurrent() {
    //     const pg = this.currentPage;
    //     try {
    //       pg.init();
    //     } catch (error) {
    //       console.error(`Erro no init da página ${pg.pageName}: ${error}`);
    //     }
    //     try {
    //       pg.main();
    //     } catch (error) {
    //       console.error(`Erro no main da página ${pg.pageName}: ${error}`);
    //     }
    //   }
    //   add(page) {
    //     this.pages.push(page);
    //   }
    // }
    function classesToSelector(classes = "") {
      return `.${classes
        .trim()
        .replace(/([\.:!+\/])/g, "\\$1")
        .replace(/ /g, ".")}`;
    }
    function Pagination({ swiper, extendParams, on, emit }) {
      const pfx = "swiper-pagination";
      extendParams({
        pagination: {
          el: null,
          bulletElement: "span",
          clickable: false,
          hideOnClick: false,
          renderBullet: null,
          renderProgressbar: null,
          renderFraction: null,
          renderCustom: null,
          progressbarOpposite: false,
          type: "bullets",
          // 'bullets' or 'progressbar' or 'fraction' or 'custom'
          dynamicBullets: false,
          dynamicMainBullets: 1,
          formatFractionCurrent: (number) => number,
          formatFractionTotal: (number) => number,
          bulletClass: `${pfx}-bullet`,
          bulletActiveClass: `${pfx}-bullet-active`,
          modifierClass: `${pfx}-`,
          currentClass: `${pfx}-current`,
          totalClass: `${pfx}-total`,
          hiddenClass: `${pfx}-hidden`,
          progressbarFillClass: `${pfx}-progressbar-fill`,
          progressbarOppositeClass: `${pfx}-progressbar-opposite`,
          clickableClass: `${pfx}-clickable`,
          lockClass: `${pfx}-lock`,
          horizontalClass: `${pfx}-horizontal`,
          verticalClass: `${pfx}-vertical`,
          paginationDisabledClass: `${pfx}-disabled`,
        },
      });
      swiper.pagination = {
        el: null,
        bullets: [],
      };
      let bulletSize;
      let dynamicBulletIndex = 0;
      const makeElementsArray = (el) => {
        if (!Array.isArray(el)) el = [el].filter((e) => !!e);
        return el;
      };
      function isPaginationDisabled() {
        return (
          !swiper.params.pagination.el ||
          !swiper.pagination.el ||
          (Array.isArray(swiper.pagination.el) &&
            swiper.pagination.el.length === 0)
        );
      }
      function setSideBullets(bulletEl, position) {
        const { bulletActiveClass } = swiper.params.pagination;
        if (!bulletEl) return;
        bulletEl =
          bulletEl[
          `${position === "prev" ? "previous" : "next"}ElementSibling`
          ];
        if (bulletEl) {
          bulletEl.classList.add(`${bulletActiveClass}-${position}`);
          bulletEl =
            bulletEl[
            `${position === "prev" ? "previous" : "next"}ElementSibling`
            ];
          if (bulletEl) {
            bulletEl.classList.add(
              `${bulletActiveClass}-${position}-${position}`
            );
          }
        }
      }
      function onBulletClick(e) {
        const bulletEl = e.target.closest(
          classesToSelector(swiper.params.pagination.bulletClass)
        );
        if (!bulletEl) {
          return;
        }
        e.preventDefault();
        const index = elementIndex(bulletEl) * swiper.params.slidesPerGroup;
        if (swiper.params.loop) {
          if (swiper.realIndex === index) return;
          const newSlideIndex = swiper.getSlideIndexByData(index);
          const currentSlideIndex = swiper.getSlideIndexByData(
            swiper.realIndex
          );
          if (newSlideIndex > swiper.slides.length - swiper.loopedSlides) {
            swiper.loopFix({
              direction: newSlideIndex > currentSlideIndex ? "next" : "prev",
              activeSlideIndex: newSlideIndex,
              slideTo: false,
            });
          }
          swiper.slideToLoop(index);
        } else {
          swiper.slideTo(index);
        }
      }
      function update() {
        const rtl = swiper.rtl;
        const params = swiper.params.pagination;
        if (isPaginationDisabled()) return;
        let el = swiper.pagination.el;
        el = makeElementsArray(el);
        let current;
        let previousIndex;
        const slidesLength =
          swiper.virtual && swiper.params.virtual.enabled
            ? swiper.virtual.slides.length
            : swiper.slides.length;
        const total = swiper.params.loop
          ? Math.ceil(slidesLength / swiper.params.slidesPerGroup)
          : swiper.snapGrid.length;
        if (swiper.params.loop) {
          previousIndex = swiper.previousRealIndex || 0;
          current =
            swiper.params.slidesPerGroup > 1
              ? Math.floor(swiper.realIndex / swiper.params.slidesPerGroup)
              : swiper.realIndex;
        } else if (typeof swiper.snapIndex !== "undefined") {
          current = swiper.snapIndex;
          previousIndex = swiper.previousSnapIndex;
        } else {
          previousIndex = swiper.previousIndex || 0;
          current = swiper.activeIndex || 0;
        }
        if (
          params.type === "bullets" &&
          swiper.pagination.bullets &&
          swiper.pagination.bullets.length > 0
        ) {
          const bullets = swiper.pagination.bullets;
          let firstIndex;
          let lastIndex;
          let midIndex;
          if (params.dynamicBullets) {
            bulletSize = elementOuterSize(
              bullets[0],
              swiper.isHorizontal() ? "width" : "height",
              true
            );
            el.forEach((subEl) => {
              subEl.style[swiper.isHorizontal() ? "width" : "height"] = `${bulletSize * (params.dynamicMainBullets + 4)
                }px`;
            });
            if (params.dynamicMainBullets > 1 && previousIndex !== void 0) {
              dynamicBulletIndex += current - (previousIndex || 0);
              if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
                dynamicBulletIndex = params.dynamicMainBullets - 1;
              } else if (dynamicBulletIndex < 0) {
                dynamicBulletIndex = 0;
              }
            }
            firstIndex = Math.max(current - dynamicBulletIndex, 0);
            lastIndex =
              firstIndex +
              (Math.min(bullets.length, params.dynamicMainBullets) - 1);
            midIndex = (lastIndex + firstIndex) / 2;
          }
          bullets.forEach((bulletEl) => {
            const classesToRemove = [
              ...[
                "",
                "-next",
                "-next-next",
                "-prev",
                "-prev-prev",
                "-main",
              ].map((suffix) => `${params.bulletActiveClass}${suffix}`),
            ]
              .map((s) =>
                typeof s === "string" && s.includes(" ") ? s.split(" ") : s
              )
              .flat();
            bulletEl.classList.remove(...classesToRemove);
          });
          if (el.length > 1) {
            bullets.forEach((bullet) => {
              const bulletIndex = elementIndex(bullet);
              if (bulletIndex === current) {
                bullet.classList.add(...params.bulletActiveClass.split(" "));
              } else if (swiper.isElement) {
                bullet.setAttribute("part", "bullet");
              }
              if (params.dynamicBullets) {
                if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                  bullet.classList.add(
                    ...`${params.bulletActiveClass}-main`.split(" ")
                  );
                }
                if (bulletIndex === firstIndex) {
                  setSideBullets(bullet, "prev");
                }
                if (bulletIndex === lastIndex) {
                  setSideBullets(bullet, "next");
                }
              }
            });
          } else {
            const bullet = bullets[current];
            if (bullet) {
              bullet.classList.add(...params.bulletActiveClass.split(" "));
            }
            if (swiper.isElement) {
              bullets.forEach((bulletEl, bulletIndex) => {
                bulletEl.setAttribute(
                  "part",
                  bulletIndex === current ? "bullet-active" : "bullet"
                );
              });
            }
            if (params.dynamicBullets) {
              const firstDisplayedBullet = bullets[firstIndex];
              const lastDisplayedBullet = bullets[lastIndex];
              for (let i = firstIndex; i <= lastIndex; i += 1) {
                if (bullets[i]) {
                  bullets[i].classList.add(
                    ...`${params.bulletActiveClass}-main`.split(" ")
                  );
                }
              }
              setSideBullets(firstDisplayedBullet, "prev");
              setSideBullets(lastDisplayedBullet, "next");
            }
          }
          if (params.dynamicBullets) {
            const dynamicBulletsLength = Math.min(
              bullets.length,
              params.dynamicMainBullets + 4
            );
            const bulletsOffset =
              (bulletSize * dynamicBulletsLength - bulletSize) / 2 -
              midIndex * bulletSize;
            const offsetProp = rtl ? "right" : "left";
            bullets.forEach((bullet) => {
              bullet.style[
                swiper.isHorizontal() ? offsetProp : "top"
              ] = `${bulletsOffset}px`;
            });
          }
        }
        el.forEach((subEl, subElIndex) => {
          if (params.type === "fraction") {
            subEl
              .querySelectorAll(classesToSelector(params.currentClass))
              .forEach((fractionEl) => {
                fractionEl.textContent = params.formatFractionCurrent(
                  current + 1
                );
              });
            subEl
              .querySelectorAll(classesToSelector(params.totalClass))
              .forEach((totalEl) => {
                totalEl.textContent = params.formatFractionTotal(total);
              });
          }
          if (params.type === "progressbar") {
            let progressbarDirection;
            if (params.progressbarOpposite) {
              progressbarDirection = swiper.isHorizontal()
                ? "vertical"
                : "horizontal";
            } else {
              progressbarDirection = swiper.isHorizontal()
                ? "horizontal"
                : "vertical";
            }
            const scale = (current + 1) / total;
            let scaleX = 1;
            let scaleY = 1;
            if (progressbarDirection === "horizontal") {
              scaleX = scale;
            } else {
              scaleY = scale;
            }
            subEl
              .querySelectorAll(classesToSelector(params.progressbarFillClass))
              .forEach((progressEl) => {
                progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
                progressEl.style.transitionDuration = `${swiper.params.speed}ms`;
              });
          }
          if (params.type === "custom" && params.renderCustom) {
            subEl.innerHTML = params.renderCustom(swiper, current + 1, total);
            if (subElIndex === 0) emit("paginationRender", subEl);
          } else {
            if (subElIndex === 0) emit("paginationRender", subEl);
            emit("paginationUpdate", subEl);
          }
          if (swiper.params.watchOverflow && swiper.enabled) {
            subEl.classList[swiper.isLocked ? "add" : "remove"](
              params.lockClass
            );
          }
        });
      }
      function render() {
        const params = swiper.params.pagination;
        if (isPaginationDisabled()) return;
        const slidesLength =
          swiper.virtual && swiper.params.virtual.enabled
            ? swiper.virtual.slides.length
            : swiper.slides.length;
        let el = swiper.pagination.el;
        el = makeElementsArray(el);
        let paginationHTML = "";
        if (params.type === "bullets") {
          let numberOfBullets = swiper.params.loop
            ? Math.ceil(slidesLength / swiper.params.slidesPerGroup)
            : swiper.snapGrid.length;
          if (
            swiper.params.freeMode &&
            swiper.params.freeMode.enabled &&
            numberOfBullets > slidesLength
          ) {
            numberOfBullets = slidesLength;
          }
          for (let i = 0; i < numberOfBullets; i += 1) {
            if (params.renderBullet) {
              paginationHTML += params.renderBullet.call(
                swiper,
                i,
                params.bulletClass
              );
            } else {
              paginationHTML += `<${params.bulletElement} ${swiper.isElement ? 'part="bullet"' : ""
                } class="${params.bulletClass}"></${params.bulletElement}>`;
            }
          }
        }
        if (params.type === "fraction") {
          if (params.renderFraction) {
            paginationHTML = params.renderFraction.call(
              swiper,
              params.currentClass,
              params.totalClass
            );
          } else {
            paginationHTML = `<span class="${params.currentClass}"></span> / <span class="${params.totalClass}"></span>`;
          }
        }
        if (params.type === "progressbar") {
          if (params.renderProgressbar) {
            paginationHTML = params.renderProgressbar.call(
              swiper,
              params.progressbarFillClass
            );
          } else {
            paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
          }
        }
        swiper.pagination.bullets = [];
        el.forEach((subEl) => {
          if (params.type !== "custom") {
            subEl.innerHTML = paginationHTML || "";
          }
          if (params.type === "bullets") {
            swiper.pagination.bullets.push(
              ...subEl.querySelectorAll(classesToSelector(params.bulletClass))
            );
          }
        });
        if (params.type !== "custom") {
          emit("paginationRender", el[0]);
        }
      }
      function init() {
        swiper.params.pagination = createElementIfNotDefined(
          swiper,
          swiper.originalParams.pagination,
          swiper.params.pagination,
          {
            el: "swiper-pagination",
          }
        );
        const params = swiper.params.pagination;
        if (!params.el) return;
        let el;
        if (typeof params.el === "string" && swiper.isElement) {
          el = swiper.el.shadowRoot.querySelector(params.el);
        }
        if (!el && typeof params.el === "string") {
          el = [...document.querySelectorAll(params.el)];
        }
        if (!el) {
          el = params.el;
        }
        if (!el || el.length === 0) return;
        if (
          swiper.params.uniqueNavElements &&
          typeof params.el === "string" &&
          Array.isArray(el) &&
          el.length > 1
        ) {
          el = [...swiper.el.querySelectorAll(params.el)];
          if (el.length > 1) {
            el = el.filter((subEl) => {
              if (elementParents(subEl, ".swiper")[0] !== swiper.el)
                return false;
              return true;
            })[0];
          }
        }
        if (Array.isArray(el) && el.length === 1) el = el[0];
        Object.assign(swiper.pagination, {
          el,
        });
        el = makeElementsArray(el);
        el.forEach((subEl) => {
          if (params.type === "bullets" && params.clickable) {
            subEl.classList.add(params.clickableClass);
          }
          subEl.classList.add(params.modifierClass + params.type);
          subEl.classList.add(
            swiper.isHorizontal()
              ? params.horizontalClass
              : params.verticalClass
          );
          if (params.type === "bullets" && params.dynamicBullets) {
            subEl.classList.add(
              `${params.modifierClass}${params.type}-dynamic`
            );
            dynamicBulletIndex = 0;
            if (params.dynamicMainBullets < 1) {
              params.dynamicMainBullets = 1;
            }
          }
          if (params.type === "progressbar" && params.progressbarOpposite) {
            subEl.classList.add(params.progressbarOppositeClass);
          }
          if (params.clickable) {
            subEl.addEventListener("click", onBulletClick);
          }
          if (!swiper.enabled) {
            subEl.classList.add(params.lockClass);
          }
        });
      }
      function destroy() {
        const params = swiper.params.pagination;
        if (isPaginationDisabled()) return;
        let el = swiper.pagination.el;
        if (el) {
          el = makeElementsArray(el);
          el.forEach((subEl) => {
            subEl.classList.remove(params.hiddenClass);
            subEl.classList.remove(params.modifierClass + params.type);
            subEl.classList.remove(
              swiper.isHorizontal()
                ? params.horizontalClass
                : params.verticalClass
            );
            if (params.clickable) {
              subEl.removeEventListener("click", onBulletClick);
            }
          });
        }
        if (swiper.pagination.bullets)
          swiper.pagination.bullets.forEach((subEl) =>
            subEl.classList.remove(...params.bulletActiveClass.split(" "))
          );
      }
      on("changeDirection", () => {
        if (!swiper.pagination || !swiper.pagination.el) return;
        const params = swiper.params.pagination;
        let { el } = swiper.pagination;
        el = makeElementsArray(el);
        el.forEach((subEl) => {
          subEl.classList.remove(params.horizontalClass, params.verticalClass);
          subEl.classList.add(
            swiper.isHorizontal()
              ? params.horizontalClass
              : params.verticalClass
          );
        });
      });
      on("init", () => {
        if (swiper.params.pagination.enabled === false) {
          disable();
        } else {
          init();
          render();
          update();
        }
      });
      on("activeIndexChange", () => {
        if (typeof swiper.snapIndex === "undefined") {
          update();
        }
      });
      on("snapIndexChange", () => {
        update();
      });
      on("snapGridLengthChange", () => {
        render();
        update();
      });
      on("destroy", () => {
        destroy();
      });
      on("enable disable", () => {
        let { el } = swiper.pagination;
        if (el) {
          el = makeElementsArray(el);
          el.forEach((subEl) =>
            subEl.classList[swiper.enabled ? "remove" : "add"](
              swiper.params.pagination.lockClass
            )
          );
        }
      });
      on("lock unlock", () => {
        update();
      });
      on("click", (_s, e) => {
        const targetEl = e.target;
        let { el } = swiper.pagination;
        if (!Array.isArray(el)) el = [el].filter((element) => !!element);
        if (
          swiper.params.pagination.el &&
          swiper.params.pagination.hideOnClick &&
          el &&
          el.length > 0 &&
          !targetEl.classList.contains(swiper.params.pagination.bulletClass)
        ) {
          if (
            swiper.navigation &&
            ((swiper.navigation.nextEl &&
              targetEl === swiper.navigation.nextEl) ||
              (swiper.navigation.prevEl &&
                targetEl === swiper.navigation.prevEl))
          )
            return;
          const isHidden = el[0].classList.contains(
            swiper.params.pagination.hiddenClass
          );
          if (isHidden === true) {
            emit("paginationShow");
          } else {
            emit("paginationHide");
          }
          el.forEach((subEl) =>
            subEl.classList.toggle(swiper.params.pagination.hiddenClass)
          );
        }
      });
      const enable = () => {
        swiper.el.classList.remove(
          swiper.params.pagination.paginationDisabledClass
        );
        let { el } = swiper.pagination;
        if (el) {
          el = makeElementsArray(el);
          el.forEach((subEl) =>
            subEl.classList.remove(
              swiper.params.pagination.paginationDisabledClass
            )
          );
        }
        init();
        render();
        update();
      };
      const disable = () => {
        swiper.el.classList.add(
          swiper.params.pagination.paginationDisabledClass
        );
        let { el } = swiper.pagination;
        if (el) {
          el = makeElementsArray(el);
          el.forEach((subEl) =>
            subEl.classList.add(
              swiper.params.pagination.paginationDisabledClass
            )
          );
        }
        destroy();
      };
      Object.assign(swiper.pagination, {
        enable,
        disable,
        render,
        update,
        init,
        destroy,
      });
    }
    function Autoplay({ swiper, extendParams, on, emit, params }) {
      swiper.autoplay = {
        running: false,
        paused: false,
        timeLeft: 0,
      };
      extendParams({
        autoplay: {
          enabled: false,
          delay: 3e3,
          waitForTransition: true,
          disableOnInteraction: true,
          stopOnLastSlide: false,
          reverseDirection: false,
          pauseOnMouseEnter: false,
        },
      });
      let timeout;
      let raf;
      let autoplayDelayTotal =
        params && params.autoplay ? params.autoplay.delay : 3e3;
      let autoplayDelayCurrent =
        params && params.autoplay ? params.autoplay.delay : 3e3;
      let autoplayTimeLeft;
      let autoplayStartTime = /* @__PURE__ */ new Date().getTime;
      let wasPaused;
      let isTouched;
      let pausedByTouch;
      let touchStartTimeout;
      let slideChanged;
      let pausedByInteraction;
      function onTransitionEnd(e) {
        if (!swiper || swiper.destroyed || !swiper.wrapperEl) return;
        if (e.target !== swiper.wrapperEl) return;
        swiper.wrapperEl.removeEventListener("transitionend", onTransitionEnd);
        resume();
      }
      const calcTimeLeft = () => {
        if (swiper.destroyed || !swiper.autoplay.running) return;
        if (swiper.autoplay.paused) {
          wasPaused = true;
        } else if (wasPaused) {
          autoplayDelayCurrent = autoplayTimeLeft;
          wasPaused = false;
        }
        const timeLeft = swiper.autoplay.paused
          ? autoplayTimeLeft
          : autoplayStartTime +
          autoplayDelayCurrent -
            /* @__PURE__ */ new Date().getTime();
        swiper.autoplay.timeLeft = timeLeft;
        emit("autoplayTimeLeft", timeLeft, timeLeft / autoplayDelayTotal);
        raf = requestAnimationFrame(() => {
          calcTimeLeft();
        });
      };
      const getSlideDelay = () => {
        let activeSlideEl;
        if (swiper.virtual && swiper.params.virtual.enabled) {
          activeSlideEl = swiper.slides.filter((slideEl) =>
            slideEl.classList.contains("swiper-slide-active")
          )[0];
        } else {
          activeSlideEl = swiper.slides[swiper.activeIndex];
        }
        if (!activeSlideEl) return void 0;
        const currentSlideDelay = parseInt(
          activeSlideEl.getAttribute("data-swiper-autoplay"),
          10
        );
        return currentSlideDelay;
      };
      const run = (delayForce) => {
        if (swiper.destroyed || !swiper.autoplay.running) return;
        cancelAnimationFrame(raf);
        calcTimeLeft();
        let delay =
          typeof delayForce === "undefined"
            ? swiper.params.autoplay.delay
            : delayForce;
        autoplayDelayTotal = swiper.params.autoplay.delay;
        autoplayDelayCurrent = swiper.params.autoplay.delay;
        const currentSlideDelay = getSlideDelay();
        if (
          !Number.isNaN(currentSlideDelay) &&
          currentSlideDelay > 0 &&
          typeof delayForce === "undefined"
        ) {
          delay = currentSlideDelay;
          autoplayDelayTotal = currentSlideDelay;
          autoplayDelayCurrent = currentSlideDelay;
        }
        autoplayTimeLeft = delay;
        const speed = swiper.params.speed;
        const proceed = () => {
          if (!swiper || swiper.destroyed) return;
          if (swiper.params.autoplay.reverseDirection) {
            if (
              !swiper.isBeginning ||
              swiper.params.loop ||
              swiper.params.rewind
            ) {
              swiper.slidePrev(speed, true, true);
              emit("autoplay");
            } else if (!swiper.params.autoplay.stopOnLastSlide) {
              swiper.slideTo(swiper.slides.length - 1, speed, true, true);
              emit("autoplay");
            }
          } else {
            if (!swiper.isEnd || swiper.params.loop || swiper.params.rewind) {
              swiper.slideNext(speed, true, true);
              emit("autoplay");
            } else if (!swiper.params.autoplay.stopOnLastSlide) {
              swiper.slideTo(0, speed, true, true);
              emit("autoplay");
            }
          }
          if (swiper.params.cssMode) {
            autoplayStartTime = /* @__PURE__ */ new Date().getTime();
            requestAnimationFrame(() => {
              run();
            });
          }
        };
        if (delay > 0) {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            proceed();
          }, delay);
        } else {
          requestAnimationFrame(() => {
            proceed();
          });
        }
        return delay;
      };
      const start = () => {
        swiper.autoplay.running = true;
        run();
        emit("autoplayStart");
      };
      const stop = () => {
        swiper.autoplay.running = false;
        clearTimeout(timeout);
        cancelAnimationFrame(raf);
        emit("autoplayStop");
      };
      const pause = (internal, reset) => {
        if (swiper.destroyed || !swiper.autoplay.running) return;
        clearTimeout(timeout);
        if (!internal) {
          pausedByInteraction = true;
        }
        const proceed = () => {
          emit("autoplayPause");
          if (swiper.params.autoplay.waitForTransition) {
            swiper.wrapperEl.addEventListener("transitionend", onTransitionEnd);
          } else {
            resume();
          }
        };
        swiper.autoplay.paused = true;
        if (reset) {
          if (slideChanged) {
            autoplayTimeLeft = swiper.params.autoplay.delay;
          }
          slideChanged = false;
          proceed();
          return;
        }
        const delay = autoplayTimeLeft || swiper.params.autoplay.delay;
        autoplayTimeLeft =
          delay - /* @__PURE__ */ (new Date().getTime() - autoplayStartTime);
        if (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) return;
        if (autoplayTimeLeft < 0) autoplayTimeLeft = 0;
        proceed();
      };
      const resume = () => {
        if (
          (swiper.isEnd && autoplayTimeLeft < 0 && !swiper.params.loop) ||
          swiper.destroyed ||
          !swiper.autoplay.running
        )
          return;
        autoplayStartTime = /* @__PURE__ */ new Date().getTime();
        if (pausedByInteraction) {
          pausedByInteraction = false;
          run(autoplayTimeLeft);
        } else {
          run();
        }
        swiper.autoplay.paused = false;
        emit("autoplayResume");
      };
      const onVisibilityChange = () => {
        if (swiper.destroyed || !swiper.autoplay.running) return;
        const document2 = getDocument();
        if (document2.visibilityState === "hidden") {
          pausedByInteraction = true;
          pause(true);
        }
        if (document2.visibilityState === "visible") {
          resume();
        }
      };
      const onPointerEnter = (e) => {
        if (e.pointerType !== "mouse") return;
        pausedByInteraction = true;
        pause(true);
      };
      const onPointerLeave = (e) => {
        if (e.pointerType !== "mouse") return;
        if (swiper.autoplay.paused) {
          resume();
        }
      };
      const attachMouseEvents = () => {
        if (swiper.params.autoplay.pauseOnMouseEnter) {
          swiper.el.addEventListener("pointerenter", onPointerEnter);
          swiper.el.addEventListener("pointerleave", onPointerLeave);
        }
      };
      const detachMouseEvents = () => {
        swiper.el.removeEventListener("pointerenter", onPointerEnter);
        swiper.el.removeEventListener("pointerleave", onPointerLeave);
      };
      const attachDocumentEvents = () => {
        const document2 = getDocument();
        document2.addEventListener("visibilitychange", onVisibilityChange);
      };
      const detachDocumentEvents = () => {
        const document2 = getDocument();
        document2.removeEventListener("visibilitychange", onVisibilityChange);
      };
      on("init", () => {
        if (swiper.params.autoplay.enabled) {
          attachMouseEvents();
          attachDocumentEvents();
          autoplayStartTime = /* @__PURE__ */ new Date().getTime();
          start();
        }
      });
      on("destroy", () => {
        detachMouseEvents();
        detachDocumentEvents();
        if (swiper.autoplay.running) {
          stop();
        }
      });
      on("beforeTransitionStart", (_s, speed, internal) => {
        if (swiper.destroyed || !swiper.autoplay.running) return;
        if (internal || !swiper.params.autoplay.disableOnInteraction) {
          pause(true, true);
        } else {
          stop();
        }
      });
      on("sliderFirstMove", () => {
        if (swiper.destroyed || !swiper.autoplay.running) return;
        if (swiper.params.autoplay.disableOnInteraction) {
          stop();
          return;
        }
        isTouched = true;
        pausedByTouch = false;
        pausedByInteraction = false;
        touchStartTimeout = setTimeout(() => {
          pausedByInteraction = true;
          pausedByTouch = true;
          pause(true);
        }, 200);
      });
      on("touchEnd", () => {
        if (swiper.destroyed || !swiper.autoplay.running || !isTouched) return;
        clearTimeout(touchStartTimeout);
        clearTimeout(timeout);
        if (swiper.params.autoplay.disableOnInteraction) {
          pausedByTouch = false;
          isTouched = false;
          return;
        }
        if (pausedByTouch && swiper.params.cssMode) resume();
        pausedByTouch = false;
        isTouched = false;
      });
      on("slideChange", () => {
        if (swiper.destroyed || !swiper.autoplay.running) return;
        slideChanged = true;
      });
      Object.assign(swiper.autoplay, {
        start,
        stop,
        pause,
        resume,
      });
    }
    function effectInit(params) {
      const {
        effect,
        swiper,
        on,
        setTranslate,
        setTransition,
        overwriteParams,
        perspective,
        recreateShadows,
        getEffectParams,
      } = params;
      on("beforeInit", () => {
        if (swiper.params.effect !== effect) return;
        swiper.classNames.push(
          `${swiper.params.containerModifierClass}${effect}`
        );
        if (perspective && perspective()) {
          swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
        }
        const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
        Object.assign(swiper.params, overwriteParamsResult);
        Object.assign(swiper.originalParams, overwriteParamsResult);
      });
      on("setTranslate", () => {
        if (swiper.params.effect !== effect) return;
        setTranslate();
      });
      on("setTransition", (_s, duration) => {
        if (swiper.params.effect !== effect) return;
        setTransition(duration);
      });
      on("transitionEnd", () => {
        if (swiper.params.effect !== effect) return;
        if (recreateShadows) {
          if (!getEffectParams || !getEffectParams().slideShadows) return;
          swiper.slides.forEach((slideEl) => {
            slideEl
              .querySelectorAll(
                ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left"
              )
              .forEach((shadowEl) => shadowEl.remove());
          });
          recreateShadows();
        }
      });
      let requireUpdateOnVirtual;
      on("virtualUpdate", () => {
        if (swiper.params.effect !== effect) return;
        if (!swiper.slides.length) {
          requireUpdateOnVirtual = true;
        }
        requestAnimationFrame(() => {
          if (requireUpdateOnVirtual && swiper.slides && swiper.slides.length) {
            setTranslate();
            requireUpdateOnVirtual = false;
          }
        });
      });
    }
    function effectTarget(effectParams, slideEl) {
      const transformEl = getSlideTransformEl(slideEl);
      if (transformEl !== slideEl) {
        transformEl.style.backfaceVisibility = "hidden";
        transformEl.style["-webkit-backface-visibility"] = "hidden";
      }
      return transformEl;
    }
    function effectVirtualTransitionEnd({
      swiper,
      duration,
      transformElements,
      allSlides,
    }) {
      const { activeIndex } = swiper;
      const getSlide = (el) => {
        if (!el.parentElement) {
          const slide = swiper.slides.filter(
            (slideEl) => slideEl.shadowEl && slideEl.shadowEl === el.parentNode
          )[0];
          return slide;
        }
        return el.parentElement;
      };
      if (swiper.params.virtualTranslate && duration !== 0) {
        let eventTriggered = false;
        let transitionEndTarget;
        if (allSlides) {
          transitionEndTarget = transformElements;
        } else {
          transitionEndTarget = transformElements.filter((transformEl) => {
            const el = transformEl.classList.contains("swiper-slide-transform")
              ? getSlide(transformEl)
              : transformEl;
            return swiper.getSlideIndex(el) === activeIndex;
          });
        }
        transitionEndTarget.forEach((el) => {
          elementTransitionEnd(el, () => {
            if (eventTriggered) return;
            if (!swiper || swiper.destroyed) return;
            eventTriggered = true;
            swiper.animating = false;
            const evt = new window.CustomEvent("transitionend", {
              bubbles: true,
              cancelable: true,
            });
            swiper.wrapperEl.dispatchEvent(evt);
          });
        });
      }
    }
    function EffectFade({ swiper, extendParams, on }) {
      extendParams({
        fadeEffect: {
          crossFade: false,
        },
      });
      const setTranslate = () => {
        const { slides } = swiper;
        const params = swiper.params.fadeEffect;
        for (let i = 0; i < slides.length; i += 1) {
          const slideEl = swiper.slides[i];
          const offset2 = slideEl.swiperSlideOffset;
          let tx = -offset2;
          if (!swiper.params.virtualTranslate) tx -= swiper.translate;
          let ty = 0;
          if (!swiper.isHorizontal()) {
            ty = tx;
            tx = 0;
          }
          const slideOpacity = swiper.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs(slideEl.progress), 0)
            : 1 + Math.min(Math.max(slideEl.progress, -1), 0);
          const targetEl = effectTarget(params, slideEl);
          targetEl.style.opacity = slideOpacity;
          targetEl.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`;
        }
      };
      const setTransition = (duration) => {
        const transformElements = swiper.slides.map((slideEl) =>
          getSlideTransformEl(slideEl)
        );
        transformElements.forEach((el) => {
          el.style.transitionDuration = `${duration}ms`;
        });
        effectVirtualTransitionEnd({
          swiper,
          duration,
          transformElements,
          allSlides: true,
        });
      };
      effectInit({
        effect: "fade",
        swiper,
        on,
        setTranslate,
        setTransition,
        overwriteParams: () => ({
          slidesPerView: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: !swiper.params.cssMode,
        }),
      });
    }
    function sliderBestSellers() {
      if (!screen.isPhone) {
        if (document.querySelectorAll(".best-sellers-slider")) {
          setTimeout(() => {
            let bestSellerSlider = document.querySelectorAll(
              ".best-sellers-slider"
            );
            bestSellerSlider.forEach((slider) => {
              slider = new Swiper(slider.querySelector(".swiper-container"), {
                modules: [Pagination, Navigation],
                slidesPerView: 1,
                spaceBetween: 0,
                slidesPerGroup: 1,
                loop: false,
                effect: "fade",
                speed: 800,
                slideToClickedSlide: false,
                pagination: {
                  el: slider.querySelector(".swiper-pagination"),
                  clickable: true,
                  type: "fraction",
                },
                navigation: {
                  nextEl: slider.querySelector(".swiper-button-next"),
                  prevEl: slider.querySelector(".swiper-button-prev"),
                },
                loopFillGroupWithBlank: false,
                centerInsufficientSlides: true,
                centeredSlides: true,
                grabCursor: false,
                observer: true,
                preloadImages: false,
                lazy: true,
                watchOverflow: true,
                watchSlidesProgress: true,
                breakpoints: {
                  767: {
                    centeredSlides: true,
                    spaceBetween: 0,
                    slidesPerView: "auto",
                  },
                  1025: {
                    centeredSlides: false,
                    spaceBetween: 0,
                    slidesPerView: "auto",
                  },
                },
              });
            });
          }, 1e3);
        }
      }
    }
    function sliderHighlights() {
      if (document.querySelectorAll(".slider-highlights")) {
        setTimeout(() => {
          let highlightsSlider =
            document.querySelectorAll(".slider-highlights");
          highlightsSlider.forEach((slider) => {
            slider = new Swiper(slider.querySelector(".swiper-container"), {
              modules: [Pagination, Navigation],
              slidesPerView: 1.1,
              spaceBetween: 0,
              slidesPerGroup: 1,
              loop: false,
              // effect: "fade",
              speed: 800,
              slideToClickedSlide: false,
              // pagination: {
              //   el: slider.querySelector('.swiper-pagination'),
              //   clickable: true,
              //   type: "fraction",
              // },
              navigation: {
                nextEl: slider.querySelector(".swiper-button-next"),
                prevEl: slider.querySelector(".swiper-button-prev"),
              },
              loopFillGroupWithBlank: false,
              // centerInsufficientSlides: true,
              centeredSlides: true,
              grabCursor: false,
              observer: true,
              preloadImages: false,
              lazy: true,
              watchOverflow: true,
              breakpoints: {
                767: {
                  slidesPerView: 1,
                },
                1025: {
                  // centeredSlides: false,
                  spaceBetween: 0,
                  slidesPerView: 1,
                },
              },
            });
          });
        }, 1e3);
      }
    }
    /*!
     * ScrollToPlugin 3.12.5
     * https://gsap.com
     *
     * @license Copyright 2008-2024, GreenSock. All rights reserved.
     * Subject to the terms at https://gsap.com/standard-license or for
     * Club GSAP members, the agreement issued with that membership.
     * @author: Jack Doyle, jack@greensock.com
     */
    var gsap,
      _coreInitted,
      _window,
      _docEl,
      _body,
      _toArray,
      _config,
      ScrollTrigger,
      _windowExists = function _windowExists2() {
        return typeof window !== "undefined";
      },
      _getGSAP = function _getGSAP2() {
        return (
          gsap ||
          (_windowExists() &&
            (gsap = window.gsap) &&
            gsap.registerPlugin &&
            gsap)
        );
      },
      _isString = function _isString2(value) {
        return typeof value === "string";
      },
      _isFunction = function _isFunction2(value) {
        return typeof value === "function";
      },
      _max = function _max2(element, axis) {
        var dim = axis === "x" ? "Width" : "Height",
          scroll = "scroll" + dim,
          client = "client" + dim;
        return element === _window || element === _docEl || element === _body
          ? Math.max(_docEl[scroll], _body[scroll]) -
          (_window["inner" + dim] || _docEl[client] || _body[client])
          : element[scroll] - element["offset" + dim];
      },
      _buildGetter = function _buildGetter2(e, axis) {
        var p = "scroll" + (axis === "x" ? "Left" : "Top");
        if (e === _window) {
          if (e.pageXOffset != null) {
            p = "page" + axis.toUpperCase() + "Offset";
          } else {
            e = _docEl[p] != null ? _docEl : _body;
          }
        }
        return function () {
          return e[p];
        };
      },
      _clean = function _clean2(value, index, target, targets) {
        _isFunction(value) && (value = value(index, target, targets));
        if (typeof value !== "object") {
          return _isString(value) && value !== "max" && value.charAt(1) !== "="
            ? {
              x: value,
              y: value,
            }
            : {
              y: value,
            };
        } else if (value.nodeType) {
          return {
            y: value,
            x: value,
          };
        } else {
          var result = {},
            p;
          for (p in value) {
            result[p] =
              p !== "onAutoKill" && _isFunction(value[p])
                ? value[p](index, target, targets)
                : value[p];
          }
          return result;
        }
      },
      _getOffset = function _getOffset2(element, container) {
        element = _toArray(element)[0];
        if (!element || !element.getBoundingClientRect) {
          return (
            console.warn("scrollTo target doesn't exist. Using 0") || {
              x: 0,
              y: 0,
            }
          );
        }
        var rect = element.getBoundingClientRect(),
          isRoot = !container || container === _window || container === _body,
          cRect = isRoot
            ? {
              top:
                _docEl.clientTop -
                (_window.pageYOffset ||
                  _docEl.scrollTop ||
                  _body.scrollTop ||
                  0),
              left:
                _docEl.clientLeft -
                (_window.pageXOffset ||
                  _docEl.scrollLeft ||
                  _body.scrollLeft ||
                  0),
            }
            : container.getBoundingClientRect(),
          offsets = {
            x: rect.left - cRect.left,
            y: rect.top - cRect.top,
          };
        if (!isRoot && container) {
          offsets.x += _buildGetter(container, "x")();
          offsets.y += _buildGetter(container, "y")();
        }
        return offsets;
      },
      _parseVal = function _parseVal2(
        value,
        target,
        axis,
        currentVal,
        offset2
      ) {
        return !isNaN(value) && typeof value !== "object"
          ? parseFloat(value) - offset2
          : _isString(value) && value.charAt(1) === "="
            ? parseFloat(value.substr(2)) * (value.charAt(0) === "-" ? -1 : 1) +
            currentVal -
            offset2
            : value === "max"
              ? _max(target, axis) - offset2
              : Math.min(
                _max(target, axis),
                _getOffset(value, target)[axis] - offset2
              );
      },
      _initCore = function _initCore2() {
        gsap = _getGSAP();
        if (
          _windowExists() &&
          gsap &&
          typeof document !== "undefined" &&
          document.body
        ) {
          _window = window;
          _body = document.body;
          _docEl = document.documentElement;
          _toArray = gsap.utils.toArray;
          gsap.config({
            autoKillThreshold: 7,
          });
          _config = gsap.config();
          _coreInitted = 1;
        }
      };
    var ScrollToPlugin = {
      version: "3.12.5",
      name: "scrollTo",
      rawVars: 1,
      register: function register(core) {
        gsap = core;
        _initCore();
      },
      init: function init(target, value, tween, index, targets) {
        _coreInitted || _initCore();
        var data = this,
          snapType = gsap.getProperty(target, "scrollSnapType");
        data.isWin = target === _window;
        data.target = target;
        data.tween = tween;
        value = _clean(value, index, target, targets);
        data.vars = value;
        data.autoKill = !!value.autoKill;
        data.getX = _buildGetter(target, "x");
        data.getY = _buildGetter(target, "y");
        data.x = data.xPrev = data.getX();
        data.y = data.yPrev = data.getY();
        ScrollTrigger || (ScrollTrigger = gsap.core.globals().ScrollTrigger);
        gsap.getProperty(target, "scrollBehavior") === "smooth" &&
          gsap.set(target, {
            scrollBehavior: "auto",
          });
        if (snapType && snapType !== "none") {
          data.snap = 1;
          data.snapInline = target.style.scrollSnapType;
          target.style.scrollSnapType = "none";
        }
        if (value.x != null) {
          data.add(
            data,
            "x",
            data.x,
            _parseVal(value.x, target, "x", data.x, value.offsetX || 0),
            index,
            targets
          );
          data._props.push("scrollTo_x");
        } else {
          data.skipX = 1;
        }
        if (value.y != null) {
          data.add(
            data,
            "y",
            data.y,
            _parseVal(value.y, target, "y", data.y, value.offsetY || 0),
            index,
            targets
          );
          data._props.push("scrollTo_y");
        } else {
          data.skipY = 1;
        }
      },
      render: function render(ratio, data) {
        var pt = data._pt,
          target = data.target,
          tween = data.tween,
          autoKill = data.autoKill,
          xPrev = data.xPrev,
          yPrev = data.yPrev,
          isWin = data.isWin,
          snap = data.snap,
          snapInline = data.snapInline,
          x,
          y,
          yDif,
          xDif,
          threshold;
        while (pt) {
          pt.r(ratio, pt.d);
          pt = pt._next;
        }
        x = isWin || !data.skipX ? data.getX() : xPrev;
        y = isWin || !data.skipY ? data.getY() : yPrev;
        yDif = y - yPrev;
        xDif = x - xPrev;
        threshold = _config.autoKillThreshold;
        if (data.x < 0) {
          data.x = 0;
        }
        if (data.y < 0) {
          data.y = 0;
        }
        if (autoKill) {
          if (
            !data.skipX &&
            (xDif > threshold || xDif < -threshold) &&
            x < _max(target, "x")
          ) {
            data.skipX = 1;
          }
          if (
            !data.skipY &&
            (yDif > threshold || yDif < -threshold) &&
            y < _max(target, "y")
          ) {
            data.skipY = 1;
          }
          if (data.skipX && data.skipY) {
            tween.kill();
            data.vars.onAutoKill &&
              data.vars.onAutoKill.apply(
                tween,
                data.vars.onAutoKillParams || []
              );
          }
        }
        if (isWin) {
          _window.scrollTo(!data.skipX ? data.x : x, !data.skipY ? data.y : y);
        } else {
          data.skipY || (target.scrollTop = data.y);
          data.skipX || (target.scrollLeft = data.x);
        }
        if (snap && (ratio === 1 || ratio === 0)) {
          y = target.scrollTop;
          x = target.scrollLeft;
          snapInline
            ? (target.style.scrollSnapType = snapInline)
            : target.style.removeProperty("scroll-snap-type");
          target.scrollTop = y + 1;
          target.scrollLeft = x + 1;
          target.scrollTop = y;
          target.scrollLeft = x;
        }
        data.xPrev = data.x;
        data.yPrev = data.y;
        ScrollTrigger && ScrollTrigger.update();
      },
      kill: function kill(property) {
        var both = property === "scrollTo",
          i = this._props.indexOf(property);
        if (both || property === "scrollTo_x") {
          this.skipX = 1;
        }
        if (both || property === "scrollTo_y") {
          this.skipY = 1;
        }
        i > -1 && this._props.splice(i, 1);
        return !this._props.length;
      },
    };
    ScrollToPlugin.max = _max;
    ScrollToPlugin.getOffset = _getOffset;
    ScrollToPlugin.buildGetter = _buildGetter;
    _getGSAP() && gsap.registerPlugin(ScrollToPlugin);
    function productLinkColor() {
      let productLink = document.querySelectorAll(
        ".product-link:not(.js-product-link-color-running)"
      );
      productLink.forEach((element) => {
        element.classList.add("js-product-link-color-running");
        new DataSetGet({
          dataGetSelector: "[data-get-product-link-color]",
          dataSetSelector: "[data-set-product-link-color]",
          defaultActive: "[data-default-product-link-active]",
          parentContainer: element,
          listener: "hover",
          //'hover' ou 'click'
          toggle: false,
          multiple: false,
          leaveDelay: 800,
          deactivateOnClickOutside: false,
          onClose: () => { },
          onComplete: () => { },
          onActivate: (item) => { 
            const element = document.querySelector(".header-info-list li.local-item.active");
            if (element) element.querySelector(".custom-close").click();
          },
          onDeactivate: (item) => { },
        });
      });
    }
    const pageName$5 = "home";
    function main$5() {

      sliderBestSellers();
      sliderHighlights();
      productLinkColor();
    }
    const pgHome = new Page({
      pageName: pageName$5,
      main: main$5,
    });
    (function scrollDetection() {
      let lastScrollTop = 0;
      let lastDirection = 0;
      let lastScrollPosition = 0;
      let vh = window.innerHeight;
      let containerHeight = sourceContainer().scrollHeight;
      document.body.dataset.scrollDirection = "initial";
      document.body.dataset.scrollPosition = "top";
      function scrollDetection2() {
        const currentScroll = scrollY;
        if (lastDirection != 0 && currentScroll <= 0) {
          document.body.dataset.scrollDirection = "initial";
          lastDirection = 0;
        } else if (
          lastDirection != 1 &&
          lastScrollTop > currentScroll &&
          currentScroll > 0
        ) {
          document.body.dataset.scrollDirection = "up";
          lastDirection = 1;
        } else if (
          lastDirection != 2 &&
          lastScrollTop < currentScroll &&
          currentScroll > 0
        ) {
          document.body.dataset.scrollDirection = "down";
          lastDirection = 2;
        }
        lastScrollTop = currentScroll;
        if (lastScrollPosition != 0 && currentScroll <= vh * 0.5) {
          document.body.dataset.scrollPosition = "top";
          lastScrollPosition = 0;
        } else if (
          lastScrollPosition != 1 &&
          currentScroll >= vh * 0.5 &&
          !(currentScroll + vh >= containerHeight - vh * 0.3)
        ) {
          document.body.dataset.scrollPosition = "center";
          lastScrollPosition = 1;
        } else if (
          lastScrollPosition != 2 &&
          currentScroll + vh >= containerHeight - vh * 0.3
        ) {
          document.body.dataset.scrollPosition = "bottom";
          lastScrollPosition = 2;
        }
      }
      window.addEventListener(
        "scroll",
        () => {
          scrollDetection2();
          if (document.getElementById("scroll-progress")) {
            document
              .getElementById("scroll-progress")
              .style.setProperty(
                "--scroll-progress",
                (scrollY + vh) / containerHeight
              );
          }
        },
        {
          passive: true,
        }
      );
      window.addEventListener("resize", () => {
        vh = window.innerHeight;
        containerHeight = sourceContainer().scrollHeight;
        if (document.getElementById("scroll-progress")) {
          document
            .getElementById("scroll-progress")
            .style.setProperty(
              "--scroll-progress",
              (scrollY + vh) / containerHeight
            );
        }
      });
      const bodyObserver = new MutationObserver(() => {
        containerHeight = sourceContainer().scrollHeight;
        if (document.getElementById("scroll-progress")) {
          document
            .getElementById("scroll-progress")
            .style.setProperty(
              "--scroll-progress",
              (scrollY + vh) / containerHeight
            );
        }
      });
      bodyObserver.observe(document.body, {
        childList: true,
        subtree: true,
      });
      let vs;
      function vsScrollFix() {
        if (!vs) {
          vs = document.querySelector(".vs-scroll-view");
          if (!vs) {
            return;
          }
        }
        containerHeight = sourceContainer().scrollHeight;
        if (document.getElementById("scroll-progress")) {
          document
            .getElementById("scroll-progress")
            .style.setProperty(
              "--scroll-progress",
              (scrollY + vh) / containerHeight
            );
        }
      }
      setInterval(() => {
        vsScrollFix();
      }, 100);
      function sourceContainer() {
        let container;
        if (window.innerWidth > 1025) {
          container = document.body;
        } else {
          container = document.body;
        }
        return container;
      }
    })();
    class ModalGroup extends HTMLElement {
      constructor() {
        super();
        this.visible = false;
        this.leaveTime = 1200;
      }
      connectedCallback() {
        const areas = this.querySelectorAll("[data-modal-area]");
        if (areas.length > 0) {
          this.hideOnClickOutside = onClickOutside(
            areas,
            this.close.bind(this),
            { autoStart: false }
          );
        } else {
          this.hideOnClickOutside = null;
        }
      }
      disconnectedCallback() {
        if (this.hideOnClickOutside) this.hideOnClickOutside.stop();
      }
      static get observedAttributes() {
        return ["name", "active", "leave"];
      }
      attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
          case "active":
            queueMicrotask(() => {
              if (newValue === null) {
                this.close();
              } else {
                this.open(newValue);
              }
            });
            break;
          case "name":
            this.name = newValue;
            break;
          case "leave":
            this.leaveTime = Number.parseInt(newValue);
            break;
        }
      }
      handleEvent(ev) {
        if (ev.type === "keydown") {
          if (ev.key === "Escape") this.close();
        }
      }
      open(name) {
        const children = Array.from(this.querySelectorAll("modal-item"));
        const item = name ? children.find((c) => c.name == name) : children[0];
        this.bodyState("active", item.name);
        children.forEach((c) => c.close(0));
        this.addActive();
        item.open();
        this.dispatchEvent(new CustomEvent("modal:open", { detail: { item } }));
        document.dispatchEvent(
          new CustomEvent("modal:open", { detail: { item } })
        );
        if (this.hideOnClickOutside) this.hideOnClickOutside.start();
        document.addEventListener("keydown", this);
      }
      next() {
        const children = Array.from(this.querySelectorAll("modal-item"));
        const idx = children.indexOf(children.find((c) => c.visible));
        if (idx < children.length - 1) {
          children[idx].close();
          children[idx + 1].open();
        } else {
          children[idx].close();
          children[0].open();
        }
      }
      prev() {
        const children = Array.from(this.querySelectorAll("modal-item"));
        const idx = children.indexOf(children.find((c) => c.visible));
        if (idx > 0) {
          children[idx].close();
          children[idx - 1].open();
        } else {
          children[idx].close();
          children[children.length - 1].open();
        }
      }
      close() {
        const delay = this.leaveTime || 0;
        const children = Array.from(this.querySelectorAll("modal-item"));
        children.forEach((c) => {
          c.close(delay);
        });
        this.removeActive({ leaveDelay: delay });
        if (delay > 0) this.bodyState("leave");
        setTimeout(() => {
          this.bodyState(null, null);
          this.dispatchEvent(new CustomEvent("modal:close"));
          document.dispatchEvent(new CustomEvent("modal:close"));
        }, delay);
        if (this.hideOnClickOutside) this.hideOnClickOutside.stop();
        document.removeEventListener("keydown", this);
      }
      bodyState(state, item) {
        const ds = document.body.dataset;
        state ? (ds.modalState = state) : delete ds.modalState;
        item ? (ds.modalItem = item) : delete ds.modalItem;
        if (!state && !item) {
          delete ds.modal;
        } else {
          ds.modal = this.name;
        }
      }
    }
    function templateIframe(dataset) {
      const template = document.createElement("template");
      template.innerHTML = `
    <modal-group name="iframe" active>
      <modal-container>
        <modal-item>
        <div class="modal-container-iframe">
        <div class="modal-iframe" data-modal-area>
          <iframe src="${dataset.href}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
          
        <btn-modal-close></btn-modal-close>
        </modal-item>
      </modal-container>
      </modal-group>
      `;
      const modal = template.content;
      modal.firstElementChild.addEventListener(
        "modal:close",
        function () {
          this.remove();
        },
        {
          once: true,
        }
      );
      document.body.appendChild(modal);
    }
    function templateImage(dataset) {
      const template = document.createElement("template");
      let ext = dataset.href;
      ext = ext.substr(ext.lastIndexOf(".") + 1);
      let media;
      if (["mp4", "webm"].includes(ext)) {
        media = `<video src="${dataset.href}" autoplay playsinline muted loop data-modal-area ></video>`;
      } else {
        media = `<img src="${dataset.href}" data-modal-area />`;
      }
      template.innerHTML = `
    <modal-group name="image" active data-cursor-style="default">
      <modal-container>
        <modal-item>
          <div class="modal-container-image">
            <div class="modal-image">

          
            ${media}

            
              
            </div>
          </div>
        </modal-item>
      </modal-container>
      </modal-group>`;
      const modal = template.content;
      modal.firstElementChild.addEventListener(
        "modal:close",
        function () {
          this.remove();
        },
        { once: true }
      );
      document.body.appendChild(modal);
    }
    function templateVideo(dataset) {
      const template = document.createElement("template");
      template.innerHTML = `
    <modal-group name="video" active>
      <modal-container>
        <modal-item>
          <div class="modal-container-video">
            <div class="modal-video" data-modal-area>
            <video autoplay loop controls src="${dataset.href}" />
              
            </div>
          </div>
        </modal-item>
      </modal-container>
      </modal-group>`;
      const modal = template.content;
      modal.firstElementChild.addEventListener(
        "modal:close",
        function () {
          this.remove();
        },
        { once: true }
      );
      document.body.appendChild(modal);
    }
    const modalLocalName = "modal-group";
    class ModalItem extends HTMLElement {
      constructor() {
        super();
        this.visible = false;
        this.isOpening = false;
      }
      connectedCallback() {
        this.modal = this.closest(modalLocalName);
      }
      disconnectedCallback() { }
      open() {
        if (this.visible) return;
        this.visible = true;
        this.addActive();
      }
      close(timeout) {
        if (!this.visible) return;
        this.visible = false;
        this.removeActive({
          leave: timeout > 0 ? true : false,
          leaveDelay: timeout,
        });
      }
      static get observedAttributes() {
        return ["name", "hash"];
      }
      attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
      }
    }
    class ModalButton extends HTMLElement {
      constructor() {
        super();
      }
      connectedCallback() {
        this.modal = this.closest(modalLocalName);
        this.addEventListener("click", this.action);
      }
      disconnectedCallback() {
        this.removeEventListener("click", this.action);
      }
      attributeChangedCallback(name, oldValue, newValue) {
        this[name] = newValue;
      }
    }
    class ModalNext extends ModalButton {
      action() {
        this.modal.next();
        if (this.isOpening) return;
        this.isOpening = true;
        setTimeout(() => {
          this.isOpening = false;
        }, 1e3);
      }
    }
    class ModalPrevious extends ModalButton {
      action() {
        this.modal.prev();
        if (this.isOpening) return;
        this.isOpening = true;
        setTimeout(() => {
          this.isOpening = false;
        }, 1e3);
      }
    }
    class ModalClose extends ModalButton {
      action() {
        this.modal.close();
      }
    }
    class ModalOpen extends ModalButton {
      action() {
        const template = this.template;
        if (this.isOpening) return;
        this.isOpening = true;
        if (template) {
          if (template === "iframe") templateIframe(this.dataset);
          if (template === "image") templateImage(this.dataset);
          if (template === "video") templateVideo(this.dataset);
        } else {
          const selector = `${modalLocalName}[name=${this.group}]`;
          const modal = document.querySelector(selector);
          if (!modal) {
            console.warn("não existe modal: " + selector);
            this.isOpening = false;
            return;
          }
          modal.open(this.item);
        }
        setTimeout(() => {
          this.isOpening = false;
        }, 1e3);
      }
      static get observedAttributes() {
        return ["group", "item", "template"];
      }
      connectedCallback() {
        this.addEventListener("click", this.action);
      }
    }
    window.customElements.define("modal-group", ModalGroup);
    window.customElements.define("modal-item", ModalItem);
    window.customElements.define("btn-modal-close", ModalClose);
    window.customElements.define("btn-modal-open", ModalOpen);
    window.customElements.define("btn-modal-next", ModalNext);
    window.customElements.define("btn-modal-prev", ModalPrevious);
    function inputMoney(input) {
      input.addEventListener("keydown", (ev) => {
        const v = input.value;
        let p = input.selectionStart;
        if (ev.key === "Delete") {
          const toDel = input.value.charAt(input.selectionStart);
          if (toDel === "," || toDel === ".") {
            ev.preventDefault();
            input.value = v.slice(0, p) + v.slice(p + 2);
            input.setSelectionRange(p, p);
            formatInput();
          }
        }
        if (ev.key === "Backspace") {
          const toDel = input.value.charAt(input.selectionStart - 1);
          if (toDel === "," || toDel === ".") {
            ev.preventDefault();
            input.value = v.slice(0, p - 2) + v.slice(p);
            input.setSelectionRange(p - 2, p - 2);
            formatInput();
          }
        }
      });
      input.addEventListener("input", formatInput);
      function formatInput() {
        const negative = input.value.includes("-");
        const n = input.value.replace(/[^\d]/g, "").replace(/^0+/g, "");
        const l = n.length;
        let c = input.selectionStart - input.value.replace(/[^,.]/g, "").length;
        let newValue = "";
        if (l > 2) {
          let milhar = n.substr(0, l - 2);
          let decimal = "," + n.substr(l - 2, l);
          c++;
          let formatted = "";
          for (let i = 0; i < milhar.length; i++) {
            if ((milhar.length - i) % 3 === 0 && i != 0) {
              formatted += ".";
              c++;
            }
            formatted += milhar[i];
          }
          newValue = formatted + decimal;
        } else if (l == 1) {
          newValue = "0,0" + n;
          c += 3;
        } else if (l == 2) {
          newValue = "0," + n;
          c += 2;
        }
        if (negative) newValue = "-" + newValue;
        input.value = newValue;
        if (c < 0) c = 0;
        input.setSelectionRange(c, c);
      }
    }
    //! moment.js
    //! version : 2.30.1
    //! authors : Tim Wood, Iskren Chernev, Moment.js contributors
    //! license : MIT
    //! momentjs.com
    var hookCallback;
    function hooks() {
      return hookCallback.apply(null, arguments);
    }
    function setHookCallback(callback) {
      hookCallback = callback;
    }
    function isArray(input) {
      return (
        input instanceof Array ||
        Object.prototype.toString.call(input) === "[object Array]"
      );
    }
    function isObject(input) {
      return (
        input != null &&
        Object.prototype.toString.call(input) === "[object Object]"
      );
    }
    function hasOwnProp(a, b2) {
      return Object.prototype.hasOwnProperty.call(a, b2);
    }
    function isObjectEmpty(obj) {
      if (Object.getOwnPropertyNames) {
        return Object.getOwnPropertyNames(obj).length === 0;
      } else {
        var k;
        for (k in obj) {
          if (hasOwnProp(obj, k)) {
            return false;
          }
        }
        return true;
      }
    }
    function isUndefined(input) {
      return input === void 0;
    }
    function isNumber(input) {
      return (
        typeof input === "number" ||
        Object.prototype.toString.call(input) === "[object Number]"
      );
    }
    function isDate(input) {
      return (
        input instanceof Date ||
        Object.prototype.toString.call(input) === "[object Date]"
      );
    }
    function map(arr, fn) {
      var res = [],
        i,
        arrLen = arr.length;
      for (i = 0; i < arrLen; ++i) {
        res.push(fn(arr[i], i));
      }
      return res;
    }
    function extend(a, b2) {
      for (var i in b2) {
        if (hasOwnProp(b2, i)) {
          a[i] = b2[i];
        }
      }
      if (hasOwnProp(b2, "toString")) {
        a.toString = b2.toString;
      }
      if (hasOwnProp(b2, "valueOf")) {
        a.valueOf = b2.valueOf;
      }
      return a;
    }
    function createUTC(input, format2, locale2, strict) {
      return createLocalOrUTC(input, format2, locale2, strict, true).utc();
    }
    function defaultParsingFlags() {
      return {
        empty: false,
        unusedTokens: [],
        unusedInput: [],
        overflow: -2,
        charsLeftOver: 0,
        nullInput: false,
        invalidEra: null,
        invalidMonth: null,
        invalidFormat: false,
        userInvalidated: false,
        iso: false,
        parsedDateParts: [],
        era: null,
        meridiem: null,
        rfc2822: false,
        weekdayMismatch: false,
      };
    }
    function getParsingFlags(m) {
      if (m._pf == null) {
        m._pf = defaultParsingFlags();
      }
      return m._pf;
    }
    var some;
    if (Array.prototype.some) {
      some = Array.prototype.some;
    } else {
      some = function (fun) {
        var t = Object(this),
          len = t.length >>> 0,
          i;
        for (i = 0; i < len; i++) {
          if (i in t && fun.call(this, t[i], i, t)) {
            return true;
          }
        }
        return false;
      };
    }
    function isValid(m) {
      var flags = null,
        parsedParts = false,
        isNowValid = m._d && !isNaN(m._d.getTime());
      if (isNowValid) {
        flags = getParsingFlags(m);
        parsedParts = some.call(flags.parsedDateParts, function (i) {
          return i != null;
        });
        isNowValid =
          flags.overflow < 0 &&
          !flags.empty &&
          !flags.invalidEra &&
          !flags.invalidMonth &&
          !flags.invalidWeekday &&
          !flags.weekdayMismatch &&
          !flags.nullInput &&
          !flags.invalidFormat &&
          !flags.userInvalidated &&
          (!flags.meridiem || (flags.meridiem && parsedParts));
        if (m._strict) {
          isNowValid =
            isNowValid &&
            flags.charsLeftOver === 0 &&
            flags.unusedTokens.length === 0 &&
            flags.bigHour === void 0;
        }
      }
      if (Object.isFrozen == null || !Object.isFrozen(m)) {
        m._isValid = isNowValid;
      } else {
        return isNowValid;
      }
      return m._isValid;
    }
    function createInvalid(flags) {
      var m = createUTC(NaN);
      if (flags != null) {
        extend(getParsingFlags(m), flags);
      } else {
        getParsingFlags(m).userInvalidated = true;
      }
      return m;
    }
    var momentProperties = (hooks.momentProperties = []),
      updateInProgress = false;
    function copyConfig(to2, from2) {
      var i,
        prop,
        val,
        momentPropertiesLen = momentProperties.length;
      if (!isUndefined(from2._isAMomentObject)) {
        to2._isAMomentObject = from2._isAMomentObject;
      }
      if (!isUndefined(from2._i)) {
        to2._i = from2._i;
      }
      if (!isUndefined(from2._f)) {
        to2._f = from2._f;
      }
      if (!isUndefined(from2._l)) {
        to2._l = from2._l;
      }
      if (!isUndefined(from2._strict)) {
        to2._strict = from2._strict;
      }
      if (!isUndefined(from2._tzm)) {
        to2._tzm = from2._tzm;
      }
      if (!isUndefined(from2._isUTC)) {
        to2._isUTC = from2._isUTC;
      }
      if (!isUndefined(from2._offset)) {
        to2._offset = from2._offset;
      }
      if (!isUndefined(from2._pf)) {
        to2._pf = getParsingFlags(from2);
      }
      if (!isUndefined(from2._locale)) {
        to2._locale = from2._locale;
      }
      if (momentPropertiesLen > 0) {
        for (i = 0; i < momentPropertiesLen; i++) {
          prop = momentProperties[i];
          val = from2[prop];
          if (!isUndefined(val)) {
            to2[prop] = val;
          }
        }
      }
      return to2;
    }
    function Moment(config) {
      copyConfig(this, config);
      this._d = new Date(config._d != null ? config._d.getTime() : NaN);
      if (!this.isValid()) {
        this._d = /* @__PURE__ */ new Date(NaN);
      }
      if (updateInProgress === false) {
        updateInProgress = true;
        hooks.updateOffset(this);
        updateInProgress = false;
      }
    }
    function isMoment(obj) {
      return (
        obj instanceof Moment || (obj != null && obj._isAMomentObject != null)
      );
    }
    function warn(msg) {
      if (
        hooks.suppressDeprecationWarnings === false &&
        typeof console !== "undefined" &&
        console.warn
      ) {
        console.warn("Deprecation warning: " + msg);
      }
    }
    function deprecate(msg, fn) {
      var firstTime = true;
      return extend(function () {
        if (hooks.deprecationHandler != null) {
          hooks.deprecationHandler(null, msg);
        }
        if (firstTime) {
          var args = [],
            arg,
            i,
            key,
            argLen = arguments.length;
          for (i = 0; i < argLen; i++) {
            arg = "";
            if (typeof arguments[i] === "object") {
              arg += "\n[" + i + "] ";
              for (key in arguments[0]) {
                if (hasOwnProp(arguments[0], key)) {
                  arg += key + ": " + arguments[0][key] + ", ";
                }
              }
              arg = arg.slice(0, -2);
            } else {
              arg = arguments[i];
            }
            args.push(arg);
          }
          warn(
            msg +
            "\nArguments: " +
            Array.prototype.slice.call(args).join("") +
            "\n" +
            new Error().stack
          );
          firstTime = false;
        }
        return fn.apply(this, arguments);
      }, fn);
    }
    var deprecations = {};
    function deprecateSimple(name, msg) {
      if (hooks.deprecationHandler != null) {
        hooks.deprecationHandler(name, msg);
      }
      if (!deprecations[name]) {
        warn(msg);
        deprecations[name] = true;
      }
    }
    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;
    function isFunction(input) {
      return (
        (typeof Function !== "undefined" && input instanceof Function) ||
        Object.prototype.toString.call(input) === "[object Function]"
      );
    }
    function set(config) {
      var prop, i;
      for (i in config) {
        if (hasOwnProp(config, i)) {
          prop = config[i];
          if (isFunction(prop)) {
            this[i] = prop;
          } else {
            this["_" + i] = prop;
          }
        }
      }
      this._config = config;
      this._dayOfMonthOrdinalParseLenient = new RegExp(
        (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
        "|" +
        /\d{1,2}/.source
      );
    }
    function mergeConfigs(parentConfig, childConfig) {
      var res = extend({}, parentConfig),
        prop;
      for (prop in childConfig) {
        if (hasOwnProp(childConfig, prop)) {
          if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
            res[prop] = {};
            extend(res[prop], parentConfig[prop]);
            extend(res[prop], childConfig[prop]);
          } else if (childConfig[prop] != null) {
            res[prop] = childConfig[prop];
          } else {
            delete res[prop];
          }
        }
      }
      for (prop in parentConfig) {
        if (
          hasOwnProp(parentConfig, prop) &&
          !hasOwnProp(childConfig, prop) &&
          isObject(parentConfig[prop])
        ) {
          res[prop] = extend({}, res[prop]);
        }
      }
      return res;
    }
    function Locale(config) {
      if (config != null) {
        this.set(config);
      }
    }
    var keys;
    if (Object.keys) {
      keys = Object.keys;
    } else {
      keys = function (obj) {
        var i,
          res = [];
        for (i in obj) {
          if (hasOwnProp(obj, i)) {
            res.push(i);
          }
        }
        return res;
      };
    }
    var defaultCalendar = {
      sameDay: "[Today at] LT",
      nextDay: "[Tomorrow at] LT",
      nextWeek: "dddd [at] LT",
      lastDay: "[Yesterday at] LT",
      lastWeek: "[Last] dddd [at] LT",
      sameElse: "L",
    };
    function calendar(key, mom, now2) {
      var output = this._calendar[key] || this._calendar["sameElse"];
      return isFunction(output) ? output.call(mom, now2) : output;
    }
    function zeroFill(number, targetLength, forceSign) {
      var absNumber = "" + Math.abs(number),
        zerosToFill = targetLength - absNumber.length,
        sign2 = number >= 0;
      return (
        (sign2 ? (forceSign ? "+" : "") : "-") +
        Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) +
        absNumber
      );
    }
    var formattingTokens =
      /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
      localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
      formatFunctions = {},
      formatTokenFunctions = {};
    function addFormatToken(token2, padded, ordinal2, callback) {
      var func = callback;
      if (typeof callback === "string") {
        func = function () {
          return this[callback]();
        };
      }
      if (token2) {
        formatTokenFunctions[token2] = func;
      }
      if (padded) {
        formatTokenFunctions[padded[0]] = function () {
          return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
        };
      }
      if (ordinal2) {
        formatTokenFunctions[ordinal2] = function () {
          return this.localeData().ordinal(func.apply(this, arguments), token2);
        };
      }
    }
    function removeFormattingTokens(input) {
      if (input.match(/\[[\s\S]/)) {
        return input.replace(/^\[|\]$/g, "");
      }
      return input.replace(/\\/g, "");
    }
    function makeFormatFunction(format2) {
      var array = format2.match(formattingTokens),
        i,
        length;
      for (i = 0, length = array.length; i < length; i++) {
        if (formatTokenFunctions[array[i]]) {
          array[i] = formatTokenFunctions[array[i]];
        } else {
          array[i] = removeFormattingTokens(array[i]);
        }
      }
      return function (mom) {
        var output = "",
          i2;
        for (i2 = 0; i2 < length; i2++) {
          output += isFunction(array[i2])
            ? array[i2].call(mom, format2)
            : array[i2];
        }
        return output;
      };
    }
    function formatMoment(m, format2) {
      if (!m.isValid()) {
        return m.localeData().invalidDate();
      }
      format2 = expandFormat(format2, m.localeData());
      formatFunctions[format2] =
        formatFunctions[format2] || makeFormatFunction(format2);
      return formatFunctions[format2](m);
    }
    function expandFormat(format2, locale2) {
      var i = 5;
      function replaceLongDateFormatTokens(input) {
        return locale2.longDateFormat(input) || input;
      }
      localFormattingTokens.lastIndex = 0;
      while (i >= 0 && localFormattingTokens.test(format2)) {
        format2 = format2.replace(
          localFormattingTokens,
          replaceLongDateFormatTokens
        );
        localFormattingTokens.lastIndex = 0;
        i -= 1;
      }
      return format2;
    }
    var defaultLongDateFormat = {
      LTS: "h:mm:ss A",
      LT: "h:mm A",
      L: "MM/DD/YYYY",
      LL: "MMMM D, YYYY",
      LLL: "MMMM D, YYYY h:mm A",
      LLLL: "dddd, MMMM D, YYYY h:mm A",
    };
    function longDateFormat(key) {
      var format2 = this._longDateFormat[key],
        formatUpper = this._longDateFormat[key.toUpperCase()];
      if (format2 || !formatUpper) {
        return format2;
      }
      this._longDateFormat[key] = formatUpper
        .match(formattingTokens)
        .map(function (tok) {
          if (
            tok === "MMMM" ||
            tok === "MM" ||
            tok === "DD" ||
            tok === "dddd"
          ) {
            return tok.slice(1);
          }
          return tok;
        })
        .join("");
      return this._longDateFormat[key];
    }
    var defaultInvalidDate = "Invalid date";
    function invalidDate() {
      return this._invalidDate;
    }
    var defaultOrdinal = "%d",
      defaultDayOfMonthOrdinalParse = /\d{1,2}/;
    function ordinal(number) {
      return this._ordinal.replace("%d", number);
    }
    var defaultRelativeTime = {
      future: "in %s",
      past: "%s ago",
      s: "a few seconds",
      ss: "%d seconds",
      m: "a minute",
      mm: "%d minutes",
      h: "an hour",
      hh: "%d hours",
      d: "a day",
      dd: "%d days",
      w: "a week",
      ww: "%d weeks",
      M: "a month",
      MM: "%d months",
      y: "a year",
      yy: "%d years",
    };
    function relativeTime(number, withoutSuffix, string, isFuture) {
      var output = this._relativeTime[string];
      return isFunction(output)
        ? output(number, withoutSuffix, string, isFuture)
        : output.replace(/%d/i, number);
    }
    function pastFuture(diff2, output) {
      var format2 = this._relativeTime[diff2 > 0 ? "future" : "past"];
      return isFunction(format2)
        ? format2(output)
        : format2.replace(/%s/i, output);
    }
    var aliases = {
      D: "date",
      dates: "date",
      date: "date",
      d: "day",
      days: "day",
      day: "day",
      e: "weekday",
      weekdays: "weekday",
      weekday: "weekday",
      E: "isoWeekday",
      isoweekdays: "isoWeekday",
      isoweekday: "isoWeekday",
      DDD: "dayOfYear",
      dayofyears: "dayOfYear",
      dayofyear: "dayOfYear",
      h: "hour",
      hours: "hour",
      hour: "hour",
      ms: "millisecond",
      milliseconds: "millisecond",
      millisecond: "millisecond",
      m: "minute",
      minutes: "minute",
      minute: "minute",
      M: "month",
      months: "month",
      month: "month",
      Q: "quarter",
      quarters: "quarter",
      quarter: "quarter",
      s: "second",
      seconds: "second",
      second: "second",
      gg: "weekYear",
      weekyears: "weekYear",
      weekyear: "weekYear",
      GG: "isoWeekYear",
      isoweekyears: "isoWeekYear",
      isoweekyear: "isoWeekYear",
      w: "week",
      weeks: "week",
      week: "week",
      W: "isoWeek",
      isoweeks: "isoWeek",
      isoweek: "isoWeek",
      y: "year",
      years: "year",
      year: "year",
    };
    function normalizeUnits(units) {
      return typeof units === "string"
        ? aliases[units] || aliases[units.toLowerCase()]
        : void 0;
    }
    function normalizeObjectUnits(inputObject) {
      var normalizedInput = {},
        normalizedProp,
        prop;
      for (prop in inputObject) {
        if (hasOwnProp(inputObject, prop)) {
          normalizedProp = normalizeUnits(prop);
          if (normalizedProp) {
            normalizedInput[normalizedProp] = inputObject[prop];
          }
        }
      }
      return normalizedInput;
    }
    var priorities = {
      date: 9,
      day: 11,
      weekday: 11,
      isoWeekday: 11,
      dayOfYear: 4,
      hour: 13,
      millisecond: 16,
      minute: 14,
      month: 8,
      quarter: 7,
      second: 15,
      weekYear: 1,
      isoWeekYear: 1,
      week: 5,
      isoWeek: 5,
      year: 1,
    };
    function getPrioritizedUnits(unitsObj) {
      var units = [],
        u;
      for (u in unitsObj) {
        if (hasOwnProp(unitsObj, u)) {
          units.push({ unit: u, priority: priorities[u] });
        }
      }
      units.sort(function (a, b2) {
        return a.priority - b2.priority;
      });
      return units;
    }
    var match1 = /\d/,
      match2 = /\d\d/,
      match3 = /\d{3}/,
      match4 = /\d{4}/,
      match6 = /[+-]?\d{6}/,
      match1to2 = /\d\d?/,
      match3to4 = /\d\d\d\d?/,
      match5to6 = /\d\d\d\d\d\d?/,
      match1to3 = /\d{1,3}/,
      match1to4 = /\d{1,4}/,
      match1to6 = /[+-]?\d{1,6}/,
      matchUnsigned = /\d+/,
      matchSigned = /[+-]?\d+/,
      matchOffset = /Z|[+-]\d\d:?\d\d/gi,
      matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi,
      matchTimestamp = /[+-]?\d+(\.\d{1,3})?/,
      matchWord =
        /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
      match1to2NoLeadingZero = /^[1-9]\d?/,
      match1to2HasZero = /^([1-9]\d|\d)/,
      regexes;
    regexes = {};
    function addRegexToken(token2, regex, strictRegex) {
      regexes[token2] = isFunction(regex)
        ? regex
        : function (isStrict, localeData2) {
          return isStrict && strictRegex ? strictRegex : regex;
        };
    }
    function getParseRegexForToken(token2, config) {
      if (!hasOwnProp(regexes, token2)) {
        return new RegExp(unescapeFormat(token2));
      }
      return regexes[token2](config._strict, config._locale);
    }
    function unescapeFormat(s) {
      return regexEscape(
        s
          .replace("\\", "")
          .replace(
            /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
            function (matched, p1, p2, p3, p4) {
              return p1 || p2 || p3 || p4;
            }
          )
      );
    }
    function regexEscape(s) {
      return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
    }
    function absFloor(number) {
      if (number < 0) {
        return Math.ceil(number) || 0;
      } else {
        return Math.floor(number);
      }
    }
    function toInt(argumentForCoercion) {
      var coercedNumber = +argumentForCoercion,
        value = 0;
      if (coercedNumber !== 0 && isFinite(coercedNumber)) {
        value = absFloor(coercedNumber);
      }
      return value;
    }
    var tokens = {};
    function addParseToken(token2, callback) {
      var i,
        func = callback,
        tokenLen;
      if (typeof token2 === "string") {
        token2 = [token2];
      }
      if (isNumber(callback)) {
        func = function (input, array) {
          array[callback] = toInt(input);
        };
      }
      tokenLen = token2.length;
      for (i = 0; i < tokenLen; i++) {
        tokens[token2[i]] = func;
      }
    }
    function addWeekParseToken(token2, callback) {
      addParseToken(token2, function (input, array, config, token3) {
        config._w = config._w || {};
        callback(input, config._w, config, token3);
      });
    }
    function addTimeToArrayFromToken(token2, input, config) {
      if (input != null && hasOwnProp(tokens, token2)) {
        tokens[token2](input, config._a, config, token2);
      }
    }
    function isLeapYear(year) {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }
    var YEAR = 0,
      MONTH = 1,
      DATE = 2,
      HOUR = 3,
      MINUTE = 4,
      SECOND = 5,
      MILLISECOND = 6,
      WEEK = 7,
      WEEKDAY = 8;
    addFormatToken("Y", 0, 0, function () {
      var y = this.year();
      return y <= 9999 ? zeroFill(y, 4) : "+" + y;
    });
    addFormatToken(0, ["YY", 2], 0, function () {
      return this.year() % 100;
    });
    addFormatToken(0, ["YYYY", 4], 0, "year");
    addFormatToken(0, ["YYYYY", 5], 0, "year");
    addFormatToken(0, ["YYYYYY", 6, true], 0, "year");
    addRegexToken("Y", matchSigned);
    addRegexToken("YY", match1to2, match2);
    addRegexToken("YYYY", match1to4, match4);
    addRegexToken("YYYYY", match1to6, match6);
    addRegexToken("YYYYYY", match1to6, match6);
    addParseToken(["YYYYY", "YYYYYY"], YEAR);
    addParseToken("YYYY", function (input, array) {
      array[YEAR] =
        input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken("YY", function (input, array) {
      array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken("Y", function (input, array) {
      array[YEAR] = parseInt(input, 10);
    });
    function daysInYear(year) {
      return isLeapYear(year) ? 366 : 365;
    }
    hooks.parseTwoDigitYear = function (input) {
      return toInt(input) + (toInt(input) > 68 ? 1900 : 2e3);
    };
    var getSetYear = makeGetSet("FullYear", true);
    function getIsLeapYear() {
      return isLeapYear(this.year());
    }
    function makeGetSet(unit, keepTime) {
      return function (value) {
        if (value != null) {
          set$1(this, unit, value);
          hooks.updateOffset(this, keepTime);
          return this;
        } else {
          return get(this, unit);
        }
      };
    }
    function get(mom, unit) {
      if (!mom.isValid()) {
        return NaN;
      }
      var d = mom._d,
        isUTC = mom._isUTC;
      switch (unit) {
        case "Milliseconds":
          return isUTC ? d.getUTCMilliseconds() : d.getMilliseconds();
        case "Seconds":
          return isUTC ? d.getUTCSeconds() : d.getSeconds();
        case "Minutes":
          return isUTC ? d.getUTCMinutes() : d.getMinutes();
        case "Hours":
          return isUTC ? d.getUTCHours() : d.getHours();
        case "Date":
          return isUTC ? d.getUTCDate() : d.getDate();
        case "Day":
          return isUTC ? d.getUTCDay() : d.getDay();
        case "Month":
          return isUTC ? d.getUTCMonth() : d.getMonth();
        case "FullYear":
          return isUTC ? d.getUTCFullYear() : d.getFullYear();
        default:
          return NaN;
      }
    }
    function set$1(mom, unit, value) {
      var d, isUTC, year, month, date;
      if (!mom.isValid() || isNaN(value)) {
        return;
      }
      d = mom._d;
      isUTC = mom._isUTC;
      switch (unit) {
        case "Milliseconds":
          return void (isUTC
            ? d.setUTCMilliseconds(value)
            : d.setMilliseconds(value));
        case "Seconds":
          return void (isUTC ? d.setUTCSeconds(value) : d.setSeconds(value));
        case "Minutes":
          return void (isUTC ? d.setUTCMinutes(value) : d.setMinutes(value));
        case "Hours":
          return void (isUTC ? d.setUTCHours(value) : d.setHours(value));
        case "Date":
          return void (isUTC ? d.setUTCDate(value) : d.setDate(value));
        case "FullYear":
          break;
        default:
          return;
      }
      year = value;
      month = mom.month();
      date = mom.date();
      date = date === 29 && month === 1 && !isLeapYear(year) ? 28 : date;
      void (isUTC
        ? d.setUTCFullYear(year, month, date)
        : d.setFullYear(year, month, date));
    }
    function stringGet(units) {
      units = normalizeUnits(units);
      if (isFunction(this[units])) {
        return this[units]();
      }
      return this;
    }
    function stringSet(units, value) {
      if (typeof units === "object") {
        units = normalizeObjectUnits(units);
        var prioritized = getPrioritizedUnits(units),
          i,
          prioritizedLen = prioritized.length;
        for (i = 0; i < prioritizedLen; i++) {
          this[prioritized[i].unit](units[prioritized[i].unit]);
        }
      } else {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
          return this[units](value);
        }
      }
      return this;
    }
    function mod(n, x) {
      return ((n % x) + x) % x;
    }
    var indexOf;
    if (Array.prototype.indexOf) {
      indexOf = Array.prototype.indexOf;
    } else {
      indexOf = function (o) {
        var i;
        for (i = 0; i < this.length; ++i) {
          if (this[i] === o) {
            return i;
          }
        }
        return -1;
      };
    }
    function daysInMonth(year, month) {
      if (isNaN(year) || isNaN(month)) {
        return NaN;
      }
      var modMonth = mod(month, 12);
      year += (month - modMonth) / 12;
      return modMonth === 1
        ? isLeapYear(year)
          ? 29
          : 28
        : 31 - ((modMonth % 7) % 2);
    }
    addFormatToken("M", ["MM", 2], "Mo", function () {
      return this.month() + 1;
    });
    addFormatToken("MMM", 0, 0, function (format2) {
      return this.localeData().monthsShort(this, format2);
    });
    addFormatToken("MMMM", 0, 0, function (format2) {
      return this.localeData().months(this, format2);
    });
    addRegexToken("M", match1to2, match1to2NoLeadingZero);
    addRegexToken("MM", match1to2, match2);
    addRegexToken("MMM", function (isStrict, locale2) {
      return locale2.monthsShortRegex(isStrict);
    });
    addRegexToken("MMMM", function (isStrict, locale2) {
      return locale2.monthsRegex(isStrict);
    });
    addParseToken(["M", "MM"], function (input, array) {
      array[MONTH] = toInt(input) - 1;
    });
    addParseToken(["MMM", "MMMM"], function (input, array, config, token2) {
      var month = config._locale.monthsParse(input, token2, config._strict);
      if (month != null) {
        array[MONTH] = month;
      } else {
        getParsingFlags(config).invalidMonth = input;
      }
    });
    var defaultLocaleMonths =
      "January_February_March_April_May_June_July_August_September_October_November_December".split(
        "_"
      ),
      defaultLocaleMonthsShort =
        "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
      MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
      defaultMonthsShortRegex = matchWord,
      defaultMonthsRegex = matchWord;
    function localeMonths(m, format2) {
      if (!m) {
        return isArray(this._months)
          ? this._months
          : this._months["standalone"];
      }
      return isArray(this._months)
        ? this._months[m.month()]
        : this._months[
        (this._months.isFormat || MONTHS_IN_FORMAT).test(format2)
          ? "format"
          : "standalone"
        ][m.month()];
    }
    function localeMonthsShort(m, format2) {
      if (!m) {
        return isArray(this._monthsShort)
          ? this._monthsShort
          : this._monthsShort["standalone"];
      }
      return isArray(this._monthsShort)
        ? this._monthsShort[m.month()]
        : this._monthsShort[
        MONTHS_IN_FORMAT.test(format2) ? "format" : "standalone"
        ][m.month()];
    }
    function handleStrictParse(monthName, format2, strict) {
      var i,
        ii,
        mom,
        llc = monthName.toLocaleLowerCase();
      if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
        for (i = 0; i < 12; ++i) {
          mom = createUTC([2e3, i]);
          this._shortMonthsParse[i] = this.monthsShort(
            mom,
            ""
          ).toLocaleLowerCase();
          this._longMonthsParse[i] = this.months(mom, "").toLocaleLowerCase();
        }
      }
      if (strict) {
        if (format2 === "MMM") {
          ii = indexOf.call(this._shortMonthsParse, llc);
          return ii !== -1 ? ii : null;
        } else {
          ii = indexOf.call(this._longMonthsParse, llc);
          return ii !== -1 ? ii : null;
        }
      } else {
        if (format2 === "MMM") {
          ii = indexOf.call(this._shortMonthsParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._longMonthsParse, llc);
          return ii !== -1 ? ii : null;
        } else {
          ii = indexOf.call(this._longMonthsParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._shortMonthsParse, llc);
          return ii !== -1 ? ii : null;
        }
      }
    }
    function localeMonthsParse(monthName, format2, strict) {
      var i, mom, regex;
      if (this._monthsParseExact) {
        return handleStrictParse.call(this, monthName, format2, strict);
      }
      if (!this._monthsParse) {
        this._monthsParse = [];
        this._longMonthsParse = [];
        this._shortMonthsParse = [];
      }
      for (i = 0; i < 12; i++) {
        mom = createUTC([2e3, i]);
        if (strict && !this._longMonthsParse[i]) {
          this._longMonthsParse[i] = new RegExp(
            "^" + this.months(mom, "").replace(".", "") + "$",
            "i"
          );
          this._shortMonthsParse[i] = new RegExp(
            "^" + this.monthsShort(mom, "").replace(".", "") + "$",
            "i"
          );
        }
        if (!strict && !this._monthsParse[i]) {
          regex = "^" + this.months(mom, "") + "|^" + this.monthsShort(mom, "");
          this._monthsParse[i] = new RegExp(regex.replace(".", ""), "i");
        }
        if (
          strict &&
          format2 === "MMMM" &&
          this._longMonthsParse[i].test(monthName)
        ) {
          return i;
        } else if (
          strict &&
          format2 === "MMM" &&
          this._shortMonthsParse[i].test(monthName)
        ) {
          return i;
        } else if (!strict && this._monthsParse[i].test(monthName)) {
          return i;
        }
      }
    }
    function setMonth(mom, value) {
      if (!mom.isValid()) {
        return mom;
      }
      if (typeof value === "string") {
        if (/^\d+$/.test(value)) {
          value = toInt(value);
        } else {
          value = mom.localeData().monthsParse(value);
          if (!isNumber(value)) {
            return mom;
          }
        }
      }
      var month = value,
        date = mom.date();
      date = date < 29 ? date : Math.min(date, daysInMonth(mom.year(), month));
      void (mom._isUTC
        ? mom._d.setUTCMonth(month, date)
        : mom._d.setMonth(month, date));
      return mom;
    }
    function getSetMonth(value) {
      if (value != null) {
        setMonth(this, value);
        hooks.updateOffset(this, true);
        return this;
      } else {
        return get(this, "Month");
      }
    }
    function getDaysInMonth() {
      return daysInMonth(this.year(), this.month());
    }
    function monthsShortRegex(isStrict) {
      if (this._monthsParseExact) {
        if (!hasOwnProp(this, "_monthsRegex")) {
          computeMonthsParse.call(this);
        }
        if (isStrict) {
          return this._monthsShortStrictRegex;
        } else {
          return this._monthsShortRegex;
        }
      } else {
        if (!hasOwnProp(this, "_monthsShortRegex")) {
          this._monthsShortRegex = defaultMonthsShortRegex;
        }
        return this._monthsShortStrictRegex && isStrict
          ? this._monthsShortStrictRegex
          : this._monthsShortRegex;
      }
    }
    function monthsRegex(isStrict) {
      if (this._monthsParseExact) {
        if (!hasOwnProp(this, "_monthsRegex")) {
          computeMonthsParse.call(this);
        }
        if (isStrict) {
          return this._monthsStrictRegex;
        } else {
          return this._monthsRegex;
        }
      } else {
        if (!hasOwnProp(this, "_monthsRegex")) {
          this._monthsRegex = defaultMonthsRegex;
        }
        return this._monthsStrictRegex && isStrict
          ? this._monthsStrictRegex
          : this._monthsRegex;
      }
    }
    function computeMonthsParse() {
      function cmpLenRev(a, b2) {
        return b2.length - a.length;
      }
      var shortPieces = [],
        longPieces = [],
        mixedPieces = [],
        i,
        mom,
        shortP,
        longP;
      for (i = 0; i < 12; i++) {
        mom = createUTC([2e3, i]);
        shortP = regexEscape(this.monthsShort(mom, ""));
        longP = regexEscape(this.months(mom, ""));
        shortPieces.push(shortP);
        longPieces.push(longP);
        mixedPieces.push(longP);
        mixedPieces.push(shortP);
      }
      shortPieces.sort(cmpLenRev);
      longPieces.sort(cmpLenRev);
      mixedPieces.sort(cmpLenRev);
      this._monthsRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
      this._monthsShortRegex = this._monthsRegex;
      this._monthsStrictRegex = new RegExp(
        "^(" + longPieces.join("|") + ")",
        "i"
      );
      this._monthsShortStrictRegex = new RegExp(
        "^(" + shortPieces.join("|") + ")",
        "i"
      );
    }
    function createDate(y, m, d, h, M, s, ms) {
      var date;
      if (y < 100 && y >= 0) {
        date = new Date(y + 400, m, d, h, M, s, ms);
        if (isFinite(date.getFullYear())) {
          date.setFullYear(y);
        }
      } else {
        date = new Date(y, m, d, h, M, s, ms);
      }
      return date;
    }
    function createUTCDate(y) {
      var date, args;
      if (y < 100 && y >= 0) {
        args = Array.prototype.slice.call(arguments);
        args[0] = y + 400;
        date = new Date(Date.UTC.apply(null, args));
        if (isFinite(date.getUTCFullYear())) {
          date.setUTCFullYear(y);
        }
      } else {
        date = new Date(Date.UTC.apply(null, arguments));
      }
      return date;
    }
    function firstWeekOffset(year, dow, doy) {
      var fwd = 7 + dow - doy,
        fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;
      return -fwdlw + fwd - 1;
    }
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
      var localWeekday = (7 + weekday - dow) % 7,
        weekOffset = firstWeekOffset(year, dow, doy),
        dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
        resYear,
        resDayOfYear;
      if (dayOfYear <= 0) {
        resYear = year - 1;
        resDayOfYear = daysInYear(resYear) + dayOfYear;
      } else if (dayOfYear > daysInYear(year)) {
        resYear = year + 1;
        resDayOfYear = dayOfYear - daysInYear(year);
      } else {
        resYear = year;
        resDayOfYear = dayOfYear;
      }
      return {
        year: resYear,
        dayOfYear: resDayOfYear,
      };
    }
    function weekOfYear(mom, dow, doy) {
      var weekOffset = firstWeekOffset(mom.year(), dow, doy),
        week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
        resWeek,
        resYear;
      if (week < 1) {
        resYear = mom.year() - 1;
        resWeek = week + weeksInYear(resYear, dow, doy);
      } else if (week > weeksInYear(mom.year(), dow, doy)) {
        resWeek = week - weeksInYear(mom.year(), dow, doy);
        resYear = mom.year() + 1;
      } else {
        resYear = mom.year();
        resWeek = week;
      }
      return {
        week: resWeek,
        year: resYear,
      };
    }
    function weeksInYear(year, dow, doy) {
      var weekOffset = firstWeekOffset(year, dow, doy),
        weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
      return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }
    addFormatToken("w", ["ww", 2], "wo", "week");
    addFormatToken("W", ["WW", 2], "Wo", "isoWeek");
    addRegexToken("w", match1to2, match1to2NoLeadingZero);
    addRegexToken("ww", match1to2, match2);
    addRegexToken("W", match1to2, match1to2NoLeadingZero);
    addRegexToken("WW", match1to2, match2);
    addWeekParseToken(
      ["w", "ww", "W", "WW"],
      function (input, week, config, token2) {
        week[token2.substr(0, 1)] = toInt(input);
      }
    );
    function localeWeek(mom) {
      return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }
    var defaultLocaleWeek = {
      dow: 0,
      // Sunday is the first day of the week.
      doy: 6,
      // The week that contains Jan 6th is the first week of the year.
    };
    function localeFirstDayOfWeek() {
      return this._week.dow;
    }
    function localeFirstDayOfYear() {
      return this._week.doy;
    }
    function getSetWeek(input) {
      var week = this.localeData().week(this);
      return input == null ? week : this.add((input - week) * 7, "d");
    }
    function getSetISOWeek(input) {
      var week = weekOfYear(this, 1, 4).week;
      return input == null ? week : this.add((input - week) * 7, "d");
    }
    addFormatToken("d", 0, "do", "day");
    addFormatToken("dd", 0, 0, function (format2) {
      return this.localeData().weekdaysMin(this, format2);
    });
    addFormatToken("ddd", 0, 0, function (format2) {
      return this.localeData().weekdaysShort(this, format2);
    });
    addFormatToken("dddd", 0, 0, function (format2) {
      return this.localeData().weekdays(this, format2);
    });
    addFormatToken("e", 0, 0, "weekday");
    addFormatToken("E", 0, 0, "isoWeekday");
    addRegexToken("d", match1to2);
    addRegexToken("e", match1to2);
    addRegexToken("E", match1to2);
    addRegexToken("dd", function (isStrict, locale2) {
      return locale2.weekdaysMinRegex(isStrict);
    });
    addRegexToken("ddd", function (isStrict, locale2) {
      return locale2.weekdaysShortRegex(isStrict);
    });
    addRegexToken("dddd", function (isStrict, locale2) {
      return locale2.weekdaysRegex(isStrict);
    });
    addWeekParseToken(
      ["dd", "ddd", "dddd"],
      function (input, week, config, token2) {
        var weekday = config._locale.weekdaysParse(
          input,
          token2,
          config._strict
        );
        if (weekday != null) {
          week.d = weekday;
        } else {
          getParsingFlags(config).invalidWeekday = input;
        }
      }
    );
    addWeekParseToken(["d", "e", "E"], function (input, week, config, token2) {
      week[token2] = toInt(input);
    });
    function parseWeekday(input, locale2) {
      if (typeof input !== "string") {
        return input;
      }
      if (!isNaN(input)) {
        return parseInt(input, 10);
      }
      input = locale2.weekdaysParse(input);
      if (typeof input === "number") {
        return input;
      }
      return null;
    }
    function parseIsoWeekday(input, locale2) {
      if (typeof input === "string") {
        return locale2.weekdaysParse(input) % 7 || 7;
      }
      return isNaN(input) ? null : input;
    }
    function shiftWeekdays(ws, n) {
      return ws.slice(n, 7).concat(ws.slice(0, n));
    }
    var defaultLocaleWeekdays =
      "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      defaultLocaleWeekdaysShort = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
      defaultLocaleWeekdaysMin = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
      defaultWeekdaysRegex = matchWord,
      defaultWeekdaysShortRegex = matchWord,
      defaultWeekdaysMinRegex = matchWord;
    function localeWeekdays(m, format2) {
      var weekdays = isArray(this._weekdays)
        ? this._weekdays
        : this._weekdays[
        m && m !== true && this._weekdays.isFormat.test(format2)
          ? "format"
          : "standalone"
        ];
      return m === true
        ? shiftWeekdays(weekdays, this._week.dow)
        : m
          ? weekdays[m.day()]
          : weekdays;
    }
    function localeWeekdaysShort(m) {
      return m === true
        ? shiftWeekdays(this._weekdaysShort, this._week.dow)
        : m
          ? this._weekdaysShort[m.day()]
          : this._weekdaysShort;
    }
    function localeWeekdaysMin(m) {
      return m === true
        ? shiftWeekdays(this._weekdaysMin, this._week.dow)
        : m
          ? this._weekdaysMin[m.day()]
          : this._weekdaysMin;
    }
    function handleStrictParse$1(weekdayName, format2, strict) {
      var i,
        ii,
        mom,
        llc = weekdayName.toLocaleLowerCase();
      if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._minWeekdaysParse = [];
        for (i = 0; i < 7; ++i) {
          mom = createUTC([2e3, 1]).day(i);
          this._minWeekdaysParse[i] = this.weekdaysMin(
            mom,
            ""
          ).toLocaleLowerCase();
          this._shortWeekdaysParse[i] = this.weekdaysShort(
            mom,
            ""
          ).toLocaleLowerCase();
          this._weekdaysParse[i] = this.weekdays(mom, "").toLocaleLowerCase();
        }
      }
      if (strict) {
        if (format2 === "dddd") {
          ii = indexOf.call(this._weekdaysParse, llc);
          return ii !== -1 ? ii : null;
        } else if (format2 === "ddd") {
          ii = indexOf.call(this._shortWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        } else {
          ii = indexOf.call(this._minWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        }
      } else {
        if (format2 === "dddd") {
          ii = indexOf.call(this._weekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._shortWeekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._minWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        } else if (format2 === "ddd") {
          ii = indexOf.call(this._shortWeekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._weekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._minWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        } else {
          ii = indexOf.call(this._minWeekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._weekdaysParse, llc);
          if (ii !== -1) {
            return ii;
          }
          ii = indexOf.call(this._shortWeekdaysParse, llc);
          return ii !== -1 ? ii : null;
        }
      }
    }
    function localeWeekdaysParse(weekdayName, format2, strict) {
      var i, mom, regex;
      if (this._weekdaysParseExact) {
        return handleStrictParse$1.call(this, weekdayName, format2, strict);
      }
      if (!this._weekdaysParse) {
        this._weekdaysParse = [];
        this._minWeekdaysParse = [];
        this._shortWeekdaysParse = [];
        this._fullWeekdaysParse = [];
      }
      for (i = 0; i < 7; i++) {
        mom = createUTC([2e3, 1]).day(i);
        if (strict && !this._fullWeekdaysParse[i]) {
          this._fullWeekdaysParse[i] = new RegExp(
            "^" + this.weekdays(mom, "").replace(".", "\\.?") + "$",
            "i"
          );
          this._shortWeekdaysParse[i] = new RegExp(
            "^" + this.weekdaysShort(mom, "").replace(".", "\\.?") + "$",
            "i"
          );
          this._minWeekdaysParse[i] = new RegExp(
            "^" + this.weekdaysMin(mom, "").replace(".", "\\.?") + "$",
            "i"
          );
        }
        if (!this._weekdaysParse[i]) {
          regex =
            "^" +
            this.weekdays(mom, "") +
            "|^" +
            this.weekdaysShort(mom, "") +
            "|^" +
            this.weekdaysMin(mom, "");
          this._weekdaysParse[i] = new RegExp(regex.replace(".", ""), "i");
        }
        if (
          strict &&
          format2 === "dddd" &&
          this._fullWeekdaysParse[i].test(weekdayName)
        ) {
          return i;
        } else if (
          strict &&
          format2 === "ddd" &&
          this._shortWeekdaysParse[i].test(weekdayName)
        ) {
          return i;
        } else if (
          strict &&
          format2 === "dd" &&
          this._minWeekdaysParse[i].test(weekdayName)
        ) {
          return i;
        } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
          return i;
        }
      }
    }
    function getSetDayOfWeek(input) {
      if (!this.isValid()) {
        return input != null ? this : NaN;
      }
      var day = get(this, "Day");
      if (input != null) {
        input = parseWeekday(input, this.localeData());
        return this.add(input - day, "d");
      } else {
        return day;
      }
    }
    function getSetLocaleDayOfWeek(input) {
      if (!this.isValid()) {
        return input != null ? this : NaN;
      }
      var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
      return input == null ? weekday : this.add(input - weekday, "d");
    }
    function getSetISODayOfWeek(input) {
      if (!this.isValid()) {
        return input != null ? this : NaN;
      }
      if (input != null) {
        var weekday = parseIsoWeekday(input, this.localeData());
        return this.day(this.day() % 7 ? weekday : weekday - 7);
      } else {
        return this.day() || 7;
      }
    }
    function weekdaysRegex(isStrict) {
      if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, "_weekdaysRegex")) {
          computeWeekdaysParse.call(this);
        }
        if (isStrict) {
          return this._weekdaysStrictRegex;
        } else {
          return this._weekdaysRegex;
        }
      } else {
        if (!hasOwnProp(this, "_weekdaysRegex")) {
          this._weekdaysRegex = defaultWeekdaysRegex;
        }
        return this._weekdaysStrictRegex && isStrict
          ? this._weekdaysStrictRegex
          : this._weekdaysRegex;
      }
    }
    function weekdaysShortRegex(isStrict) {
      if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, "_weekdaysRegex")) {
          computeWeekdaysParse.call(this);
        }
        if (isStrict) {
          return this._weekdaysShortStrictRegex;
        } else {
          return this._weekdaysShortRegex;
        }
      } else {
        if (!hasOwnProp(this, "_weekdaysShortRegex")) {
          this._weekdaysShortRegex = defaultWeekdaysShortRegex;
        }
        return this._weekdaysShortStrictRegex && isStrict
          ? this._weekdaysShortStrictRegex
          : this._weekdaysShortRegex;
      }
    }
    function weekdaysMinRegex(isStrict) {
      if (this._weekdaysParseExact) {
        if (!hasOwnProp(this, "_weekdaysRegex")) {
          computeWeekdaysParse.call(this);
        }
        if (isStrict) {
          return this._weekdaysMinStrictRegex;
        } else {
          return this._weekdaysMinRegex;
        }
      } else {
        if (!hasOwnProp(this, "_weekdaysMinRegex")) {
          this._weekdaysMinRegex = defaultWeekdaysMinRegex;
        }
        return this._weekdaysMinStrictRegex && isStrict
          ? this._weekdaysMinStrictRegex
          : this._weekdaysMinRegex;
      }
    }
    function computeWeekdaysParse() {
      function cmpLenRev(a, b2) {
        return b2.length - a.length;
      }
      var minPieces = [],
        shortPieces = [],
        longPieces = [],
        mixedPieces = [],
        i,
        mom,
        minp,
        shortp,
        longp;
      for (i = 0; i < 7; i++) {
        mom = createUTC([2e3, 1]).day(i);
        minp = regexEscape(this.weekdaysMin(mom, ""));
        shortp = regexEscape(this.weekdaysShort(mom, ""));
        longp = regexEscape(this.weekdays(mom, ""));
        minPieces.push(minp);
        shortPieces.push(shortp);
        longPieces.push(longp);
        mixedPieces.push(minp);
        mixedPieces.push(shortp);
        mixedPieces.push(longp);
      }
      minPieces.sort(cmpLenRev);
      shortPieces.sort(cmpLenRev);
      longPieces.sort(cmpLenRev);
      mixedPieces.sort(cmpLenRev);
      this._weekdaysRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
      this._weekdaysShortRegex = this._weekdaysRegex;
      this._weekdaysMinRegex = this._weekdaysRegex;
      this._weekdaysStrictRegex = new RegExp(
        "^(" + longPieces.join("|") + ")",
        "i"
      );
      this._weekdaysShortStrictRegex = new RegExp(
        "^(" + shortPieces.join("|") + ")",
        "i"
      );
      this._weekdaysMinStrictRegex = new RegExp(
        "^(" + minPieces.join("|") + ")",
        "i"
      );
    }
    function hFormat() {
      return this.hours() % 12 || 12;
    }
    function kFormat() {
      return this.hours() || 24;
    }
    addFormatToken("H", ["HH", 2], 0, "hour");
    addFormatToken("h", ["hh", 2], 0, hFormat);
    addFormatToken("k", ["kk", 2], 0, kFormat);
    addFormatToken("hmm", 0, 0, function () {
      return "" + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });
    addFormatToken("hmmss", 0, 0, function () {
      return (
        "" +
        hFormat.apply(this) +
        zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2)
      );
    });
    addFormatToken("Hmm", 0, 0, function () {
      return "" + this.hours() + zeroFill(this.minutes(), 2);
    });
    addFormatToken("Hmmss", 0, 0, function () {
      return (
        "" +
        this.hours() +
        zeroFill(this.minutes(), 2) +
        zeroFill(this.seconds(), 2)
      );
    });
    function meridiem(token2, lowercase) {
      addFormatToken(token2, 0, 0, function () {
        return this.localeData().meridiem(
          this.hours(),
          this.minutes(),
          lowercase
        );
      });
    }
    meridiem("a", true);
    meridiem("A", false);
    function matchMeridiem(isStrict, locale2) {
      return locale2._meridiemParse;
    }
    addRegexToken("a", matchMeridiem);
    addRegexToken("A", matchMeridiem);
    addRegexToken("H", match1to2, match1to2HasZero);
    addRegexToken("h", match1to2, match1to2NoLeadingZero);
    addRegexToken("k", match1to2, match1to2NoLeadingZero);
    addRegexToken("HH", match1to2, match2);
    addRegexToken("hh", match1to2, match2);
    addRegexToken("kk", match1to2, match2);
    addRegexToken("hmm", match3to4);
    addRegexToken("hmmss", match5to6);
    addRegexToken("Hmm", match3to4);
    addRegexToken("Hmmss", match5to6);
    addParseToken(["H", "HH"], HOUR);
    addParseToken(["k", "kk"], function (input, array, config) {
      var kInput = toInt(input);
      array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(["a", "A"], function (input, array, config) {
      config._isPm = config._locale.isPM(input);
      config._meridiem = input;
    });
    addParseToken(["h", "hh"], function (input, array, config) {
      array[HOUR] = toInt(input);
      getParsingFlags(config).bigHour = true;
    });
    addParseToken("hmm", function (input, array, config) {
      var pos = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos));
      array[MINUTE] = toInt(input.substr(pos));
      getParsingFlags(config).bigHour = true;
    });
    addParseToken("hmmss", function (input, array, config) {
      var pos1 = input.length - 4,
        pos2 = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos1));
      array[MINUTE] = toInt(input.substr(pos1, 2));
      array[SECOND] = toInt(input.substr(pos2));
      getParsingFlags(config).bigHour = true;
    });
    addParseToken("Hmm", function (input, array, config) {
      var pos = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos));
      array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken("Hmmss", function (input, array, config) {
      var pos1 = input.length - 4,
        pos2 = input.length - 2;
      array[HOUR] = toInt(input.substr(0, pos1));
      array[MINUTE] = toInt(input.substr(pos1, 2));
      array[SECOND] = toInt(input.substr(pos2));
    });
    function localeIsPM(input) {
      return (input + "").toLowerCase().charAt(0) === "p";
    }
    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i,
      getSetHour = makeGetSet("Hours", true);
    function localeMeridiem(hours2, minutes2, isLower) {
      if (hours2 > 11) {
        return isLower ? "pm" : "PM";
      } else {
        return isLower ? "am" : "AM";
      }
    }
    var baseConfig = {
      calendar: defaultCalendar,
      longDateFormat: defaultLongDateFormat,
      invalidDate: defaultInvalidDate,
      ordinal: defaultOrdinal,
      dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
      relativeTime: defaultRelativeTime,
      months: defaultLocaleMonths,
      monthsShort: defaultLocaleMonthsShort,
      week: defaultLocaleWeek,
      weekdays: defaultLocaleWeekdays,
      weekdaysMin: defaultLocaleWeekdaysMin,
      weekdaysShort: defaultLocaleWeekdaysShort,
      meridiemParse: defaultLocaleMeridiemParse,
    };
    var locales = {},
      localeFamilies = {},
      globalLocale;
    function commonPrefix(arr1, arr2) {
      var i,
        minl = Math.min(arr1.length, arr2.length);
      for (i = 0; i < minl; i += 1) {
        if (arr1[i] !== arr2[i]) {
          return i;
        }
      }
      return minl;
    }
    function normalizeLocale(key) {
      return key ? key.toLowerCase().replace("_", "-") : key;
    }
    function chooseLocale(names) {
      var i = 0,
        j,
        next,
        locale2,
        split;
      while (i < names.length) {
        split = normalizeLocale(names[i]).split("-");
        j = split.length;
        next = normalizeLocale(names[i + 1]);
        next = next ? next.split("-") : null;
        while (j > 0) {
          locale2 = loadLocale(split.slice(0, j).join("-"));
          if (locale2) {
            return locale2;
          }
          if (next && next.length >= j && commonPrefix(split, next) >= j - 1) {
            break;
          }
          j--;
        }
        i++;
      }
      return globalLocale;
    }
    function isLocaleNameSane(name) {
      return !!(name && name.match("^[^/\\\\]*$"));
    }
    function loadLocale(name) {
      var oldLocale = null,
        aliasedRequire;
      if (
        locales[name] === void 0 &&
        typeof module !== "undefined" &&
        module &&
        module.exports &&
        isLocaleNameSane(name)
      ) {
        try {
          oldLocale = globalLocale._abbr;
          aliasedRequire = require;
          aliasedRequire("./locale/" + name);
          getSetGlobalLocale(oldLocale);
        } catch (e) {
          locales[name] = null;
        }
      }
      return locales[name];
    }
    function getSetGlobalLocale(key, values) {
      var data;
      if (key) {
        if (isUndefined(values)) {
          data = getLocale(key);
        } else {
          data = defineLocale(key, values);
        }
        if (data) {
          globalLocale = data;
        } else {
          if (typeof console !== "undefined" && console.warn) {
            console.warn(
              "Locale " + key + " not found. Did you forget to load it?"
            );
          }
        }
      }
      return globalLocale._abbr;
    }
    function defineLocale(name, config) {
      if (config !== null) {
        var locale2,
          parentConfig = baseConfig;
        config.abbr = name;
        if (locales[name] != null) {
          deprecateSimple(
            "defineLocaleOverride",
            "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
          );
          parentConfig = locales[name]._config;
        } else if (config.parentLocale != null) {
          if (locales[config.parentLocale] != null) {
            parentConfig = locales[config.parentLocale]._config;
          } else {
            locale2 = loadLocale(config.parentLocale);
            if (locale2 != null) {
              parentConfig = locale2._config;
            } else {
              if (!localeFamilies[config.parentLocale]) {
                localeFamilies[config.parentLocale] = [];
              }
              localeFamilies[config.parentLocale].push({
                name,
                config,
              });
              return null;
            }
          }
        }
        locales[name] = new Locale(mergeConfigs(parentConfig, config));
        if (localeFamilies[name]) {
          localeFamilies[name].forEach(function (x) {
            defineLocale(x.name, x.config);
          });
        }
        getSetGlobalLocale(name);
        return locales[name];
      } else {
        delete locales[name];
        return null;
      }
    }
    function updateLocale(name, config) {
      if (config != null) {
        var locale2,
          tmpLocale,
          parentConfig = baseConfig;
        if (locales[name] != null && locales[name].parentLocale != null) {
          locales[name].set(mergeConfigs(locales[name]._config, config));
        } else {
          tmpLocale = loadLocale(name);
          if (tmpLocale != null) {
            parentConfig = tmpLocale._config;
          }
          config = mergeConfigs(parentConfig, config);
          if (tmpLocale == null) {
            config.abbr = name;
          }
          locale2 = new Locale(config);
          locale2.parentLocale = locales[name];
          locales[name] = locale2;
        }
        getSetGlobalLocale(name);
      } else {
        if (locales[name] != null) {
          if (locales[name].parentLocale != null) {
            locales[name] = locales[name].parentLocale;
            if (name === getSetGlobalLocale()) {
              getSetGlobalLocale(name);
            }
          } else if (locales[name] != null) {
            delete locales[name];
          }
        }
      }
      return locales[name];
    }
    function getLocale(key) {
      var locale2;
      if (key && key._locale && key._locale._abbr) {
        key = key._locale._abbr;
      }
      if (!key) {
        return globalLocale;
      }
      if (!isArray(key)) {
        locale2 = loadLocale(key);
        if (locale2) {
          return locale2;
        }
        key = [key];
      }
      return chooseLocale(key);
    }
    function listLocales() {
      return keys(locales);
    }
    function checkOverflow(m) {
      var overflow,
        a = m._a;
      if (a && getParsingFlags(m).overflow === -2) {
        overflow =
          a[MONTH] < 0 || a[MONTH] > 11
            ? MONTH
            : a[DATE] < 1 || a[DATE] > daysInMonth(a[YEAR], a[MONTH])
              ? DATE
              : a[HOUR] < 0 ||
                a[HOUR] > 24 ||
                (a[HOUR] === 24 &&
                  (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0))
                ? HOUR
                : a[MINUTE] < 0 || a[MINUTE] > 59
                  ? MINUTE
                  : a[SECOND] < 0 || a[SECOND] > 59
                    ? SECOND
                    : a[MILLISECOND] < 0 || a[MILLISECOND] > 999
                      ? MILLISECOND
                      : -1;
        if (
          getParsingFlags(m)._overflowDayOfYear &&
          (overflow < YEAR || overflow > DATE)
        ) {
          overflow = DATE;
        }
        if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
          overflow = WEEK;
        }
        if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
          overflow = WEEKDAY;
        }
        getParsingFlags(m).overflow = overflow;
      }
      return m;
    }
    var extendedIsoRegex =
      /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
      basicIsoRegex =
        /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
      tzRegex = /Z|[+-]\d\d(?::?\d\d)?/,
      isoDates = [
        ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
        ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
        ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
        ["GGGG-[W]WW", /\d{4}-W\d\d/, false],
        ["YYYY-DDD", /\d{4}-\d{3}/],
        ["YYYY-MM", /\d{4}-\d\d/, false],
        ["YYYYYYMMDD", /[+-]\d{10}/],
        ["YYYYMMDD", /\d{8}/],
        ["GGGG[W]WWE", /\d{4}W\d{3}/],
        ["GGGG[W]WW", /\d{4}W\d{2}/, false],
        ["YYYYDDD", /\d{7}/],
        ["YYYYMM", /\d{6}/, false],
        ["YYYY", /\d{4}/, false],
      ],
      isoTimes = [
        ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
        ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
        ["HH:mm:ss", /\d\d:\d\d:\d\d/],
        ["HH:mm", /\d\d:\d\d/],
        ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
        ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
        ["HHmmss", /\d\d\d\d\d\d/],
        ["HHmm", /\d\d\d\d/],
        ["HH", /\d\d/],
      ],
      aspNetJsonRegex = /^\/?Date\((-?\d+)/i,
      rfc2822 =
        /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
      obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60,
      };
    function configFromISO(config) {
      var i,
        l,
        string = config._i,
        match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
        allowTime,
        dateFormat,
        timeFormat,
        tzFormat,
        isoDatesLen = isoDates.length,
        isoTimesLen = isoTimes.length;
      if (match) {
        getParsingFlags(config).iso = true;
        for (i = 0, l = isoDatesLen; i < l; i++) {
          if (isoDates[i][1].exec(match[1])) {
            dateFormat = isoDates[i][0];
            allowTime = isoDates[i][2] !== false;
            break;
          }
        }
        if (dateFormat == null) {
          config._isValid = false;
          return;
        }
        if (match[3]) {
          for (i = 0, l = isoTimesLen; i < l; i++) {
            if (isoTimes[i][1].exec(match[3])) {
              timeFormat = (match[2] || " ") + isoTimes[i][0];
              break;
            }
          }
          if (timeFormat == null) {
            config._isValid = false;
            return;
          }
        }
        if (!allowTime && timeFormat != null) {
          config._isValid = false;
          return;
        }
        if (match[4]) {
          if (tzRegex.exec(match[4])) {
            tzFormat = "Z";
          } else {
            config._isValid = false;
            return;
          }
        }
        config._f = dateFormat + (timeFormat || "") + (tzFormat || "");
        configFromStringAndFormat(config);
      } else {
        config._isValid = false;
      }
    }
    function extractFromRFC2822Strings(
      yearStr,
      monthStr,
      dayStr,
      hourStr,
      minuteStr,
      secondStr
    ) {
      var result = [
        untruncateYear(yearStr),
        defaultLocaleMonthsShort.indexOf(monthStr),
        parseInt(dayStr, 10),
        parseInt(hourStr, 10),
        parseInt(minuteStr, 10),
      ];
      if (secondStr) {
        result.push(parseInt(secondStr, 10));
      }
      return result;
    }
    function untruncateYear(yearStr) {
      var year = parseInt(yearStr, 10);
      if (year <= 49) {
        return 2e3 + year;
      } else if (year <= 999) {
        return 1900 + year;
      }
      return year;
    }
    function preprocessRFC2822(s) {
      return s
        .replace(/\([^()]*\)|[\n\t]/g, " ")
        .replace(/(\s\s+)/g, " ")
        .replace(/^\s\s*/, "")
        .replace(/\s\s*$/, "");
    }
    function checkWeekday(weekdayStr, parsedInput, config) {
      if (weekdayStr) {
        var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
          weekdayActual = new Date(
            parsedInput[0],
            parsedInput[1],
            parsedInput[2]
          ).getDay();
        if (weekdayProvided !== weekdayActual) {
          getParsingFlags(config).weekdayMismatch = true;
          config._isValid = false;
          return false;
        }
      }
      return true;
    }
    function calculateOffset$1(obsOffset, militaryOffset, numOffset) {
      if (obsOffset) {
        return obsOffsets[obsOffset];
      } else if (militaryOffset) {
        return 0;
      } else {
        var hm = parseInt(numOffset, 10),
          m = hm % 100,
          h = (hm - m) / 100;
        return h * 60 + m;
      }
    }
    function configFromRFC2822(config) {
      var match = rfc2822.exec(preprocessRFC2822(config._i)),
        parsedArray;
      if (match) {
        parsedArray = extractFromRFC2822Strings(
          match[4],
          match[3],
          match[2],
          match[5],
          match[6],
          match[7]
        );
        if (!checkWeekday(match[1], parsedArray, config)) {
          return;
        }
        config._a = parsedArray;
        config._tzm = calculateOffset$1(match[8], match[9], match[10]);
        config._d = createUTCDate.apply(null, config._a);
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        getParsingFlags(config).rfc2822 = true;
      } else {
        config._isValid = false;
      }
    }
    function configFromString(config) {
      var matched = aspNetJsonRegex.exec(config._i);
      if (matched !== null) {
        config._d = /* @__PURE__ */ new Date(+matched[1]);
        return;
      }
      configFromISO(config);
      if (config._isValid === false) {
        delete config._isValid;
      } else {
        return;
      }
      configFromRFC2822(config);
      if (config._isValid === false) {
        delete config._isValid;
      } else {
        return;
      }
      if (config._strict) {
        config._isValid = false;
      } else {
        hooks.createFromInputFallback(config);
      }
    }
    hooks.createFromInputFallback = deprecate(
      "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
      function (config) {
        config._d = /* @__PURE__ */ new Date(
          config._i + (config._useUTC ? " UTC" : "")
        );
      }
    );
    function defaults(a, b2, c) {
      if (a != null) {
        return a;
      }
      if (b2 != null) {
        return b2;
      }
      return c;
    }
    function currentDateArray(config) {
      var nowValue = new Date(hooks.now());
      if (config._useUTC) {
        return [
          nowValue.getUTCFullYear(),
          nowValue.getUTCMonth(),
          nowValue.getUTCDate(),
        ];
      }
      return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }
    function configFromArray(config) {
      var i,
        date,
        input = [],
        currentDate,
        expectedWeekday,
        yearToUse;
      if (config._d) {
        return;
      }
      currentDate = currentDateArray(config);
      if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
        dayOfYearFromWeekInfo(config);
      }
      if (config._dayOfYear != null) {
        yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);
        if (
          config._dayOfYear > daysInYear(yearToUse) ||
          config._dayOfYear === 0
        ) {
          getParsingFlags(config)._overflowDayOfYear = true;
        }
        date = createUTCDate(yearToUse, 0, config._dayOfYear);
        config._a[MONTH] = date.getUTCMonth();
        config._a[DATE] = date.getUTCDate();
      }
      for (i = 0; i < 3 && config._a[i] == null; ++i) {
        config._a[i] = input[i] = currentDate[i];
      }
      for (; i < 7; i++) {
        config._a[i] = input[i] =
          config._a[i] == null ? (i === 2 ? 1 : 0) : config._a[i];
      }
      if (
        config._a[HOUR] === 24 &&
        config._a[MINUTE] === 0 &&
        config._a[SECOND] === 0 &&
        config._a[MILLISECOND] === 0
      ) {
        config._nextDay = true;
        config._a[HOUR] = 0;
      }
      config._d = (config._useUTC ? createUTCDate : createDate).apply(
        null,
        input
      );
      expectedWeekday = config._useUTC
        ? config._d.getUTCDay()
        : config._d.getDay();
      if (config._tzm != null) {
        config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
      }
      if (config._nextDay) {
        config._a[HOUR] = 24;
      }
      if (
        config._w &&
        typeof config._w.d !== "undefined" &&
        config._w.d !== expectedWeekday
      ) {
        getParsingFlags(config).weekdayMismatch = true;
      }
    }
    function dayOfYearFromWeekInfo(config) {
      var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow, curWeek;
      w = config._w;
      if (w.GG != null || w.W != null || w.E != null) {
        dow = 1;
        doy = 4;
        weekYear = defaults(
          w.GG,
          config._a[YEAR],
          weekOfYear(createLocal(), 1, 4).year
        );
        week = defaults(w.W, 1);
        weekday = defaults(w.E, 1);
        if (weekday < 1 || weekday > 7) {
          weekdayOverflow = true;
        }
      } else {
        dow = config._locale._week.dow;
        doy = config._locale._week.doy;
        curWeek = weekOfYear(createLocal(), dow, doy);
        weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);
        week = defaults(w.w, curWeek.week);
        if (w.d != null) {
          weekday = w.d;
          if (weekday < 0 || weekday > 6) {
            weekdayOverflow = true;
          }
        } else if (w.e != null) {
          weekday = w.e + dow;
          if (w.e < 0 || w.e > 6) {
            weekdayOverflow = true;
          }
        } else {
          weekday = dow;
        }
      }
      if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
        getParsingFlags(config)._overflowWeeks = true;
      } else if (weekdayOverflow != null) {
        getParsingFlags(config)._overflowWeekday = true;
      } else {
        temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
        config._a[YEAR] = temp.year;
        config._dayOfYear = temp.dayOfYear;
      }
    }
    hooks.ISO_8601 = function () { };
    hooks.RFC_2822 = function () { };
    function configFromStringAndFormat(config) {
      if (config._f === hooks.ISO_8601) {
        configFromISO(config);
        return;
      }
      if (config._f === hooks.RFC_2822) {
        configFromRFC2822(config);
        return;
      }
      config._a = [];
      getParsingFlags(config).empty = true;
      var string = "" + config._i,
        i,
        parsedInput,
        tokens2,
        token2,
        skipped,
        stringLength = string.length,
        totalParsedInputLength = 0,
        era,
        tokenLen;
      tokens2 =
        expandFormat(config._f, config._locale).match(formattingTokens) || [];
      tokenLen = tokens2.length;
      for (i = 0; i < tokenLen; i++) {
        token2 = tokens2[i];
        parsedInput = (string.match(getParseRegexForToken(token2, config)) ||
          [])[0];
        if (parsedInput) {
          skipped = string.substr(0, string.indexOf(parsedInput));
          if (skipped.length > 0) {
            getParsingFlags(config).unusedInput.push(skipped);
          }
          string = string.slice(
            string.indexOf(parsedInput) + parsedInput.length
          );
          totalParsedInputLength += parsedInput.length;
        }
        if (formatTokenFunctions[token2]) {
          if (parsedInput) {
            getParsingFlags(config).empty = false;
          } else {
            getParsingFlags(config).unusedTokens.push(token2);
          }
          addTimeToArrayFromToken(token2, parsedInput, config);
        } else if (config._strict && !parsedInput) {
          getParsingFlags(config).unusedTokens.push(token2);
        }
      }
      getParsingFlags(config).charsLeftOver =
        stringLength - totalParsedInputLength;
      if (string.length > 0) {
        getParsingFlags(config).unusedInput.push(string);
      }
      if (
        config._a[HOUR] <= 12 &&
        getParsingFlags(config).bigHour === true &&
        config._a[HOUR] > 0
      ) {
        getParsingFlags(config).bigHour = void 0;
      }
      getParsingFlags(config).parsedDateParts = config._a.slice(0);
      getParsingFlags(config).meridiem = config._meridiem;
      config._a[HOUR] = meridiemFixWrap(
        config._locale,
        config._a[HOUR],
        config._meridiem
      );
      era = getParsingFlags(config).era;
      if (era !== null) {
        config._a[YEAR] = config._locale.erasConvertYear(era, config._a[YEAR]);
      }
      configFromArray(config);
      checkOverflow(config);
    }
    function meridiemFixWrap(locale2, hour, meridiem2) {
      var isPm;
      if (meridiem2 == null) {
        return hour;
      }
      if (locale2.meridiemHour != null) {
        return locale2.meridiemHour(hour, meridiem2);
      } else if (locale2.isPM != null) {
        isPm = locale2.isPM(meridiem2);
        if (isPm && hour < 12) {
          hour += 12;
        }
        if (!isPm && hour === 12) {
          hour = 0;
        }
        return hour;
      } else {
        return hour;
      }
    }
    function configFromStringAndArray(config) {
      var tempConfig,
        bestMoment,
        scoreToBeat,
        i,
        currentScore,
        validFormatFound,
        bestFormatIsValid = false,
        configfLen = config._f.length;
      if (configfLen === 0) {
        getParsingFlags(config).invalidFormat = true;
        config._d = /* @__PURE__ */ new Date(NaN);
        return;
      }
      for (i = 0; i < configfLen; i++) {
        currentScore = 0;
        validFormatFound = false;
        tempConfig = copyConfig({}, config);
        if (config._useUTC != null) {
          tempConfig._useUTC = config._useUTC;
        }
        tempConfig._f = config._f[i];
        configFromStringAndFormat(tempConfig);
        if (isValid(tempConfig)) {
          validFormatFound = true;
        }
        currentScore += getParsingFlags(tempConfig).charsLeftOver;
        currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;
        getParsingFlags(tempConfig).score = currentScore;
        if (!bestFormatIsValid) {
          if (
            scoreToBeat == null ||
            currentScore < scoreToBeat ||
            validFormatFound
          ) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
            if (validFormatFound) {
              bestFormatIsValid = true;
            }
          }
        } else {
          if (currentScore < scoreToBeat) {
            scoreToBeat = currentScore;
            bestMoment = tempConfig;
          }
        }
      }
      extend(config, bestMoment || tempConfig);
    }
    function configFromObject(config) {
      if (config._d) {
        return;
      }
      var i = normalizeObjectUnits(config._i),
        dayOrDate = i.day === void 0 ? i.date : i.day;
      config._a = map(
        [i.year, i.month, dayOrDate, i.hour, i.minute, i.second, i.millisecond],
        function (obj) {
          return obj && parseInt(obj, 10);
        }
      );
      configFromArray(config);
    }
    function createFromConfig(config) {
      var res = new Moment(checkOverflow(prepareConfig(config)));
      if (res._nextDay) {
        res.add(1, "d");
        res._nextDay = void 0;
      }
      return res;
    }
    function prepareConfig(config) {
      var input = config._i,
        format2 = config._f;
      config._locale = config._locale || getLocale(config._l);
      if (input === null || (format2 === void 0 && input === "")) {
        return createInvalid({ nullInput: true });
      }
      if (typeof input === "string") {
        config._i = input = config._locale.preparse(input);
      }
      if (isMoment(input)) {
        return new Moment(checkOverflow(input));
      } else if (isDate(input)) {
        config._d = input;
      } else if (isArray(format2)) {
        configFromStringAndArray(config);
      } else if (format2) {
        configFromStringAndFormat(config);
      } else {
        configFromInput(config);
      }
      if (!isValid(config)) {
        config._d = null;
      }
      return config;
    }
    function configFromInput(config) {
      var input = config._i;
      if (isUndefined(input)) {
        config._d = new Date(hooks.now());
      } else if (isDate(input)) {
        config._d = new Date(input.valueOf());
      } else if (typeof input === "string") {
        configFromString(config);
      } else if (isArray(input)) {
        config._a = map(input.slice(0), function (obj) {
          return parseInt(obj, 10);
        });
        configFromArray(config);
      } else if (isObject(input)) {
        configFromObject(config);
      } else if (isNumber(input)) {
        config._d = new Date(input);
      } else {
        hooks.createFromInputFallback(config);
      }
    }
    function createLocalOrUTC(input, format2, locale2, strict, isUTC) {
      var c = {};
      if (format2 === true || format2 === false) {
        strict = format2;
        format2 = void 0;
      }
      if (locale2 === true || locale2 === false) {
        strict = locale2;
        locale2 = void 0;
      }
      if (
        (isObject(input) && isObjectEmpty(input)) ||
        (isArray(input) && input.length === 0)
      ) {
        input = void 0;
      }
      c._isAMomentObject = true;
      c._useUTC = c._isUTC = isUTC;
      c._l = locale2;
      c._i = input;
      c._f = format2;
      c._strict = strict;
      return createFromConfig(c);
    }
    function createLocal(input, format2, locale2, strict) {
      return createLocalOrUTC(input, format2, locale2, strict, false);
    }
    var prototypeMin = deprecate(
      "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
      function () {
        var other = createLocal.apply(null, arguments);
        if (this.isValid() && other.isValid()) {
          return other < this ? this : other;
        } else {
          return createInvalid();
        }
      }
    ),
      prototypeMax = deprecate(
        "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
        function () {
          var other = createLocal.apply(null, arguments);
          if (this.isValid() && other.isValid()) {
            return other > this ? this : other;
          } else {
            return createInvalid();
          }
        }
      );
    function pickBy(fn, moments) {
      var res, i;
      if (moments.length === 1 && isArray(moments[0])) {
        moments = moments[0];
      }
      if (!moments.length) {
        return createLocal();
      }
      res = moments[0];
      for (i = 1; i < moments.length; ++i) {
        if (!moments[i].isValid() || moments[i][fn](res)) {
          res = moments[i];
        }
      }
      return res;
    }
    function min() {
      var args = [].slice.call(arguments, 0);
      return pickBy("isBefore", args);
    }
    function max() {
      var args = [].slice.call(arguments, 0);
      return pickBy("isAfter", args);
    }
    var now = function () {
      return Date.now ? Date.now() : +(/* @__PURE__ */ new Date());
    };
    var ordering = [
      "year",
      "quarter",
      "month",
      "week",
      "day",
      "hour",
      "minute",
      "second",
      "millisecond",
    ];
    function isDurationValid(m) {
      var key,
        unitHasDecimal = false,
        i,
        orderLen = ordering.length;
      for (key in m) {
        if (
          hasOwnProp(m, key) &&
          !(
            indexOf.call(ordering, key) !== -1 &&
            (m[key] == null || !isNaN(m[key]))
          )
        ) {
          return false;
        }
      }
      for (i = 0; i < orderLen; ++i) {
        if (m[ordering[i]]) {
          if (unitHasDecimal) {
            return false;
          }
          if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
            unitHasDecimal = true;
          }
        }
      }
      return true;
    }
    function isValid$1() {
      return this._isValid;
    }
    function createInvalid$1() {
      return createDuration(NaN);
    }
    function Duration(duration) {
      var normalizedInput = normalizeObjectUnits(duration),
        years2 = normalizedInput.year || 0,
        quarters = normalizedInput.quarter || 0,
        months2 = normalizedInput.month || 0,
        weeks2 = normalizedInput.week || normalizedInput.isoWeek || 0,
        days2 = normalizedInput.day || 0,
        hours2 = normalizedInput.hour || 0,
        minutes2 = normalizedInput.minute || 0,
        seconds2 = normalizedInput.second || 0,
        milliseconds2 = normalizedInput.millisecond || 0;
      this._isValid = isDurationValid(normalizedInput);
      this._milliseconds =
        +milliseconds2 +
        seconds2 * 1e3 + // 1000
        minutes2 * 6e4 + // 1000 * 60
        hours2 * 1e3 * 60 * 60;
      this._days = +days2 + weeks2 * 7;
      this._months = +months2 + quarters * 3 + years2 * 12;
      this._data = {};
      this._locale = getLocale();
      this._bubble();
    }
    function isDuration(obj) {
      return obj instanceof Duration;
    }
    function absRound(number) {
      if (number < 0) {
        return Math.round(-1 * number) * -1;
      } else {
        return Math.round(number);
      }
    }
    function compareArrays(array1, array2, dontConvert) {
      var len = Math.min(array1.length, array2.length),
        lengthDiff = Math.abs(array1.length - array2.length),
        diffs = 0,
        i;
      for (i = 0; i < len; i++) {
        if (
          (dontConvert && array1[i] !== array2[i]) ||
          (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))
        ) {
          diffs++;
        }
      }
      return diffs + lengthDiff;
    }
    function offset(token2, separator) {
      addFormatToken(token2, 0, 0, function () {
        var offset2 = this.utcOffset(),
          sign2 = "+";
        if (offset2 < 0) {
          offset2 = -offset2;
          sign2 = "-";
        }
        return (
          sign2 +
          zeroFill(~~(offset2 / 60), 2) +
          separator +
          zeroFill(~~offset2 % 60, 2)
        );
      });
    }
    offset("Z", ":");
    offset("ZZ", "");
    addRegexToken("Z", matchShortOffset);
    addRegexToken("ZZ", matchShortOffset);
    addParseToken(["Z", "ZZ"], function (input, array, config) {
      config._useUTC = true;
      config._tzm = offsetFromString(matchShortOffset, input);
    });
    var chunkOffset = /([\+\-]|\d\d)/gi;
    function offsetFromString(matcher, string) {
      var matches = (string || "").match(matcher),
        chunk,
        parts,
        minutes2;
      if (matches === null) {
        return null;
      }
      chunk = matches[matches.length - 1] || [];
      parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
      minutes2 = +(parts[1] * 60) + toInt(parts[2]);
      return minutes2 === 0 ? 0 : parts[0] === "+" ? minutes2 : -minutes2;
    }
    function cloneWithOffset(input, model) {
      var res, diff2;
      if (model._isUTC) {
        res = model.clone();
        diff2 =
          (isMoment(input) || isDate(input)
            ? input.valueOf()
            : createLocal(input).valueOf()) - res.valueOf();
        res._d.setTime(res._d.valueOf() + diff2);
        hooks.updateOffset(res, false);
        return res;
      } else {
        return createLocal(input).local();
      }
    }
    function getDateOffset(m) {
      return -Math.round(m._d.getTimezoneOffset());
    }
    hooks.updateOffset = function () { };
    function getSetOffset(input, keepLocalTime, keepMinutes) {
      var offset2 = this._offset || 0,
        localAdjust;
      if (!this.isValid()) {
        return input != null ? this : NaN;
      }
      if (input != null) {
        if (typeof input === "string") {
          input = offsetFromString(matchShortOffset, input);
          if (input === null) {
            return this;
          }
        } else if (Math.abs(input) < 16 && !keepMinutes) {
          input = input * 60;
        }
        if (!this._isUTC && keepLocalTime) {
          localAdjust = getDateOffset(this);
        }
        this._offset = input;
        this._isUTC = true;
        if (localAdjust != null) {
          this.add(localAdjust, "m");
        }
        if (offset2 !== input) {
          if (!keepLocalTime || this._changeInProgress) {
            addSubtract(this, createDuration(input - offset2, "m"), 1, false);
          } else if (!this._changeInProgress) {
            this._changeInProgress = true;
            hooks.updateOffset(this, true);
            this._changeInProgress = null;
          }
        }
        return this;
      } else {
        return this._isUTC ? offset2 : getDateOffset(this);
      }
    }
    function getSetZone(input, keepLocalTime) {
      if (input != null) {
        if (typeof input !== "string") {
          input = -input;
        }
        this.utcOffset(input, keepLocalTime);
        return this;
      } else {
        return -this.utcOffset();
      }
    }
    function setOffsetToUTC(keepLocalTime) {
      return this.utcOffset(0, keepLocalTime);
    }
    function setOffsetToLocal(keepLocalTime) {
      if (this._isUTC) {
        this.utcOffset(0, keepLocalTime);
        this._isUTC = false;
        if (keepLocalTime) {
          this.subtract(getDateOffset(this), "m");
        }
      }
      return this;
    }
    function setOffsetToParsedOffset() {
      if (this._tzm != null) {
        this.utcOffset(this._tzm, false, true);
      } else if (typeof this._i === "string") {
        var tZone = offsetFromString(matchOffset, this._i);
        if (tZone != null) {
          this.utcOffset(tZone);
        } else {
          this.utcOffset(0, true);
        }
      }
      return this;
    }
    function hasAlignedHourOffset(input) {
      if (!this.isValid()) {
        return false;
      }
      input = input ? createLocal(input).utcOffset() : 0;
      return (this.utcOffset() - input) % 60 === 0;
    }
    function isDaylightSavingTime() {
      return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
      );
    }
    function isDaylightSavingTimeShifted() {
      if (!isUndefined(this._isDSTShifted)) {
        return this._isDSTShifted;
      }
      var c = {},
        other;
      copyConfig(c, this);
      c = prepareConfig(c);
      if (c._a) {
        other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
        this._isDSTShifted =
          this.isValid() && compareArrays(c._a, other.toArray()) > 0;
      } else {
        this._isDSTShifted = false;
      }
      return this._isDSTShifted;
    }
    function isLocal() {
      return this.isValid() ? !this._isUTC : false;
    }
    function isUtcOffset() {
      return this.isValid() ? this._isUTC : false;
    }
    function isUtc() {
      return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }
    var aspNetRegex = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
      isoRegex =
        /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
    function createDuration(input, key) {
      var duration = input,
        match = null,
        sign2,
        ret,
        diffRes;
      if (isDuration(input)) {
        duration = {
          ms: input._milliseconds,
          d: input._days,
          M: input._months,
        };
      } else if (isNumber(input) || !isNaN(+input)) {
        duration = {};
        if (key) {
          duration[key] = +input;
        } else {
          duration.milliseconds = +input;
        }
      } else if ((match = aspNetRegex.exec(input))) {
        sign2 = match[1] === "-" ? -1 : 1;
        duration = {
          y: 0,
          d: toInt(match[DATE]) * sign2,
          h: toInt(match[HOUR]) * sign2,
          m: toInt(match[MINUTE]) * sign2,
          s: toInt(match[SECOND]) * sign2,
          ms: toInt(absRound(match[MILLISECOND] * 1e3)) * sign2,
          // the millisecond decimal point is included in the match
        };
      } else if ((match = isoRegex.exec(input))) {
        sign2 = match[1] === "-" ? -1 : 1;
        duration = {
          y: parseIso(match[2], sign2),
          M: parseIso(match[3], sign2),
          w: parseIso(match[4], sign2),
          d: parseIso(match[5], sign2),
          h: parseIso(match[6], sign2),
          m: parseIso(match[7], sign2),
          s: parseIso(match[8], sign2),
        };
      } else if (duration == null) {
        duration = {};
      } else if (
        typeof duration === "object" &&
        ("from" in duration || "to" in duration)
      ) {
        diffRes = momentsDifference(
          createLocal(duration.from),
          createLocal(duration.to)
        );
        duration = {};
        duration.ms = diffRes.milliseconds;
        duration.M = diffRes.months;
      }
      ret = new Duration(duration);
      if (isDuration(input) && hasOwnProp(input, "_locale")) {
        ret._locale = input._locale;
      }
      if (isDuration(input) && hasOwnProp(input, "_isValid")) {
        ret._isValid = input._isValid;
      }
      return ret;
    }
    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;
    function parseIso(inp, sign2) {
      var res = inp && parseFloat(inp.replace(",", "."));
      return (isNaN(res) ? 0 : res) * sign2;
    }
    function positiveMomentsDifference(base, other) {
      var res = {};
      res.months =
        other.month() - base.month() + (other.year() - base.year()) * 12;
      if (base.clone().add(res.months, "M").isAfter(other)) {
        --res.months;
      }
      res.milliseconds = +other - +base.clone().add(res.months, "M");
      return res;
    }
    function momentsDifference(base, other) {
      var res;
      if (!(base.isValid() && other.isValid())) {
        return { milliseconds: 0, months: 0 };
      }
      other = cloneWithOffset(other, base);
      if (base.isBefore(other)) {
        res = positiveMomentsDifference(base, other);
      } else {
        res = positiveMomentsDifference(other, base);
        res.milliseconds = -res.milliseconds;
        res.months = -res.months;
      }
      return res;
    }
    function createAdder(direction, name) {
      return function (val, period) {
        var dur, tmp;
        if (period !== null && !isNaN(+period)) {
          deprecateSimple(
            name,
            "moment()." +
            name +
            "(period, number) is deprecated. Please use moment()." +
            name +
            "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
          );
          tmp = val;
          val = period;
          period = tmp;
        }
        dur = createDuration(val, period);
        addSubtract(this, dur, direction);
        return this;
      };
    }
    function addSubtract(mom, duration, isAdding, updateOffset) {
      var milliseconds2 = duration._milliseconds,
        days2 = absRound(duration._days),
        months2 = absRound(duration._months);
      if (!mom.isValid()) {
        return;
      }
      updateOffset = updateOffset == null ? true : updateOffset;
      if (months2) {
        setMonth(mom, get(mom, "Month") + months2 * isAdding);
      }
      if (days2) {
        set$1(mom, "Date", get(mom, "Date") + days2 * isAdding);
      }
      if (milliseconds2) {
        mom._d.setTime(mom._d.valueOf() + milliseconds2 * isAdding);
      }
      if (updateOffset) {
        hooks.updateOffset(mom, days2 || months2);
      }
    }
    var add = createAdder(1, "add"),
      subtract = createAdder(-1, "subtract");
    function isString(input) {
      return typeof input === "string" || input instanceof String;
    }
    function isMomentInput(input) {
      return (
        isMoment(input) ||
        isDate(input) ||
        isString(input) ||
        isNumber(input) ||
        isNumberOrStringArray(input) ||
        isMomentInputObject(input) ||
        input === null ||
        input === void 0
      );
    }
    function isMomentInputObject(input) {
      var objectTest = isObject(input) && !isObjectEmpty(input),
        propertyTest = false,
        properties = [
          "years",
          "year",
          "y",
          "months",
          "month",
          "M",
          "days",
          "day",
          "d",
          "dates",
          "date",
          "D",
          "hours",
          "hour",
          "h",
          "minutes",
          "minute",
          "m",
          "seconds",
          "second",
          "s",
          "milliseconds",
          "millisecond",
          "ms",
        ],
        i,
        property,
        propertyLen = properties.length;
      for (i = 0; i < propertyLen; i += 1) {
        property = properties[i];
        propertyTest = propertyTest || hasOwnProp(input, property);
      }
      return objectTest && propertyTest;
    }
    function isNumberOrStringArray(input) {
      var arrayTest = isArray(input),
        dataTypeTest = false;
      if (arrayTest) {
        dataTypeTest =
          input.filter(function (item) {
            return !isNumber(item) && isString(input);
          }).length === 0;
      }
      return arrayTest && dataTypeTest;
    }
    function isCalendarSpec(input) {
      var objectTest = isObject(input) && !isObjectEmpty(input),
        propertyTest = false,
        properties = [
          "sameDay",
          "nextDay",
          "lastDay",
          "nextWeek",
          "lastWeek",
          "sameElse",
        ],
        i,
        property;
      for (i = 0; i < properties.length; i += 1) {
        property = properties[i];
        propertyTest = propertyTest || hasOwnProp(input, property);
      }
      return objectTest && propertyTest;
    }
    function getCalendarFormat(myMoment, now2) {
      var diff2 = myMoment.diff(now2, "days", true);
      return diff2 < -6
        ? "sameElse"
        : diff2 < -1
          ? "lastWeek"
          : diff2 < 0
            ? "lastDay"
            : diff2 < 1
              ? "sameDay"
              : diff2 < 2
                ? "nextDay"
                : diff2 < 7
                  ? "nextWeek"
                  : "sameElse";
    }
    function calendar$1(time, formats) {
      if (arguments.length === 1) {
        if (!arguments[0]) {
          time = void 0;
          formats = void 0;
        } else if (isMomentInput(arguments[0])) {
          time = arguments[0];
          formats = void 0;
        } else if (isCalendarSpec(arguments[0])) {
          formats = arguments[0];
          time = void 0;
        }
      }
      var now2 = time || createLocal(),
        sod = cloneWithOffset(now2, this).startOf("day"),
        format2 = hooks.calendarFormat(this, sod) || "sameElse",
        output =
          formats &&
          (isFunction(formats[format2])
            ? formats[format2].call(this, now2)
            : formats[format2]);
      return this.format(
        output || this.localeData().calendar(format2, this, createLocal(now2))
      );
    }
    function clone() {
      return new Moment(this);
    }
    function isAfter(input, units) {
      var localInput = isMoment(input) ? input : createLocal(input);
      if (!(this.isValid() && localInput.isValid())) {
        return false;
      }
      units = normalizeUnits(units) || "millisecond";
      if (units === "millisecond") {
        return this.valueOf() > localInput.valueOf();
      } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
      }
    }
    function isBefore(input, units) {
      var localInput = isMoment(input) ? input : createLocal(input);
      if (!(this.isValid() && localInput.isValid())) {
        return false;
      }
      units = normalizeUnits(units) || "millisecond";
      if (units === "millisecond") {
        return this.valueOf() < localInput.valueOf();
      } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
      }
    }
    function isBetween(from2, to2, units, inclusivity) {
      var localFrom = isMoment(from2) ? from2 : createLocal(from2),
        localTo = isMoment(to2) ? to2 : createLocal(to2);
      if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
        return false;
      }
      inclusivity = inclusivity || "()";
      return (
        (inclusivity[0] === "("
          ? this.isAfter(localFrom, units)
          : !this.isBefore(localFrom, units)) &&
        (inclusivity[1] === ")"
          ? this.isBefore(localTo, units)
          : !this.isAfter(localTo, units))
      );
    }
    function isSame(input, units) {
      var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;
      if (!(this.isValid() && localInput.isValid())) {
        return false;
      }
      units = normalizeUnits(units) || "millisecond";
      if (units === "millisecond") {
        return this.valueOf() === localInput.valueOf();
      } else {
        inputMs = localInput.valueOf();
        return (
          this.clone().startOf(units).valueOf() <= inputMs &&
          inputMs <= this.clone().endOf(units).valueOf()
        );
      }
    }
    function isSameOrAfter(input, units) {
      return this.isSame(input, units) || this.isAfter(input, units);
    }
    function isSameOrBefore(input, units) {
      return this.isSame(input, units) || this.isBefore(input, units);
    }
    function diff(input, units, asFloat) {
      var that, zoneDelta, output;
      if (!this.isValid()) {
        return NaN;
      }
      that = cloneWithOffset(input, this);
      if (!that.isValid()) {
        return NaN;
      }
      zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;
      units = normalizeUnits(units);
      switch (units) {
        case "year":
          output = monthDiff(this, that) / 12;
          break;
        case "month":
          output = monthDiff(this, that);
          break;
        case "quarter":
          output = monthDiff(this, that) / 3;
          break;
        case "second":
          output = (this - that) / 1e3;
          break;
        case "minute":
          output = (this - that) / 6e4;
          break;
        case "hour":
          output = (this - that) / 36e5;
          break;
        case "day":
          output = (this - that - zoneDelta) / 864e5;
          break;
        case "week":
          output = (this - that - zoneDelta) / 6048e5;
          break;
        default:
          output = this - that;
      }
      return asFloat ? output : absFloor(output);
    }
    function monthDiff(a, b2) {
      if (a.date() < b2.date()) {
        return -monthDiff(b2, a);
      }
      var wholeMonthDiff =
        (b2.year() - a.year()) * 12 + (b2.month() - a.month()),
        anchor = a.clone().add(wholeMonthDiff, "months"),
        anchor2,
        adjust;
      if (b2 - anchor < 0) {
        anchor2 = a.clone().add(wholeMonthDiff - 1, "months");
        adjust = (b2 - anchor) / (anchor - anchor2);
      } else {
        anchor2 = a.clone().add(wholeMonthDiff + 1, "months");
        adjust = (b2 - anchor) / (anchor2 - anchor);
      }
      return -(wholeMonthDiff + adjust) || 0;
    }
    hooks.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ";
    hooks.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
    function toString() {
      return this.clone()
        .locale("en")
        .format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
    }
    function toISOString(keepOffset) {
      if (!this.isValid()) {
        return null;
      }
      var utc = keepOffset !== true,
        m = utc ? this.clone().utc() : this;
      if (m.year() < 0 || m.year() > 9999) {
        return formatMoment(
          m,
          utc
            ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
            : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
        );
      }
      if (isFunction(Date.prototype.toISOString)) {
        if (utc) {
          return this.toDate().toISOString();
        } else {
          return new Date(this.valueOf() + this.utcOffset() * 60 * 1e3)
            .toISOString()
            .replace("Z", formatMoment(m, "Z"));
        }
      }
      return formatMoment(
        m,
        utc ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
      );
    }
    function inspect() {
      if (!this.isValid()) {
        return "moment.invalid(/* " + this._i + " */)";
      }
      var func = "moment",
        zone = "",
        prefix,
        year,
        datetime,
        suffix;
      if (!this.isLocal()) {
        func = this.utcOffset() === 0 ? "moment.utc" : "moment.parseZone";
        zone = "Z";
      }
      prefix = "[" + func + '("]';
      year = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY";
      datetime = "-MM-DD[T]HH:mm:ss.SSS";
      suffix = zone + '[")]';
      return this.format(prefix + year + datetime + suffix);
    }
    function format(inputString) {
      if (!inputString) {
        inputString = this.isUtc()
          ? hooks.defaultFormatUtc
          : hooks.defaultFormat;
      }
      var output = formatMoment(this, inputString);
      return this.localeData().postformat(output);
    }
    function from(time, withoutSuffix) {
      if (
        this.isValid() &&
        ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
      ) {
        return createDuration({ to: this, from: time })
          .locale(this.locale())
          .humanize(!withoutSuffix);
      } else {
        return this.localeData().invalidDate();
      }
    }
    function fromNow(withoutSuffix) {
      return this.from(createLocal(), withoutSuffix);
    }
    function to(time, withoutSuffix) {
      if (
        this.isValid() &&
        ((isMoment(time) && time.isValid()) || createLocal(time).isValid())
      ) {
        return createDuration({ from: this, to: time })
          .locale(this.locale())
          .humanize(!withoutSuffix);
      } else {
        return this.localeData().invalidDate();
      }
    }
    function toNow(withoutSuffix) {
      return this.to(createLocal(), withoutSuffix);
    }
    function locale(key) {
      var newLocaleData;
      if (key === void 0) {
        return this._locale._abbr;
      } else {
        newLocaleData = getLocale(key);
        if (newLocaleData != null) {
          this._locale = newLocaleData;
        }
        return this;
      }
    }
    var lang = deprecate(
      "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
      function (key) {
        if (key === void 0) {
          return this.localeData();
        } else {
          return this.locale(key);
        }
      }
    );
    function localeData() {
      return this._locale;
    }
    var MS_PER_SECOND = 1e3,
      MS_PER_MINUTE = 60 * MS_PER_SECOND,
      MS_PER_HOUR = 60 * MS_PER_MINUTE,
      MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;
    function mod$1(dividend, divisor) {
      return ((dividend % divisor) + divisor) % divisor;
    }
    function localStartOfDate(y, m, d) {
      if (y < 100 && y >= 0) {
        return new Date(y + 400, m, d) - MS_PER_400_YEARS;
      } else {
        return new Date(y, m, d).valueOf();
      }
    }
    function utcStartOfDate(y, m, d) {
      if (y < 100 && y >= 0) {
        return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
      } else {
        return Date.UTC(y, m, d);
      }
    }
    function startOf(units) {
      var time, startOfDate;
      units = normalizeUnits(units);
      if (units === void 0 || units === "millisecond" || !this.isValid()) {
        return this;
      }
      startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
      switch (units) {
        case "year":
          time = startOfDate(this.year(), 0, 1);
          break;
        case "quarter":
          time = startOfDate(this.year(), this.month() - (this.month() % 3), 1);
          break;
        case "month":
          time = startOfDate(this.year(), this.month(), 1);
          break;
        case "week":
          time = startOfDate(
            this.year(),
            this.month(),
            this.date() - this.weekday()
          );
          break;
        case "isoWeek":
          time = startOfDate(
            this.year(),
            this.month(),
            this.date() - (this.isoWeekday() - 1)
          );
          break;
        case "day":
        case "date":
          time = startOfDate(this.year(), this.month(), this.date());
          break;
        case "hour":
          time = this._d.valueOf();
          time -= mod$1(
            time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
            MS_PER_HOUR
          );
          break;
        case "minute":
          time = this._d.valueOf();
          time -= mod$1(time, MS_PER_MINUTE);
          break;
        case "second":
          time = this._d.valueOf();
          time -= mod$1(time, MS_PER_SECOND);
          break;
      }
      this._d.setTime(time);
      hooks.updateOffset(this, true);
      return this;
    }
    function endOf(units) {
      var time, startOfDate;
      units = normalizeUnits(units);
      if (units === void 0 || units === "millisecond" || !this.isValid()) {
        return this;
      }
      startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;
      switch (units) {
        case "year":
          time = startOfDate(this.year() + 1, 0, 1) - 1;
          break;
        case "quarter":
          time =
            startOfDate(this.year(), this.month() - (this.month() % 3) + 3, 1) -
            1;
          break;
        case "month":
          time = startOfDate(this.year(), this.month() + 1, 1) - 1;
          break;
        case "week":
          time =
            startOfDate(
              this.year(),
              this.month(),
              this.date() - this.weekday() + 7
            ) - 1;
          break;
        case "isoWeek":
          time =
            startOfDate(
              this.year(),
              this.month(),
              this.date() - (this.isoWeekday() - 1) + 7
            ) - 1;
          break;
        case "day":
        case "date":
          time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
          break;
        case "hour":
          time = this._d.valueOf();
          time +=
            MS_PER_HOUR -
            mod$1(
              time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE),
              MS_PER_HOUR
            ) -
            1;
          break;
        case "minute":
          time = this._d.valueOf();
          time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
          break;
        case "second":
          time = this._d.valueOf();
          time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
          break;
      }
      this._d.setTime(time);
      hooks.updateOffset(this, true);
      return this;
    }
    function valueOf() {
      return this._d.valueOf() - (this._offset || 0) * 6e4;
    }
    function unix() {
      return Math.floor(this.valueOf() / 1e3);
    }
    function toDate() {
      return new Date(this.valueOf());
    }
    function toArray() {
      var m = this;
      return [
        m.year(),
        m.month(),
        m.date(),
        m.hour(),
        m.minute(),
        m.second(),
        m.millisecond(),
      ];
    }
    function toObject() {
      var m = this;
      return {
        years: m.year(),
        months: m.month(),
        date: m.date(),
        hours: m.hours(),
        minutes: m.minutes(),
        seconds: m.seconds(),
        milliseconds: m.milliseconds(),
      };
    }
    function toJSON() {
      return this.isValid() ? this.toISOString() : null;
    }
    function isValid$2() {
      return isValid(this);
    }
    function parsingFlags() {
      return extend({}, getParsingFlags(this));
    }
    function invalidAt() {
      return getParsingFlags(this).overflow;
    }
    function creationData() {
      return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict,
      };
    }
    addFormatToken("N", 0, 0, "eraAbbr");
    addFormatToken("NN", 0, 0, "eraAbbr");
    addFormatToken("NNN", 0, 0, "eraAbbr");
    addFormatToken("NNNN", 0, 0, "eraName");
    addFormatToken("NNNNN", 0, 0, "eraNarrow");
    addFormatToken("y", ["y", 1], "yo", "eraYear");
    addFormatToken("y", ["yy", 2], 0, "eraYear");
    addFormatToken("y", ["yyy", 3], 0, "eraYear");
    addFormatToken("y", ["yyyy", 4], 0, "eraYear");
    addRegexToken("N", matchEraAbbr);
    addRegexToken("NN", matchEraAbbr);
    addRegexToken("NNN", matchEraAbbr);
    addRegexToken("NNNN", matchEraName);
    addRegexToken("NNNNN", matchEraNarrow);
    addParseToken(
      ["N", "NN", "NNN", "NNNN", "NNNNN"],
      function (input, array, config, token2) {
        var era = config._locale.erasParse(input, token2, config._strict);
        if (era) {
          getParsingFlags(config).era = era;
        } else {
          getParsingFlags(config).invalidEra = input;
        }
      }
    );
    addRegexToken("y", matchUnsigned);
    addRegexToken("yy", matchUnsigned);
    addRegexToken("yyy", matchUnsigned);
    addRegexToken("yyyy", matchUnsigned);
    addRegexToken("yo", matchEraYearOrdinal);
    addParseToken(["y", "yy", "yyy", "yyyy"], YEAR);
    addParseToken(["yo"], function (input, array, config, token2) {
      var match;
      if (config._locale._eraYearOrdinalRegex) {
        match = input.match(config._locale._eraYearOrdinalRegex);
      }
      if (config._locale.eraYearOrdinalParse) {
        array[YEAR] = config._locale.eraYearOrdinalParse(input, match);
      } else {
        array[YEAR] = parseInt(input, 10);
      }
    });
    function localeEras(m, format2) {
      var i,
        l,
        date,
        eras = this._eras || getLocale("en")._eras;
      for (i = 0, l = eras.length; i < l; ++i) {
        switch (typeof eras[i].since) {
          case "string":
            date = hooks(eras[i].since).startOf("day");
            eras[i].since = date.valueOf();
            break;
        }
        switch (typeof eras[i].until) {
          case "undefined":
            eras[i].until = Infinity;
            break;
          case "string":
            date = hooks(eras[i].until).startOf("day").valueOf();
            eras[i].until = date.valueOf();
            break;
        }
      }
      return eras;
    }
    function localeErasParse(eraName, format2, strict) {
      var i,
        l,
        eras = this.eras(),
        name,
        abbr,
        narrow;
      eraName = eraName.toUpperCase();
      for (i = 0, l = eras.length; i < l; ++i) {
        name = eras[i].name.toUpperCase();
        abbr = eras[i].abbr.toUpperCase();
        narrow = eras[i].narrow.toUpperCase();
        if (strict) {
          switch (format2) {
            case "N":
            case "NN":
            case "NNN":
              if (abbr === eraName) {
                return eras[i];
              }
              break;
            case "NNNN":
              if (name === eraName) {
                return eras[i];
              }
              break;
            case "NNNNN":
              if (narrow === eraName) {
                return eras[i];
              }
              break;
          }
        } else if ([name, abbr, narrow].indexOf(eraName) >= 0) {
          return eras[i];
        }
      }
    }
    function localeErasConvertYear(era, year) {
      var dir = era.since <= era.until ? 1 : -1;
      if (year === void 0) {
        return hooks(era.since).year();
      } else {
        return hooks(era.since).year() + (year - era.offset) * dir;
      }
    }
    function getEraName() {
      var i,
        l,
        val,
        eras = this.localeData().eras();
      for (i = 0, l = eras.length; i < l; ++i) {
        val = this.clone().startOf("day").valueOf();
        if (eras[i].since <= val && val <= eras[i].until) {
          return eras[i].name;
        }
        if (eras[i].until <= val && val <= eras[i].since) {
          return eras[i].name;
        }
      }
      return "";
    }
    function getEraNarrow() {
      var i,
        l,
        val,
        eras = this.localeData().eras();
      for (i = 0, l = eras.length; i < l; ++i) {
        val = this.clone().startOf("day").valueOf();
        if (eras[i].since <= val && val <= eras[i].until) {
          return eras[i].narrow;
        }
        if (eras[i].until <= val && val <= eras[i].since) {
          return eras[i].narrow;
        }
      }
      return "";
    }
    function getEraAbbr() {
      var i,
        l,
        val,
        eras = this.localeData().eras();
      for (i = 0, l = eras.length; i < l; ++i) {
        val = this.clone().startOf("day").valueOf();
        if (eras[i].since <= val && val <= eras[i].until) {
          return eras[i].abbr;
        }
        if (eras[i].until <= val && val <= eras[i].since) {
          return eras[i].abbr;
        }
      }
      return "";
    }
    function getEraYear() {
      var i,
        l,
        dir,
        val,
        eras = this.localeData().eras();
      for (i = 0, l = eras.length; i < l; ++i) {
        dir = eras[i].since <= eras[i].until ? 1 : -1;
        val = this.clone().startOf("day").valueOf();
        if (
          (eras[i].since <= val && val <= eras[i].until) ||
          (eras[i].until <= val && val <= eras[i].since)
        ) {
          return (
            (this.year() - hooks(eras[i].since).year()) * dir + eras[i].offset
          );
        }
      }
      return this.year();
    }
    function erasNameRegex(isStrict) {
      if (!hasOwnProp(this, "_erasNameRegex")) {
        computeErasParse.call(this);
      }
      return isStrict ? this._erasNameRegex : this._erasRegex;
    }
    function erasAbbrRegex(isStrict) {
      if (!hasOwnProp(this, "_erasAbbrRegex")) {
        computeErasParse.call(this);
      }
      return isStrict ? this._erasAbbrRegex : this._erasRegex;
    }
    function erasNarrowRegex(isStrict) {
      if (!hasOwnProp(this, "_erasNarrowRegex")) {
        computeErasParse.call(this);
      }
      return isStrict ? this._erasNarrowRegex : this._erasRegex;
    }
    function matchEraAbbr(isStrict, locale2) {
      return locale2.erasAbbrRegex(isStrict);
    }
    function matchEraName(isStrict, locale2) {
      return locale2.erasNameRegex(isStrict);
    }
    function matchEraNarrow(isStrict, locale2) {
      return locale2.erasNarrowRegex(isStrict);
    }
    function matchEraYearOrdinal(isStrict, locale2) {
      return locale2._eraYearOrdinalRegex || matchUnsigned;
    }
    function computeErasParse() {
      var abbrPieces = [],
        namePieces = [],
        narrowPieces = [],
        mixedPieces = [],
        i,
        l,
        erasName,
        erasAbbr,
        erasNarrow,
        eras = this.eras();
      for (i = 0, l = eras.length; i < l; ++i) {
        erasName = regexEscape(eras[i].name);
        erasAbbr = regexEscape(eras[i].abbr);
        erasNarrow = regexEscape(eras[i].narrow);
        namePieces.push(erasName);
        abbrPieces.push(erasAbbr);
        narrowPieces.push(erasNarrow);
        mixedPieces.push(erasName);
        mixedPieces.push(erasAbbr);
        mixedPieces.push(erasNarrow);
      }
      this._erasRegex = new RegExp("^(" + mixedPieces.join("|") + ")", "i");
      this._erasNameRegex = new RegExp("^(" + namePieces.join("|") + ")", "i");
      this._erasAbbrRegex = new RegExp("^(" + abbrPieces.join("|") + ")", "i");
      this._erasNarrowRegex = new RegExp(
        "^(" + narrowPieces.join("|") + ")",
        "i"
      );
    }
    addFormatToken(0, ["gg", 2], 0, function () {
      return this.weekYear() % 100;
    });
    addFormatToken(0, ["GG", 2], 0, function () {
      return this.isoWeekYear() % 100;
    });
    function addWeekYearFormatToken(token2, getter) {
      addFormatToken(0, [token2, token2.length], 0, getter);
    }
    addWeekYearFormatToken("gggg", "weekYear");
    addWeekYearFormatToken("ggggg", "weekYear");
    addWeekYearFormatToken("GGGG", "isoWeekYear");
    addWeekYearFormatToken("GGGGG", "isoWeekYear");
    addRegexToken("G", matchSigned);
    addRegexToken("g", matchSigned);
    addRegexToken("GG", match1to2, match2);
    addRegexToken("gg", match1to2, match2);
    addRegexToken("GGGG", match1to4, match4);
    addRegexToken("gggg", match1to4, match4);
    addRegexToken("GGGGG", match1to6, match6);
    addRegexToken("ggggg", match1to6, match6);
    addWeekParseToken(
      ["gggg", "ggggg", "GGGG", "GGGGG"],
      function (input, week, config, token2) {
        week[token2.substr(0, 2)] = toInt(input);
      }
    );
    addWeekParseToken(["gg", "GG"], function (input, week, config, token2) {
      week[token2] = hooks.parseTwoDigitYear(input);
    });
    function getSetWeekYear(input) {
      return getSetWeekYearHelper.call(
        this,
        input,
        this.week(),
        this.weekday() + this.localeData()._week.dow,
        this.localeData()._week.dow,
        this.localeData()._week.doy
      );
    }
    function getSetISOWeekYear(input) {
      return getSetWeekYearHelper.call(
        this,
        input,
        this.isoWeek(),
        this.isoWeekday(),
        1,
        4
      );
    }
    function getISOWeeksInYear() {
      return weeksInYear(this.year(), 1, 4);
    }
    function getISOWeeksInISOWeekYear() {
      return weeksInYear(this.isoWeekYear(), 1, 4);
    }
    function getWeeksInYear() {
      var weekInfo = this.localeData()._week;
      return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }
    function getWeeksInWeekYear() {
      var weekInfo = this.localeData()._week;
      return weeksInYear(this.weekYear(), weekInfo.dow, weekInfo.doy);
    }
    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
      var weeksTarget;
      if (input == null) {
        return weekOfYear(this, dow, doy).year;
      } else {
        weeksTarget = weeksInYear(input, dow, doy);
        if (week > weeksTarget) {
          week = weeksTarget;
        }
        return setWeekAll.call(this, input, week, weekday, dow, doy);
      }
    }
    function setWeekAll(weekYear, week, weekday, dow, doy) {
      var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
        date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);
      this.year(date.getUTCFullYear());
      this.month(date.getUTCMonth());
      this.date(date.getUTCDate());
      return this;
    }
    addFormatToken("Q", 0, "Qo", "quarter");
    addRegexToken("Q", match1);
    addParseToken("Q", function (input, array) {
      array[MONTH] = (toInt(input) - 1) * 3;
    });
    function getSetQuarter(input) {
      return input == null
        ? Math.ceil((this.month() + 1) / 3)
        : this.month((input - 1) * 3 + (this.month() % 3));
    }
    addFormatToken("D", ["DD", 2], "Do", "date");
    addRegexToken("D", match1to2, match1to2NoLeadingZero);
    addRegexToken("DD", match1to2, match2);
    addRegexToken("Do", function (isStrict, locale2) {
      return isStrict
        ? locale2._dayOfMonthOrdinalParse || locale2._ordinalParse
        : locale2._dayOfMonthOrdinalParseLenient;
    });
    addParseToken(["D", "DD"], DATE);
    addParseToken("Do", function (input, array) {
      array[DATE] = toInt(input.match(match1to2)[0]);
    });
    var getSetDayOfMonth = makeGetSet("Date", true);
    addFormatToken("DDD", ["DDDD", 3], "DDDo", "dayOfYear");
    addRegexToken("DDD", match1to3);
    addRegexToken("DDDD", match3);
    addParseToken(["DDD", "DDDD"], function (input, array, config) {
      config._dayOfYear = toInt(input);
    });
    function getSetDayOfYear(input) {
      var dayOfYear =
        Math.round(
          (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
        ) + 1;
      return input == null ? dayOfYear : this.add(input - dayOfYear, "d");
    }
    addFormatToken("m", ["mm", 2], 0, "minute");
    addRegexToken("m", match1to2, match1to2HasZero);
    addRegexToken("mm", match1to2, match2);
    addParseToken(["m", "mm"], MINUTE);
    var getSetMinute = makeGetSet("Minutes", false);
    addFormatToken("s", ["ss", 2], 0, "second");
    addRegexToken("s", match1to2, match1to2HasZero);
    addRegexToken("ss", match1to2, match2);
    addParseToken(["s", "ss"], SECOND);
    var getSetSecond = makeGetSet("Seconds", false);
    addFormatToken("S", 0, 0, function () {
      return ~~(this.millisecond() / 100);
    });
    addFormatToken(0, ["SS", 2], 0, function () {
      return ~~(this.millisecond() / 10);
    });
    addFormatToken(0, ["SSS", 3], 0, "millisecond");
    addFormatToken(0, ["SSSS", 4], 0, function () {
      return this.millisecond() * 10;
    });
    addFormatToken(0, ["SSSSS", 5], 0, function () {
      return this.millisecond() * 100;
    });
    addFormatToken(0, ["SSSSSS", 6], 0, function () {
      return this.millisecond() * 1e3;
    });
    addFormatToken(0, ["SSSSSSS", 7], 0, function () {
      return this.millisecond() * 1e4;
    });
    addFormatToken(0, ["SSSSSSSS", 8], 0, function () {
      return this.millisecond() * 1e5;
    });
    addFormatToken(0, ["SSSSSSSSS", 9], 0, function () {
      return this.millisecond() * 1e6;
    });
    addRegexToken("S", match1to3, match1);
    addRegexToken("SS", match1to3, match2);
    addRegexToken("SSS", match1to3, match3);
    var token, getSetMillisecond;
    for (token = "SSSS"; token.length <= 9; token += "S") {
      addRegexToken(token, matchUnsigned);
    }
    function parseMs(input, array) {
      array[MILLISECOND] = toInt(("0." + input) * 1e3);
    }
    for (token = "S"; token.length <= 9; token += "S") {
      addParseToken(token, parseMs);
    }
    getSetMillisecond = makeGetSet("Milliseconds", false);
    addFormatToken("z", 0, 0, "zoneAbbr");
    addFormatToken("zz", 0, 0, "zoneName");
    function getZoneAbbr() {
      return this._isUTC ? "UTC" : "";
    }
    function getZoneName() {
      return this._isUTC ? "Coordinated Universal Time" : "";
    }
    var proto = Moment.prototype;
    proto.add = add;
    proto.calendar = calendar$1;
    proto.clone = clone;
    proto.diff = diff;
    proto.endOf = endOf;
    proto.format = format;
    proto.from = from;
    proto.fromNow = fromNow;
    proto.to = to;
    proto.toNow = toNow;
    proto.get = stringGet;
    proto.invalidAt = invalidAt;
    proto.isAfter = isAfter;
    proto.isBefore = isBefore;
    proto.isBetween = isBetween;
    proto.isSame = isSame;
    proto.isSameOrAfter = isSameOrAfter;
    proto.isSameOrBefore = isSameOrBefore;
    proto.isValid = isValid$2;
    proto.lang = lang;
    proto.locale = locale;
    proto.localeData = localeData;
    proto.max = prototypeMax;
    proto.min = prototypeMin;
    proto.parsingFlags = parsingFlags;
    proto.set = stringSet;
    proto.startOf = startOf;
    proto.subtract = subtract;
    proto.toArray = toArray;
    proto.toObject = toObject;
    proto.toDate = toDate;
    proto.toISOString = toISOString;
    proto.inspect = inspect;
    if (typeof Symbol !== "undefined" && Symbol.for != null) {
      proto[Symbol.for("nodejs.util.inspect.custom")] = function () {
        return "Moment<" + this.format() + ">";
      };
    }
    proto.toJSON = toJSON;
    proto.toString = toString;
    proto.unix = unix;
    proto.valueOf = valueOf;
    proto.creationData = creationData;
    proto.eraName = getEraName;
    proto.eraNarrow = getEraNarrow;
    proto.eraAbbr = getEraAbbr;
    proto.eraYear = getEraYear;
    proto.year = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week = proto.weeks = getSetWeek;
    proto.isoWeek = proto.isoWeeks = getSetISOWeek;
    proto.weeksInYear = getWeeksInYear;
    proto.weeksInWeekYear = getWeeksInWeekYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.isoWeeksInISOWeekYear = getISOWeeksInISOWeekYear;
    proto.date = getSetDayOfMonth;
    proto.day = proto.days = getSetDayOfWeek;
    proto.weekday = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset = getSetOffset;
    proto.utc = setOffsetToUTC;
    proto.local = setOffsetToLocal;
    proto.parseZone = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST = isDaylightSavingTime;
    proto.isLocal = isLocal;
    proto.isUtcOffset = isUtcOffset;
    proto.isUtc = isUtc;
    proto.isUTC = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates = deprecate(
      "dates accessor is deprecated. Use date instead.",
      getSetDayOfMonth
    );
    proto.months = deprecate(
      "months accessor is deprecated. Use month instead",
      getSetMonth
    );
    proto.years = deprecate(
      "years accessor is deprecated. Use year instead",
      getSetYear
    );
    proto.zone = deprecate(
      "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
      getSetZone
    );
    proto.isDSTShifted = deprecate(
      "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
      isDaylightSavingTimeShifted
    );
    function createUnix(input) {
      return createLocal(input * 1e3);
    }
    function createInZone() {
      return createLocal.apply(null, arguments).parseZone();
    }
    function preParsePostFormat(string) {
      return string;
    }
    var proto$1 = Locale.prototype;
    proto$1.calendar = calendar;
    proto$1.longDateFormat = longDateFormat;
    proto$1.invalidDate = invalidDate;
    proto$1.ordinal = ordinal;
    proto$1.preparse = preParsePostFormat;
    proto$1.postformat = preParsePostFormat;
    proto$1.relativeTime = relativeTime;
    proto$1.pastFuture = pastFuture;
    proto$1.set = set;
    proto$1.eras = localeEras;
    proto$1.erasParse = localeErasParse;
    proto$1.erasConvertYear = localeErasConvertYear;
    proto$1.erasAbbrRegex = erasAbbrRegex;
    proto$1.erasNameRegex = erasNameRegex;
    proto$1.erasNarrowRegex = erasNarrowRegex;
    proto$1.months = localeMonths;
    proto$1.monthsShort = localeMonthsShort;
    proto$1.monthsParse = localeMonthsParse;
    proto$1.monthsRegex = monthsRegex;
    proto$1.monthsShortRegex = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;
    proto$1.weekdays = localeWeekdays;
    proto$1.weekdaysMin = localeWeekdaysMin;
    proto$1.weekdaysShort = localeWeekdaysShort;
    proto$1.weekdaysParse = localeWeekdaysParse;
    proto$1.weekdaysRegex = weekdaysRegex;
    proto$1.weekdaysShortRegex = weekdaysShortRegex;
    proto$1.weekdaysMinRegex = weekdaysMinRegex;
    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;
    function get$1(format2, index, field, setter) {
      var locale2 = getLocale(),
        utc = createUTC().set(setter, index);
      return locale2[field](utc, format2);
    }
    function listMonthsImpl(format2, index, field) {
      if (isNumber(format2)) {
        index = format2;
        format2 = void 0;
      }
      format2 = format2 || "";
      if (index != null) {
        return get$1(format2, index, field, "month");
      }
      var i,
        out = [];
      for (i = 0; i < 12; i++) {
        out[i] = get$1(format2, i, field, "month");
      }
      return out;
    }
    function listWeekdaysImpl(localeSorted, format2, index, field) {
      if (typeof localeSorted === "boolean") {
        if (isNumber(format2)) {
          index = format2;
          format2 = void 0;
        }
        format2 = format2 || "";
      } else {
        format2 = localeSorted;
        index = format2;
        localeSorted = false;
        if (isNumber(format2)) {
          index = format2;
          format2 = void 0;
        }
        format2 = format2 || "";
      }
      var locale2 = getLocale(),
        shift = localeSorted ? locale2._week.dow : 0,
        i,
        out = [];
      if (index != null) {
        return get$1(format2, (index + shift) % 7, field, "day");
      }
      for (i = 0; i < 7; i++) {
        out[i] = get$1(format2, (i + shift) % 7, field, "day");
      }
      return out;
    }
    function listMonths(format2, index) {
      return listMonthsImpl(format2, index, "months");
    }
    function listMonthsShort(format2, index) {
      return listMonthsImpl(format2, index, "monthsShort");
    }
    function listWeekdays(localeSorted, format2, index) {
      return listWeekdaysImpl(localeSorted, format2, index, "weekdays");
    }
    function listWeekdaysShort(localeSorted, format2, index) {
      return listWeekdaysImpl(localeSorted, format2, index, "weekdaysShort");
    }
    function listWeekdaysMin(localeSorted, format2, index) {
      return listWeekdaysImpl(localeSorted, format2, index, "weekdaysMin");
    }
    getSetGlobalLocale("en", {
      eras: [
        {
          since: "0001-01-01",
          until: Infinity,
          offset: 1,
          name: "Anno Domini",
          narrow: "AD",
          abbr: "AD",
        },
        {
          since: "0000-12-31",
          until: -Infinity,
          offset: 1,
          name: "Before Christ",
          narrow: "BC",
          abbr: "BC",
        },
      ],
      dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
      ordinal: function (number) {
        var b2 = number % 10,
          output =
            toInt((number % 100) / 10) === 1
              ? "th"
              : b2 === 1
                ? "st"
                : b2 === 2
                  ? "nd"
                  : b2 === 3
                    ? "rd"
                    : "th";
        return number + output;
      },
    });
    hooks.lang = deprecate(
      "moment.lang is deprecated. Use moment.locale instead.",
      getSetGlobalLocale
    );
    hooks.langData = deprecate(
      "moment.langData is deprecated. Use moment.localeData instead.",
      getLocale
    );
    var mathAbs = Math.abs;
    function abs() {
      var data = this._data;
      this._milliseconds = mathAbs(this._milliseconds);
      this._days = mathAbs(this._days);
      this._months = mathAbs(this._months);
      data.milliseconds = mathAbs(data.milliseconds);
      data.seconds = mathAbs(data.seconds);
      data.minutes = mathAbs(data.minutes);
      data.hours = mathAbs(data.hours);
      data.months = mathAbs(data.months);
      data.years = mathAbs(data.years);
      return this;
    }
    function addSubtract$1(duration, input, value, direction) {
      var other = createDuration(input, value);
      duration._milliseconds += direction * other._milliseconds;
      duration._days += direction * other._days;
      duration._months += direction * other._months;
      return duration._bubble();
    }
    function add$1(input, value) {
      return addSubtract$1(this, input, value, 1);
    }
    function subtract$1(input, value) {
      return addSubtract$1(this, input, value, -1);
    }
    function absCeil(number) {
      if (number < 0) {
        return Math.floor(number);
      } else {
        return Math.ceil(number);
      }
    }
    function bubble() {
      var milliseconds2 = this._milliseconds,
        days2 = this._days,
        months2 = this._months,
        data = this._data,
        seconds2,
        minutes2,
        hours2,
        years2,
        monthsFromDays;
      if (
        !(
          (milliseconds2 >= 0 && days2 >= 0 && months2 >= 0) ||
          (milliseconds2 <= 0 && days2 <= 0 && months2 <= 0)
        )
      ) {
        milliseconds2 += absCeil(monthsToDays(months2) + days2) * 864e5;
        days2 = 0;
        months2 = 0;
      }
      data.milliseconds = milliseconds2 % 1e3;
      seconds2 = absFloor(milliseconds2 / 1e3);
      data.seconds = seconds2 % 60;
      minutes2 = absFloor(seconds2 / 60);
      data.minutes = minutes2 % 60;
      hours2 = absFloor(minutes2 / 60);
      data.hours = hours2 % 24;
      days2 += absFloor(hours2 / 24);
      monthsFromDays = absFloor(daysToMonths(days2));
      months2 += monthsFromDays;
      days2 -= absCeil(monthsToDays(monthsFromDays));
      years2 = absFloor(months2 / 12);
      months2 %= 12;
      data.days = days2;
      data.months = months2;
      data.years = years2;
      return this;
    }
    function daysToMonths(days2) {
      return (days2 * 4800) / 146097;
    }
    function monthsToDays(months2) {
      return (months2 * 146097) / 4800;
    }
    function as(units) {
      if (!this.isValid()) {
        return NaN;
      }
      var days2,
        months2,
        milliseconds2 = this._milliseconds;
      units = normalizeUnits(units);
      if (units === "month" || units === "quarter" || units === "year") {
        days2 = this._days + milliseconds2 / 864e5;
        months2 = this._months + daysToMonths(days2);
        switch (units) {
          case "month":
            return months2;
          case "quarter":
            return months2 / 3;
          case "year":
            return months2 / 12;
        }
      } else {
        days2 = this._days + Math.round(monthsToDays(this._months));
        switch (units) {
          case "week":
            return days2 / 7 + milliseconds2 / 6048e5;
          case "day":
            return days2 + milliseconds2 / 864e5;
          case "hour":
            return days2 * 24 + milliseconds2 / 36e5;
          case "minute":
            return days2 * 1440 + milliseconds2 / 6e4;
          case "second":
            return days2 * 86400 + milliseconds2 / 1e3;
          case "millisecond":
            return Math.floor(days2 * 864e5) + milliseconds2;
          default:
            throw new Error("Unknown unit " + units);
        }
      }
    }
    function makeAs(alias) {
      return function () {
        return this.as(alias);
      };
    }
    var asMilliseconds = makeAs("ms"),
      asSeconds = makeAs("s"),
      asMinutes = makeAs("m"),
      asHours = makeAs("h"),
      asDays = makeAs("d"),
      asWeeks = makeAs("w"),
      asMonths = makeAs("M"),
      asQuarters = makeAs("Q"),
      asYears = makeAs("y"),
      valueOf$1 = asMilliseconds;
    function clone$1() {
      return createDuration(this);
    }
    function get$2(units) {
      units = normalizeUnits(units);
      return this.isValid() ? this[units + "s"]() : NaN;
    }
    function makeGetter(name) {
      return function () {
        return this.isValid() ? this._data[name] : NaN;
      };
    }
    var milliseconds = makeGetter("milliseconds"),
      seconds = makeGetter("seconds"),
      minutes = makeGetter("minutes"),
      hours = makeGetter("hours"),
      days = makeGetter("days"),
      months = makeGetter("months"),
      years = makeGetter("years");
    function weeks() {
      return absFloor(this.days() / 7);
    }
    var round = Math.round,
      thresholds = {
        ss: 44,
        // a few seconds to seconds
        s: 45,
        // seconds to minute
        m: 45,
        // minutes to hour
        h: 22,
        // hours to day
        d: 26,
        // days to month/week
        w: null,
        // weeks to month
        M: 11,
        // months to year
      };
    function substituteTimeAgo(
      string,
      number,
      withoutSuffix,
      isFuture,
      locale2
    ) {
      return locale2.relativeTime(
        number || 1,
        !!withoutSuffix,
        string,
        isFuture
      );
    }
    function relativeTime$1(
      posNegDuration,
      withoutSuffix,
      thresholds2,
      locale2
    ) {
      var duration = createDuration(posNegDuration).abs(),
        seconds2 = round(duration.as("s")),
        minutes2 = round(duration.as("m")),
        hours2 = round(duration.as("h")),
        days2 = round(duration.as("d")),
        months2 = round(duration.as("M")),
        weeks2 = round(duration.as("w")),
        years2 = round(duration.as("y")),
        a =
          (seconds2 <= thresholds2.ss && ["s", seconds2]) ||
          (seconds2 < thresholds2.s && ["ss", seconds2]) ||
          (minutes2 <= 1 && ["m"]) ||
          (minutes2 < thresholds2.m && ["mm", minutes2]) ||
          (hours2 <= 1 && ["h"]) ||
          (hours2 < thresholds2.h && ["hh", hours2]) ||
          (days2 <= 1 && ["d"]) ||
          (days2 < thresholds2.d && ["dd", days2]);
      if (thresholds2.w != null) {
        a =
          a ||
          (weeks2 <= 1 && ["w"]) ||
          (weeks2 < thresholds2.w && ["ww", weeks2]);
      }
      a = a ||
        (months2 <= 1 && ["M"]) ||
        (months2 < thresholds2.M && ["MM", months2]) ||
        (years2 <= 1 && ["y"]) || ["yy", years2];
      a[2] = withoutSuffix;
      a[3] = +posNegDuration > 0;
      a[4] = locale2;
      return substituteTimeAgo.apply(null, a);
    }
    function getSetRelativeTimeRounding(roundingFunction) {
      if (roundingFunction === void 0) {
        return round;
      }
      if (typeof roundingFunction === "function") {
        round = roundingFunction;
        return true;
      }
      return false;
    }
    function getSetRelativeTimeThreshold(threshold, limit) {
      if (thresholds[threshold] === void 0) {
        return false;
      }
      if (limit === void 0) {
        return thresholds[threshold];
      }
      thresholds[threshold] = limit;
      if (threshold === "s") {
        thresholds.ss = limit - 1;
      }
      return true;
    }
    function humanize(argWithSuffix, argThresholds) {
      if (!this.isValid()) {
        return this.localeData().invalidDate();
      }
      var withSuffix = false,
        th = thresholds,
        locale2,
        output;
      if (typeof argWithSuffix === "object") {
        argThresholds = argWithSuffix;
        argWithSuffix = false;
      }
      if (typeof argWithSuffix === "boolean") {
        withSuffix = argWithSuffix;
      }
      if (typeof argThresholds === "object") {
        th = Object.assign({}, thresholds, argThresholds);
        if (argThresholds.s != null && argThresholds.ss == null) {
          th.ss = argThresholds.s - 1;
        }
      }
      locale2 = this.localeData();
      output = relativeTime$1(this, !withSuffix, th, locale2);
      if (withSuffix) {
        output = locale2.pastFuture(+this, output);
      }
      return locale2.postformat(output);
    }
    var abs$1 = Math.abs;
    function sign(x) {
      return (x > 0) - (x < 0) || +x;
    }
    function toISOString$1() {
      if (!this.isValid()) {
        return this.localeData().invalidDate();
      }
      var seconds2 = abs$1(this._milliseconds) / 1e3,
        days2 = abs$1(this._days),
        months2 = abs$1(this._months),
        minutes2,
        hours2,
        years2,
        s,
        total = this.asSeconds(),
        totalSign,
        ymSign,
        daysSign,
        hmsSign;
      if (!total) {
        return "P0D";
      }
      minutes2 = absFloor(seconds2 / 60);
      hours2 = absFloor(minutes2 / 60);
      seconds2 %= 60;
      minutes2 %= 60;
      years2 = absFloor(months2 / 12);
      months2 %= 12;
      s = seconds2 ? seconds2.toFixed(3).replace(/\.?0+$/, "") : "";
      totalSign = total < 0 ? "-" : "";
      ymSign = sign(this._months) !== sign(total) ? "-" : "";
      daysSign = sign(this._days) !== sign(total) ? "-" : "";
      hmsSign = sign(this._milliseconds) !== sign(total) ? "-" : "";
      return (
        totalSign +
        "P" +
        (years2 ? ymSign + years2 + "Y" : "") +
        (months2 ? ymSign + months2 + "M" : "") +
        (days2 ? daysSign + days2 + "D" : "") +
        (hours2 || minutes2 || seconds2 ? "T" : "") +
        (hours2 ? hmsSign + hours2 + "H" : "") +
        (minutes2 ? hmsSign + minutes2 + "M" : "") +
        (seconds2 ? hmsSign + s + "S" : "")
      );
    }
    var proto$2 = Duration.prototype;
    proto$2.isValid = isValid$1;
    proto$2.abs = abs;
    proto$2.add = add$1;
    proto$2.subtract = subtract$1;
    proto$2.as = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds = asSeconds;
    proto$2.asMinutes = asMinutes;
    proto$2.asHours = asHours;
    proto$2.asDays = asDays;
    proto$2.asWeeks = asWeeks;
    proto$2.asMonths = asMonths;
    proto$2.asQuarters = asQuarters;
    proto$2.asYears = asYears;
    proto$2.valueOf = valueOf$1;
    proto$2._bubble = bubble;
    proto$2.clone = clone$1;
    proto$2.get = get$2;
    proto$2.milliseconds = milliseconds;
    proto$2.seconds = seconds;
    proto$2.minutes = minutes;
    proto$2.hours = hours;
    proto$2.days = days;
    proto$2.weeks = weeks;
    proto$2.months = months;
    proto$2.years = years;
    proto$2.humanize = humanize;
    proto$2.toISOString = toISOString$1;
    proto$2.toString = toISOString$1;
    proto$2.toJSON = toISOString$1;
    proto$2.locale = locale;
    proto$2.localeData = localeData;
    proto$2.toIsoString = deprecate(
      "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
      toISOString$1
    );
    proto$2.lang = lang;
    addFormatToken("X", 0, 0, "unix");
    addFormatToken("x", 0, 0, "valueOf");
    addRegexToken("x", matchSigned);
    addRegexToken("X", matchTimestamp);
    addParseToken("X", function (input, array, config) {
      config._d = new Date(parseFloat(input) * 1e3);
    });
    addParseToken("x", function (input, array, config) {
      config._d = new Date(toInt(input));
    });
    //! moment.js
    hooks.version = "2.30.1";
    setHookCallback(createLocal);
    hooks.fn = proto;
    hooks.min = min;
    hooks.max = max;
    hooks.now = now;
    hooks.utc = createUTC;
    hooks.unix = createUnix;
    hooks.months = listMonths;
    hooks.isDate = isDate;
    hooks.locale = getSetGlobalLocale;
    hooks.invalid = createInvalid;
    hooks.duration = createDuration;
    hooks.isMoment = isMoment;
    hooks.weekdays = listWeekdays;
    hooks.parseZone = createInZone;
    hooks.localeData = getLocale;
    hooks.isDuration = isDuration;
    hooks.monthsShort = listMonthsShort;
    hooks.weekdaysMin = listWeekdaysMin;
    hooks.defineLocale = defineLocale;
    hooks.updateLocale = updateLocale;
    hooks.locales = listLocales;
    hooks.weekdaysShort = listWeekdaysShort;
    hooks.normalizeUnits = normalizeUnits;
    hooks.relativeTimeRounding = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat = getCalendarFormat;
    hooks.prototype = proto;
    hooks.HTML5_FMT = {
      DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
      // <input type="datetime-local" />
      DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
      // <input type="datetime-local" step="1" />
      DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
      // <input type="datetime-local" step="0.001" />
      DATE: "YYYY-MM-DD",
      // <input type="date" />
      TIME: "HH:mm",
      // <input type="time" />
      TIME_SECONDS: "HH:mm:ss",
      // <input type="time" step="1" />
      TIME_MS: "HH:mm:ss.SSS",
      // <input type="time" step="0.001" />
      WEEK: "GGGG-[W]WW",
      // <input type="week" />
      MONTH: "YYYY-MM",
      // <input type="month" />
    };
    function validaCep(cep) {
      cep.addEventListener("input", (ev) => {
        let digits = ev.target.value.match(/\d/g);
        if (digits === null) {
          ev.target.value = "";
          return;
        }
        let newVal = "";
        for (let i = 0; i < (digits.length > 8 ? 8 : digits.length); i++) {
          if (i == 5) {
            newVal += "-";
          }
          newVal += digits[i];
        }
        ev.target.value = newVal;
        if (newVal.length === 9) {
          cep.setCustomValidity("");
        } else {
          cep.setCustomValidity("Campo inválido");
        }
      });
    }
    function maskCPF(cpf) {
      cpf = cpf.replace(/\D/g, "");
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
      cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
      cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      return cpf;
    }
    function formatDateInput(input) {
      input.addEventListener("input", (e) => {
        let v = input.value.replaceAll(/\D/g, "");
        if (v.length > 8) v = v.substring(0, 8);
        let date = "";
        for (let i = 0; i < v.length; i++) {
          const c = v[i];
          if (i == 2 || i == 4) {
            date += "/";
            date += c;
          } else {
            date += c;
          }
        }
        input.value = date;
        var newDate = hooks(date, "DD/MM/YYYY");
        if (newDate.isValid() && v.length == 8) {
          this.setDate();
          this.clearTBody();
          this.renderCalendar();
        }
      });
      input.addEventListener("focusout", (e) => {
        const d = input.value;
        const n = d.replaceAll(/\D/g, "");
        if (n.length === 6) {
          const year = parseInt(n.substring(4, 6));
          let century;
          if (year > 50) {
            century = "19";
          } else {
            century = "20";
          }
          input.value = d.substring(0, 6) + century + d.substring(6, 8);
        }
      });
    }
    function marcarFormPreenchido() {
      document.querySelectorAll("input.cep:not(.js-running)").forEach((el) => {
        validaCep(el);
      });
      document.querySelectorAll("input.cpf:not(.js-running)").forEach((el) => {
        el.addEventListener("input", function () {
          el.value = maskCPF(el.value);
        });
      });
      document.querySelectorAll("input.money").forEach((el) => {
        inputMoney(el);
      });
      document.querySelectorAll("input.date:not(.js-running)").forEach((el) => {
        el.classList.add("js-running");
        formatDateInput(el);
      });
      document.querySelectorAll("input,textarea").forEach((element) => {
        element.addEventListener("focus", function () {
          this.closest("div").classList.add("preenchido");
        });
        element.addEventListener("input", function () {
          this.closest("div").classList.remove("error");
          if (this.dataset.error) this.setCustomValidity("");
        });
        element.addEventListener("focusout", function () {
          if (this.value.length === 0) {
            this.closest("div").classList.remove("preenchido");
          }
        });
        element.addEventListener("invalid", function oninvalid() {
          setFieldError(this);
        });
      });
      document.querySelectorAll("select").forEach((el) => {
        el.addEventListener("input", function preenchido() {
          if (this.selectedIndex >= 0) {
            this.closest("div.container-select").classList.add("preenchido");
          }
        });
        el.addEventListener("invalid", function oninvalid() {
          if (this.selectedIndex >= 0) {
            setFieldError(this, "div.container-select");
          }
        });
      });
      setTimeout(() => {
        document
          .querySelectorAll("input:-webkit-autofill,textarea:-webkit-autofill")
          .forEach((element) => {
            element.closest("div").classList.add("preenchido");
          });
      }, 1e3);
    }
    function setFieldError(field, closest = "div") {
      field.closest(closest).classList.add("error");
      field.focus();
      if (field.dataset.error) field.setCustomValidity(field.dataset.error);
    }
    function Contato() {
      let forms = document.querySelectorAll(
        ".container-contato:not(.js-running)"
      );
      forms.forEach((formContato) => {
        formContato.classList.add("js-running");
        formContato
          .querySelector("form")
          .addEventListener("submit", function (e) {
            e.preventDefault();
            formContato
              .querySelector(".feedback-contato")
              .classList.add("d-none");
            formContato.querySelector(".submit-text").innerHTML =
              VARS.contactSending;
            formContato
              .querySelector(".bt-submit")
              .classList.add("pointer-events-none");
            fetch(VARS.contactURL, {
              method: "POST",
              headers: {
                "X-CSRF-Token": document.querySelector("meta[name=csrf-token]")
                  .content,
              },
              body: new FormData(formContato.querySelector("form")),
            })
              .then(function (data) {
                if (data.ok) {
                  formContato.classList.add("feedback-sucesso");
                  formContato
                    .querySelector(".feedback-contato")
                    .classList.remove("d-none");
                  formContato.querySelector(".feedback-contato").innerHTML =
                    VARS.contactSent;
                } else {
                  formContato.querySelector(".submit-text").innerHTML =
                    VARS.contactSend;
                  formContato.querySelector(".feedback-contato").innerHTML =
                    VARS.contactError;
                  formContato
                    .querySelector(".feedback-contato")
                    .classList.remove("d-none");
                  formContato
                    .querySelector(".bt-submit")
                    .classList.remove("pointer-events-none");
                }
              })
              .catch(function (error) {
                formContato.querySelector(".submit-text").innerHTML =
                  VARS.contactSend;
                formContato.querySelector(".feedback-contato").innerHTML =
                  VARS.contactError;
                formContato
                  .querySelector(".feedback-contato")
                  .classList.remove("d-none");
                formContato
                  .querySelector(".bt-submit")
                  .classList.remove("pointer-events-none");
              });
          });
      });
    }
    function CookiesConsent() {
      const cookieContainer = document.querySelector(".container-cookies");
      const acceptBtn = cookieContainer.querySelector(".btn-cookies.accept");
      acceptBtn.addEventListener("click", function () {
        cookieDismiss();
      });
      function setCookie(name, value, days2) {
        var expires = "";
        if (days2) {
          var date = /* @__PURE__ */ new Date();
          date.setTime(date.getTime() + days2 * 24 * 60 * 60 * 1e3);
          expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
      }
      function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == " ") c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
        }
        return null;
      }
      function cookieConsent() {
        if (!getCookie("cookieDismiss")) {
          cookieContainer.classList.remove("d-none");
        }
      }
      function cookieDismiss() {
        setCookie("cookieDismiss", "1", 7);
        cookieContainer.dataset.aos = "fadeOut .4s";
        setTimeout(() => {
          cookieContainer.classList.add("d-none");
        }, 400);
      }
      window.onload = function () {
        cookieConsent();
      };
    }
    let watchList = [];
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const obj = watchList.find((item) => item.el == entry.target);
        if (obj.cb) {
          obj.cb(entry.isIntersecting, obj.el);
        } else {
          if (entry.isIntersecting) {
            if (obj.wasPlaying) {
              obj.el.play();
            }
          } else {
            if (!obj.el.paused) {
              obj.wasPlaying = true;
              obj.el.pause();
            } else {
              obj.wasPlaying = false;
            }
          }
        }
      });
    });
    // document.addEventListener("pjax:send", () => {
    //   observer.disconnect();
    //   watchList = [];
    // });
    function autoPause(element, callback) {
      let el = toElement(element);
      watchList.push({
        el,
        cb: callback,
        wasPlaying: false,
      });
      observer.observe(el);
    }
    function initVideo() {
      document
        .querySelectorAll("video[data-autoplay]:not(.js-video-running)")
        .forEach((el) => {
          el.classList.add("js-video-running");
          autoPause(el, (intersecting, el2) => {
            if (intersecting) {
              let promise = el2.play();
              if (promise !== void 0) {
                promise
                  .then((_) => { })
                  .catch((error) => {
                    if (screen.isIphone) {
                      document.body.addEventListener(
                        "touchstart",
                        function () {
                          const videosOnScreen = document.querySelectorAll(
                            "video[data-autoplay],video[data-autopause],video[autoplay]"
                          );
                          videosOnScreen.forEach((element) => {
                            if (element.playing);
                            else {
                              element.play();
                              let promise2 = element.play();
                              if (promise2 !== void 0) {
                                promise2
                                  .then((_) => { })
                                  .catch((error2) => {
                                    element.play();
                                    element.controls = true;
                                  });
                              }
                            }
                          });
                        },
                        {
                          once: true,
                        }
                      );
                    }
                  });
              }
            } else {
              el2.pause();
            }
          });
        });
      document
        .querySelectorAll("video[data-autopause]:not(.js-video-running)")
        .forEach((el) => {
          el.classList.add("js-video-running");
          autoPause(el);
        });
    }
    function viewportHeight() {
      function calcVH() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", `${vh}px`);
      }
      function calcVH2() {
        let vh2 = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh2", `${vh2}px`);
      }
      if (!screen.isDesktop) {
        calcVH();
        calcVH2();
        window.addEventListener("resize", calcVH2, { passive: true });
        window.addEventListener("orientationchange", calcVH2, {
          passive: true,
        });
        window.addEventListener("load", calcVH, { passive: true });
        window.addEventListener("load", calcVH2, { passive: true });
      }
    }
    function menuControls() {
      // document.addEventListener("pjax:complete", update);
      // update();
      // let menuLinks = document.querySelectorAll("[data-menu-close]");
      // menuLinks.forEach((element) => {
      //   element.addEventListener("click", function () {
      //     menuLinks.forEach((el) => {
      //       el.classList.remove("active");
      //     });
      //     element.addActive();
      //   });
      // });
      // function update(ev) {
      //   const willget = document.querySelectorAll("[data-pg-active]");
      //   const pg = document.body.dataset.pg;
      //   const hash = window.location.hash;
      //   willget.forEach((el) => {
      //     const pga = el.dataset.pgActive.split(" ");
      //     if (pga.includes(pg) || pga === hash) {
      //       el.addActive();
      //     } else {
      //       el.removeActive();
      //     }
      //   });
      // }
    }
    const mediaSize = {
      uhd: "only screen and (min-width: 1921px)",
      size1600: "only screen and (max-width: 1679.98px)",
      xl: "only screen and (min-width: 1200px)",
      lg: "only screen and (min-width: 1025.1px)",
      lgOnly: "only screen and (min-width: 1025.1px) and (max-width: 1366px)",
      desktop: "only screen and (min-width: 1025.1px)",
      mobile: "only screen and (max-width: 1025px)",
      tablet: "only screen and (min-width: 767.98px) and (max-width: 1025px)",
      tabletPortrait:
        "only screen and (min-width: 767.98px) and (orientation: portrait) and (max-width: 1025px)",
      tabletLandscape:
        "only screen and (min-width: 767.98px) and (orientation: landscape)  and (max-width: 1025px)",
      phonePlus: "only screen and (min-width: 768px)",
      phone: "only screen and (max-width: 767.98px)",
      size300: "only screen and (max-width: 379.98px)",
      md: "only screen and (min-width: 768px)",
      sm: "only screen and (min-width: 576px)",
      xsm: "only screen and (min-width: 380px)",
      phonePortrait:
        "only screen and (max-width: 767.98px) and (orientation: portrait) ",
      landscape:
        "only screen and (max-width: 768px) and (max-height: 550px) and (orientation: landscape) and (min-width:420px)",
      landscapeX:
        "only screen and (min-width: 768px) and (max-width: 1025px) and (max-height: 550px) and (orientation: landscape)",
      height500: "only screen and (max-height: 550px)",
      height1080: "only screen and (min-height: 1080px)",
    };
    gsapWithCSS$1.registerPlugin(
      ScrollTrigger$1,
      Power3,
      Power0,
      ScrollToPlugin,
      Back
    );
    function Parallax() {
      let parallaxes = document.querySelectorAll(
        '[data-parallax]:not(.js-running), [data-parallax-top]:not(.js-running)'
      );
      let mm = gsapWithCSS$1.matchMedia();
      window.addEventListener("orientationchange", function () {
        ScrollTrigger$1.refresh();
      });
      window.ScrollTrigger = ScrollTrigger$1;
      parallaxes.forEach((element) => {
        element.classList.add("js-running");
        let yFrom = element.dataset.translateYFrom
          ? element.dataset.translateYFrom
          : "0";
        let yTo = element.dataset.translateY ? element.dataset.translateY : "0";
        let xFrom = element.dataset.translateXFrom
          ? element.dataset.translateXFrom
          : "0";
        let xTo = element.dataset.translateX ? element.dataset.translateX : "0";
        let rotateFrom = element.dataset.rotateFrom
          ? element.dataset.rotateFrom
          : "0deg";
        let rotateTo = element.dataset.rotateTo
          ? element.dataset.rotateTo
          : "0deg";
        let scaleFrom = element.dataset.scaleFrom
          ? element.dataset.scaleFrom
          : "1";
        let scaleTo = element.dataset.scale ? element.dataset.scale : "1";
        let duration = element.dataset.duration ? element.dataset.duration : 1;
        let repeat = element.dataset.repeat ? element.dataset.repeat : 0;
        let yoyo = element.dataset.yoyo ? element.dataset.yoyo : false;
        let ease = element.dataset.ease
          ? element.dataset.ease
          : "Power0.easeInOut";
        let delay = element.dataset.delay ? element.dataset.delay : 0;
        let repeatDelay = element.dataset.repeatDelay
          ? element.dataset.repeatDelay
          : 0;
        let opacity = element.dataset.opacity ? element.dataset.opacity : 1;
        let opacityFrom = element.dataset.opacityFrom
          ? element.dataset.opacityFrom
          : 1;
        let trigger, endTrigger, start, end, markers;
        if (element.dataset.parallaxTop !== void 0) {
          trigger = element.dataset.trigger
            ? document.querySelector(element.dataset.trigger)
            : document.querySelector(".wrapper");
          endTrigger = element.dataset.endTrigger
            ? document.querySelector(element.dataset.endTrigger)
            : trigger;
          start = element.dataset.start ? element.dataset.start : "top top";
          end = element.dataset.end
            ? element.dataset.end
            : window.innerHeight + " top";
          markers = false;
        } else {
          trigger = element.dataset.trigger
            ? document.querySelector(element.dataset.trigger)
            : element;
          endTrigger = element.dataset.endTrigger
            ? document.querySelector(element.dataset.endTrigger)
            : trigger;
          start = element.dataset.start || "top bottom";
          end = element.dataset.end || "bottom top";
        }
        if (element.dataset.trigger && element.dataset.trigger == "parent")
          trigger = element.parentElement;
        let scrub =
          element.dataset.repeat && element.dataset.repeat == "-1"
            ? false
            : true;
        mm.add(`${mediaSize.phone}`, () => {
          if (
            element.dataset.parallaxNoPhone !== void 0 ||
            element.dataset.parallaxNoMobile !== void 0
          )
            return;
          if (element.dataset.phoneTranslateYFrom)
            yFrom = element.dataset.phoneTranslateYFrom;
          if (element.dataset.phoneTranslateY)
            yTo = element.dataset.phoneTranslateY;
          if (element.dataset.phoneTranslateXFrom)
            xFrom = element.dataset.phoneTranslateXFrom;
          if (element.dataset.phoneTranslateX)
            xTo = element.dataset.phoneTranslateX;
          if (element.dataset.phoneRotateFrom)
            rotateFrom = element.dataset.phoneRotateFrom;
          if (element.dataset.phoneRotateTo)
            rotateTo = element.dataset.phoneRotateTo;
          if (element.dataset.phoneScaleFrom)
            scaleFrom = element.dataset.phoneScaleFrom;
          if (element.dataset.phoneScale) scaleTo = element.dataset.phoneScale;
          if (element.dataset.phoneDuration)
            duration = element.dataset.phoneDuration;
          if (element.dataset.phoneRepeat) repeat = element.dataset.phoneRepeat;
          if (element.dataset.phoneYoyo) yoyo = element.dataset.phoneYoyo;
          if (element.dataset.phoneTrigger)
            trigger = element.dataset.phoneTrigger;
          if (element.dataset.phoneEndTrigger)
            endTrigger = element.dataset.phoneEndTrigger;
          if (element.dataset.phoneEase) ease = element.dataset.phoneEase;
          if (element.dataset.phoneDelay) delay = element.dataset.phoneDelay;
          if (element.dataset.phoneRepeatDelay)
            repeatDelay = element.dataset.phoneRepeatDelay;
          if (element.dataset.phoneOpacity)
            opacity = element.dataset.phoneOpacity;
          if (element.dataset.phoneOpacityFrom)
            opacityFrom = element.dataset.phoneOpacityFrom;
          if (element.dataset.phoneStart) start = element.dataset.phoneStart;
          if (element.dataset.phoneEnd) end = element.dataset.phoneEnd;
          if (
            element.dataset.phoneTrigger &&
            element.dataset.phoneTrigger == "parent"
          )
            trigger = element.parentElement;
          const animation = gsapWithCSS$1.timeline({
            repeat,
            // scroller:scroller,
            delay,
            repeatDelay,
            yoyo,
            scrollTrigger: {
              trigger,
              endTrigger,
              start,
              end,
              markers,
              scrub,
              anticipatePin: true,
              invalidateOnRefresh: true,
              toggleActions: "play pause play pause",
              onUpdate: function (ev) { },
            },
          });
          animation.fromTo(
            element,
            {
              y: yFrom,
              x: xFrom,
              rotate: rotateFrom,
              opacity: opacityFrom,
              scale: scaleFrom,
              force3D: true,
            },
            {
              y: yTo,
              x: xTo,
              rotate: rotateTo,
              scale: scaleTo,
              duration,
              delay: 0,
              opacity,
              ease,
            }
          );
        });
        mm.add(`${mediaSize.tablet}`, () => {
          if (
            element.dataset.parallaxNoTablet !== void 0 ||
            element.dataset.parallaxNoMobile !== void 0
          )
            return;
          if (element.dataset.tabletTranslateYFrom)
            yFrom = element.dataset.tabletTranslateYFrom;
          if (element.dataset.tabletTranslateY)
            yTo = element.dataset.tabletTranslateY;
          if (element.dataset.tabletTranslateXFrom)
            xFrom = element.dataset.tabletTranslateXFrom;
          if (element.dataset.tabletTranslateX)
            xTo = element.dataset.tabletTranslateX;
          if (element.dataset.tabletRotateFrom)
            rotateFrom = element.dataset.tabletRotateFrom;
          if (element.dataset.tabletRotateTo)
            rotateTo = element.dataset.tabletRotateTo;
          if (element.dataset.tabletScaleFrom)
            scaleFrom = element.dataset.tabletScaleFrom;
          if (element.dataset.tabletScale)
            scaleTo = element.dataset.tabletScale;
          if (element.dataset.tabletDuration)
            duration = element.dataset.tabletDuration;
          if (element.dataset.tabletRepeat)
            repeat = element.dataset.tabletRepeat;
          if (element.dataset.tabletYoyo) yoyo = element.dataset.tabletYoyo;
          if (element.dataset.tabletTrigger)
            trigger = element.dataset.tabletTrigger;
          if (element.dataset.tabletEndTrigger)
            endTrigger = element.dataset.tabletEndTrigger;
          if (element.dataset.tabletEase) ease = element.dataset.tabletEase;
          if (element.dataset.tabletDelay) delay = element.dataset.tabletDelay;
          if (element.dataset.tabletRepeatDelay)
            repeatDelay = element.dataset.tabletRepeatDelay;
          if (element.dataset.tabletOpacity)
            opacity = element.dataset.tabletOpacity;
          if (element.dataset.tabletOpacityFrom)
            opacityFrom = element.dataset.tabletOpacityFrom;
          if (element.dataset.tabletStart) start = element.dataset.tabletStart;
          if (element.dataset.tabletEnd) end = element.dataset.tabletEnd;
          if (
            element.dataset.tabletTrigger &&
            element.dataset.tabletTrigger == "parent"
          )
            trigger = element.parentElement;
          const animation = gsapWithCSS$1.timeline({
            repeat,
            // scroller:scroller,
            delay,
            repeatDelay,
            yoyo,
            scrollTrigger: {
              trigger,
              endTrigger,
              start,
              end,
              pinSpacing: false,
              //   pinReparent:true,
              markers,
              scrub,
              anticipatePin: true,
              invalidateOnRefresh: true,
              toggleActions: "play pause play pause",
              onUpdate: function (ev) { },
            },
          });
          animation.fromTo(
            element,
            {
              y: yFrom,
              x: xFrom,
              rotate: rotateFrom,
              opacity: opacityFrom,
              scale: scaleFrom,
              force3D: true,
            },
            {
              y: yTo,
              x: xTo,
              rotate: rotateTo,
              scale: scaleTo,
              duration,
              delay: 0,
              opacity,
              ease,
            }
          );
        });
        mm.add(`${mediaSize.desktop}`, () => {
          if (element.dataset.parallaxNoDesktop !== void 0) return;
          const animation = gsapWithCSS$1.timeline({
            repeat,
            // scroller:scroller,
            delay,
            repeatDelay,
            yoyo,
            scrollTrigger: {
              trigger,
              endTrigger,
              start,
              end,
              pinSpacing: false,
              //   pinReparent:true,
              markers,
              scrub,
              anticipatePin: true,
              invalidateOnRefresh: true,
              toggleActions: "play pause play pause",
              onUpdate: function (ev) { },
            },
          });
          animation.fromTo(
            element,
            {
              y: yFrom,
              x: xFrom,
              rotate: rotateFrom,
              opacity: opacityFrom,
              scale: scaleFrom,
              force3D: true,
            },
            {
              y: yTo,
              x: xTo,
              rotate: rotateTo,
              scale: scaleTo,
              duration,
              delay: 0,
              opacity,
              ease,
            }
          );
        });
      });
    }
    var gsapWithCSS = gsap$1.registerPlugin(CSSPlugin) || gsap$1;
    gsapWithCSS.core.Tween;
    gsapWithCSS.registerPlugin(ScrollToPlugin);
    function scrollTo(headerDesktop, headerMobile) {
      let scrollToArray = Array.from(
        document.querySelectorAll(
          "[data-scrollto]:not(.js-running):not(btn-modal-open)"
        )
      );
      scrollToArray.forEach((element) => {
        element.classList.add("js-running");
        element.addEventListener("click", function (ev) {
          ev.preventDefault();
          let targetId = element.dataset.scrollto;
          let header = screen.isDesktop ? headerDesktop : headerMobile;
          if (targetId === "0") {
            gsapWithCSS.to(window, {
              scrollTo: 0,
              duration: 0.8,
              ease: "power2.out",
            });
          } else {
            let targetElement = document.querySelector(`#${targetId}`);
            if (targetElement) {
              let offsetY = header
                ? document.querySelector(header).offsetHeight
                : 0;
              gsapWithCSS.to(window, {
                scrollTo: { y: targetElement, offsetY },
                duration: 0.8,
                ease: "power2.out",
              });
            } else {
              // singlePjaxInstance.loadUrl(element.dataset.href);
              // document.addEventListener(
              //   "pjax:complete",
              //   function () {
              //     let newTargetElement = document.querySelector(`#${targetId}`);
              //     if (newTargetElement) {
              //       let offsetY = header
              //         ? document.querySelector(header).offsetHeight
              //         : 0;
              //       gsapWithCSS.to(window, {
              //         scrollTo: { y: newTargetElement, offsetY },
              //         duration: 0.8,
              //         ease: "power2.out",
              //       });
              //     }
              //   },
              //   { once: true }
              // );
            }
          }
        });
      });
    }
    gsap$1.registerPlugin(ScrollToPlugin, ScrollTrigger$1, ScrollSmoother);
    window.scrollingTo = false;
    window.ScrollToGsap = ScrollToGsap;
    function ScrollToGsap(
      target,
      offset2 = 0,
      duration = 0.4,
      easeNum = 1,
      timeout = 0,
      container = window
    ) {
      let offsetY = calculateOffset(offset2);
      function ease(easing) {
        switch (easing) {
          case 1:
            return "Power3.easeInOut";
          case 2:
            return "Power3.easeOut";
          case 3:
            return "Power1.easeInOut";
          case 4:
            return "Power1.easeOut";
          case 5:
            return "Power2.easeOut";
          case 6:
            return "Power0.easeInOut";
          case 7:
            return "Power2.easeInOut";
          case 8:
            return 'CustomEase.create("custom", "M0,0 C0.212,0 0.267,-0.076 0.346,0 0.422,0.074 0.46,0.356 0.502,0.504 0.551,0.68 0.617,0.862 0.684,0.922 0.748,0.98 0.734,1.094 1,1 ");';
          case 9:
            return "Sine.easeInOut";
          default:
            return easing;
        }
      }
      let targetY = calculateScrollTop(target);
      targetY = targetY - offsetY;
      let smoother = ScrollSmoother.get();
      scrollingTo = true;
      document.body.classList.add("autoscrolling");
      if (duration == -1) smoother.scrollTop(targetY);
      setTimeout(() => {
        if (smoother && container == window) {
          gsap$1.to(smoother, {
            // don't let it go beyond the maximum scrollable area
            scrollTop: targetY,
            duration,
            onComplete: () => {
              scrollingTo = false;
              document.body.classList.remove("autoscrolling");
            },
          });
        } else {
          gsap$1.to(container, {
            duration,
            scrollTo: { y: targetY, autoKill: false },
            ease: ease(easeNum),
            onComplete: () => {
              scrollingTo = false;
              document.body.classList.remove("autoscrolling");
            },
          });
        }
      }, timeout);
    }
    function calculateOffset(offset2) {
      if (typeof offset2 === "string") {
        if (offset2.endsWith("rem")) {
          return (
            parseFloat(offset2) *
            parseFloat(getComputedStyle(document.documentElement).fontSize)
          );
        } else if (offset2.endsWith("vh")) {
          return (parseFloat(offset2) / 100) * window.innerHeight;
        } else if (offset2.match(/^\d+$/)) {
          return parseFloat(offset2);
        } else {
          return toElement(offset2).offsetHeight;
        }
      }
      return offset2;
    }
    function calculateScrollTop(offset2) {
      if (typeof offset2 === "string") {
        if (offset2.endsWith("rem")) {
          return (
            parseFloat(offset2) *
            parseFloat(getComputedStyle(document.documentElement).fontSize)
          );
        } else if (offset2.endsWith("vh")) {
          return (parseFloat(offset2) / 100) * window.innerHeight;
        } else if (offset2.match(/^\d+$/)) {
          return parseFloat(offset2);
        } else {
          return getOffsetTop(toElement(offset2));
        }
      }
      return offset2;
    }
    function getOffsetTop(element) {
      let offsetTop = 0;
      while (element) {
        offsetTop += element.offsetTop;
        element = element.offsetParent;
      }
      return offsetTop;
    }
    function accordionGsap(list, toggle = true) {
      let isAnimating = false;

      if (!list)
        list = document;
      let toggleItems = list.querySelectorAll(":scope > .accordion-item");
      toggleItems = Array.prototype.slice.call(toggleItems);
      const updateAccordionSize = (element) => {
        if (element.classList.contains("active")) {
          let content = element.querySelector(":scope > .accordion-content");
          gsapWithCSS.set(content, { height: "auto" });
          let newHeight = content.offsetHeight;
          gsapWithCSS.from(content, 0.6, {
            height: newHeight,
            immediateRender: false,
            ease: Power1.easeInOut
          });
        }
      };
      toggleItems.forEach(function (element) {
        let header = element.querySelector(":scope > .accordion-header");
        if (header) {
          if (element.classList.contains("active")) {
            let content = element.querySelector(":scope > .accordion-content");
            gsapWithCSS.set(content, { height: "auto" });
            gsapWithCSS.from(content, 0.6, {
              height: 0,
              immediateRender: false,
              ease: Power1.easeOut
            });
          }
          header.addEventListener("click", function () {
            if (isAnimating) return;

            let content = element.querySelector(":scope > .accordion-content");
            if (element.classList.contains("active")) {
              element.removeActive();
              isAnimating = true;
              element.style.pointerEvents = "none";
              gsapWithCSS.to(content, 0.6, {
                height: 0,
                immediateRender: false,
                ease: Power1.easeOut,
                onComplete: function () {
                  isAnimating = false;
                  element.style.pointerEvents = "auto";
                }
              });
            } else {
              if (toggle) {
                let lastActives = list.querySelectorAll(":scope > .accordion-item.active");
                lastActives.forEach((lastActive) => {
                  lastActive.removeActive();
                  let content2 = lastActive.querySelector(":scope > .accordion-content");
                  gsapWithCSS.to(content2, 0.6, {
                    height: 0,
                    immediateRender: false,
                    ease: Power1.easeOut
                  });
                });
              }
              element.addActive();
              isAnimating = true;
              element.style.pointerEvents = "none";
              gsapWithCSS.set(content, { height: "auto" });
              gsapWithCSS.from(content, 0.6, {
                height: 0,
                immediateRender: false,
                ease: Power1.easeInOut,
                onComplete: function () {
                  isAnimating = false;
                  element.style.pointerEvents = "auto";
                  let parentAccordion = header.parentNode.parentNode.closest(".accordion-item");
                  if (parentAccordion) {
                    let parentContent = parentAccordion.querySelector(":scope > .accordion-content");
                    gsapWithCSS.to(parentContent, 0.6, {
                      height: "auto",
                      immediateRender: false,
                      ease: Power1.easeInOut
                    });
                  }
                }
              });
            }
          });
        }
      });
      list.updateAccordionSize = updateAccordionSize;
    }
    function accordion(elements, options) {
      let {
        removeActiveOptions = {},
        addActiveOptions = {},
        clickOutsideRemoveActive = false,
        clickOutsideEl = document,
        clickOutsideCallback = null,
        clickToggle = false,
        allowMultipleActive = false
      } = options ? options : {};
      if (clickOutsideEl != document) {
        clickOutsideEl = toElementArray(clickOutsideEl)[0];
      }
      let list = toElementArray(elements);
      let clickInside = false;
      if (clickOutsideRemoveActive) {
        clickOutsideEl.addEventListener("click", () => {
          if (clickInside == false) {
            list.forEach((item) => item.removeActive(removeActiveOptions));
            if (typeof clickOutsideCallback == "function") {
              clickOutsideCallback();
            }
          }
          clickInside = false;
        });
      }
      list.forEach((item) => {
        item.addEventListener("click", () => {
          clickInside = true;
          const isActive = item.classList.contains("active");
          if (!allowMultipleActive)
            list.forEach((item2) => item2.removeActive(removeActiveOptions));
          if (clickToggle && isActive) {
            item.removeActive(removeActiveOptions);
            return;
          } else {
            item.addActive(addActiveOptions);
          }
        });
      });
    }
    function sliderContentMobile() {
      let sliderGallery = document.querySelectorAll(".slider-content-mobile");
      setTimeout(() => {
        sliderGallery.forEach((slider) => {
          let swiper = new Swiper(slider.querySelector(".swiper-container"), {
            modules: [Pagination, Navigation],
            slidesPerView: "auto",
            spaceBetween: 0,
            slidesPerGroup: 1,
            loop: false,
            effect: "fade",
            speed: 800,
            slideToClickedSlide: true,
            loopFillGroupWithBlank: false,
            centerInsufficientSlides: true,
            grabCursor: false,
            observer: true,
            preloadImages: false,
            lazy: true,
            watchOverflow: true,
            touchStartPreventDefault: false,
            // centeredSlides: true,
            navigation: {
              nextEl: slider.querySelector(".swiper-button-next"),
              prevEl: slider.querySelector(".swiper-button-prev"),
            },
            breakpoints: {
              767: {
                slidesPerView: 1,
                slidesPerGroup: 1,
              },
              1025: {
                slidesPerView: 4,
                slidesPerGroup: 1,
              },
            },
          });
          slider.swiper = swiper;
        });
        return () => {
          sliderGallery.forEach((element) => {
            if (element.swiper) element.swiper.destroy();
          });
        };
      }, 1e3);
      if (!screen.isDesktop) {
        if (document.querySelector(".slider-content-search-blog")) {
          setTimeout(() => {
            let sliderGallery2 = document.querySelectorAll(
              ".slider-content-search-blog"
            );
            sliderGallery2.forEach((slider) => {
              slider = new Swiper(slider.querySelector(".swiper-container"), {
                modules: [Pagination, Navigation],
                slidesPerView: "auto",
                spaceBetween: 0,
                slidesPerGroup: 1,
                loop: false,
                effect: "fade",
                speed: 800,
                slideToClickedSlide: true,
                loopFillGroupWithBlank: false,
                centerInsufficientSlides: true,
                grabCursor: false,
                observer: true,
                preloadImages: false,
                lazy: true,
                watchOverflow: true,
              });
            });
          }, 1e3);
        }
      }
      if (screen.isPhone) {
        if (document.querySelector(".slider-content-phone")) {
          setTimeout(() => {
            let sliderGallery2 = document.querySelectorAll(
              ".slider-content-phone"
            );
            sliderGallery2.forEach((slider) => {
              slider = new Swiper(slider.querySelector(".swiper-container"), {
                modules: [Pagination, Navigation],
                slidesPerView: "auto",
                spaceBetween: 0,
                slidesPerGroup: 1,
                loop: false,
                effect: "fade",
                speed: 800,
                slideToClickedSlide: true,
                loopFillGroupWithBlank: false,
                centerInsufficientSlides: true,
                grabCursor: false,
                observer: true,
                preloadImages: false,
                lazy: true,
                watchOverflow: true,
              });
            });
          }, 1e3);
        }
      }
    }
    function sliderBanner() {
      if (document.querySelectorAll(".slider-banner")) {
        setTimeout(() => {
          let sliderGallery = document.querySelectorAll(".slider-banner");
          sliderGallery.forEach((slider) => {
            let swiper = new Swiper(slider.querySelector(".swiper-container"), {
              modules: [Pagination, Navigation, Autoplay, EffectFade],
              slidesPerView: 1,
              spaceBetween: 0,
              slidesPerGroup: 1,
              loop: false,
              effect: "fade",
              speed: 800,
              slideToClickedSlide: true,
              watchSlidesProgress: true,
              autoplay: {
                delay: 6e3,
                disableOnInteraction: false,
              },
              pagination: {
                el: slider.querySelector(".swiper-pagination"),
                clickable: true,
              },
              on: {
                autoplayStart: function () {
                  updatePaginationBullet(this);
                },
                slideChangeTransitionStart: function () {
                  cancelAnimationFrame(this.autoplayAnimationFrame);
                  updatePaginationBullet(this);
                },
                autoplayStop: function () {
                  cancelAnimationFrame(this.autoplayAnimationFrame);
                  resetPaginationBulletProgress();
                },
                slideChange: function () {
                  let activeIndex = this.realIndex;
                  let bullets = slider.querySelectorAll(
                    ".swiper-pagination-bullet"
                  );
                  for (let i = 0; i <= activeIndex; i++) {
                    bullets[i].classList.add("active");
                  }
                },
                reachBeginning: function () {
                  let bullets = slider.querySelectorAll(
                    ".swiper-pagination-bullet"
                  );
                  bullets.forEach((bullet) => {
                    bullet.classList.remove("active");
                  });
                },
              },
              // navigation: {
              //   nextEl: slider.querySelector('.swiper-button-next'),
              //   prevEl: slider.querySelector('.swiper-button-prev'),
              // },
              loopFillGroupWithBlank: false,
              centerInsufficientSlides: true,
              grabCursor: false,
              observer: true,
              preloadImages: false,
              lazy: true,
              watchOverflow: true,
            });
            function updatePaginationBullet(swiper2) {
              let activeIndex = swiper2.realIndex;
              let bullets = slider.querySelectorAll(
                ".swiper-pagination-bullet"
              );
              let startTime = performance.now();
              let duration = swiper2.params.autoplay.delay;
              function animate(timestamp) {
                let elapsedTime = timestamp - startTime;
                let progress = Math.min(elapsedTime / duration, 1);
                bullets.forEach((bullet, index) => {
                  if (index === activeIndex) {
                    bullet.style.setProperty("--progress", progress);
                  } else {
                    bullet.style.removeProperty("--progress");
                  }
                });
                if (progress < 1) {
                  swiper2.autoplayAnimationFrame =
                    requestAnimationFrame(animate);
                }
              }
              swiper2.autoplayAnimationFrame = requestAnimationFrame(animate);
            }
            function resetPaginationBulletProgress(swiper2) {
              let bullets = slider.querySelectorAll(
                ".swiper-pagination-bullet"
              );
              bullets.forEach((bullet) =>
                bullet.style.removeProperty("--progress")
              );
            }
            slider.swiper = swiper;
          });
        }, 1e3);
      }
    }
    function sliderTestimony() {
      if (document.querySelectorAll(".slider-testimony")) {
        setTimeout(() => {
          let sliderGallery = document.querySelectorAll(".slider-testimony");
          sliderGallery.forEach((slider) => {
            slider = new Swiper(slider.querySelector(".swiper-container"), {
              modules: [Pagination, Navigation],
              slidesPerView: 1,
              spaceBetween: 12,
              slidesPerGroup: 1,
              loop: false,
              effect: "fade",
              speed: 800,
              slideToClickedSlide: true,
              pagination: {
                el: slider.querySelector(".swiper-pagination"),
                clickable: true,
                type: "fraction",
              },
              navigation: {
                nextEl: slider.querySelector(".swiper-button-next"),
                prevEl: slider.querySelector(".swiper-button-prev"),
              },
              loopFillGroupWithBlank: false,
              centerInsufficientSlides: true,
              grabCursor: false,
              observer: true,
              preloadImages: false,
              lazy: true,
              watchOverflow: true,
              breakpoints: {
                767: {
                  centeredSlides: true,
                  spaceBetween: 12,
                },
                1025: {
                  centeredSlides: false,
                  spaceBetween: 0,
                },
              },
            });
          });
        }, 1e3);
      }
    }
    gsapWithCSS$1.registerPlugin(ScrollSmoother, ScrollTrigger$1);
    const pageName$4 = "market";
    function main$4() {
      sliderBanner();
      sliderTestimony();
      sliderHighlights();
      productLinkColor();
      let sectionHeresWhatPeopleAreSaying = document.querySelector(
        ".market-heres-what-people-are-saying"
      );
      if (sectionHeresWhatPeopleAreSaying) {
        let bg = gsapWithCSS$1.timeline({
          scrollTrigger: {
            trigger: ".market-heres-what-people-are-saying",
            start: "top center",
            end: "bottom 30%",
            // pin: containerScroll,
            pinSpacing: false,
            markers: false,
            scrub: false,
            anticipatePin: true,
            invalidateOnRefresh: true,
            toggleActions: "play reverse play reverse",
            onUpdate: function (ev) { },
          },
        });
        bg.fromTo(
          "body",
          {
            backgroundColor: "#f2f2f2",
            duration: 0.3,
          },
          {
            backgroundColor: "#87C3E7",
            duration: 0.3,
          }
        );
        // document.addEventListener(
        //   "pjax:switch",
        //   function () {
        //     document.body.style.backgroundColor = "";
        //   },
        //   { once: true }
        // );
      }
    }
    const pgMarket = new Page({
      pageName: pageName$4,
      main: main$4,
    });
    function manualModalCloseControls() {
      document
        .querySelectorAll(".manual-modal-close:not(.js-modal-close-running)")
        .forEach((element) => {
          element.classList.add("js-modal-close-running");
          element.addEventListener("click", function () {
            manualModalClose();
          });
        });
    }
    const pageName$3 = "my-account-quotes-history";
    function main$3() {
      // manualModalCloseControls();
    }
    const pgMyAccountQuotesHistory = new Page({
      pageName: pageName$3,
      main: main$3,
    });
    function productContent() {
      let productContent2 = document.querySelectorAll(
        "[data-product-content]:not(.js-cart-running)"
      );
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
          onClose: () => { },
          onComplete: () => { },
          onActivate: (item) => {
            const element = document.querySelector(".header-info-list li.local-item.active");
            if (element) element.querySelector(".custom-close").click();
           },
          onDeactivate: (item) => { },
        });
        let slider = element.querySelectorAll(
          ".wrapper-slider-product:not(.js-slider-running)"
        );
        slider.forEach((el) => {
          el.classList.add("js-slider-running");
          let sliderProductThumb = new Swiper(
            el.querySelector(".slider-product-thumb .swiper-container"),
            {
              modules: [Navigation],
              slidesPerView: "auto",
              spaceBetween: 0,
              slidesPerGroup: 1,
              loop: false,
              effect: "slide",
              pagination: {
                el: el.querySelector(
                  ".slider-product-thumb .swiper-pagination"
                ),
                clickable: true,
              },
              navigation: {
                nextEl: el.querySelector(
                  ".slider-product-thumb .swiper-button-next"
                ),
                prevEl: el.querySelector(
                  ".slider-product-thumb .swiper-button-prev"
                ),
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
              touchStartPreventDefault: false,
            }
          );
          el.querySelector(".slider-product-thumb .swiper-container").swiper =
            slider;
          let sliderProduct = new Swiper(
            el.querySelector(".slider-product .swiper-container"),
            {
              modules: [Navigation, Thumb],
              slidesPerView: 1,
              spaceBetween: 0,
              slidesPerGroup: 1,
              loop: false,
              effect: "slide",
              navigation: {
                nextEl: el.querySelector(".slider-product .swiper-button-next"),
                prevEl: el.querySelector(".slider-product .swiper-button-prev"),
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
                swiper: sliderProductThumb,
              },
            }
          );
          el.querySelector(".slider-product .swiper-container").swiper =
            sliderProduct;
        });
        element.querySelectorAll(".infinite-image-scroller").forEach((ele) => {
          const imageScroller = new InfiniteImageScroller(
            ele,
            ele.dataset.frames,
            ele.dataset.path,
            ele.dataset.extension
          );
          ele.InfiniteImageScroller = imageScroller;
        });
        element.addEventListener("modal:open", function () {
          setTimeout(() => {
            resizeImages();
          }, 100);
        });
        function resizeImages() {
          let a = element.querySelectorAll(
            ".swiper-slide-active .infinite-image-scroller"
          );
          a.forEach((el) => {
            if (el) el.InfiniteImageScroller.resize();
          });
        }
        element.querySelectorAll("[data-set-color]").forEach((ele) => {
          ele.addEventListener("click", function () {
            setTimeout(() => {
              resizeImages();
            }, 100);
          });
        });
        element
          .querySelectorAll(".slider-product .swiper-container")
          .forEach((ele) => {
            if (ele.swiper) {
              ele.swiper.on("slideChange", function () {
                setTimeout(() => {
                  resizeImages();
                }, 100);
              });
            }
          });
      });
    }
    // productContent();

    // document.addEventListener("pjax:complete", productContent);
    const pageName$2 = "my-account-saved-products";
    function main$2() {
      productLinkColor();
      productContent();
    }
    const pgMyAccountSavedProducts = new Page({
      pageName: pageName$2,
      main: main$2,
    });
    gsapWithCSS$1.registerPlugin(ScrollTrigger$1);
    function sticky() {
      let stickies = document.querySelectorAll(
        "[data-sticky]:not(.js-running)"
      );
      stickies.forEach((element) => {
        element.classList.add("js-running");
        if (!screen.isDesktop && element.dataset.stickyNoMobile !== void 0) {
          return;
        }
        let start = element.dataset.start ? element.dataset.start : "top top";
        let end = element.dataset.end ? element.dataset.end : "bottom top";
        let trigger = element.dataset.trigger
          ? document.querySelector(element.dataset.trigger)
          : element;
        if (element.dataset.trigger && element.dataset.trigger == "parent")
          trigger = element.parentElement;
        let endTrigger = element.dataset.endTrigger
          ? document.querySelector(element.dataset.endTrigger)
          : trigger;
        let offsetEl = element.dataset.offset ? element.dataset.offset : 0;
        let offset2 = 0;
        if (offsetEl != 0 && document.querySelector(offsetEl)) {
          offset2 = document.querySelector(offsetEl).clientHeight;
        }
        if (element.dataset.trigger && element.dataset.trigger == "parent") {
          start = () => {
            return `top-=${offset2} top`;
          };
          end = () => {
            const offsetSum = element.offsetHeight + offset2;
            return `bottom-=${offsetSum} top`;
          };
        }
        ScrollTrigger$1.create({
          trigger,
          endTrigger,
          start,
          end,
          pin: element,
          pinSpacing: false,
          markers: false,
          scrub: true,
          anticipatePin: true,
          invalidateOnRefresh: true,
        });
      });
    }
    function filterProducts() {
      let btnFilter = document.querySelector(".btn-filter:not(.js-running)");
      let columnFilter = document.querySelector(".container-filter-products");
      if (btnFilter) {
        btnFilter.classList.add("js-running");
        btnFilter.addEventListener("click", function () {
          if (columnFilter.classList.contains("active")) {
            columnFilter.removeActive();
          } else {
            columnFilter.addActive();
          }
        });
      }
      let btnTag = document.querySelectorAll(".btn-tag:not(.js-running)");
      btnTag.forEach((element) => {
        element.classList.add("js-running");
        element.addEventListener("click", function () {
          if (this.classList.contains("active")) {
            this.removeActive();
          } else {
            this.addActive();
          }
        });
      });
    }
    filterProducts();
    // document.addEventListener("pjax:complete", filterProducts);
    function dropdownTags() {
      if (!document.querySelector(".list-dropdown-tags")) return;
      let mm = gsapWithCSS$1.matchMedia();
      let jsRunning = false;
      mm.add(`${mediaSize.mobile}`, () => {
        if (jsRunning) return;
        new DataSetGet({
          dataGetSelector: "[data-get-tag]",
          dataSetSelector: "[data-set-tag]",
          parentContainer: "[data-parent-tag]",
          listener: "click",
          //'hover' ou 'click'
          toggle: true,
          multiple: false,
          deactivateOnClickOutside: true,
          onClose: () => { },
          onComplete: () => { },
          onActivate: (item) => {
            const element = document.querySelector(".header-info-list li.local-item.active");
            if (element) element.querySelector(".custom-close").click();
           },
          onDeactivate: (item) => { },
        });
        jsRunning = true;
      });
    }
    function categoryMenu() {
      let menuFixed = document.querySelectorAll(
        ".category-menu-fixed:not(.js-running)"
      );
      menuFixed.forEach((element) => {
        element.classList.add("js-running");
        let btn = element.querySelector(".btn-close-category-menu");
        let section = element.querySelector(".category-menu-wrapper");
        element.addEventListener("click", function () {
          if (section.classList.contains("active")) {
            btn.removeActive();
            section.removeActive();
          } else {
            btn.addActive();
            section.addActive();
          }
        });
        // document.addEventListener("pjax:send", function () {
        //   if (section && section.classList.contains("active")) {
        //     btn.removeActive();
        //     section.removeActive();
        //   }
        // });
      });
    }
    const pageName$1 = "category";
    function main$1() {
      filterProducts();
      dropdownTags();
      productContent();
      productLinkColor();
    }
    const pgCategory = new Page({
      pageName: pageName$1,
      main: main$1,
    });
    const pageName = "product";
    function main() {
      productContent();
      productLinkColor();
      new Swiper("#match-slider .swiper-container", {
        modules: [Navigation, Pagination],
        slidesPerView: 1,
        spaceBetween: 0,
        slidesPerGroup: 1,
        loop: false,
        effect: "slide",
        pagination: {
          el: "#match-slider .swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
        navigation: {
          nextEl: "#match-slider .swiper-button-next",
          prevEl: "#match-slider .swiper-button-prev",
        },
        loopFillGroupWithBlank: false,
        centerInsufficientSlides: true,
        grabCursor: false,
        observer: true,
        watchOverflow: true,
        speed: 600,
        preventClicksPropagation: false,
        touchStartPreventDefault: false,
        // Responsive breakpoints
        breakpoints: {
          767: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          1025: {
            slidesPerView: "auto",
            slidesPerGroup: 1,
          },
        },
      });
      let readMore = document.querySelectorAll(".description");
      if (readMore) {
        readMore.forEach((element) => {
          let textHeight = element.querySelector(".text").clientHeight;
          let btnReadMore = element.querySelector(".btn-read-more");
          element.style.setProperty("--h", textHeight + "px");
          btnReadMore.addEventListener("click", function () {
            if (element.classList.contains("active")) {
              element.removeActive();
            } else {
              element.addActive();
            }
          });
        });
      }
    }
    const pgProduct = new Page({
      pageName,
      main,
    });
    var splitting = { exports: {} };
    (function (module2, exports2) {
      (function (global, factory) {
        module2.exports = factory();
      })(commonjsGlobal, function () {
        var root = document;
        var createText = root.createTextNode.bind(root);
        function setProperty(el, varName, value) {
          el.style.setProperty(varName, value);
        }
        function appendChild(el, child) {
          return el.appendChild(child);
        }
        function createElement(parent, key, text, whitespace) {
          var el = root.createElement("span");
          key && (el.className = key);
          if (text) {
            !whitespace && el.setAttribute("data-" + key, text);
            el.textContent = text;
          }
          return (parent && appendChild(parent, el)) || el;
        }
        function getData(el, key) {
          return el.getAttribute("data-" + key);
        }
        function $(e, parent) {
          return !e || e.length == 0
            ? // null or empty string returns empty array
            []
            : e.nodeName
              ? // a single element is wrapped in an array
              [e]
              : // selector and NodeList are converted to Element[]
              [].slice.call(
                e[0].nodeName ? e : (parent || root).querySelectorAll(e)
              );
        }
        function Array2D(len) {
          var a = [];
          for (; len--;) {
            a[len] = [];
          }
          return a;
        }
        function each(items, fn) {
          items && items.some(fn);
        }
        function selectFrom(obj) {
          return function (key) {
            return obj[key];
          };
        }
        function index(element, key, items) {
          var prefix = "--" + key;
          var cssVar = prefix + "-index";
          each(items, function (items2, i) {
            if (Array.isArray(items2)) {
              each(items2, function (item) {
                setProperty(item, cssVar, i);
              });
            } else {
              setProperty(items2, cssVar, i);
            }
          });
          setProperty(element, prefix + "-total", items.length);
        }
        var plugins = {};
        function resolvePlugins(by, parent, deps) {
          var index2 = deps.indexOf(by);
          if (index2 == -1) {
            deps.unshift(by);
            each(plugins[by].depends, function (p) {
              resolvePlugins(p, by, deps);
            });
          } else {
            var indexOfParent = deps.indexOf(parent);
            deps.splice(index2, 1);
            deps.splice(indexOfParent, 0, by);
          }
          return deps;
        }
        function createPlugin(by, depends, key, split) {
          return {
            by,
            depends,
            key,
            split,
          };
        }
        function resolve(by) {
          return resolvePlugins(by, 0, []).map(selectFrom(plugins));
        }
        function add2(opts) {
          plugins[opts.by] = opts;
        }
        function splitText(
          el,
          key,
          splitOn,
          includePrevious,
          preserveWhitespace
        ) {
          el.normalize();
          var elements = [];
          var F = document.createDocumentFragment();
          if (includePrevious) {
            elements.push(el.previousSibling);
          }
          var allElements = [];
          $(el.childNodes).some(function (next) {
            if (next.tagName && !next.hasChildNodes()) {
              allElements.push(next);
              return;
            }
            if (next.childNodes && next.childNodes.length) {
              allElements.push(next);
              elements.push.apply(
                elements,
                splitText(
                  next,
                  key,
                  splitOn,
                  includePrevious,
                  preserveWhitespace
                )
              );
              return;
            }
            var wholeText = next.wholeText || "";
            var contents = wholeText.trim();
            if (contents.length) {
              if (wholeText[0] === " ") {
                allElements.push(createText(" "));
              }
              each(contents.split(splitOn), function (splitText2, i) {
                if (i && preserveWhitespace) {
                  allElements.push(
                    createElement(F, "whitespace", " ", preserveWhitespace)
                  );
                }
                var splitEl = createElement(F, key, splitText2);
                elements.push(splitEl);
                allElements.push(splitEl);
              });
              if (wholeText[wholeText.length - 1] === " ") {
                allElements.push(createText(" "));
              }
            }
          });
          each(allElements, function (el2) {
            appendChild(F, el2);
          });
          el.innerHTML = "";
          appendChild(el, F);
          return elements;
        }
        var _ = 0;
        function copy(dest, src) {
          for (var k in src) {
            dest[k] = src[k];
          }
          return dest;
        }
        var WORDS = "words";
        var wordPlugin = createPlugin(
          /*by: */
          WORDS,
          /*depends: */
          _,
          /*key: */
          "word",
          /*split: */
          function (el) {
            return splitText(el, "word", /\s+/, 0, 1);
          }
        );
        var CHARS = "chars";
        var charPlugin = createPlugin(
          /*by: */
          CHARS,
          /*depends: */
          [WORDS],
          /*key: */
          "char",
          /*split: */
          function (el, options, ctx) {
            var results = [];
            each(ctx[WORDS], function (word, i) {
              results.push.apply(
                results,
                splitText(word, "char", "", options.whitespace && i)
              );
            });
            return results;
          }
        );
        function Splitting2(opts) {
          opts = opts || {};
          var key = opts.key;
          return $(opts.target || "[data-splitting]").map(function (el) {
            var ctx = el["🍌"];
            if (!opts.force && ctx) {
              return ctx;
            }
            ctx = el["🍌"] = { el };
            var items = resolve(opts.by || getData(el, "splitting") || CHARS);
            var opts2 = copy({}, opts);
            each(items, function (plugin) {
              if (plugin.split) {
                var pluginBy = plugin.by;
                var key2 = (key ? "-" + key : "") + plugin.key;
                var results = plugin.split(el, opts2, ctx);
                key2 && index(el, key2, results);
                ctx[pluginBy] = results;
                el.classList.add(pluginBy);
              }
            });
            el.classList.add("splitting");
            return ctx;
          });
        }
        function html(opts) {
          opts = opts || {};
          var parent = (opts.target = createElement());
          parent.innerHTML = opts.content;
          Splitting2(opts);
          return parent.outerHTML;
        }
        Splitting2.html = html;
        Splitting2.add = add2;
        function detectGrid(el, options, side) {
          var items = $(options.matching || el.children, el);
          var c = {};
          each(items, function (w) {
            var val = Math.round(w[side]);
            (c[val] || (c[val] = [])).push(w);
          });
          return Object.keys(c).map(Number).sort(byNumber).map(selectFrom(c));
        }
        function byNumber(a, b2) {
          return a - b2;
        }
        var linePlugin = createPlugin(
          /*by: */
          "lines",
          /*depends: */
          [WORDS],
          /*key: */
          "line",
          /*split: */
          function (el, options, ctx) {
            return detectGrid(el, { matching: ctx[WORDS] }, "offsetTop");
          }
        );
        var itemPlugin = createPlugin(
          /*by: */
          "items",
          /*depends: */
          _,
          /*key: */
          "item",
          /*split: */
          function (el, options) {
            return $(options.matching || el.children, el);
          }
        );
        var rowPlugin = createPlugin(
          /*by: */
          "rows",
          /*depends: */
          _,
          /*key: */
          "row",
          /*split: */
          function (el, options) {
            return detectGrid(el, options, "offsetTop");
          }
        );
        var columnPlugin = createPlugin(
          /*by: */
          "cols",
          /*depends: */
          _,
          /*key: */
          "col",
          /*split: */
          function (el, options) {
            return detectGrid(el, options, "offsetLeft");
          }
        );
        var gridPlugin = createPlugin(
          /*by: */
          "grid",
          /*depends: */
          ["rows", "cols"]
        );
        var LAYOUT = "layout";
        var layoutPlugin = createPlugin(
          /*by: */
          LAYOUT,
          /*depends: */
          _,
          /*key: */
          _,
          /*split: */
          function (el, opts) {
            var rows = (opts.rows = +(opts.rows || getData(el, "rows") || 1));
            var columns = (opts.columns = +(
              opts.columns ||
              getData(el, "columns") ||
              1
            ));
            opts.image =
              opts.image || getData(el, "image") || el.currentSrc || el.src;
            if (opts.image) {
              var img = $("img", el)[0];
              opts.image = img && (img.currentSrc || img.src);
            }
            if (opts.image) {
              setProperty(el, "background-image", "url(" + opts.image + ")");
            }
            var totalCells = rows * columns;
            var elements = [];
            var container = createElement(_, "cell-grid");
            while (totalCells--) {
              var cell = createElement(container, "cell");
              createElement(cell, "cell-inner");
              elements.push(cell);
            }
            appendChild(el, container);
            return elements;
          }
        );
        var cellRowPlugin = createPlugin(
          /*by: */
          "cellRows",
          /*depends: */
          [LAYOUT],
          /*key: */
          "row",
          /*split: */
          function (el, opts, ctx) {
            var rowCount = opts.rows;
            var result = Array2D(rowCount);
            each(ctx[LAYOUT], function (cell, i, src) {
              result[Math.floor(i / (src.length / rowCount))].push(cell);
            });
            return result;
          }
        );
        var cellColumnPlugin = createPlugin(
          /*by: */
          "cellColumns",
          /*depends: */
          [LAYOUT],
          /*key: */
          "col",
          /*split: */
          function (el, opts, ctx) {
            var columnCount = opts.columns;
            var result = Array2D(columnCount);
            each(ctx[LAYOUT], function (cell, i) {
              result[i % columnCount].push(cell);
            });
            return result;
          }
        );
        var cellPlugin = createPlugin(
          /*by: */
          "cells",
          /*depends: */
          ["cellRows", "cellColumns"],
          /*key: */
          "cell",
          /*split: */
          function (el, opt, ctx) {
            return ctx[LAYOUT];
          }
        );
        add2(wordPlugin);
        add2(charPlugin);
        add2(linePlugin);
        add2(itemPlugin);
        add2(rowPlugin);
        add2(columnPlugin);
        add2(gridPlugin);
        add2(layoutPlugin);
        add2(cellRowPlugin);
        add2(cellColumnPlugin);
        add2(cellPlugin);
        return Splitting2;
      });
    })(splitting);
    var splittingExports = splitting.exports;
    const Splitting = /* @__PURE__ */ getDefaultExportFromCjs(splittingExports);
    function splitWords() {
      document
        .querySelectorAll(".split-words:not(.splitting)")
        .forEach((element) => {
          const results = Splitting({
            target: element,
            by: "lines",
          });
          new DocumentFragment();
          results[0].lines.forEach((ar, i) => {
            ar.forEach((el, j) => {
              if (j == 0) {
                el.classList.add("first-word");
              }
              el.classList.add("wrapper-mask");
              el.innerHTML =
                '<span class="line-' +
                i +
                '">' +
                el.innerHTML +
                "<span>&nbsp;</span></span>";
            });
          });
          element.querySelectorAll(".whitespace").forEach((el) => {
            el.remove();
          });
        });
    }
    // document.addEventListener("pjax:complete", splitWords);
    function splitChars() {
      document
        .querySelectorAll(".split-chars:not(.splitting)")
        .forEach((element) => {
          Splitting({
            target: element,
            by: "chars",
          });
        });
    }
    // document.addEventListener("pjax:complete", splitChars);
    gsapWithCSS$1.registerPlugin(ScrollSmoother, ScrollTrigger$1);
    function smoothScrollGsap() {
      if (screen.isMobile) return;
      function initScroll() {
        let smooth = 2;
        if (screen.isSafariDesktop) smooth = 1.5;
        let wrapper = document.querySelector(".wrapper:not(.js-running)");
        ScrollSmoother.create({
          wrapper: "#main-transition",
          content: wrapper,
          smooth,
          normalizeScroll: true,
          // prevents address bar from showing/hiding on most devices, solves various other browser inconsistencies
          ignoreMobileResize: true,
          // skips ScrollTrigger.refresh() on mobile resizes from address bar showing/hiding
          effects: true,
          preventDefault: true,
          effectsPrefix: "scroll-",
        });
        wrapper.classList.add("js-running");
      }
      initScroll();
      // document.addEventListener("pjax:complete", initScroll);
      // document.addEventListener("pjax:switch", function () {
      //   let previouslyCreatedSmoother = ScrollSmoother.get();
      //   if (previouslyCreatedSmoother) previouslyCreatedSmoother.kill();
      //   gsapWithCSS$1.globalTimeline.getChildren().forEach((t) => t.kill());
      //   ScrollTrigger$1.getAll().forEach((trigger) => {
      //     trigger.kill();
      //   });
      // });
      document.addEventListener("modal:open", function () {
        let sm = ScrollSmoother.get();
        if (sm) {
          sm.paused(true);
        }
      });
      document.addEventListener("modal:close", function () {
        let sm = ScrollSmoother.get();
        if (sm) sm.paused(false);
      });
    }
    function copyLink() {
      var copyTextareaBtn = document.querySelectorAll(
        ".container-copy:not(.js-copy-link-running)"
      );
      copyTextareaBtn.forEach((element) => {
        element.classList.add("js-copy-link-running");
        element
          .querySelector(".copy-link")
          .addEventListener("click", function () {
            this.querySelector("span").innerText = "Copied!";
            this.classList.add("copied");
          });
      });
    }
    gsap$1.registerPlugin(ScrollToPlugin);
    function login() {
      let submenuLogin = document.querySelector("[data-form-active]");
      document.querySelector(".wrapper-submenu-login");
      let containerSignIn = document.querySelector(".container-sign-in");
      let containerCreateAccount = document.querySelector(
        ".container-create-account"
      );
      let containerForgotPassword = document.querySelector(
        ".container-forgot-password"
      );
      let btnCreateAccount = document.querySelector(".btn-create-account");
      let btnCloseLogin = document.querySelector(".close-to-login");
      let btnForgotPassword = document.querySelector(".btn-forgot-password");
      let delay = 400;
      let delay2 = 1e3;
      btnCreateAccount.addEventListener("click", function () {
        submenuLogin.dataset.formActive = "create-account";
        setTimeout(() => {
          containerSignIn.classList.add("d-none");
          containerCreateAccount.classList.remove("d-none");
          ScrollToGsap(0, 0, 0.4, 1, 0, ".wrapper-submenu-login");
        }, delay);
      });
      btnForgotPassword.addEventListener("click", function () {
        submenuLogin.dataset.formActive = "forgot-password";
        setTimeout(() => {
          containerSignIn.classList.add("d-none");
          containerForgotPassword.classList.remove("d-none");
          ScrollToGsap(0, 0, 0.4, 1, 0, ".wrapper-submenu-login");
        }, delay);
      });
      btnCloseLogin.addEventListener("click", function () {
        if (submenuLogin.dataset.formActive == "forgot-password") {
          submenuLogin.dataset.formActive = "back-to-login";
          setTimeout(() => {
            containerForgotPassword.classList.add("d-none");
            containerSignIn.classList.remove("d-none");
          }, delay);
          setTimeout(() => {
            submenuLogin.dataset.formActive = "login";
          }, delay2);
        } else if (submenuLogin.dataset.formActive == "create-account") {
          submenuLogin.dataset.formActive = "back-to-login";
          setTimeout(() => {
            containerCreateAccount.classList.add("d-none");
            containerSignIn.classList.remove("d-none");
          }, delay);
          setTimeout(() => {
            submenuLogin.dataset.formActive = "login";
          }, delay2);
        }
      });
    }
    gsapWithCSS$1.registerPlugin(ScrollSmoother, ScrollTrigger$1);
    smoothScrollGsap();
    if (!screen.isMobile) cursor();
    CookiesConsent();
    viewportHeight();
    // menuControls();
    splitWords();
    splitChars();
    function closeSearch() {
      if (document.body.dataset.searchState == "success") {
        document.body.dataset.searchState = "leave";
        setTimeout(() => {
          document.body.dataset.searchState = "";
        }, 1100);
      }
    }
    document
      .querySelectorAll("[data-search-remove]:not(.js-running)")
      .forEach((element) => {
        element.classList.add("js-running");
        element.addEventListener("click", closeSearch);
      });
    document.querySelectorAll(".header-info-list").forEach((element) => {
      accordionGsap(element);
    });
    const submenu = new DataSetGet({
      dataGetSelector: "[data-get-submenu]",
      dataSetSelector: "[data-set-submenu]",
      parentContainer: "[data-parent-submenu]",
      dataCloseSelector: "[data-close-submenu]",
      listener: "click",
      //'hover' ou 'click'
      blockScroll: true,
      // multiple: false,
      toggle: true,
      deactivateOnClickOutside: true,
      leaveDelay: 800,
      onClose: () => {
        closeSearch();
        document.body.classList.remove("submenu-active");
      },
      onComplete: () => {
        closeSearch();
        document.body.classList.add("submenu-active");
      },
      onActivate: (item) => {
        const element = document.querySelector(".header-info-list li.local-item.active");
        if (element) element.querySelector(".custom-close").click();
      },
      onDeactivate: (item) => { },
    });
    // document.addEventListener("pjax:send", function () {
    //   submenu.deactivateItems();
    // });
    let btnSubClose = document.querySelectorAll("[data-submenu-close]");
    let submenuItem = document.querySelectorAll(".submenu");
    btnSubClose.forEach((el) => {
      el.addEventListener("click", () => {
        submenuItem.forEach((sub) => {
          if (sub.classList.contains("active")) {
            sub.removeActive();
          }
        });
      });
    });
    function whenContainerReady() {
      setTimeout(() => {
        ScrollTrigger$1.refresh();
      }, 1e3);
      const page =
        window.location.pathname.trim() === "/"
          ? "home"
          : location.pathname.substring(1);
      const cleanPage = page.split("/")[0].trim();
      switch (cleanPage) {
        case "home":
          main$5();
          break;
        case "market":
          main$4();
          break;
        case "product":
          main();
          break;
        case "my-account-saved-products":
          main$2();
          break;
        case "my-account-quotes-history":
          main$3();
          break;
        // case 'services':
        //   main$3();
        //   break;
        // case 'contact':
        //   main$2();
        // case 'portfolio':
        //   main$1();
        //   break;
        default:
          break;
      }

      document.body.classList.remove("page-leave-active");
      Contato();
      observers();
      marcarFormPreenchido();
      initVideo();
      scrollTo("", "");
      Parallax();
      sticky();
      sliderContentMobile();
      copyLink();
      login();
      categoryMenu();
      if (document.querySelector(".accordion-list-studios:not(.js-running)")) {
        if (screen.isDesktop) {
          accordion(".accordion-list-studios .accordion-item", {
            clickToggle: true,
            allowMultipleActive: false
          });
        } else {
          document.querySelectorAll(".accordion-list-studios").forEach((element) => {
            accordionGsap(element);
          });
        }
        document.querySelector(".accordion-list-studios").classList.add("js-running");
      }
    }
    // whenContainerReady();0
    // document.addEventListener("pjax:complete", whenContainerReady);
    // document.addEventListener("pjax:send", whenContainerLeave);
    // function whenContainerLeave() {
    //   document.body.classList.add("page-leave-active");
    // }
    document.querySelector(".closeModals").addEventListener("click", manualModalCloseControls);
    document.querySelector(".scrollRefresh").addEventListener("refreshScroll", () => {
      ScrollTrigger$1.refresh();
    });

    document
      .querySelector(".updateWatched")
      .addEventListener("customUpdateWatch", () => {
        updateWatched();
        productLinkColor();
        manualModalClose();
        copyLink()
      });
    // document.querySelector(".initScript").addEventListener("click", () => {
    //   whenContainerReady();
    //   if (!firstLoad) {
    //     closeSearch();
    //   }
    // });
    document
      .querySelector(".initScript")
      .addEventListener("customInitScript", () => {
        window.scrollTo({ top: 0, behavior: "instant" });
        whenContainerReady();
      });

    document
      .querySelector(".stickyAnimationTrigger")
      .addEventListener("click", () => {
        sticky();
      });
    document
      .querySelector(".updateWatchedTrigger")
      .addEventListener("click", () => {
        initVideo();
        dropdownTags();
        updateWatched();
        ScrollTrigger$1.refresh();
      });

    document
      .querySelector(".triggerSplitWordAnimation")
      .addEventListener("click", () => {
        splitChars();
        splitWords();
        sliderContentMobile();
      });

    document.querySelector(".myAccount").addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "instant" });
    });

    document.querySelector(".savedProducts").addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "instant" });
      productLinkColor();
    });

    document.querySelector(".changePassword").addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "instant" });
    });

    document.querySelector(".quotesHistory").addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "instant" });
      manualModalCloseControls();
    });

    document
      .querySelector(".initializeCanvas")
      .addEventListener("customInit", initializeCanvas);

    document.querySelector(".addToCart").addEventListener("reloadModal", () => {
      productLinkColor();
      // formCart();
      filterProducts();
      // addToCartSlider();
      productContent();
    });
    // const pages = new PageController();
    // pages.add(pgHome);
    // pages.add(pgMarket);
    // pages.add(pgProduct);
    // pages.add(pgMyAccountQuotesHistory);
    // pages.add(pgMyAccountSavedProducts);
    // pages.add(pgCategory);
    // if (pages.updateCurrent()) {
    //   pages.runCurrent();
    // }
    // if (typeof loader !== "undefined") {
    //   loader.onFirstLeaving = () => {
    //     observers();
    //     setTimeout(() => {
    //       updateWatched();
    //     }, 600);
    //     document.dispatchEvent(new CustomEvent("loaded"));
    //   };
    //   loader.onFirstDone = () => {
    //     document.body.classList.remove("overflow-hidden");
    //   };
    // setTimeout(() => {
    //   loader.state.scriptReady = true;
    // }, 10);
    // }
  },
});
export default require_app2();
