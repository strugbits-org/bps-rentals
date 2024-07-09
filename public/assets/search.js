function Search() {
  let containers = document.querySelectorAll("[data-search-container]:not(.js-running)");
  containers.forEach((container) => {
    container.classList.add("js-running");
    let forms = container.querySelectorAll("[data-search-form]");
    forms.forEach((form) => {
      form.addEventListener("submit", function(e) {
        e.preventDefault();
        {
          container.dataset.searchState = "success";
        }
      });
    });
  });
}
Search();
