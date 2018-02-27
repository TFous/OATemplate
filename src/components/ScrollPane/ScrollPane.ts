/**
 * Created by wisdom on 2017/12/27.
 */
import Vue from 'base'
import { Component } from 'vue-property-decorator'
import template from './ScrollPane.vue'
const padding: number = 15 // tag's padding

@Component({
    name: 'ScrollPane',
    mixins: [template]
})
export default class ScrollPane extends Vue {

    left: number = 0

    handleScroll(e) {
        const eventDelta = e.wheelDelta || -e.deltaY * 3
        const $container = this.$refs.scrollContainer
        const $containerWidth = $container.offsetWidth
        const $wrapper = this.$refs.scrollWrapper
        const $wrapperWidth = $wrapper.offsetWidth

        if (eventDelta > 0) {
            this.left = Math.min(0, this.left + eventDelta)
        } else {
            if ($containerWidth - padding < $wrapperWidth) {
                if (this.left < -($wrapperWidth - $containerWidth + padding)) {
                    this.left = this.left
                } else {
                    this.left = Math.max(this.left + eventDelta, $containerWidth - $wrapperWidth - padding)
                }
            } else {
                this.left = 0
            }
        }
    }

    moveToTarget($target) {
        const $container = this.$refs.scrollContainer
        const $containerWidth = $container.offsetWidth
        const $targetLeft = $target.offsetLeft
        const $targetWidth = $target.offsetWidth

        if ($targetLeft < -this.left) {
            // tag in the left
            this.left = -$targetLeft + padding
        } else if ($targetLeft + padding > -this.left && $targetLeft + $targetWidth < -this.left + $containerWidth - padding) {
            // tag in the current view
            // eslint-disable-line
        } else {
            // tag in the right
            this.left = -($targetLeft - ($containerWidth - $targetWidth) + padding)
        }
    }

}