/**
 * Created by wisdom on 2017/12/25.
 */
import Vue from 'base'
import {Component} from 'vue-property-decorator'
import template from './restore.vue'

const clone = require('clone')
import Vue from 'vue'
import Component from 'vue-class-component'
import setMoney from './../setMoney/setMoney'

@Component({
    name: 'restore',
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
    beforeMount() {
        this.$xvuex.registerModule(this, this.options, this.options.gridKey)
    },
    mounted() {
        this.initDatas()
    }
})

export default class setMoney extends Vue {

    selects: Array<object> = [] //选中的出金表数据
    tableData: Array<object> = [] //出金表数据
    ChiefStatusDict: Array<object> = [] //主席状态字典
    title :string = '恢复参数设置'//标题
    SSSId: number = null //总次席状态字典
    modelVisible: boolean=false
    clientModelVisible: boolean=false
    async modelClose(){
        this.modelVisible = false
    }
    modelForm: object={
        ClientNo:null,
        Status:null,
        StatusName:null,
        MaxWithdraw:null,
        UnitLimit:null
    }

    /**
     * 设置出金表数据
     * */
    get setMoneyTableDatas(){
        return this.$store.getters['setMoney/restoreData']
    }
    /**
     * 次席信息数据
     * */
    get getState() {
        return this.$store.state[this.options.gridKey]
    }
    get getPath(){
        return this.$route.name;   //获得当前路径名称
    }

    /**初始化数据*/
    async initDatas(){
        //主席状态字典
        let url = Vue.prototype.$baseUrl.imss + `DataDictionaryType?$filter=(Code eq 'CSS')&$expand=DataDictionary`
        let requestDataHeader = Vue.prototype.$api.request(url)
        fetch(requestDataHeader).then(resp => {
            if (resp.ok === true) {
                return resp.json()
            } else {
                isRequestOk = resp.ok
                return resp.json()
            }
        }).then(datas => {
            if(datas.value.length > 0){
                this.ChiefStatusDict = datas.value[0].DataDictionary
                this.ChiefStatusDict.forEach(function(item){
                    item.Code = Number(item.Code)
                })
            }
        })
        //总次席状态字典
        let _self = this
        let url = Vue.prototype.$baseUrl.imss + `DataDictionaryType?$filter=(Code eq 'SSS')&$expand=DataDictionary`
        let requestDataHeader = Vue.prototype.$api.request(url)
        fetch(requestDataHeader).then(resp => {
            if (resp.ok === true) {
                return resp.json()
            } else {
                isRequestOk = resp.ok
                return resp.json()
            }
        }).then(datas => {
            if(datas.value.length > 0){
                var SSSDict = datas.value[0].DataDictionary
                SSSDict.forEach(function(item){
                    if(item.Name == '正常'){
                        _self.SSSId = item.Id
                    }
                })

            }
        })
    }

    /**移除客户*/
    async remove(item){
        var i = 0
        var tableData = clone(this.setMoneyTableDatas)
        tableData.forEach(function(dataItem){
            if(dataItem.ClientNo == item.ClientNo){
                tableData.splice(i,1)
            }
            i++
        })
        this.tableData = tableData
        this.$store.dispatch('setMoney/setRestoreData', tableData)
    }

