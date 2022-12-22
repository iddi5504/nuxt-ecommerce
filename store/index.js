import { defineStore } from 'pinia'
export default defineStore('productStore', {
  state: () => ({
    name: 'iddi',
    cart: [],
    toastMessage: null,
    showCart: false
  }),
  actions: {
    addToCart(productItem) {
      this.cart.push(productItem);
    },
    decrease(item) {
      if (item.numberOfItems == 0) return
      let index = this.cart.indexOf(item)
      this.cart.forEach(item => {
        if (item == item) {
          this.cart[index].numberOfItems--;
        }
      });
    },
    increase(item) {
      let index = this.cart.indexOf(item)
      this.cart.forEach(item => {
        if (item == item) {
          this.cart[index].numberOfItems++;
        }
      });
      // console.log(this.cart[index].numberOfItems)
    },
    showToast(message) {
      this.toastMessage = message;
      setTimeout(() => {
        this.toastMessage = null;
      }, 3000);
    },
    removeCartItem(itemName) {
      const newCart = this.cart.filter(item => {
        return item.productName !== itemName
      });
      this.cart = newCart
    }
  }
})