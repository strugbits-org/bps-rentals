import "./screen-size.js";
function Forms() {
  let forms = document.querySelectorAll("[data-form-container]:not(.js-running)");
  forms.forEach((containerForm) => {
    containerForm.classList.add("js-running");
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
    const btnDiscard = containerForm.querySelector(".btn-discard");
    if (btnDiscard) {
      btnDiscard.addEventListener("click", function() {
        containerForm.querySelector("form").reset();
      });
    }
    containerForm.querySelector("form").addEventListener("submit", function(e) {
      e.preventDefault();
      {
        containerForm.dataset.formState = "success";
      }
    });
  });
}
Forms();
document.addEventListener("pjax:complete", Forms);
