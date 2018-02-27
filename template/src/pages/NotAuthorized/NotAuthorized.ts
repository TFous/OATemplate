/**
 * Created by wisdom on 2018/1/3.
 */
import Vue from 'base'
import { Component } from 'vue-property-decorator'
import template from './NotAuthorized.vue'

@Component({
    name: 'NotAuthorized',
    mixins: [template]
})

export default class NotAuthorized extends Vue {
/*
    get message() {

        return '特朗普说这个页面你不能进......'
    }*/
}