import UtilService from "../utils";

const utilService = new UtilService();

class ProductDetail {
  constructor() {}

  getProduct() {
    const productId = utilService.getQueryParams().get("id");
    const productName = utilService.getQueryParams().get("name");
    const products = utilService.getLocalProduct();

    if (products) {
      const index = products.findIndex(
        (item) => item.id === parseInt(productId)
      );

      console.log("index 0: ", index);

      if (index !== -1) {
        const product = products[index];
        console.log("product: ", product);
        document
          .querySelector("#thumbnamil-1")
          .setAttribute("data-src", product.mainImageUrl);
        $("#thumbnamil-1")
          .attr("data-src", product.mainImageUrl)
          .attr("data-bgset", product.mainImageUrl)
          .attr("data-cap", product.name)
          .attr("style", `background-size: cover !important;`);
        $(".sticky_atc_thumb img")
          .attr("src", product.mainImageUrl)
          .attr("data-src", product.mainImageUrl);
        $(".sticky_atc_info h4").text(product.name);
        $(".product_title").text(product.name);

        $(".price_range, .sticky_atc_price").text(
          `NGN ${utilService.formatAsMoney(product.finalPrice)}`
        );

        $(".breadcrumb-product").text(product.name);
        $(".breadcrumb-category").text(product.category.name);

        $(".product_meta .posted_in").append(`
        <a href="#" class="cg">${product.category.name}</a
        >
        `);

        $(".desc").text(product.description);

        if (product.otherImage1) {
          $("#thumbnamil-2")
            .attr("data-src", product.otherImage1)
            .attr("data-bgset", product.otherImage1)
            .attr(
              "style",
              `background-image: url(${product.otherImage1}) !important;`
            );
          $("#small-thumbnail-2 span")
            .attr("data-bgset", product.otherImage1)
            .attr(
              "style",
              `background-image: url(${product.otherImage1}) !important`
            );
        } else {
          $("#thumbnamil-2").remove();
          $("#small-thumbnail-2").remove();
        }
        if (product.otherImage2) {
          $("#thumbnamil-3")
            .attr("data-src", product.otherImage2)
            .attr("data-bgset", product.otherImage2)
            .attr(
              "style",
              `background-image: url(${product.otherImage2}) !important;`
            );
          $("#small-thumbnail-3 span")
            .attr("data-bgset", product.otherImage2)
            .attr(
              "style",
              `background-image: url(${product.otherImage2}) !important`
            );
        } else {
          $("#thumbnamil-3").remove();
          $(`#small-thumbnail-3`).remove();
        }
        if (product.otherImage3) {
          $("#thumbnamil-4")
            .attr("data-src", product.otherImage3)
            .attr("data-bgset", product.otherImage3)
            .attr(
              "style",
              `background-image: url(${product.otherImage3}) !important;`
            );
          $("#small-thumbnail-2 span")
            .attr("data-bgset", product.otherImage3)
            .attr(
              "style",
              `background-image: url(${product.otherImage3}) !important`
            );
        } else {
          $("#thumbnamil-4").remove();
          $(`#small-thumbnail-4`).remove();
        }

        if (product.otherImage4) {
          $("#thumbnamil-5")
            .attr("data-src", product.otherImage4)
            .attr("data-bgset", product.otherImage4)
            .attr(
              "style",
              `background-image: url(${product.otherImage4}) !important;`
            );
          $("#small-thumbnail-2 span")
            .attr("data-bgset", product.otherImage4)
            .attr(
              "style",
              `background-image: url(${product.otherImage4}) !important`
            );
        } else {
          $("#thumbnamil-5").remove();
          $(`#small-thumbnail-5`).remove();
        }
      }
    }
  }
  run() {
    this.getProduct();
  }
}

export default ProductDetail;
