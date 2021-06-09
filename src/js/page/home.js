import UtilService from "../utils";
import HttpService from "../httpService";

class HomePageService {
  constructor() {
    this.httpService = new HttpService();
    this.utilService = new UtilService();
  }
  setUpEvents() {
    const $this = this;
    $("[data-quickview]").on("click", function (e) {
      const homeProducts = $this.utilService.getLocalProduct();
      console.log(homeProducts);
      const productId = $(this).data("quickview");
      if (homeProducts) {
        const index = homeProducts.findIndex((item) => item.id === productId);
        const product = homeProducts[index];
        console.log("product: ", product);
        $("#quickview-images-detail").empty();
        $("#quikview-product-name").text(product.name);
        $("#quikview-product-name").attr(
          "href",
          `product-detail-layout-01.html?id=${product.id}&name=${product.name}`
        );
        $("#quickview-final-price").text(
          `NGN ${$this.utilService.formatAsMoney(product.finalPrice)}`
        );
        $("#quickview-selling-price").text(
          `NGN ${$this.utilService.formatAsMoney(product.sellingPrice)}`
        );

        $("#quickview-product-meta div").empty();

        $("#quickview-product-meta div").append(`
              <a
              href="shop-filter-options.html"
              class="cg"
              title="Accessories"
              >${product?.category.name}</a
            >
              `);
        // document
        //   .querySelector("#quickview-addtocart")
        //   .setAttribute("data-quickviewaddtocart", product.id);
        $(".single_add_to_cart_button").attr(
          "data-quickviewaddtocart",
          product.id
        );

        $(".quickshop-images")
          .attr(
            "style",
            `background-image: url(${product.mainImageUrl}) !important`
          )
          .attr("data-bgset", `${product.mainImageUrl}`);

        $(".quickshop-product-name")
          .text(product.name)
          .attr(
            "href",
            `product-detail-layout-01.html?id=${product.id}&name=${product.name}`
          );

        $("#price_qs del").text(
          `NGN ${$this.utilService.formatAsMoney(product.sellingPrice)}`
        );
        $("#price_qs ins").text(
          `NGN ${$this.utilService.formatAsMoney(product.finalPrice)}`
        );

        if (parseInt(product.finalPrice) < parseInt(product.sellingPrice)) {
          $(".qs_label.onsale.cw").text(
            `-${Math.round(
              ((product.sellingPrice - product.finalPrice) /
                product.sellingPrice) *
                100
            )}%`
          );
          $("#quickview-product-detail").append(`
              <span class="tc nt_labels pa pe_none cw"
              ><span class="onsale nt_label"><span>-${Math.round(
                ((product.sellingPrice - product.finalPrice) /
                  product.sellingPrice) *
                  100
              )}%</span></span></span
            >
              `);
        } else {
          $(".qs_label.onsale.cw").remove();
          // $("#quickview-product-detail").remove();
          $("#quickview-product-detail .tc.nt_labels.pa.pe_none.cw").remove();
        }

        $(".detail_link").attr(
          "href",
          `product-detail-layout-01.html?id=${product.id}&name=${product.name}`
        );

        // document.querySelector('#quickview-addtocart2').setAttribute("data-quickviewaddtoCart", product.id)
        $("#quickview-product-meta div").append(`
            <div>
            <a
            id="quickview-product-link"
            href="product-detail-layout-01.html?id=${product.id}&name=${product.name}"
            class="btn fwsb detail_link p-0 fs__14"
            >View full details<i class="facl facl-right"></i
          ></a>
          </div>
            `);
        $("#quickview-description").text(product.description);

        $("#quickview-images-detail").append(`
            <div
            data-grname="not4"
            data-grpvl="ntt4"
            class="js-sl-item q-item sp-pr-gallery__img w__100"
            data-mdtype="image"
          >
            <span
              class="nt_bg_lz lazyload"
              style="background-image: url(${product.mainImageUrl}) !important; background-size: cover !important"
              data-bgset="${product.mainImageUrl}"
            ></span>
          </div>
            `);
        if (product.otherImage1) {
          $("#quickview-images-detail").append(`
            <div
            data-grname="not4"
            data-grpvl="ntt4"
            class="js-sl-item q-item sp-pr-gallery__img w__100"
            data-mdtype="image"
          >
            <span
              class="nt_bg_lz lazyload"
              style="background-image: url(${product.otherImage1}) !important; background-size: cover !important"
              data-bgset="${product.otherImage1}"
            ></span>
          </div>
            `);
        }
        if (product.otherImage2) {
          $("#quickview-images-detail").append(`
            <div
            data-grname="not4"
            data-grpvl="ntt4"
            class="js-sl-item q-item sp-pr-gallery__img w__100"
            data-mdtype="image"
          >
            <span
              class="nt_bg_lz lazyload"
              style="background-image: url(${product.otherImage2}) !important; background-size: cover !important"
              data-bgset="${product.otherImage2}"
            ></span>
          </div>
            `);
        }
        if (product.otherImage3) {
          $("#quickview-images-detail").append(`
            <div
            data-grname="not4"
            data-grpvl="ntt4"
            class="js-sl-item q-item sp-pr-gallery__img w__100"
            data-mdtype="image"
          >
            <span
              class="nt_bg_lz lazyload"
              style="background-image: url(${product.otherImage3}) !important; background-size: cover !important"
              data-bgset="${product.otherImage3}"
            ></span>
          </div>
            `);
        }
        if (product.otherImage4) {
          $("#quickview-images-detail").append(`
            <div
            data-grname="not4"
            data-grpvl="ntt4"
            class="js-sl-item q-item sp-pr-gallery__img w__100"
            data-mdtype="image"
          >
            <span
              class="nt_bg_lz lazyload"
              style="background-image: url(${product.otherImage4}) !important; background-size: cover !important"
              data-bgset="${product.otherImage4}"
            ></span>
          </div>
            `);
        }
      }
    });
  }
  async getHomeProducts() {
    try {
      const { data } = await this.httpService.getResource(
        "/product/get-homepage-products"
      );
      this.utilService.loadProduct(data);

      const products = data
        .map((item) => {
          // check for discount
          if (parseInt(item.finalPrice) < parseInt(item.sellingPrice)) {
            return `
                 
                 <div
                    class="
                      col-lg-3 col-md-3 col-6
                      pr_animated
                      done
                      mt__30
                      pr_grid_item
                      product
                      nt_pr
                      desgin__1
                    "
                  >
                    <div class="product-inner pr">
                      <div class="product-image position-relative oh lazyload">
                        <span class="tc nt_labels pa pe_none cw">
                          <span class="onsale nt_label">
                            <span>-${Math.round(
                              ((item.sellingPrice - item.finalPrice) /
                                item.sellingPrice) *
                                100
                            )}%</span>
                          </span>
                        </span>
                        <a class="d-block" href="product-detail-layout-01.html?id=${
                          item.id
                        }&name=${item.name}">
                          <div
                            class="
                              pr_lazy_img
                              main-img
                              nt_img_ratio nt_bg_lz
                              lazyload
                              padding-top__127_571
                            "
                            data-bgset="${item.mainImageUrl}"
                            style="background-image: url(${
                              item.mainImageUrl
                            }) !important"
                          ></div>
                        </a>
                        <div class="hover_img pa pe_none t__0 l__0 r__0 b__0 op__0">
                          <div
                            class="
                              pr_lazy_img
                              back-img
                              pa
                              nt_bg_lz
                              lazyload
                              padding-top__127_571
                            "
                            data-bgset="${item.mainImageUrl}"
                          ></div>
                        </div>
                        <div class="nt_add_w ts__03 pa">
                          <a
                            href="#"
                            class="wishlistadd cb chp ttip_nt tooltip_right"
                          >
                            <span class="tt_txt">Add to Wishlist</span>
                            <i class="facl facl-heart-o"></i>
                          </a>
                        </div>
                        <div class="hover_button op__0 tc pa flex column ts__03">
                          <a
                          data-quickview="${item.id}"
                            class="
                              pr
                              nt_add_qv
                              js_add_qv
                              cd
                              br__40
                              pl__25
                              pr__25
                              bgw
                              tc
                              dib
                              ttip_nt
                              tooltip_top_left
                            "
                            href="#"
                          >
                            <span class="tt_txt">Quick view</span>
                            <i class="iccl iccl-eye"></i>
                            <span>Quick view</span>
                          </a>
                          <a
                          data-quickview="${item.id}"
                            href="#"
                            class="
                              pr pr_atc
                              cd
                              br__40
                              bgw
                              tc
                              dib
                              js__qs
                              cb
                              chp
                              ttip_nt
                              tooltip_top_left
                            "
                          >
                            <span class="tt_txt">Quick Shop</span>
                            <i class="iccl iccl-cart"></i>
                            <span>Quick Shop</span>
                          </a>
                        </div>
                        
                      </div>
                      <div class="product-info mt__15">
                        <h3
                          class="product-title position-relative fs__14 mg__0 fwm"
                        >
                          <a class="cd chp" href="product-detail-layout-01.html"
                            >${item.name}</a
                          >
                        </h3>
                        <span class="price dib mb__5">
                          <del>NGN ${item.sellingPrice.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}</del>
                          <ins>NGN ${item.finalPrice.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}</ins>
                        </span>
                        
                      </div>
                    </div>
                  </div>
                 `;
          }
          return `
                 
                 <div
                    class="
                      col-lg-3 col-md-3 col-6
                      pr_animated
                      done
                      mt__30
                      pr_grid_item
                      product
                      nt_pr
                      desgin__1
                    "
                  >
                    <div class="product-inner pr">
                      <div class="product-image position-relative oh lazyload">
                        
                        <a class="d-block" href="product-detail-layout-01.html?id=${
                          item.id
                        }&name=${item.name}">
                          <div
                            class="
                              pr_lazy_img
                              main-img
                              nt_img_ratio nt_bg_lz
                              lazyload
                              padding-top__127_571
                            "
                            data-bgset="${item.mainImageUrl}"
                            style="background-image: url(${
                              item.mainImageUrl
                            }) !important"
                          ></div>
                        </a>
                        <div class="hover_img pa pe_none t__0 l__0 r__0 b__0 op__0">
                          <div
                            class="
                              pr_lazy_img
                              back-img
                              pa
                              nt_bg_lz
                              lazyload
                              padding-top__127_571
                            "
                            data-bgset="${item.mainImageUrl}"
                          ></div>
                        </div>
                        <div class="nt_add_w ts__03 pa">
                          <a
                            href="#"
                            class="wishlistadd cb chp ttip_nt tooltip_right"
                          >
                            <span class="tt_txt">Add to Wishlist</span>
                            <i class="facl facl-heart-o"></i>
                          </a>
                        </div>
                        <div class="hover_button op__0 tc pa flex column ts__03">
                          <a
                            data-quickview="${item.id}"
                            class="
                              pr
                              nt_add_qv
                              js_add_qv
                              cd
                              br__40
                              pl__25
                              pr__25
                              bgw
                              tc
                              dib
                              ttip_nt
                              tooltip_top_left
                            "
                            href="#"
                          >
                            <span class="tt_txt">Quick view</span>
                            <i class="iccl iccl-eye"></i>
                            <span>Quick view</span>
                          </a>
                          <a
                          data-quickview="${item.id}"
                            href="#"
                            class="
                              pr pr_atc
                              cd
                              br__40
                              bgw
                              tc
                              dib
                              js__qs
                              cb
                              chp
                              ttip_nt
                              tooltip_top_left
                            "
                          >
                            <span class="tt_txt">Quick Shop</span>
                            <i class="iccl iccl-cart"></i>
                            <span>Quick Shop</span>
                          </a>
                        </div>
                        
                      </div>
                      <div class="product-info mt__15">
                        <h3
                          class="product-title position-relative fs__14 mg__0 fwm"
                        >
                          <a class="cd chp" href="product-detail-layout-01.html"
                            >${item.name}</a
                          >
                        </h3>
                        <span class="price dib mb__5">
                          <del>NGN ${item.sellingPrice.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}</del>
                          <ins>NGN ${item.finalPrice.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}</ins>
                        </span>
                        
                      </div>
                    </div>
                  </div>
                 `;
        })
        .join("");
      $("#product-home").append(products);
      this.setUpEvents();
    } catch (error) {
      console.log("errors is : ", error);
    }
  }

