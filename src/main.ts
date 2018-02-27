import Vue from 'vue'
// import 'common/registerHooks'
import 'assets/style/app.scss'
import './icons'
import router from 'router'
import store from 'store'
import App from 'pages/app'
import {$api} from './api/commonApi'

// register plugins hooks fo vue component
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// fixme: 图表组件
import hxqh from 'hx-table'
import 'hx-table/dist/styles/common.css'

Vue.use(ElementUI, {size: 'mini'})
Vue.use(hxqh,{
    pager_size_opts: [20, 50, 100],  // 每页展示数量
    pager_Size: 20  //  默认显示每页数量，和opts第一个一样
})

import api from 'api'
import apiService from 'api-service'

let baseUrl = {
    apiUrl: localStorage.getItem('apiUrl')
}
// 组建fetch 相关设置
Vue.prototype.$api= $api
Vue.prototype.api=api
Vue.prototype.apiService=apiService
Vue.prototype.$baseUrl=baseUrl
/*router.beforeEach((to, from, next) => {
    store.dispatch('auth/isExpired')
    if (store.getters['auth/isExpired']) {
        Vue.prototype.$alert('登录已经失效请重新登陆', '登录失效', {
            confirmButtonText: '确定',
            callback: action => {
                window.location.href = '/login.html'
            }
        })
    } else {
        next()
    }


})*/

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
