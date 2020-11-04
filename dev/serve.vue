<script>
import Vue from 'vue';
import StatamicImage from '@/statamic-image.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    StatamicImage
  }
});
</script>

<template>
  <div id="app">
    <statamic-image />
  </div>
</template>
