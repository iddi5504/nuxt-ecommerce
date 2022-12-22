<template>
    <div
        class="text-[16px] max-h-screen text-slate-800 bg-slate-50 flex flex-col items-center justify-start px-2 lg:px-4 py-1 ">
        <!-- hero banner -->
        <div class="w-full p-3 px-10  rounded-2xl bg-purple-500 flex flex-col justify-center lg:flex-row">
            <!-- text -->
            <div class="flex flex-col h-[274px] justify-start lg:justify-center gap-2 items-start 
             p-2 z-20">
                <div class="text-lg">Earphone Pro</div>
                <div class="text-2xl lg:text-6xl text-slate-800 font-bold break-words">{{ promo.promoName }}</div>
                <NuxtLink :to="`/products/${promoProductSlug}/`">
                    <button class="bg-slate-800 hover:bg-purple-400 text-white p-2 font-bold text-lg rounded-lg">Shop
                        now</button>
                </NuxtLink>
            </div>
            <!-- product image section -->
            <div class="flex flex-1 justify-end items-end relative">
                <img :src="promo.mainImage" class="w-[250px] h-[250px] absolute lg:relative" alt="">
                <div class="flex flex-col items-end break-words">
                    <div class="text-lg text-slate-900">Description</div>
                    <div class="text-sm text-slate-800 text-right">{{ promo.description }}</div>
                </div>
            </div>

        </div>
        <!-- best selling products -->
        <div class="flex flex-col items-center">
            <div class="py-3 text-center">
                <div class="lg:text-3xl text-2xl text-slate-700 font-bold">Best selling Merchandise</div>
                <div class="text-lg text-slate-600 font-semibold text-center">dklsdklds
                    sdlk sdklds lksndds knldslkndsl kndsk lnkln</div>
            </div>
            <div class="flex w-full space-x-2 justify-center items-center flex-wrap">
                <product v-for="product in products" :key="product.key" :product="product" />
            </div>
        </div>
    </div>
</template>

<script>
// import store from '../../store/index'
import { urlFor, client } from '../../client'

definePageMeta({
    layout: "home"
})
export default ({
    async setup() {
        const productQuery = groq`*[_type == 'product']{
            price,
            productName,
            promoName,
            slug,
            "mainImage": mainImage.asset->url
        }`;

        const products = await client.fetch(productQuery)
        console.log(products)
        return { products }
    },
    data() {
        return {
            promo: '',
            promoProductSlug: ''
        }
    },
    computed: {
        // products() {
        //     return store.state.products
        // }

    },
    async created() {
        const productRefQ = groq`*[_type == 'topProducts']{
            description,
            productRef,
            promoName
        }`;
        const productImage = groq`*[_id == $id]{
            "mainImage": mainImage.asset->url,
            productName,
            slug

        }`
        const productRef = await client.fetch(productRefQ)
        const promoData = await client.fetch(productImage, { id: productRef[0].productRef._ref })

        console.log(productRef)
        this.promo = { ...promoData[0], ...productRef[0] }
        this.promoProductSlug = promoData[0].slug.current


    }
})
</script>
