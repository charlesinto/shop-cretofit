import UtilService from "../utils";

const utilService = new UtilService();

class CheckoutService {
  renderCartItems() {
    const cart = utilService.getCartItems();
    if (cart) {
      const items = cart
        .map((item) => {
          return `
            <tr class="cart_item">
            <td class="product-name">
              ${item.name}<strong class="product-quantity"
                >× ${item.quantity}</strong
              >
            </td>
            <td class="product-total">
              <span class="cart_price">NGN ${utilService.formatAsMoney(
                `${parseInt(item.finalPrice) * item.quantity}`
              )}</span>
            </td>
          </tr>
            `;
        })
        .join("");
      $(".checkout-review-order-table tbody").append(items);
      const subTotal = cart.reduce(
        (sum, item) => (sum += parseInt(item.finalPrice) * item.quantity),
        0
      );
      const shippingFeee = utilService.getShippingFee();
      const total = shippingFeee + subTotal;
      $(".sub-total").text(`NGN ${utilService.formatAsMoney(`${subTotal}`)}`);
      $(".shipping-fee").text(
        `NGN ${utilService.formatAsMoney(`${shippingFeee}`)}`
      );
      $(".amount").text(`NGN ${utilService.formatAsMoney(`${total}`)}`);
    }
  }
  run() {
    this.renderCartItems();
  }
}

export default CheckoutService;
