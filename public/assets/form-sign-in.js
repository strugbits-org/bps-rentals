import { s as singlePjaxInstance } from "./pjax.js";
function FormSignIn() {
  let forms = document.querySelectorAll("[data-form-sign-in-container]:not(.js-running)");
  forms.forEach((containerForm) => {
    containerForm.classList.add("js-running");
    let form = containerForm.querySelector("form");
    const containerPassword = containerForm.querySelectorAll(".container-input-password");
    if (containerPassword) {
      containerPassword.forEach((element) => {
        const togglePassword = element.querySelector(".toggle-password");
        const password = element.querySelector(".password");
        togglePassword.addEventListener("click", function(e) {
          const type = password.getAttribute("type") === "password" ? "text" : "password";
          password.setAttribute("type", type);
          this.classList.toggle("show");
        });
      });
    }
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      {
        containerForm.dataset.formState = "success";
        setTimeout(() => {
          singlePjaxInstance.loadUrl(form.dataset.redirect);
        }, 0);
        setTimeout(() => {
          document.body.dataset.loginState = "logged";
        }, 800);
      }
    });
  });
}
// FormSignIn();
// document.addEventListener("pjax:complete", FormSignIn);
