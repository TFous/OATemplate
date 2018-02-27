/**
 * Created by wisdom on 2017/12/25.
 */
import Vue from 'base'
import { Component } from 'vue-property-decorator'
import template from './ScrollBar.vue'

const delta = 15

@Component({
    name: 'ScrollBar',
    mixins: [template]
})
export default class ScrollBar extends Vue {
    top:number = 0

    handleScroll(e) {
        const eventDelta = e.wheelDelta || -e.deltaY * 3
        const $container = this.$refs.scrollContainer
        const $containerHeight = $container.offsetHeight
        const $wrapper = this.$refs.scrollWrapper
        const $wrapperHeight = $wrapper.offsetHeight
        if (eventDelta > 0) {
            this.top = Math.min(0, this.top + eventDelta)
        } else {
            if ($containerHeight - delta < $wrapperHeight) {
                if (this.top < -($wrapperHeight - $containerHeight + delta)) {
                    this.top = this.top
                } else {
                    this.top = Math.max(this.top + eventDelta, $containerHeight - $wrapperHeight - delta)
                }
            } else {
                this.top = 0
            }
        }
    }
}