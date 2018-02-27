/**
 * Created by wisdom on 2017/12/27.
 */
import Vue from 'base'
import { Component, Emit, Inject, Model, Prop, Provide,  Watch } from 'vue-property-decorator'
import template from './svgIcon.vue'

const delta = 15

@Component({
    name: 'svg-icon',
    mixins: [template]
})
export default class svgIcon extends Vue {

    @Prop()
    iconClass: String

    @Prop()
    className: String

    get iconName() {
        return `#icon-${this.iconClass}`
    }

    get svgClass() {
        if (this.className) {
            return 'svg-icon ' + this.className
        } else {
            return 'svg-icon'
        }
    }
}