/**
 * Created by wisdom on 2017/12/25.
 */
import Vue from 'base'
import { Component } from 'vue-property-decorator'
import template from './Sidebar.vue'

import SidebarItem from './SidebarItem/SidebarItem'
import ScrollBar from 'components/ScrollBar'
import { routers } from 'router'

@Component({
    name: 'Sidebar',
    mixins: [template],
    components: {
        SidebarItem,
        ScrollBar
    }
})

export default class Sidebar extends Vue {
    get sidebar () {
        return this.$store.getters['app/sidebar']
    }

    permission_routers = routers

}
