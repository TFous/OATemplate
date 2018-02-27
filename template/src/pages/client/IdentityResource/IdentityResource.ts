/**
 * Created by wisdom on 2018/1/3.
 */
import Vue from 'base'
import { Component } from 'vue-property-decorator'
import template from './IdentityResource.vue'
import { routers } from 'router'
const clone = require('clone')
import tree from './../../widgets/tree/tree'
import items from './../../widgets/items/items'
import {getList, addIdentity, updateIdentity, editIdentity, deleteIdentity} from '../../../api-service/client/IdentityResource.service'
@Component({
    name: 'IdentityResource',
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

export default class IdentityResource extends Vue {

    dialogVisible:boolean = false
    activeName:string = 'first'
    title:string = ''
    form:object={
        required: null,
        emphasize: null,
        showInDiscoveryDocument: null,
        enabled: null,
        name: null,
        displayName: null,
        description: null,
        userClaims: null
    }
    selectPermissions: Array<object> = []
    itemProps:Array<object> =[
        {
            key: 'Name',
            title: '名称'
        },
        {
            key: 'Description',
            title: '说明'
        },
        {
            key: 'AlwaysIncludeInIdToken',
            title: '总是包含在Token中',
            type:'checkbox',
            text:'包含'
        }
    ]
    datas: Array<object> = []
    itemProps2:Array<object> =[
        {
            key: 'Name',
            title: '类型'
        },
        {
            key: 'Description',
            title: '说明'
        },
        {
            key: 'AlwaysIncludeInIdToken',
            title: '值'
        }
    ]
    datas2: Array<object> = []

    filterText:string = null
    initAllTable: Array<object> = []
    allTable: Array<object> = []
    tableData: Array<object> = []
    totalCount:number = 0
    curentPage:number = 1
    pageSize:number= 20
    pageSizes: Array<object> = [20,30,50]
    isEdit:boolean = false
    options: any = Object.assign({}, Vue.prototype.$xvuex.options, {
        border:false,
        url: Vue.prototype.$baseUrl.apiUrl + 'IdentityResource/GetAll',
        urlParameter: {
            $filter: '',
            $orderby: '',
            $expand: ''
        },
        dicUrls: {
            /*SecondSeatSystemDict: Vue.prototype.$baseUrl.imss + `DataDictionaryType?$filter=(Code eq 'SS')&$expand=DataDictionary`,
             SecondSeatStatusDict: Vue.prototype.$baseUrl.imss + `DataDictionaryType?$filter=(Code eq 'SSS')&$expand=DataDictionary`*/
        },
        getData_val: 'result',
        title: 'IdentityResource',  // 本页面名称
        gridKey: 'IdentityResource',  // 本页面 Eng名，唯一
        isSelection: false, // 是否开启多选checkBox
        isLocalPages: true,
        isSeniorSearch: false, //是否显示高级搜索
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
                key: 'name',//UserName
                title: '名称',
                rules: [{required: true, message: '必填'}]
            },
            {
                key: 'displayName',
                title: '显示名称'
            },
            {
                key: 'enabled',
                title: '启用'
            },
            {
                key: 'description',
                title: '说明'
            },
            {
                key: 'required',
                title: '必须'
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

    async showModel(){
        this.activeName = 'first'
        this.title = '新增'
        this.isEdit = false
        let data = await editIdentity('')
        let result = data.result
        if(result.userClaims.length > 0){
            result.userClaims = result.userClaims.join(',')
        }else{
            result.userClaims = null
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
        /*let data = null
        this.initAllTable.forEach(function(item){
            if(item.name == row.name){
                data = clone(item)
                if(data.userClaims.length > 0){
                    data.userClaims = data.userClaims.join(',')
                }else{
                    data.userClaims = null
                }

            }
        })
        this.form = data*/
        let data = await editIdentity(row.name)
        let result = data.result
        if(result.userClaims.length > 0){
            result.userClaims = result.userClaims.join(',')
        }else{
            result.userClaims = null
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

        if(this.isEdit){
            let data = await updateIdentity(params)
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
            let data = await addIdentity(params)
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

    removeIdentity(row){
        let _self = this
        this.$confirm('此操作将删除"'+row.name+'", 是否继续?', '删除确认', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            _self.deleteIdentityByName(row.name)
            this.dialogVisible =false
        }).catch(() => {
        });
    }
    async deleteIdentityByName(name){
        let data = await deleteIdentity(name)
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
    }

}