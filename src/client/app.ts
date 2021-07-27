import Vue from "vue";
import Interface from "./components/interface.vue";

const app = new Vue({
    el: "#app",
    template: "<interface></interface>",
    components: {
        Interface
    }
});