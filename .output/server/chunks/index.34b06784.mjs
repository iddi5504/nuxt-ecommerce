import { _ as _export_sfc, a as __nuxt_component_0$1 } from './server.mjs';
import { useSSRContext, mergeProps, withCtx, createVNode, ref, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { g as groq, c as client } from './client.7dbdc199.mjs';
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

const _sfc_main$1 = {
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
    }
    return { productName, price, imageUrl, showStar, hover, addToFav, id };
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col items-start hover:scale-105 transition-all ease-in-out p-[10px] max-sm:w-full relative cursor-pointer" }, _attrs))}><img${ssrRenderAttr("src", $setup.imageUrl)} class="w-full h-[300px] sm:h-[220px] sm:w-[220px] p-3 rounded-xl object-contain bg-slate-200" alt="">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: `/products/${$setup.id}`
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="flex flex-col items-start"${_scopeId}><div class="text-lg text-slate-700"${_scopeId}>${ssrInterpolate($setup.productName)}</div><div class="text-lg text-black font-bold"${_scopeId}>$${ssrInterpolate($setup.price)}</div></div>`);
      } else {
        return [
          createVNode("div", { class: "flex flex-col items-start" }, [
            createVNode("div", { class: "text-lg text-slate-700" }, toDisplayString($setup.productName), 1),
            createVNode("div", { class: "text-lg text-black font-bold" }, "$" + toDisplayString($setup.price), 1)
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<i style="${ssrRenderStyle($setup.showStar ? null : { display: "none" })}" class="bi bi-star absolute top-6 right-7"></i></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
  async setup() {
    const productQuery = groq`*[_type == 'product']{
            price,
            productName,
            promoName,
            slug,
            "mainImage": mainImage.asset->url
        }`;
    const products = await client.fetch(productQuery);
    console.log(products);
    return { products };
  },
  data() {
    return {
      promo: "",
      promoProductSlug: ""
    };
  },
  computed: {},
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

        }`;
    const productRef = await client.fetch(productRefQ);
    const promoData = await client.fetch(productImage, { id: productRef[0].productRef._ref });
    console.log(productRef);
    this.promo = { ...promoData[0], ...productRef[0] };
    this.promoProductSlug = promoData[0].slug.current;
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$1;
  const _component_product = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-[16px] mt-[45px] max-h-screen text-slate-800 bg-slate-50 flex flex-col items-center justify-start px-2 lg:px-4 py-1" }, _attrs))}><div class="w-full p-3 px-10 rounded-2xl bg-purple-500 flex flex-col justify-center lg:flex-row"><div class="flex flex-col h-[274px] justify-start lg:justify-center gap-2 items-start p-2 z-10"><div class="text-lg">Earphone Pro</div><div class="text-2xl lg:text-4xl text-slate-800 font-bold break-words">${ssrInterpolate($data.promo.promoName)}</div>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: `/products/${$data.promoProductSlug}/`
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<button class="bg-slate-800 hover:bg-purple-400 text-white p-2 font-bold text-lg rounded-lg"${_scopeId}>Shop now</button>`);
      } else {
        return [
          createVNode("button", { class: "bg-slate-800 hover:bg-purple-400 text-white p-2 font-bold text-lg rounded-lg" }, "Shop now")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="flex flex-1 justify-end items-end relative"><img${ssrRenderAttr("src", $data.promo.mainImage)} class="w-[200px] lg:w-[250px] lg:h-[250px] h-[200px] absolute lg:relative" alt=""><div class="flex flex-col w-[200px] lg:max-w-fit items-end break-words"><div class="text-lg text-slate-900">Description</div><div class="text-sm text-slate-800 text-right">${ssrInterpolate($data.promo.description)}</div></div></div></div><div class="flex flex-col items-center"><div class="py-3 text-center"><div class="lg:text-3xl text-2xl text-slate-700 font-bold">Best selling Merchandise</div><div class="text-lg text-slate-600 font-semibold text-center">dklsdklds sdlk sdklds lksndds knldslkndsl kndsk lnkln</div></div><div class="flex w-full justify-center items-center flex-wrap"><!--[-->`);
  ssrRenderList($setup.products, (product) => {
    _push(ssrRenderComponent(_component_product, {
      key: product.key,
      product
    }, null, _parent));
  });
  _push(`<!--]--></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index.34b06784.mjs.map
