<template>
  <div class="progress-bar" :style="`width: ${size}px; height: ${height}px`">
    <div class="percent-bar" :style="`width: ${percentBarSize}px; height: ${height}px; background-color: ${color}`"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'progress-bar',
  props: {
    size: {
      type: String,
      required: false,
      default: "150"
    },
    height: {
      type: String,
      required: false,
      default: "25"
    },
    percent: {
      type: String,
      required: false,
      default: "50"
    },
    color: {
      type: String,
      required: false,
      default: "green"
    }
  },
  computed: {
    percentBarSize() {
      return (parseInt(this.size) * (parseInt(this.percent) / 100)) | 0;
    }
  }
});
</script>

<style lang="scss" scoped>
.progress-bar {
  border-radius: 8px;
  background-color: #F9F9F9;

  .percent-bar {
    width: 50px;
    border-radius: 8px;

    transition-duration: 0.1s;
    transition-timing-function: ease-in;
  }
}
</style>
