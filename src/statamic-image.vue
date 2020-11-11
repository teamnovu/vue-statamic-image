<template>
  <img
    v-if="fileTypeSupported"
    ref="imageRef"
    @load="onLoaded"
    :src="originalUrl"
    :srcset="imgSrcSet"
    :sizes="sizes"
    width="100%"
  />
  <img v-else :src="originalUrl" width="100%" />
</template>

<style>
</style>

<script>
import urlJoin from "url-join";

export default {
  props: {
    src: {
      required: true,
      type: String,
    },
    quality: {
      required: false,
      type: Number,
      default: 70,
    },
    blur: {
      required: false,
      type: Number,
    },
    fit: {
      required: false,
      type: String,
    },
    crop: {
      required: false,
      type: String,
    },
    format: {
      required: false,
      type: String,
    },
    fallbackWidth: {
      required: false,
      type: Number,
    },
    aspectRatio: {
      required: false,
      type: Number,
    },
    placeholderBlur: {
      required: false,
      default: 100,
      type: Number,
    },
    placeholderQuality: {
      required: false,
      default: 30,
      type: Number,
    },
    placeholderWidth: {
      required: false,
      type: Number,
      default: 400,
    },
    usePlaceholder: {
      required: false,
      default: true,
      type: Boolean,
    },
    placeholderDataUrl: {
      required: false,
      type: String,
    },
  },
  data() {
    return {
      sizes: "1px",
      isLoading: true,
    };
  },
  created() {
    const screens = Object.entries(this.$screenSizes)
      .map(([key, value]) => ({
        breakpoint: key,
        media: `min-width: ${value}`,
        size: value,
      }))
      .sort((a, b) => +b.size.replace("px", "") - +a.size.replace("px", ""));

    this.screens = screens;
  },
  mounted() {
    console.log(
      this.$statamicBaseUrl,
      this.$$statamicGlideApiEndpoint,
      this.src
    );
    window.addEventListener("resize", this.onResize, { passive: true });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    updateSizes() {
      return new Promise((resolve) => {
        window.requestAnimationFrame(() => {
          if (this.$refs.imageRef) {
            const imageWidth = this.$refs.imageRef.getBoundingClientRect()
              .width;
            const size = Math.ceil((imageWidth / window.innerWidth) * 100);
            this.sizes = `${size}vw`;
          }
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
      format,
    }) {
      if (!this.fileTypeSupported || !this.$statamicGlideApiEndpoint) {
        return urlJoin(this.$statamicBaseUrl, this.src);
      }

      let src = urlJoin(
        this.$statamicBaseUrl,
        this.$statamicGlideApiEndpoint,
        this.src
      );
      if (width) src += `&w=${width}`;
      if (width && aspectRatio) src += `&h=${Math.round(width / aspectRatio)}`;
      if (quality) src += `&q=${quality}`;
      if (blur) src += `&blur=${blur}`;
      if (fit) src += `&fit=${fit}`;
      if (crop) src += `&fit=${crop}`;
      if (format) src += `&format=${format}`;

      return src;
    },
  },
  computed: {
    fileTypeSupported() {
      const regex = /(?:\.([^.]+))?$/;
      const fileExtension = regex.exec(this.src)[1];

      return (
        fileExtension &&
        ["jpg", "png", "gif", "webp"].includes(fileExtension.toLowerCase())
      );
    },
    imgSrcSet() {
      let sizes = this.screens.map((screen) => screen.size.replace("px", ""));
      const srcSet = sizes.map(
        (size) =>
          this.generateSrc({
            width: size,
            quality: this.quality,
            fit: this.fit,
            format: this.format,
            crop: this.crop,
            aspectRatio: this.aspectRatio,
          }) + ` ${size}w`
      );

      if (this.usePlaceholder) {
        srcSet.push(this.placeholderUrl + " 32w");
      }
      return srcSet.join(",");
    },
    originalUrl() {
      return this.generateSrc({
        quality: this.quality,
        blur: this.blur,
        width: this.fallbackWidth,
        fit: this.fit,
        format: this.format,
        aspectRatio: this.aspectRatio,
        crop: this.crop,
      });
    },
    placeholderUrl() {
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
        crop: this.crop,
      });
    },
  },
};
</script>
