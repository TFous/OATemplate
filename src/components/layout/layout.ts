/**
 * Created by wisdom on 2017/12/25.
 */
import Vue from 'base'
import { Component } from 'vue-property-decorator'
import template from './layout.vue'
import Sidebar from './components/Sidebar'
import AppMain from './components/appMain'
import Navbar from './components/navbar'
import tagViews from './components/tagViews'

@Component({
    name: 'page-layout',
    mixins: [template],
    components: {
        Navbar,
        Sidebar,
        AppMain,
        tagViews
    },
})
export default class layout extends Vue {
    sidebar: object = this.$store.state.app.sidebar
    // get sidebar () {
    //     return this.$store.state.app.sidebar
    // }
}