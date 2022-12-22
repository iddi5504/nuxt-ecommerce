<template>
    <div class="flex flex-col justify-start items-center gap-3">
        <div class="flex flex-col lg:flex-row lg:items-center justify-center items-stretch gap-3 max-w-[960px] p-4">
            <!-- product image -->
            <div class="flex flex-col items-center ">
                <img :src="mainImageUrl"
                    class="h-[300px] w-[300px] p-3 px-10 rounded-xl m-2 object-contain bg-slate-100" alt="">
                <!-- exmaples -->
                <div class="flex gap-1 items-center w-full justify-start">
                    <img ref="selectImagePreview" @click="selectImage(image.ref, index)"
                        v-for="(image, index) in otherImagesUrl" :key="image._key" :src="image.url"
                        class="h-[70px] w-[70px] p-1 rounded-xl m-1 object-contain " alt="">

                </div>
            </div>
            <!-- details -->
            <div class="flex flex-1 flex-col gap-2 items-start justify-start py-4">
                <!-- title  -->
                <h3 class="text-slate-800 font-bold text-2xl">{{ contentData.productName }}</h3>
                <!-- stars -->
                <div class="flex gap-1 justify-start">
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                    <i class="bi bi-star"></i>
                </div>
                <!-- details -->
                <div class="text-lg text-left">
                    <h5 class="font-semibold">Details:</h5>
                    <p>{{ contentData.details }}</p>
                </div>
                <!-- cost -->
                <div class="text-xl py-1 text-purple-600 font-bold">
                    ${{ contentData.price }}
                </div>
                <!-- quantity -->
                <div class="flex justify-start items-center gap-2 ">
                    <div>Quantity</div>
                    <!-- selector -->
                    <div class="flex justify-around items-center gap-1">
                        <div @click="decrease" class="rounded-lg  p-1 m-auto bg-purple-400 text-sm shadow-sm">
                            <i class="bi bi-dash text-lg font-bold leading-none"></i>
                        </div>
                        <div class="text-lg mx-2">{{ numberOfItems }}</div>
                        <div @click="increase" class="rounded-lg  p-1 m-auto bg-purple-400 text-sm shadow-sm">
                            <i class="bi bi-plus text-lg font-bold leading-none"></i>
                        </div>
                    </div>

                </div>
                <!-- action button -->
                <div class="flex gap-2 w-full sm:max-w-max">
                    <button @click="addToCart"
                        class="text-center p-2 px-3 rounded-md hover:bg-gray-50 bg-white border-2 text-sm border-gray-300 text-purple-600">
                        Add to cart</button>
                    <button
                        class="text-center p-2 px-3 rounded-md hover:bg-purple-700 bg-purple-400 border-2 text-sm text-slate-700">
                        Buy now</button>
                </div>
            </div>
        </div>
        <!-- Products you may like  -->
        <div class="text-center w-full max-w-[800px] my-4">
            <h3 class="font-bold text-xl p-2">Products you may like</h3>

            <div id="container" class="overflow-x-auto overflow-y-hidden">
                <!-- products -->
                <div @mouseenter="startAnimation(false)" @mouseleave="startAnimation(true)" ref="productsYouMayLike"
                    class="flex justify-start px-2 items-center transition-all p-2">
                    <!-- product -->
                    <div v-for="product in productsYouMayLike" :key="product.productName"
                        class="flex flex-col item-center min-w-[135px] hover:scale-[1.1]">
                        <NuxtLink :to="`/products/${product.slug.current}`">
                            <img :src="product.imageUrl"
                                class="h-[130px] w-[130px] p-3 px-5 rounded-xl m-2 object-contain bg-slate-100" />
                            <!-- name -->
                            <div class="text-center text-sm font-semibold">
                                {{ product.productName }}
                            </div>
                        </NuxtLink>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script >
import { client, urlFor } from '~~/client'
import PRODUCTSTORE from '../../store/index'

