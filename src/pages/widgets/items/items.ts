/**
 * Created by wisdom on 2018/1/3.
 */
import Vue from 'base'
import { Component, Prop } from 'vue-property-decorator'
import template from './items.vue'
import { routers } from 'router'
const clone = require('clone')

@Component({
    name: 'items',
    mixins: [template],
    watch: {
        'getState.initTableData': {
            handler: function (val, oldVal) {

                if (oldVal !== undefined) {
                    this.setFilters()
                    this.setTableData(val)
                }
            },
            deep: true
        },
        // 已选择的对象变化时
        'selectedItems': function () {
            // 触发selectedItemsChanged事件
            this.$emit('selectedItemsChanged', this.selectedItems)
            //console.log(this.selectedItems)
        },
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    }
})


export default class items extends Vue {

    @Prop()
    col:number
    @Prop()
    datas:Array
    @Prop()
    itemProps:Array
    @Prop()
    isArray:boolean
    removeDomain(item) {
        var index = this.datas.indexOf(item)
        if (index !== -1) {
            this.datas.splice(index, 1)
        }
    }
    addDomain() {
        let obj ={}
        /*itemProps.forEach(function(item){
            eval("obj."+item+"="+null);
        })*/
        this.datas.push({
        });

    }

    getCurrentNode(node){
        console.log(node)
    }
    handleNodeClick(data){
        //console.log(data)
        this.$emit('nodeChanged', data)
    }

}