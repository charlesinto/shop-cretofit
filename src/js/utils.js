class UtilService {
  formatAsMoney(amount) {
    const num = parseInt(amount);
    const num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }
  getCachedProductById(id) {
    const index = this.getLocalProduct().findIndex((item) => item.id === id);
    if (index === -1) return null;
    return this.getLocalProduct()[index];
  }
  getCartItems() {
    const cart = localStorage.getItem("cart-items");
    if (cart) {
      return JSON.parse(cart);
    }
    return [];
  }
  getShippingFee() {
    return "0";
  }
  addToCart(product) {
    const cart = localStorage.getItem("cart-items");
    if (cart) {
      const items = JSON.parse(cart);
      const index = items.findIndex((item) => item.id === product.id);
      if (index === -1) {
        const newCart = [...items, product];
        localStorage.setItem("cart-items", JSON.stringify(newCart));
      }
    } else {
      // window.cart = [product];
      localStorage.setItem("cart-items", JSON.stringify([product]));
    }
  }
  initializeCart(cartItems) {
    if (window.cart) {
      window.cart = [...window.cart, ...cartItems];
    }
  }
  removeCartItem(id) {
    const cart = this.getCartItems();
    if (cart) {
      const index = cart.findIndex((item) => item.id === parseInt(id));
      if (index !== -1) {
        cart.splice(index, 1);
        this.initializeCart([...cart]);
      }
    }
  }
  loadProduct(products = []) {
    const items = localStorage.getItem("homeProducts");
    if (items) {
      const homeProducts = JSON.parse(items);
      localStorage.setItem(
        "homeProducts",
        JSON.stringify([...homeProducts, ...products])
      );
    } else {
      localStorage.setItem("homeProducts", JSON.stringify([...products]));
    }
    // if (window.homeProducts) {
    //   window.homeProducts = [...window.homeProducts, ...[]];
    // } else {
    //   window.homeProducts = products;
    // }
  }
  getLocalProduct() {
    const items = localStorage.getItem("homeProducts");
    if (items) {
      return JSON.parse(items);
    }
    return null;
  }
  getQueryParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams;
  }
  removeLocalProduct() {
    localStorage.removeItem("homeProducts");
  }
}

export default UtilService;
