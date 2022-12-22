<template>
    <div @mouseenter="hover(true)" @mouseleave="hover(false)"
        class="flex flex-col items-start hover:scale-105 transition-all ease-in-out p-3 relative cursor-pointer">
        <img :src="imageUrl" class="h-[220px] w-[220px] p-3 rounded-xl m-2 object-contain bg-slate-100" alt="">
        <!-- description -->
        <NuxtLink :to="`/products/${id}`">
            <div class="flex flex-col items-start">
                <div class="text-lg text-slate-700">{{ productName }}</div>
                <div class="text-lg text-black font-bold">${{ price }}</div>
            </div>
        </NuxtLink>


        <!-- star -->
        <i v-show="showStar" @click="addToFav" class="bi bi-star absolute top-6 right-7"></i>
    </div>
</template>

<script>

export default {
    props: ["product"],
    setup(prop) {
        const productName = prop.product.productName;
        const price = prop.product.price;
        const imageUrl = prop.product.mainImage;
        const id = prop.product.slug.current;
        const showStar = ref(false);
        function hover(hovered) {
            showStar.value = hovered;
        }
        function addToFav() {
            // 
        }
        return { productName, price, imageUrl, showStar, hover, addToFav, id };
    },

}
</script>

<style>

</style>