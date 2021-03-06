// Import vue component
import component from "@/statamic-image.vue";
import defaultScreenSizes from "./default-screen-sizes";

// install function executed by Vue.use()
const install = function installStatamicImage(Vue, options) {
  if (install.installed) return;
  install.installed = true;

  let { screenSizes, statamicGlideApiEndpoint, statamicBaseUrl } = options;

  const isObj = (obj) => typeof obj === "object" && obj !== null;

  if (
    !screenSizes ||
    !isObj(screenSizes) ||
    Object.keys(screenSizes).length === 0
  ) {
    screenSizes = defaultScreenSizes;
  }

  if (
    !statamicBaseUrl ||
    !typeof statamicBaseUrl === "string" ||
    !statamicBaseUrl instanceof String ||
    statamicBaseUrl.length === 0
  ) {
    throw new Error("statamicBaseUrl was not properly configured.");
  }

  if (typeof statamicGlideApiEndpoint === "undefined") {
    statamicGlideApiEndpoint = "/img";
  }

  Vue.prototype.$screenSizes = screenSizes;
  Vue.prototype.$statamicGlideApiEndpoint = statamicGlideApiEndpoint;
  Vue.prototype.$statamicBaseUrl = statamicBaseUrl;

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
