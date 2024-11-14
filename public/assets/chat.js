import { g as gsapWithCSS, c as ScrollSmoother, S as ScrollTrigger } from "./all.js";
import { s as screen } from "./screen-size.js";
gsapWithCSS.registerPlugin(ScrollSmoother, ScrollTrigger);
export const chat = () => {
  let chat2 = document.querySelector(".chat:not(.js-running)");
  let btnChat = document.querySelector(".btn-chat");

  if (!chat2 || !btnChat) return;
  btnChat.addEventListener("click", () => {
    chat2.classList.toggle("active");
  });
  if (screen.isSafariDesktop) {
    chat2.classList.add("is-safari");
  }
  chat2.classList.add("js-running");
}
document.querySelector(".activateChat").addEventListener("enableChat", chat);
chat();


function revalidateButton() {
  let chat2 = document.querySelector(".revalidate-button");
  let btnChat = document.querySelector(".btn-revalidate-button");
  if (!chat2 || !btnChat) return;
  const running = chat2.classList.contains("js-running");
  if (running) return;
  chat2.classList.add("js-running");
  btnChat.addEventListener("click", () => {
    chat2.classList.toggle("active");
  });
  if (screen.isSafariDesktop) {
    chat2.classList.add("is-safari");
  }
}
document.querySelector(".activateRevalidateButton").addEventListener("click", () => {
  revalidateButton();
});
revalidateButton();
