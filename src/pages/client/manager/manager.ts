/**
 * Created by wisdom on 2018/1/3.
 */
import Vue from 'base'
import { Component } from 'vue-property-decorator'
import template from './manager.vue'
import { routers } from 'router'
const clone = require('clone')
import tree from './../../widgets/tree/tree'
import items from './../../widgets/items/items'
import {getClientList, getClient, addClient, saveClient,updateClient, deleteClient, getConstants, GetAllScopes} from '../../../api-service/client/manager.service'
@Component({
    name: 'manager',
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
        'tree': tree,
        'items': items
    },
    mounted() {
        this.initData('')
        this.getConstantsDicts()
        this.getAllScopes()
    }
})

export default class manager extends Vue {

    options: any = Object.assign({}, Vue.prototype.$xvuex.options, {
        border:false,
        url: Vue.prototype.$baseUrl.apiUrl + 'Client/GetAll',
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
    form:object={}
    selectPermissions: Array<object> = []
    isEdit: boolean = false
    filterText:string = null
    allTable: Array<object> = []
    tableData: Array<object> = []
    totalCount:number = 0
    curentPage:number = 1
    pageSize:number= 20
    pageSizes: Array<object> = [20,30,50]
    dicts: Array<object> = []
    allScopesDicts: Array<object> = []
    addressProps:Array<object> =[
        {
            key: 'address',
            title: '地址'
        }
    ]
    clientSecretsProps:Array<object> =[
        {
            key: 'value',
            title: 'value'
        },
        {
            key: 'description',
            title: 'description'
        },
        {
            key: 'expiration',
            title: 'expiration'
        },
        {
            key: 'type',
            title: 'type'
        }
    ]
    claimsProps:Array<object> =[
        /*{
            key: 'id',
            title: 'id',
            type: 'number'
        },*/
        {
            key: 'value',
            title: 'value'
        },
        {
            key: 'type',
            title: 'type'
        }

    ]
    async initData(params){
        let data = await getClientList(params)
        let result = data.result //.reverse()
        let resultData = clone(result)
        resultData.forEach(function(item){
            if(item.enabled){
                item.enabled = '是'
            }else{
                item.enabled = '否'
            }
            if(item.required){
                item.required = '是'
            }else{
                item.required = '否'
            }
        })
        this.allTable = resultData
        if(this.allTable){
            this.totalCount = this.allTable.length
        }else{
            this.totalCount = 0
        }

        this.handleCurrentChange(this.curentPage)

    }

    async getConstantsDicts(){
        let data = await getConstants()
        this.dicts =  data.result
        for(var item in this.dicts){
            let props = this.dicts[item]
            let arrs = []
            for(var key in props){
                arrs.push({label:key,value:props[key]})
            }
            this.dicts[item] = arrs
        }
    }

    async getAllScopes(){
        let data = await GetAllScopes()
        this.allScopesDicts =  data.result
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
        this.tableData.forEach(function(item){
            if(item.enabled == true){
                item.enabled = '是'
            }else{
                item.enabled = '否'
            }
        })
        //console.log(`每页 ${val} 条`);
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
        //console.log(`当前页: ${val}`);
    }
    search(){
        //console.log(this.filterText)
        this.initData(this.filterText)
    }
    get getState() {
        return this.$store.state[this.options.gridKey]
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
    async showModel(){
        this.isEdit = false
        this.activeName = 'first'
        let data = await addClient()
        let result = data.result
        if(result.allowedGrantTypes.length > 0){
            result.allowedGrantTypes = result.allowedGrantTypes[0]
        }else{
            result.allowedGrantTypes = null
        }
        this.form = result
        this.title = '新增客户端'
        this.dialogVisible = true
    }

    async showViewModel(row){
        this.isEdit = true
        this.activeName = 'first'
        this.title = '编辑客户端'
        let data =  await getClient(row.clientId)
        let result = data.result
        if(result.allowedGrantTypes.length > 0){
            result.allowedGrantTypes = result.allowedGrantTypes[0]
        }else{
            result.allowedGrantTypes = null
        }
        this.dialogVisible = true
        for(var key in result){
            if(key == 'redirectUris'){
                var arrs = []
                result[key].forEach(function(item){
                    arrs.push({address: item})
                })
                result[key] = arrs
            }
            if(key == 'postLogoutRedirectUris'){
                var arrs = []
                result[key].forEach(function(item){
                    arrs.push({address: item})
                })
                result[key] = arrs
            }
            if(key == 'allowedCorsOrigins'){
                var arrs = []
                result[key].forEach(function(item){
                    arrs.push({address: item})
                })
                result[key] = arrs
            }
        }
        this.form = result

    }
    handleClose(done) {
        this.dialogVisible =false
    }
    handleClick(tab, event) {
        //console.log(tab, event);
    }
    async onSubmit(){
        let params= clone(this.form)
        if(params.allowedGrantTypes){
            params.allowedGrantTypes = [params.allowedGrantTypes]
        }else{
            params.allowedGrantTypes = []
        }

        for(var key in params){
            if(key == 'redirectUris'){
                var arrs = []
                params[key].forEach(function(item){
                    arrs.push(item.address)
                })
                params[key] = arrs

            }
            if(key == 'postLogoutRedirectUris'){
                var arrs = []
                params[key].forEach(function(item){
                    arrs.push(item.address)
                })
                params[key] = arrs

            }
            if(key == 'allowedCorsOrigins'){
                var arrs = []
                params[key].forEach(function(item){
                    arrs.push(item.address)
                })
                params[key] = arrs

            }
        }
       // console.log(params)
        if(this.isEdit){
            let data = await updateClient(params)
            if (data.result) {
                this.$message({
                    message: '更新成功',
                    type: 'success'
                })
                this.initData('')
                this.dialogVisible = false
            } else {
                this.$message({
                    showClose: true,
                    message: data.error.message,
                    type: 'error'
                })
            }
        }else{
            let data = await saveClient(params)
            if (data.result) {
                this.$message({
                    message: '新增成功',
                    type: 'success'
                })
                this.initData('')
                this.dialogVisible = false
            } else {
                this.$message({
                    showClose: true,
                    message: data.error.message,
                    type: 'error'
                })
            }
        }


    }
    onSelectedItemChanged(items){
        this.selectPermissions = items
    }
    removeClient(row){
        let _self = this
        this.$confirm('此操作将删除"'+row.clientId+'", 是否继续?', '删除确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            _self.deleteClientById(row.clientId)
            this.dialogVisible =false
        }).catch(() => {
        });
    }
    async deleteClientById(id){
        let data = await deleteClient(id)
        if (data.success) {
            this.$message({
                message: '删除成功',
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

}