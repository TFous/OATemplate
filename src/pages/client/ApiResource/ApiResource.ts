/**
 * Created by wisdom on 2018/1/3.
 */
import Vue from 'base'
import { Component } from 'vue-property-decorator'
import template from './ApiResource.vue'
import { routers } from 'router'
const clone = require('clone')
import tree from './../../widgets/tree/tree'
import items from './../../widgets/items/items'
import {getList, addApi, updateApi, editApi, deleteApi, getConstants} from '../../../api-service/client/ApiResource.service'

@Component({
    name: 'ApiResource',
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
    }
})

export default class ApiResource extends Vue {
    dialogVisible:boolean = false
    activeName:string = 'first'
    title:string = ''
    form:object={
        required: false,
        emphasize: false,
        showInDiscoveryDocument: false,
        enabled: false,
        name: null,
        displayName: null,
        description: null,
        userClaims: null,
        scopes:[],
        apiSecrets:[]
    }
    selectPermissions: Array<object> = []
    scopes: Array<object> = []
    apiSecrets: Array<object> = []
    scopesProps:Array<object> =[
        {
            key: 'name',
            title: '名称'
        },
        {
            key: 'displayName',
            title: '显示名称'
        },
        {
            key: 'description',
            title: '说明'
        },
        {
            key: 'required',
            title: '必须',
            type:'checkbox'
            //text:'必须'
        },
        {
            key: 'emphasize',
            title: '强调',
            type:'checkbox'
        },
        {
            key: 'showInDiscoveryDocument',
            title: '显示在发现文档中',
            type:'checkbox'
        },
        {
            key: 'userClaims',
            title: 'userClaims'
        }
    ]
    apiSecretsProps:Array<object> =[
        {
            key: 'value',
            title: '名称'
        },
        {
            key: 'description',
            title: '说明'
        },
        {
            key: 'expiration',
            title: '截止日期',
            type:'date'
        },
        {
            key: 'type',
            title: '类型',
            type:'select',
            selects:[]
        }
    ]
    /*
     "description": "string",
     "value": "string",
     "expiration": "2018-01-29T07:29:10.526Z",
     "type": "string"

    name: wucc-api,
    displayName: wucc api,
    description: null,
    required: false,
    emphasize: false,
    showInDiscoveryDocument: true,
    userClaims: []*/
    filterText:string = null
    initAllTable: Array<object> = []
    allTable: Array<object> = []
    tableData: Array<object> = []
    totalCount:number = 0
    curentPage:number = 1
    pageSize:number= 20
    pageSizes: Array<object> = [20,30,50]
    isEdit:boolean = false
    async initData(params){
        let data = await getList(params)
        let result = data.result //.reverse()
        this.initAllTable = result
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
        this.getConstantsDicts()
    }

    async getConstantsDicts(){
        let data = await getConstants()
        let dicts =  data.result
        let selects = []
        for(var item in dicts){
            //console.log(item,dicts[item])
            if(item == 'secretTypes'){
                let props = dicts[item]
                let arrs = []
                for(var key in props){
                    arrs.push({label:key,value:props[key]})
                }
                selects = arrs
            }

        }
        this.apiSecretsProps.forEach(function(item){
            if(item.key == 'type'){
                item.selects = selects
            }
        })
        //console.log(this.apiSecretsProps)
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

    async showModel(){
        this.activeName = 'first'
        this.title = '新增'
        this.isEdit = false
        let data = await editApi('')
        let result = data.result
        if(result.userClaims.length > 0){
            result.userClaims = result.userClaims.join(',')
        }else{
            result.userClaims = null
        }
        if(result.scopes.length > 0){
            result.scopes.forEach(function(item){
                if(item.userClaims.length > 0){
                    item.userClaims = item.userClaims.join(',')
                }else{
                    item.userClaims = null
                }
            })
        }
        this.form = result
        this.dialogVisible = true
    }
    search(){
        this.initData(this.filterText)
    }

    async showViewModel(row){
        this.activeName = 'first'
        this.title = '编辑'
        this.isEdit = true
        let data = await editApi(row.name)
        let result = data.result
        if(result.userClaims.length > 0){
            result.userClaims = result.userClaims.join(',')
        }else{
            result.userClaims = null
        }
        if(result.scopes.length > 0){
            result.scopes.forEach(function(item){
                if(item.userClaims.length > 0){
                    item.userClaims = item.userClaims.join(',')
                }else{
                    item.userClaims = null
                }
            })
        }
        this.form = result
        this.dialogVisible = true
    }
    handleClose(done) {
        this.dialogVisible =false
    }
    handleClick(tab, event) {
        //console.log(tab, event);
    }
    async onSubmit(){
        let params = clone(this.form)
        if(params.userClaims){
            params.userClaims = params.userClaims.split(',')
        }else{
            params.userClaims = []
        }
        //console.log(params)
        if(this.isEdit){
            let data = await updateApi(params)
            if (data.result) {
                this.$message({
                    message: '更新成功！',
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
            if(params.scopes.length > 0){
                params.scopes.forEach(function(item){
                    if(item.userClaims){
                        item.userClaims = item.userClaims.split(',')
                    }else{
                        item.userClaims = []
                    }
                })
            }
            //console.log(params)
            let data = await addApi(params)
            if (data.result) {
                this.$message({
                    message: '新增成功！',
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

    removeApi(row){
        let _self = this
        this.$confirm('此操作将删除"'+row.name+'", 是否继续?', '删除确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            _self.deleteApiByName(row.name)
            this.dialogVisible =false
        }).catch(() => {
        });
    }
    async deleteApiByName(name){
        let data = await deleteApi(name)
        if (data.success) {
            this.$message({
                message: '删除成功！',
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
        this.initData('')
    }

}