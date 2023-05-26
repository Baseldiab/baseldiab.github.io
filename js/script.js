// =========================================
$(function () {
  loadScript("js/categories.js", categoriesSetUp);
  loadScript("js/products.js", productsSetUp);
});
// =========================================
$.get("../template/navigation.html", function (data) {
  $("#navigation-placeholder").replaceWith(data);
});
// =========================================
$.get("../template/footer.html", function (data) {
  $("#footer-placeholder").replaceWith(data);
});
// =========================================
const productsSetUp = function () {
  let products = new Products();

  if ($(".new-products").length) {
    products.getNewProduct(6);
  }
  products.getAllProduct();

  if (urlParam("productid")) {
    products.getSingleProduct(urlParam("productid"));
  }
};
// =========================================
const categoriesSetUp = function () {
  let categories = new Categories();

  categories.getAllCategories();

  if (decodeURIComponent(urlParam("category"))) {
    categories.getSingleCategory(decodeURIComponent(urlParam("category")));
  }
};

// =========================================
function loadScript(url, callback) {
  var head = document.head;
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.src = url;
  script.onreadystatechange = callback;
  script.onload = callback;
  head.appendChild(script);
}
// =========================================
function toTitleCase(str) {
  return str.replace(/(?:^|\s)\w/g, function (match) {
    return match.toUpperCase();
  });
}
// =========================================
function urlParam(name) {
  var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
    window.location.href
  );
  if (results == null) {
    return null;
  } else {
    return results[1] || 0;
  }
}

// =========================================

//===================================

// =========================================
