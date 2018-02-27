import Vue from 'base'
import store from  'store'
import apiService from 'api-service'
import { Component, Watch } from 'vue-property-decorator'
import template from './app.vue'
import entry from 'pages/entry'
import layout from 'components/layout'

import { USERNAME_KEY, STORAGE_IDENTITY_KEY, CLIENT_ID, CLIENT_SECRET } from '../../config/wucc-config'

let user = store.state.auth.user
let timestamp = (new Date()).getTime() / 1000
let callbacktime = user.expires_at - 10


@Component({
    name: 'page-app',
    mixins: [template],
    components: {
        entry,
        layout
    },
})
export default class App extends Vue {
    mounted () {
        this.startSlientRenew ()
    }
    startSlientRenew () {
        if (timestamp > callbacktime && timestamp < (user.expires_at - 5)) {
            apiService.login.slientRenew()
        }
        if (timestamp < callbacktime) {
            let time = (callbacktime - timestamp) * 1000
            setTimeout(function () {
                apiService.login.slientRenew()
            }, time)
        }
    }

    @Watch('$route')
    routerchange (val, oldVal) {
       /* let auth = store.getters['auth/user'].profile.role
        //次席客户信息管理页面
        if (val.name === 'client') {
            if(auth.indexOf('WPBS_ClientSecondSeatManage|Get') == -1){
                this.$router.push({ path: '/NotAuthorized'})
                let view = {
                    path: '/client/client'
                }
                this.setNotAuthorized (view)
            }
            //this.$router.push({ path: '/setMoney/setMoney',query:{Type:'Restore'}})
        }
        //出金参数设置
        if (val.name === 'Withdraw' || val.name === 'Restore') {

            if(auth.indexOf('WPBS_WithdrawManage') == -1){
                this.$router.push({ path: '/NotAuthorized'})
                let view = {
                    path: '/setMoney/Withdraw'
                }
                if (val.name === 'Restore') {
                    view.path = '/setMoney/Restore'
                }
                this.setNotAuthorized (view)
            }
        }*/
    }

    setNotAuthorized (view) {
        this.$nextTick(function () {
            this.$store.dispatch('tagsView/delRoleViews', view)
        })
    }
}