  async getFeaturedProducts() {
    const { data } = await this.httpService.getResource(
      "/product/get-featured-products"
    );

    this.utilService.loadProduct(data);

    const products = data
      .map((item) => {
        // check for discount
        if (parseInt(item.finalPrice) < parseInt(item.sellingPrice)) {
          return `
                 
                 <div
                    class="
                      col-lg-3 col-md-3 col-6
                      pr_animated
                      done
                      mt__30
                      pr_grid_item
                      product
                      nt_pr
                      desgin__1
                    "
                  >
                    <div class="product-inner pr">
                      <div class="product-image position-relative oh lazyload">
                        <span class="tc nt_labels pa pe_none cw">
                          <span class="onsale nt_label">
                            <span>-${Math.round(
                              ((item.sellingPrice - item.finalPrice) /
                                item.sellingPrice) *
                                100
                            )}%</span>
                          </span>
                        </span>
                        <a class="d-block" href="product-detail-layout-01.html?id=${
                          item.id
                        }&name=${item.name}">
                          <div
                            class="
                              pr_lazy_img
                              main-img
                              nt_img_ratio nt_bg_lz
                              lazyload
                              padding-top__127_571
                            "
                            data-bgset="${item.mainImageUrl}"
                            style="background-image: url(${
                              item.mainImageUrl
                            }) !important"
                          ></div>
                        </a>
                        <div class="hover_img pa pe_none t__0 l__0 r__0 b__0 op__0">
                          <div
                            class="
                              pr_lazy_img
                              back-img
                              pa
                              nt_bg_lz
                              lazyload
                              padding-top__127_571
                            "
                            data-bgset="${item.mainImageUrl}"
                          ></div>
                        </div>
                        <div class="nt_add_w ts__03 pa">
                          <a
                            href="#"
                            class="wishlistadd cb chp ttip_nt tooltip_right"
                          >
                            <span class="tt_txt">Add to Wishlist</span>
                            <i class="facl facl-heart-o"></i>
                          </a>
                        </div>
                        <div class="hover_button op__0 tc pa flex column ts__03">
                          <a
                          data-quickview="${item.id}"
                            class="
                              pr
                              nt_add_qv
                              js_add_qv
                              cd
                              br__40
                              pl__25
                              pr__25
                              bgw
                              tc
                              dib
                              ttip_nt
                              tooltip_top_left
                            "
                            href="#"
                          >
                            <span class="tt_txt">Quick view</span>
                            <i class="iccl iccl-eye"></i>
                            <span>Quick view</span>
                          </a>
                          <a
                          data-quickview="${item.id}"
                            href="#"
                            class="
                              pr pr_atc
                              cd
                              br__40
                              bgw
                              tc
                              dib
                              js__qs
                              cb
                              chp
                              ttip_nt
                              tooltip_top_left
                            "
                          >
                            <span class="tt_txt">Quick Shop</span>
                            <i class="iccl iccl-cart"></i>
                            <span>Quick Shop</span>
                          </a>
                        </div>
                        
                      </div>
                      <div class="product-info mt__15">
                        <h3
                          class="product-title position-relative fs__14 mg__0 fwm"
                        >
                          <a class="cd chp" href="product-detail-layout-01.html"
                            >${item.name}</a
                          >
                        </h3>
                        <span class="price dib mb__5">
                          <del>NGN ${item.sellingPrice.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}</del>
                          <ins>NGN ${item.finalPrice.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}</ins>
                        </span>
                        
                      </div>
                    </div>
                  </div>
                 `;
        }
        return `
                 
                 <div
                    class="
                      col-lg-3 col-md-3 col-6
                      pr_animated
                      done
                      mt__30
                      pr_grid_item
                      product
                      nt_pr
                      desgin__1
                    "
                  >
                    <div class="product-inner pr">
                      <div class="product-image position-relative oh lazyload">
                        
                        <a class="d-block" href="product-detail-layout-01.html?id=${
                          item.id
                        }&name=${item.name}">
                          <div
                            class="
                              pr_lazy_img
                              main-img
                              nt_img_ratio nt_bg_lz
                              lazyload
                              padding-top__127_571
                            "
                            data-bgset="${item.mainImageUrl}"
                            style="background-image: url(${
                              item.mainImageUrl
                            }) !important"
                          ></div>
                        </a>
                        <div class="hover_img pa pe_none t__0 l__0 r__0 b__0 op__0">
                          <div
                            class="
                              pr_lazy_img
                              back-img
                              pa
                              nt_bg_lz
                              lazyload
                              padding-top__127_571
                            "
                            data-bgset="${item.mainImageUrl}"
                          ></div>
                        </div>
                        <div class="nt_add_w ts__03 pa">
                          <a
                            href="#"
                            class="wishlistadd cb chp ttip_nt tooltip_right"
                          >
                            <span class="tt_txt">Add to Wishlist</span>
                            <i class="facl facl-heart-o"></i>
                          </a>
                        </div>
                        <div class="hover_button op__0 tc pa flex column ts__03">
                          <a
                            data-quickview="${item.id}"
                            class="
                              pr
                              nt_add_qv
                              js_add_qv
                              cd
                              br__40
                              pl__25
                              pr__25
                              bgw
                              tc
                              dib
                              ttip_nt
                              tooltip_top_left
                            "
                            href="#"
                          >
                            <span class="tt_txt">Quick view</span>
                            <i class="iccl iccl-eye"></i>
                            <span>Quick view</span>
                          </a>
                          <a
                          data-quickview="${item.id}"
                            href="#"
                            class="
                              pr pr_atc
                              cd
                              br__40
                              bgw
                              tc
                              dib
                              js__qs
                              cb
                              chp
                              ttip_nt
                              tooltip_top_left
                            "
                          >
                            <span class="tt_txt">Quick Shop</span>
                            <i class="iccl iccl-cart"></i>
                            <span>Quick Shop</span>
                          </a>
                        </div>
                        
                      </div>
                      <div class="product-info mt__15">
                        <h3
                          class="product-title position-relative fs__14 mg__0 fwm"
                        >
                          <a class="cd chp" href="product-detail-layout-01.html"
                            >${item.name}</a
                          >
                        </h3>
                        <span class="price dib mb__5">
                          <del>NGN ${item.sellingPrice.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}</del>
                          <ins>NGN ${item.finalPrice.replace(
                            /\B(?=(\d{3})+(?!\d))/g,
                            ","
                          )}</ins>
                        </span>
                        
                      </div>
                    </div>
                  </div>
                 `;
      })
      .join("");
    $("#home-featured").append(products);
    this.setUpEvents();
  }
  async getAdvertProducts() {
    try {
      const { data } = await this.httpService.getResource(
        "/product/get-advsertised-products"
      );

      console.log(data);

      $("#banner-bg1")
        .attr(
          "style",
          `background-image: url(${data[0].mainImageUrl}) !important;`
        )
        .data("bgset", data[0].mainImageUrl);

      document
        .querySelector("#banner-bg1")
        .setAttribute("data-bgset", data[0].mainImageUrl);
      //   $('').data('data-bgset')
      $("#banner-bg2")
        .attr(
          "style",
          `background-image: url(${data[1].mainImageUrl}) !important;`
        )
        .data("bgset", data[1].mainImageUrl);
      document
        .querySelector("#banner-bg2")
        .setAttribute("data-bgset", data[1].mainImageUrl);
      $("#banner-bg3")
        .attr(
          "style",
          `background-image: url(${data[2].mainImageUrl}) !important;`
        )
        .data("bgset", data[2].mainImageUrl);
      document
        .querySelector("#banner-bg3")
        .setAttribute("data-bgset", data[2].mainImageUrl);
    } catch (error) {
      console.log(error);
    }
  }

