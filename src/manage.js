import "./style.css";
import "babel-polyfill";
import Vue from "vue";
import vuetify from "@/js/plugins/vuetify";
import router from "@/js/manage/router";
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import Manage from "Manage/Manage.vue";

// Vue.use(VueAxios, axios)

new Vue({
    vuetify,
    router,
    el: "#app",
    data() {
        return {};
    },
    mounted() {
        console.log("Vue run");
    },
    components: { Manage },
    template: "<manage/>",
});
