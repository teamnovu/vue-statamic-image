//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script = {
  props: {
    src: {
      required: true,
      type: String
    },
    quality: {
      required: false,
      type: Number,
      default: 70
    },
    blur: {
      required: false,
      type: Number
    },
    fit: {
      required: false,
      type: String
    },
    crop: {
      required: false,
      type: String
    },
    format: {
      required: false,
      type: String
    },
    fallbackWidth: {
      required: false,
      type: Number
    },
    aspectRatio: {
      required: false,
      type: Number
    },
    placeholderBlur: {
      required: false,
      default: 100,
      type: Number
    },
    placeholderQuality: {
      required: false,
      default: 30,
      type: Number
    },
    placeholderWidth: {
      required: false,
      type: Number,
      default: 400
    },
    usePlaceholder: {
      required: false,
      default: true,
      type: Boolean
    }
  },

  data() {
    return {
      sizes: "1px",
      isLoading: true
    };
  },

  created() {
    const screens = Object.entries(this.$screenSizes).map(([key, value]) => ({
      breakpoint: key,
      media: `min-width: ${value}`,
      size: value
    })).sort((a, b) => +b.size.replace("px", "") - +a.size.replace("px", ""));
    this.screens = screens;
  },

  mounted() {
    window.addEventListener("resize", this.onResize, {
      passive: true
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },

  methods: {
    updateSizes() {
      return new Promise(resolve => {
        window.requestAnimationFrame(() => {
          const imageWidth = this.$refs.imageRef.getBoundingClientRect().width;
          const size = Math.ceil(imageWidth / window.innerWidth * 100);
          this.sizes = `${size}vw`;
          resolve();
        });
      });
    },

    onResize() {
      this.updateSizes();
    },

    async onLoaded() {
      await this.updateSizes();
      this.isLoading = false;
    },

    generateSrc({
      quality,
      width,
      aspectRatio,
      blur,
      addSrcSetWidth,
      fit,
      crop,
      format
    }) {
      let src = `${this.$statamicAssetUrl}${this.src}?`;
      if (width) src += `&w=${width}`;
      if (width && aspectRatio) src += `&h=${Math.round(width / aspectRatio)}`;
      if (quality) src += `&q=${quality}`;
      if (blur) src += `&blur=${blur}`;
      if (fit) src += `&fit=${fit}`;
      if (crop) src += `&fit=${crop}`;
      if (format) src += `&format=${format}`;
      return src;
    }

  },
  computed: {
    imgSrcSet() {
      let sizes = this.screens.map(screen => screen.size.replace("px", ""));
      const srcSet = sizes.map(size => this.generateSrc({
        width: size,
        quality: this.quality,
        fit: this.fit,
        format: this.format,
        crop: this.crop,
        aspectRatio: this.aspectRatio
      }) + ` ${size}w`);

      if (this.usePlaceholder) {
        srcSet.push(this.placeholderDataUrl + " 32w");
      }

      return srcSet.join(",");
    },

    originalDataUrl() {
      return this.generateSrc({
        quality: this.quality,
        blur: this.blur,
        width: this.fallbackWidth,
        fit: this.fit,
        format: this.format,
        aspectRatio: this.aspectRatio,
        crop: this.crop
      });
    },

    placeholderDataUrl() {
      if (this.placeholderDataUrl && !this.aspectRatio) {
        return this.placeholderDataUrl;
      }

      return this.generateSrc({
        blur: this.placeholderBlur,
        aspectRatio: this.aspectRatio,
        quality: this.placeholderQuality,
        width: this.placeholderWidth,
        fit: this.fit,
        format: this.format,
        aspectRatio: this.aspectRatio,
        crop: this.crop
      });
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;
/* template */

var __vue_render__ = function () {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c('img', {
    ref: "imageRef",
    attrs: {
      "src": _vm.originalDataUrl,
      "srcset": _vm.imgSrcSet,
      "sizes": _vm.sizes,
      "width": "100%"
    },
    on: {
      "load": _vm.onLoaded
    }
  });
};

var __vue_staticRenderFns__ = [];
/* style */

const __vue_inject_styles__ = undefined;
/* scoped */

const __vue_scope_id__ = undefined;
/* module identifier */

const __vue_module_identifier__ = undefined;
/* functional template */

const __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

const __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);

var defaultScreenSizes = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1600px",
  "3xl": "2000px"
};

// Import vue component

const install = function installStatamicImage(Vue, options) {
  if (install.installed) return;
  install.installed = true;
  let {
    screenSizes,
    statamicAssetUrl
  } = options;

  const isObj = obj => typeof obj === "object" && obj !== null;

  if (!screenSizes || !isObj(screenSizes) || Object.keys(screenSizes).length === 0) {
    screenSizes = defaultScreenSizes;
  }

  if (!statamicAssetUrl || !typeof statamicAssetUrl === "string" || !statamicAssetUrl instanceof String || statamicAssetUrl.length === 0) {
    throw new Error("Statamic asset url was not properly configured.");
  }

  Vue.prototype.$screenSizes = screenSizes;
  Vue.prototype.$statamicAssetUrl = statamicAssetUrl;
  Vue.component("StatamicImage", __vue_component__);
}; // Create module definition for Vue.use()
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;

export default __vue_component__;
