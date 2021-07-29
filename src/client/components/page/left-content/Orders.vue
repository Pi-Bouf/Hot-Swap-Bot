<template>
  <div id="orders">
    <div class="header">
      <div class="token">Tokens</div>
      <div class="objective">Objective %</div>
      <div class="price-change">Price Change %</div>
      <div class="wbnb-value">WBNB Value</div>
    </div>
    <div class="entries">
      <div class="entry">
        <div class="token"><icon icon="la-angle-right" size="22"></icon> <span>Pancake</span></div>
        <div class="objective">
          <div class="value">23%</div>
          <progress-bar color="#233984" :percent="(parseInt(Math.random() * 100)).toString()"></progress-bar>
        </div>
        <div class="price-change">+{{ (Math.random() * 200).toFixed(3)}}%</div>
        <div class="wbnb-value">{{ (Math.random() * 5).toFixed(6) }}</div>
      </div>
      <div class="entry">
        <div class="token"><icon icon="la-angle-right" size="22"></icon> <span>Sponge</span></div>
        <div class="objective">
          <div class="value">125%</div>
          <progress-bar color="#D7F85B" :percent="(parseInt(Math.random() * 100)).toString()"></progress-bar>
        </div>
        <div class="price-change">+{{ (Math.random() * 200).toFixed(3)}}%</div>
        <div class="wbnb-value">{{ (Math.random() * 5).toFixed(6) }}</div>
      </div>
      <div class="entry">
        <div class="token"><icon icon="la-angle-right" size="22"></icon> <span>Steam</span></div>
        <div class="objective">
          <div class="value">23%</div>
          <progress-bar color="#015E5F" :percent="(parseInt(Math.random() * 100)).toString()"></progress-bar>
        </div>
        <div class="price-change">+{{ (Math.random() * 200).toFixed(3)}}%</div>
        <div class="wbnb-value">{{ (Math.random() * 5).toFixed(6) }}</div>
      </div>
      <div class="entry">
        <div class="token"><icon icon="la-angle-right" size="22"></icon> <span>Rich</span></div>
        <div class="objective">
          <div class="value">3%</div>
          <progress-bar color="#C4B8FF" :percent="(parseInt(Math.random() * 100)).toString()"></progress-bar>
        </div>
        <div class="price-change">+{{ (Math.random() * 200).toFixed(3)}}%</div>
        <div class="wbnb-value">{{ (Math.random() * 5).toFixed(6) }}</div>
      </div>
      <div class="entry">
        <div class="token"><icon icon="la-angle-right" size="22"></icon> <span>Alpaca</span></div>
        <div class="objective">
          <div class="value">12.78%</div>
          <progress-bar color="#36D577" :percent="(parseInt(Math.random() * 100)).toString()"></progress-bar>
        </div>
        <div class="price-change">+{{ (Math.random() * 200).toFixed(3)}}%</div>
        <div class="wbnb-value">{{ (Math.random() * 5).toFixed(6) }}</div>
      </div>
      <div class="entry">
        <div class="token"><icon icon="la-angle-right" size="22"></icon> <span>Soak</span></div>
        <div class="objective">
          <div class="value">345.78%</div>
          <progress-bar color="#FEEF5E" :percent="(parseInt(Math.random() * 100)).toString()"></progress-bar>
        </div>
        <div class="price-change">+{{ (Math.random() * 200).toFixed(3)}}%</div>
        <div class="wbnb-value">{{ (Math.random() * 5).toFixed(6) }}</div>
      </div>
      <div class="entry">
        <div class="token"><icon icon="la-angle-right" size="22"></icon> <span>SUPRA</span></div>
        <div class="objective">
          <div class="value">112.23%</div>
          <progress-bar color="#DBDBDB" :percent="(parseInt(Math.random() * 100)).toString()"></progress-bar>
        </div>
        <div class="price-change">+{{ (Math.random() * 200).toFixed(3)}}%</div>
        <div class="wbnb-value">{{ (Math.random() * 5).toFixed(6) }}</div>
      </div>
      <div class="entry">
        <div class="token"><icon icon="la-angle-right" size="22"></icon> <span>DAI</span></div>
        <div class="objective">
          <div class="value">12.98%</div>
          <progress-bar color="#209D9E" :percent="(parseInt(Math.random() * 100)).toString()"></progress-bar>
        </div>
        <div class="price-change">+{{ (Math.random() * 200).toFixed(3)}}%</div>
        <div class="wbnb-value">{{ (Math.random() * 5).toFixed(6) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Icon from '../shared/Icon.vue';
import ProgressBar from './ProgressBar.vue';

export default Vue.extend({
  name: 'orders',
  components: {ProgressBar, Icon}
});
</script>

<style lang="scss" scoped>
#orders {
  margin-top: 70px;
  display: flex;
  flex-direction: column;

  .header {
    display: flex;
    flex-direction: row;

    font-size: 16px;
    font-family: "Poppins Thin", sans-serif;
    color: #888888;
  }

  .entries {
    display: flex;
    flex-direction: column;

    .entry {
      margin-top: 25px;

      display: flex;
      flex-direction: row;
    }
  }

  .token {
    width: 300px;
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }

  .objective {
    width: 250px;
    display: flex;
    flex-direction: row;

    .value {
      width: 80px;
    }
  }

  .price-change {
    width: 200px;
  }

  .wbnb-value {
    width: 200px;
  }
}
</style>
