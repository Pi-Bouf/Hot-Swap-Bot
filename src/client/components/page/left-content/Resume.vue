<template>
  <div id="resume">
    <div class="zone">
      <div class="icon">
        <icon icon="la-balance-scale" size="50"></icon>
      </div>
      <div class="content">
        <div class="label">Balance</div>
        <div class="value">342.948747</div>
      </div>
    </div>
    <div class="delimiter"></div>
        <div class="zone">
      <div class="icon">
        <icon icon="la-dollar-sign" size="50"></icon>
      </div>
      <div class="content">
        <div class="label">Dollar</div>
        <div class="value">18873.983</div>
      </div>
    </div>
    <div class="delimiter"></div>
        <div class="zone">
      <div class="icon">
        <icon icon="la-scroll" size="50"></icon>
      </div>
      <div class="content">
        <div class="label">WBNB</div>
        <div class="value">112.3</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Icon from '../shared/Icon.vue';

export default Vue.extend({
  name: 'resume',
  components: {Icon}
});
</script>

<style lang="scss" scoped>
#resume {
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-items: flex-start;

  .zone {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    .icon {
      margin-right: 20px;
    }

    .content {
      .label {
        font-size: 16px;
        font-family: "Poppins Thin", sans-serif;
        color: #888888;
      }

      .value {
        font-size: 22px;
      }
    }
  }

  .delimiter {
    width: 1px;
    margin: 0 5%;
    background-color: #CCCCCC;
  }
}
</style>
