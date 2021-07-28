<template>
  <div id="left-content">
    <navigation></navigation>
    <resume></resume>
    <orders></orders>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navigation from './left-content/Navigation.vue';
import Resume from './left-content/Resume.vue';
import Orders from './left-content/Orders.vue';

export default Vue.extend({
  name: "left-content",
  components: {
    Orders,
    Resume,
    Navigation
  }
});
</script>

<style lang="scss">
#left-content {
  display: flex;
  flex-direction: column;
  flex: 1;

  padding: 50px;
}
</style>
