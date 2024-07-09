function formCart() {
  let forms = document.querySelectorAll("[data-form-container-cart]:not(.js-running)");
  let containerNumber = document.querySelectorAll(".container-input-quantity:not(.js-running)");
  containerNumber.forEach((element) => {
    element.classList.add("js-running");
    const number = element.querySelector(".input-number");
    number.addEventListener("input", function() {
      if (number.value < 1)
        number.value = 1;
    });
    element.querySelector(".minus").addEventListener("click", function() {
      number.value = number.value - 1;
      if (number.value < 1)
        number.value = 1;
    });
    element.querySelector(".plus").addEventListener("click", function() {
      number.value = parseInt(number.value) + 1;
    });
  });
  forms.forEach((containerForm) => {
    containerForm.classList.add("js-running");
    let btnCloseFeedback = document.querySelectorAll("[data-close-feedback]");
    btnCloseFeedback.forEach((element) => {
      element.addEventListener("click", function() {
        document.body.dataset.formCartState = "leave";
        setTimeout(() => {
          document.body.dataset.formCartState = "";
        }, 1e3);
      });
    });
    containerForm.querySelector("form").addEventListener("submit", function(e) {
      e.preventDefault();
      {
        document.body.dataset.formCartState = "success";
        let area = document.querySelector("[data-feedback-area]");
        document.addEventListener("click", function(e2) {
          if (e2.target !== area) {
            document.body.dataset.formCartState = "leave";
            setTimeout(() => {
              document.body.dataset.formCartState = "";
            }, 1e3);
          }
        }, { once: true });
      }
      document.addEventListener("pjax:switch", function() {
        document.body.dataset.formCartState = "";
      }, { once: true });
    });
  });
}
formCart();
document.addEventListener("pjax:complete", formCart);
