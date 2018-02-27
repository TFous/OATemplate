/**
 * Created by wisdom on 2017/12/25.
 */
import Vue from 'base'
import { Component, Prop, Watch } from 'vue-property-decorator'
import template from './SidebarItem.vue'

// import { generateTitle } from 'utils/i18n'


@Component({
    name: 'SidebarItem',
    mixins: [template]
})
export default class SidebarItem extends Vue {
    @Prop()
    routes: array

    generateTitle (title) {
        return title // $t :this method from vue-i18n ,inject in @/lang/index.js
    }

}