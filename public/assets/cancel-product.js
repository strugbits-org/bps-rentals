function cancelProduct() {
  let listCartItem = document.querySelectorAll(".list-cart-product .list-item:not(.js-running-cancel-product)");
  listCartItem.forEach((element) => {
    element.classList.add("js-running-cancel-product");
    let btnCancel = element.querySelector(".btn-cancel");
    btnCancel.addEventListener("click", function() {
      element.classList.add("fadeOutCancel");
      setTimeout(() => {
        element.classList.add("d-none");
      }, 400);
    });
  });
}
cancelProduct();
document.addEventListener("pjax:complete", cancelProduct);
