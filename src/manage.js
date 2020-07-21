import Vue from 'vue'
import vuetify from './js/plugins/vuetify'
import router from '@/js/manage/router'
import Manage from './component/manage/Manage.vue'

new Vue({
    vuetify,
    router,
    el: '#app',
    data() {
        return {}
    },
    mounted() {
        console.log('Vue run')
    },
    components: { Manage },
    template: '<manage/>',
})
