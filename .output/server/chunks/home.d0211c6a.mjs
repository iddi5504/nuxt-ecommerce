import { _ as _export_sfc, a as __nuxt_component_0$1 } from './server.mjs';
import { p as productStore } from './index.cc273de7.mjs';
import { useSSRContext, mergeProps, withCtx, createTextVNode, computed } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { u as useHead } from './composables.add8ffce.mjs';
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

const _sfc_main$2 = {
  computed: {
    toast() {
      const toastMessage = productStore().$state.toastMessage;
      return toastMessage;
    }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  if ($options.toast) {
    _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full z-[100] fixed top-3 left-0 flex justify-center items-center" }, _attrs))}><div class="text-white bg-green-500 max-w-md break-words text-sm font-semibold p-2 rounded-md"><div>${ssrInterpolate($options.toast)}</div></div></div>`);
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/toast.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$1 = {
  setup() {
    const closeCart = () => {
      productStore().$patch({ showCart: false });
    };
    const showCart = computed(() => {
      return productStore().$state.showCart;
    });
    const cartItems = computed(() => {
      return productStore().$state.cart;
    });
    const removeCartItem = (itemName) => {
      productStore().removeCartItem(itemName);
    };
    const increase = (item) => {
      productStore().increase(item);
    };
    const decrease = (item) => {
      productStore().decrease(item);
    };
    const subTotal = computed(() => {
      let cartItems2 = productStore().$state.cart;
      let subTotal2 = 0;
      cartItems2.forEach((item) => {
        subTotal2 += parseInt(item.price * item.numberOfItems);
      });
      return subTotal2;
    });
    return {
      closeCart,
      showCart,
      cartItems,
      removeCartItem,
      subTotal,
      increase,
      decrease
    };
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    style: $setup.showCart ? null : { display: "none" },
    class: "max-w-sm flex flex-col z-50 p-3 shadow-md w-full min-h-full max-h-screen fixed right-0 top-0 bg-white"
  }, _attrs))}><div class="flex justify-between mx-2"><div class="text-lg text-bold">Cart</div><i class="bi bi-x-circle hover:text-red-500" alt=""></i></div><div class="flex flex-col flex-1"><!--[-->`);
  ssrRenderList($setup.cartItems, (item) => {
    _push(`<div class="flex gap-2"><img${ssrRenderAttr("src", item.mainImage)} class="h-[110px] w-[110px] p-1 rounded-xl m-1 object-contain bg-slate-100" alt=""><div class="flex-1 flex flex-col justify-between"><div class="flex flex-1 justify-between items-center"><div class="text-lg font-bold">${ssrInterpolate(item.productName)}</div><div class="text-sm font-bold">$${ssrInterpolate(item.price)}</div></div><div class="flex flex-1 justify-between items-center"><div class="flex justify-around items-center gap-1"><i class="bi bi-plus cursor-pointer rounded-full p-[2px] leading-[13px] text-center m-auto bg-purple-400 text-sm shadow-sm"></i><div class="text-lg mx-2">${ssrInterpolate(item.numberOfItems)}</div><i class="bi bi-dash cursor-pointer rounded-full p-[2px] leading-[13px] text-center m-auto bg-purple-400 text-sm shadow-sm"></i></div><i class="bi bi-trash rounded-full p-1 text-red-400 leading-none bg-red-50"></i></div></div></div>`);
  });
  _push(`<!--]--></div><div class="flex flex-col w-full item-center p-3 m-1 gap-2 rounded-md shadow-sm sticky bottom-0 left-0 bg-slate-100"><div class="flex flex-1 justify-between items-center"><div class="text-lg font-bold">Sub Total</div><div class="text-sm font-bold">$${ssrInterpolate($setup.subTotal)}</div></div><button class="text-center p-2 px-3 w-full self-center max-w-[220px] rounded-lg hover:bg-purple-700 bg-purple-400 border-2 text-sm text-slate-700"> Make Payment</button></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cart.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
  setup() {
    const openCart = () => {
      productStore().$patch({ showCart: true });
    };
    useHead({
      link: [{ rel: "stylesheet", href: "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" }]
    });
    return { openCart };
  },
  computed: {
    numberOfItems() {
      const cartItems = productStore().$state.cart;
      const itemNumber = cartItems.reduce((number, item) => number += item.numberOfItems, 0);
      return itemNumber;
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_NuxtLink = __nuxt_component_0$1;
  const _component_toast = __nuxt_component_1;
  const _component_cart = __nuxt_component_2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "" }, _attrs))}><div class="flex w-full justify-between items-center p-1 px-3 fixed top-0 left-0 z-[14] bg-gray-100">`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/products",
    class: "text-lg text-slate-700 font-bold"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`iMarket`);
      } else {
        return [
          createTextVNode("iMarket")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="relative"><i class="bi bi-cart-fill text-[27px] font-extrabold"></i><div class="text-[12px] leading-[0] font-semibold bg-purple-600 p-[7px] rounded-full absolute top-[12px] right-[-5px]">${ssrInterpolate($options.numberOfItems)}</div></div></div>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(ssrRenderComponent(_component_toast, null, null, _parent));
  _push(ssrRenderComponent(_component_cart, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const home = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { home as default };
//# sourceMappingURL=home.d0211c6a.mjs.map
