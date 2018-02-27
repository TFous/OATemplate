/**
 * Created by wisdom on 2018/1/3.
 */
import Vue from 'base'
import { Component } from 'vue-property-decorator'
import template from './home.vue'
import { routers } from 'router'
@Component({
    name: 'home',
    mixins: [template],
    watch: {
        'message': {
            handler: function (val, oldVal) {
                if (oldVal !== undefined) {

                }
            },
            deep: true
        }
    }
})

export default class home extends Vue {

    get menus() {
        let menus = []
        routers.forEach(function(item){
            if(item.hidden == false || item.hidden == undefined){
                menus.push(item)
            }

        })
        return menus
    }
    handleOpen(menu, childMenu) {
        this.$router.push({ path: menu.path+'/'+childMenu.path})
    }
}