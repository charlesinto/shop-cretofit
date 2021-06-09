import { BASE_URL } from "./js/constant";

import { PAGE } from "./js/routes";

import UtilService from "./js/utils";

import HomePageService from "./js/page/home";
import ProductDetail from "./js/page/product_detail";
import CheckoutService from "./js/page/checkout";

const utilService = new UtilService();

const homePageService = new HomePageService();

const productDetailService = new ProductDetail();

const checkoutService = new CheckoutService();

$(function () {
  const renderCartItems = () => {
    const cart = utilService.getCartItems();
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
                      
                      <p class="cart_selling_plan"></p>
                      <div class="cart_meta_price price">
                        <div class="cart_price">
                          <del>NGN ${utilService.formatAsMoney(
                            item.sellingPrice
                          )}</del>
                          <ins>NGN ${utilService.formatAsMoney(
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
        `NGN ${utilService.formatAsMoney(`${totalPrice}`)}`
      );
      $(".mini_cart_items, .js_cat_items").empty();
      $(".mini_cart_items, .js_cat_items").append(items);
      const $this = this;
      $("[data-removeitem]").on("click", function (e) {
        const productId = $(this).data("removeitem");
        removeItemFromCart(productId);
      });
    }
  };

  const removeItemFromCart = (id) => {
    utilService.removeCartItem(id);
    renderCartItems();
    $(".cart-icon").text(utilService.getCartItems().length);
  };

  const updateCartItemCount = () => {
    console.log("called to get count");
    $(".cart-icon, .tcount, .jsccount").text(utilService.getCartItems().length);
  };

  const loadUI = () => {
    const body = $("body");
    const $this = this;
    updateCartItemCount();

    $("body").on(
      "click",
      ".js_addtc , .single_add_to_cart_button, .icon_cart",
      function (e) {
        const productId = $(this).data("quickviewaddtocart")
          ? $(this).data("quickviewaddtocart")
          : parseInt(utilService.getQueryParams().get("id"));
        if (productId) {
          const product = utilService.getCachedProductById(productId);
          const quantity = parseInt(
            $(this).siblings("#sp_qty_qs, .quantity").children("input").val()
          )
            ? parseInt(
                $(this)
                  .siblings("#sp_qty_qs, .quantity")
                  .children("input")
                  .val()
              )
            : 1;
          console.log("quantity: ", quantity);
          if (quantity < 1) return;

          product.quantity = quantity;
          utilService.addToCart(product);
        }

        updateCartItemCount();

        // console.log("product id: ", productId);
        renderCartItems();
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
  };
  const loadPageJS = () => {
    switch (window.location.pathname) {
      case PAGE.home:
        return homePageService.run();
      case PAGE.productDetail:
        return productDetailService.run();
      case PAGE.checkout:
        return checkoutService.run();
      default:
        return;
    }
  };

  loadPageJS();
  loadUI();
});
