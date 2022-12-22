<template>
    <div class="">
        <!-- nav -->
        <div class="flex w-full justify-between px-3 p-2">
            <!-- logo -->
            <NuxtLink to="/products" class="text-lg text-slate-700 font-bold">iMarket</NuxtLink>
            <div @click="openCart" class="relative">
                <i class="bi bi-cart-fill text-[27px] font-extrabold"></i>
                <!-- number -->
                <div
                    class="text-[12px] leading-[0] font-semibold bg-purple-600 p-[7px] rounded-full absolute top-[12px] right-[-5px]">
                    {{
        numberOfItems
                    }}</div>

            </div>
        </div>

        <slot />

        <!-- toast -->
        <toast />
        <!-- cart -->
        <cart />
    </div>
</template>

<script>
import productStore from '../store/index'
export default {

    setup() {
        const openCart = () => {
            productStore().$patch({ showCart: true })
        }

        useHead({
            link: [{ rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css', }]

        })
        return { openCart }
    },
    computed: {
        numberOfItems() {
            const cartItems = productStore().$state.cart
            const itemNumber = cartItems.reduce((number, item) => number += item.numberOfItems, 0)
            return itemNumber
        },

    }
}
</script>