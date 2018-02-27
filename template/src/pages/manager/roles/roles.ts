/**
 * Created by wisdom on 2018/1/3.
 */
import Vue from 'base'
import { Component } from 'vue-property-decorator'
import template from './roles.vue'
import { routers } from 'router'
const clone = require('clone')
import tree from './../../widgets/tree/tree'
import {getRoleList, saveRole, editRole, updateRole, deleteRole} from '../../../api-service/manager/role.service'
import {getPermList} from '../../../api-service/manager/permission.service'
import {getClientList} from '../../../api-service/client/manager.service'
@Component({
    name: 'roles',
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
        //this.getAllPermList()
        this.getClientList()
    }
})

export default class roles extends Vue {

    options: any = Object.assign({}, Vue.prototype.$xvuex.options, {
        border:false,
        url: Vue.prototype.$baseUrl.imss + 'DataDictionary?$filter=(TypeId eq 3)',
        urlParameter: {
            $filter: '',
            $orderby: '',
            $expand: ''
        },
        dicUrls: {
            /*SecondSeatSystemDict: Vue.prototype.$baseUrl.imss + `DataDictionaryType?$filter=(Code eq 'SS')&$expand=DataDictionary`,
            SecondSeatStatusDict: Vue.prototype.$baseUrl.imss + `DataDictionaryType?$filter=(Code eq 'SSS')&$expand=DataDictionary`*/
        },
        title: '次席系统',  // 本页面名称
        gridKey: 'DataDictionary',  // 本页面 Eng名，唯一
        isSelection: false, // 是否开启多选checkBox
        table: [
            {
                key: 'Id',
                title: 'ID',
                addLayer: 'hide',   // 新增页面是否显示：show  hide,默认show
                editLayer: 'hide', // 编辑页面 是否显示：show  hide,默认show
                searchKey: 'hide', // 搜索下拉 是否显示：show  hide,默认show
                column: 'hide',  // 列表 是否显示：show  hide,默认show
                width: 'auto',   // 长度 200,默认auto
                type: 'number'  // 默认 string  ，种类：string  number select remoteMethod
            },
            {
                key: 'Code',//UserName
                title: '登录名',
                rules: [{required: true, message: '必填'}]
            },
            {
                key: 'FullName',
                title: '名称',
                rules: [{required: true, message: '必填'}]
            },
            {
                key: 'SalesDepartment',
                title: '部门',
                rules: [{required: true, message: '必填'}]
            },
            {
                key: 'IsSuperAdmin',
                title: '超级管理员',
                searchKey: 'hide',
                selects: [{value:true,text:'是'},{value:false,text:'否'}],
                type: 'select',
                filter: true,
                filters: [{value:`(IsSuperAdmin eq true)`,text:'是'},{value:`(IsSuperAdmin eq false)`,text:'否'}],
                rules: [{required: true, message: '必填'}]
            },
            {
                key: 'IsManager',
                title: '管理员',
                searchKey: 'hide',
                selects: [{value:true,text:'是'},{value:false,text:'否'}],
                type: 'select',
                filter: true,
                filters: [{value:`(IsManager eq true)`,text:'是'},{value:`(IsManager eq false)`,text:'否'}],
                rules: [{required: true, message: '必填'}]
            },
            {
                key: 'Enabled',
                title: '启用',
                searchKey: 'hide',
                selects: [{value:true,text:'是'},{value:false,text:'否'}],
                type: 'select',
                filter: true,
                filters: [{value:`(Enabled eq true)`,text:'是'},{value:`(Enabled eq false)`,text:'否'}],
                rules: [{required: true, message: '必填'}]
            },
            {
                key: 'action',
                title: '操作',
                addLayer: 'hide',  // 新增页面 是否显示：不显示写，显示可不写或其他值
                editLayer: 'hide',  // 新增页面 是否显示：不显示写，显示可不写或其他值
                searchKey: 'hide', // 搜索下拉 是否显示：show  hide,默认show
                fixed: 'right',
                render: [
                    {
                        fn: this.showViewModel,
                        type: 'primary',
                        tag: 'button',
                        text: '编辑'
                    }
                ]
            }
        ]
    })
    dialogVisible:boolean = false
    activeName:string = 'first'
    title:string = ''
    selectPermissions: Array<object> = []
    treeData: Array<object> =[]
    initPermData: Array<object> =[]
    client:string = ''
    clientList: Array<object> =[]
    form:object = {
        name:null,
        displayName: null,
        description: null,
        isStatic:false,
        permissions:[]
    }
    filterText:string = null
    initAllTable: Array<object> = []
    allTable: Array<object> = []
    tableData: Array<object> = []
    totalCount:number = 0
    curentPage:number = 1
    pageSize:number= 20
    pageSizes: Array<object> = [20,30,50]
    isEdit:boolean = false
    //checkedPerm: Array<object> = []
    checkedPerm: Array<object> = []
    data3: Array<object> = [{
        id: 1,
        label: '一级 2',
        children: [{
            id: 3,
            label: '二级 2-1',
            children: [{
                id: 4,
                label: '三级 3-1-1'
            }, {
                id: 5,
                label: '三级 3-1-2',
                disabled: true
            }]
        }, {
            id: 2,
            label: '二级 2-2',
            disabled: true,
            children: [{
                id: 6,
                label: '三级 3-2-1'
            }, {
                id: 7,
                label: '三级 3-2-2',
                disabled: true
            }]
        }]
    }]
    async initData(name){
        let data = await getRoleList(name)
        let result = data.result.items //.reverse()
        this.initAllTable = result
        let resultData = clone(result)
        resultData.forEach(function(item){
            if(item.isStatic){
                item.isStatic = '是'
            }else{
                item.isStatic = '否'
            }
        })
        this.allTable = resultData
        if(this.allTable){
            this.totalCount = data.result.totalCount
        }else{
            this.totalCount = 0
        }
        this.handleCurrentChange(this.curentPage)
    }

