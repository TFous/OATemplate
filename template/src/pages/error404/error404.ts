/**
 * Created by wisdom on 2018/1/3.
 */
import Vue from 'base'
import { Component } from 'vue-property-decorator'
import template from './error404.vue'

@Component({
    name: 'error404',
    mixins: [template]
})

export default class error404 extends Vue {

    get message() {
        return '特朗普说这个页面你不能进......'
    }
}