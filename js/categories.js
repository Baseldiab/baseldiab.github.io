class Categories {
  constructor() {
    this.apiUrl = "https://fakestoreapi.com/";
  }
  // =========================================================================
  getAllCategories() {
    fetch(this.apiUrl + "products/categories")
      .then((res) => res.json())
      .then(function (data) {
        $(data).each(function (index, category) {
          // ===========================================
          // category dropdown in navbar
          $(".categories__navbar").append(
            "<li category__list><a " +
              'class="dropdown-item  category_dropdown"' +
              'href="/category.html?category=' +
              encodeURIComponent(category) +
              // '"onclick="filterProduct(' +
              // category +
              ' ">' +
              toTitleCase(category) +
              "</a></li>"
          );
          // ===========================================
          // button to each category
          $(".categories").append(
            '<a type="button" ' +
              'class="btn col- btn-outline-danger fw-bold mx-2 my-2 ' +
              category +
              ' category-button"' +
              "data-cat=." +
              category.slice(0, 3) +
              "" +
              ">" +
              toTitleCase(category) +
              "</a>"
          );
          // ===========================================
          // show electronics product
          $(".category-button:first").addClass("active");

          // ===========================================
          // filter products to category
          $(".category-button").click(function () {
            $(".category-button").each((i, btn) => {
              // Add and remove class active to button
              if ($(this).text().toUpperCase()) {
                $(btn).removeClass("active");
                $(this).addClass("active");
              }
            });
          });
          // ==============================================
          // Manage cards
          $(".category-button").click(function manageCards() {
            // ===============================
            // hide all products
            $(".all").each((i, card) => {
              $(card).addClass("hide");
            });
            // ===============================
            // view product to category
            console.log($(this).attr("data-cat"));
            let cat = $($(this).attr("data-cat"));
            cat.each((i, el) => {
              $(el).removeClass("hide");
            });
          });
          // ===========================================

          // ===========================================
        });
      });
  }
  // =========================================================================
  getSingleCategory(slug) {
    fetch(this.apiUrl + "products/category/" + slug)
      .then((res) => res.json())
      .then(function (data) {
        $(data).each(function (index, product) {
          // ====================================
          // category name
          $(".category-name").html(toTitleCase(product.category));
          // ====================================
          // home link and name of category page
          $(".breadcrumb").html(
            '<a class="link-danger link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover" href="/">Home</a> <span> >></span>' +
              toTitleCase(product.category)
          );
          // ====================================
          // products card
          $(".products").append(
            '<div  class="col mx-auto cards products__' +
              product.category +
              '"><div class="card products__card"><a class="text-decoration-none position-relative h-50 w-100" href="../product.html?productid=' +
              encodeURIComponent(product.id) +
              '">' +
              ' <img class="card-img-top position-absolute top-50 start-50 translate-middle products__img " src = " ' +
              product.image +
              '" alt =' +
              product.title +
              ' > </img ></a><div class="d-flex justify-content-center align-items-center" ><a class="text-decoration-none" href="../product.html? productid=' +
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
              '</p></div> </a><div class=" d-flex justify-content-center align-items-center my-0 my-md-3 text-center products__buttons"><button class="btn btn-success mx-2 my-md-1 my-0 product__button">' +
              "Add To Cart </button>" +
              '<button class="btn btn-primary my-md-1 my-0 mx-2 product__button">' +
              " Add To Wishlist " +
              '</button></div><div class="card-footer position-absolute bottom-0  w-100 text-center">' +
              '<small class="text-body-secondary">Last updated 3 days ago</small></div></div></div>'
          );
        });
      });
  }
}