    /**点击出金表展示信息model*/
    async showModel(row, column, cell, event){
        if(column.label!=""&&column.label !="操作"){
            this.modelVisible = true
            this.modelForm = clone(row)
        }
    }
    /**修改恢复参数信息*/
    async handleSubmit(formName){
        var tableData =clone(this.tableData)
        var _self = this
        tableData.forEach(function(item,key){
            if(_self.modelForm.ClientNo == item.ClientNo){
                _self.ChiefStatusDict.forEach(function(item){
                    if(Number(item.Code) == _self.modelForm.Status){
                        _self.modelForm.StatusName = item.Name
                    }
                })
                _self.modelForm.Status = Number(_self.modelForm.Status)
                tableData[key] = _self.modelForm

                _self.$message({
                    showClose: true,
                    message: '修改成功',
                    type: 'success'
                })
                _self.modelVisible = false
            }
            /*if(_self.modelForm.ClientNo == item.ClientNo){
                tableData[key] = _self.modelForm
                console.log(_self.modelForm)
                console.log(tableData)
                _self.$message({
                    showClose: true,
                    message: '修改成功',
                    type: 'success'
                })
                _self.modelVisible = false
            }*/
        })
        this.tableData = tableData
        this.$store.dispatch('setMoney/setRestoreData', tableData)
    }
    /**选择客户checkbox*/
    /*async selectTableCheckbox(selection) {
        let select = clone(selection)
        this.selects = select
    }*/
    /**导入银期大额*/
    async exportBank(){
        if(this.tableData.length > 0) {
            this.$confirm('确认导入银期大额?', '导入确认', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let tableData = clone(this.setMoneyTableDatas)
                tableData.forEach(function (item) {
                    if (item.BankingfuturesWholesale != null) {
                        item.MaxWithdraw = item.BankingfuturesWholesale
                    }

                })
                this.tableData = tableData
                this.$store.dispatch('setMoney/setRestoreData', tableData)
            })
        }else{
            this.$message({
                showClose: true,
                message: '请先选择客户！'
            })
        }

    }
    /**同步部分主席*/
    async Same(){
        let _self = this
        let tableData = clone(this.setMoneyTableDatas)
        if(tableData.length > 0) {
            let dtos = []
            tableData.forEach(function (item) {
                var dto = {
                    ClientNo: item.ClientNo,
                    ChiefStatus: item.Status,
                    MaxWithdraw: Number(item.MaxWithdraw),
                    UnitLimit: Number(item.UnitLimit)
                }
                dtos.push(dto)
            })
            let url = Vue.prototype.$baseUrl.imss + 'SyncLog/IMSS.Sync'
            let params = {
                dtos: dtos,
                type: "Restore"
            }
            let requestDataHeader = Vue.prototype.$api.request(url, {method: 'POST', body: JSON.stringify(params)})
            fetch(requestDataHeader).then(resp => {
                if (resp.ok === true) {
                    _self.$message({
                        showClose: true,
                        message: '操作成功！',
                        type: 'success'
                    })
                } else {
                    return resp.json()
                }
            }).then(data => {
                if (data) {
                    _self.$message({
                        showClose: true,
                        message: data.message,
                        type: 'error'
                    })
                }
            })
        }else{
            this.$message({
                showClose: true,
                message: '请先勾选客户！'
            })
        }
    }
    /**同步全部主席*/
    async SameAll(){
        let _self = this
        let url = Vue.prototype.$baseUrl.imss + 'SyncLog/IMSS.RestoreEntirely'
        let params = {}
        let requestDataHeader = Vue.prototype.$api.request(url, {method: 'POST', body: JSON.stringify(params)})
        fetch(requestDataHeader).then(resp => {
            if (resp.ok === true) {
                _self.$message({
                    showClose: true,
                    message: '操作成功！',
                    type: 'success'
                })
            } else {
                return resp.json()
            }
        }).then(data => {
            if (data) {
                _self.$message({
                    showClose: true,
                    message: data.message,
                    type: 'error'
                })
            }
        })
    }


    /**
     * ===================================================
     * 选择客户页面
     * */
    //次席信息管理表格数据
    //次席信息管理表格数据
    data() {
        return {
            options: Object.assign({}, Vue.prototype.$xvuex.options, {
                url: Vue.prototype.$baseUrl.imss + 'Client',
                urlParameter: {
                    $filter: '',
                    $orderby: '',
                    $expand: 'ClientSecondSeat'
                },
                dicUrls: {
                    SecondSeatSystemDict: Vue.prototype.$baseUrl.imss + `DataDictionaryType?$filter=(Code eq 'SS')&$expand=DataDictionary`,
                    SecondSeatStatusDict: Vue.prototype.$baseUrl.imss + `DataDictionaryType?$filter=(Code eq 'SSS')&$expand=DataDictionary`
                },
                title: '次席系统',  // 本页面名称
                gridKey: 'choseRestoreClient',  // 本页面 Eng名，唯一
                isSelection: true, // 是否开启多选checkBox
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
                        key: 'ClientNo',
                        title: '客户号',
                        fixed: 'left',
                        readOnly:true
                        /*,render: [
                         {
                         class: 'pointer',
                         text: '点击查看次席信息详情',
                         fn: this.showViewDetail,
                         }
                         ]*/
                    },
                    {
                        key: 'TotalSecondSeatStatus',
                        title: '总次席状态',
                        dicKey: 'SecondSeatStatusDict',
                        /*type: 'select',
                        filter: true,
                        filters: [],*/
                        searchKey: 'hide',
                        readOnly:true,
                        fixed: 'left'
                    },
                    {
                        key: 'SecondSeat',
                        title: '次席系统',
                        dicKey: 'SecondSeatSystemDict', // 如果有数据字典，必须要有dicKey，指向数据字典路劲
                        width: 120,
                        type: 'select',
                        column: false,
                        filter: true,
                        filters: [],
                        rules: [{required: true, message: '必填'}]
                    },
                    {
                        key: 'SecondSeatStatus',
                        title: '次席系统状态',
                        column: false,
                        dicKey: 'SecondSeatStatusDict',
                        type: 'select',
                        filter: true,
                        filters: [],
                        rules: [{required: true, message: '必填'}]
                    },
                    {
                        key: 'MultiSecondSeat',
                        title: '多次席',
                        searchKey: 'hide',
                        type: 'select',
                        selects: [{value:true,text:'是'},{value:false,text:'否'}],
                        readOnly:true
                    },
                    {
                        key: 'DoubleOpen',
                        title: '双开客户',
                        searchKey: 'hide',
                        /*selects: [{value:true,text:'是'},{value:false,text:'否'}],
                        type: 'select',
                        filter: true,
                        filters: [{value:`(DoubleOpen eq true)`,text:'是'},{value:`(DoubleOpen eq false)`,text:'否'}],*/
                        rules: [{required: true, message: '必填'}]
                    },
                    {
                        key: 'BankingfuturesWholesale',
                        title: '银期大额',
                        type:'number'
                    },
                    {
                        key: 'CommodityOption',
                        title: '商品期权',
                        dicKey: 'SPQQDict',
                        searchKey: 'show',
                        selects: [{value:true,text:'正常'},{value:false,text:' '}],
                        filter: true,
                        filters: [{value:`(CommodityOption eq true)`,text:'正常'},{value:`(CommodityOption eq false)`,text:''}],
                        type: 'select'
                    },
                    {
                        key: 'FinancialOption',
                        title: '金融期权',
                        dicKey: 'JRQQDict',
                        searchKey: 'show',
                        selects: [{value:true,text:'正常'},{value:false,text:' '}],
                        filter: true,
                        filters: [{value:`(FinancialOption eq true)`,text:'正常'},{value:`(FinancialOption eq false)`,text:''}],
                        type: 'select'
                    },
                    {
                        key: 'Note',
                        title: '备注',
                        column: 'hide',
                        searchKey: 'hide'
                    }
                ]
            })

        }
    }

    /**
     *  设置筛选项内容
     */
    setFilters() {
        let _this = this
        let table = clone(this.getState.table)
        table.forEach(function (item) {
            if (item.filter === true && _this.$store.state[item.dicKey]) {
                let filters = []
                let selects = []
                let dicData = _this.$store.state[item.dicKey].data.value
                if(dicData.length>0){
                    dicData[0].DataDictionary.forEach(function (dicItem) {
                        //筛选
                        let filterItem: any = {}
                        filterItem.text = dicItem.Name
                        filterItem.value = `(${item.key} eq ${dicItem.Id})`
                        filters.push(filterItem)
                        //修改新增
                        let selectItem: any = {}
                        selectItem.text = dicItem.Name
                        selectItem.value = dicItem.Id
                        selects.push(selectItem)
                    })
                    item['filters'] = filters
                    item['selects'] = selects
                }
            }
        })
        _this.$store.dispatch(_this.options.gridKey + 'setData', {table: table})
    }

    /**
     * 设置展现给用户的表格数据
     * @param tableData 表格数据
     */
    setTableData(tableData) {
        let _self = this
        let initData = clone(tableData)
        let SecondSeatSystemDict = ''
        let SecondSeatStatusDict = ''
        if(this.$store.state.SecondSeatSystemDict.data){
            SecondSeatSystemDict = this.$store.state.SecondSeatSystemDict.data.value

        }
        if(this.$store.state.SecondSeatStatusDict.data){
            SecondSeatStatusDict = this.$store.state.SecondSeatStatusDict.data.value

        }
        let editData = []
        initData.forEach(function (item,index) {
            let ClientSecondSeatLength = item.ClientSecondSeat.length
            if(ClientSecondSeatLength===0){
                return
            }
            //设置总次席系统状态
            if(SecondSeatStatusDict.length>0){
                SecondSeatStatusDict[0].DataDictionary.forEach(function (dicItem) {
                    if (dicItem.Id === item.TotalSecondSeatStatus) {
                        item.TotalSecondSeatStatus = dicItem.Name
                    }
                })
            }
            if(item.MultiSecondSeat == true){
                item.MultiSecondSeat = '是'
            }else if(item.MultiSecondSeat == false){
                item.MultiSecondSeat = '否'
            }
            //item.Client.MultiSecondSeat = item.Client.MultiSecondSeat == true ? '是': '否'
            item.DoubleOpen = item.DoubleOpen == true ? '是': '否'
            item.CommodityOption = item.CommodityOption == true ? '正常': ''
            item.FinancialOption = item.FinancialOption == true ? '正常': ''
            item.OpenTime = (item.OpenTime != null?item.OpenTime.split('T')[0]:null)
            item.CloseTime = (item.CloseTime != null?item.CloseTime.split('T')[0]:null)
            editData.push(item)
        })
        this.$store.dispatch(this.options.gridKey + 'setData', {tableData: editData})
    }

    tableFn() {
        return {
            selectCheckbox(selection) {
                let select = clone(selection)
                this.$store.dispatch(this.options.gridKey + 'setData', {selection: select})
            }
        }
    }



    //打开选择客户model
    async showClientModel(){
        this.clientModelVisible = true
        this.$store.dispatch(this.options.gridKey + 'setData', {urlParameter: {
            $filter:`((TotalSecondSeatStatus eq ${this.SSSId})and(DoubleOpen eq false))`,$expand:'ClientSecondSeat'}})
    }
    //关闭选择客户model
    async clientModelClose(){
        this.clientModelVisible = false
    }

    //添加客户
    async addClients(){
        let selectArr = this.getState.selection
        let _self = this
        var tableData = clone(this.setMoneyTableDatas)
        if(selectArr.length >0) {
            selectArr.forEach(function (selectClient) {
                var flag = false
                if(tableData.length > 0){
                    tableData.forEach(function (item) {
                        if (item.ClientNo === selectClient.ClientNo) {
                            flag = true
                        }
                    })
                }
                if (!flag) {
                    let status = null
                    //console.log(_self.ChiefStatusDict)
                    _self.ChiefStatusDict.forEach(function (dict) {
                        if (dict.Name == '只可平仓') {
                            status = Number(dict.Code)
                        }
                    })
                    var client = {
                        ClientNo: selectClient.ClientNo,
                        StatusName: '只可平仓',
                        Status: status,
                        MaxWithdraw: 0,
                        UnitLimit: 0,
                        BankingfuturesWholesale: selectClient.BankingfuturesWholesale
                    }
                    tableData.push(client)
                }
            })
            this.tableData = tableData
            //this.clientModelVisible = false
            //清空选择框
            let select = this.$store.state[this.options.gridKey].selection
            this.$store.dispatch(this.options.gridKey + 'setData', {selection: []})
            this.$store.dispatch(this.options.gridKey + '_set_refresh')
            this.$store.dispatch('setMoney/setRestoreData', tableData)
            this.$message({
                title: '温馨提示',
                showClose: true,
                type: 'success',
                message: '客户已添加成功！'
            })
        }else{
            //this.$notify({
            //    title: '温馨提示',
            //    message: '请先选择客户！'
            //});
            this.$message({
                title: '温馨提示',
                showClose: true,
                message: '请先选择客户！'
            })
        }
    }


}
