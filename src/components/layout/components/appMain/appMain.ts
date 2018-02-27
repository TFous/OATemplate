/**
 * Created by wisdom on 2017/12/25.
 */
import Vue from 'base'
import { Component } from 'vue-property-decorator'
import template from './appMain.vue'

@Component({
    name: 'app-main',
    mixins: [template],
})
export default class AppMain extends Vue {
    // get cachedViews() {
    //     return this.$store.state.tagsView.cachedViews
    // }
}