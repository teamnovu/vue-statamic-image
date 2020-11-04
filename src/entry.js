// Import vue component
import component from "@/statamic-image.vue";

// install function executed by Vue.use()
const install = function installStatamicImage(Vue, options) {
  if (install.installed) return;
  install.installed = true;

  let { tailwindScreens, statamicAssetUrl } = options;

  const isObj = (obj) => typeof obj === "object" && obj !== null;

  if (
    !tailwindScreens ||
    !isObj(tailwindScreens) ||
    Object.keys(tailwindScreens).length === 0
  ) {
    tailwindScreens = {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1600px",
      "3xl": "2000px",
    };
  }

  if (
    !statamicAssetUrl ||
    !typeof statamicAssetUrl === "string" ||
    !statamicAssetUrl instanceof String ||
    statamicAssetUrl.length === 0
  ) {
    throw new Error("Statamic asset url was not properly configured.");
  }

  Vue.prototype.$tailwindScreens = tailwindScreens;
  Vue.protoype.$statamicAssetUrl = statamicAssetUrl;

  Vue.component("StatamicImage", component);
};

// Create module definition for Vue.use()
const plugin = {
  install,
};

// To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare
/* global window, global */
if ("false" === process.env.ES_BUILD) {
  let GlobalVue = null;
  if (typeof window !== "undefined") {
    GlobalVue = window.Vue;
  } else if (typeof global !== "undefined") {
    GlobalVue = global.Vue;
  }
  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
}

// Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()
component.install = install;

// Export component by default
export default component;

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
