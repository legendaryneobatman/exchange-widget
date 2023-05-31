import { createApp } from "vue";
import App from "./App.vue";
import InlineSvg from "vue-inline-svg";
import clickOutside from "@/directives/clickOutside";
import "@/assets/styles/app.scss";
createApp(App)
  .directive("click-outside", clickOutside)
  .component("inline-svg", InlineSvg)
  .mount("#app");
