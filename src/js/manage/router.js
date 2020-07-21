import Vue from 'vue'
import Router from 'vue-router'
import Manage_homepage from 'Manage/Homepage.vue'
import Enviroment_dashboard from 'Manage/Enviroment-dashboard.vue'
import Audio_dashboard from 'Manage/Audio-dashboard.vue'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', name: 'homepage', component: Manage_homepage },
        { path: '/enviroment-dashboard', name: 'enviroment-dashboard', component: Enviroment_dashboard },
        { path: '/audio-dashboard', name: 'audio-dashboard', component: Audio_dashboard },
    ],
})
