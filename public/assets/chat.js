import { g as gsapWithCSS, c as ScrollSmoother, S as ScrollTrigger } from "./all.js";
import { s as screen } from "./screen-size.js";
gsapWithCSS.registerPlugin(ScrollSmoother, ScrollTrigger);
function chat() {
  let chat2 = document.querySelector(".chat");
  let btnChat = document.querySelector(".btn-chat");
  btnChat.addEventListener("click", () => {
    if (chat2.classList.contains("active")) {
      chat2.removeActive();
    } else {
      chat2.addActive();
    }
  });
  function toggleSmoothScroll(state) {
    let smoother = ScrollSmoother.get();
    if (smoother)
      smoother.paused(state);
  }
  let containerChat = chat2.querySelector(".container-chat .container-messages");
  containerChat.addEventListener("mouseenter", (e) => {
    toggleSmoothScroll(true);
  });
  containerChat.addEventListener("mouseleave", (e) => {
    toggleSmoothScroll(false);
  });
  if (screen.isSafariDesktop) {
    chat2.classList.add("is-safari");
  }
}
chat();
