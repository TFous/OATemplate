/**
 * Created by wisdom on 2018/1/3.
 */
import Vue from 'base'
import { Component, Prop } from 'vue-property-decorator'
import template from './tree.vue'
import { routers } from 'router'
const clone = require('clone')
@Component({
    name: 'tree',
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


export default class tree extends Vue {
    @Prop()
    data: Array
    @Prop()
    isExpandAll:boolean
    @Prop()
    isShowBox:boolean
    @Prop()
    searchShow:boolean
    @Prop()
    inputClass:string
    @Prop()
    checkedKeys:Array<object>

    defaultProps:object = {
        children: 'children',
        label: 'label'
    }
    //checkedKeys:Array<object> = []
    selectedItems: Array<object> =[]
    dialogVisible:boolean = false
    filterText:string = ''

    filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
    }
    setFilterText(){
        this.filterText = null
    }
    showModel(){
        let _self = this
        this.dialogVisible = true
        this.tree.forEach(function (item){
            if(item.label == _self.selectOrg.label){
                //console.log(item.id)
            }
        })
    }
    handleClose(done) {
        this.dialogVisible =false
    }

    append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
            this.$set(data, 'children', []);
        }
        data.children.push(newChild);
    }
    remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
    }
    getCurrentNode(node){
       // console.log(node)
    }
    initSelectedItems(data){
        this.selectedItems = data
    }
    handleCheckChange(data, checked, indeterminate) {
        let flag = false
        let i = 0
        let index  = -1
        this.selectedItems.forEach(function(item){
            if(data.id == item.id){
                flag = true
                index = i
            }
            i++
        })
        if(!flag){//节点未勾选
           if(checked){
               this.selectedItems.push(data)
           }
        }else{ //节点已勾选
            if(!checked){
                this.selectedItems.splice(index,1)
            }
        }
        //console.log(this.selectedItems)
    }
    handleNodeClick(data){
        //console.log(data)
        this.$emit('nodeChanged', data)
    }



}