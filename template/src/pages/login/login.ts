import Vue from 'base'
import { Component } from 'vue-property-decorator'
import template from './login.vue'

import login from 'components/login'
import { USERNAME_KEY, STORAGE_IDENTITY_KEY, CLIENT_ID, CLIENT_SECRET } from '../../config/wucc-config'
import { imssUrlRootSite, mainUrlRootSite } from '../../config/site-config'
let refresh_token = window.location.href.split('refresh=')[1]
let u = document.referrer.split('/')[2]


import bg from '../../assets/images/bg1.jpg'

@Component({
    name: 'page-login',
    mixins: [template],
    components: {
        login
    }
})
export default class Login extends Vue {
    mounted () {
        if (refresh_token) {
            if (u === imssUrlRootSite) {
                try {
                    let refresh = JSON.parse(localStorage.getItem(STORAGE_IDENTITY_KEY)).refresh_token
                    if (refresh) {
                        this.apiService.login.refreshlogin(refresh)
                    }
                } catch (e) {
                    this.apiService.login.refreshlogin(refresh_token)
                }
            }
            if (u === mainUrlRootSite) {
                this.apiService.login.refreshlogin(refresh_token)
            }
        }
    }
}