    async getClientList(){
        let data = await getClientList('')
        this.clientList = data.result
    }

    async getPermList(id){
        let data = await getPermList(id)
        this.treeData = data.result
    }

    async getAllPermList(){
        let data = await getPermList('')
        this.initPermData = data.result
    }

    handleSizeChange(val) {
        let totalPage = Math.ceil(this.totalCount/val)
        this.pageSize = val
        if(this.curentPage < totalPage){
            let start = (this.curentPage - 1)*val
            let end = start + val
            this.tableData = this.allTable.slice(start, end)
        }else if(this.curentPage == totalPage){
            let start = (this.curentPage - 1)*val
            let end = this.totalCount
            this.tableData = this.allTable.slice(start, end)
        }
    }
    handleCurrentChange(val) {
        let totalPage = Math.ceil(this.totalCount/this.pageSize)
        this.curentPage = val
        if(val < totalPage){
            let start = (val - 1)*this.pageSize
            let end = start + this.pageSize
            this.tableData = this.allTable.slice(start, end)
        }else if(val == totalPage){
            let start = (val - 1)*this.pageSize
            let end = this.totalCount
            this.tableData = this.allTable.slice(start, end)
        }
    }
    search(){
        this.initData(this.filterText)
    }

    async showModel(){
        this.title = '新增角色'
        this.activeName = 'first'
        this.dialogVisible = true
        this.isEdit = false
        this.client = ''
        this.checkedPerm = []
        let data = await editRole('','')
        this.form = data.result.role
        this.treeData  = data.result.permissions
    }

    async showViewModel(row){
        this.title = '编辑角色'
        this.activeName = 'first'
        this.dialogVisible = true
        this.isEdit = true
        let data = await editRole('',row.id)
        this.form = data.result.role
        let permissionsArr = data.result.role.permissions
        if(this.form.permissions.length > 0){
            this.client = this.form.permissions[0].clientId
        }else{
            this.client = ''
        }
        this.checkedPerm = []
        this.changeCilent(this.client)

        /*let result = []
        let data = await getPermList(this.client)
        this.treeData = data.result
        let _self = this
        permissionsArr.forEach(function(item){
            _self.getNodeByName(_self.initPermData, item, result)
        })
        //显示已勾选的数据
        let checkArr = []
        result.forEach(function(item){
            checkArr.push(item.id)
        })
        this.selectPermissions = result
        this.$refs.roleTree.initSelectedItems(result)
        this.checkedPerm = checkArr*/
    }
    getNodeByName(data, curItem, result){
        let _self = this
        data.forEach(function(item){
            if(item.name == curItem.name && item.clientId == curItem.clientId){
                result.push(item)
                return false
            }
            if(item.children && item.children.length > 0){
                _self.getNodeByName(item.children, curItem, result)
            }
        })
    }
    getNode(data, clientid, name){
        let _self = this
        data.forEach(function(item){
            if(item.name == name && item.clientId == clientid){
                console.log(item.name,name)
                _self.checkedPerm.push(item.id)
                return false
            }
            if(item.children && item.children.length > 0){
                _self.getNode(item.children,clientid, name)
            }
        })
    }
    handleClose(done) {
        this.dialogVisible =false
    }
    handleClick(tab, event) {
        //console.log(tab, event);
    }
    getNodeItem(data, id, result){
        let _self = this
        data.forEach(function(item){
            if(item.id == id){
                result.push(item)
                return false
            }
            if(item.children && item.children.length > 0){
                _self.getNodeItem(item.children, id, result)
            }
        })
    }

    onSelectedItemChanged(idItems){
        this.selectPermissions = idItems
    }


    //切换客户端
    async changeCilent(val){
        this.client = val
        let data = await getPermList(val)
        this.treeData = data.result
        let _self = this
        this.checkedPerm = []
       // this.onSelectedItemChanged(this.form.permissions)
        let result = []
        this.form.permissions.forEach(function(item){
            _self.getNodeByName(_self.treeData, item, result)
        })
        let checkArr = []
        result.forEach(function(item){
            if(item.clientId == _self.client){
                checkArr.push(item.id)
            }
        })
        this.checkedPerm = checkArr
        let selectArr = []
        result.forEach(function(item){
            if(item.clientId == _self.client){
                selectArr.push(item)
            }
        })
        this.selectPermissions = selectArr
        this.$refs.roleTree.initSelectedItems(selectArr)
    }

