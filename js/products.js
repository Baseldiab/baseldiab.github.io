class Products {
  constructor() {
    this.apiUrl = "https://fakestoreapi.com/";
  }
  // =========================================================================
  getNewProduct(limit) {
    fetch(this.apiUrl + "products?limit=" + limit)
      .then((res) => res.json())
      .then(function (data) {
        $(data).each(function (index, product) {
          // ====================================
          // add newest products
          $(".new-products").append(
            '<div  class="col mx-auto cards   products__' +
              product.category +
              '"><div class="card products__card border-0 "><a class="text-decoration-none position-relative h-50 w-100" href="/product.html?productid=' +
              encodeURIComponent(product.id) +
              '">' +
              ' <img class="card-img-top position-absolute top-50 start-50 translate-middle products__img " src = " ' +
              product.image +
              '" alt =' +
              product.title +
              ' > </img ></a><div class="d-flex justify-content-center align-items-center" ><a class="text-decoration-none" href="../product.html?productid=' +
              encodeURIComponent(product.id) +
              '">' +
              '<h5 class="card-title text-center fs-5 fw-bold text-dark mt-md-2 mt-0" > ' +
              product.title +
              "</h5 >" +
              "<p class=' card-text text-secondary text-center mb-0 mb-md-2' >" +
              product.category +
              "</p >" +
              "<p class=' card-text text-danger text-center ' > <span>$</span> " +
              product.price.toFixed(2) +
              '</p></div> </a><div class=" d-flex justify-content-center align-items-center my-0 my-md-3 text-center products__buttons"><button class="btn btn-success mx-2 my-md-1 my-0 product__button cart-button" onclick="addToCart(' +
              product.id +
              ', this)">' +
              "Add To Cart </button>" +
              '<button class="btn btn-primary my-md-1 my-0 mx-2 product__button wish-button"  onclick="addToWish('+product.id+',this)">' +
              " Add To Wishlist " +
              '</button></div><div class="card-footer border  position-absolute bottom-0  w-100 text-center">' +
              '<small class="text-body-secondary ">Last updated 3 days ago</small></div></div></div>'
          );
          // ====================================
          // add product to localStorage
        });
      });
  }
  // =========================================================================
  getAllProduct() {
    fetch(this.apiUrl + "products")
      .then((res) => res.json())
      .then(function (data) {
        $(data).each(function (index, product) {
          // ==============================================
          // products card
          $(".bestsellers__products").append(
            '<div class="col mx-auto all ' +
              product.category.slice(0, 3) +
              '"><div class="card products__card"><a class="text-decoration-none position-relative h-50 w-100 text-center h-50 " href="../product.html?productid=' +
              encodeURIComponent(product.id) +
              '">' +
              ' <img class="card-img-top  products__img position-absolute top-50 start-50 translate-middle" src = " ' +
              product.image +
              '" alt =' +
              product.title +
              ' > </img ></a><div class="d-flex justify-content-center align-items-center" ><a class="text-decoration-none" href="../product.html?productid=' +
              encodeURIComponent(product.id) +
              '">' +
              '<h5 class="card-title text-center fs-5 fw-bold text-dark mt-md-2 mt-0" > ' +
              product.title +
              "</h5 >" +
              "<p class=' card-text text-secondary text-center mb-0 mb-md-2' >" +
              product.category +
              "</p >" +
              "<p class=' card-text text-danger text-center ' > <span>$</span> " +
              product.price.toFixed(2) +
              '</p></div> </a><div class=" d-flex justify-content-center align-items-center my-0 my-md-3 text-center products__buttons"><button class="btn btn-success mx-2 my-md-1 my-0 product__button cart-button" onclick="addToCart(' +
              product.id +
              ', this)">' +
              "Add To Cart </button>" +
              '<button class="btn btn-primary my-md-1 my-0 mx-2 product__button wish-button" onclick="addToWish('+product.id+',this)">' +
              " Add To Wishlist " +
              '</button></div><div class="card-footer position-absolute bottom-0  w-100 text-center">' +
              '<small class="text-body-secondary">Last updated 3 days ago</small></div></div></div>'
          );
          // show electronics product
          $(".all").addClass("hide");
          $(".ele").removeClass("hide");
        });
      });
  }

  // ====================================================================================
  getSingleProduct(id) {
    $.ajax({
      type: "GET",
      url: this.apiUrl + "products/" + id,
      success: function (data) {
        $(".category-name").html(toTitleCase(data.category));
        // ====================================
        $(".breadcrumb").append(
          '<a class="link-danger link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="/">Home</a> <span> >></span>' +
            toTitleCase(data.category)
        );
        // ====================================
        $(".singleProduct__image").append(
          "<img src=" +
            data.image +
            ' class="img-fluid rounded-start singleProduct__img " alt="' +
            data.title +
            ' image">'
        );
        // ====================================
        $(".singleProduct__title").html(data.title);
        // ====================================
        $(".singleProduct__description").html(data.description);
        // ====================================
        $(".singleProduct__price").html("$" + data.price.toFixed(2));
        // ====================================
        // add product to localStorage
        $(".cart-button").click(function () {
          const allCarts = readFromStorage("products");
          allCarts.push(data);
          writeToStorage(allCarts, "products");
        });
      },
    });
  }
  // ====================================================================================
}
