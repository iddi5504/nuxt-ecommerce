import { d as defineStore } from './server.mjs';

const productStore = defineStore("productStore", {
  state: () => ({
    name: "iddi",
    cart: [],
    toastMessage: null,
    showCart: false
  }),
  actions: {
    addToCart(productItem) {
      let isInCart = this.cart.find((item) => {
        return productItem.productName == item.productName;
      });
      if (!isInCart) {
        this.cart.push(productItem);
      } else {
        this.cart[this.cart.indexOf(isInCart)].numberOfItems += productItem.numberOfItems;
      }
    },
    decrease(item) {
      if (item.numberOfItems == 0)
        return;
      let index = this.cart.indexOf(item);
      this.cart.forEach((item2) => {
        if (item2 == item2) {
          this.cart[index].numberOfItems--;
        }
      });
    },
    increase(item) {
      let index = this.cart.indexOf(item);
      this.cart.forEach((item2) => {
        if (item2 == item2) {
          this.cart[index].numberOfItems++;
        }
      });
    },
    showToast(message) {
      this.toastMessage = message;
      setTimeout(() => {
        this.toastMessage = null;
      }, 3e3);
    },
    removeCartItem(itemName) {
      const newCart = this.cart.filter((item) => {
        return item.productName !== itemName;
      });
      this.cart = newCart;
    }
  }
});

export { productStore as p };
//# sourceMappingURL=index.cc273de7.mjs.map