const productStore = PRODUCTSTORE()
definePageMeta({
    layout: "home"
})

export default {

    data() {
        return {
            contentData: '',
            mainImageUrl: '',
            otherImagesUrl: [],
            numberOfItems: 0,
            item: {},
            tags: [],
            transition: true,
            productsYouMayLike: []
        }
    },
    methods: {
        selectImage(source, index) {
            this.mainImageUrl = urlFor(source).width(360).toString()
            const selectedImagePreviewHtmlNode = this.$refs.selectImagePreview
            selectedImagePreviewHtmlNode.forEach((node) => {
                if (index == selectedImagePreviewHtmlNode.indexOf(node)) {
                    node.classList.add('selected')
                } else {
                    node.classList.remove('selected')
                }
            })

        },
        addToCart() {
            if (this.numberOfItems == 0)
                this.numberOfItems = 1
            const { price, productName, mainImage } = this.contentData
            productStore.addToCart({ price: price, productName: productName, mainImage: this.mainImageUrl, numberOfItems: this.numberOfItems })
            productStore.showToast(`${this.numberOfItems} of ${productName} has been added to the cart`)
            this.numberOfItems = 0
        },
        increase() {
            this.numberOfItems++
        },
        decrease() {
            if (this.numberOfItems == 0) return
            this.numberOfItems--
        },

        startAnimation(start) {
            this.transition = start
        }
    },
    async created() {
        const productQuery = groq`*[slug.current == $id]{
            price,
            productName,
            details,
            mainImage,
            otherImages,
            tag
        }`
        const contentData = await client.fetch(productQuery, { id: this.$route.params.id })
        // get main image
        this.mainImageUrl = urlFor(contentData[0].mainImage)
        // get other images 
        let imageUrls = []
        contentData[0].otherImages.forEach(data => {
            imageUrls.push({ url: urlFor(data).width(90).toString(), ref: data.asset, key: data._key })
        });
        imageUrls.unshift({ url: urlFor(contentData[0].mainImage), ref: contentData[0].mainImage, key: 0 })
        this.otherImagesUrl = imageUrls
        this.contentData = contentData[0]
        console.log(this.contentData)

        // set tags
        let firstTag = contentData[0].tag[0]
        const productsYouMayLikeQuery = groq`*[_type == "product" && "${firstTag}" in tag]{
          mainImage,
          productName,
          slug
        }`
        const productsYouMayLike = await client.fetch(productsYouMayLikeQuery)
        console.warn(productsYouMayLike)
        productsYouMayLike.forEach(product => {
            this.productsYouMayLike.push(
                {
                    ...product,
                    imageUrl: urlFor(product.mainImage).width(200).toString()
                }
            )
        });


    },
    mounted() {
        const products = this.$refs.productsYouMayLike
        console.log(window.innerWidth)
        if (window.innerWidth < 700) {
            products.classList.add('animate')
        }
        if (!this.productsYouMayLike.length > 8 && !window.innerWidth < 700) {
            products.classList.remove('animate')
        }

        console.log(products)
    },
    watch: {
        transition: {
            handler(transition) {
                const products = this.$refs.productsYouMayLike
                console.log(transition)
                if (transition) {
                    products.classList.remove('pause')
                } else {
                    products.classList.add('pause')
                }
            },


        }
    }
}
</script>

<style>
.selected {
    background: #9333ea;
}

.animate {
    animation: animate infinite linear 20s;
}

@keyframes animate {
    from {
        transform: translateX(-800px);
    }

    to {
        transform: translateX(800px);
    }
}

.pause {
    animation-play-state: paused;
}

#container::-webkit-scrollbar {
    display: none;
}

/* Track */
#container::-webkit-scrollbar-track {
    background: transparent;
}

/* Handle */
#container::-webkit-scrollbar-thumb {
    background: #9333ea;
    border-radius: 20px;
}
</style>