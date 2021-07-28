<template>
  <div class="button-line" @click="$emit('click')">
    <div class="label"><slot></slot></div>
    <div class="line"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'button-line'
});
</script>

<style lang="scss">
.button-line {
  font-family: 'Poppins Thin', sans-serif;
  font-weight: bold;

  cursor: pointer;

  &>div {
    transition-duration: 0.1s;
    transition-timing-function: ease-in;
  }

  .line {
    height: 2px;
    background-color: black;
    width: 0;
  }

  &:hover {
    .label {
      margin-top: -5px;
    }
    .line {
      width: 100%;
    }
  }
}
</style>
