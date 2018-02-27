/**
 * Created by wisdom on 2017/12/26.
 */
import { USERNAME_KEY, STORAGE_IDENTITY_KEY, CLIENT_ID, CLIENT_SECRET } from '../../../../config/wucc-config'
import Vue from 'base'
import { Component } from 'vue-property-decorator'
import template from './Navbar.vue'
import personMenu from 'components/personMenu'
// interface Data{
//     sidebar:object
// }
let wpsurl = 'http://wpbs.wdqh.com:6789/login.html'
@Component({
    name: 'Navbar',
    mixins: [template],
    components: {
        personMenu
    }
})
export default class Navbar extends Vue {
    mounted () {
        //console.log(this.$store)
    }
    //url = `${wpsurl}?refresh=${JSON.parse(localStorage.getItem(STORAGE_IDENTITY_KEY)).refresh_token}`

    get sidebar () {
        return this.$store.getters['app/sidebar']
    }

    toggleSideBar () {
        this.$store.dispatch('app/toggleSideBar')
    }
}