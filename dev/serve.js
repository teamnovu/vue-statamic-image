import Vue from "vue";
import Dev from "./serve.vue";

Vue.config.productionTip = false;

Vue.prototype.$screenSizes = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1600px",
  "3xl": "2000px",
};

Vue.prototype.$statamicBaseUrl = "http://novu-test-app-cms.test";

new Vue({
  render: (h) => h(Dev),
}).$mount("#app");
