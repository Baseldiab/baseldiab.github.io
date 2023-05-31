class Cart {
  constructor() {
    this.apiUrl = "https://fakestoreapi.com/";
  }
  // =========================================================================
  getProductToCart() {
    fetch(this.apiUrl + "products")
      .then((res) => res.json())
      .then(function (data) {
        const items = readFromStorage("cart");
        let cartProducts = [];
        let totalPrice = 0;
        for (let i = 0; i < items.length; i++) {
          const item = data.filter((product, index) => product.id == items[i]);
          cartProducts.push(item);
        }
        // console.log(cartProducts);
        $(cartProducts).each(function (i, product) {
          const count = i + 1;

          $(".cart__content").append(
            '<tr id="' +
              product[0].id +
              '"><th scope="row">' +
              count +
              '</th><td class= "fs-6 w-50" >' +
              product[0].title +
              '</td><td class="text-danger fw-bold my-auto">' +
              " $" +
              product[0].price +
              '</td><td class= "quantity"><i class="fa-solid fa-plus cart__plus" data-idPlus =.' +
              product[0].id +
              '></i><span class="cart__box d-inline-block mx-2 border rounded border-danger bg-danger text-light text-center  ' +
              product[0].id +
              '">0' +
              '</span><i class="fa-solid fa-minus cart__minus" data-idMinus=.' +
              product[0].id +
              " ></i></td> " +
              "</td><td> " +
              '<div class="d-flex justify-content-center align-items-center ' +
              ' text-center products__buttons"> ' +
              '<button id="cart__closeButton" class="btn btn-danger mx-2  product__button" onclick="deleteElement(' +
              (product[0].id, i) +
              ')"> ' +
              '<i class="fa-solid fa-xmark"></i></button>' +
              '<button id="wish-button" class="btn btn-primary  mx-2 product__button ">' +
              ' <i class="fa-solid fa-heart"></i> ' +
              "</button></div> </td></tr>"
          );

          // ===================================================
          // Total price
          totalPrice += product[0].price;
        });
        // ===================================================
        // Calculate total price
        $(".cart__total-Price").html(totalPrice);

        // ===================================================
        // add one more quantity of any cart product
        $(".cart__plus").click(function () {
          if ($(this).attr("data-idPlus")) {
            quant++;
            let idPlus = $($(this).attr("data-idPlus"));
            idPlus.each((i, el) => {
              $(el).html(Math.abs(quant));
            });
          }
        });
        // ===================================================
        // minus one more quantity of any cart product
        $(".cart__minus").click(function () {
          if ($(this).attr("data-idMinus")) {
            if (!quant > 0) {
              quant = 0;
            } else {
              quant--;
              let idMinus = $($(this).attr("data-idMinus"));
              idMinus.each((i, el) => {
                $(el).html(Math.abs(quant));
              });
            }
          }
        });
        // ====================================================
        // number of cart product in the navbar
        $("#cartCount").html(cartProducts.length);
      });
  }

  // =========================================================================
  getCartItems() {}
  // ====================================================================================
}
