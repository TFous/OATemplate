/**
 * Created by wisdom on 2017/12/25.
 */
import Vue from 'base'
import { Component } from 'vue-property-decorator'
import template from './entry.vue'

@Component({
    name: 'entry',
    mixins: [template]
})

export default class Index extends Vue {
    mounted () {
        var a = ['a', 'b', 'c']
        var iterator = a.entries()

        console.log(iterator.next().value)  // [0, 'a']
        console.log(iterator.next().value)  // [1, 'b']
        console.log(iterator.next().value)  // [2, 'c']
    }

}