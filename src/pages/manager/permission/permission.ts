/**
 * Created by wisdom on 2018/1/3.
 */
import Vue from 'base'
import { Component } from 'vue-property-decorator'
import template from './permission.vue'
import { routers } from 'router'
const clone = require('clone')
import tree from './../../widgets/tree/tree'
import {getPermList, savePerm, deletePerm, updatePerm} from '../../../api-service/manager/permission.service'
import {getClientList} from '../../../api-service/client/manager.service'
@Component({
    name: 'organization',
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
        }
    },
    components: {
        'tree': tree
    },
    mounted() {
        this.initData('')
        this.getClientList()
    }
})

export default class organization extends Vue {
    treeData: Array<object> =[]

    defaultProps:object = {
        children: 'children',
        label: 'label'
    }
    //orgName:string ='权限成员'
    selectItem: object = null
    parentOrg: object = null
    dialogVisible:boolean = false
    parentOrg:string = ''
    orgTitle:string =''
    isEditOrg:boolean = false
    state3:string =''
    ref:string='orgRef'
    form:object={
        clientId:null,
        parentName:null,
        name:null,
        parentId:null,
        displayName:null,
        description:null
    }
    userVisible:boolean = false
    userTitle:string =null
    parentName:string =null
    client:string = ''
    clientList: Array<object> =[]

    multipleSelection:Array<object> =  []

    async initData(id){
        if(id) {
            let data = await getPermList(id)
            this.treeData = data.result
            this.selectItem = null
            this.parentName = null
            this.$refs.orgRef.setFilterText()
        }else{
            this.treeData = []
        }
    }
    async getClientList(){
        let data = await getClientList('')
        this.clientList = data.result
    }
    handleSelectionChange(val) {
        this.multipleSelection = val;
    }
    toggleSelection() {
        let rows =[this.tableData3[0],this.tableData3[1]]
        if (rows.length > 0 ) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
        } else {
            this.$refs.multipleTable.clearSelection();
        }
    }
    onSelection(data){
        //console.log(data)
    }

    onNodeChanged(data) {
        this.selectItem = data
    }

    showModel(){
        this.orgTitle = '新增权限'
        this.isEditOrg = false
        this.dialogVisible = true
        if(this.selectItem){
            this.parentName = this.selectItem.displayName
            this.form = {
                parentId: this.selectItem.id,
                clientId: this.client,
                name: null,
                displayName: null,
                description:null
            }
        }else{
            this.parentName = null
            this.form = {
                parentId: null,
                clientId: this.client,
                name: null,
                displayName: null,
                description:null
            }
        }

    }
    showEditModel(){
        if(this.selectItem) {
            this.orgTitle = '编辑权限'
            this.isEditOrg = true
            this.dialogVisible = true
            //this.clearParentNode()
            this.form = this.selectItem
            this.getParentNode(this.treeData)
        }else{
            this.$message({
                //showClose: true,
                message: '请先选择权限',
                type: 'warning'
            })
        }

    }
    clearParentNode(){
        this.form.parentId = null
        this.parentName = null
    }
    getParentNode(data){
        let _self = this
        data.forEach(function(item){
            if(item.id == _self.selectItem.parentId){
                //_self.form.parentId= item.id
                _self.parentName = item.label
            }
            if(item.children && item.children.length > 0){
                _self.getParentNode(item.children)
            }
        })
    }
    //保存权限
    async submitPerm(){
        if(this.isEditOrg){
            let params = {
                id: this.form.id,
                name: this.form.name,
                displayName: this.form.displayName,
                description:this.form.description
            }
            let data = await updatePerm(params)
            if (data.result) {
                this.$message({
                    message: '权限更新成功',
                    type: 'success'
                })
                this.initData(this.client)
                this.dialogVisible =false
            } else {
                this.$message({
                    message: data.error.message,
                    type: 'error'
                })
            }
        }else {
            let params = clone(this.form)
            let data = await savePerm(params)
            if (data.result) {
                this.$message({
                    message: '权限新增成功',
                    type: 'success'
                })
                this.initData(this.client)
                this.dialogVisible =false
            } else {
                this.$message({
                    showClose: true,
                    message: data.error.message,
                    type: 'error'
                })
            }
        }
    }

    //关闭弹出框
    handleClose(done) {
        this.dialogVisible =false
    }
    //删除权限
    removePerm(){
        let _self = this
        if(this.selectItem) {
            this.$confirm('此操作将删除"' + this.selectItem.label + '", 是否继续?', '权限删除确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _self.deleteOrgById(_self.selectItem.id)
                this.dialogVisible = false
            }).catch(() => {
            });
        }else{
            this.$message({
                showClose: true,
                message: '请先选择权限',
                type: 'warning'
            })
        }
    }
    async deleteOrgById(id){
        let data = await deletePerm(id)
        if (data.success) {
            this.$message({
                message: '权限删除成功',
                type: 'success'
            })
            this.initData(this.client)
        } else {
            this.$message({
                showClose: true,
                message: data.error.message,
                type: 'error'
            })
        }
    }
    querySearch(queryString, cb) {
        var treeData = this.treeData
        var results = queryString ? treeData.filter(this.createFilter(queryString)) : treeData
        // 调用 callback 返回建议列表的数据
        cb(results);
    }
    createFilter(queryString) {
        return (treeData) => {
            return (treeData.label.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
    }
    //切换客户端
    changeCilent(val){
        this.client = val
        this.initData(val)
    }


}