    /*setPermissionsArr(arrs, selectItem){
        selectItem.forEach(function (item) {
            let flag = false
            let index = -1
            let selectIndex = -1
            if(arrs.length == 0){
                arrs.push({clientId: item.clientId, permissionNames: [item.name]})
            }else{
                arrs.forEach(function(permissions){
                    index = index + 1
                    if(permissions.clientId == item.clientId){
                        flag = true
                        selectIndex = index
                    }

                })
                if(flag){
                    var permStr = arrs[selectIndex].permissionNames.join(',')
                    if(permStr.indexOf(item.name) == -1){
                        arrs[selectIndex].permissionNames.push(item.name)
                    }
                }else{
                    arrs.push({clientId: item.clientId, permissionNames: [item.name]})
                }
            }

        })
        return arrs
    }*/

    setPermissionsArr(selectItem){
        let arrs = []
        selectItem.forEach(function (item) {
            let flag = false
            let index = -1
            let selectIndex = -1
            if(arrs.length == 0){
                arrs.push({clientId: item.clientId, permissionNames: [item.name]})
            }else{
                arrs.forEach(function(permissions){
                    index = index + 1
                    if(permissions.clientId == item.clientId){
                        flag = true
                        selectIndex = index
                    }

                })
                if(flag){
                    var permStr = arrs[selectIndex].permissionNames.join(',')
                    if(permStr.indexOf(item.name) == -1){
                        arrs[selectIndex].permissionNames.push(item.name)
                    }
                }else{
                    arrs.push({clientId: item.clientId, permissionNames: [item.name]})
                }
            }

        })
        return arrs
    }

    async onSubmit(){
        if(this.isEdit){
            //let arrs = this.setPermissionsArr(this.selectPermissions)
            let permArr = []
            this.selectPermissions.forEach(function(item){
                permArr.push(item.name)
            })
            let arrs = [{clientId:this.client,permissionNames:permArr}]
            this.form.permissions = arrs
            //console.log(arrs)
            let data = await updateRole(this.form)
            if (data.result) {
                this.$message({
                    message: '角色更新成功',
                    type: 'success'
                })
                this.initData('')
                this.dialogVisible =false
            } else {
                this.$message({
                    showClose: true,
                    message: data.error.message,
                    type: 'error'
                })
            }
        }else {
            let arrs = []
            this.selectPermissions.forEach(function (item) {
                arrs.push({clientId: item.clientId, name: item.name})
            })
            this.form.permissions = arrs
            let params = clone(this.form)
            let data = await saveRole(params)
            if (data.result) {
                this.$message({
                    message: '角色新增成功',
                    type: 'success'
                })
                this.initData('')
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

    removeRole(row){
        let _self = this
        this.$confirm('此操作将删除角色"' + row.name + '", 是否继续?', '权限删除确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            _self.deleteOrgById(row.id)
            this.dialogVisible = false
        }).catch(() => {
        });
    }
    async deleteOrgById(id){
        let data = await deleteRole(id)
        if (data.success) {
            this.$message({
                message: '角色删除成功',
                type: 'success'
            })
            this.initData('')
        } else {
            this.$message({
                showClose: true,
                message: data.error.message,
                type: 'error'
            })
        }
    }

    get getState() {
        return this.$store.state[this.options.gridKey]
    }
    get roleData(){
        let data = [
            {
                id: 1,
                label: '菜单权限',
                children: [{
                    id: 4,
                    label: '管理',
                    children: [{
                        id: 9,
                        label: '组织'
                    }, {
                        id: 10,
                        label: '角色'
                    }, {
                        id: 11,
                        label: '权限'
                    }]
                }]
            }, {
                id: 2,
                label: '组织管理',
                children: [{
                    id: 5,
                    label: '新增组织'
                }, {
                    id: 6,
                    label: '编辑组织'
                }, {
                    id: 7,
                    label: '删除组织'
                }]
            }, {
                id: 3,
                label: '角色管理',
                children: []
            }, {
                id:12,
                label: '用户管理',
                children: []
            }
        ]
        return data
    }

    setFilters() {

    }
    setTableData(tableData){

        /*let table = clone(this.options.table)
        table.forEach(function (item) {
            if(item.key === 'action'){
                item.render.forEach(function(tag){
                    if(tag.text == '设置密码'){
                        item.render.splice(tag,1)
                    }
                })
            }
        })
        this.$store.dispatch(this.options.gridKey + 'setData', {table:table})
*/
        let initData = clone(tableData)
        this.$store.dispatch(this.options.gridKey + 'setData', {tableData: initData})

    }

    tableFn() {
        return {}
    }
    editFn() {
        return {}
    }
    headerFn() {
        return {}
    }

    editRow(scope) { // 设置修改弹窗数据
        let _this = this
        let data = scope.row
        if (data) {
            this.getState.initTableData.forEach(function (item) {
                if (item.Id === data.Id) {
                    _this.$store.dispatch(_this.options.gridKey + '_edit_Window_Visible', item)
                }
            })
        }
    }

}