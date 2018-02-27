import Vue from 'vue'
import VueRouter from 'vue-router';
import 'common/registerHooks'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import router from 'router'
// import store from 'store'

import Login from 'pages/login'
Vue.use(ElementUI)
Vue.use(VueRouter)

new Vue({
    el: '#app',
    // router,
    render: h => h(Login)
})