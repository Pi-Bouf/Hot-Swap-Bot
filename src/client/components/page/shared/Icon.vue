<template>
  <i class="las" :class="icon" :style="`font-size: ${size}px; color: ${color}`"></i>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'icon',
  props: {
    icon: {
      type: String,
      required: false,
      default: "la-grin-hearts"
    },
    size: {
      type: String,
      required: false,
      default: 12
    },
    color: {
      type: String,
      required: false,
      default: "black"
    }
  }
});
</script>

<style lang="scss" scoped>

</style>
