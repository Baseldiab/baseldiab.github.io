// =========================================
$(function () {
  loadScript("js/categories.js", categoriesSetUp);
  loadScript("js/products.js", productsInfo);
  loadScript("js/cart.js", cartInfo);
  loadScript("js/wish.js", wishInfo);
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
const productsInfo = function () {
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
const cartInfo = function () {
  let cart = new Cart();
  cart.getProductToCart();
};
// =========================================
const wishInfo = function () {
  let wish = new Wish();
  wish.getProductToWish();
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

// ===============================CART FUNCTIONS=================================
let productsArray = [];
let quant = 1;
// =========================================
function minusQuantity() {
  $(".cart__box").html(Math.abs(quant));
}
// =========================================
const readFromStorage = (key = `products`) =>
  JSON.parse(localStorage.getItem(key)) || [];
//===================================
const writeToStorage = (data, key = `products`) =>
  localStorage.setItem(key, JSON.stringify(data));
// =========================================
// remove item product cart
function deleteCartElement(id, i) {
  $("#" + id).remove();
  let all = readFromStorage("cart");
  all.splice(i, 1);
  writeToStorage(all, "cart");
  location.reload();
}
// =================================
function addToCart(id, ele) {
  // alert(id);
  console.log(id);
  productsArray.push(id);
  writeToStorage(productsArray, "cart");
  const myCart = readFromStorage("cart");
  $("#cartCount").html(myCart.length);
  $(ele).attr("disabled", "disabled");
}
// =================================
// ===============================WISH FUNCTIONS=================================
// =========================================
// remove item product cart
function deleteWishElement(id, i) {
  $("#" + id).remove();
  let all = readFromStorage("wish");
  all.splice(i, 1);
  writeToStorage(all, "wish");
  location.reload();
}
// =================================
function addToWish(id, ele) {
  // alert(id);
  console.log(id);
  productsArray.push(id);
  writeToStorage(productsArray, "wish");
  $(ele).attr("disabled", "disabled");
}
// =================================