  renderCartItems() {
    const cart = this.utilService.getCartItems();
    if (cart) {
      const items = cart
        .map((item) => {
          return `
        <div class="mini_cart_item js_cart_item flex al_center pr oh">
                  <div class="ld_cart_bar"></div>
                  <a href="product-detail-layout-01.html?id=${item.id}&name=${
            item.name
          }" class="mini_cart_img">
                    <img
                      class="w__100 lazyload"
                      data-src="${item.mainImageUrl}"
                      width="120"
                      height="153"
                      alt=""
                      src="${item.mainImageUrl}"
                    />
                  </a>
                  <div class="mini_cart_info">
                    <a
                      href="product-detail-layout-01.html?id=${item.id}&name=${
            item.name
          }"
                      class="mini_cart_title truncate"
                      >${item.name}</a
                    >
                    <div class="mini_cart_meta">
                      <p class="cart_meta_variant">Pink</p>
                      <p class="cart_selling_plan"></p>
                      <div class="cart_meta_price price">
                        <div class="cart_price">
                          <del>NGN ${this.utilService.formatAsMoney(
                            item.sellingPrice
                          )}</del>
                          <ins>NGN ${this.utilService.formatAsMoney(
                            item.finalPrice
                          )}</ins>
                        </div>
                      </div>
                    </div>
                    <div class="mini_cart_actions">
                      <div class="quantity pr mr__10 qty__true">
                        <input
                          type="number"
                          class="input-text qty text tc qty_cart_js"
                          step="1"
                          min="1"
                          max="9999"
                          value="${item.quantity}"
                        />
                        <div class="qty tc fs__14">
                          <button
                            type="button"
                            class="plus db cb pa pd__0 pr__15 tr r__0"
                          >
                            <i class="facl facl-plus"></i>
                          </button>
                          <button
                            type="button"
                            class="minus db cb pa pd__0 pl__15 tl l__0 qty_1"
                          >
                            <i class="facl facl-minus"></i>
                          </button>
                        </div>
                      </div>
                      <a
                        href="#"
                        class="cart_ac_edit js__qs ttip_nt tooltip_top_right"
                        ><span class="tt_txt">Edit this item</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <path
                            d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                          ></path>
                          <path
                            d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                          ></path>
                        </svg>
                      </a>
                      <a
                        data-removeitem="${item.id}"
                        href="#"
                        class="
                          cart_ac_remove
                          js_cart_rem
                          ttip_nt
                          tooltip_top_right
                        "
                        ><span class="tt_txt">Remove this item</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          fill="none"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path
                            d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                          ></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
        
        `;
        })
        .join("");
      const totalPrice = cart.reduce(
        (bal, item) =>
          (bal +=
            parseInt(item.finalPrice) * (item.quantity ? item.quantity : 1)),
        0
      );

      $(".cart_tot_price").text(
        `NGN ${this.utilService.formatAsMoney(`${totalPrice}`)}`
      );
      $(".mini_cart_items, .js_cat_items").empty();
      $(".mini_cart_items, .js_cat_items").append(items);
      const $this = this;
      $("[data-removeitem]").on("click", function (e) {
        const productId = $(this).data("removeitem");
        $this.removeItemFromCart(productId);
      });
    }
  }

