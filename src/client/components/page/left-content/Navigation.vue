<template>
  <div id="navigation">
    <div id="title">HotSwapBot</div>
    <div class="links">
      <button-line>Orders</button-line>
      <button-line>Account</button-line>
      <button-line>Wallet</button-line>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ButtonLine from '../shared/ButtonLine.vue';

export default Vue.extend({
  name: 'Navigation',
  components: {
    ButtonLine,
  }
});
</script>

<style lang="scss" scoped>

#navigation {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  height: 50px;

  #title {
    font-size: 22px;
    font-weight: bold;
  }

  .links {
    width: 230px;
    margin-left: 150px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
