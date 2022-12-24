<template>
    <transition name="showCart">
        <div v-show="showCart"
            class="max-w-sm flex flex-col z-50 p-3 shadow-md w-full min-h-full max-h-screen fixed right-0 top-0 bg-white">
            <!-- header -->
            <div class="flex justify-between mx-2">
                <div class="text-lg text-bold">Cart</div>
                <i @click="closeCart" class="bi bi-x-circle hover:text-red-500" alt=""></i>
            </div>
            <!-- cart items -->
            <div class="flex flex-col flex-1">
                <!-- item -->

                <div v-for="item in cartItems" :key="item.productName" class="flex gap-2">
                    <img :src="item.mainImage"
                        class="h-[110px] w-[110px] p-1 rounded-xl m-1 object-contain bg-slate-100" alt="">
                    <div class="flex-1 flex flex-col justify-between">
                        <!-- top sec -->
                        <div class="flex flex-1 justify-between items-center">
                            <div class="text-lg font-bold">{{ item.productName }}</div>
                            <div class="text-sm font-bold">${{ item.price }}</div>
                        </div>
                        <!-- bottom -->
                        <div class="flex flex-1 justify-between items-center">
                            <!-- selector -->
                            <div class="flex justify-around items-center gap-1">

                                <i @click="increase(item)"
                                    class="bi bi-plus cursor-pointer rounded-full p-[2px] leading-[13px] text-center m-auto bg-purple-400 text-sm shadow-sm"></i>

                                <div class="text-lg mx-2">{{ item.numberOfItems }}</div>
                                <i @click="decrease(item)"
                                    class="bi bi-dash cursor-pointer rounded-full p-[2px] leading-[13px] text-center m-auto bg-purple-400 text-sm shadow-sm"></i>

                            </div>
                            <!-- cancel button -->
                            <i @click="removeCartItem(item.productName)"
                                class=" bi bi-trash rounded-full p-1 text-red-400 leading-none bg-red-50">
                            </i>


                        </div>

                    </div>

                </div>
            </div>
            <!-- make payment -->
            <div
                class="flex flex-col w-full item-center p-3 m-1 gap-2 rounded-md shadow-sm sticky bottom-0 left-0 bg-slate-100">
                <div class="flex flex-1 justify-between items-center">
                    <div class="text-lg font-bold">Sub Total</div>
                    <div class="text-sm font-bold">${{ subTotal }}</div>
                </div>
                <button
                    class="text-center p-2 px-3 w-full self-center max-w-[220px] rounded-lg hover:bg-purple-700 bg-purple-400 border-2 text-sm text-slate-700">
                    Make Payment</button>
            </div>
        </div>
    </transition>
    <!-- <div v-show="showCart" class="min-h-screen absolute w-screen top-0 right-0  z-30  bg-[#c5a9cc8a]">
    </div> -->

</template>

<script>
import productStore from '../store/index'
import { computed } from 'vue'
export default {
    setup() {
        const closeCart = () => {
            productStore().$patch({ showCart: false })
        }

        const showCart = computed(() => {
            return productStore().$state.showCart
        })

        const cartItems = computed(() => {
            return productStore().$state.cart
        })
        const removeCartItem = (itemName) => {
            // console.log(itemName)
            productStore().removeCartItem(itemName)
        }

        const increase = (item) => {
            productStore().increase(item)
        }
        const decrease = (item) => {
            productStore().decrease(item)
        }

        const subTotal = computed(() => {
            let cartItems = productStore().$state.cart
            let subTotal = 0
            cartItems.forEach(item => {
                subTotal += parseInt(item.price * item.numberOfItems)
            });
            return subTotal
        })
        return {
            closeCart,
            showCart,
            cartItems,
            removeCartItem,
            subTotal,
            increase,
            decrease
        }

    }
}
</script>

<style>
.showCart-enter-active,
.showCart-leave-active {
    transform: translateX(0);
    transition: 0.5s ease all;
    position: absolute;
}

.showCart-leave-to,
.showCart-enter-from {
    transform: translateX(500px);
    opacity: 0;
}
</style>