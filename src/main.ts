import { createApp } from "vue";
import InlineSvg from "vue-inline-svg";
import VueVirtualScroller from "vue-virtual-scroller";

import clickOutside from "@/directives/clickOutside";

import App from "./App.vue";
import "@/assets/styles/app.scss";
import "vue-virtual-scroller/dist/vue-virtual-scroller.css";

createApp(App)
  .use(VueVirtualScroller)
  .directive("click-outside", clickOutside)
  .component("inline-svg", InlineSvg)
  .mount("#app");
