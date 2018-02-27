/**
 * Created by wisdom on 2017/12/27.
 */
import Vue from 'vue'
import { Component, Watch } from 'vue-property-decorator'
import template from './tagViews.vue'

import ScrollPane from 'components/ScrollPane'

@Component({
    name: 'tagViews',
    mixins: [template],
    components: {
        ScrollPane
    }
})

export default class tagViews extends Vue {
    mounted() {
        this.addViewTags()
    }

    visible: boolean = false

    top: number = 0

    left: number = 0

    selectedTag: object = {}

    get visitedViews () {
        return this.$store.getters['tagsView/visitedViews']
    }

    generateRoute() {
        if (this.$route.name) {
            return this.$route
        }
        return false
    }

    isActive(route) {
        // return route.path === this.$route.path || route.name === this.$route.name
        return route.path === this.$route.path
    }

    addViewTags() {
        const route = this.generateRoute()
        if (!route) {
            return false
        }
        this.$store.dispatch('tagsView/addVisitedViews', route)
    }

    moveToCurrentTag() {
        const tags = this.$refs.tag
        this.$nextTick(() => {
            for (const tag of tags) {
                if (tag.to === this.$route.path) {
                    this.$refs.scrollPane.moveToTarget(tag.$el)
                    break
                }
            }
        })
    }

    closeSelectedTag(view) {
        this.$store.dispatch('tagsView/delVisitedViews', view).then((views) => {
            if (this.isActive(view)) {
                const latestView = views.slice(-1)[0]
                if (latestView) {
                    this.$router.push(latestView.path)
                } else {
                    this.$router.push('/')
                }
            }
        })
    }

    closeOthersTags() {
        this.$router.push(this.selectedTag.path)
        this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
            this.moveToCurrentTag()
        })
    }
    closeAllTags() {
        this.$store.dispatch('tagsView/delAllViews')
        this.$router.push('/')
    }
    openMenu(tag, e) {
        this.visible = true
        this.selectedTag = tag
        this.left = e.clientX
        this.top = e.clientY
    }

    closeMenu() {
        this.visible = false
    }

    @Watch('$route')
    routeChange(val: any, oldVal: any) {
        this.addViewTags()
        this.moveToCurrentTag()
    }

    @Watch('visible')
    visibleChange(val: boolean, oldVal: boolean) {
        if (val) {
            window.addEventListener('click', this.closeMenu)
        } else {
            window.removeEventListener('click', this.closeMenu)
        }
    }
}
