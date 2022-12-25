import { _ as _export_sfc, a as __nuxt_component_0$1 } from './server.mjs';
import { u as urlFor, g as groq, c as client } from './client.7dbdc199.mjs';
import { p as productStore$1 } from './index.cc273de7.mjs';
import { mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'ufo';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import 'vue-router';
import 'defu';
import './node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'node:fs';
import 'node:url';
import 'pathe';
import '@sanity/client';
import '@sanity/image-url';

const productStore = productStore$1();
const _sfc_main = {
  data() {
    return {
      contentData: "",
      mainImageUrl: "",
      otherImagesUrl: [],
      numberOfItems: 0,
      item: {},
      tags: [],
      transition: true,
      productsYouMayLike: []
    };
  },
  methods: {
    selectImage(source, index) {
      this.mainImageUrl = urlFor(source).width(360).toString();
      const selectedImagePreviewHtmlNode = this.$refs.selectImagePreview;
      selectedImagePreviewHtmlNode.forEach((node) => {
        if (index == selectedImagePreviewHtmlNode.indexOf(node)) {
          node.classList.add("selected");
        } else {
          node.classList.remove("selected");
        }
      });
    },
    addToCart() {
      if (this.numberOfItems == 0)
        this.numberOfItems = 1;
      const { price, productName, mainImage } = this.contentData;
      productStore.addToCart({ price, productName, mainImage: this.mainImageUrl, numberOfItems: this.numberOfItems });
      productStore.showToast(`${this.numberOfItems} of ${productName} has been added to the cart`);
      this.numberOfItems = 0;
    },
    increase() {
      this.numberOfItems++;
    },
    decrease() {
      if (this.numberOfItems == 0)
        return;
      this.numberOfItems--;
    },
    startAnimation(start) {
      this.transition = start;
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
        }`;
    const contentData = await client.fetch(productQuery, { id: this.$route.params.id });
    this.mainImageUrl = urlFor(contentData[0].mainImage);
    let imageUrls = [];
    contentData[0].otherImages.forEach((data) => {
      imageUrls.push({ url: urlFor(data).width(90).toString(), ref: data.asset, key: data._key });
    });
    imageUrls.unshift({ url: urlFor(contentData[0].mainImage), ref: contentData[0].mainImage, key: 0 });
    this.otherImagesUrl = imageUrls;
    this.contentData = contentData[0];
    console.log(this.contentData);
    let firstTag = contentData[0].tag[0];
    const productsYouMayLikeQuery = groq`*[_type == "product" && "${firstTag}" in tag]{
          mainImage,
          productName,
          slug
        }`;
    const productsYouMayLike = await client.fetch(productsYouMayLikeQuery);
    console.warn(productsYouMayLike);
    productsYouMayLike.forEach((product) => {
      this.productsYouMayLike.push(
        {
          ...product,
          imageUrl: urlFor(product.mainImage).width(200).toString()
        }
      );
    });
  },
  mounted() {
    const products = this.$refs.productsYouMayLike;
    console.log(window.innerWidth);
    if (window.innerWidth < 700) {
      products.classList.add("animate");
    }
    if (!this.productsYouMayLike.length > 8 && !window.innerWidth < 700) {
      products.classList.remove("animate");
    }
    console.log(products);
  },
  watch: {
    transition: {
      handler(transition) {
        const products = this.$refs.productsYouMayLike;
        console.log(transition);
        if (transition) {
          products.classList.remove("pause");
        } else {
          products.classList.add("pause");
        }
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col justify-start items-center gap-3 mt-[35px]" }, _attrs))}><div class="flex flex-col lg:flex-row lg:items-center justify-center items-stretch gap-3 max-w-[960px] p-4"><div class="flex flex-col items-center"><img${ssrRenderAttr("src", $data.mainImageUrl)} class="h-[300px] w-[300px] p-3 px-10 rounded-xl m-2 object-contain bg-slate-100" alt=""><div class="flex gap-1 items-center w-full justify-start"><!--[-->`);
  ssrRenderList($data.otherImagesUrl, (image, index) => {
    _push(`<img${ssrRenderAttr("src", image.url)} class="h-[70px] w-[70px] p-1 rounded-xl m-1 object-contain" alt="">`);
  });
  _push(`<!--]--></div></div><div class="flex flex-1 flex-col gap-2 items-start justify-start py-4"><h3 class="text-slate-800 font-bold text-2xl">${ssrInterpolate($data.contentData.productName)}</h3><div class="flex gap-1 justify-start"><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i><i class="bi bi-star"></i></div><div class="text-lg text-left"><h5 class="font-semibold">Details:</h5><p>${ssrInterpolate($data.contentData.details)}</p></div><div class="text-xl py-1 text-purple-600 font-bold"> $${ssrInterpolate($data.contentData.price)}</div><div class="flex justify-start items-center gap-2"><div>Quantity</div><div class="flex justify-around items-center gap-1"><div class="rounded-lg p-1 m-auto bg-purple-400 text-sm shadow-sm"><i class="bi bi-dash text-lg font-bold leading-none"></i></div><div class="text-lg mx-2">${ssrInterpolate($data.numberOfItems)}</div><div class="rounded-lg p-1 m-auto bg-purple-400 text-sm shadow-sm"><i class="bi bi-plus text-lg font-bold leading-none"></i></div></div></div><div class="flex gap-2 w-full sm:max-w-max"><button class="text-center p-2 px-3 rounded-md hover:bg-gray-50 bg-white border-2 text-sm border-gray-300 text-purple-600"> Add to cart</button><button class="text-center p-2 px-3 rounded-md hover:bg-purple-700 bg-purple-400 border-2 text-sm text-slate-700"> Buy now</button></div></div></div><div class="text-center w-full max-w-[800px] my-4"><h3 class="font-bold text-xl p-2">Products you may like</h3><div id="container" class="overflow-x-auto overflow-y-hidden"><div class="flex justify-start px-2 items-center p-2"><!--[-->`);
  ssrRenderList($data.productsYouMayLike, (product) => {
    _push(`<div class="flex flex-col item-center min-w-[135px] hover:scale-[1.1] transition-all">`);
    _push(ssrRenderComponent(_component_NuxtLink, {
      to: `/products/${product.slug.current}`
    }, {
      default: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<img${ssrRenderAttr("src", product.imageUrl)} class="h-[130px] w-[130px] p-3 px-5 rounded-xl m-2 object-contain bg-slate-100"${_scopeId}><div class="text-center text-sm font-semibold"${_scopeId}>${ssrInterpolate(product.productName)}</div>`);
        } else {
          return [
            createVNode("img", {
              src: product.imageUrl,
              class: "h-[130px] w-[130px] p-3 px-5 rounded-xl m-2 object-contain bg-slate-100"
            }, null, 8, ["src"]),
            createVNode("div", { class: "text-center text-sm font-semibold" }, toDisplayString(product.productName), 1)
          ];
        }
      }),
      _: 2
    }, _parent));
    _push(`</div>`);
  });
  _push(`<!--]--></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { _id_ as default };
//# sourceMappingURL=_id_.af6651f3.mjs.map
