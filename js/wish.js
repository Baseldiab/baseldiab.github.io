class Wish {
  constructor() {
    this.apiUrl = "https://fakestoreapi.com/";
  }
  // =========================================================================
  getProductToWish() {
    fetch(this.apiUrl + "products")
      .then((res) => res.json())
      .then(function (data) {
        const items = readFromStorage("wish");
        let cartProducts = [];
        for (let i = 0; i < items.length; i++) {
          const item = data.filter((product, index) => product.id == items[i]);
          cartProducts.push(item);
        }
        // console.log(cartProducts);
        $(cartProducts).each(function (i, product) {
          const count = i + 1;
          $(".wish__content").append(
            '<tr id="' +
              product[0].id +
              '"><th scope="row">' +
              count +
              '</th><td class= "fs-6 w-50" >' +
              product[0].title +
              '</td><td class="text-danger fw-bold my-auto">' +
              " $" +
              product[0].price.toFixed(2) +
              "</td>" +
              "<td> " +
              '<div class="d-flex justify-content-center align-items-center ' +
              ' text-center products__buttons"> ' +
              '<button id="cart__closeButton" class="btn btn-danger mx-2  product__button" onclick="deleteWishElement(' +
              (product[0].id, i) +
              ')"> ' +
              '<i class="fa-solid fa-xmark"></i></button>' +
              '<button class="btn btn-success mx-2 my-md-1 my-0 product__button cart-button" onclick="addToCart(' +
              product[0].id +
              ', this)">' +
              '<i class="fa-solid fa-cart-plus"></i></button></div> </td></tr>'
          );
        });
        // ===================================================
      });
  }

  // ====================================================================================
}
