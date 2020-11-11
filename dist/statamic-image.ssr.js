'use strict';Object.defineProperty(exports,'__esModule',{value:true});function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}//
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
    },
    placeholderDataUrl: {
      required: false,
      type: String
    }
  },
  data: function data() {
    return {
      sizes: "1px",
      isLoading: true
    };
  },
  created: function created() {
    var screens = Object.entries(this.$screenSizes).map(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          value = _ref2[1];

      return {
        breakpoint: key,
        media: "min-width: ".concat(value),
        size: value
      };
    }).sort(function (a, b) {
      return +b.size.replace("px", "") - +a.size.replace("px", "");
    });
    this.screens = screens;
  },
  mounted: function mounted() {
    window.addEventListener("resize", this.onResize, {
      passive: true
    });
  },
  beforeDestroy: function beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    updateSizes: function updateSizes() {
      var _this = this;

      return new Promise(function (resolve) {
        window.requestAnimationFrame(function () {
          if (_this.$refs.imageRef) {
            var imageWidth = _this.$refs.imageRef.getBoundingClientRect().width;

            var size = Math.ceil(imageWidth / window.innerWidth * 100);
            _this.sizes = "".concat(size, "vw");
          }

          resolve();
        });
      });
    },
    onResize: function onResize() {
      this.updateSizes();
    },
    onLoaded: function onLoaded() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this2.updateSizes();

              case 2:
                _this2.isLoading = false;

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    generateSrc: function generateSrc(_ref3) {
      var quality = _ref3.quality,
          width = _ref3.width,
          aspectRatio = _ref3.aspectRatio,
          blur = _ref3.blur,
          addSrcSetWidth = _ref3.addSrcSetWidth,
          fit = _ref3.fit,
          crop = _ref3.crop,
          format = _ref3.format;

      if (!this.fileTypeSupported) {
        return "".concat(this.$statamicAssetUrl).concat(this.src);
      }

      var src = "".concat(this.$statamicAssetUrl).concat(this.src, "?");
      if (width) src += "&w=".concat(width);
      if (width && aspectRatio) src += "&h=".concat(Math.round(width / aspectRatio));
      if (quality) src += "&q=".concat(quality);
      if (blur) src += "&blur=".concat(blur);
      if (fit) src += "&fit=".concat(fit);
      if (crop) src += "&fit=".concat(crop);
      if (format) src += "&format=".concat(format);
      return src;
    }
  },
  computed: {
    fileTypeSupported: function fileTypeSupported() {
      var regex = /(?:\.([^.]+))?$/;
      var fileExtension = regex.exec(this.src)[1];
      return fileExtension && ["jpg", "png", "gif", "webp"].includes(fileExtension.toLowerCase());
    },
    imgSrcSet: function imgSrcSet() {
      var _this3 = this;

      var sizes = this.screens.map(function (screen) {
        return screen.size.replace("px", "");
      });
      var srcSet = sizes.map(function (size) {
        return _this3.generateSrc({
          width: size,
          quality: _this3.quality,
          fit: _this3.fit,
          format: _this3.format,
          crop: _this3.crop,
          aspectRatio: _this3.aspectRatio
        }) + " ".concat(size, "w");
      });

      if (this.usePlaceholder) {
        srcSet.push(this.placeholderUrl + " 32w");
      }

      return srcSet.join(",");
    },
    originalUrl: function originalUrl() {
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
    placeholderUrl: function placeholderUrl() {
      var _this$generateSrc;

      if (this.placeholderDataUrl && !this.aspectRatio) {
        return this.placeholderDataUrl;
      }

      return this.generateSrc((_this$generateSrc = {
        blur: this.placeholderBlur,
        aspectRatio: this.aspectRatio,
        quality: this.placeholderQuality,
        width: this.placeholderWidth,
        fit: this.fit,
        format: this.format
      }, _defineProperty(_this$generateSrc, "aspectRatio", this.aspectRatio), _defineProperty(_this$generateSrc, "crop", this.crop), _this$generateSrc));
    }
  }
};function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
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
}/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _vm.fileTypeSupported ? _c('img', {
    ref: "imageRef",
    attrs: {
      "src": _vm.originalUrl,
      "srcset": _vm.imgSrcSet,
      "sizes": _vm.sizes,
      "width": "100%"
    },
    on: {
      "load": _vm.onLoaded
    }
  }) : _c('img', {
    attrs: {
      "src": _vm.originalUrl,
      "width": "100%"
    }
  }, []);
};

var __vue_staticRenderFns__ = [];
/* style */

var __vue_inject_styles__ = undefined;
/* scoped */

var __vue_scope_id__ = undefined;
/* module identifier */

var __vue_module_identifier__ = "data-v-06f6edf2";
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject */

/* style inject SSR */

/* style inject shadow dom */

var __vue_component__ = /*#__PURE__*/normalizeComponent({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, false, undefined, undefined, undefined);var defaultScreenSizes = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1600px",
  "3xl": "2000px"
};var install = function installStatamicImage(Vue, options) {
  if (install.installed) return;
  install.installed = true;
  var screenSizes = options.screenSizes,
      statamicAssetUrl = options.statamicAssetUrl;

  var isObj = function isObj(obj) {
    return _typeof(obj) === "object" && obj !== null;
  };

  if (!screenSizes || !isObj(screenSizes) || Object.keys(screenSizes).length === 0) {
    screenSizes = defaultScreenSizes;
  }

  if (!statamicAssetUrl || !_typeof(statamicAssetUrl) === "string" || !statamicAssetUrl instanceof String || statamicAssetUrl.length === 0) {
    throw new Error("Statamic asset url was not properly configured.");
  }

  Vue.prototype.$screenSizes = screenSizes;
  Vue.prototype.$statamicAssetUrl = statamicAssetUrl;
  Vue.component("StatamicImage", __vue_component__);
}; // Create module definition for Vue.use()


var plugin = {
  install: install
}; // To auto-install on non-es builds, when vue is found
// eslint-disable-next-line no-redeclare

/* global window, global */

{
  var GlobalVue = null;

  if (typeof window !== "undefined") {
    GlobalVue = window.Vue;
  } else if (typeof global !== "undefined") {
    GlobalVue = global.Vue;
  }

  if (GlobalVue) {
    GlobalVue.use(plugin);
  }
} // Inject install function into component - allows component
// to be registered via Vue.use() as well as Vue.component()


__vue_component__.install = install; // Export component by default
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
exports.default=__vue_component__;