  removeItemFromCart(id) {
    this.utilService.removeCartItem(id);
    this.renderCartItems();
  }

  async getCategories() {
    try {
      const data = await this.httpService.getResource(
        "/product/categories/get-all"
      );
      console.log(data);
      $("#shop-category-1 .cat_grid_item__overlay").attr(
        "style",
        `background-image: url(${data[0].thumbNailUrl}) !important;`
      );
      $("#shop-category-1 .cat_grid_item__wrapper .cat_grid_item__title").text(
        data[0].name
      );
      document
        .querySelector("#shop-category-2 .cat_grid_item__overlay")
        .setAttribute("data-bgset", data[0].thumbNailUrl);

      $("#shop-category-2 .cat_grid_item__overlay").attr(
        "style",
        `background-image: url(${data[1].thumbNailUrl}) !important;`
      );
      $("#shop-category-2 .cat_grid_item__wrapper .cat_grid_item__title").text(
        data[1].name
      );
      document
        .querySelector("#shop-category-1 .cat_grid_item__overlay")
        .setAttribute("data-bgset", data[1].thumbNailUrl);

      $("#shop-category-3 .cat_grid_item__overlay").attr(
        "style",
        `background-image: url(${data[2].thumbNailUrl}) !important;`
      );
      $("#shop-category-3 .cat_grid_item__wrapper .cat_grid_item__title").text(
        data[2].name
      );
      document
        .querySelector("#shop-category-3 .cat_grid_item__overlay")
        .setAttribute("data-bgset", data[2].thumbNailUrl);

      $("#shop-category-4 .cat_grid_item__overlay").attr(
        "style",
        `background-image: url(${data[3].thumbNailUrl}) !important;`
      );
      $("#shop-category-4 .cat_grid_item__wrapper .cat_grid_item__title").text(
        data[3].name
      );
      document
        .querySelector("#shop-category-4 .cat_grid_item__overlay")
        .setAttribute("data-bgset", data[3].thumbNailUrl);
    } catch (error) {
      console.log(error);
    }
  }

  setUpEventListeners() {
    const body = $("body");
    const $this = this;

    $("body").on(
      "click",
      ".js_addtc , .single_add_to_cart_button",
      function (e) {
        const productId = $(this).data("quickviewaddtocart");
        const product = $this.utilService.getCachedProductById(productId);
        const quantity = parseInt(
          $(this).siblings("#sp_qty_qs").children("input").val()
        );
        if (quantity < 1) return;

        product.quantity = quantity;
        $this.utilService.addToCart(product);

        // console.log("product id: ", productId);
        $this.renderCartItems();
        let mini_cart_block$ = $("#nt_cart_canvas"),
          btn$ = $(this);
        if (mini_cart_block$.length !== 0) {
          btn$.addClass("loading");
          if ($.magnificPopup && $.magnificPopup.instance.isOpen) {
            $.magnificPopup.close();
          }
          if ($(body).hasClass("pside_opened")) {
            $(body).closeMenu();
          }
          if (body.hasClass("cart_pos_dropdown")) {
            setTimeout(() => {
              $("html, body").animate({ scrollTop: 0 }, "slow", () => {
                mini_cart_block$.addClass("current_hover");
                btn$.removeClass("loading");
              });
            }, 500);
          } else {
            setTimeout(() => {
              btn$.openMenu(mini_cart_block$);
              btn$.removeClass("loading");
            }, 500);
          }
        }
      }
    );
  }

  run() {
    this.utilService.removeLocalProduct();
    this.getAdvertProducts();
    this.getCategories();
    this.getHomeProducts();
    this.getFeaturedProducts();
    // this.setUpEventListeners();
  }
}

export default HomePageService;
